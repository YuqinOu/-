import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
p.on('pageerror', e=>console.log('ERR', e.message));
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(3500);
const r = await p.evaluate(()=>{
  const c = document.getElementById('fhCanvas');
  const g = c.getContext('webgl2') || c.getContext('webgl');
  return { ctx: !!g, lost: g ? g.isContextLost() : null };
});
console.log('CANVAS', JSON.stringify(r));
// 截图后立刻检查上下文
await p.screenshot({path:'E:/扬子/shots5/dbg2.png'});
console.log('after shot');
await b.close();
