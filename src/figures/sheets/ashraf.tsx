import { Graph, Panel, PI, Plane, Row, tri } from "../kit"
import type { FigureMap } from "../figure"
import { Butterfly4 } from "../book/fft"
import { at, r, stems } from "../book/util"

const xr = ["x[0]", "x[2]", "x[1]", "x[3]"]
const Xn = ["X[0]", "X[1]", "X[2]", "X[3]"]
const nsinc = (x: number) => (Math.abs(x) < 1e-9 ? 1 : Math.sin(PI * x) / (PI * x))
/** Spectral copies of a triangle of half-width b, repeated every fs, drawn over [-span, span]. */
const copies = (b: number, fs: number) => (f: number) => {
  let s = 0
  for (let k = -3; k <= 3; k++) s += tri(f - k * fs, b)
  return s
}

export const sheetAshrafFigures: FigureMap = {
  /* ───── 1. Radix-2 DIT FFT ───── */
  "sb-12": {
    caption: r`$x=[2,1,-3,4]$. The inputs enter in bit-reversed order; stage 1 forms $G=[-1,5]$ and $H=[5,-3]$; stage 2 combines them with $W_4^0=1$ and $W_4^1=-j$.`,
    node: <Butterfly4 variant="dit" values={[["2", "−3", "1", "4"], ["−1", "5", "5", "−3"], ["4", "5 + 3j", "−6", "5 − 3j"]]} inLabels={xr} outLabels={Xn} />,
  },
  "sb-13": {
    caption: r`$x=[1,2,3,4]$: stage 1 gives $G=[4,-2]$ and $H=[6,-2]$; stage 2 gives $X=[10,\,-2+2j,\,-2,\,-2-2j]$.`,
    node: <Butterfly4 variant="dit" values={[["1", "3", "2", "4"], ["4", "−2", "6", "−2"], ["10", "−2 + 2j", "−2", "−2 − 2j"]]} inLabels={xr} outLabels={Xn} />,
  },
  "sb-44": {
    wide: true,
    caption: r`Left: the true linear convolution, 5 samples long. Right: with only a 4-point FFT, the 5th sample $y[4]=2$ wraps around ($4\equiv0\bmod4$) and lands on $y[0]$, giving $1+2=3$.`,
    node: (
      <Row>
        <Panel title="linear: [1, −1, 3, −1, 2]">
          <Graph x={[-0.7, 5.7]} y={[-1.5, 3.6]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 5, at({ 0: 1, 1: -1, 2: 3, 3: -1, 4: 2 })), values: true }]} xTicks={[0, 1, 2, 3, 4]} height={140} />
        </Panel>
        <Panel title="4-point circular: [3, −1, 3, −1]">
          <Graph x={[-0.7, 5.7]} y={[-1.5, 3.6]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 5, at({ 0: 3, 1: -1, 2: 3, 3: -1 })), tone: "second", values: true }]} xTicks={[0, 1, 2, 3, 4]} height={140} />
        </Panel>
      </Row>
    ),
  },

  /* ───── 5. Sampling theorem ───── */
  "sb-53": {
    wide: true,
    caption: r`Top: $f_s=4.5$ kHz. The copies start at $\pm2.9$ kHz, leaving a gap after the band edge at $1.6$ kHz: safe. Bottom: $f_s=2.8$ kHz. The copies start at $\pm1.2$ kHz, inside $[-1.6,1.6]$: they overlap (aliasing).`,
    node: (
      <>
        <Graph width={460} x={[-7, 7]} y={[-0.1, 1.4]} xLabel="f (kHz)" items={[{ kind: "fn", f: copies(1.6, 4.5), n: 900 }, { kind: "band", from: 1.6, to: 2.9, label: "gap" }]} xTicks={[[-4.5, "−fₛ"], [-1.6, "−1.6"], [1.6, "1.6"], [4.5, "fₛ"]]} yTicks={[]} height={120} />
        <Graph width={460} x={[-7, 7]} y={[-0.1, 1.4]} xLabel="f (kHz)" items={[{ kind: "fn", f: (f) => tri(f, 1.6), n: 600 }, { kind: "fn", f: (f) => tri(f - 2.8, 1.6) + tri(f + 2.8, 1.6) + tri(f - 5.6, 1.6) + tri(f + 5.6, 1.6), n: 900, tone: "second" }, { kind: "band", from: 1.2, to: 1.6, tone: "second", label: "overlap" }]} xTicks={[[-2.8, "−fₛ"], [-1.6, "−1.6"], [1.6, "1.6"], [2.8, "fₛ"]]} yTicks={[]} height={120} />
      </>
    ),
  },
  "sb-54": {
    wide: true,
    caption: r`Tones at 1.2 and 1.8 kHz. Left, $f_s=4$ kHz: both are below the Nyquist frequency 2 kHz (dashed). Right, $f_s=3$ kHz: 1.8 kHz is above 1.5 kHz and folds to $|1.8-3|=1.2$ kHz, on top of the real 1.2 kHz tone.`,
    node: (
      <Row>
        <Panel title="fₛ = 4 kHz: safe">
          <Graph x={[0, 2.6]} y={[-0.1, 1.3]} xLabel="f (kHz)" items={[{ kind: "vline", x: 2, tone: "muted", dashed: true, label: "fₛ/2" }, { kind: "impulses", pts: [[1.2, 1], [1.8, 1]] }]} xTicks={[1.2, 1.8]} yTicks={[]} height={130} />
        </Panel>
        <Panel title="fₛ = 3 kHz: 1.8 aliases to 1.2">
          <Graph x={[0, 2.6]} y={[-0.1, 1.3]} xLabel="f (kHz)" items={[{ kind: "vline", x: 1.5, tone: "muted", dashed: true, label: "fₛ/2" }, { kind: "impulses", pts: [[1.2, 1]] }, { kind: "impulses", pts: [[1.8, 0.6]], tone: "second" }, { kind: "arrow", from: [1.8, 0.75], to: [1.25, 0.75], tone: "second" }]} xTicks={[1.2, 1.8]} yTicks={[]} height={130} />
        </Panel>
      </Row>
    ),
  },

  /* ───── 6. Reconstruction ───── */
  "sb-61": {
    caption: r`$h_{\text{ideal}}(t)=\operatorname{sinc}(t/T)$: equal to 1 at $t=0$ and zero at every other sample time $t=nT$. It extends both ways, so it is non-causal.`,
    node: <Graph width={440} x={[-4.5, 4.5]} y={[-0.35, 1.2]} items={[{ kind: "fn", f: nsinc, n: 600 }]} xTicks={[[-2, "−2T"], [-1, "−T"], [1, "T"], [2, "2T"]]} yTicks={[1]} />,
  },
  "sb-62": {
    caption: r`$h_0(t)=u(t)-u(t-T)$: each sample is held for one sampling interval. It is zero for $t<0$, so the ZOH is causal.`,
    node: <Graph x={[-1.5, 2.5]} y={[-0.15, 1.3]} items={[{ kind: "path", pts: [[-1.5, 0], [0, 0], [0, 1], [1, 1], [1, 0], [2.5, 0]], area: true }]} xTicks={[[1, "T"]]} yTicks={[1]} />,
  },
  "sb-63": {
    caption: r`$h_1(t)=1-\frac{|t|}{T}$ for $|t|<T$: the triangle that joins neighbouring samples by straight lines. It is the convolution of two width-$T$ rectangles, divided by $T$.`,
    node: <Graph x={[-2, 2]} y={[-0.15, 1.3]} items={[{ kind: "fn", f: (t) => tri(t, 1), n: 300, area: true }]} xTicks={[[-1, "−T"], [1, "T"]]} yTicks={[1]} />,
  },
  "sb-64": {
    caption: r`Normalised magnitudes $|H|/T$ against $\omega$ (in units of $\omega_s$): ideal (flat 1 up to $\omega_s/2$), ZOH ($|\operatorname{sinc}|$, sage) and linear interpolation ($\operatorname{sinc}^2$, ochre). At $\omega_s/4$ (dashed) they are $1$, $0.900$ and $0.811$.`,
    node: <Graph width={460} x={[-2.2, 2.2]} y={[-0.05, 1.2]} xLabel="ω/ωₛ" items={[{ kind: "path", pts: [[-2.2, 0], [-0.5, 0], [-0.5, 1], [0.5, 1], [0.5, 0], [2.2, 0]], tone: "muted", dashed: true }, { kind: "fn", f: (w) => Math.abs(nsinc(w)), n: 600 }, { kind: "fn", f: (w) => nsinc(w) ** 2, n: 600, tone: "second" }, { kind: "vline", x: 0.25, tone: "muted", dashed: true }]} xTicks={[[-0.5, "−½"], [0.25, "¼"], [0.5, "½"], [1, "1"], [2, "2"]]} yTicks={[1]} />,
  },
  /* ───── 7–9. Laplace ───── */
  "sb-71": {
    caption: r`A double pole at $s=-3$; the ROC is everything to its right, $\mathrm{Re}\{s\}>-3$. The delay $e^{-2s}$ adds no poles.`,
    node: <Plane kind="s" range={4} poles={[[-3, 0]]} poleOrder={[{ at: [-3, 0], text: "(2)" }]} roc={{ left: -3 }} ticks={[-3]} />,
  },
  "sb-72": {
    caption: r`A triple pole at $s=-3$; ROC $\mathrm{Re}\{s\}>-3$.`,
    node: <Plane kind="s" range={4} poles={[[-3, 0]]} poleOrder={[{ at: [-3, 0], text: "(3)" }]} roc={{ left: -3 }} ticks={[-3]} />,
  },
  "sb-73": {
    caption: r`The right-sided term has a double pole at $-1$ (ROC to its right); the left-sided term has a pole at $2$ (ROC to its left). Together: the strip $-1<\mathrm{Re}\{s\}<2$.`,
    node: <Plane kind="s" range={3} poles={[[-1, 0], [2, 0]]} poleOrder={[{ at: [-1, 0], text: "(2)" }]} roc={{ left: -1, right: 2 }} ticks={[-1, 2]} />,
  },
  "sb-74": {
    caption: r`Poles at $-4\pm3j$ and a zero at $-4$; ROC $\mathrm{Re}\{s\}>-4$.`,
    node: <Plane kind="s" range={5} poles={[[-4, 3], [-4, -3]]} zeros={[[-4, 0]]} roc={{ left: -4 }} ticks={[-4, 3]} />,
  },
  "sb-75": {
    caption: r`Double poles at $-1\pm2j$ and a zero at $-1$; ROC $\mathrm{Re}\{s\}>-1$.`,
    node: <Plane kind="s" range={3} poles={[[-1, 2], [-1, -2]]} zeros={[[-1, 0]]} poleOrder={[{ at: [-1, 2], text: "(2)" }, { at: [-1, -2], text: "(2)" }]} roc={{ left: -1 }} ticks={[-1, 2]} />,
  },
  "sb-76": {
    caption: r`Poles at $-1\pm3j$ and $-2$, no finite zeros. The ROC is the intersection of the two ROCs: $\mathrm{Re}\{s\}>-1$.`,
    node: <Plane kind="s" range={4} poles={[[-1, 3], [-1, -3], [-2, 0]]} roc={{ left: -1 }} ticks={[-2, -1, 3]} />,
  },
  "sb-81": {
    caption: r`$x(t)=(4e^{-t}-e^{-2t})u(t)$: starts at $3$ and decays.`,
    node: <Graph x={[-0.5, 5.5]} y={[-0.2, 3.4]} items={[{ kind: "fn", f: (t) => (t >= 0 ? 4 * Math.exp(-t) - Math.exp(-2 * t) : 0), n: 500 }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[3]} />,
  },
  "sb-82": {
    wide: true,
    caption: r`Left: poles at $-1\pm2j$, ROC $\mathrm{Re}\{s\}>-1$. Right: $x(t)=\left(2e^{-t}\cos2t+\tfrac12e^{-t}\sin2t\right)u(t)$, a decaying oscillation.`,
    node: (
      <Row>
        <Panel title="pole–zero plot">
          <Plane kind="s" range={3} poles={[[-1, 2], [-1, -2]]} roc={{ left: -1 }} ticks={[-1, 2]} size={190} />
        </Panel>
        <Panel title="x(t)">
          <Graph x={[-0.5, 5.5]} y={[-0.6, 2.3]} items={[{ kind: "fn", f: (t) => (t >= 0 ? Math.exp(-t) * (2 * Math.cos(2 * t) + 0.5 * Math.sin(2 * t)) : 0), n: 600 }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[2]} height={170} />
        </Panel>
      </Row>
    ),
  },
  "sb-83": {
    wide: true,
    caption: r`Left: the ROC is the strip between the poles at $-1$ and $4$. Right: $x(t)=e^{-t}u(t)+e^{4t}u(-t)$, two-sided, decaying both ways from $t=0$.`,
    node: (
      <Row>
        <Panel title="pole–zero plot">
          <Plane kind="s" range={5} poles={[[-1, 0], [4, 0]]} roc={{ left: -1, right: 4 }} ticks={[-1, 4]} size={190} />
        </Panel>
        <Panel title="x(t)">
          <Graph x={[-1.5, 5]} y={[-0.1, 1.2]} items={[{ kind: "fn", f: (t) => (t >= 0 ? Math.exp(-t) : Math.exp(4 * t)), n: 700 }]} xTicks={[-1, 1, 2, 3, 4]} yTicks={[1]} height={170} />
        </Panel>
      </Row>
    ),
  },
  "sb-84": {
    caption: r`$x(t)=\tfrac14t\sin(2t)\,u(t)$: double poles on the $j\omega$-axis at $\pm2j$ give an oscillation whose size grows linearly with $t$.`,
    node: <Graph x={[-0.3, 5.5]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: (t) => (t >= 0 ? 0.25 * t * Math.sin(2 * t) : 0), n: 600 }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[1, -1]} />,
  },
  "sb-85": {
    caption: r`$x(t)=\tfrac12\left(1-e^{-2(t-1)}\right)u(t-1)$: zero until $t=1$, then rising towards $\tfrac12$.`,
    node: <Graph x={[-0.3, 5.5]} y={[-0.05, 0.62]} items={[{ kind: "fn", f: (t) => (t >= 1 ? 0.5 * (1 - Math.exp(-2 * (t - 1))) : 0), n: 600 }, { kind: "vline", x: 1, tone: "muted", dashed: true }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[[0.5, "½"]]} />,
  },
  "sb-86": {
    caption: r`$x(t)=\tfrac12(1-\cos2t)\,u(t)$: the running integral of $\sin2t$, swinging between $0$ and $1$.`,
    node: <Graph x={[-0.3, 5.5]} y={[-0.1, 1.2]} items={[{ kind: "fn", f: (t) => (t >= 0 ? 0.5 * (1 - Math.cos(2 * t)) : 0), n: 600 }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[1]} />,
  },
  "sb-87": {
    caption: r`$x(t)=\delta(t)-2e^{-2t}u(t)$: an impulse at the origin plus a negative decaying exponential that starts at $-2$.`,
    node: <Graph x={[-0.5, 3.5]} y={[-2.3, 1.4]} items={[{ kind: "impulses", pts: [[0, 1, "δ(t)"]] }, { kind: "fn", f: (t) => (t > 0 ? -2 * Math.exp(-2 * t) : 0), from: 0.001, n: 400, tone: "second" }]} xTicks={[1, 2, 3]} yTicks={[-2]} />,
  },
  "sb-91": {
    wide: true,
    caption: r`After cancelling, only the pole at $-1$ is left (the cancelled one at $-2$ is shown as a zero). Left: $\mathrm{Re}\{s\}>-1$, causal and stable. Right: $\mathrm{Re}\{s\}<-1$, anti-causal and unstable.`,
    node: (
      <Row>
        <Panel title="Re{s} > −1">
          <Plane kind="s" range={3} poles={[[-1, 0]]} roc={{ left: -1 }} ticks={[-2, -1]} size={180} />
        </Panel>
        <Panel title="Re{s} < −1">
          <Plane kind="s" range={3} poles={[[-1, 0]]} roc={{ right: -1 }} ticks={[-2, -1]} size={180} />
        </Panel>
      </Row>
    ),
  },
  "sb-92": {
    wide: true,
    caption: r`Poles at $-3$ and $-1$ (double) give three possible ROCs. Only the right half-plane, $\mathrm{Re}\{s\}>-1$, contains the $j\omega$-axis.`,
    node: (
      <Row cols={3}>
        <Panel title="Re{s} > −1: causal, stable">
          <Plane kind="s" range={4} poles={[[-1, 0], [-3, 0]]} poleOrder={[{ at: [-1, 0], text: "(2)" }]} roc={{ left: -1 }} size={160} />
        </Panel>
        <Panel title="−3 < Re{s} < −1: two-sided">
          <Plane kind="s" range={4} poles={[[-1, 0], [-3, 0]]} poleOrder={[{ at: [-1, 0], text: "(2)" }]} roc={{ left: -3, right: -1 }} size={160} />
        </Panel>
        <Panel title="Re{s} < −3: anti-causal">
          <Plane kind="s" range={4} poles={[[-1, 0], [-3, 0]]} poleOrder={[{ at: [-1, 0], text: "(2)" }]} roc={{ right: -3 }} size={160} />
        </Panel>
      </Row>
    ),
  },
  "sb-93": {
    caption: r`$x(t)=e^{-2t}\big(u(t)-u(t-3)\big)$: a finite piece of the exponential, on $0\le t<3$. A finite-duration signal has the whole $s$-plane as its ROC.`,
    node: <Graph x={[-0.5, 4.5]} y={[-0.1, 1.2]} items={[{ kind: "fn", f: (t) => (t >= 0 && t < 3 ? Math.exp(-2 * t) : 0), n: 800 }]} xTicks={[1, 2, 3, 4]} yTicks={[1]} />,
  },
  "sb-94": {
    caption: r`$y(t)=\left(e^{-(t-1)}-e^{-2(t-1)}\right)u(t-1)$: zero until the input switches on at $t=1$, then a gentle rise and decay.`,
    node: <Graph x={[-0.3, 6]} y={[-0.03, 0.3]} items={[{ kind: "fn", f: (t) => (t >= 1 ? Math.exp(-(t - 1)) - Math.exp(-2 * (t - 1)) : 0), n: 600 }, { kind: "vline", x: 1, tone: "muted", dashed: true }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[[0.25, "¼"]]} />,
  },
  "sb-95": {
    caption: r`$y(t)=\left(e^{-2(t-1)}-e^{-(t-1)}+(t-1)e^{-(t-1)}\right)u(t-1)$: zero until $t=1$, then a small, smooth bump.`,
    node: <Graph x={[-0.3, 6.5]} y={[-0.02, 0.2]} items={[{ kind: "fn", f: (t) => { const u = t - 1; return u >= 0 ? Math.exp(-2 * u) - Math.exp(-u) + u * Math.exp(-u) : 0 }, n: 600 }, { kind: "vline", x: 1, tone: "muted", dashed: true }]} xTicks={[1, 2, 3, 4, 5, 6]} yTicks={[[0.1, "0.1"]]} />,
  },
  "sb-96": {
    caption: r`$H(s)=\frac{s+3}{(s+2)(s+3)}$: the zero at $-3$ cancels the pole there, leaving one pole at $-2$. Causal means ROC $\mathrm{Re}\{s\}>-2$, which contains the $j\omega$-axis: stable.`,
    node: <Plane kind="s" range={4} poles={[[-2, 0]]} roc={{ left: -2 }} ticks={[-3, -2]} />,
  },
  /* ───── 10–12. z-transform ───── */
  "sb-101": {
    caption: r`Poles at $\tfrac34e^{\pm j\pi/3}$, zeros at $0$ and $\tfrac38$. The ROC is outside the pole circle, $|z|>\tfrac34$, and contains the unit circle.`,
    node: <Plane kind="z" range={1.4} poles={[[0.375, 0.6495], [0.375, -0.6495]]} zeros={[[0, 0], [0.375, 0]]} ring={{ inner: 0.75 }} ticks={[[0.75, "¾"], [1, "1"]]} />,
  },
  "sb-102": {
    caption: r`$X(z)=\dfrac1{3z\left(z-\frac13\right)^2}$: a double pole at $\tfrac13$, plus a pole at $0$ from the two-sample delay. ROC $|z|>\tfrac13$.`,
    node: <Plane kind="z" range={1.4} poles={[[0, 0], [1 / 3, 0]]} poleOrder={[{ at: [1 / 3, 0], text: "(2)" }]} ring={{ inner: 1 / 3 }} ticks={[[1 / 3, "⅓"], [1, "1"]]} />,
  },
  "sb-103": {
    caption: r`Poles at $\tfrac14$ and $2$, zeros at $0$ and $\tfrac98$. The ROC is the annulus $\tfrac14<|z|<2$ between the poles.`,
    node: <Plane kind="z" range={2.5} poles={[[0.25, 0], [2, 0]]} zeros={[[0, 0], [1.125, 0]]} ring={{ inner: 0.25, outer: 2 }} ticks={[[1, "1"], [2, "2"]]} />,
  },
  "sb-104": {
    caption: r`Zeros at $1$ and $e^{\pm j\pi/3}$, all on the unit circle; a triple pole at the origin. A finite right-sided sequence: the ROC is every $z\ne0$.`,
    node: <Plane kind="z" range={1.4} poles={[[0, 0]]} zeros={[[1, 0], [0.5, 0.866], [0.5, -0.866]]} poleOrder={[{ at: [0, 0], text: "(3)" }]} ring={{ inner: 0 }} ticks={[[1, "1"]]} />,
  },
  "sb-105": {
    caption: r`Poles at $\tfrac12e^{\pm j\pi/3}$ and one finite zero at $\tfrac14$ (the delay removed the origin zero). ROC $|z|>\tfrac12$.`,
    node: <Plane kind="z" range={1.4} poles={[[0.25, 0.433], [0.25, -0.433]]} zeros={[[0.25, 0]]} ring={{ inner: 0.5 }} ticks={[[0.5, "½"], [1, "1"]]} />,
  },
  "sb-106": {
    caption: r`Poles at $\tfrac12$ and $\tfrac13$, a double zero at $0$. ROC $|z|>\tfrac12$, the intersection of the two ROCs.`,
    node: <Plane kind="z" range={1.4} poles={[[0.5, 0], [1 / 3, 0]]} zeros={[[0, 0]]} poleOrder={[{ at: [0, 0], text: "(2)" }]} ring={{ inner: 0.5 }} ticks={[[0.5, "½"], [1, "1"]]} />,
  },
  "sb-107": {
    caption: r`The accumulator adds a pole at $z=1$, on the unit circle, so the ROC shrinks to $|z|>1$. Double zero at $0$.`,
    node: <Plane kind="z" range={1.6} poles={[[0.5, 0], [1, 0]]} zeros={[[0, 0]]} poleOrder={[{ at: [0, 0], text: "(2)" }]} ring={{ inner: 1 }} ticks={[[0.5, "½"], [1, "1"]]} />,
  },
  "sb-111": {
    wide: true,
    caption: r`Left: poles at $\tfrac14,\tfrac34$, zeros at $0,\tfrac12$, ROC $|z|>\tfrac34$. Right: $x[n]=\left(\tfrac14\right)^nu[n]+\left(\tfrac34\right)^nu[n]$, starting at $x[0]=2$.`,
    node: (
      <Row>
        <Panel title="pole–zero plot">
          <Plane kind="z" range={1.4} poles={[[0.25, 0], [0.75, 0]]} zeros={[[0, 0], [0.5, 0]]} ring={{ inner: 0.75 }} ticks={[[1, "1"]]} size={190} />
        </Panel>
        <Panel title="x[n]">
          <Graph x={[-1.7, 8.7]} y={[-0.2, 2.4]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 8, (n) => (n >= 0 ? 0.25 ** n + 0.75 ** n : 0)) }]} xTicks={[0, 2, 4, 6, 8]} yTicks={[1, 2]} height={170} />
        </Panel>
      </Row>
    ),
  },
  "sb-112": {
    wide: true,
    caption: r`Left: poles at $\tfrac13$ and $2$, ROC $\tfrac13<|z|<2$. Right: $x[n]=-\tfrac65\,2^nu[-n-1]-\tfrac15\left(\tfrac13\right)^nu[n]$, two-sided and decaying both ways.`,
    node: (
      <Row>
        <Panel title="pole–zero plot">
          <Plane kind="z" range={2.5} poles={[[1 / 3, 0], [2, 0]]} zeros={[[0, 0]]} poleOrder={[{ at: [0, 0], text: "(2)" }]} ring={{ inner: 1 / 3, outer: 2 }} ticks={[[1, "1"], [2, "2"]]} size={190} />
        </Panel>
        <Panel title="x[n]">
          <Graph x={[-5.7, 5.7]} y={[-0.7, 0.1]} xLabel="n" items={[{ kind: "stems", pts: stems(-5, 5, (n) => (n < 0 ? -1.2 * 2 ** n : -0.2 * (1 / 3) ** n)) }]} xTicks={[-4, -2, 0, 2, 4]} yTicks={[[-0.6, "−0.6"], [-0.2, "−0.2"]]} height={170} />
        </Panel>
      </Row>
    ),
  },
  "sb-113": {
    wide: true,
    caption: r`Left: poles at $\tfrac13,\tfrac12$, zeros at $0,\tfrac56$, ROC $|z|<\tfrac13$. Right: $x[n]=2\left(\tfrac12\right)^nu[-n-1]-3\left(\tfrac13\right)^nu[-n-1]$, zero for $n\ge0$ and growing (negatively) as $n\to-\infty$.`,
    node: (
      <Row>
        <Panel title="pole–zero plot">
          <Plane kind="z" range={1.4} poles={[[0.5, 0], [1 / 3, 0]]} zeros={[[0, 0], [5 / 6, 0]]} ring={{ outer: 1 / 3 }} ticks={[[1, "1"]]} size={190} />
        </Panel>
        <Panel title="x[n]">
          <Graph x={[-3.7, 3.7]} y={[-72, 8]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 3, (n) => (n < 0 ? 2 * 0.5 ** n - 3 * (1 / 3) ** n : 0)), values: true }]} xTicks={[-3, -2, -1, 1, 2, 3]} height={170} />
        </Panel>
      </Row>
    ),
  },
  "sb-114": {
    wide: true,
    caption: r`Left: a double pole at $\tfrac12$, zeros at $0$ and $-\tfrac12$, ROC $|z|>\tfrac12$. Right: $x[n]=(2n+1)\left(\tfrac12\right)^nu[n]$: $1,\ 1.5,\ 1.25,\ 0.875,\dots$`,
    node: (
      <Row>
        <Panel title="pole–zero plot">
          <Plane kind="z" range={1.4} poles={[[0.5, 0]]} zeros={[[0, 0], [-0.5, 0]]} poleOrder={[{ at: [0.5, 0], text: "(2)" }]} ring={{ inner: 0.5 }} ticks={[[1, "1"]]} size={190} />
        </Panel>
        <Panel title="x[n]">
          <Graph x={[-1.7, 8.7]} y={[-0.15, 1.75]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 8, (n) => (n >= 0 ? (2 * n + 1) * 0.5 ** n : 0)) }]} xTicks={[0, 2, 4, 6, 8]} yTicks={[1]} height={170} />
        </Panel>
      </Row>
    ),
  },
  "sb-115": {
    wide: true,
    caption: r`Left: poles at $\tfrac12e^{\pm j\pi/3}$, zero at $\tfrac14$, ROC $|z|>\tfrac12$. Right: $x[n]=\left(\tfrac12\right)^{n-1}\cos\!\big(\tfrac{\pi(n-1)}3\big)u[n-1]$, a decaying cosine that starts at $n=1$.`,
    node: (
      <Row>
        <Panel title="pole–zero plot">
          <Plane kind="z" range={1.4} poles={[[0.25, 0.433], [0.25, -0.433]]} zeros={[[0.25, 0]]} ring={{ inner: 0.5 }} ticks={[[1, "1"]]} size={190} />
        </Panel>
        <Panel title="x[n]">
          <Graph x={[-1.7, 9.7]} y={[-0.3, 1.2]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 9, (n) => (n >= 1 ? 0.5 ** (n - 1) * Math.cos((PI * (n - 1)) / 3) : 0)) }]} xTicks={[1, 3, 5, 7, 9]} yTicks={[1]} height={170} />
        </Panel>
      </Row>
    ),
  },
  "sb-121": {
    wide: true,
    caption: r`After the cancellation at $z=2$ only the pole at $\tfrac12$ remains. Left: $|z|>\tfrac12$, causal and stable (the unit circle is inside the ROC). Right: $|z|<\tfrac12$, anti-causal and unstable.`,
    node: (
      <Row>
        <Panel title="|z| > ½">
          <Plane kind="z" range={1.4} poles={[[0.5, 0]]} zeros={[[0, 0]]} ring={{ inner: 0.5 }} ticks={[[1, "1"]]} size={180} />
        </Panel>
        <Panel title="|z| < ½">
          <Plane kind="z" range={1.4} poles={[[0.5, 0]]} zeros={[[0, 0]]} ring={{ outer: 0.5 }} ticks={[[1, "1"]]} size={180} />
        </Panel>
      </Row>
    ),
  },
  "sb-122": {
    wide: true,
    caption: r`Poles at $0.8$ and $1.25$ give three ROCs. Only the annulus $0.8<|z|<1.25$ contains the unit circle, so the only stable choice is two-sided, not causal.`,
    node: (
      <Row cols={3}>
        <Panel title="|z| > 1.25: causal, unstable">
          <Plane kind="z" range={1.6} poles={[[0.8, 0], [1.25, 0]]} zeros={[[0, 0]]} ring={{ inner: 1.25 }} size={160} />
        </Panel>
        <Panel title="0.8 < |z| < 1.25: stable">
          <Plane kind="z" range={1.6} poles={[[0.8, 0], [1.25, 0]]} zeros={[[0, 0]]} ring={{ inner: 0.8, outer: 1.25 }} size={160} />
        </Panel>
        <Panel title="|z| < 0.8: anti-causal">
          <Plane kind="z" range={1.6} poles={[[0.8, 0], [1.25, 0]]} zeros={[[0, 0]]} ring={{ outer: 0.8 }} size={160} />
        </Panel>
      </Row>
    ),
  },
  "sb-123": {
    caption: r`Poles at $\tfrac12$ and $1.2$, zeros at $0$ and $0.85$. The ROC $\tfrac12<|z|<1.2$ contains the unit circle, so the DTFT exists.`,
    node: <Plane kind="z" range={1.6} poles={[[0.5, 0], [1.2, 0]]} zeros={[[0, 0], [0.85, 0]]} ring={{ inner: 0.5, outer: 1.2 }} ticks={[[1, "1"]]} />,
  },
  "sb-124": {
    caption: r`Poles at $\tfrac23$ and $\tfrac43$, zeros at $0$ and $1$. The ROC $\tfrac23<|z|<\tfrac43$ contains the unit circle (stable) but not $z=\infty$ (not causal).`,
    node: <Plane kind="z" range={1.6} poles={[[2 / 3, 0], [4 / 3, 0]]} zeros={[[0, 0], [1, 0]]} ring={{ inner: 2 / 3, outer: 4 / 3 }} ticks={[[1, "1"]]} />,
  },
  "sb-125": {
    wide: true,
    caption: r`Poles at $0.95e^{\pm j\pi/4}$ and $1.1$. The causal ROC $|z|>1.1$ misses the unit circle; the stable ROC $0.95<|z|<1.1$ is two-sided. No ROC is both.`,
    node: (
      <Row cols={3}>
        <Panel title="|z| > 1.1: causal, unstable">
          <Plane kind="z" range={1.5} poles={[[0.672, 0.672], [0.672, -0.672], [1.1, 0]]} ring={{ inner: 1.1 }} size={160} />
        </Panel>
        <Panel title="0.95 < |z| < 1.1: stable">
          <Plane kind="z" range={1.5} poles={[[0.672, 0.672], [0.672, -0.672], [1.1, 0]]} ring={{ inner: 0.95, outer: 1.1 }} size={160} />
        </Panel>
        <Panel title="|z| < 0.95: anti-causal">
          <Plane kind="z" range={1.5} poles={[[0.672, 0.672], [0.672, -0.672], [1.1, 0]]} ring={{ outer: 0.95 }} size={160} />
        </Panel>
      </Row>
    ),
  },
}
