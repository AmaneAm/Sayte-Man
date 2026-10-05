(() => {
  'use strict';

  const css = `
*,
*::before,
*::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --purple: #6d5dfc;
  --cyan: #00d4ff;
  --pink: #ff4ecd;
  --bg: #0a0a12;
  --text: #eeeeee;
  --muted: #a3a3b3;
  --line: rgba(255, 255, 255, .07);
  --surface: rgba(255, 255, 255, .03);
  --accent-text: #a99bff;
  --header-h: 66px;
  color-scheme: dark;
}

body.light {
  --bg: #f5f5f7;
  --text: #111111;
  --muted: #555560;
  --line: rgba(0, 0, 0, .08);
  --surface: rgba(255, 255, 255, .7);
  --accent-text: #4c3fd6;
  color-scheme: light;
}

html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

body {
  font-family: Vazirmatn, system-ui, 'Segoe UI', Tahoma, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
  min-height: 100vh;
  min-height: 100dvh;
  transition: background .3s, color .3s;
}

:focus-visible { outline: 2px solid var(--cyan); outline-offset: 3px; border-radius: 6px; }

.bg {
  position: fixed; inset: 0; z-index: -2;
  overflow: hidden; background: var(--bg);
  transition: background .3s;
}

.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: .5;
  animation: floaty 18s ease-in-out infinite;
  will-change: transform;
}
.b1 { width: 500px; height: 500px; background: var(--purple); top: -100px; right: -100px; }
.b2 { width: 400px; height: 400px; background: var(--cyan); bottom: -120px; left: -80px; animation-delay: -6s; }
.b3 { width: 350px; height: 350px; background: var(--pink); top: 40%; left: 40%; animation-delay: -12s; }
body.light .blob { opacity: .25; }

@keyframes floaty {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(80px, -60px) scale(1.15); }
  66%      { transform: translate(-60px, 50px) scale(.9); }
}

.noise {
  position: fixed; inset: 0; z-index: 9999; pointer-events: none;
  opacity: .035; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.mouse-glow {
  position: fixed; top: 0; left: 0; width: 400px; height: 400px;
  border-radius: 50%; pointer-events: none; z-index: 1;
  background: radial-gradient(circle, rgba(109, 93, 252, .15), transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity .3s; opacity: 0;
  will-change: left, top;
}
body.moving .mouse-glow { opacity: 1; }

.app {
  position: relative; z-index: 2;
  min-height: 100vh;
  min-height: 100dvh;
  animation: fadeIn .5s ease;
}
.app main { outline: none; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

header {
  position: sticky; top: 0; z-index: 100;
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  background: rgba(10, 10, 18, .55);
  border-bottom: 1px solid var(--line);
}
body.light header { background: rgba(245, 245, 247, .7); }

.container { max-width: 1100px; margin: 0 auto; padding: 0 1.2rem; }

.nav-row {
  display: flex; align-items: center; justify-content: space-between;
  height: var(--header-h); gap: 1rem;
}

.brand {
  font-weight: 800; font-size: 19px; text-decoration: none;
  background: linear-gradient(90deg, var(--purple), var(--cyan), var(--pink));
  background-size: 200% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s linear infinite;
}
@keyframes shine { to { background-position: 200% center; } }

nav ul { display: flex; gap: 1.6rem; list-style: none; }
nav ul a {
  text-decoration: none; padding: 6px 0; font-size: 15px;
  color: inherit; opacity: .75;
  position: relative; transition: opacity .2s;
}
nav ul a::after {
  content: ''; position: absolute; bottom: 0; right: 0;
  width: 0; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, var(--purple), var(--cyan));
  transition: width .3s;
}
nav ul a:hover,
nav ul a:focus-visible,
nav ul a.active { opacity: 1; }
nav ul a:hover::after,
nav ul a:focus-visible::after,
nav ul a.active::after { width: 100%; }

.icon-btn {
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px; padding: 6px 11px;
  font-size: 16px; line-height: 1.4; cursor: pointer; color: inherit;
  transition: .2s;
}
body.light .icon-btn { background: rgba(0, 0, 0, .04); border-color: rgba(0, 0, 0, .08); }
.icon-btn:hover { transform: translateY(-2px); background: rgba(109, 93, 252, .2); }
.burger { display: none; }

.hero {
  text-align: center;
  padding: 110px 1.2rem 80px;
  max-width: 860px; margin: 0 auto;
}

.tag {
  display: inline-block; padding: 6px 14px; border-radius: 99px;
  background: rgba(109, 93, 252, .12);
  border: 1px solid rgba(109, 93, 252, .35);
  color: var(--accent-text); font-size: 13px; font-weight: 600;
  margin-bottom: 24px;
  animation: up .6s ease both;
}

.hero h1 {
  font-size: clamp(34px, 6vw, 64px);
  line-height: 1.25; font-weight: 900;
  margin-bottom: 20px; letter-spacing: -1px;
  animation: up .7s ease .05s both;
}

.hero h1 .grad {
  background: linear-gradient(90deg, var(--purple), var(--cyan), var(--pink));
  background-size: 200% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s linear infinite;
}

.typing {
  font-size: clamp(15px, 2.2vw, 19px);
  color: var(--muted); margin-bottom: 32px; min-height: 32px;
  animation: up .8s ease .15s both;
}
.typing .caret {
  display: inline-block; width: 2px; height: 1em;
  background: var(--cyan); vertical-align: -3px;
  margin-right: 3px;
  animation: blink .8s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }

@keyframes up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.btns {
  display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
  animation: up .9s ease .25s both;
}

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 12px;
  text-decoration: none; font-family: inherit; font-weight: 700; font-size: 15px;
  border: 0; cursor: pointer; transition: .25s;
}

.btn-main {
  background: linear-gradient(135deg, var(--purple), var(--cyan));
  color: #fff;
  box-shadow: 0 8px 30px -10px rgba(109, 93, 252, .7);
}
.btn-main:hover { transform: translateY(-3px); box-shadow: 0 14px 40px -10px rgba(109, 93, 252, .9); }

.btn-ghost {
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(255, 255, 255, .15);
  color: inherit;
}
body.light .btn-ghost { background: rgba(0, 0, 0, .03); border-color: rgba(0, 0, 0, .12); }
.btn-ghost:hover { transform: translateY(-3px); border-color: var(--purple); }

.section { max-width: 1100px; margin: 0 auto; padding: 70px 1.2rem; }

.section h2 {
  text-align: center;
  font-size: clamp(24px, 4vw, 38px);
  margin-bottom: 14px; font-weight: 800;
}

.sub {
  text-align: center; color: var(--muted);
  margin-bottom: 48px; font-size: 16px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 22px;
}

.card {
  position: relative; padding: 28px 24px;
  border-radius: 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  transition: transform .15s, border-color .3s;
  overflow: hidden;
}

.card::before {
  content: ''; position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(109, 93, 252, .15), transparent 40%);
  opacity: 0; transition: opacity .3s;
}
.card:hover::before { opacity: 1; }
.card > * { position: relative; z-index: 1; }
.card:hover { border-color: rgba(109, 93, 252, .5); }

.card .ico {
  display: inline-flex; align-items: center; justify-content: center;
  width: 52px; height: 52px; border-radius: 14px;
  background: linear-gradient(135deg, var(--purple), var(--cyan));
  font-size: 24px; margin-bottom: 18px;
  box-shadow: 0 10px 25px -8px rgba(109, 93, 252, .6);
}

.card h3 { font-size: 18px; margin-bottom: 10px; font-weight: 700; }
.card p { font-size: 14.5px; color: var(--muted); }

.stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr));
  gap: 20px; max-width: 800px; margin: 0 auto;
}

.stat {
  text-align: center; padding: 28px 12px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--line);
}

.stat .num {
  font-size: 38px; font-weight: 900;
  background: linear-gradient(135deg, var(--purple), var(--cyan));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block; line-height: 1.3;
}
.stat .lbl { font-size: 13px; color: var(--muted); margin-top: 6px; }

.page-top { text-align: center; padding: 90px 1.2rem 20px; }
.page-top h1 {
  font-size: clamp(30px, 5vw, 48px);
  font-weight: 900; margin-bottom: 10px; line-height: 1.4;
  background: linear-gradient(90deg, #fff, #999);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
body.light .page-top h1 {
  background: linear-gradient(90deg, #111, #666);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.page-top p { color: var(--muted); font-size: 17px; }

.text { max-width: 680px; margin: 0 auto; }
.text p { margin-bottom: 18px; color: var(--muted); font-size: 16px; }
.text code {
  background: rgba(109, 93, 252, .15); color: var(--accent-text);
  padding: 2px 8px; border-radius: 6px; font-size: 14px;
}

form.contact {
  max-width: 480px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 16px;
}
form.contact input,
form.contact textarea {
  width: 100%; padding: 14px 16px;
  border: 1px solid var(--line); border-radius: 12px;
  font-family: inherit; font-size: 15px;
  background: var(--surface); color: inherit;
  transition: border-color .2s, background .2s;
}
form.contact textarea { resize: vertical; min-height: 120px; }
form.contact input::placeholder,
form.contact textarea::placeholder { color: var(--muted); opacity: .8; }
form.contact input:focus,
form.contact textarea:focus {
  outline: none; border-color: var(--purple);
  background: rgba(109, 93, 252, .05);
}
form.contact button { align-self: center; }

footer {
  border-top: 1px solid var(--line);
  padding: 30px 1.2rem; text-align: center;
  color: var(--muted); font-size: 13px; margin-top: 80px;
}

.reveal {
  opacity: 0; transform: translateY(30px);
  transition: opacity .7s ease, transform .7s ease;
}
.reveal.seen { opacity: 1; transform: translateY(0); }

@media (max-width: 720px) {
  .burger { display: block; }
  nav ul {
    display: none; position: absolute; top: var(--header-h); left: 0; right: 0;
    background: rgba(10, 10, 18, .98);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    flex-direction: column; padding: 20px; gap: 16px;
    border-bottom: 1px solid var(--line);
  }
  body.light nav ul { background: rgba(245, 245, 247, .98); }
  nav ul.open { display: flex; }
  .hero { padding: 70px 1.2rem 50px; }
  .section { padding: 50px 1.2rem; }
}


.particles { position: fixed; inset: 0; z-index: -1; pointer-events: none; width: 100%; height: 100%; }
.confetti { position: fixed; inset: 0; z-index: 10001; pointer-events: none; }
.progress {
  position: fixed; top: 0; right: 0; width: 100%; height: 3px; z-index: 10000;
  transform: scaleX(0); transform-origin: right; pointer-events: none;
  background: linear-gradient(90deg, var(--purple), var(--cyan), var(--pink));
}
.bg { transition: background .3s, transform .6s ease-out; }

@keyframes bob { 50% { transform: translateY(-6px); } }
@keyframes wobble { 25% { transform: rotate(-12deg) scale(1.1); } 75% { transform: rotate(12deg) scale(1.1); } }
@keyframes ripple { to { transform: scale(1); opacity: 0; } }
@keyframes pulse {
  0%, 100% { box-shadow: 0 8px 30px -10px rgba(109, 93, 252, .7); }
  50% { box-shadow: 0 8px 40px -4px rgba(0, 212, 255, .8); }
}

.tag { animation: up .6s ease both, bob 3s ease-in-out .8s infinite; }
.btn { position: relative; overflow: hidden; }
.btn-main { animation: pulse 2.6s ease-in-out infinite; }
.btn-main:hover { animation-play-state: paused; }
.rip {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: rgba(255, 255, 255, .35);
  transform: scale(0); animation: ripple .6s ease-out forwards;
}

.card.reveal:not(.seen) { transform: translateY(40px) scale(.92) rotate(2deg); }
.card .ico { animation: bob 4s ease-in-out infinite; }
.card:nth-child(2n) .ico { animation-delay: -1.3s; }
.card:nth-child(3n) .ico { animation-delay: -2.6s; }
.card:hover .ico { animation: wobble .6s ease; }

.section h2::after {
  content: ''; display: block; height: 3px; width: 0; margin: 10px auto 0; border-radius: 3px;
  background: linear-gradient(90deg, var(--purple), var(--cyan), var(--pink));
  transition: width .8s ease .3s;
}
.section h2.seen::after { width: 64px; }

.stat.reveal.seen { transition: transform .3s, border-color .3s, box-shadow .3s; }
.stat.reveal.seen:hover {
  transform: translateY(-6px); border-color: rgba(109, 93, 252, .5);
  box-shadow: 0 18px 40px -20px rgba(109, 93, 252, .8);
}


.cursor, .cursor-ring {
  position: fixed; top: 0; left: 0; pointer-events: none; z-index: 10002;
  border-radius: 50%; transform: translate(-50%, -50%); opacity: 0;
}
.cursor { width: 8px; height: 8px; background: var(--cyan); transition: opacity .3s; }
.cursor-ring {
  width: 36px; height: 36px; border: 1.5px solid var(--purple);
  transition: opacity .3s, width .25s, height .25s, background .25s;
}
body.moving .cursor, body.moving .cursor-ring { opacity: 1; }
body.hovering .cursor-ring { width: 64px; height: 64px; background: rgba(109, 93, 252, .12); }
body.fancy, body.fancy a, body.fancy button { cursor: none; }
body.fancy input, body.fancy textarea { cursor: text; }

.curtain {
  position: fixed; inset: 0; z-index: 10003; pointer-events: none;
  background: linear-gradient(135deg, var(--purple), var(--cyan), var(--pink));
  transform: translateY(100%);
}

.burst {
  position: fixed; width: 6px; height: 6px; border-radius: 50%;
  pointer-events: none; z-index: 10002; animation: burst .7s ease-out forwards;
}
@keyframes burst { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }

.hero {
  translate: var(--tx, 0px) calc(var(--ty, 0px) + var(--hs, 0px));
  opacity: var(--ho, 1);
}

.marquee {
  overflow: hidden; padding: 16px 0;
  border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.track { display: flex; width: max-content; animation: scroll 30s linear infinite; }
.marquee:hover .track { animation-play-state: paused; }
.track span {
  margin: 0 22px; white-space: nowrap; font-weight: 800;
  font-size: clamp(20px, 3vw, 30px); color: var(--muted);
}
.track span:nth-child(3n+1) { color: var(--accent-text); }
@keyframes scroll { to { transform: translateX(50%); } }

::-webkit-scrollbar { width: 12px; height: 12px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--purple), var(--cyan), var(--pink));
  background-clip: padding-box;
  border: 3px solid transparent; border-radius: 99px;
}
::-webkit-scrollbar-thumb:hover { filter: brightness(1.2); }
@supports not selector(::-webkit-scrollbar) {
  html { scrollbar-width: thin; scrollbar-color: var(--purple) transparent; }
}

@media (hover: none) {
  .mouse-glow { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}
`;

  const addTag = (tag, attrs) => {
    const el = document.createElement(tag);
    Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
    document.head.appendChild(el);
    return el;
  };

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  addTag('meta', { name: 'description', content: 'سایت شخصی من؛ سبک، سریع و بدون فریم‌ورک.' });
  addTag('meta', { name: 'theme-color', content: '#0a0a12' });
  addTag('link', {
    rel: 'icon',
    href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E✨%3C/text%3E%3C/svg%3E"
  });

  const bg = document.createElement('div');
  bg.className = 'bg';
  bg.setAttribute('aria-hidden', 'true');
  bg.innerHTML = '<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>';

  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  glow.setAttribute('aria-hidden', 'true');

  const noise = document.createElement('div');
  noise.className = 'noise';
  noise.setAttribute('aria-hidden', 'true');

  document.body.prepend(bg, glow, noise);

  const SITE_NAME = 'سایت من';
  const TYPING_TEXT = 'بدون فریم‌ورک، سبک، سریع، و آماده برای هر پروژه‌ای ✨';

  const app = document.getElementById('app');
  app.className = 'app';
  const body = document.body;
  const faNumber = new Intl.NumberFormat('fa-IR');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
    }
  };

  const pageHome = () => `
    <section class="hero">
      <div class="tag">✨ نسخه ۳.۰</div>
      <h1>سلام، خوش اومدی به<br><span class="grad">دنیای من</span></h1>
      <p class="typing" id="typing"><span class="caret"></span></p>
      <div class="btns">
        <a href="#services" class="btn btn-main">شروع کن ←</a>
        <a href="#about" class="btn btn-ghost">بیشتر بدون</a>
      </div>
    </section>

    <div class="marquee reveal" aria-hidden="true"><div class="track"><span>⚡ سریع</span><span>🎨 خلاق</span><span>🚀 مدرن</span><span>💎 تمیز</span><span>🌙 شب و روز</span><span>✨ روان</span><span>🛠 قابل تغییر</span><span>📱 ریسپانسیو</span><span>⚡ سریع</span><span>🎨 خلاق</span><span>🚀 مدرن</span><span>💎 تمیز</span><span>🌙 شب و روز</span><span>✨ روان</span><span>🛠 قابل تغییر</span><span>📱 ریسپانسیو</span></div></div>

    <section class="section">
      <h2 class="reveal">چرا اینجا؟</h2>
      <p class="sub reveal">یه سری چیز که اینجا رو فرق می‌ذاره</p>
      <div class="cards">
        <div class="card reveal">
          <div class="ico" aria-hidden="true">⚡</div>
          <h3>سریع مثل برق</h3>
          <p>هیچ کتابخانه سنگینی نیست. فقط خودمون و مرورگر. لود در کسری از ثانیه.</p>
        </div>
        <div class="card reveal">
          <div class="ico" aria-hidden="true">📱</div>
          <h3>موبایل اول</h3>
          <p>روی هر صفحه‌ای، از گوشی بگیر تا مانیتور بزرگ، مرتب و تمیز دیده می‌شه.</p>
        </div>
        <div class="card reveal">
          <div class="ico" aria-hidden="true">🌙</div>
          <h3>حالت شب</h3>
          <p>چشمت اذیت نمی‌شه. یه دکمه، همه چی آروم و تاریک می‌شه.</p>
        </div>
        <div class="card reveal">
          <div class="ico" aria-hidden="true">🎨</div>
          <h3>قابل تغییر</h3>
          <p>رنگ اصلی رو عوض کن، کل سایت خودش با همون هماهنگ می‌شه.</p>
        </div>
        <div class="card reveal">
          <div class="ico" aria-hidden="true">🚀</div>
          <h3>انیمیشن نرم</h3>
          <p>همه چیز آروم میاد و می‌ره. حس خوبی می‌ده وقتی اسکرول می‌کنی.</p>
        </div>
        <div class="card reveal">
          <div class="ico" aria-hidden="true">💎</div>
          <h3>تمیز و سبک</h3>
          <p>کد ساده و خوانا. هر وقت خواستی خودت راحت تغییرش بده.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="reveal">یه نگاه به عددها</h2>
      <p class="sub reveal">اینا رو خودت می‌تونی عوض کنی</p>
      <div class="stats">
        <div class="stat reveal"><span class="num" data-n="99">۰</span><div class="lbl">سرعت لود</div></div>
        <div class="stat reveal"><span class="num" data-n="120">۰</span><div class="lbl">پروژه موفق</div></div>
        <div class="stat reveal"><span class="num" data-n="1000">۰</span><div class="lbl">کاربر راضی</div></div>
        <div class="stat reveal"><span class="num" data-n="24">۰</span><div class="lbl">پشتیبانی</div></div>
      </div>
    </section>`;

  const pageAbout = () => `
    <div class="page-top">
      <h1>درباره ما</h1>
      <p>یه کم از خودمون بگیم</p>
    </div>
    <section class="section">
      <div class="text reveal">
        <p>اینجا هر چی دوست داری بنویس. کی هستی، چیکار می‌کنی، چرا این سایت رو زدی بالا.</p>
        <p>کوتاه نگه‌دار. کسی حوصله متن طولانی نداره. یکی دو تا پاراگراف قشنگ کافیه.</p>
        <p>اگه خواستی عکس هم بذاری، با تگ <code>&lt;img&gt;</code> راحته. یه کلاس بهش بده و تو CSS استایل کن.</p>
      </div>
    </section>`;

  const pageServices = () => `
    <div class="page-top">
      <h1>خدمات</h1>
      <p>چیزایی که ارائه می‌دیم</p>
    </div>
    <section class="section">
      <div class="cards">
        <div class="card reveal">
          <div class="ico" aria-hidden="true">🎯</div>
          <h3>طراحی سایت</h3>
          <p>از یه صفحه ساده تا چند صفحه‌ای با روتر. هر چی خواستی.</p>
        </div>
        <div class="card reveal">
          <div class="ico" aria-hidden="true">📈</div>
          <h3>سئو</h3>
          <p>کارای پایه‌ای که تو گوگل بهتر دیده شی و بالاتر بیای.</p>
        </div>
        <div class="card reveal">
          <div class="ico" aria-hidden="true">🛠</div>
          <h3>پشتیبانی</h3>
          <p>بعد از تحویل هم در خدمتیم. هر وقت چیزی خراب شد، هستیم.</p>
        </div>
        <div class="card reveal">
          <div class="ico" aria-hidden="true">🎨</div>
          <h3>طراحی رابط</h3>
          <p>یه UI تمیز و مدرن که کاربرا دوستش داشته باشن.</p>
        </div>
      </div>
    </section>`;

  const pageContact = () => `
    <div class="page-top">
      <h1>تماس</h1>
      <p>هر وقت خواستی بنویس</p>
    </div>
    <section class="section">
      <form class="contact reveal" id="contactForm">
        <input type="text" name="name" placeholder="اسمت چیه؟" aria-label="نام" autocomplete="name" required>
        <input type="email" name="email" placeholder="ایمیلت" aria-label="ایمیل" autocomplete="email" dir="ltr" required>
        <textarea name="message" rows="5" placeholder="پیامت رو بنویس..." aria-label="پیام" required></textarea>
        <button class="btn btn-main" type="submit" aria-live="polite">بفرست 🚀</button>
      </form>
    </section>`;

  const routes = {
    home: { title: 'خانه', view: pageHome },
    about: { title: 'درباره', view: pageAbout },
    services: { title: 'خدمات', view: pageServices },
    contact: { title: 'تماس', view: pageContact }
  };

  const makeHeader = (current) => {
    const link = (hash, label) =>
      `<li><a href="#${hash}"${current === hash ? ' class="active" aria-current="page"' : ''}>${label}</a></li>`;

    return `<header><div class="container nav-row">
      <a href="#home" class="brand">${SITE_NAME}</a>
      <nav aria-label="منوی اصلی">
        <ul id="navList">
          ${link('home', 'خانه')}
          ${link('about', 'درباره')}
          ${link('services', 'خدمات')}
          ${link('contact', 'تماس')}
        </ul>
      </nav>
      <button class="icon-btn burger" id="burger" type="button" aria-label="باز و بسته کردن منو" aria-expanded="false" aria-controls="navList">☰</button>
      <button class="icon-btn" id="themeBtn" type="button" aria-label="تغییر تم"></button>
    </div></header>`;
  };

  const footerHTML = `<footer>© ${faNumber.format(new Date().getFullYear()).replace(/٬/g, '')} ${SITE_NAME} — با ☕ و کمی حوصله</footer>`;

  let typeTimer = null;
  let observers = [];
  let firstRender = true;

  const applyTheme = (light) => {
    body.classList.toggle('light', light);
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = light ? '☀️' : '🌙';
  };

  const initTheme = () => {
    const saved = storage.get('light');
    const light = saved === null
      ? window.matchMedia('(prefers-color-scheme: light)').matches
      : saved === '1';
    applyTheme(light);
  };

  const setMenu = (open) => {
    const list = document.getElementById('navList');
    const burger = document.getElementById('burger');
    if (!list || !burger) return;
    list.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  };

  const startTyping = () => {
    const el = document.getElementById('typing');
    if (!el) return;
    const caret = el.querySelector('.caret');
    const chars = Array.from(TYPING_TEXT);

    if (reducedMotion.matches) {
      caret.insertAdjacentText('beforebegin', TYPING_TEXT);
      return;
    }

    let i = 0;
    typeTimer = setInterval(() => {
      if (i >= chars.length) {
        clearInterval(typeTimer);
        typeTimer = null;
        return;
      }
      caret.insertAdjacentText('beforebegin', chars[i++]);
    }, 45);
  };

  const countUp = (el) => {
    const target = Number(el.dataset.n);
    const final = `${faNumber.format(target).replace(/٬/g, '')}+`;

    if (reducedMotion.matches) {
      el.textContent = final;
      return;
    }

    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = t < 1 ? faNumber.format(Math.floor(eased * target)).replace(/٬/g, '') : final;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observe = (selector, options, onSeen) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    const io = new IntersectionObserver((entries) => {
      let k = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onSeen(entry.target, k++);
        io.unobserve(entry.target);
      });
    }, options);
    elements.forEach((el) => io.observe(el));
    observers.push(io);
  };

  const revealAll = () => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('seen'));
      document.querySelectorAll('.num').forEach((el) => countUp(el));
      return;
    }
    observe('.reveal', { threshold: .12 }, (el, k) => {
      setTimeout(() => el.classList.add('seen'), k * 80);
    });
    observe('.num', { threshold: .4 }, (el) => countUp(el));
  };

  const render = () => {
    let route = (location.hash || '#home').slice(1);
    if (!routes[route]) route = 'home';

    clearInterval(typeTimer);
    typeTimer = null;
    observers.forEach((io) => io.disconnect());
    observers = [];

    app.innerHTML = `${makeHeader(route)}<main id="main" tabindex="-1">${routes[route].view()}</main>${footerHTML}`;
    document.title = `${routes[route].title} | ${SITE_NAME}`;

    app.style.animation = 'none';
    void app.offsetHeight;
    app.style.animation = '';

    applyTheme(body.classList.contains('light'));
    revealAll();
    if (route === 'home') startTyping();
    scrambleTitle();
    parallax();

    if (!firstRender) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.getElementById('main').focus({ preventScroll: true });
    }
    firstRender = false;
  };

  app.addEventListener('click', (e) => {
    if (e.target.closest('#themeBtn')) {
      const light = !body.classList.contains('light');
      storage.set('light', light ? '1' : '0');
      applyTheme(light);
      return;
    }
    if (e.target.closest('#burger')) {
      const open = !document.getElementById('navList').classList.contains('open');
      setMenu(open);
      return;
    }
    if (e.target.closest('#navList a')) setMenu(false);
  });

  app.addEventListener('submit', (e) => {
    const form = e.target.closest('#contactForm');
    if (!form) return;
    e.preventDefault();

    const btn = form.querySelector('button');
    if (btn.disabled) return;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = '✓ فرستاده شد';
    confetti();
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 1800);
  });

  app.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });

  document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    body.classList.add('moving');
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
  document.documentElement.addEventListener('mouseleave', () => body.classList.remove('moving'));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) setMenu(false);
  });

  window.addEventListener('hashchange', () => go());


  const motionOK = () => !reducedMotion.matches;

  const progress = document.createElement('div');
  progress.className = 'progress';
  progress.setAttribute('aria-hidden', 'true');
  body.appendChild(progress);

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('hashchange', updateProgress);

  const initParticles = () => {
    if (!motionOK()) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'particles';
    canvas.setAttribute('aria-hidden', 'true');
    body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let dots = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(80, Math.floor((w * h) / 18000));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .4,
        vy: (Math.random() - .5) * .4,
        r: Math.random() * 1.5 + .8
      }));
    };

    const frame = () => {
      requestAnimationFrame(frame);
      if (document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      const rgb = body.classList.contains('light') ? '109,93,252' : '169,155,255';
      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d > 1 && d < 160) {
          p.x += (dx / d) * .5;
          p.y += (dy / d) * .5;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},.7)`;
        ctx.fill();
        for (let j = i + 1; j < dots.length; j++) {
          const q = dots[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(${rgb},${.18 * (1 - dist / 120)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    };

    window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.documentElement.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });
    window.addEventListener('resize', resize);
    resize();
    frame();
  };

  const confetti = () => {
    if (!motionOK()) return;
    const c = document.createElement('canvas');
    c.className = 'confetti';
    c.setAttribute('aria-hidden', 'true');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    body.appendChild(c);
    const ctx = c.getContext('2d');
    const colors = ['#6d5dfc', '#00d4ff', '#ff4ecd', '#10b981', '#fbbf24'];
    const pieces = Array.from({ length: 120 }, () => ({
      x: c.width / 2,
      y: c.height * .6,
      vx: (Math.random() - .5) * 14,
      vy: -Math.random() * 16 - 4,
      s: Math.random() * 8 + 4,
      rot: Math.random() * 6,
      vr: (Math.random() - .5) * .4,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    const t0 = performance.now();
    const tick = (now) => {
      const t = now - t0;
      ctx.clearRect(0, 0, c.width, c.height);
      pieces.forEach((p) => {
        p.vy += .35;
        p.vx *= .99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - t / 2200);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6);
        ctx.restore();
      });
      if (t < 2200) requestAnimationFrame(tick);
      else c.remove();
    };
    requestAnimationFrame(tick);
  };

  app.addEventListener('pointermove', (e) => {
    if (!motionOK() || e.pointerType !== 'mouse') return;
    const card = e.target.closest('.card');
    if (card) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transition = 'transform .1s, opacity .7s, border-color .3s';
      card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-4px)`;
    }
    const btn = e.target.closest('.btn');
    if (btn) {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .2;
      const y = (e.clientY - r.top - r.height / 2) * .3 - 3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  app.addEventListener('pointerout', (e) => {
    const el = e.target.closest('.card, .btn');
    if (!el || el.contains(e.relatedTarget)) return;
    el.style.transform = '';
    el.style.transition = '';
  });

  app.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn || !motionOK()) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'rip';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });


  initParticles();


  const scrambleTitle = () => {
    const el = document.querySelector('.page-top h1');
    if (!el || !motionOK()) return;
    const final = el.textContent;
    const letters = Array.from('ابپتثجچحخدذرزسشصضطظعغفقکگلمنوهی');
    const chars = Array.from(final);
    const total = 18;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      el.textContent = chars
        .map((c, i) => (c === ' ' || frame >= (i / chars.length) * total
          ? c
          : letters[Math.floor(Math.random() * letters.length)]))
        .join('');
      if (frame > total) {
        el.textContent = final;
        clearInterval(id);
      }
    }, 40);
  };

  const parallax = () => {
    const hero = document.querySelector('.hero');
    if (!hero || !motionOK()) return;
    const y = Math.min(window.scrollY, 600);
    hero.style.setProperty('--hs', `${y * .25}px`);
    hero.style.setProperty('--ho', String(Math.max(0, 1 - y / 520)));
  };
  window.addEventListener('scroll', parallax, { passive: true });

  document.addEventListener('pointermove', (e) => {
    if (!motionOK() || e.pointerType !== 'mouse') return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.style.setProperty('--tx', `${(e.clientX / window.innerWidth - .5) * -14}px`);
    hero.style.setProperty('--ty', `${(e.clientY / window.innerHeight - .5) * -10}px`);
  });

  const curtain = document.createElement('div');
  curtain.className = 'curtain';
  curtain.setAttribute('aria-hidden', 'true');
  body.appendChild(curtain);

  let busy = false;
  const go = () => {
    if (!motionOK() || busy) {
      render();
      return;
    }
    busy = true;
    curtain.style.transition = 'transform .45s cubic-bezier(.7,0,.3,1)';
    curtain.style.transform = 'translateY(0)';
    setTimeout(() => {
      render();
      curtain.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        curtain.style.transition = 'none';
        curtain.style.transform = 'translateY(100%)';
        busy = false;
      }, 460);
    }, 460);
  };

  document.addEventListener('click', (e) => {
    if (!motionOK()) return;
    const colors = ['#6d5dfc', '#00d4ff', '#ff4ecd'];
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 12;
      const dist = 30 + Math.random() * 40;
      dot.className = 'burst';
      dot.style.cssText = `left:${e.clientX - 3}px;top:${e.clientY - 3}px;background:${colors[i % 3]};--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist}px`;
      body.appendChild(dot);
      setTimeout(() => dot.remove(), 700);
    }
  });

  if (motionOK() && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    body.classList.add('fancy');
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor';
    ring.className = 'cursor-ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    body.append(dot, ring);

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    document.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      body.classList.toggle('hovering', Boolean(e.target.closest('a, button, .card, input, textarea')));
    });
    const follow = () => {
      requestAnimationFrame(follow);
      pos.x += (target.x - pos.x) * .18;
      pos.y += (target.y - pos.y) * .18;
      ring.style.left = `${pos.x}px`;
      ring.style.top = `${pos.y}px`;
    };
    follow();
  }

  initTheme();
  render();
})();