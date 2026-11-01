import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
p.on('pageerror', e=>console.log('ERR', e.message));
await p.addInitScript(()=>{ window.__glErr = []; });
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>{
  const c=document.getElementById('fhCanvas');
  const g = c.getContext('webgl2');
  const px = new Uint8Array(4);
  g.readPixels(700, 100, 1, 1, g.RGBA, g.UNSIGNED_BYTE, px);
  return JSON.stringify({err:g.getError(), px:[...px], viewport:g.getParameter(g.VIEWPORT)});
}));
await b.close();
