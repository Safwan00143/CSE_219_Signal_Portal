import { Blocks, Graph, Panel, PI, Row, range, sinc } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]
const r = String.raw
const tri = (w: number, W: number) => (Math.abs(w) < W ? 1 - Math.abs(w) / W : 0)
const copies = (w: number, ws: number, W: number, K = 4) => {
  let s = 0
  for (let k = -K; k <= K; k++) s += tri(w - k * ws, W)
  return s
}
const xs = (t: number) => 0.8 * Math.sin(0.9 * t + 0.4) + 0.35 * Math.cos(1.7 * t)
const T = 1

export const samplingFigures: FigureMap = {
  "smp-ambiguity": {
    caption: "Infinitely many continuous signals pass through exactly the same samples. Without extra assumptions the samples do not pin the signal down.",
    node: <Graph width={460} x={[-3.4, 3.4]} y={[-1.6, 1.6]} items={[{ kind: "fn", f: (t) => Math.cos(0.8 * t) * 0.9 }, { kind: "fn", f: (t) => Math.cos(0.8 * t) * 0.9 + 0.5 * Math.sin(PI * t), tone: "second" }, { kind: "fn", f: (t) => Math.cos(0.8 * t) * 0.9 - 0.35 * Math.sin(2 * PI * t), tone: "muted", n: 500 }, { kind: "dots", pts: range(-3, 3).map((n) => [n, Math.cos(0.8 * n) * 0.9] as P), tone: "ink" }]} xTicks={[[-3, "−3T"], [-2, "−2T"], [-1, "−T"], [1, "T"], [2, "2T"], [3, "3T"]]} />,
  },
  "smp-multiply": {
    wide: true,
    caption: "Sampling as multiplication: x(t) times the impulse train p(t) gives xₚ(t), a train of impulses whose strengths are the samples x(nT).",
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-4.4, 4.4]} y={[-1.3, 1.4]} items={[{ kind: "fn", f: xs }]} />
        </Panel>
        <Panel title="p(t) = Σ δ(t − nT)">
          <Graph x={[-4.4, 4.4]} y={[-1.3, 1.4]} items={[{ kind: "impulses", pts: range(-4, 4).map((n) => [n * T, 1] as P), tone: "muted" }]} xTicks={[[1, "T"]]} />
        </Panel>
        <Panel title="xₚ(t) = Σ x(nT) δ(t − nT)">
          <Graph x={[-4.4, 4.4]} y={[-1.3, 1.4]} items={[{ kind: "fn", f: xs, tone: "muted", dashed: true, width: 1 }, { kind: "impulses", pts: range(-4, 4).map((n) => [n, xs(n)] as P) }]} xTicks={[[1, "T"]]} />
        </Panel>
      </Row>
    ),
  },
  "smp-train-spectrum": {
    wide: true,
    caption: r`An impulse train in time is an impulse train in frequency: $p(t)=\sum\delta(t-nT)\leftrightarrow P(j\omega)=\frac{2\pi}T\sum_k\delta(\omega-k\omega_s)$, spaced $\omega_s=2\pi/T$ apart. Closer samples give sparser spectral lines.`,
    node: (
      <Row>
        <Panel title="p(t), spacing T">
          <Graph x={[-3.4, 3.4]} y={[-0.2, 1.4]} items={[{ kind: "impulses", pts: range(-3, 3).map((n) => [n, 1] as P) }]} xTicks={[[-1, "−T"], [1, "T"]]} />
        </Panel>
        <Panel title="P(jω), spacing ωₛ = 2π/T, strength 2π/T">
          <Graph x={[-3.4, 3.4]} y={[-0.2, 1.4]} xLabel="ω" items={[{ kind: "impulses", pts: range(-3, 3).map((n) => [n, 1] as P), tone: "second" }]} xTicks={[[-1, "−ωₛ"], [1, "ωₛ"], [2, "2ωₛ"]]} />
        </Panel>
      </Row>
    ),
  },
  "smp-conv-impulse": {
    caption: "Convolving with a shifted impulse just places a copy: δ(t − t₀) ∗ h(t) = h(t − t₀). Convolving with a train of impulses therefore puts one copy at every impulse.",
    node: <Graph width={460} x={[-1.5, 6]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-6 * t * t), tone: "muted", dashed: true }, { kind: "impulses", pts: [[3.5, 0.8]], tone: "second" }, { kind: "fn", f: (t) => Math.exp(-6 * (t - 3.5) ** 2) }, { kind: "text", at: [0, 1.15], text: "h(t)", tone: "muted" }, { kind: "text", at: [3.5, 1.15], text: "h(t − t₀)", tone: "accent" }]} xTicks={[0, [3.5, "t₀"]]} />,
  },
  "smp-copies": {
    wide: true,
    caption: r`The sampled spectrum $X_p(j\omega)=\frac1T\sum_kX(j(\omega-k\omega_s))$: one copy of $X$ at every multiple of $\omega_s$, each scaled by $1/T$. When $\omega_s>2\omega_M$ the copies are separated by a guard band.`,
    node: (
      <Row>
        <Panel title="X(jω), band-limited to ω_M">
          <Graph x={[-9, 9]} y={[-0.15, 1.3]} xLabel="ω" items={[{ kind: "fn", f: (w) => tri(w, 2), area: true }]} xTicks={[[-2, "−ω_M"], [2, "ω_M"]]} yTicks={[1]} />
        </Panel>
        <Panel title="Xₚ(jω), ωₛ > 2ω_M">
          <Graph x={[-9, 9]} y={[-0.15, 1.3]} xLabel="ω" items={[{ kind: "band", from: 2, to: 3, tone: "second", label: "guard" }, { kind: "fn", f: (w) => copies(w, 5, 2), area: true, n: 600 }]} xTicks={[[-5, "−ωₛ"], [2, "ω_M"], [3, "ωₛ−ω_M"], [5, "ωₛ"]]} yTicks={[[1, "1/T"]]} />
        </Panel>
      </Row>
    ),
  },
  "smp-alias": {
    wide: true,
    caption: "Undersampling (ωₛ < 2ω_M): neighbouring copies overlap and add where they meet (left). High frequencies fold into the low band, and no filter can un-mix the sum (right). This is aliasing.",
    node: (
      <Row>
        <Panel title="the copies overlap">
          <Graph x={[-7, 7]} y={[-0.15, 1.5]} xLabel="ω" items={[...range(-3, 3).map((k) => ({ kind: "fn" as const, f: (w: number) => tri(w - k * 3, 2), tone: (k === 0 ? "accent" : "muted") as "accent" | "muted", width: 1.4 }))]} xTicks={[[-3, "−ωₛ"], [-2, "−ω_M"], [2, "ω_M"], [3, "ωₛ"]]} />
        </Panel>
        <Panel title="their sum: the original shape is lost">
          <Graph x={[-7, 7]} y={[-0.15, 1.5]} xLabel="ω" items={[{ kind: "fn", f: (w) => tri(w, 2), tone: "muted", dashed: true, width: 1 }, { kind: "fn", f: (w) => copies(w, 3, 2), area: true, tone: "second", n: 600 }]} xTicks={[[-3, "−ωₛ"], [3, "ωₛ"]]} />
        </Panel>
      </Row>
    ),
  },
  "smp-alias-tone": {
    caption: "Aliasing in time: a 7 kHz tone (grey) and a 3 kHz tone (sage) sampled at 10 kHz give exactly the same samples. After reconstruction you hear 3 kHz.",
    node: <Graph width={460} x={[0, 0.0012]} y={[-1.3, 1.3]} xLabel="t" items={[{ kind: "fn", f: (t) => Math.cos(2 * PI * 7000 * t), tone: "muted", n: 800, width: 1.2 }, { kind: "fn", f: (t) => Math.cos(2 * PI * 3000 * t), n: 500 }, { kind: "dots", pts: range(0, 12).map((n) => [n * 1e-4, Math.cos(2 * PI * 3000 * n * 1e-4)] as P), tone: "second" }]} xTicks={[[0.0001, "Tₛ"], [0.0005, "5Tₛ"], [0.001, "10Tₛ"]]} />,
  },
  "smp-reconstruct-block": {
    caption: "Ideal reconstruction: pass the impulse-sampled signal through an ideal low-pass filter.",
    node: (
      <Blocks
        width={460}
        height={70}
        nodes={[
          { id: "in", x: 48, y: 35, shape: "text", label: "xₚ(t)" },
          { id: "f", x: 230, y: 35, label: "Ideal LPF H(jω)", sub: "gain T, cutoff ω_c", w: 160, h: 46 },
          { id: "out", x: 410, y: 35, shape: "text", label: "x_r(t) = x(t)" },
        ]}
        wires={[{ pts: [[80, 35], [150, 35]] }, { pts: [[310, 35], [360, 35]] }]}
      />
    ),
  },
  "smp-ideal-lpf": {
    wide: true,
    caption: "The ideal reconstruction filter: a rectangle of height T and cutoff ω_c = ωₛ/2 = π/T (left). Its impulse response is sinc(πt/T), which extends forever in both directions (right), so the ideal filter is unrealisable.",
    node: (
      <Row>
        <Panel title="H(jω)">
          <Graph x={[-6, 6]} y={[-0.2, 1.3]} xLabel="ω" items={[{ kind: "path", pts: [[-6, 0], [-PI, 0], [-PI, 1], [PI, 1], [PI, 0], [6, 0]], area: true }]} xTicks={[[-PI, "−π/T"], [PI, "π/T"]]} yTicks={[[1, "T"]]} />
        </Panel>
        <Panel title="h(t) = sin(πt/T)/(πt/T)">
          <Graph x={[-5, 5]} y={[-0.35, 1.2]} items={[{ kind: "fn", f: (t) => sinc(PI * t), n: 500 }]} xTicks={[[-3, "−3T"], [-1, "−T"], [1, "T"], [3, "3T"]]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "smp-interp": {
    caption: "Band-limited interpolation: every sample launches a shifted, scaled sinc (thin curves). Each sinc is zero at every other sample instant, and their sum (thick) passes exactly through all the samples.",
    node: (
      <Graph
        width={460}
        x={[-3.5, 4.5]}
        y={[-0.9, 1.5]}
        items={[
          ...range(-3, 4).map((n) => ({ kind: "fn" as const, f: (t: number) => xs(n) * sinc(PI * (t - n)), tone: "muted" as const, width: 1, n: 500 })),
          { kind: "fn", f: (t) => range(-12, 12).reduce((s, n) => s + xs(n) * sinc(PI * (t - n)), 0), n: 500 },
          { kind: "dots", pts: range(-3, 4).map((n) => [n, xs(n)] as P), tone: "second" },
        ]}
        xTicks={[[-2, "−2T"], [-1, "−T"], [1, "T"], [2, "2T"], [3, "3T"]]}
      />
    ),
  },
  "smp-zoh": {
    wide: true,
    caption: "Zero-order hold: hold each sample until the next one arrives, giving a staircase. It is the impulse-sampled signal filtered by a rectangle h₀(t) of width T, the reason every DAC output looks like this.",
    node: (
      <Row>
        <Panel title="staircase reconstruction">
          <Graph x={[-0.3, 6.3]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: xs, tone: "muted", dashed: true, width: 1 }, { kind: "fn", f: (t) => xs(Math.floor(t)), n: 1200 }, { kind: "dots", pts: range(0, 6).map((n) => [n, xs(n)] as P), tone: "second" }]} xTicks={[[1, "T"], [2, "2T"]]} />
        </Panel>
        <Panel title="h₀(t): 1 on [0, T]">
          <Graph x={[-1, 3]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-1, 0], [0, 0], [0, 1], [1, 1], [1, 0], [3, 0]] }]} xTicks={[[1, "T"], [2, "2T"]]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "smp-foh": {
    wide: true,
    caption: "Linear interpolation (first-order hold): join neighbouring samples with straight lines. It is the impulse-sampled signal filtered by a triangle h₁(t) on [−T, T], which is two ZOH rectangles convolved.",
    node: (
      <Row>
        <Panel title="linear interpolation">
          <Graph x={[-0.3, 6.3]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: xs, tone: "muted", dashed: true, width: 1 }, { kind: "path", pts: range(0, 6).map((n) => [n, xs(n)] as P) }, { kind: "dots", pts: range(0, 6).map((n) => [n, xs(n)] as P), tone: "second" }]} xTicks={[[1, "T"], [2, "2T"]]} />
        </Panel>
        <Panel title="h₁(t): triangle, peak 1">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0]] }]} xTicks={[[-1, "−T"], [1, "T"]]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "smp-filters": {
    caption: "Reconstruction filters compared (T = 1): the ideal rectangle, the ZOH's |T sinc(ωT/2)| and linear interpolation's T sinc²(ωT/2). The ZOH droops inside the passband and leaks images outside; linear interpolation rolls off much faster.",
    node: <Graph width={460} x={[-14, 14]} y={[-0.08, 1.25]} xLabel="ω" items={[{ kind: "path", pts: [[-14, 0], [-PI, 0], [-PI, 1], [PI, 1], [PI, 0], [14, 0]], tone: "muted", dashed: true }, { kind: "fn", f: (w) => Math.abs(sinc(w / 2)), tone: "second", n: 600 }, { kind: "fn", f: (w) => sinc(w / 2) ** 2, n: 600 }, { kind: "text", at: [6, 1.05], text: "ideal", tone: "muted" }, { kind: "text", at: [9.5, 0.3], text: "ZOH", tone: "second" }, { kind: "text", at: [4.6, 0.12], text: "linear", tone: "accent", anchor: "start" }]} xTicks={[[-2 * PI, "−ωₛ"], [-PI, "−ωₛ/2"], [PI, "ωₛ/2"], [2 * PI, "ωₛ"]]} yTicks={[1]} />,
  },
  "smp-time-limited": {
    wide: true,
    caption: "A time-limited capture (left) has a spectrum with infinite tails. After sampling, the tails of the neighbouring copies always leak into the baseband (right): some aliasing is unavoidable.",
    node: (
      <Row>
        <Panel title="time-limited signal">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-0.5, 0], [-0.5, 1], [0.5, 1], [0.5, 0], [2, 0]] }]} xTicks={[[-0.5, "−T/2"], [0.5, "T/2"]]} />
        </Panel>
        <Panel title="sampled spectrum: tails overlap">
          <Graph x={[-30, 30]} y={[-0.15, 1.2]} xLabel="ω" items={[...[-1, 1].map((k) => ({ kind: "fn" as const, f: (w: number) => Math.abs(sinc((w - k * 20) / 2)), tone: "muted" as const, width: 1.2, n: 600 })), { kind: "fn", f: (w) => Math.abs(sinc(w / 2)), n: 600 }, { kind: "band", from: -10, to: 10, tone: "second", label: "baseband" }]} xTicks={[[-20, "−ωₛ"], [20, "ωₛ"]]} />
        </Panel>
      </Row>
    ),
  },
  "smp-dft-period": {
    caption: r`The sampled spectrum repeats every $\omega_s$. One $\omega_s$-wide period is the DTFT; the $N$-point DFT takes $N$ uniformly spaced samples (spacing $\omega_s/N$) across it. Bins past $N/2$ are the wrapped negative frequencies.`,
    node: <Graph width={460} x={[-12, 12]} y={[-0.15, 1.3]} xLabel="ω" noYAxis items={[{ kind: "fn", f: (w) => copies(w, 10, 3.5), dashed: true, tone: "muted", width: 1.2, n: 600 }, { kind: "stems", pts: range(0, 9).map((k) => [k, copies(k, 10, 3.5)] as P) }]} xTicks={[[-10, "−ωₛ"], [-5, "−ωₛ/2"], 0, [5, "ωₛ/2"], [10, "ωₛ"]]} />,
  },
  "smp-lines": {
    caption: r`A periodic signal has a harmonic line spectrum. Sampling copies every line to every passband $\omega_s$ apart. If $|k\omega_0|<\omega_s/2$ for all non-zero harmonics, one passband holds one clean copy (no overlap), and the DFT bins are scaled Fourier-series coefficients: $X[k]=Na_k$.`,
    node: <Graph width={460} x={[-15, 15]} y={[-0.15, 1.3]} xLabel="ω" noYAxis items={[{ kind: "band", from: -4.5, to: 4.5, label: "one passband" }, ...[-1, 0, 1].map((r0) => ({ kind: "impulses" as const, pts: [-3, -2, -1, 0, 1, 2, 3].map((k) => [k * 1.3 + r0 * 10, [0.3, 0.55, 0.8, 1, 0.8, 0.55, 0.3][k + 3]] as P), tone: (r0 === 0 ? "accent" : "muted") as "accent" | "muted" }))]} xTicks={[[-10, "−ωₛ"], [1.3, "ω₀"], [10, "ωₛ"]]} />,
  },
  "smp-dt-sampling": {
    wide: true,
    caption: r`Sampling a discrete-time signal: keep every $N$-th sample. The spectrum is copied every $\omega_s=2\pi/N$. With $\omega_M=2\pi/9$ and $N=4$ (right) the copies do not overlap; any $N\ge5$ would alias.`,
    node: (
      <Row>
        <Panel title="X(e^jω), zero for 2π/9 ≤ |ω| ≤ π">
          <Graph x={[-PI, PI]} y={[-0.1, 1.3]} xLabel="ω" items={[{ kind: "fn", f: (w) => tri(w, (2 * PI) / 9), area: true, n: 600 }]} xTicks={[[-PI, "−π"], [(-2 * PI) / 9, "−2π/9"], [(2 * PI) / 9, "2π/9"], [PI, "π"]]} />
        </Panel>
        <Panel title="after sampling with N = 4 (ωₛ = π/2)">
          <Graph x={[-PI, PI]} y={[-0.1, 1.3]} xLabel="ω" items={[{ kind: "fn", f: (w) => 0.25 * copies(w, PI / 2, (2 * PI) / 9, 6) * 4, area: true, n: 900 }]} xTicks={[[-PI, "−π"], [-PI / 2, "−π/2"], [PI / 2, "π/2"], [PI, "π"]]} />
        </Panel>
      </Row>
    ),
  },
}
