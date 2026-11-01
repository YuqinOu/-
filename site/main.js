/* ==========================================================
   WELCOME · 送给最最亲爱的扬子
   照片数据与交互
   ========================================================== */

/* w/h: 原始比例  solo: 单人照 */
const PHOTOS = [
  /* ---------- 01 初中 ---------- */
  { id: 21, ch: 1, w: 1000, h: 1333, t: '红围巾和风',
    s: '她低头走着，我喊了她一声。风把围巾吹起来的那一下，她抬头笑了——我刚好按下快门。' },
  { id: 6, ch: 1, w: 1500, h: 1000, t: '桥的那一边',
    s: '那天走了很多路，风很大，天快黑了。她说这里好看，我们就站在树下，各比了一个耶。' },
  { id: 20, ch: 1, w: 900, h: 1600, t: '山坡上的野餐',
    s: '地上铺了一大块布，零食摆得乱七八糟。她站在风里整理东西，我举着手机，把整个午后拍歪了。' },

  /* ---------- 02 高中（按时间顺序） ---------- */
  { id: 33, ch: 2, w: 900, h: 1600, t: '兔耳朵是画上去的',
    s: '刚上高中，她去了湖南第一师范。放假她回来，我们就在街上晃到很晚。滤镜给我们画了兔耳朵、往脸上撒了一把星星，两个人还认真地比了个心。' },
  { id: 34, ch: 2, w: 900, h: 1600, t: '再拍一张就回家',
    s: '同一晚的第二张。她凑得更近，笑得眼睛都快看不见了。那阵子总觉得时间很多，其实一个假期也就这么几个晚上。' },
  { id: 32, ch: 2, w: 1000, h: 1349, t: '对镜子的彩排',
    s: '高二的暑假，我去了怀化，找了家能拍照的店。试了一下午衣服，最后两个人一起穿白裙、披头纱，挤在同一面镜子前面自拍。' },
  { id: 26, ch: 2, w: 1000, h: 1333, t: '一人一顶皇冠',
    s: '换到粉色的公主裙，一人一顶皇冠，还举了仙女棒。她嘟嘴，我憋笑。拍完那天最记得的其实不是照片，是晚上那顿火锅——热气把眼镜糊得什么都看不清。' },
  { id: 29, ch: 2, w: 1000, h: 1000, t: '好不容易放一天假',
    s: '高中能出来的日子不多，这顿烤肉提前好几天就开始期待。冬天，两个人裹得圆滚滚，先对着镜头做鬼脸，再慢慢研究点什么。' },
  { id: 30, ch: 2, w: 1000, h: 1000, t: '五和六',
    s: '谁先比的手已经忘了，反正最后她比五、我比六。这种傻事，好像也只有在放假那一天才做得出来。' },
  { id: 31, ch: 2, w: 1251, h: 1000, t: '热气里的耶',
    s: '坐下来第一件事还是拍照。她的耶永远比得端端正正，我在旁边只会笑。锅里的烟一直往上飘，把灯都熏得发黄。' },
  { id: 28, ch: 2, w: 1000, h: 1000, t: '吃完还不想走',
    s: '出来站在门口仰着头看灯，谁也不肯先说要回家。角度很怪，脸都变形了，可我最喜欢这张——它不太像在拍照。' },
  { id: 27, ch: 2, w: 1000, h: 1500, t: '画出来的海边',
    s: '又一个放假的下午，站在一整轮画出来的落日和海前面。她说以后要去看真的，我说行，那我负责拍。' },
  { id: 25, ch: 2, w: 1000, h: 1334, t: '你说你在对面',
    s: '快高考的时候，我在豆花那边，发消息说我在这儿。过了一会儿，你就从对面走过来了，然后我们拍了这张。那阵子每个人都很紧，见到你我才敢松一下。' },
  { id: 24, ch: 2, w: 1000, h: 1333, t: '考完的第二天',
    s: '高考完第二天，我来长沙考试，晚上我们去了大学城。你带我去了 KTV，唱到嗓子哑。照片里身后的灯牌是红的，两个人都笑得像终于被放出来。' },

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
    s: '她站在镜子前面，我在她身后举着相机。所以这张照片里有两个我：一个是镜中的影子，一个是按下快门的人。' }
];

/* ---------------- 工具 ---------------- */
const gallery = document.getElementById('gallery');
const pad = n => String(n).padStart(2, '0');

/* 稳定伪随机：每次刷新角度一致 */
function rot(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const v = x - Math.floor(x);
  return (v * 3.2 - 1.6).toFixed(2);
}

const colsForWidth = w => (w >= 1120 ? 3 : w >= 700 ? 2 : 1);

const PHOTO_INDEX = new Map();
PHOTOS.forEach((p, i) => PHOTO_INDEX.set(p.id, i));

/* ---------------- 渲染相册（一整条连续的瀑布流） ---------------- */
function renderGallery() {
  const cols = colsForWidth(window.innerWidth);
  gallery.innerHTML = '';

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

  PHOTOS.forEach(p => {
    const cell = document.createElement('div');
    cell.className = 'cell';

    const fig = document.createElement('figure');
    fig.className = 'photo';
    fig.style.setProperty('--rot', rot(p.id) + 'deg');
    fig.dataset.pid = PHOTO_INDEX.get(p.id);

    fig.innerHTML = `
      <img src="assets/img/p${pad(p.id)}.jpg"
           alt="舒名扬与朋友的照片"
           width="${p.w}" height="${p.h}"
           loading="lazy" decoding="async"
           style="aspect-ratio:${p.w}/${p.h}">
    `;
    cell.appendChild(fig);

    /* 放进当前最矮的一列 */
    let target = colEls[0];
    for (const col of colEls) {
      if (parseFloat(col.dataset.h) < parseFloat(target.dataset.h)) target = col;
    }
    target.appendChild(cell);

    target.dataset.h = parseFloat(target.dataset.h) + (p.h / p.w) * 100;
  });

  gallery.appendChild(flow);
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
}, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

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

let lastCols = colsForWidth(window.innerWidth);
let rzTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(rzTimer);
  rzTimer = setTimeout(() => {
    const c = colsForWidth(window.innerWidth);
    if (c !== lastCols) { lastCols = c; renderGallery(); }
  }, 220);
});

/* ---------------- 夜里的漂浮句子 ---------------- */
const FRAGMENTS = [
  { t: '那天很冷，屋里很暖',        x: '3%',  y: '21%', r: '-2deg',   d: '11s' },
  { t: '放学路上总有两个人的影子',   x: '2%',  y: '39%', r: '1.5deg',  d: '13s' },
  { t: '灯是暖黄的',                x: '8%',  y: '57%', r: '-1deg',   d: '9s'  },
  { t: '红围巾和风',                x: '5%',  y: '74%', r: '2deg',    d: '12s' },
  { t: '门口的两分钟',              x: '17%', y: '87%', r: '-2.5deg', d: '14s' },
  { t: '她说以后要去看真的',         x: '25%', y: '7%',  r: '1deg',    d: '16s' },
  { t: '两杯，和一块屏幕',          right: '6%',  y: '19%', r: '2deg',    d: '10s' },
  { t: '三厘米',                    right: '17%', y: '33%', r: '-1.5deg', d: '13s' },
  { t: '干杯',                      right: '8%',  y: '50%', r: '1deg',    d: '8s'  },
  { t: '笑到忍不住',                right: '21%', y: '65%', r: '-2deg',   d: '12s' },
  { t: '她又把脸贴过来',            right: '5%',  y: '79%', r: '1.5deg',  d: '15s' },
  { t: '一只兔子',                  right: '30%', y: '11%', r: '-1deg',   d: '11s' }
];

(function renderFragments() {
  const box = document.getElementById('fragments');
  if (!box) return;
  FRAGMENTS.forEach(f => {
    const el = document.createElement('span');
    el.className = 'frag';
    el.textContent = f.t;
    el.style.setProperty('--y', f.y);
    el.style.setProperty('--r', f.r);
    el.style.setProperty('--d', f.d);
    if (f.x) el.style.setProperty('--x', f.x);
    if (f.right) el.style.right = f.right;
    box.appendChild(el);
  });
})();

/* ---------------- 大图浏览 ---------------- */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCount = document.getElementById('lbCount');
let current = 0;

function openAt(pid) {
  current = (pid + PHOTOS.length) % PHOTOS.length;
  const p = PHOTOS[current];
  lbImg.src = `assets/img/p${pad(p.id)}.jpg`;
  lbImg.alt = `舒名扬与朋友的照片：${p.t}`;
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

let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 55) openAt(current + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

/* ---------------- 尾页信封 ---------------- */
const envBtn = document.getElementById('envOpen');
const envObj = document.getElementById('envObj');
const letterModal = document.getElementById('letterModal');
const letterClose = document.getElementById('letterClose');
let letterTimer = null;

function openLetter() {
  if (!envBtn || !letterModal) return;
  clearTimeout(letterTimer);
  envObj.classList.add('open');
  /* 让翻盖先掀起来，再把信纸放大到眼前 */
  letterTimer = setTimeout(() => {
    letterModal.classList.add('open');
    letterModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
    letterClose.focus({ preventScroll: true });
  }, 430);
}

function closeLetter() {
  clearTimeout(letterTimer);
  letterModal.classList.remove('open');
  letterModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
  envBtn.focus({ preventScroll: true });
  setTimeout(() => envObj.classList.remove('open'), 140);
}

if (envBtn && letterModal) {
  envBtn.addEventListener('click', openLetter);
  letterClose.addEventListener('click', closeLetter);
  letterModal.addEventListener('click', (e) => { if (e.target === letterModal) closeLetter(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && letterModal.classList.contains('open')) closeLetter();
  });
}
