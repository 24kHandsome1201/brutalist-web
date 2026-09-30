import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:8080/';
const out = process.argv[3] || 'video';
const browser = await chromium.launch({ channel: 'chrome' });
const pause = (p, ms) => p.waitForTimeout(ms);
async function smoothScroll(page, to, ms = 1600) {
  await page.evaluate(async ([to, ms]) => {
    const from = scrollY, t0 = performance.now();
    await new Promise((r) => { const f = (t) => { const k = Math.min(1, (t - t0) / ms); scrollTo(0, from + (to - from) * k); k < 1 ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); });
  }, [to, ms]);
}
const y = (page, sel) => page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY - document.querySelector('.topbar').offsetHeight, sel);

async function desktop() {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: `${out}/desktop`, size: { width: 1440, height: 900 } } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await pause(page, 2500);
  await page.hover('.topbar__nav a:nth-child(2)'); await pause(page, 500);
  await page.hover('.topbar__nav a:nth-child(3)'); await pause(page, 500);
  await smoothScroll(page, await y(page, '#index'), 1800); await pause(page, 800);
  for (const n of [1, 2, 3, 4]) { await page.hover(`.card:nth-child(${n}) .card__link`); await pause(page, 550); }
  await smoothScroll(page, await y(page, '#index') + 420, 900);
  for (const n of [5, 6, 7, 8]) { await page.hover(`.card:nth-child(${n}) .card__link`); await pause(page, 550); }
  await page.mouse.move(5, 450);
  await smoothScroll(page, await y(page, '#manifesto'), 1600); await pause(page, 2200);
  await smoothScroll(page, await y(page, '#manifesto') + 700, 1200); await pause(page, 1200);
  await smoothScroll(page, await y(page, '#timeline'), 1400); await pause(page, 600);
  for (const n of [2, 4, 6]) { await page.hover(`.spec tbody tr:nth-child(${n})`); await pause(page, 450); }
  await smoothScroll(page, await y(page, '#submit'), 1400); await pause(page, 600);
  await page.click('.btn'); await pause(page, 1400);
  await page.fill('#f-name', '北京天文馆旧馆'); await page.fill('#f-city', 'Beijing'); await page.fill('#f-year', '1957');
  await page.fill('#f-note', '双曲面薄壳穹顶，混凝土裸露。'); await pause(page, 500);
  await page.hover('.btn'); await pause(page, 500); await page.click('.btn'); await pause(page, 1600);
  await smoothScroll(page, await page.evaluate(() => document.body.scrollHeight), 1600); await pause(page, 2200);
  await smoothScroll(page, 0, 1800); await pause(page, 1500);
  const p = await page.video().path(); await ctx.close(); return p;
}
async function mobile() {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, recordVideo: { dir: `${out}/mobile`, size: { width: 390, height: 844 } } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await pause(page, 1800);
  const h = await page.evaluate(() => document.body.scrollHeight - innerHeight);
  for (let k = 1; k <= 8; k++) { await smoothScroll(page, (h * k) / 8, 1100); await pause(page, 700); }
  await pause(page, 800);
  const p = await page.video().path(); await ctx.close(); return p;
}
console.log(await desktop());
console.log(await mobile());
await browser.close();
