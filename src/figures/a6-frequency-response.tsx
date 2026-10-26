import { Graph, Panel, PI, Row } from "./kit"
import type { FigureMap } from "./figure"

const r = String.raw

/** Sine integral Si(x) = ∫₀ˣ sin(u)/u du, by Simpson's rule (fine for plotting). */
function Si(x: number) {
  const n = 200
  const h = x / n
  let s = 0
  for (let i = 0; i <= n; i++) {
    const u = i * h
    const f = u === 0 ? 1 : Math.sin(u) / u
    s += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * f
  }
  return (s * h) / 3
}

const sq = (t: number) => {
  // square wave of period 2π built from odd harmonics with a chosen phase rule
  return Math.sign(Math.sin(t))
}
const sqHarm = (t: number, phase: (k: number) => number) => {
  let s = 0
  for (let k = 1; k <= 15; k += 2) s += (4 / (PI * k)) * Math.sin(k * t - phase(k))
  return s
}

function RCCircuit() {
  return (
    <svg viewBox="0 0 360 150" className="h-auto w-full max-w-[360px]" role="img" style={{ fontFamily: "var(--font-inter)" }}>
      <g className="stroke-foreground/75" strokeWidth={1.5} fill="none">
        <path d="M40 40 H120" />
        <path d="M120 40 l6 -8 l10 16 l10 -16 l10 16 l10 -16 l10 16 l6 -8" />
        <path d="M182 40 H320" />
        <path d="M250 40 V68" />
        <path d="M232 68 H268 M232 78 H268" />
        <path d="M250 78 V112" />
        <path d="M40 112 H320" />
      </g>
      <circle cx="40" cy="40" r="3" className="fill-foreground/75" />
      <circle cx="40" cy="112" r="3" className="fill-foreground/75" />
      <circle cx="320" cy="40" r="3" className="fill-foreground/75" />
      <circle cx="320" cy="112" r="3" className="fill-foreground/75" />
      <text x="150" y="24" textAnchor="middle" className="fill-foreground text-[13px] italic">R</text>
      <text x="282" y="78" className="fill-foreground text-[13px] italic">C</text>
      <text x="22" y="80" textAnchor="middle" className="fill-primary text-[13px] italic">x(t)</text>
      <text x="340" y="80" textAnchor="middle" className="fill-primary text-[13px] italic">y(t)</text>
      <text x="40" y="30" textAnchor="middle" className="fill-muted-foreground text-[11px]">+</text>
      <text x="320" y="30" textAnchor="middle" className="fill-muted-foreground text-[11px]">+</text>
      <text x="40" y="132" textAnchor="middle" className="fill-muted-foreground text-[11px]">−</text>
      <text x="320" y="132" textAnchor="middle" className="fill-muted-foreground text-[11px]">−</text>
    </svg>
  )
}

export const frequencyResponseFigures: FigureMap = {
  "fr-sinusoid": {
    caption: r`An LTI system passes a sinusoid at the same frequency, scaled by $|H(j\omega_1)|$ and shifted by $\theta(\omega_1)$. Here the gain is 0.6 and the output lags by a phase of 0.9 rad.`,
    node: <Graph width={460} x={[0, 13]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => Math.cos(t), tone: "muted", dashed: true }, { kind: "fn", f: (t) => 0.6 * Math.cos(t - 0.9) }, { kind: "text", at: [0.6, 1.12], text: "input cos ω₁t", tone: "muted", anchor: "start" }, { kind: "text", at: [1.6, 0.75], text: "output", tone: "accent", anchor: "start" }]} yTicks={[1, [0.6, "|H|"]]} />,
  },
  "fr-distortionless": {
    wide: true,
    caption: r`A distortionless system: constant gain $k$ at every frequency, and phase $-\omega t_d$, a straight line through the origin with slope $-t_d$.`,
    node: (
      <Row>
        <Panel title="|H(jω)| = k">
          <Graph x={[-5, 5]} y={[-0.2, 1.4]} xLabel="ω" items={[{ kind: "fn", f: () => 1 }]} yTicks={[[1, "k"]]} />
        </Panel>
        <Panel title="θ(ω) = −ωt_d">
          <Graph x={[-5, 5]} y={[-2.4, 2.4]} xLabel="ω" items={[{ kind: "fn", f: (w) => -0.45 * w, tone: "second" }, { kind: "text", at: [2.6, -1.6], text: "slope −t_d", tone: "second" }]} />
        </Panel>
      </Row>
    ),
  },
  "fr-allpass": {
    wide: true,
    caption: r`An all-pass system $H(s)=\frac{s-a}{s+a}$: the gain is 1 everywhere, but the phase $\pi-2\tan^{-1}(\omega/a)$ is not a straight line, so different frequencies are delayed by different amounts.`,
    node: (
      <Row>
        <Panel title="|H(jω)| = 1">
          <Graph x={[-6, 6]} y={[-0.2, 1.4]} xLabel="ω" items={[{ kind: "fn", f: () => 1 }]} yTicks={[1]} />
        </Panel>
        <Panel title="phase: not linear">
          <Graph x={[-6, 6]} y={[-0.3, 3.6]} xLabel="ω" items={[{ kind: "fn", f: (w) => PI - 2 * Math.atan(w), tone: "second" }]} yTicks={[[PI, "π"], [PI / 2, "π/2"]]} xTicks={[[1, "a"]]} />
        </Panel>
      </Row>
    ),
  },
  "fr-phase-distortion": {
    wide: true,
    caption: "The same eight harmonics of a square wave with their amplitudes untouched. Left: every harmonic delayed by the same time (linear phase), so the shape survives. Right: a constant 60° phase lag on every harmonic (non-linear in ω), and the waveform is badly reshaped.",
    node: (
      <Row>
        <Panel title="linear phase: shape kept (only delayed)">
          <Graph x={[0, 2 * PI]} y={[-1.6, 1.6]} items={[{ kind: "fn", f: sq, tone: "muted", width: 1, n: 600 }, { kind: "fn", f: (t) => sqHarm(t, (k) => 0.6 * k), n: 800 }]} />
        </Panel>
        <Panel title="non-linear phase: shape distorted">
          <Graph x={[0, 2 * PI]} y={[-1.6, 1.6]} items={[{ kind: "fn", f: sq, tone: "muted", width: 1, n: 600 }, { kind: "fn", f: (t) => sqHarm(t, () => PI / 3), tone: "second", n: 800 }]} />
        </Panel>
      </Row>
    ),
  },
  "fr-echo": {
    wide: true,
    caption: r`A cosine ripple on the gain, $|H|=1+k\cos\omega T$ (left), produces the main pulse plus two "paired echoes" of height $k/2$, one $T$ before and one $T$ after (right, $t_d=0$).`,
    node: (
      <Row>
        <Panel title="|H(jω)| = 1 + k cos ωT  (k = 0.4)">
          <Graph x={[-12, 12]} y={[-0.2, 1.7]} xLabel="ω" items={[{ kind: "fn", f: (w) => 1 + 0.4 * Math.cos(w), n: 500 }]} yTicks={[[1.4, "1+k"], [1, "1"], [0.6, "1−k"]]} />
        </Panel>
        <Panel title="y(t) = g(t) + (k/2)[g(t − T) + g(t + T)]">
          <Graph x={[-4, 4]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-8 * t * t) }, { kind: "fn", f: (t) => 0.2 * Math.exp(-8 * (t - 2.2) ** 2) + 0.2 * Math.exp(-8 * (t + 2.2) ** 2), tone: "second" }]} xTicks={[[-2.2, "−T"], 0, [2.2, "T"]]} yTicks={[1, [0.2, "k/2"]]} />
        </Panel>
      </Row>
    ),
  },
  "fr-ideal-filters": {
    wide: true,
    caption: "Magnitude responses of the ideal filters: low-pass keeps |ω| < W, high-pass keeps |ω| > W, band-pass keeps W₁ < |ω| < W₂. Each has a perfectly flat passband and zero transition width.",
    node: (
      <Row>
        <Panel title="low-pass">
          <Graph x={[-4, 4]} y={[-0.2, 1.3]} xLabel="ω" items={[{ kind: "path", pts: [[-4, 0], [-1.5, 0], [-1.5, 1], [1.5, 1], [1.5, 0], [4, 0]], area: true }]} xTicks={[[-1.5, "−W"], [1.5, "W"]]} />
        </Panel>
        <Panel title="high-pass">
          <Graph x={[-4, 4]} y={[-0.2, 1.3]} xLabel="ω" items={[{ kind: "path", pts: [[-4, 1], [-1.5, 1], [-1.5, 0], [1.5, 0], [1.5, 1], [4, 1]], area: true }]} xTicks={[[-1.5, "−W"], [1.5, "W"]]} />
        </Panel>
        <Panel title="band-pass">
          <Graph x={[-4, 4]} y={[-0.2, 1.3]} xLabel="ω" items={[{ kind: "path", pts: [[-4, 0], [-3, 0], [-3, 1], [-1.5, 1], [-1.5, 0], [1.5, 0], [1.5, 1], [3, 1], [3, 0], [4, 0]], area: true }]} xTicks={[[-3, "−W₂"], [-1.5, "−W₁"], [1.5, "W₁"], [3, "W₂"]]} />
        </Panel>
      </Row>
    ),
  },
  "fr-lpf-impulse": {
    caption: r`Impulse response of the ideal low-pass filter with delay $t_d$: a sinc centred at $t_d$, peak $W/\pi$, zero crossings every $\pi/W$. Its tail extends to $t\to-\infty$, so part of the response comes before the impulse at $t=0$: the filter is non-causal.`,
    node: <Graph width={460} x={[-8, 14]} y={[-0.12, 0.42]} items={[{ kind: "band", from: -8, to: 0, tone: "second", label: "t < 0" }, { kind: "fn", f: (t) => (Math.abs(t - 3) < 1e-9 ? 1 / PI : Math.sin(t - 3) / (PI * (t - 3))), n: 700 }]} xTicks={[0, [3, "t_d"], [3 + PI, "t_d + π/W"]]} yTicks={[[1 / PI, "W/π"]]} />,
  },
  "fr-lpf-pulse": {
    caption: "A rectangular pulse (dashed) through an ideal low-pass filter (t_d = 0). The output is rounded, rings with about 9% overshoot near the edges (Gibbs), and starts rising before the input has even begun.",
    node: <Graph width={460} x={[-4, 4]} y={[-0.25, 1.3]} items={[{ kind: "path", pts: [[-4, 0], [-1, 0], [-1, 1], [1, 1], [1, 0], [4, 0]], tone: "muted", dashed: true }, { kind: "fn", f: (t) => (Si(4 * (t + 1)) - Si(4 * (t - 1))) / PI, n: 400 }]} xTicks={[[-1, "−T/2"], [1, "T/2"]]} yTicks={[1]} />,
  },
  "fr-rc-circuit": {
    caption: "The RC low-pass circuit: series resistor R, output taken across the shunt capacitor C.",
    node: <RCCircuit />,
  },
  "fr-rc-response": {
    wide: true,
    caption: r`RC low-pass with $RC=1$. For $\omega\ll1/RC$ (shaded) the gain is nearly 1 and the phase (ochre) hugs the straight line $-\omega RC$ (dashed): the circuit is approximately distortionless with delay $t_d=RC$.`,
    node: (
      <Row>
        <Panel title="|H(jω)| = 1/√(1 + (ωRC)²)">
          <Graph x={[-6, 6]} y={[-0.15, 1.3]} xLabel="ω" items={[{ kind: "band", from: -0.4, to: 0.4 }, { kind: "fn", f: (w) => 1 / Math.sqrt(1 + w * w) }]} xTicks={[[-1, "−1/RC"], [1, "1/RC"]]} yTicks={[1]} />
        </Panel>
        <Panel title="θ(ω) = −tan⁻¹(ωRC)">
          <Graph x={[-6, 6]} y={[-1.9, 1.9]} xLabel="ω" items={[{ kind: "band", from: -0.4, to: 0.4 }, { kind: "fn", f: (w) => -w, tone: "muted", dashed: true, from: -1.8, to: 1.8 }, { kind: "fn", f: (w) => -Math.atan(w), tone: "second" }]} xTicks={[[-1, "−1/RC"], [1, "1/RC"]]} yTicks={[[PI / 2, "π/2"], [-PI / 2, "−π/2"]]} />
        </Panel>
      </Row>
    ),
  },
  "fr-differentiator": {
    wide: true,
    caption: r`The differentiator $H(j\omega)=j\omega$: gain grows linearly with $|\omega|$, phase is $+\pi/2$ for $\omega>0$ and $-\pi/2$ for $\omega<0$.`,
    node: (
      <Row>
        <Panel title="|H| = |ω|">
          <Graph x={[-4, 4]} y={[-0.3, 4.3]} xLabel="ω" items={[{ kind: "fn", f: (w) => Math.abs(w) }]} />
        </Panel>
        <Panel title="∠H = ±π/2">
          <Graph x={[-4, 4]} y={[-2, 2]} xLabel="ω" items={[{ kind: "path", pts: [[-4, -PI / 2], [0, -PI / 2]], tone: "second" }, { kind: "path", pts: [[0, PI / 2], [4, PI / 2]], tone: "second" }]} yTicks={[[PI / 2, "π/2"], [-PI / 2, "−π/2"]]} />
        </Panel>
      </Row>
    ),
  },
}
