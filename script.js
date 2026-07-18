// DEDEDEE — Big Papa 313 landing
// Vanilla JS port of the original Claude Design artifact (x-dc / sc-if / sc-for template).

(function () {
  'use strict';

  // ---------- DATA ----------
  const tracks = [
    { num: '01', title: 'Intro', feats: 'Morad', dur: '4:06', explicit: false },
    { num: '02', title: 'Zero Games', feats: 'JC Reyes, Gazo', dur: '1:52', explicit: true },
    { num: '03', title: 'Me & U', feats: 'Dei V', dur: '3:09', explicit: false },
    { num: '04', title: 'Dededee', feats: 'Hades66, Gazo', dur: '2:59', explicit: true },
    { num: '05', title: 'Usa', feats: 'Pirlo, Santa Fe Klan', dur: '2:52', explicit: false },
    { num: '06', title: "NIGHT IN LA'CASA", feats: 'D-Block Europe, Cyril Kamer', dur: '2:35', explicit: false },
    { num: '07', title: 'Papier', feats: 'Zkr, JC Reyes', dur: '2:00', explicit: true },
    { num: '08', title: 'San Juditas', feats: 'Santa Fe Klan, Slayter', dur: '2:51', explicit: false },
    { num: '09', title: 'Mentalidad Callejera', feats: 'MC Tuto, Morad', dur: '2:30', explicit: false },
    { num: '10', title: 'Ginger', feats: 'L.A.X, Ngaaka Blinde', dur: '3:01', explicit: false },
    { num: '11', title: 'Marijane', feats: 'Maikel Delacalle, Konshens', dur: '2:33', explicit: false },
    { num: '12', title: 'Olala', feats: 'Zkr, Bobby Vandamme', dur: '2:37', explicit: false },
    { num: '13', title: 'Pokito', feats: 'Moncho Chavea, Youka', dur: '3:08', explicit: false },
    { num: '14', title: 'Secreto', feats: 'Santa Fe Klan', dur: '3:00', explicit: false },
    { num: '15', title: 'Mclaren', feats: 'JC Reyes', dur: '3:10', explicit: true }
  ];

  const names = ['Morad', 'JC Reyes', 'Gazo', 'Dei V', 'Hades66', 'Pirlo', 'Santa Fe Klan', 'D-Block Europe', 'Cyril Kamer', 'Zkr', 'Slayter', 'MC Tuto', 'L.A.X', 'Ngaaka Blinde', 'Maikel Delacalle', 'Konshens', 'Bobby Vandamme', 'Moncho Chavea', 'Youka'];
  const half = Math.ceil(names.length / 2);
  function mkRow(list) {
    const row = [];
    for (let r = 0; r < 2; r++) list.forEach((n, i) => {
      const filled = (i % 2 === 0);
      row.push({ name: n, color: filled ? '#f0ede7' : 'transparent', stroke: filled ? '0px transparent' : '1.5px rgba(240,237,231,0.45)' });
    });
    return row;
  }
  const artistsRow1 = mkRow(names.slice(0, half));
  const artistsRow2 = mkRow(names.slice(half));
  const platforms = [
    { name: 'Spotify', url: 'https://open.spotify.com/intl-es/album/1oJei417sZd9WRe5VJK7cd?si=fBpvAmxCSNefWKpBNA44vg' },
    { name: 'Apple Music', url: 'https://music.apple.com/es/album/dededee-vol-1/1891312029' },
    { name: 'YouTube', url: 'https://youtube.com/playlist?list=OLAK5uy_lEF82553i9z-2sJOI32TfK4QCIfqPcGZs&si=xmdXynvK31ZDlp6n' },
    { name: 'Amazon Music', url: 'https://music.amazon.com/albums/B0GW9293XS?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_tbES2VWXqmq2W7dphluT6TZoK' }
  ];

  const glassOn = 'linear-gradient(135deg, rgba(210,44,32,0.55), rgba(210,44,32,0.18))';
  const glassOff = 'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))';

  const state = { vol: 1 };

  // ---------- RENDER (fills the sc-for / {{ }} placeholders from the original template) ----------
  function renderTracklist() {
    const wrap = document.getElementById('trackListWrap');
    wrap.innerHTML = '';
    tracks.forEach((t) => {
      const row = document.createElement('div');
      row.className = 'trackrow';
      row.dataset.hover = '1';
      row.style.cssText = 'display: grid; grid-template-columns: 84px 1fr auto 44px; align-items: center; gap: 22px; padding: 21px 18px; border-bottom: 1px solid #1a1a1c; position: relative; overflow: hidden; transition: padding-left 0.3s';

      const fill = document.createElement('div');
      fill.className = 'trackfill';
      fill.style.cssText = 'position: absolute; inset: 0; background: #101012; transform: scaleX(0); transform-origin: left; pointer-events: none';

      const no = document.createElement('div');
      no.className = 'trackno';
      no.style.cssText = "font-family: 'Archivo Black', sans-serif; font-size: 21px; color: #2e2e30; position: relative; transition: color 0.25s";
      no.textContent = t.num;

      const mid = document.createElement('div');
      mid.style.cssText = 'display: flex; flex-direction: column; gap: 3px; position: relative';
      const titleLine = document.createElement('div');
      titleLine.style.cssText = 'display: flex; align-items: center; gap: 10px';
      const titleSpan = document.createElement('span');
      titleSpan.style.cssText = "font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 28px; letter-spacing: 1px; color: #f0ede7; text-transform: uppercase";
      titleSpan.textContent = t.title;
      titleLine.appendChild(titleSpan);
      if (t.explicit) {
        const e = document.createElement('span');
        e.style.cssText = 'font-size: 10px; font-weight: 600; color: #8a8781; border: 1px solid #3a3a3b; padding: 1px 5px; border-radius: 2px';
        e.textContent = 'E';
        titleLine.appendChild(e);
      }
      const featsLine = document.createElement('div');
      featsLine.style.cssText = 'font-size: 15px; color: #77746e';
      featsLine.textContent = 'Big Papa 313 · ' + t.feats;
      mid.appendChild(titleLine);
      mid.appendChild(featsLine);

      const dur = document.createElement('div');
      dur.style.cssText = "font-family: 'Barlow Condensed', sans-serif; font-size: 17px; color: #55524c; letter-spacing: 2px; position: relative";
      dur.textContent = t.dur;

      const arrow = document.createElement('div');
      arrow.className = 'trackarrow';
      arrow.style.cssText = "font-family: 'Barlow Condensed', sans-serif; font-size: 24px; color: #d22c20; opacity: 0; position: relative";
      arrow.textContent = '→';

      row.appendChild(fill);
      row.appendChild(no);
      row.appendChild(mid);
      row.appendChild(dur);
      row.appendChild(arrow);
      wrap.appendChild(row);
    });
  }

  function renderArtists() {
    const r1 = document.getElementById('artistRow1Inner');
    const r2 = document.getElementById('artistRow2Inner');
    r1.innerHTML = '';
    r2.innerHTML = '';
    artistsRow1.forEach((a) => {
      const span = document.createElement('span');
      span.style.cssText = "font-family: 'Archivo Black', sans-serif; font-size: clamp(44px, 6.5vw, 96px); line-height: 1; color: " + a.color + "; -webkit-text-stroke: " + a.stroke + "; text-transform: uppercase; padding: 0 34px; white-space: nowrap";
      span.textContent = a.name;
      r1.appendChild(span);
    });
    artistsRow2.forEach((a) => {
      const span = document.createElement('span');
      span.style.cssText = "font-family: 'Archivo Black', sans-serif; font-size: clamp(44px, 6.5vw, 96px); line-height: 1; color: " + a.color + "; -webkit-text-stroke: " + a.stroke + "; text-transform: uppercase; padding: 0 34px; white-space: nowrap";
      span.textContent = a.name;
      r2.appendChild(span);
    });
  }

  function renderPlatforms() {
    const wrap = document.getElementById('platformsWrap');
    wrap.innerHTML = '';
    platforms.forEach((p) => {
      const a = document.createElement('a');
      a.dataset.hover = '1';
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = p.name;
      a.style.cssText = "font-family: 'Barlow Condensed', sans-serif; font-size: 17px; letter-spacing: 2px; text-transform: uppercase; color: #f0ede7; padding: 13px 30px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.16); background: linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03)); backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4); box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -8px 18px rgba(255,255,255,0.03), 0 10px 30px rgba(0,0,0,0.4); display: inline-block; transition: all 0.3s";
      attachHover(a, {
        background: glassOn,
        borderColor: 'rgba(240,90,75,0.5)',
        color: '#ffffff',
        transform: 'translateY(-2px)'
      });
      wrap.appendChild(a);
    });
  }

  function updateNavButtons() {
    const b1 = document.getElementById('volBtn1');
    const b2 = document.getElementById('volBtn2');
    const vol = state.vol;
    b1.style.color = vol === 1 ? '#ffffff' : '#b3afa7';
    b1.style.background = vol === 1 ? glassOn : glassOff;
    b1.style.borderColor = vol === 1 ? 'rgba(240,90,75,0.55)' : 'rgba(255,255,255,0.14)';
    b1.style.border = '1px solid ' + (vol === 1 ? 'rgba(240,90,75,0.55)' : 'rgba(255,255,255,0.14)');
    b2.style.color = vol === 2 ? '#ffffff' : '#b3afa7';
    b2.style.background = vol === 2 ? glassOn : glassOff;
    b2.style.border = '1px solid ' + (vol === 2 ? 'rgba(240,90,75,0.55)' : 'rgba(255,255,255,0.14)');
  }

  // generic hover-style swap (replaces the original "style-hover" attribute)
  function attachHover(el, hoverStyles) {
    const base = {};
    Object.keys(hoverStyles).forEach((k) => { base[k] = el.style[k]; });
    el.addEventListener('mouseenter', () => {
      Object.keys(hoverStyles).forEach((k) => { el.style[k] = hoverStyles[k]; });
    });
    el.addEventListener('mouseleave', () => {
      Object.keys(hoverStyles).forEach((k) => { el.style[k] = base[k]; });
    });
  }

  // ---------- APP LOGIC (ported from the DCLogic component) ----------
  const App = {
    _mm: null,

    init() {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);

      renderTracklist();
      renderArtists();
      renderPlatforms();
      updateNavButtons();

      document.getElementById('volBtn1').addEventListener('click', () => this.goVol(1));
      document.getElementById('volBtn2').addEventListener('click', () => this.goVol(2));

      this.initCursor();
      this.runPreloader();
    },

    goVol(vol) {
      if (state.vol === vol) return;
      state.vol = vol;
      updateNavButtons();
      document.getElementById('vol1Section').style.display = vol === 1 ? '' : 'none';
      document.getElementById('vol2Section').style.display = vol === 2 ? '' : 'none';
      window.scrollTo(0, 0);
      this.scheduleVolAnim(vol);
    },

    runPreloader() {
      if (!window.gsap) { setTimeout(() => this.runPreloader(), 120); return; }
      gsap.registerPlugin(ScrollTrigger);
      const letters = document.querySelectorAll('#preWord span');
      const count = { v: 0 };
      const tl = gsap.timeline();
      tl.fromTo(letters, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power4.out' }, 0)
        .to(count, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => {
          const el = document.getElementById('preCount');
          if (el) el.textContent = Math.round(count.v) + '%';
        } }, 0)
        .to(letters, { yPercent: -130, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power3.in' }, 1.45)
        .to('#preloader', { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 1.75)
        .to('#preWipe', { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 1.9)
        .set('#preloader', { display: 'none' })
        .set('#preWipe', { display: 'none' })
        .call(() => this.setupAnimations(), null, 1.95);
    },

    initCursor() {
      if (!window.gsap || window.matchMedia('(hover: none)').matches) {
        if (!window.gsap) setTimeout(() => this.initCursor(), 120);
        return;
      }
      const dotX = gsap.quickTo('#cursorDot', 'x', { duration: 0.1, ease: 'power3.out' });
      const dotY = gsap.quickTo('#cursorDot', 'y', { duration: 0.1, ease: 'power3.out' });
      const ringX = gsap.quickTo('#cursorRing', 'x', { duration: 0.45, ease: 'power3.out' });
      const ringY = gsap.quickTo('#cursorRing', 'y', { duration: 0.45, ease: 'power3.out' });

      let vx = 0, vy = 0, hovering = false, pressed = false;
      // the ring stretches along the motion direction proportionally to velocity,
      // and relaxes back to a circle when the pointer settles
      this._cursorTick = () => {
        vx *= 0.82; vy *= 0.82;
        const v = Math.min(Math.hypot(vx, vy) / 30, 0.18);
        const base = (hovering ? 1.55 : 1) * (pressed ? 0.85 : 1);
        gsap.set('#cursorRing', {
          rotation: v > 0.01 ? Math.atan2(vy, vx) * 180 / Math.PI : 0,
          scaleX: base * (1 + v),
          scaleY: base * (1 - v * 0.6)
        });
      };
      gsap.ticker.add(this._cursorTick);

      this._cursorMove = (e) => {
        vx += e.movementX || 0; vy += e.movementY || 0;
        dotX(e.clientX - 3); dotY(e.clientY - 3);
        ringX(e.clientX - 19); ringY(e.clientY - 19);
        const hov = !!(e.target && e.target.closest && e.target.closest('[data-hover]'));
        if (hov !== hovering) {
          hovering = hov;
          gsap.to('#cursorRing', {
            borderColor: hov ? 'rgba(210,44,32,0.9)' : 'rgba(240,237,231,0.35)',
            backgroundColor: hov ? 'rgba(210,44,32,0.07)' : 'rgba(210,44,32,0)',
            duration: 0.35, ease: 'power3.out'
          });
          gsap.to('#cursorDot', { scale: hov ? 0.45 : 1, duration: 0.3, ease: 'power3.out' });
        }
      };
      window.addEventListener('mousemove', this._cursorMove);

      this._cursorDown = () => {
        pressed = true;
        gsap.to('#cursorDot', { scale: hovering ? 0.3 : 0.7, duration: 0.15, ease: 'power2.out' });
      };
      this._cursorUp = () => {
        pressed = false;
        gsap.to('#cursorDot', { scale: hovering ? 0.45 : 1, duration: 0.4, ease: 'elastic.out(1.2, 0.5)' });
      };
      window.addEventListener('mousedown', this._cursorDown);
      window.addEventListener('mouseup', this._cursorUp);

      this._cursorLeave = () => gsap.to(['#cursorDot', '#cursorRing'], { autoAlpha: 0, duration: 0.25 });
      this._cursorEnter = () => gsap.to(['#cursorDot', '#cursorRing'], { autoAlpha: 1, duration: 0.25 });
      document.documentElement.addEventListener('mouseleave', this._cursorLeave);
      document.documentElement.addEventListener('mouseenter', this._cursorEnter);
    },

    splitChars(el) {
      if (!el || el.dataset.splitDone) return [];
      el.dataset.splitDone = '1';
      const words = el.textContent.split(' ');
      el.textContent = '';
      const spans = [];
      words.forEach((word, wi) => {
        const w = document.createElement('span');
        w.style.display = 'inline-block';
        w.style.whiteSpace = 'nowrap';
        for (const ch of word) {
          const s = document.createElement('span');
          s.style.display = 'inline-block';
          s.style.willChange = 'transform';
          s.textContent = ch;
          w.appendChild(s);
          spans.push(s);
        }
        el.appendChild(w);
        if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
      return spans;
    },

    killAnims() {
      if (window.ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill());
      if (this._mm) { window.removeEventListener('mousemove', this._mm); this._mm = null; }
      if (this._floatTl) { this._floatTl.kill(); this._floatTl = null; }
      if (this._neonTl) { this._neonTl.kill(); this._neonTl = null; }
      clearTimeout(this._neonTimer);
      if (this._dustTweens) { this._dustTweens.forEach((t) => t.kill()); this._dustTweens = null; }
      if (this._stampClick) {
        const s = document.getElementById('stampScene');
        if (s) s.removeEventListener('click', this._stampClick);
        this._stampClick = null;
      }
    },

    scheduleVolAnim(vol) {
      window.scrollTo(0, 0);
      clearInterval(this._volPoll);
      let tries = 0;
      this._volPoll = setInterval(() => {
        tries++;
        const id = vol === 1 ? 'stamp3d' : 'v2stamp';
        if (document.getElementById(id) && state.vol === vol) {
          clearInterval(this._volPoll);
          this.setupAnimations();
        } else if (tries > 50) clearInterval(this._volPoll);
      }, 80);
    },

    setupAnimations() {
      if (!window.gsap) { setTimeout(() => this.setupAnimations(), 150); return; }
      gsap.registerPlugin(ScrollTrigger);
      this.killAnims();
      if (state.vol === 1) this.animVol1(); else this.animVol2();

      clearTimeout(this._safety);
      this._safety = setTimeout(() => {
        ['stamp3d', 'heroFoot', 'heroCtas', 'v2stamp', 'v2title', 'v2sub'].forEach((id) => {
          const el = document.getElementById(id);
          if (el && parseFloat(getComputedStyle(el).opacity) < 0.05) gsap.to(el, { opacity: 1, duration: 0.4 });
        });
      }, 3200);
    },

    spawnDust() {
      const field = document.getElementById('dustField');
      if (!field || field.childElementCount) return;
      this._dustTweens = [];
      for (let i = 0; i < 26; i++) {
        const p = document.createElement('div');
        const sz = 1 + Math.random() * 2.5;
        p.style.cssText = 'position:absolute;border-radius:50%;background:rgba(210,44,32,' + (0.25 + Math.random() * 0.5) + ');width:' + sz + 'px;height:' + sz + 'px;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%';
        field.appendChild(p);
        this._dustTweens.push(
          gsap.to(p, { x: (Math.random() - 0.5) * 140, y: (Math.random() - 0.5) * 140, opacity: Math.random() * 0.5 + 0.2, duration: 4 + Math.random() * 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 3 })
        );
      }
    },

    slamStamp() {
      const stamp = document.getElementById('stamp3d');
      if (!stamp) return;
      gsap.killTweensOf(stamp);
      if (this._floatTl) { this._floatTl.kill(); this._floatTl = null; }
      if (this._neonTl) { this._neonTl.kill(); this._neonTl = null; }
      clearTimeout(this._neonTimer);
      const img0 = document.getElementById('stampImg');
      if (img0) gsap.set(img0, { clearProps: 'filter,opacity' });
      const tl = gsap.timeline({ onComplete: () => {
        this._floatTl = gsap.timeline({ repeat: -1, yoyo: true });
        this._floatTl.to(stamp, { y: -12, rotationZ: 0.8, duration: 2.8, ease: 'sine.inOut' });
        this.startNeonFlicker();
      } });
      tl.set(stamp, { opacity: 1, scale: 2.6, z: 800, rotationX: 42, rotationZ: 10, transformPerspective: 1500, filter: 'blur(8px)' })
        .to(stamp, { scale: 1, z: 0, rotationX: 0, rotationZ: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power4.in' })
        .to(stamp, { scaleY: 0.93, scaleX: 1.05, duration: 0.08, ease: 'power1.out' })
        .to(stamp, { scaleY: 1, scaleX: 1, duration: 0.4, ease: 'elastic.out(1.4, 0.4)' })
        .fromTo('#heroGlow', { opacity: 0.2, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.45')
        .fromTo('#hero', { x: -8 }, { x: 8, duration: 0.045, repeat: 5, yoyo: true, clearProps: 'x' }, '-=0.55');
    },

    startNeonFlicker() {
      const img = document.getElementById('stampImg');
      if (!img) return;
      if (this._neonTl) this._neonTl.kill();
      const glow = (a, b, br) => 'brightness(' + (br || 1) + ') drop-shadow(0 0 ' + a + 'px rgba(210,44,32,' + b + ')) drop-shadow(0 0 90px rgba(210,44,32,0.45)) drop-shadow(0 26px 40px rgba(0,0,0,0.6))';
      const on = glow(24, 0.55, 1.05);
      gsap.set(img, { filter: on, opacity: 1 });
      const blackout = () => {
        if (!document.getElementById('stampImg')) return;
        const tl = gsap.timeline({ onComplete: schedule });
        tl.to(img, { opacity: 0.68, filter: glow(6, 0.15, 0.82), duration: 0.06, ease: 'none' })
          .to(img, { opacity: 1, filter: on, duration: 0.09, ease: 'none' });
        if (Math.random() < 0.45) {
          tl.to(img, { opacity: 0.78, filter: glow(10, 0.25, 0.88), duration: 0.05, ease: 'none' }, '+=0.07')
            .to(img, { opacity: 1, filter: on, duration: 0.1, ease: 'none' });
        }
        this._neonTl = tl;
      };
      const schedule = () => {
        this._neonTimer = setTimeout(blackout, 1800 + Math.random() * 3800);
      };
      schedule();
    },

    animVol1() {
      gsap.set(['#stampScene', '#bgTextBack', '#heroGlow'], { xPercent: -50, yPercent: -50 });
      gsap.set('#bgTextMid', { xPercent: -50, yPercent: -50, rotation: -4 });
      gsap.set(['#bgTextBack', '#bgTextMid'], { opacity: 1, scale: 1 });
      this.spawnDust();
      this.slamStamp();
      this._stampClick = () => this.slamStamp();
      const sceneEl = document.getElementById('stampScene');
      if (sceneEl) sceneEl.addEventListener('click', this._stampClick);

      gsap.fromTo('#heroFoot', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.85 });
      gsap.fromTo('#heroCtas', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, delay: 1.0 });
      // scroll cue exit: falls out of frame (drop + shrink + blur), accelerating with scroll.
      // The resting CSS loops (scrollPulse / arrowBounce) pause while exiting so they don't fight the tween.
      const cueLoops = document.querySelectorAll('#heroCtas [style*="animation"]');
      // fromTo + immediateRender:false: pins the start values so ScrollTrigger doesn't
      // record them mid-intro (while the cue is still at opacity 0 / y 26).
      gsap.fromTo('#heroCtas', { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }, {
        opacity: 0, y: 46, scale: 0.8, filter: 'blur(7px)', transformOrigin: '50% 100%', ease: 'power2.in',
        immediateRender: false,
        scrollTrigger: {
          trigger: '#hero', start: 'top top', end: '35% top', scrub: 0.4,
          onUpdate(self) {
            const paused = self.progress > 0.02;
            cueLoops.forEach((el) => { el.style.animationPlayState = paused ? 'paused' : 'running'; });
          }
        }
      });

      this._mm = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        gsap.to('#stampScene', { rotationX: ny * -14, rotationY: nx * 18, transformPerspective: 1500, duration: 0.7, ease: 'power2.out' });
        gsap.to('#bgTextBack', { x: nx * -30, y: ny * -20, duration: 1, ease: 'power2.out' });
        gsap.to('#bgTextMid', { x: nx * -60, y: ny * -40, duration: 0.9, ease: 'power2.out' });
        gsap.to('#heroGlow', { x: nx * 50, y: ny * 40, duration: 1, ease: 'power2.out' });
        gsap.to('#dustField', { x: nx * -80, y: ny * -60, duration: 1.1, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', this._mm);

      gsap.fromTo('#stamp3d', { scale: 1, opacity: 1, filter: 'blur(0px)' }, { scale: 2.3, opacity: 0, filter: 'blur(10px)', ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });
      gsap.fromTo('#bgTextBack', { scale: 1, opacity: 1 }, { scale: 1.35, opacity: 0, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });
      gsap.fromTo('#bgTextMid', { scale: 1, opacity: 1 }, { scale: 1.6, opacity: 0, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });

      ['#tracklist h2', '#artistas h2', '#escuchar h2'].forEach((sel) => {
        const h = document.querySelector(sel);
        if (!h) return;
        const spans = this.splitChars(h);
        if (!spans.length) return;
        gsap.fromTo(spans, { yPercent: 120, rotationX: -80, opacity: 0, transformPerspective: 600 },
          { yPercent: 0, rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.035, ease: 'power4.out',
            scrollTrigger: { trigger: h, start: 'top 88%' } });
      });

      const rule = document.getElementById('tlRule');
      if (rule) gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: rule, start: 'top 90%' } });

      gsap.utils.toArray('.reveal').forEach((el) => {
        if (el.tagName === 'H2') return;
        gsap.fromTo(el, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      gsap.utils.toArray('.trackrow').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%' } });
        const arrow = el.querySelector('.trackarrow');
        const no = el.querySelector('.trackno');
        const fill = el.querySelector('.trackfill');
        el.addEventListener('mouseenter', () => {
          el.style.paddingLeft = '40px';
          if (arrow) gsap.to(arrow, { opacity: 1, x: 6, duration: 0.25 });
          if (no) gsap.to(no, { color: '#d22c20', duration: 0.25 });
          if (fill) gsap.to(fill, { scaleX: 1, duration: 0.35, ease: 'power3.out' });
        });
        el.addEventListener('mouseleave', () => {
          el.style.paddingLeft = '18px';
          if (arrow) gsap.to(arrow, { opacity: 0, x: 0, duration: 0.25 });
          if (no) gsap.to(no, { color: '#2e2e30', duration: 0.25 });
          if (fill) gsap.to(fill, { scaleX: 0, duration: 0.35, ease: 'power3.in' });
        });
      });

      const proxy = { skew: 0 };
      const skewSetter1 = gsap.quickSetter('#artistRow1', 'skewX', 'deg');
      const skewSetter2 = gsap.quickSetter('#artistRow2', 'skewX', 'deg');
      ScrollTrigger.create({
        trigger: '#artistas', start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => {
          const skew = gsap.utils.clamp(-8, 8, self.getVelocity() / -260);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, { skew: 0, duration: 0.7, ease: 'power3', overwrite: true,
              onUpdate: () => { skewSetter1(proxy.skew); skewSetter2(-proxy.skew); } });
          }
        }
      });

      const coverScene = document.getElementById('coverScene');
      if (coverScene) {
        gsap.fromTo('#coverImg', { rotationY: -26, rotationX: 5, transformPerspective: 1200 },
          { rotationY: 10, rotationX: -3, scrollTrigger: { trigger: '#escuchar', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
        coverScene.addEventListener('mousemove', (e) => {
          const r = coverScene.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(coverScene, { rotationY: nx * 16, rotationX: ny * -12, transformPerspective: 1200, duration: 0.5 });
        });
        coverScene.addEventListener('mouseleave', () => gsap.to(coverScene, { rotationY: 0, rotationX: 0, duration: 0.7 }));
      }
    },

    animVol2() {
      gsap.set('#v2Glow', { xPercent: -50, yPercent: -50 });
      const stamp = document.getElementById('v2stamp');
      if (stamp) {
        gsap.fromTo(stamp,
          { opacity: 0, scale: 2.4, z: 600, rotationX: 36, transformPerspective: 1500, filter: 'blur(7px)' },
          { opacity: 1, scale: 1, z: 0, rotationX: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power4.in', delay: 0.15 });
        this._floatTl = gsap.timeline({ repeat: -1, yoyo: true, delay: 1 });
        this._floatTl.to(stamp, { y: -10, duration: 2.8, ease: 'sine.inOut' });
        this._mm = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          gsap.to('#v2stampScene', { rotationX: ny * -13, rotationY: nx * 17, transformPerspective: 1500, duration: 0.7, ease: 'power2.out' });
          gsap.to('#v2Glow', { x: nx * 50, y: ny * 40, duration: 1 });
        };
        window.addEventListener('mousemove', this._mm);
      }
      const spans = this.splitChars(document.getElementById('v2title'));
      if (spans.length) {
        gsap.fromTo(spans, { yPercent: 130, rotationX: -85, opacity: 0, transformPerspective: 700 },
          { yPercent: 0, rotationX: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: 'power4.out', delay: 0.7 });
      }
      gsap.fromTo('#v2sub', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.45 });
    }
  };

  // hover styles for nav buttons + hero CTAs (equivalent of the original style-hover attributes)
  document.addEventListener('DOMContentLoaded', () => {
    attachHover(document.getElementById('volBtn1'), { borderColor: 'rgba(255,255,255,0.4)' });
    attachHover(document.getElementById('volBtn2'), { borderColor: 'rgba(255,255,255,0.4)' });
    document.querySelectorAll('#heroCtas a').forEach((a, i) => {
      attachHover(a, { borderColor: i === 0 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.4)', transform: 'translateY(-2px)' });
    });
    App.init();
  });
})();
