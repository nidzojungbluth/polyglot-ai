const { chromium, devices } = require('playwright');
(async () => {
  const b = await chromium.launch(); const c = await b.newContext({ ...devices['iPhone SE'], colorScheme: 'light' }); const p = await c.newPage();
  await p.goto('http://localhost:4203/'); await p.waitForSelector('.tab');
  await p.click('.langchip'); await p.click('text=Griechisch'); await p.waitForTimeout(400);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(200); await p.screenshot({ path: '/tmp/u_home2.png' });
  await p.click('.tab:has-text("Kurse")'); await p.waitForTimeout(300); await p.evaluate(() => window.scrollBy(0, 330)); await p.screenshot({ path: '/tmp/u_courses2.png' });
  const r = await p.evaluate(() => [...document.querySelectorAll('button, a, select, input')].filter(e => e.offsetParent).map(e => { const b = e.getBoundingClientRect(); return { t: (e.innerText||'').trim().slice(0,12), w: Math.round(b.width), h: Math.round(b.height) }; }).filter(x => x.h < 44 || x.w < 44));
  console.log('SMALL', JSON.stringify(r));
  await p.locator('.list-btn').first().click(); await p.waitForTimeout(300);
  await p.locator('button:has-text("Lektion")').first().click().catch(()=>{}); await p.waitForTimeout(500);
  await p.screenshot({ path: '/tmp/u_lesson.png' });
  await b.close();
})();
