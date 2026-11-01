import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const errs = [];
for (const [w,h,n,mob] of [[1440,900,'d',false],[390,844,'m',true]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor: mob?2:1, isMobile:mob, hasTouch:mob });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push(n+' PAGEERROR '+e.message));
  p.on('console', m => { if (m.type()==='error') errs.push(n+' '+m.text().slice(0,120)); });
  await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
  await p.waitForTimeout(6500);
  await p.screenshot({ path:`E:/扬子/shots5/n-${n}.png` });
  await p.evaluate(()=>document.getElementById('album').scrollIntoView());
  await p.waitForTimeout(1400);
  await p.screenshot({ path:`E:/扬子/shots5/n-${n}-album.png` });
  const bad = await p.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(x=>x.length>1 && !document.querySelector(x)));
  console.log(n, 'broken', JSON.stringify(bad), 'imgs', await p.evaluate(()=>document.querySelectorAll('.photo img').length));
  await ctx.close();
}
console.log('errors', JSON.stringify(errs.slice(0,5)));
await b.close();
