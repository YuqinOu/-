import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--hide-scrollbars'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(2200);
await p.click('#envOpen');
await p.waitForTimeout(1200);
console.log(await p.evaluate(()=>{
  const s = document.querySelector('.letter-sheet');
  const r = s.getBoundingClientRect();
  const cs = getComputedStyle(s);
  return JSON.stringify({ w:Math.round(r.width), h:Math.round(r.height), cssW:cs.width, grid:cs.getPropertyValue('--grid'), font:getComputedStyle(s.querySelector('p')).fontFamily, fs:getComputedStyle(s.querySelector('p')).fontSize });
}));
await b.close();
