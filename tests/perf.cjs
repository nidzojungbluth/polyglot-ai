// Ladezeit-Messung: iPhone 13, CPU ×4 gedrosselt. „kalt“ = neuer Browser ohne Cache, „warm“ = zweiter Aufruf.
const { chromium, devices } = require('playwright');
const URL = `http://localhost:${process.env.PORT ?? 4300}/`;
async function measure(ctx) {
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const t0 = Date.now();
  await p.goto(URL);
  await p.waitForSelector('.tabbar', { timeout: 20000 });
  const ms = Date.now() - t0;
  const bytes = await p.evaluate(() => performance.getEntriesByType('resource').reduce((a, r) => a + (r.transferSize || r.encodedBodySize || 0), 0));
  await p.close();
  return { ms, kb: Math.round(bytes / 1024) };
}
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'], serviceWorkers: 'block' });
  const cold = await measure(ctx);
  const warm = await measure(ctx);
  console.log(JSON.stringify({ kalt_ms: cold.ms, kalt_kb: cold.kb, warm_ms: warm.ms }));
  await b.close();
})();
