import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:8080/';
const out = process.argv[3] || 'shots';
const browser = await chromium.launch({ channel: 'chrome' });
for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`${w}x${h} scrollWidth=${sw}${sw > w ? ' OVERFLOW' : ''}`);
  await page.screenshot({ path: `${out}/${w}.png`, fullPage: true });
  await page.close();
}
await browser.close();
