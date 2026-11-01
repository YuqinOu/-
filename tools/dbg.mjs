import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
p.on('console', m=>console.log('C:', m.type(), m.text().slice(0,200)));
p.on('pageerror', e=>console.log('ERR', e.message));
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(4000);
await p.screenshot({path:'E:/扬子/shots5/dbg.png'});
console.log(await p.evaluate(()=>{
  const c=document.getElementById('fhCanvas');
  return JSON.stringify({w:c.width,h:c.height,cw:c.clientWidth,ch:c.clientHeight, dpr:devicePixelRatio, cls:document.documentElement.className});
}));
await b.close();
