import { useEffect, useRef, useState } from 'react';
import '../styles/dappled-light.css';

type RGB = [number, number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lc = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];

export default function DappledLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);
  const onRef = useRef(on);
  onRef.current = on;

  useEffect(() => {
    const C = canvasRef.current;
    if (!C) return;
    const X = C.getContext('2d');
    if (!X) return;

    const fit = () => {
      C.width = window.innerWidth;
      C.height = window.innerHeight;
    };
    fit();
    window.addEventListener('resize', fit);

    const offscreen: Record<string, HTMLCanvasElement> = {};
    const getOff = (key: string, w: number, h: number) => {
      const c = offscreen[key];
      if (c && c.width === w && c.height === h) return c;
      const nc = document.createElement('canvas');
      nc.width = w;
      nc.height = h;
      offscreen[key] = nc;
      return nc;
    };

    const getAnimTime = (now: number) => {
      const period = 120000;
      const phase = (now % (period * 2)) / period;
      const tri = phase < 1 ? phase : 2 - phase;
      return tri * 0.1;
    };
    const getAnimOpen = (now: number) =>
      0.5 + Math.sin(now * 0.00006) * 0.04 + Math.sin(now * 0.00015) * 0.02;

    let fadeVal = 0;
    let lastTime = 0;
    let raf = 0;
    let currentBlend: '' | 'multiply' | 'screen' = '';

    const draw = (now: number) => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark';
      const wantBlend = isDark ? 'screen' : 'multiply';
      if (wantBlend !== currentBlend) {
        C.style.mixBlendMode = wantBlend;
        currentBlend = wantBlend;
      }

      const fadeTarget = onRef.current ? 1 : 0;
      const dt = lastTime ? (now - lastTime) / 1000 : 0.016;
      lastTime = now;
      const speed = dt / 1.8;
      if (fadeVal < fadeTarget) fadeVal = Math.min(fadeVal + speed, 1);
      else if (fadeVal > fadeTarget) fadeVal = Math.max(fadeVal - speed, 0);
      const fadeEase = fadeVal * fadeVal * (3 - 2 * fadeVal);

      const w = C.width;
      const h = C.height;

      if (fadeVal === 0 && fadeTarget === 0) {
        X.clearRect(0, 0, w, h);
        raf = requestAnimationFrame(draw);
        return;
      }

      const t = getAnimTime(now);
      const open = getAnimOpen(now);
      const n = t / 0.35;

      // Flexoki-aligned palettes.
      // Light mode: soft warm-neutral shade (multiply darkens paper toward base-150-ish),
      // with a subtle cream highlight instead of orange sun.
      // Dark mode: cool moonlight on black (screen brightens), silvery-blue slats.
      const shadowTargetLight: RGB = lc([222, 216, 200], [230, 224, 208], n);
      const shadowTargetDark: RGB = lc([14, 16, 22], [18, 20, 26], n);
      const shadowTarget = isDark ? shadowTargetDark : shadowTargetLight;
      const stBase: RGB = isDark ? [0, 0, 0] : [255, 255, 255];
      const st = lc(stBase, shadowTarget, fadeEase);

      const wlTargetLight: RGB = lc([252, 244, 218], [253, 248, 228], n);
      const wlTargetDark: RGB = lc([168, 188, 218], [188, 204, 228], n);
      const wlTarget = isDark ? wlTargetDark : wlTargetLight;
      const wlBase: RGB = isDark ? [20, 24, 32] : [255, 255, 255];
      const wl = lc(wlBase, wlTarget, fadeEase);

      const skewX = lerp(0.34, 0.26, n);
      const skewY = lerp(0.13, 0.09, n);
      const stretch = lerp(1.9, 1.6, n);
      const warmAlpha =
        (isDark ? lerp(0.22, 0.16, n) : lerp(0.18, 0.11, n)) * fadeEase;
      const baseSoft = lerp(12, 7, n);

      X.clearRect(0, 0, w, h);
      X.fillStyle = `rgb(${st[0]},${st[1]},${st[2]})`;
      X.fillRect(0, 0, w, h);

      const projW = Math.min(w * 0.58, 420) * stretch;
      const projH = Math.min(h * 0.72, 500) * stretch * 0.78;

      const bx = Math.sin(now * 0.00009) * 5 + Math.sin(now * 0.00025) * 2.5;
      const by = Math.cos(now * 0.00011) * 3.5 + Math.cos(now * 0.00022) * 1.8;
      const px = lerp(w * 0.01, w * 0.06, n) + bx;
      const py = lerp(h * 0.01, h * 0.03, n) + by;

      const frameT = lerp(10, 7, n);
      const numSlats = 18;
      const innerH = projH - frameT * 2;
      const spacing = innerH / numSlats;
      const slatThick = spacing * lerp(0.88, 0.12, open);
      const gapH = spacing - slatThick;

      if (gapH < 0.3) {
        raf = requestAnimationFrame(draw);
        return;
      }

      X.save();
      X.translate(px, py);
      X.transform(1, skewY, skewX, 1, 0, 0);

      const offW = Math.ceil(projW + 80);
      const offH = Math.ceil(projH + 80);
      const OC = getOff('off', offW, offH);
      const OX = OC.getContext('2d')!;
      OX.clearRect(0, 0, offW, offH);

      for (let i = 0; i < numSlats; i++) {
        const baseY = frameT + i * spacing + slatThick;
        const wb =
          Math.sin(now * 0.00008 + i * 0.53) * 1.1 +
          Math.sin(now * 0.00019 + i * 0.79) * 0.6;
        const sy = baseY + wb;
        const vertPos = i / numSlats;
        const slatSoft = baseSoft * (0.55 + vertPos * 1.0);
        const distFromCenter = Math.abs(i - numSlats / 2) / (numSlats / 2);
        const slatAlpha = 1.0 - distFromCenter * 0.1;
        const padY = slatSoft * 1.2;
        const g = OX.createLinearGradient(0, sy - padY, 0, sy + gapH + padY);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(padY / (gapH + padY * 2), `rgba(255,255,255,${slatAlpha})`);
        g.addColorStop(1 - padY / (gapH + padY * 2), `rgba(255,255,255,${slatAlpha})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        OX.fillStyle = g;
        OX.fillRect(frameT, sy - padY, projW - frameT * 2, gapH + padY * 2);
      }

      OX.globalCompositeOperation = 'destination-in';
      const hV = OX.createLinearGradient(frameT, 0, projW - frameT, 0);
      hV.addColorStop(0, 'rgba(255,255,255,0.1)');
      hV.addColorStop(0.06, 'rgba(255,255,255,0.55)');
      hV.addColorStop(0.15, 'rgba(255,255,255,1)');
      hV.addColorStop(0.5, 'rgba(255,255,255,1)');
      hV.addColorStop(0.72, 'rgba(255,255,255,0.8)');
      hV.addColorStop(0.85, 'rgba(255,255,255,0.35)');
      hV.addColorStop(0.94, 'rgba(255,255,255,0.12)');
      hV.addColorStop(1, 'rgba(255,255,255,0.02)');
      OX.fillStyle = hV;
      OX.fillRect(0, 0, offW, offH);

      const vV = OX.createLinearGradient(0, frameT, 0, projH - frameT);
      vV.addColorStop(0, 'rgba(255,255,255,0.08)');
      vV.addColorStop(0.05, 'rgba(255,255,255,0.6)');
      vV.addColorStop(0.12, 'rgba(255,255,255,1)');
      vV.addColorStop(0.75, 'rgba(255,255,255,0.85)');
      vV.addColorStop(0.88, 'rgba(255,255,255,0.35)');
      vV.addColorStop(0.95, 'rgba(255,255,255,0.1)');
      vV.addColorStop(1, 'rgba(255,255,255,0.02)');
      OX.fillStyle = vV;
      OX.fillRect(0, 0, offW, offH);
      OX.globalCompositeOperation = 'source-over';

      OX.globalCompositeOperation = 'destination-out';
      const mullW = frameT * 0.5;
      const mullSoft = baseSoft * 0.9;
      const mx = projW * 0.47;
      const mg = OX.createLinearGradient(
        mx - mullW - mullSoft,
        0,
        mx + mullW + mullSoft,
        0
      );
      mg.addColorStop(0, 'rgba(255,255,255,0)');
      mg.addColorStop(0.15, 'rgba(255,255,255,1)');
      mg.addColorStop(0.85, 'rgba(255,255,255,1)');
      mg.addColorStop(1, 'rgba(255,255,255,0)');
      OX.fillStyle = mg;
      OX.fillRect(mx - mullW - mullSoft, 0, (mullW + mullSoft) * 2, projH);

      const my = projH * 0.4;
      const hg = OX.createLinearGradient(
        0,
        my - mullW - mullSoft,
        0,
        my + mullW + mullSoft
      );
      hg.addColorStop(0, 'rgba(255,255,255,0)');
      hg.addColorStop(0.15, 'rgba(255,255,255,1)');
      hg.addColorStop(0.85, 'rgba(255,255,255,1)');
      hg.addColorStop(1, 'rgba(255,255,255,0)');
      OX.fillStyle = hg;
      OX.fillRect(0, my - mullW - mullSoft, projW, (mullW + mullSoft) * 2);

      const cordX = projW * 0.73 + Math.sin(now * 0.00025) * 2.5;
      const cordW = 1.5;
      const cordSoft = baseSoft * 0.4;
      const cG = OX.createLinearGradient(
        cordX - cordW - cordSoft,
        0,
        cordX + cordW + cordSoft,
        0
      );
      cG.addColorStop(0, 'rgba(255,255,255,0)');
      cG.addColorStop(0.25, 'rgba(255,255,255,0.6)');
      cG.addColorStop(0.75, 'rgba(255,255,255,0.6)');
      cG.addColorStop(1, 'rgba(255,255,255,0)');
      OX.fillStyle = cG;
      OX.fillRect(cordX - cordW - cordSoft, frameT, (cordW + cordSoft) * 2, projH - frameT * 2);
      OX.globalCompositeOperation = 'source-over';

      // Light mode: punch slat-shaped holes so paper shines through the shade.
      // Dark mode: keep the faint cool wash; slats are added as bright moonlight below.
      if (!isDark) {
        X.globalCompositeOperation = 'destination-out';
        X.drawImage(OC, 0, 0);
        X.globalCompositeOperation = 'source-over';
      }

      const WC = getOff('warm', offW, offH);
      const WX = WC.getContext('2d')!;
      WX.clearRect(0, 0, offW, offH);
      const wG = WX.createRadialGradient(
        projW * 0.4,
        projH * 0.45,
        0,
        projW * 0.4,
        projH * 0.45,
        projW * 0.85
      );
      const coreMul = isDark ? 1.0 : 0.9;
      const midMul = isDark ? 0.7 : 0.6;
      const edgeMul = isDark ? 0.2 : 0.15;
      wG.addColorStop(0, `rgba(${wl[0]},${wl[1]},${wl[2]},${warmAlpha * coreMul})`);
      wG.addColorStop(0.5, `rgba(${wl[0]},${wl[1]},${wl[2]},${warmAlpha * midMul})`);
      wG.addColorStop(1, `rgba(${wl[0]},${wl[1]},${wl[2]},${warmAlpha * edgeMul})`);
      WX.fillStyle = wG;
      WX.fillRect(0, 0, offW, offH);
      WX.globalCompositeOperation = 'destination-in';
      WX.drawImage(OC, 0, 0);
      WX.globalCompositeOperation = 'source-over';
      X.drawImage(WC, 0, 0);

      const GC = getOff('glow', offW, offH);
      const GX = GC.getContext('2d')!;
      GX.clearRect(0, 0, offW, offH);
      const glowX = projW * 0.38;
      const glowY = projH * 0.42;
      const gl = GX.createRadialGradient(glowX, glowY, 0, glowX, glowY, projW * 0.7);
      if (isDark) {
        gl.addColorStop(0, `rgba(205,220,245,${warmAlpha * 0.55})`);
        gl.addColorStop(0.5, `rgba(190,210,238,${warmAlpha * 0.25})`);
        gl.addColorStop(1, 'rgba(180,200,230,0)');
      } else {
        gl.addColorStop(0, `rgba(253,246,222,${warmAlpha * 0.3})`);
        gl.addColorStop(0.5, `rgba(250,242,216,${warmAlpha * 0.13})`);
        gl.addColorStop(1, 'rgba(248,240,212,0)');
      }
      GX.fillStyle = gl;
      GX.fillRect(0, 0, offW, offH);
      GX.globalCompositeOperation = 'destination-in';
      GX.drawImage(OC, 0, 0);
      GX.globalCompositeOperation = 'source-over';
      X.drawImage(GC, 0, 0);

      X.restore();
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="dappled-canvas" aria-hidden="true" />
      <button
        className="dappled-toggle"
        onClick={() => setOn((v) => !v)}
        aria-label={on ? 'turn off dappled light' : 'turn on dappled light'}
        aria-pressed={on}
        type="button"
      >
        <span className={`dappled-toggle-icon ${on ? 'is-on' : ''}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <line className="dappled-ray" x1="12" y1="2" x2="12" y2="4.5" />
            <line className="dappled-ray" x1="12" y1="19.5" x2="12" y2="22" />
            <line className="dappled-ray" x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
            <line className="dappled-ray" x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
            <line className="dappled-ray" x1="2" y1="12" x2="4.5" y2="12" />
            <line className="dappled-ray" x1="19.5" y1="12" x2="22" y2="12" />
            <line className="dappled-ray" x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
            <line className="dappled-ray" x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
          </svg>
        </span>
      </button>
    </>
  );
}
