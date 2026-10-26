import { Blocks, Graph, Panel, PI, Row } from "../kit"
import type { FigureMap } from "../figure"
import { r, stems } from "./util"

const dp = (title: string, f: (n: number) => number, a: number, b: number, y: [number, number], ticks: number[]) => (
  <Panel title={title}>
    <Graph x={[a - 0.5, b + 0.5]} y={y} xLabel="n" items={[{ kind: "stems", pts: stems(a, b, f) }]} xTicks={ticks} height={130} />
  </Panel>
)
const cp = (title: string, f: (t: number) => number, x: [number, number], y: [number, number], ticks: number[]) => (
  <Panel title={title}>
    <Graph x={x} y={y} items={[{ kind: "fn", f, n: 900 }]} xTicks={ticks} height={130} />
  </Panel>
)
const u = (b: boolean) => (b ? 1 : 0)

export const bookCausalityFigures: FigureMap = {
  "bk-c-117": {
    caption: r`$y(t)=x(\sin t)$ reads the input at time $\sin t$ (sage), compared with the line "now" $=t$ (dashed). For $t<0$ the curve lies above the line, so the system reads values of $x$ from the future: at $t=-\pi$ it needs $x(0)$.`,
    node: <Graph x={[-4, 4]} y={[-4, 4]} yLabel="time read" items={[{ kind: "fn", f: (t) => t, tone: "muted", dashed: true }, { kind: "fn", f: Math.sin, n: 400 }, { kind: "dots", pts: [[-PI, 0]], tone: "second" }, { kind: "text", at: [-PI, 0], text: "t = −π reads x(0)", dy: -10, tone: "second" }]} xTicks={[[-PI, "−π"], [PI, "π"]]} yTicks={[1, -1]} />,
  },
  "bk-c-118": {
    caption: r`$y[n]$ adds the $2n_0+1$ input samples in a window centred on $n$ (here $n_0=2$). Each sample is at most $B$ in size, so $|y[n]|\le(2n_0+1)B$. The window reaches $n_0$ samples into the future, so the system is not causal.`,
    node: <Graph width={420} x={[-1.5, 12.5]} y={[-1.4, 1.6]} xLabel="k" items={[{ kind: "band", from: 3.5, to: 8.5, label: "k = n − n₀ … n + n₀" }, { kind: "vline", x: 6, dashed: true, label: "n" }, { kind: "stems", pts: stems(-1, 12, (k) => Math.sin(0.9 * k) * 0.9 + 0.2 * Math.cos(2.3 * k)) }]} xTicks={[[4, "n−2"], [8, "n+2"]]} />,
  },
  "bk-c-tan328": {
    wide: true,
    caption: r`The four impulse responses $h(k)=a^k u(k)$. When $|a|<1$ the samples shrink and $\sum|h(k)|$ converges (stable); when $|a|>1$ they grow without bound (unstable). The sign of $a$ only makes the samples alternate.`,
    node: (
      <>
        <Row>
          {dp("0.75ᵏ: stable", (k) => (k >= 0 ? 0.75 ** k : 0), -1, 10, [-0.2, 1.2], [0, 5, 10])}
          {dp("2ᵏ: unstable", (k) => (k >= 0 ? 2 ** k : 0), -1, 6, [-3, 70], [0, 3, 6])}
        </Row>
        <Row>
          {dp("(−1.5)ᵏ: unstable", (k) => (k >= 0 ? (-1.5) ** k : 0), -1, 8, [-20, 28], [0, 4, 8])}
          {dp("(−0.5)ᵏ: stable", (k) => (k >= 0 ? (-0.5) ** k : 0), -1, 10, [-0.7, 1.2], [0, 5, 10])}
        </Row>
      </>
    ),
  },
  "bk-c-213": {
    caption: r`$S_1$ followed by its inverse $S_2$: the impulse response of the cascade is $h*g=\delta[n]$, so the output equals the input.`,
    node: (
      <Blocks
        width={460}
        height={70}
        nodes={[
          { id: "in", x: 28, y: 35, shape: "text", label: "x[n]" },
          { id: "a", x: 150, y: 35, label: "h = (1/5)ⁿu[n]", w: 130, h: 40 },
          { id: "b", x: 320, y: 35, label: "g = δ[n] − ⅕δ[n−1]", w: 140, h: 40 },
          { id: "out", x: 440, y: 35, shape: "text", label: "x[n]" },
        ]}
        wires={[
          { pts: [[50, 35], [85, 35]] },
          { pts: [[215, 35], [250, 35]] },
          { pts: [[390, 35], [420, 35]] },
        ]}
      />
    ),
  },
  "bk-c-228": {
    wide: true,
    caption: r`Four of the impulse responses. (b) starts at $n=-2$, so it is not causal, but it decays, so it is stable. (c) lives on $n\le0$ and **grows** towards the left, so it is unstable. (d) also lives in the past but shrinks towards the left, so it is stable. (f) has a left-sided tail $(1.01)^n$ that dies out as $n\to-\infty$, so it is stable, but it is not causal.`,
    node: (
      <>
        <Row>
          {dp("(b) (0.8)ⁿ u[n + 2]", (n) => 0.8 ** n * u(n >= -2), -5, 8, [-0.2, 1.7], [-2, 0, 4, 8])}
          {dp("(c) (½)ⁿ u[−n]", (n) => 0.5 ** n * u(n <= 0), -6, 4, [-3, 70], [-6, -3, 0, 3])}
        </Row>
        <Row>
          {dp("(d) 5ⁿ u[3 − n]", (n) => 5 ** n * u(n <= 3), -4, 6, [-6, 135], [-3, 0, 3, 6])}
          {dp("(f) (−½)ⁿu[n] + (1.01)ⁿu[1 − n]", (n) => (-0.5) ** n * u(n >= 0) + 1.01 ** n * u(n <= 1), -8, 6, [-0.7, 2.3], [-6, -3, 0, 3, 6])}
        </Row>
      </>
    ),
  },
  "bk-c-229": {
    wide: true,
    caption: r`Four of the continuous-time impulse responses. (b) $e^{-6t}u(3-t)$ blows up as $t\to-\infty$. (d) $e^{2t}u(-1-t)$ lives only in the past but decays there. (e) $e^{-6|t|}$ is two-sided, so not causal, but its area is only $\tfrac13$. (g) is eventually dominated by the slowly growing $e^{(t-100)/100}$, so it is unstable.`,
    node: (
      <>
        <Row>
          {cp("(b) e^(−6t) u(3 − t)", (t) => Math.exp(-6 * t) * u(t <= 3), [-1, 4], [-0.5, 8], [0, 3])}
          {cp("(d) e^(2t) u(−1 − t)", (t) => Math.exp(2 * t) * u(t <= -1), [-4, 2], [-0.02, 0.18], [-3, -1, 1])}
        </Row>
        <Row>
          {cp("(e) e^(−6|t|)", (t) => Math.exp(-6 * Math.abs(t)), [-1.2, 1.2], [-0.1, 1.2], [-1, 1])}
          {cp("(g) (2e^(−t) − e^((t−100)/100)) u(t)", (t) => (t >= 0 ? 2 * Math.exp(-t) - Math.exp((t - 100) / 100) : 0), [-20, 260], [-12, 2.2], [0, 100, 200])}
        </Row>
      </>
    ),
  },
  "bk-c-230": {
    caption: r`$h[n]=(-2)^nu[n]$ for $y[n]+2y[n-1]=x[n]$. Each sample is $-2$ times the previous one, so the response doubles in size every step: unstable.`,
    node: <Graph x={[-1.5, 7.5]} y={[-70, 70]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 6, (n) => (n >= 0 ? (-2) ** n : 0)), values: true }]} xTicks={[0, 2, 4, 6]} />,
  },
}
