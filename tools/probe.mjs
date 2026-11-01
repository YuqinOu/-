import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader'] });
const cases = [[1440,900,'d',{}],[1280,800,'l',{}],[1024,1366,'t',{mobile:true}],[390,844,'m',{mobile:true,dpr:2}],[375,667,'ms',{mobile:true,dpr:2}]];
for (const [w,h,n,o] of cases) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:o.dpr||1, isMobile:!!o.mobile, hasTouch:!!o.mobile });
  const p = await ctx.newPage();
  p.on('pageerror', e=>console.log(n,'ERR',e.message));
  await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
  await p.waitForTimeout(4000);
  await p.screenshot({path:`E:/扬子/shots5/${n}.png`});
  await ctx.close();
}
await b.close();
