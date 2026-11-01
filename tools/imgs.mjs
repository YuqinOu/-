import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(2500);
const h = await p.evaluate(()=>document.body.scrollHeight);
for (let y=0; y<h; y+=700) { await p.evaluate(v=>window.scrollTo(0,v), y); await p.waitForTimeout(350); }
await p.waitForTimeout(2500);
console.log(await p.evaluate(()=>{
  const im = [...document.querySelectorAll('.photo img')];
  return JSON.stringify({ n: im.length, broken: im.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')) });
}));
await b.close();
