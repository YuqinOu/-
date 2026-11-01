/* ============================================================
   HERO · 32 本用你们照片做的硬皮书，斜排成一行
   three r160（本地 vendor，避免 CDN 不可达）
   ============================================================ */

const FALLBACK = () => document.documentElement.classList.add('no3d');

(async () => {
  const canvas = document.getElementById('fhCanvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { FALLBACK(); return; }

  let THREE, RoomEnvironment;
  try {
    THREE = await import('./vendor/three.module.js');
    ({ RoomEnvironment } = await import('./vendor/addons/environments/RoomEnvironment.js'));
  } catch (e) {
    console.warn('[hero3d] three.js not available', e);
    FALLBACK(); return;
  }

  /* ---------- 封面图集：离线把 34 张照片拼成一张 6×6 图 ----------
     每一格都有照片，索引不会越界，所以书列里不会出现空白书壳。 */
  const ATLAS_W = 2040, ATLAS_H = 3048;
  const CW = 340, CH = 508;               /* 单元格 */
  const COLS = 6;
  const ROWS = 6;
  const COUNT = 34;
  const SPINES = [
    '#3d3430', '#51413b', '#835c54', '#795f58', '#614e51', '#58514d',
    '#413330', '#5b4a45', '#4b3228', '#5b564f', '#54473d', '#2b2321',
    '#443631', '#3a2e25', '#32281f', '#241b16', '#31291e', '#714b2c',
    '#6b4628', '#625d59', '#5f5a61', '#605348', '#6c5b50', '#594a41',
    '#65443e', '#655555', '#5c595b', '#4d4236', '#564e4e', '#524a44',
    '#483e3a', '#948a74', '#726050', '#735e51'
  ];
  /* 书列顺序＝相册顺序：最左端是第一张，往右依次到最近一张，
     整排就是同一辑照片书，跟着相册的时间线走。 */
  const ORDER = [
    9, 4, 3, 2, 22, 21, 1, 0, 11, 10, 16, 15, 14, 12, 13, 18, 17,
    8, 7, 6, 23, 24, 26, 27, 30, 29, 28, 25, 31, 33, 32, 19, 5, 20
  ];

  /* ---------- 渲染器 ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(20, 1, 0.1, 200);
  const CAM_DIR = new THREE.Vector3(0.16, 0.09, 1).normalize();  /* 相机相对注视点的方向 */
  const LOOK = new THREE.Vector3(0, 0, 0);
  let camDist = 12;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.045);
  scene.environment = envRT.texture;

  const key = new THREE.DirectionalLight(0xfff4e6, 2.6);
  key.position.set(-5, 7, 6);
  const rim = new THREE.DirectionalLight(0xc6d6ff, 1.15);
  rim.position.set(6, 3, -5);
  const amb = new THREE.AmbientLight(0xffffff, 0.22);
  scene.add(key, rim, amb);

  /* ---------- 纸张纹理 ---------- */
  function pageTexture(horizontal = true) {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    g.fillStyle = '#f1e9d8';
    g.fillRect(0, 0, size, size);
    for (let i = 0; i < size; i += 2) {
      const a = 0.05 + Math.random() * 0.12;
      g.strokeStyle = `rgba(122,96,64,${a.toFixed(3)})`;
      g.lineWidth = 1;
      g.beginPath();
      if (horizontal) { g.moveTo(0, i + 0.5); g.lineTo(size, i + 0.5); }
      else { g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, size); }
      g.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  }
  const texEdge = pageTexture(true);
  const texTop = pageTexture(false);

  /* ---------- 封面纹理 ---------- */
  const loader = new THREE.TextureLoader();
  const load = url => new Promise((res, rej) => loader.load(url, res, undefined, rej));
  let atlas;
  try {
    atlas = await load('assets/covers/atlas.jpg');
  } catch (e) {
    console.warn('[hero3d] atlas failed', e);
    FALLBACK(); return;
  }
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  atlas.colorSpace = THREE.SRGBColorSpace;
  atlas.anisotropy = maxAniso;

  function coverTexture(n) {
    const t = atlas.clone();
    t.needsUpdate = true;
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = maxAniso;
    const cx = (n % COLS) * CW;
    const cy = Math.floor(n / COLS) * CH;
    t.repeat.set((CW - 4) / ATLAS_W, (CH - 4) / ATLAS_H);
    t.offset.set((cx + 2) / ATLAS_W, 1 - (cy + CH - 2) / ATLAS_H);
    return t;
  }

  /* ---------- 几何 ---------- */
  const geo = new THREE.BoxGeometry(1, 1.5, 0.115);
  const root = new THREE.Group();
  scene.add(root);

  const books = [];

  for (let i = 0; i < COUNT; i++) {
    const n = ORDER[i];
    const spine = new THREE.Color(SPINES[n]);

    const mEdge = new THREE.MeshStandardMaterial({ map: texEdge, roughness: 0.9, metalness: 0 });
    const mSpine = new THREE.MeshPhysicalMaterial({ color: spine, roughness: 0.5, clearcoat: 0.35, clearcoatRoughness: 0.4 });
    const mTop = new THREE.MeshStandardMaterial({ map: texTop, roughness: 0.9, metalness: 0 });
    const mCover = new THREE.MeshPhysicalMaterial({ map: coverTexture(n), roughness: 0.55, clearcoat: 0.45, clearcoatRoughness: 0.4 });
    const mBack = new THREE.MeshPhysicalMaterial({ color: spine, roughness: 0.65, clearcoat: 0.15 });

    const mesh = new THREE.Mesh(geo, [mEdge, mSpine, mTop, mTop.clone(), mCover, mBack]);
    const group = new THREE.Group();
    group.add(mesh);
    root.add(group);

    group.rotation.y = -0.20;
    mesh.position.y = -3.5;

    books.push({
      i, n, group, mesh,
      y: -3.5, v: 0, z: 0, vz: 0,
      intro: 0.30 + (COUNT - i) * 0.032
    });
  }

  /* ---------- 书列排布 ----------
     34 本首尾相叠、间距一致，连成完整的一辑书；一行从右下角斜向左后方。 */
  const LAY = {
    land: { x0: 4.55, sx: -0.575, sy: 0.070, z0: 2.60, sz: -0.395, y: -0.30 },
    port: { x0: 2.05, sx: -0.395, sy: 0.052, z0: 2.90, sz: -0.290, y: -0.12 }
  };
  function layout(portrait) {
    const L = portrait ? LAY.port : LAY.land;
    books.forEach((b, i) => {
      b.group.position.set(L.x0 + i * L.sx, L.y + i * L.sy, L.z0 + i * L.sz);
    });
  }

  /* ---------- 尺寸 & 自适应构图 ---------- */
  const host = canvas.parentElement;
  let W = 1, H = 1;
  const v3 = new THREE.Vector3();

  const projX = v => (v.x * 0.5 + 0.5) * W;
  const projY = v => (-v.y * 0.5 + 0.5) * H;

  function hullPoints() {
    const pts = [];
    const ox = root.position.x, oy = root.position.y, oz = root.position.z;
    for (const b of books) {
      const p = b.group.position;
      /* 书高 1.5、宽 1，绕 Y 转了 .34，取八角的粗包络即可 */
      for (const dx of [-0.58, 0.58]) for (const dy of [-0.78, 0.78]) for (const dz of [-0.12, 0.12]) {
        pts.push([p.x + ox + dx, p.y + oy + dy, p.z + oz + dz]);
      }
    }
    return pts;
  }

  function measure() {
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (const p of hullPoints()) {
      v3.set(p[0], p[1], p[2]).project(camera);
      const x = projX(v3), y = projY(v3);
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    return { w: maxX - minX, h: maxY - minY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
  }

  /* 目标：整行完整落在画面里，水平占 94%，垂直重心偏下 */
  function frame() {
    const portrait = W < H;
    const targetW = W * (portrait ? 0.94 : 0.90);
    const targetH = H * (portrait ? 0.56 : 0.54);
    const wantX = W * 0.5;
    const wantY = H * (portrait ? 0.62 : 0.655);

    for (let iter = 0; iter < 5; iter++) {
      /* 1. 距离：按需要缩小的比例推拉相机 */
      const m = measure();
      const s = Math.min(targetW / m.w, targetH / m.h);
      camDist *= 1 / Math.max(Math.min(s, 3), 0.4);
      camDist = Math.min(Math.max(camDist, 4), 90);
      camera.position.copy(LOOK).addScaledVector(CAM_DIR, camDist);
      camera.lookAt(LOOK);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();

      /* 2. 位置：把包络中心挪到目标点 */
      const m2 = measure();
      const perPx = (2 * camDist * Math.tan((camera.fov * Math.PI) / 360)) / H;
      root.position.x -= (m2.cx - wantX) * perPx;
      root.position.y += (m2.cy - wantY) * perPx;
      root.updateMatrixWorld(true);
    }
  }

  function resize() {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    W = w; H = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < h ? 32 : 20;
    LOOK.set(0, 0, 0);
    camDist = 12;
    camera.position.copy(LOOK).addScaledVector(CAM_DIR, camDist);
    camera.lookAt(LOOK);
    camera.updateProjectionMatrix();

    root.position.set(0, 0, 0);
    layout(w < h);
    root.updateMatrixWorld(true);
    frame();
  }

  resize();
  if (window.ResizeObserver) {
    let t = 0;
    new ResizeObserver(() => { clearTimeout(t); t = setTimeout(resize, 120); }).observe(host);
  } else window.addEventListener('resize', resize);

  /* ---------- 指针 ---------- */
  let px = 0, py = 0, hasPointer = false, lastMove = performance.now();
  const coarse = window.matchMedia('(pointer: coarse)').matches;

  window.addEventListener('pointermove', e => {
    px = e.clientX; py = e.clientY;
    hasPointer = true;
    lastMove = performance.now();
  }, { passive: true });
  window.addEventListener('pointerleave', () => { hasPointer = false; });
  window.addEventListener('blur', () => { hasPointer = false; });

  const K = 70, C = 12.5;

  /* ---------- 循环 ---------- */
  const clock = new THREE.Clock();
  const t0 = performance.now() / 1000;

  function project(mesh) {
    mesh.getWorldPosition(v3);
    v3.project(camera);
    return [projX(v3), projY(v3)];
  }

  function loop() {
    const now = performance.now();
    const t = (now - t0) / 1000;
    const dt = Math.min(clock.getDelta(), 0.05);

    /* 虚拟指针：触屏或静止 4 秒后沿书列自动巡游 */
    let cx = px, cy = py, active = hasPointer;
    if (coarse || now - lastMove > 4000) {
      const u = (Math.sin(t * 0.42) + 1) / 2;
      const last = books.length - 1;
      const a = project(books[Math.round(last * 0.88)].mesh);
      const b2 = project(books[Math.round(last * 0.06)].mesh);
      cx = a[0] + (b2[0] - a[0]) * u;
      cy = a[1] + (b2[1] - a[1]) * u;
      active = true;
    }

    const s = Math.max(W, H) * 0.085;

    for (const b of books) {
      let targetLift = 0;
      if (t > b.intro) {
        if (active) {
          const [sx, sy] = project(b.mesh);
          const dx = sx - cx, dy = (sy - cy) * 0.55;
          targetLift = 0.78 * Math.exp(-((dx * dx + dy * dy) / (s * s)));
        }
      }
      const targetY = t > b.intro ? targetLift : -3.5;
      const targetZ = t > b.intro ? targetLift * 0.35 : 0;

      const h = dt / 4;
      for (let k = 0; k < 4; k++) {
        b.v += ((targetY - b.y) * K - b.v * C) * h;
        b.y += b.v * h;
        b.vz += ((targetZ - b.z) * K - b.vz * C) * h;
        b.z += b.vz * h;
      }

      b.mesh.position.y = b.y;
      b.mesh.position.z = b.z;
      b.mesh.rotation.x = -b.v * 0.012;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  /* ---------- 开场动画 ---------- */
  const title = document.querySelector('.fh-title');
  if (title && title.animate) {
    title.animate(
      [
        { opacity: 0, transform: 'translateY(2.2vh)', filter: 'blur(12px)' },
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }
      ],
      { duration: 1400, delay: 250, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
    );
  } else if (title) {
    title.style.opacity = 1;
  }

  document.querySelectorAll('.fh-nav, .fh-row, .fh-scroll').forEach(el => el.classList.add('ready'));

  requestAnimationFrame(loop);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { clock.getDelta(); lastMove = performance.now(); }
  });
})();
