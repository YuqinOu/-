import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const errs=[];
for (const [w,h,n,mob] of [[1440,900,'d',false],[390,844,'m',true]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor: mob?2:1, isMobile:mob, hasTouch:mob });
  const p = await ctx.newPage();
  p.on('pageerror', e=>errs.push(n+' '+e.message));
  p.on('console', m=>{ if(m.type()==='error') errs.push(n+' '+m.text().slice(0,100)); });
  await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
  await p.waitForTimeout(1200);
  await p.evaluate(()=>document.getElementById('album').scrollIntoView({behavior:'instant'}));
  await p.waitForTimeout(600);
  await p.screenshot({ path:`E:/扬子/shots6/A-${n}-head.png` });
  // 相册底部与信封衔接
  await p.evaluate(()=>window.scrollTo(0, document.getElementById('letter').offsetTop - (window.innerHeight*0.75)));
  await p.waitForTimeout(500);
  await p.screenshot({ path:`E:/扬子/shots6/A-${n}-join.png` });
  await ctx.close();
}
console.log('errors', JSON.stringify(errs.slice(0,5)));
await b.close();
