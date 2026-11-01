import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
p.on('pageerror', e=>console.log('ERR', e.message));
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
for (const ms of [600, 1200, 2500, 4000]) {
  await p.waitForTimeout(ms===600?600:(ms- (ms===1200?600: (ms===2500?1200:2500))));
  await p.screenshot({path:`E:/扬子/shots5/t${ms}.png`});
}
await b.close();
