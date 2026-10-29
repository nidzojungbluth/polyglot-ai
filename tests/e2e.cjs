const { chromium, devices } = require('playwright');
const assert = (c, m) => { if (!c) throw new Error('FEHLER: ' + m); console.log('✓ ' + m); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  const URL = 'http://localhost:4173/';
  await p.goto(URL);
  await p.waitForSelector('text=Weiterlernen');
  assert(true, 'Startseite lädt auf iPhone-Größe');
  await p.screenshot({ path: '../shots/1-home.png' });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert(!overflow, 'kein seitliches Scrollen (Layout passt)');

  // Lektion durchspielen
  await p.click('text=Weiterlernen');
  await p.click('text=Übungen starten');
  let n = 0;
  while (await p.locator('text=Weiter').count() === 0 || n === 0) {
    if (await p.locator('h1:has-text("richtig")').count()) break;
    const card = p.locator('.card').first();
    if (await p.locator('.options .opt').count()) await p.locator('.options .opt').first().click();
    else if (await p.locator('.tile-word').count()) {
      const k = await p.locator('.tile-word').count();
      for (let i = 0; i < k; i++) await p.locator('.tile-word').nth(i).click();
      await p.locator('button:has-text("Prüfen")').click();
    } else { await p.fill('input[aria-label=Antwort]', 'hello'); await p.locator('button:has-text("Prüfen")').click(); }
    if (n === 2) await p.screenshot({ path: '../shots/2-exercise.png' });
    await p.locator('.feedback button:has-text("Weiter")').click();
    n++;
    if (n > 40) throw new Error('Lektion endet nicht');
  }
  await p.waitForSelector('h1:has-text("richtig")');
  assert(n >= 12, `Lektion mit ${n} Übungen abgeschlossen`);
  await p.click('text=Fertig');
  await p.waitForTimeout(600);

  // Persistenz
  await p.reload();
  await p.waitForSelector('text=Weiterlernen');
  assert(await p.locator('.num:has-text("✓")').count() === 1, 'Lektion bleibt nach Neuladen als erledigt gespeichert');
  const todayTxt = await p.locator('.hero .big').innerText();
  assert(/^[1-9]\d* \//.test(todayTxt), `Tagesfortschritt gespeichert (${todayTxt})`);

  // Vokabeln (SRS)
  await p.click('.tab:has-text("Vokabeln")');
  await p.click('button:has-text("Jetzt wiederholen")');
  await p.click('.flashcard');
  await p.screenshot({ path: '../shots/3-flashcard.png' });
  await p.click('.grades button:has-text("Gut")');
  assert(true, 'Karteikarte umdrehen und bewerten');

  // Coach (ohne Claude → Regel-Coach)
  await p.click('.tab:has-text("Coach")');
  await p.waitForSelector('text=Regel-Coach');
  await p.fill('input[aria-label="Nachricht an den Coach"]', 'I want a coffee, I am knackered');
  await p.click('button:has-text("Senden")');
  await p.waitForSelector('text=Besser');
  assert(await p.locator('text=Slang erkannt').count() > 0, 'Coach korrigiert Fehler und erklärt Slang');
  assert(await p.locator('text=keine KI').count() > 0, 'Regel-Coach ist klar als „keine KI“ gekennzeichnet');
  await p.screenshot({ path: '../shots/4-coach.png', fullPage: false });

  // Rollenspiel
  await p.click('.tab:has-text("Rollenspiele")');
  await p.click('text=Café in Shoreditch');
  for (let i = 0; i < 6 && !(await p.locator('text=Szene geschafft').count()); i++) await p.locator('.options .opt').first().click();
  assert(await p.locator('text=Szene geschafft').count() === 1, 'Rollenspiel bis zum Ende spielbar');
  await p.screenshot({ path: '../shots/5-roleplay.png' });

  // Sprache wechseln (Griechisch)
  await p.click('.langchip');
  await p.click('text=Griechisch');
  await p.waitForSelector('text=Begrüßen wie in Athen');
  assert(true, 'Sprachwechsel auf Griechisch');

  // Wörterbuch
  await p.click('.tab:has-text("Mehr")');
  await p.click('text=Wörterbuch');
  await p.fill('input[type=search]', 'danke');
  assert(await p.locator('text=ευχαριστώ').count() > 0, 'Wörterbuch findet „danke“ auf Griechisch');

  // Sicherung: Export (Kopieren-Fallback) und Import
  await p.click('text=‹ Mehr'); await p.click('text=Einstellungen');
  await p.click('button:has-text("Kopieren")');
  await p.waitForTimeout(300);
  let backup = await p.locator('textarea').inputValue();
  if (!backup) backup = await p.evaluate(() => navigator.clipboard.readText().catch(() => ''));
  assert(backup.includes('polyglot-ai'), 'Sicherung kann exportiert werden');
  await p.click('text=Alle Lerndaten löschen'); await p.click('text=Ja, löschen');
  await p.fill('textarea', backup);
  await p.click('button:has-text("Wiederherstellen")');
  await p.waitForSelector('text=erfolgreich wiederhergestellt');
  await p.click('.tab:has-text("Start")');
  assert(await p.locator('text=Begrüßen wie in Athen').count() >= 1, 'Wiederherstellung bringt Einstellungen zurück');
  await p.click('.tab:has-text("Mehr")'); await p.click('text=Einstellungen');
  await p.fill('textarea', 'Unsinn');
  await p.click('button:has-text("Wiederherstellen")');
  assert(await p.locator('.err-text').count() === 1, 'Kaputte Sicherung → verständliche Fehlermeldung');
  await p.screenshot({ path: '../shots/6-settings.png' });

  // Offline (Service Worker)
  const swState = await p.locator('tr:has-text("Service Worker") td').nth(1).innerText();
  assert(swState.includes('aktiv'), 'Service Worker aktiv: ' + swState);
  await ctx.setOffline(true);
  await p.reload();
  await p.waitForSelector('.tabbar', { timeout: 8000 }); await p.click('.tab:has-text("Start")'); await p.waitForSelector('text=Weiterlernen');
  assert(true, 'App startet OFFLINE neu');
  await p.click('text=Weiterlernen'); await p.click('text=Übungen starten');
  assert(await p.locator('.card').count() > 0, 'Lektion funktioniert offline');
  await ctx.setOffline(false);

  // Dark Mode
  const dctx = await b.newContext({ ...devices['iPhone SE'], colorScheme: 'dark' });
  const d = await dctx.newPage();
  await d.goto(URL); await d.waitForSelector('text=Weiterlernen');
  await d.screenshot({ path: '../shots/7-dark-se.png' });
  const of2 = await d.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert(!of2, 'iPhone SE (kleiner Bildschirm) ohne Überlauf, Dark Mode');

  assert(errors.length === 0, 'keine JavaScript-Fehler' + (errors.length ? ': ' + errors.join(' | ') : ''));
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
