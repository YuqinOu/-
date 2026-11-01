import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--hide-scrollbars'] });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:3 });
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:8771/', {waitUntil:'networkidle'});
await p.evaluate(()=>document.getElementById('letter').scrollIntoView({behavior:'instant'}));
await p.waitForTimeout(800);
await p.locator('#envOpen').screenshot({ path:'E:/扬子/shots6/seal.png' });
await ctx.close(); await b.close();
