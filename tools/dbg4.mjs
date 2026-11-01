import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
p.on('pageerror', e=>console.log('ERR', e.message));
p.on('console', m=>{ if(m.text().includes('hero3d')) console.log(m.text()); });
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>{
  const c=document.getElementById('fhCanvas');
  return JSON.stringify({ css:getComputedStyle(c).display, op:getComputedStyle(c).opacity, z:getComputedStyle(c).zIndex, rect:c.getBoundingClientRect().toJSON() });
}));
await b.close();
