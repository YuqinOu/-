import { chromium } from 'playwright-core';
import fs from 'node:fs';

const OUT = 'E:/扬子/shots5';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader', '--hide-scrollbars'],
});

async function run(name, width, height, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: opts.dpr || 1,
    isMobile: !!opts.mobile,
    hasTouch: !!opts.mobile,
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await page.goto('http://127.0.0.1:8771/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4200);
  await page.screenshot({ path: `${OUT}/${name}.png` });

  if (opts.hover) {
    await page.mouse.move(opts.hover[0], opts.hover[1]);
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${OUT}/${name}-wave.png` });
  }
  if (opts.extra) await opts.extra(page);
  if (errs.length) console.log(name, 'ERRORS:', errs.slice(0, 5));
  await ctx.close();
}

await run('desk', 1440, 900, { hover: [900, 520] });
await run('lap', 1280, 800, { hover: [800, 480] });
await run('pad', 1024, 1366, { mobile: true });
await run('mob', 390, 844, { mobile: true, dpr: 2 });
await run('mob-se', 375, 667, { mobile: true, dpr: 2 });

await browser.close();
console.log('done');
