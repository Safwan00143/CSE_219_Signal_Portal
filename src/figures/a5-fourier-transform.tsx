import { Graph, Panel, PI, Row, range } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]
const r = String.raw
const rectFT = (w: number, T: number) => (Math.abs(w) < 1e-9 ? T : (2 * Math.sin((w * T) / 2)) / w)
const pulse = (t: number) => (Math.abs(t) < 0.5 ? Math.cos(PI * t) ** 2 : 0) // smooth one-off pulse, width 1
const pulseFT = (w: number) => {
  // FT of cos²(πt) on |t|<½ :  ½·rect + ¼ shifted rects (ω₀ = 2π)
  const R = (x: number) => rectFT(x, 1)
  return 0.5 * R(w) + 0.25 * (R(w - 2 * PI) + R(w + 2 * PI))
}
const periodic = (t: number, T: number) => {
  const m = ((t % T) + T * 1.5) % T - T / 2
  return pulse(m)
}

export const fourierTransformFigures: FigureMap = {
  "ft-repeat": {
    wide: true,
    caption: "Start from one finite pulse and repeat it every T to make a periodic signal. As T grows the copies move apart; in the limit T → ∞ only the single, isolated pulse is left.",
    node: (
      <Row>
        <Panel title="small T: copies close together">
          <Graph x={[-4.5, 4.5]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => periodic(t, 1.5), n: 900 }]} xTicks={[[-1.5, "−T"], 0, [1.5, "T"]]} />
        </Panel>
        <Panel title="large T: copies far apart">
          <Graph x={[-4.5, 4.5]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => periodic(t, 4), n: 900 }]} xTicks={[[-4, "−T"], 0, [4, "T"]]} />
        </Panel>
      </Row>
    ),
  },
  "ft-envelope": {
    wide: true,
    caption: r`The scaled Fourier-series coefficients $Ta_k$ (stems) are samples of one smooth curve $X(j\omega)$ (dashed) taken at $\omega=k\omega_0$. Increasing $T$ makes $\omega_0=2\pi/T$ smaller, so the samples crowd together until they fill the curve.`,
    node: (
      <Row>
        <Panel title="T = 2: ω₀ = π, few lines">
          <Graph x={[-16, 16]} y={[-0.15, 0.6]} xLabel="ω" noYAxis items={[{ kind: "fn", f: pulseFT, dashed: true, tone: "muted", width: 1.2, n: 500 }, { kind: "stems", pts: range(-5, 5).map((k) => [k * PI, pulseFT(k * PI)] as P) }]} xTicks={[[-4 * PI, "−4π"], 0, [4 * PI, "4π"]]} />
        </Panel>
        <Panel title="T = 6: ω₀ = π/3, many lines">
          <Graph x={[-16, 16]} y={[-0.15, 0.6]} xLabel="ω" noYAxis items={[{ kind: "fn", f: pulseFT, dashed: true, tone: "muted", width: 1.2, n: 500 }, { kind: "stems", pts: range(-15, 15).map((k) => [(k * PI) / 3, pulseFT((k * PI) / 3)] as P) }]} xTicks={[[-4 * PI, "−4π"], 0, [4 * PI, "4π"]]} />
        </Panel>
      </Row>
    ),
  },
  "ft-modulation-time": {
    wide: true,
    caption: "Injecting oscillation: x(t)cos ω₀t keeps the shape of x(t) as an envelope, with the cosine oscillating inside it. A damped oscillation (pendulum, ringing circuit, fading echo) is exactly this.",
    node: (
      <Row>
        <Panel title="x(t) and ±x(t) (envelope)">
          <Graph x={[-3, 3]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-t * t) }, { kind: "fn", f: (t) => -Math.exp(-t * t), tone: "muted", dashed: true }]} />
        </Panel>
        <Panel title="x(t) cos ω₀t">
          <Graph x={[-3, 3]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-t * t), tone: "muted", dashed: true, width: 1 }, { kind: "fn", f: (t) => -Math.exp(-t * t), tone: "muted", dashed: true, width: 1 }, { kind: "fn", f: (t) => Math.exp(-t * t) * Math.cos(12 * t), n: 800 }]} />
        </Panel>
      </Row>
    ),
  },
  "ft-freq-shift": {
    wide: true,
    caption: r`Multiplying by $e^{j\omega_0 t}$ moves every frequency component from $\omega$ to $\omega+\omega_0$: the whole spectrum slides right by $\omega_0$, giving $X(j(\omega-\omega_0))$.`,
    node: (
      <Row>
        <Panel title="X(jω)">
          <Graph x={[-4, 6]} y={[-0.15, 1.3]} xLabel="ω" items={[{ kind: "fn", f: (w) => Math.exp(-w * w), area: true }]} xTicks={[0, [3, "ω₀"]]} />
        </Panel>
        <Panel title="X(j(ω − ω₀))">
          <Graph x={[-4, 6]} y={[-0.15, 1.3]} xLabel="ω" items={[{ kind: "fn", f: (w) => Math.exp(-((w - 3) ** 2)), area: true }]} xTicks={[0, [3, "ω₀"]]} />
        </Panel>
      </Row>
    ),
  },
  "ft-cos-mod": {
    caption: r`Cosine modulation creates two copies of the spectrum, each at half height, centred at $\pm\omega_0$: $x(t)\cos\omega_0t\leftrightarrow\tfrac12X(j(\omega-\omega_0))+\tfrac12X(j(\omega+\omega_0))$.`,
    node: <Graph width={460} x={[-6, 6]} y={[-0.15, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => Math.exp(-w * w), tone: "muted", dashed: true, width: 1.2 }, { kind: "fn", f: (w) => 0.5 * Math.exp(-((w - 3.5) ** 2)) + 0.5 * Math.exp(-((w + 3.5) ** 2)), area: true }, { kind: "text", at: [0, 1.08], text: "original", tone: "muted" }]} xTicks={[[-3.5, "−ω₀"], 0, [3.5, "ω₀"]]} yTicks={[[0.5, "½"], 1]} />,
  },
  "ft-rect": {
    wide: true,
    caption: r`The rectangle of width $T$ and its transform $X(j\omega)=\dfrac{2\sin(\omega T/2)}{\omega}$. The peak is the area $T$; the zeros are at $\omega=2\pi k/T$.`,
    node: (
      <Row>
        <Panel title="x(t): 1 for |t| < T/2">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-0.5, 0], [-0.5, 1], [0.5, 1], [0.5, 0], [2, 0]] }]} xTicks={[[-0.5, "−T/2"], [0.5, "T/2"]]} yTicks={[1]} />
        </Panel>
        <Panel title="X(jω) = 2 sin(ωT/2)/ω">
          <Graph x={[-30, 30]} y={[-0.35, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => rectFT(w, 1), n: 600 }]} xTicks={[[-4 * PI, "−4π/T"], [-2 * PI, "−2π/T"], [2 * PI, "2π/T"], [4 * PI, "4π/T"]]} yTicks={[[1, "T"]]} />
        </Panel>
      </Row>
    ),
  },
  "ft-wide-narrow": {
    wide: true,
    caption: "Wider rectangle, narrower spectrum. The width-2 pulse (sage) has its first zero at ω = π; the width-6 pulse (ochre) at ω = π/3, with a peak three times higher.",
    node: (
      <Row>
        <Panel title="x₁: |t| < 1,   x₂: |t| < 3">
          <Graph x={[-4, 4]} y={[-0.2, 1.4]} items={[{ kind: "path", pts: [[-4, 0], [-3, 0], [-3, 1.05], [3, 1.05], [3, 0], [4, 0]], tone: "second" }, { kind: "path", pts: [[-4, 0], [-1, 0], [-1, 1], [1, 1], [1, 0], [4, 0]] }]} xTicks={[-3, -1, 1, 3]} />
        </Panel>
        <Panel title="X₁ = 2 sin ω/ω,   X₂ = 2 sin 3ω/ω">
          <Graph x={[-10, 10]} y={[-1.6, 6.5]} xLabel="ω" items={[{ kind: "fn", f: (w) => rectFT(w, 6), tone: "second", n: 600 }, { kind: "fn", f: (w) => rectFT(w, 2), n: 600 }]} xTicks={[[-PI, "−π"], [PI / 3, "π/3"], [PI, "π"]]} yTicks={[2, 6]} />
        </Panel>
      </Row>
    ),
  },
  "ft-lego": {
    wide: true,
    caption: "The Lego-block signal is a height-1 rectangle on (1, 4) plus a height-0.5 rectangle on (2, 3). Both are centred at t = 2.5, so each is a centred rectangle shifted by 2.5.",
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[0, 5]} y={[-0.2, 1.8]} items={[{ kind: "path", pts: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 1.5], [3, 1.5], [3, 1], [4, 1], [4, 0], [5, 0]] }]} xTicks={[1, 2, 3, 4]} yTicks={[1, 1.5]} />
        </Panel>
        <Panel title="= wide block + small top block">
          <Graph x={[0, 5]} y={[-0.2, 1.8]} items={[{ kind: "path", pts: [[0, 0], [1, 0], [1, 1], [4, 1], [4, 0], [5, 0]], area: true }, { kind: "path", pts: [[2, 1], [2, 1.5], [3, 1.5], [3, 1]], tone: "second" }, { kind: "vline", x: 2.5, label: "centre 2.5" }]} xTicks={[1, 2, 3, 4]} yTicks={[1, 1.5]} />
        </Panel>
      </Row>
    ),
  },
  "ft-windowed-cos": {
    wide: true,
    caption: "A cosine locked inside a rectangle (a windowed cosine) is a modulated rectangle. Its spectrum is two sinc-shaped copies centred at ±ω₀, not at zero.",
    node: (
      <Row>
        <Panel title="r(t) cos ω₀t">
          <Graph x={[-2, 2]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => (Math.abs(t) < 1 ? Math.cos(10 * t) : 0), n: 800 }, { kind: "path", pts: [[-1, 1], [1, 1]], tone: "muted", dashed: true }, { kind: "path", pts: [[-1, -1], [1, -1]], tone: "muted", dashed: true }]} xTicks={[[-1, "−T/2"], [1, "T/2"]]} />
        </Panel>
        <Panel title="two sinc copies at ±ω₀">
          <Graph x={[-20, 20]} y={[-0.4, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => 0.5 * (rectFT(w - 10, 2) + rectFT(w + 10, 2)), n: 800 }]} xTicks={[[-10, "−ω₀"], [10, "ω₀"]]} />
        </Panel>
      </Row>
    ),
  },
  "ft-delta": {
    wide: true,
    caption: "A single spike in time needs all frequencies equally: δ(t) ↔ 1, a completely flat spectrum.",
    node: (
      <Row>
        <Panel title="δ(t)">
          <Graph x={[-3, 3]} y={[-0.2, 1.4]} items={[{ kind: "impulses", pts: [[0, 1, "area 1"]] }]} />
        </Panel>
        <Panel title="X(jω) = 1">
          <Graph x={[-3, 3]} y={[-0.2, 1.4]} xLabel="ω" items={[{ kind: "fn", f: () => 1 }]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "ft-sinc-rect": {
    wide: true,
    caption: "Duality: a rectangle in time gives a sinc in frequency, so a sinc in time gives a rectangle in frequency. sin(Wt)/(πt) ↔ 1 for |ω| < W.",
    node: (
      <Row>
        <Panel title="x(t) = sin Wt / πt">
          <Graph x={[-12, 12]} y={[-0.15, 0.45]} items={[{ kind: "fn", f: (t) => (Math.abs(t) < 1e-9 ? 1 / PI : Math.sin(t) / (PI * t)), n: 600 }]} xTicks={[[-PI, "−π/W"], [PI, "π/W"]]} yTicks={[[1 / PI, "W/π"]]} />
        </Panel>
        <Panel title="X(jω)">
          <Graph x={[-2.5, 2.5]} y={[-0.2, 1.3]} xLabel="ω" items={[{ kind: "path", pts: [[-2.5, 0], [-1, 0], [-1, 1], [1, 1], [1, 0], [2.5, 0]], area: true }]} xTicks={[[-1, "−W"], [1, "W"]]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "ft-triangle": {
    wide: true,
    caption: "A triangle is a rectangle convolved with itself, so its spectrum is a sinc squared: never negative and decaying like 1/ω², much faster than the rectangle's 1/ω.",
    node: (
      <Row>
        <Panel title="triangle, peak 1, half-width T₁">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0]] }]} xTicks={[[-1, "−T₁"], [1, "T₁"]]} yTicks={[1]} />
        </Panel>
        <Panel title="T₁ [sin(ωT₁/2)/(ωT₁/2)]²">
          <Graph x={[-20, 20]} y={[-0.15, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => (Math.abs(w) < 1e-9 ? 1 : (Math.sin(w / 2) / (w / 2)) ** 2), n: 600 }]} xTicks={[[-4 * PI, "−4π/T₁"], [-2 * PI, "−2π/T₁"], [2 * PI, "2π/T₁"], [4 * PI, "4π/T₁"]]} yTicks={[[1, "T₁"]]} />
        </Panel>
      </Row>
    ),
  },
  "ft-exp": {
    wide: true,
    caption: r`$e^{-at}u(t)\leftrightarrow\dfrac1{a+j\omega}$. The magnitude $1/\sqrt{a^2+\omega^2}$ is even; the phase $-\tan^{-1}(\omega/a)$ is odd and tends to $\mp\pi/2$.`,
    node: (
      <Row>
        <Panel title="|X(jω)|">
          <Graph x={[-6, 6]} y={[-0.15, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => 1 / Math.sqrt(1 + w * w) }]} xTicks={[[-1, "−a"], [1, "a"]]} yTicks={[[1, "1/a"]]} />
        </Panel>
        <Panel title="∠X(jω)">
          <Graph x={[-6, 6]} y={[-1.9, 1.9]} xLabel="ω" items={[{ kind: "fn", f: (w) => -Math.atan(w), tone: "second" }, { kind: "hline", y: PI / 2 }, { kind: "hline", y: -PI / 2 }]} xTicks={[[-1, "−a"], [1, "a"]]} yTicks={[[PI / 2, "π/2"], [-PI / 2, "−π/2"]]} />
        </Panel>
      </Row>
    ),
  },
  "ft-sgn": {
    wide: true,
    caption: "sgn(t) is the limit of e^(−at)u(t) − e^(at)u(−t) as a → 0. Each member of the family has an ordinary transform; the limit gives 2/(jω).",
    node: (
      <Row>
        <Panel title="f(t) − f(−t) for a = 1 and a = 0.25">
          <Graph x={[-6, 6]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => (t > 0 ? Math.exp(-t) : -Math.exp(t)), tone: "muted", n: 600 }, { kind: "fn", f: (t) => (t > 0 ? Math.exp(-0.25 * t) : -Math.exp(0.25 * t)), tone: "second", n: 600 }]} yTicks={[1, -1]} />
        </Panel>
        <Panel title="sgn(t)">
          <Graph x={[-6, 6]} y={[-1.3, 1.3]} items={[{ kind: "path", pts: [[-6, -1], [0, -1]] }, { kind: "path", pts: [[0, 1], [6, 1]] }]} yTicks={[1, -1]} />
        </Panel>
      </Row>
    ),
  },
  "ft-scaling": {
    wide: true,
    caption: "Compress in time, expand in frequency. x(2t) (ochre) is half as wide as x(t) (sage); its spectrum is twice as wide and half as tall.",
    node: (
      <Row>
        <Panel title="x(t) and x(2t)">
          <Graph x={[-3, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-t * t) }, { kind: "fn", f: (t) => Math.exp(-4 * t * t), tone: "second" }]} />
        </Panel>
        <Panel title="X(jω) and ½X(jω/2)">
          <Graph x={[-8, 8]} y={[-0.1, 1.9]} xLabel="ω" items={[{ kind: "fn", f: (w) => Math.sqrt(PI) * Math.exp((-w * w) / 4) }, { kind: "fn", f: (w) => 0.5 * Math.sqrt(PI) * Math.exp((-w * w) / 16), tone: "second" }]} />
        </Panel>
      </Row>
    ),
  },
  "ft-periodic-spectrum": {
    caption: r`A periodic signal's transform is a train of impulses at the harmonics $k\omega_0$, with strengths $2\pi a_k$ that follow the single pulse's spectrum (dashed): $X(j\omega)=2\pi\sum_k a_k\,\delta(\omega-k\omega_0)$.`,
    node: <Graph width={460} x={[-16, 16]} y={[-0.15, 0.6]} xLabel="ω" noYAxis items={[{ kind: "fn", f: pulseFT, dashed: true, tone: "muted", width: 1.2, n: 500 }, { kind: "impulses", pts: range(-7, 7).map((k) => [(k * 2 * PI) / 3, pulseFT((k * 2 * PI) / 3)] as P) }]} xTicks={[[(-2 * PI) / 3, "−ω₀"], 0, [(2 * PI) / 3, "ω₀"]]} />,
  },
  "ft-denoise": {
    wide: true,
    caption: "Audio denoising in one picture: noise spreads across high frequencies, while the useful signal sits at low frequencies. Keep the low band, cut the rest, and transform back.",
    node: (
      <Row>
        <Panel title="noisy signal">
          <Graph x={[0, 10]} y={[-1.8, 1.8]} items={[{ kind: "fn", f: (t) => Math.sin(1.3 * t) + 0.25 * Math.sin(37 * t) + 0.18 * Math.sin(53 * t + 1) + 0.12 * Math.sin(71 * t), n: 1200, width: 1.3 }]} />
        </Panel>
        <Panel title="after low-pass filtering">
          <Graph x={[0, 10]} y={[-1.8, 1.8]} items={[{ kind: "fn", f: (t) => Math.sin(1.3 * t) }]} />
        </Panel>
      </Row>
    ),
  },
}
