import { Graph, Panel, PI, Row, range } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]
const r = String.raw

function dft(x: number[]) {
  const N = x.length
  return range(0, N - 1).map((k) => {
    let re = 0
    let im = 0
    x.forEach((v, n) => {
      re += v * Math.cos((2 * PI * k * n) / N)
      im -= v * Math.sin((2 * PI * k * n) / N)
    })
    return { re, im, mag: Math.hypot(re, im), ph: Math.atan2(im, re) }
  })
}
/** |DTFT| of a finite sequence starting at n = 0. */
function dtftMag(x: number[], w: number) {
  let re = 0
  let im = 0
  x.forEach((v, n) => {
    re += v * Math.cos(w * n)
    im -= v * Math.sin(w * n)
  })
  return Math.hypot(re, im)
}
const lp = [1, 0.8, 0.5, 0.2] // a short low-pass sequence
const xc = (t: number) => 1 + 0.8 * Math.cos(t) + 0.5 * Math.cos(2 * t)
const real8 = [3, 5, 2, 0, 1, 2, 4, 1]
const D8 = dft(real8)

function Clock() {
  const pts = range(0, 7).map((n) => {
    const a = PI / 2 - (2 * PI * n) / 8
    return { n, x: 130 + 78 * Math.cos(a), y: 110 - 78 * Math.sin(a) }
  })
  return (
    <svg viewBox="0 0 260 220" className="h-auto w-full max-w-[260px]" role="img" style={{ fontFamily: "var(--font-inter)" }}>
      <circle cx="130" cy="110" r="78" fill="none" className="stroke-foreground/30" strokeWidth={1.2} />
      {pts.map((p) => (
        <g key={p.n}>
          <circle cx={p.x} cy={p.y} r={14} className={p.n === 0 ? "fill-primary" : "fill-accent stroke-primary/50"} strokeWidth={1} />
          <text x={p.x} y={p.y + 4.5} textAnchor="middle" className={p.n === 0 ? "fill-primary-foreground text-[12px]" : "fill-foreground text-[12px]"}>
            {p.n}
          </text>
        </g>
      ))}
      <text x="130" y="106" textAnchor="middle" className="fill-muted-foreground text-[12px]">N = 8</text>
      <text x="130" y="122" textAnchor="middle" className="fill-muted-foreground text-[11px]">((9))₈ = 1, ((−1))₈ = 7</text>
    </svg>
  )
}

export const dftFigures: FigureMap = {
  "dft-sample-periodic": {
    caption: "Sample a periodic x(t) so that exactly N samples cover one period: T₀ = NTₛ. The sequence x[n] = x(nTₛ) is then itself N-periodic.",
    node: <Graph width={460} x={[-0.3, 4 * PI + 0.3]} y={[-0.6, 2.6]} items={[{ kind: "fn", f: xc, tone: "muted", dashed: true, width: 1.2 }, { kind: "stems", pts: range(0, 15).map((n) => [(n * 2 * PI) / 8, xc((n * 2 * PI) / 8)] as P) }, { kind: "arrow", from: [0, 2.35], to: [2 * PI, 2.35], double: true, label: "T₀ = N Tₛ  (N = 8)", tone: "second" }]} xTicks={[[2 * PI / 8, "Tₛ"], [2 * PI, "T₀"], [4 * PI, "2T₀"]]} />,
  },
  "dft-impulse-sampling": {
    wide: true,
    caption: "Sampling as an impulse train: multiply x(t) by p(t) = Σδ(t − nTₛ). Each impulse in xₚ(t) is weighted by the sample value x[n].",
    node: (
      <Row>
        <Panel title="p(t) = Σ δ(t − nTₛ)">
          <Graph x={[-0.3, 2 * PI + 0.3]} y={[-0.4, 2.6]} items={[{ kind: "impulses", pts: range(0, 8).map((n) => [(n * 2 * PI) / 8, 1] as P), tone: "muted" }]} xTicks={[[2 * PI / 8, "Tₛ"]]} />
        </Panel>
        <Panel title="xₚ(t) = Σ x[n] δ(t − nTₛ)">
          <Graph x={[-0.3, 2 * PI + 0.3]} y={[-0.4, 2.6]} items={[{ kind: "fn", f: xc, tone: "muted", dashed: true, width: 1 }, { kind: "impulses", pts: range(0, 8).map((n) => [(n * 2 * PI) / 8, xc((n * 2 * PI) / 8)] as P) }]} xTicks={[[2 * PI / 8, "Tₛ"]]} />
        </Panel>
      </Row>
    ),
  },
  "dft-periodic-coeffs": {
    caption: "Sampling in time made the spectrum periodic: cₖ₊N = cₖ, so the same N values repeat forever. We conventionally keep the window k = 0 … N − 1 (shaded).",
    node: <Graph width={460} x={[-12.5, 19.5]} y={[-0.15, 1.3]} xLabel="k" noYAxis items={[{ kind: "band", from: -0.5, to: 7.5, label: "the N we keep" }, { kind: "stems", pts: range(-12, 19).map((k) => [k, [1, 0.4, 0.25, 0, 0, 0, 0.25, 0.4][((k % 8) + 8) % 8]] as P) }]} xTicks={[[-8, "−N"], 0, [4, "N/2"], [8, "N"], [16, "2N"]]} />,
  },
  "dft-bins": {
    wide: true,
    caption: "Reading the bins. Left: the natural spectrum, centred at k = 0 with negative k on the left. Right: periodicity moves each negative-k coefficient to k + N, so it folds onto the upper bins: c₋ₖ = c_{N−k}.",
    node: (
      <Row>
        <Panel title="centred: negative | positive">
          <Graph x={[-4.6, 4.6]} y={[-0.15, 1.3]} xLabel="k" noYAxis items={[{ kind: "stems", pts: [-3, -2, -1].map((k) => [k, [1, 0.6, 0.3, 0.15][Math.abs(k)]] as P), tone: "second" }, { kind: "stems", pts: [0, 1, 2, 3, 4].map((k) => [k, [1, 0.6, 0.3, 0.15, 0.1][k]] as P) }]} xTicks={[[-4, "−N/2"], 0, [4, "N/2"]]} />
        </Panel>
        <Panel title="as computed: k = 0 … N − 1">
          <Graph x={[-0.6, 8.2]} y={[-0.15, 1.3]} xLabel="k" noYAxis items={[{ kind: "stems", pts: [0, 1, 2, 3, 4].map((k) => [k, [1, 0.6, 0.3, 0.15, 0.1][k]] as P) }, { kind: "stems", pts: [5, 6, 7].map((k) => [k, [0.15, 0.3, 0.6][k - 5]] as P), tone: "second" }, { kind: "text", at: [2, 1.2], text: "positive: low → high", tone: "accent" }, { kind: "text", at: [6.2, 0.8], text: "negative: high → low", tone: "second" }]} xTicks={[0, [4, "N/2"], [7, "N−1"]]} />
        </Panel>
      </Row>
    ),
  },
  "dft-dtft-periodic": {
    caption: r`The DTFT is $2\pi$-periodic: $X(e^{j(\omega+2\pi)})=X(e^{j\omega})$. One period, usually $[-\pi,\pi]$ (shaded), holds everything. Low frequencies sit near $\omega=0$ and $\pm2\pi$; the highest frequency is $\omega=\pm\pi$.`,
    node: <Graph width={460} x={[-2.2 * PI, 2.2 * PI]} y={[-0.2, 2.8]} xLabel="ω" noYAxis items={[{ kind: "band", from: -PI, to: PI, label: "principal interval" }, { kind: "fn", f: (w) => dtftMag(lp, w), n: 600 }]} xTicks={[[-2 * PI, "−2π"], [-PI, "−π"], 0, [PI, "π"], [2 * PI, "2π"]]} />,
  },
  "dft-samples-dtft": {
    caption: r`The $N$-point DFT is $N$ evenly spaced samples of the DTFT over one period, at $\omega_k=2\pi k/N$ (here $N=8$). Bins past $k=N/2$ are the folded negative frequencies.`,
    node: <Graph width={460} x={[-0.3, 2 * PI + 0.3]} y={[-0.2, 2.8]} xLabel="ω" noYAxis items={[{ kind: "fn", f: (w) => dtftMag(lp, w), dashed: true, tone: "muted", width: 1.2, n: 400 }, { kind: "stems", pts: range(0, 7).map((k) => [(2 * PI * k) / 8, dtftMag(lp, (2 * PI * k) / 8)] as P) }]} xTicks={[0, [PI / 4, "2π/N"], [PI, "π"], [2 * PI, "2π"]]} />,
  },
  "dft-zero-pad": {
    wide: true,
    caption: "Zero-padding: appending zeros changes nothing in the DTFT sum, so the curve is the same. The longer DFT just samples it more finely (spacing 2π/M instead of 2π/N). More pixels, not more information.",
    node: (
      <Row>
        <Panel title="N = 4 samples, 4-point DFT">
          <Graph x={[-0.3, 2 * PI + 0.3]} y={[-0.2, 2.8]} xLabel="ω" noYAxis items={[{ kind: "fn", f: (w) => dtftMag(lp, w), dashed: true, tone: "muted", width: 1.2 }, { kind: "stems", pts: range(0, 3).map((k) => [(2 * PI * k) / 4, dtftMag(lp, (2 * PI * k) / 4)] as P) }]} xTicks={[0, [PI, "π"], [2 * PI, "2π"]]} />
        </Panel>
        <Panel title="padded to M = 32">
          <Graph x={[-0.3, 2 * PI + 0.3]} y={[-0.2, 2.8]} xLabel="ω" noYAxis items={[{ kind: "fn", f: (w) => dtftMag(lp, w), dashed: true, tone: "muted", width: 1.2 }, { kind: "stems", pts: range(0, 31).map((k) => [(2 * PI * k) / 32, dtftMag(lp, (2 * PI * k) / 32)] as P), tone: "second" }]} xTicks={[0, [PI, "π"], [2 * PI, "2π"]]} />
        </Panel>
      </Row>
    ),
  },
  "dft-example": {
    caption: "x[n] = {1, 2, 3, 4} gives X = {10, −2 + 2j, −2, −2 − 2j}, so |X| = {10, 2√2, 2, 2√2}. Bin 3 is bin 1's negative-frequency partner: |X[3]| = |X[1]|.",
    node: <Graph width={400} x={[-0.6, 3.8]} y={[-0.6, 11.5]} xLabel="k" yLabel="|X[k]|" items={[{ kind: "stems", pts: [[0, 10], [1, 2 * Math.SQRT2], [2, 2], [3, 2 * Math.SQRT2]] }]} xTicks={[0, 1, 2, 3]} yTicks={[[10, "10"], [2 * Math.SQRT2, "2√2"]]} />,
  },
  "dft-hz": {
    caption: "From bins to hertz with N = 8 samples at fₛ = 8 kHz: the spacing is Δf = fₛ/N = 1 kHz. Bins 0 … 4 are 0 … 4 kHz; bins 5, 6, 7 are −3, −2, −1 kHz.",
    node: <Graph width={460} x={[-0.6, 7.8]} y={[-0.2, 1.3]} xLabel="k" noYAxis items={[{ kind: "stems", pts: [0, 1, 2, 3, 4].map((k) => [k, [1, 0.7, 0.4, 0.2, 0.1][k]] as P) }, { kind: "stems", pts: [5, 6, 7].map((k) => [k, [0.2, 0.4, 0.7][k - 5]] as P), tone: "second" }]} xTicks={[[0, "0"], [1, "1"], [2, "2"], [3, "3"], [4, "4"], [5, "−3"], [6, "−2"], [7, "−1 kHz"]]} />,
  },
  "dft-clock": {
    caption: "On N points every index lives on a clock: ((n))ₙ = n mod N. Walking past n = 7 lands on n = 0, and n = −1 is n = 7.",
    node: <Clock />,
  },
  "dft-modulation": {
    wide: true,
    caption: r`Multiplying by $(-1)^n=e^{j\pi n}$ rotates the spectrum by half the clock ($k_0=N/2$): low and high frequencies trade places. A low-pass sequence becomes a high-pass one.`,
    node: (
      <Row>
        <Panel title="|X[k]|: low-pass">
          <Graph x={[-0.6, 15.6]} y={[-0.2, 3]} xLabel="k" noYAxis items={[{ kind: "stems", pts: range(0, 15).map((k) => [k, dtftMag(lp, (2 * PI * k) / 16)] as P) }]} xTicks={[0, [8, "N/2"], [15, "N−1"]]} />
        </Panel>
        <Panel title="after × (−1)ⁿ: high-pass">
          <Graph x={[-0.6, 15.6]} y={[-0.2, 3]} xLabel="k" noYAxis items={[{ kind: "stems", pts: range(0, 15).map((k) => [k, dtftMag(lp, (2 * PI * (k - 8)) / 16)] as P), tone: "second" }]} xTicks={[0, [8, "N/2"], [15, "N−1"]]} />
        </Panel>
      </Row>
    ),
  },
  "dft-symmetry": {
    wide: true,
    caption: "8-point DFT of the real sequence {3, 5, 2, 0, 1, 2, 4, 1}. The magnitude is even about k = N/2 and the phase is odd: X[N − k] = X*[k]. Only bins 0 … N/2 are free.",
    node: (
      <Row>
        <Panel title="|X[k]|: even about N/2">
          <Graph x={[-0.6, 7.6]} y={[-1, 20]} xLabel="k" items={[{ kind: "vline", x: 4, label: "N/2" }, { kind: "stems", pts: D8.map((d, k) => [k, d.mag] as P) }]} xTicks={[0, 1, 2, 3, 4, 5, 6, 7]} />
        </Panel>
        <Panel title="∠X[k]: odd about N/2">
          <Graph x={[-0.6, 7.6]} y={[-3.4, 3.4]} xLabel="k" items={[{ kind: "vline", x: 4, label: "N/2" }, { kind: "stems", pts: D8.map((d, k) => [k, Math.abs(d.mag) < 1e-9 ? 0 : d.ph] as P), tone: "second" }]} xTicks={[0, 1, 2, 3, 4, 5, 6, 7]} yTicks={[[PI, "π"], [-PI, "−π"]]} />
        </Panel>
      </Row>
    ),
  },
  "dft-circ-vs-linear": {
    wide: true,
    caption: "x = {2, 4, 5, 6, 5, 3, 2, 1}, h = {1, 2, 1}. Linear convolution (left) has length 10. Circular 8-point convolution (right) folds the last two values back onto the first two: 6 = 2 + 4 and 9 = 8 + 1. The other six agree.",
    node: (
      <Row>
        <Panel title="linear: {2, 8, 15, 20, 22, 19, 13, 8, 4, 1}">
          <Graph x={[-0.6, 9.6]} y={[-1, 25]} xLabel="n" items={[{ kind: "stems", pts: [2, 8, 15, 20, 22, 19, 13, 8].map((v, n) => [n, v] as P) }, { kind: "stems", pts: [[8, 4], [9, 1]], tone: "second" }]} xTicks={[0, 2, 4, 6, 8, 9]} />
        </Panel>
        <Panel title="circular (N = 8): {6, 9, 15, 20, 22, 19, 13, 8}">
          <Graph x={[-0.6, 9.6]} y={[-1, 25]} xLabel="n" items={[{ kind: "stems", pts: [15, 20, 22, 19, 13, 8].map((v, n) => [n + 2, v] as P) }, { kind: "stems", pts: [[0, 6], [1, 9]], tone: "second" }]} xTicks={[0, 2, 4, 6, 7]} />
        </Panel>
      </Row>
    ),
  },
  "dft-unroll": {
    caption: "Going round the clock is walking along the periodic extension x̃[n]. At n = 0 the flipped h (ochre) reaches into the previous lap and grabs its tail values x[7] = 1 and x[6] = 2. That leak is the wrap.",
    node: <Graph width={460} x={[-8.5, 8.5]} y={[-0.5, 7]} xLabel="m" items={[{ kind: "band", from: -8.5, to: -0.5, tone: "muted", label: "previous lap" }, { kind: "stems", pts: [2, 4, 5, 6, 5, 3, 2, 1].map((v, n) => [n - 8, v] as P), tone: "muted" }, { kind: "stems", pts: [2, 4, 5, 6, 5, 3, 2, 1].map((v, n) => [n, v] as P) }, { kind: "stems", pts: [[0.2, 1], [-0.8, 2], [-1.8, 1]], tone: "second" }]} xTicks={[-8, -2, -1, 0, 7]} />,
  },
  "dft-padded": {
    caption: "Pad both sequences to N = 10 ≥ L + M − 1. The previous lap now ends in zeros, the flipped h finds nothing there, and the circular result equals the linear one: {2, 8, 15, …, 4, 1}.",
    node: <Graph width={460} x={[-10.5, 10.5]} y={[-0.5, 7]} xLabel="m" items={[{ kind: "band", from: -10.5, to: -0.5, tone: "muted", label: "previous lap" }, { kind: "stems", pts: [2, 4, 5, 6, 5, 3, 2, 1, 0, 0].map((v, n) => [n - 10, v] as P), tone: "muted" }, { kind: "stems", pts: [2, 4, 5, 6, 5, 3, 2, 1, 0, 0].map((v, n) => [n, v] as P) }, { kind: "stems", pts: [[0.2, 1], [-0.8, 2], [-1.8, 1]], tone: "second" }, { kind: "text", at: [-1.3, 3.2], text: "zeros", tone: "second" }]} xTicks={[-10, -2, -1, 0, 7, 9]} />,
  },
}
