import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(3000);
// 逐屏截图，避免整页截图过大
const h = await p.evaluate(()=>document.body.scrollHeight);
console.log('pageHeight', h);
let i = 0;
for (let y = 0; y < h; y += 900) {
  await p.evaluate(v=>window.scrollTo(0,v), y);
  await p.waitForTimeout(700);
  await p.screenshot({ path:`E:/扬子/shots5/f${i++}.png` });
}
console.log('shots', i);
await b.close();
