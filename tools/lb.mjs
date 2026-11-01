import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
const errs = [];
p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0,160)); });
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.waitForTimeout(2500);
await p.evaluate(()=>document.getElementById('album').scrollIntoView());
await p.waitForTimeout(1200);
await p.evaluate(()=>document.querySelector('.photo').click());
await p.waitForTimeout(1200);
await p.screenshot({ path:'E:/扬子/shots5/lb.png' });
// 检查空锚点
const bad = await p.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1 && !document.querySelector(h)));
console.log('broken anchors', JSON.stringify(bad));
console.log('errors', JSON.stringify(errs.slice(0,6)));
await b.close();
