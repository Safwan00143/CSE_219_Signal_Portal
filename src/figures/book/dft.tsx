import { Graph, Panel, PI, Row } from "../kit"
import type { FigureMap } from "../figure"
import { r, stems, type P } from "./util"

const piTicks: [number, string][] = [[-PI, "−π"], [-PI / 2, "−π/2"], [PI / 2, "π/2"], [PI, "π"]]
const dtftMag = (x: number[]) => (w: number) => {
  let re = 0
  let im = 0
  x.forEach((v, n) => {
    re += v * Math.cos(w * n)
    im -= v * Math.sin(w * n)
  })
  return Math.hypot(re, im)
}
const m4321 = dtftMag([4, 3, 2, 1])
const sinc55 = (n: number) => Math.sin((PI / 4) * (n - 1.5)) / (PI * (n - 1.5))
const hann = (n: number, N: number) => 0.5 * (1 - Math.cos((2 * PI * n) / N))

export const bookDftFigures: FigureMap = {
  "bk-d-51": {
    wide: true,
    caption: r`One period $-\pi<\omega\le\pi$ of each magnitude. Both peak at $\omega=0$ (the samples are all positive) and dip at $\omega=\pm\pi$. The delay by one sample only adds the phase $-\omega$.`,
    node: (
      <Row>
        <Panel title="(a) 1/√(5/4 − cos ω)">
          <Graph x={[-3.5, 3.5]} y={[-0.1, 2.3]} xLabel="ω" items={[{ kind: "fn", f: (w) => 1 / Math.sqrt(1.25 - Math.cos(w)), n: 400 }]} xTicks={piTicks} yTicks={[2, [2 / 3, "⅔"]]} height={140} />
        </Panel>
        <Panel title="(b) (3/4)/(5/4 − cos ω)">
          <Graph x={[-3.5, 3.5]} y={[-0.1, 3.3]} xLabel="ω" items={[{ kind: "fn", f: (w) => 0.75 / (1.25 - Math.cos(w)), n: 400, tone: "second" }]} xTicks={piTicks} yTicks={[3, [1 / 3, "⅓"]]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-d-53": {
    caption: r`Part (b) on $-\pi<\omega\le\pi$: $4\pi\delta(\omega)$ from the constant 2, and impulses of area $\pi$ (with phases $\pm\frac\pi8$) at $\omega=\pm\frac\pi6$. The pattern repeats every $2\pi$.`,
    node: <Graph width={420} x={[-3.5, 3.5]} y={[-0.5, 14.5]} xLabel="ω" items={[{ kind: "impulses", pts: [[0, 4 * PI, "4π"], [-PI / 6, PI, "π"], [PI / 6, PI, "π"]] }]} xTicks={[[-PI, "−π"], [-PI / 6, "−π/6"], [PI / 6, "π/6"], [PI, "π"]]} />,
  },
  "bk-d-55": {
    caption: r`$x[n]=\frac{\sin\frac\pi4(n-\frac32)}{\pi(n-\frac32)}$. The underlying sinc (dashed) is centred at $n=\frac32$, half-way between samples, and its zeros fall at $\frac32\pm4,\frac32\pm8,\dots$, never on an integer. So no sample is exactly zero.`,
    node: <Graph width={460} x={[-12.5, 15.5]} y={[-0.09, 0.27]} xLabel="n" items={[{ kind: "fn", f: (t) => (Math.abs(t - 1.5) < 1e-6 ? 0.25 : sinc55(t)), tone: "muted", dashed: true, n: 900 }, { kind: "stems", pts: stems(-12, 15, sinc55) }]} xTicks={[-10, -5, 0, 5, 10, 15]} yTicks={[[0.25, "¼"]]} />,
  },
  "bk-d-41": {
    wide: true,
    caption: r`$x(n)=\{1,1,-1,0\}$ (left) and its DFT magnitudes $|X(k)|=1,\sqrt5,1,\sqrt5$ (right). Bins $k=1$ and $k=3$ are conjugates, as for any real sequence.`,
    node: (
      <Row>
        <Panel title="x(n)">
          <Graph x={[-0.7, 3.7]} y={[-1.4, 1.4]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 3, (n) => [1, 1, -1, 0][n]), values: true }]} xTicks={[0, 1, 2, 3]} height={140} />
        </Panel>
        <Panel title="|X(k)|">
          <Graph x={[-0.7, 3.7]} y={[-0.2, 2.6]} xLabel="k" items={[{ kind: "stems", pts: stems(0, 3, (k) => [1, Math.sqrt(5), 1, Math.sqrt(5)][k]), tone: "second" }]} xTicks={[0, 1, 2, 3]} yTicks={[1, [Math.sqrt(5), "√5"]]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-d-46": {
    caption: r`$|X(e^{j\Omega})|$ for $x=\{4,3,2,1\}$ over $0\le\Omega<2\pi$. The 4-point DFT samples it at 4 points (sage dots); padding to 6 points samples the **same** curve at 6 points (ochre). Padding adds no information, only finer sampling.`,
    node: <Graph width={460} x={[-0.2, 6.6]} y={[-0.5, 11]} xLabel="Ω" items={[{ kind: "fn", f: m4321, from: 0, to: 2 * PI, n: 500, tone: "muted" }, { kind: "dots", pts: [0, 1, 2, 3].map((k) => [(2 * PI * k) / 4, m4321((2 * PI * k) / 4)] as P) }, { kind: "dots", pts: [0, 1, 2, 3, 4, 5].map((k) => [(2 * PI * k) / 6, m4321((2 * PI * k) / 6)] as P), tone: "second", hollow: true }]} xTicks={[[PI / 2, "π/2"], [PI, "π"], [(3 * PI) / 2, "3π/2"], [2 * PI, "2π"]]} yTicks={[10, 5]} />,
  },
  "bk-d-414": {
    caption: r`Figure 4.46, redrawn: the sequence $4,-1,2,1$ repeating with period $N=4$ ($T_0=NT$), sampled at $f_s=100$ Hz.`,
    node: <Graph width={420} x={[-0.7, 7.7]} y={[-1.5, 4.6]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 7, (n) => [4, -1, 2, 1][n % 4]), values: true }]} xTicks={[0, 1, 2, 3, 4, 5, 6, 7]} />,
  },
  "bk-d-414-sol": {
    wide: true,
    caption: r`Two-sided spectra over $0$–$100$ Hz (bin spacing 25 Hz). Amplitude $A_k=\frac{|X(k)|}{N}$ (left) and phase (right). Bin 3 (75 Hz) mirrors bin 1 (25 Hz) about the folding frequency of 50 Hz, with the opposite phase.`,
    node: (
      <Row>
        <Panel title="Aₖ = |X(k)|/N">
          <Graph x={[-10, 90]} y={[-0.2, 1.8]} xLabel="f (Hz)" items={[{ kind: "stems", pts: [0, 25, 50, 75].map((f, k) => [f, [1.5, 0.7071, 1.5, 0.7071][k]] as P), values: true }]} xTicks={[0, 25, 50, 75]} height={150} />
        </Panel>
        <Panel title="φₖ (degrees)">
          <Graph x={[-10, 90]} y={[-60, 60]} xLabel="f (Hz)" items={[{ kind: "stems", pts: [0, 25, 50, 75].map((f, k) => [f, [0, 45, 0, -45][k]] as P), tone: "second", values: true }]} xTicks={[0, 25, 50, 75]} height={150} />
        </Panel>
      </Row>
    ),
  },
  "bk-d-438": {
    wide: true,
    caption: r`The Hann sequence $x(n)=\frac12\left(1-\cos\frac{2\pi n}{N}\right)$ for $N=8$ (left) is a constant plus one cosine, so its DFT (right) has only three non-zero bins: $\frac N2=4$ at $k=0$ and $-\frac N4=-2$ at $k=1$ and $k=N-1=7$.`,
    node: (
      <Row>
        <Panel title="x(n), N = 8">
          <Graph x={[-0.7, 7.7]} y={[-0.1, 1.2]} xLabel="n" items={[{ kind: "fn", f: (t) => hann(t, 8), from: 0, to: 7, tone: "muted", dashed: true }, { kind: "stems", pts: stems(0, 7, (n) => hann(n, 8)) }]} xTicks={[0, 2, 4, 6]} yTicks={[1, [0.5, "½"]]} height={150} />
        </Panel>
        <Panel title="X(k)">
          <Graph x={[-0.7, 7.7]} y={[-2.6, 4.6]} xLabel="k" items={[{ kind: "stems", pts: stems(0, 7, (k) => (k === 0 ? 4 : k === 1 || k === 7 ? -2 : 0)), tone: "second", values: true }]} xTicks={[0, 1, 4, 7]} height={150} />
        </Panel>
      </Row>
    ),
  },
}
