/* ==========================================================
   扬子 · 相册  —  照片数据与交互
   ========================================================== */

const CHAPTERS = [
  {
    no: 'CHAPTER 01',
    name: '初中，从走廊开始',
    note: '那几年没有相机，只有借来的手机'
  },
  {
    no: 'CHAPTER 02',
    name: '在路上',
    note: '出门就要拍照的毛病，是那时候落下的'
  },
  {
    no: 'CHAPTER 03',
    name: '一杯饮料的时间',
    note: '大部分下午，都花在这样一些椅子上'
  },
  {
    no: 'CHAPTER 04',
    name: '后来，还是我们',
    note: '换过很多发型，人一直没换'
  }
];

/* ch: 所属章节（1-4）  w/h: 原始比例  solo: 单人照 */
const PHOTOS = [
  /* ---------- 01 初中 ---------- */
  { id: 25, ch: 1, w: 1000, h: 1334, t: '校服之外的第一件卫衣',
    s: '走廊很吵，我们刚从教室溜出来，手里还攥着没算完的题。那阵子谁的卫衣都大一号，谁的手都比不好耶。' },
  { id: 27, ch: 1, w: 1000, h: 1500, t: '画里的海边，画外的我们',
    s: '明明离海很远，站在那轮假落日前面还是拍得很认真。她说以后要去看真的，我说行，那我负责拍。' },
  { id: 26, ch: 1, w: 1000, h: 1333, t: '皇冠有点歪',
    s: '仙女棒、绶带，还有一顶不太稳的皇冠。那天她笑得像终于被允许当一次主角，我举着手机一直没放下。' },
  { id: 21, ch: 1, w: 1000, h: 1333, t: '红围巾和风',
    s: '她低头走着，我喊了她一声。风把围巾吹起来的那一下，她抬头笑了——我刚好按下快门。' },
  { id: 28, ch: 1, w: 1000, h: 1000, t: '逆光的电梯',
    s: '灯从头顶直直打下来，谁都睁不开眼。我们就这么歪着脑袋，等电梯到我们要去的那一层。' },
  { id: 29, ch: 1, w: 1000, h: 1000, t: '冬天限定',
    s: '那阵子她总穿这件粉羽绒服，像一颗会走路的棉花糖。手比出来的数字是什么，其实一点都不重要。' },
  { id: 30, ch: 1, w: 1000, h: 1000, t: '五和六',
    s: '我们同时比了个数字，然后一起笑场。忘了是谁先开始这种傻事，反正只跟她一起做过。' },
  { id: 31, ch: 1, w: 1251, h: 1000, t: '热气里的耶',
    s: '冬天的餐厅很热，眼镜一进门就起雾。她比耶比得特别官方，我在旁边憋笑憋得发抖。' },

  /* ---------- 02 在路上 ---------- */
  { id: 6, ch: 2, w: 1500, h: 1000, t: '桥的那一边',
    s: '那天走了很多路，风很大，天快黑了。她说这里好看，我们就站在树下，各比了一个耶。' },
  { id: 20, ch: 2, w: 900, h: 1600, t: '山坡上的野餐',
    s: '地上铺了一大块布，零食摆得乱七八糟。她站在风里整理东西，我举着手机，把整个午后拍歪了。' },
  { id: 24, ch: 2, w: 1000, h: 1333, t: '霓虹灯下的两个人',
    s: '灯牌亮得晃眼，我们刚从夜市出来，头发被风吹得乱七八糟。照片里全是模糊的光，反而很好看。' },
  { id: 33, ch: 2, w: 900, h: 1600, t: '一只兔子，和另一只兔子',
    s: '滤镜把我们的脸撒满了星星。路上没人在意，我们就站在那儿，笑得毫无形象可言。' },
  { id: 34, ch: 2, w: 900, h: 1600, t: '笑到忍不住',
    s: '后一张终于有人绷不住了。我最喜欢这张，因为它最不像在拍照——就是两个人在笑而已。' },

  /* ---------- 03 饮料时间 ---------- */
  { id: 7, ch: 3, w: 1500, h: 1000, t: '灯是暖黄的',
    s: '点了一桌子，吃到一半才想起来拍照。她托着脸，光从头顶落下来，把桌面染成蜂蜜色。' },
  { id: 8, ch: 3, w: 1000, h: 1500, t: '靠得再近一点',
    s: '一张不够，就往彼此那边挪了挪。后来发现那家店叫什么我们都记不清了，只记得很暖和。' },
  { id: 9, ch: 3, w: 1500, h: 1000, t: '坐着的那个人', solo: true,
    s: '她窝在红椅子里刷手机，不知道我在拍。有时候我更喜欢这样——不是摆给我看的样子。' },
  { id: 18, ch: 3, w: 1000, h: 1333, t: '一杯冰的，一杯真的', solo: true,
    s: '她低头搅了很久，其实那杯早该喝了。我说别动，她说好，然后给了我一个特别乖的笑。' },
  { id: 19, ch: 3, w: 1000, h: 1333, t: '她最好的样子', solo: true,
    s: '这张我存了很久。她大概不知道，自己笑起来的时候，眼睛会先弯一点点。' },
  { id: 14, ch: 3, w: 1000, h: 1333, t: '书架前的一巴掌',
    s: '她把手搁在我脸旁边，说这样显得她脸小。拍完我们笑到扶住书架，差点被人请出去。' },
  { id: 13, ch: 3, w: 900, h: 1600, t: '玻璃把灯揉碎了',
    s: '窗外是夜，窗内是黄灯，玻璃把光揉成一片。她嘟嘴的样子很幼稚，可那天确实很开心。' },
  { id: 15, ch: 3, w: 1000, h: 1333, t: '三厘米',
    s: '近到有点失焦。这种照片发出去没什么人点赞，但它是我最舍不得删的一类。' },
  { id: 16, ch: 3, w: 900, h: 1600, t: '干杯',
    s: '两个红杯子碰在一起。那阵子我们总说要庆祝点什么，后来发现，只是坐在一起就值得庆祝。' },
  { id: 17, ch: 3, w: 900, h: 1600, t: '安静的一张',
    s: '没有搞怪，没有滤镜。我们就这样并排坐着，谁都没说话，快门声显得有点响。' },
  { id: 11, ch: 3, w: 900, h: 1600, t: '门口的两分钟',
    s: '出门前她拉住我，说这里地板好看，非要拍一张全身的。于是我们叉着腰，装得很酷。' },
  { id: 12, ch: 3, w: 900, h: 1600, t: '屏幕上也是我们',
    s: '桌上那台手机屏幕亮着，里面是我们，外面也是我们。那天的复古滤镜，用了很久很久。' },

  /* ---------- 04 后来 ---------- */
  { id: 1, ch: 4, w: 1500, h: 1000, t: '又一个冬天',
    s: '我们都长大了一点，头发也换了颜色。她还是会把脸贴过来，这一点完全没变。' },
  { id: 2, ch: 4, w: 1500, h: 1000, t: '芒果蛋糕',
    s: '蛋糕上的芒果摆得很满，她指着它让我快点拍。记得那天很冷，屋里很暖，谁都不想走。' },
  { id: 22, ch: 4, w: 1500, h: 1000, t: '都穿了白',
    s: '那天两个人不约而同穿了白。她比了个耶，我说再正经一点，她说这样就很正经。' },
  { id: 23, ch: 4, w: 1500, h: 1000, t: '笑到最后的那个',
    s: '闹了一圈，最后留下来的是一张最安静的。她的手指在脸边，眼睛看着我。' },
  { id: 3, ch: 4, w: 900, h: 1600, t: '老头的胡子',
    s: '这个滤镜我们玩了半个晚上。她戴帽子，我粘胡子，谁都不肯先卸下来。' },
  { id: 4, ch: 4, w: 900, h: 1600, t: '还我原来的脸',
    s: '第二张更离谱。她凑过来抢镜头，帽子都歪了，我们笑到说不出话。' },
  { id: 5, ch: 4, w: 900, h: 1600, t: '两杯，和一块屏幕',
    s: '桌上两杯饮料还没开始喝，手机里已经在录我们了。那段视频她一直留着，说以后要一起看。' },
  { id: 10, ch: 4, w: 1500, h: 1000, t: '镜子里还有一个人',
    s: '她站在镜子前面，我在她身后举着相机。所以这张照片里有两个我：一个是镜中的影子，一个是按下快门的人。' },
  { id: 32, ch: 4, w: 1000, h: 1349, t: '提前的白色',
    s: '那天穿白裙、披头纱，对着镜子自拍。我们笑说这是彩排，其实只是想那样过一个下午。' }
];

/* ---------------- 渲染相册（等高列，避免留洞） ---------------- */
const gallery = document.getElementById('gallery');

function pad(n) { return String(n).padStart(2, '0'); }

/* 稳定伪随机，保证每次刷新旋转角度一致 */
function rot(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const v = x - Math.floor(x);
  return (v * 3.2 - 1.6).toFixed(2);
}

function colsForWidth(w) {
  if (w >= 1120) return 3;
  if (w >= 700) return 2;
  return 1;
}

let PHOTO_INDEX = new Map();       // 图片 id -> 在 PHOTOS 中的序号
PHOTOS.forEach((p, i) => PHOTO_INDEX.set(p.id, i));

function renderGallery() {
  const cols = colsForWidth(window.innerWidth);
  gallery.innerHTML = '';
  gallery.style.setProperty('--cols', cols);

  CHAPTERS.forEach((ch, ci) => {
    const items = PHOTOS.filter(p => p.ch === ci + 1);
    if (!items.length) return;

    const section = document.createElement('section');
    section.className = 'chapter';

    const head = document.createElement('div');
    head.className = 'chapter-head';
    head.innerHTML = `
      <span class="chapter-no">${ch.no}</span>
      <h3 class="chapter-name">${ch.name}</h3>
      <span class="chapter-note">${items.length} 张 · ${ch.note}</span>
    `;
    section.appendChild(head);

    const flow = document.createElement('div');
    flow.className = 'gf';
    flow.style.setProperty('--cols', cols);

    const colEls = [];
    for (let c = 0; c < cols; c++) {
      const col = document.createElement('div');
      col.className = 'gcol';
      col.dataset.h = '0';
      flow.appendChild(col);
      colEls.push(col);
    }

    items.forEach(p => {
      const cell = document.createElement('div');
      cell.className = 'cell';

      const fig = document.createElement('figure');
      fig.className = 'photo';
      fig.style.setProperty('--rot', rot(p.id) + 'deg');
      fig.dataset.pid = PHOTO_INDEX.get(p.id);

      fig.innerHTML = `
        <span class="tape"></span>
        <img src="assets/img/p${pad(p.id)}.jpg"
             alt="舒名扬与朋友的照片：${p.t}"
             width="${p.w}" height="${p.h}"
             loading="lazy" decoding="async"
             style="aspect-ratio:${p.w}/${p.h}">
        <figcaption>
          <p class="cap-t">${p.t}</p>
          <p class="cap-s">${p.s}</p>
          <p class="cap-meta"><b>${p.solo ? '单人' : '合照'}</b> · NO.${pad(p.id)}</p>
        </figcaption>
      `;
      cell.appendChild(fig);

      /* 放进当前最矮的一列 */
      let target = colEls[0];
      for (const col of colEls) {
        if (parseFloat(col.dataset.h) < parseFloat(target.dataset.h)) target = col;
      }
      target.appendChild(cell);

      /* 估算高度：图片比例 + 说明文字长度 */
      const est = (p.h / p.w) * 100 + 62 + p.s.length * 0.7;
      target.dataset.h = parseFloat(target.dataset.h) + est;
    });

    section.appendChild(flow);
    gallery.appendChild(section);
  });

  bindReveal();
}

/* ---------------- 入场动画 ---------------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

function bindReveal() {
  document.querySelectorAll('.cell:not(.bound)').forEach((el, i) => {
    el.classList.add('bound');
    el.style.transitionDelay = (i % 3) * 60 + 'ms';
    io.observe(el);
  });
}

renderGallery();

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 70 + 'ms';
  io.observe(el);
});

/* 断点变化时重新分栏 */
let lastCols = colsForWidth(window.innerWidth);
let rzTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(rzTimer);
  rzTimer = setTimeout(() => {
    const c = colsForWidth(window.innerWidth);
    if (c !== lastCols) {
      lastCols = c;
      renderGallery();
    }
  }, 220);
});

/* ---------------- 导航变实 ---------------- */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------------- 大图浏览 ---------------- */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbText = document.getElementById('lbText');
const lbCount = document.getElementById('lbCount');
let current = 0;

function openAt(pid) {
  current = (pid + PHOTOS.length) % PHOTOS.length;
  const p = PHOTOS[current];
  lbImg.src = `assets/img/p${pad(p.id)}.jpg`;
  lbImg.alt = `舒名扬与朋友的照片：${p.t}`;
  lbTitle.textContent = p.t;
  lbText.textContent = p.s;
  lbCount.textContent = `${pad(current + 1)} / ${PHOTOS.length}`;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
}

function closeLb() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
}

gallery.addEventListener('click', (e) => {
  const fig = e.target.closest('.photo');
  if (!fig) return;
  openAt(Number(fig.dataset.pid));
});

document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', () => openAt(current - 1));
document.getElementById('lbNext').addEventListener('click', () => openAt(current + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });

document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') openAt(current - 1);
  if (e.key === 'ArrowRight') openAt(current + 1);
});

/* 触摸滑动切换 */
let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 55) openAt(current + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

/* ---------------- 年份小彩蛋：认识多少年了 ---------------- */
(function age() {
  const birth = new Date(2006, 4, 24);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const beforeBirthday = (now.getMonth() < 4) || (now.getMonth() === 4 && now.getDate() < 24);
  if (beforeBirthday) years -= 1;
  const el = document.querySelector('.tag-green');
  if (el) el.textContent = `2006.05.24 · ${years} 岁`;
})();
