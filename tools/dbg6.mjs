import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
const p = await ctx.newPage();
const errs=[];
p.on('pageerror', e=>errs.push('ERR '+e.message));
p.on('console', m=>{ if(m.type()==='error') errs.push('C '+m.text().slice(0,120)); });
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(2500);
const info = await p.evaluate(()=>{
  const g=document.getElementById('gallery');
  const cs=getComputedStyle(g);
  const head=document.querySelector('.album-head');
  return {
    children:g.children.length,
    galleryRect:{h:Math.round(g.getBoundingClientRect().height), top:Math.round(g.getBoundingClientRect().top+scrollY)},
    display:cs.display, cols:cs.columnCount, gcs:cs.columnGap,
    headH:Math.round(head.getBoundingClientRect().height),
    headMB:getComputedStyle(head).marginBottom,
    firstImg:(()=>{const i=g.querySelector('img'); return i? {w:i.clientWidth,h:i.clientHeight,complete:i.complete}:null;})(),
    imgs:g.querySelectorAll('img').length
  };
});
console.log(JSON.stringify(info,null,1));
console.log('errors', JSON.stringify(errs.slice(0,5)));
await p.evaluate(()=>document.getElementById('album').scrollIntoView({behavior:'instant'}));
await p.waitForTimeout(900);
await p.screenshot({ path:'E:/扬子/shots6/A-d-head2.png' });
await ctx.close(); await b.close();
