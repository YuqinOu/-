import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const ctx = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>{
  const row = document.querySelector('.fh-row');
  const cs = getComputedStyle(row);
  return JSON.stringify({
    display: cs.display, color: cs.color, rows: cs.gridTemplateRows, flow: cs.gridAutoFlow,
    rect: row.getBoundingClientRect().toJSON(),
    kids: [...row.children].map(el=>{
      const r = el.getBoundingClientRect();
      return { t: el.textContent.trim(), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), c: getComputedStyle(el).color };
    })
  }, null, 1);
}));
await b.close();
