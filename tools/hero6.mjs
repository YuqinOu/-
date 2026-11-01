import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const errs=[];
for (const [w,h,n,mob] of [[1440,900,'d',false],[390,844,'m',true],[1024,1366,'t',false]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor: mob?2:1, isMobile:mob, hasTouch:mob });
  const p = await ctx.newPage();
  p.on('pageerror', e=>errs.push(n+' '+e.message));
  p.on('console', m=>{ if(m.type()==='error') errs.push(n+' '+m.text().slice(0,100)); });
  await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
  await p.waitForTimeout(2600);
  await p.screenshot({ path:`E:/扬子/shots6/H-${n}.png` });
  if (n==='d') {
    const box = await p.locator('.fh-title').boundingBox();
    await p.screenshot({ path:'E:/扬子/shots6/H-title.png', clip:{ x:Math.max(0,box.x-24), y:Math.max(0,box.y-24), width:Math.min(box.width+48,1440-box.x+24), height:box.height+48 } });
  }
  await ctx.close();
}
console.log('errors', JSON.stringify(errs.slice(0,6)));
await b.close();
