import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
for (const [w,h,n,mob] of [[1440,900,'d',false],[390,844,'m',true]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1, isMobile:mob, hasTouch:mob });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
  await p.waitForTimeout(800);
  const r = await p.evaluate(()=>{
    const album=document.getElementById('album');
    const imgs=[...document.querySelectorAll('#gallery img')].map(i=>i.getBoundingClientRect());
    const bottom=Math.max(...imgs.map(r=>r.bottom+window.scrollY));
    const ab=album.getBoundingClientRect().bottom+window.scrollY;
    const gal=document.getElementById('gallery').getBoundingClientRect();
    return {gap: Math.round(ab-bottom), galleryH: Math.round(gal.height), albumBottom:Math.round(ab), innerBottom: Math.round(document.querySelector('.album-inner').getBoundingClientRect().bottom+window.scrollY)};
  });
  console.log(n, JSON.stringify(r));
  await ctx.close();
}
await b.close();
