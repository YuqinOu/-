import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const errs = [];
for (const [w,h,n,mob] of [[1440,900,'d',false],[390,844,'m',true]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor: mob?2:1, isMobile:mob, hasTouch:mob });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push(n+' ERR '+e.message));
  p.on('console', m => { if (m.type()==='error') errs.push(n+' '+m.text().slice(0,120)); });
  await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
  await p.waitForTimeout(2500);
  await p.evaluate(()=>document.getElementById('letter').scrollIntoView({behavior:'instant'}));
  await p.waitForTimeout(900);
  await p.screenshot({ path:`E:/扬子/shots6/L-${n}-env.png` });
  await p.click('#envOpen');
  await p.waitForTimeout(1500);
  await p.screenshot({ path:`E:/扬子/shots6/L-${n}-open.png` });
  await ctx.close();
}
console.log('errors', JSON.stringify(errs.slice(0,6)));
await b.close();
