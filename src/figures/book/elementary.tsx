import { Graph, Panel, PI, Row } from "../kit"
import type { FigureMap } from "../figure"
import { at, r, stems } from "./util"

const sq114 = (t: number) => {
  const m = ((t % 2) + 2) % 2
  return m <= 1 ? 1 : -2
}
const tan36a = at({ 0: 3, 1: 1, 2: 2, 3: 1, 5: 1 })
const tan36b = at({ 1: 1, 2: -1, 4: 1, 5: -1 })
const tan35a = at({ [-2]: 3, 0: -0.5, 1: 5, 5: -4 })
const tan35b = at({ [-1]: 1, 1: -2, 4: 5 })
const eight = (title: string, f: (n: number) => number, y: [number, number], yTicks: number[]) => (
  <Panel title={title}>
    <Graph x={[-1.5, 8]} y={y} xLabel="n" items={[{ kind: "stems", pts: stems(0, 7, f) }]} xTicks={[0, 2, 4, 6]} yTicks={yTicks} height={140} />
  </Panel>
)

export const bookElementaryFigures: FigureMap = {
  "bk-e-18c": {
    caption: r`Part (c): $e^{-t}\sin(3t+\pi)=e^{-t}\cos(3t+\tfrac\pi2)$, a cosine at $\omega=3$ inside the decaying envelope $\pm e^{-t}$ (dashed).`,
    node: <Graph x={[-0.3, 4]} y={[-1.1, 1.1]} items={[{ kind: "fn", f: (t) => Math.exp(-t), from: 0, tone: "muted", dashed: true }, { kind: "fn", f: (t) => -Math.exp(-t), from: 0, tone: "muted", dashed: true }, { kind: "fn", f: (t) => Math.exp(-t) * Math.cos(3 * t + PI / 2), from: 0, n: 400 }]} xTicks={[1, 2, 3]} yTicks={[1, -1]} />,
  },
  "bk-e-112": {
    caption: r`$x[n]=1-\sum_{k\ge3}\delta[n-1-k]$ removes every sample from $n=4$ on. What is left is a step that has been reversed: $u[3-n]$.`,
    node: <Graph x={[-5.5, 8.5]} y={[-0.2, 1.4]} xLabel="n" items={[{ kind: "stems", pts: stems(-5, 8, (n) => (n <= 3 ? 1 : 0)) }, { kind: "text", at: [-5.3, 1.25], text: "…", anchor: "start" }]} xTicks={[0, 3, 4]} yTicks={[1]} />,
  },
  "bk-e-113": {
    wide: true,
    caption: r`Integrating $x(t)$ from $-\infty$: the running area jumps up by 1 at $t=-2$ and back down by 1 at $t=2$. The result $y(t)$ is a unit pulse of width 4, so its energy is $\int_{-2}^{2}1^2dt=4$.`,
    node: (
      <Row>
        <Panel title="x(t) = δ(t + 2) − δ(t − 2)">
          <Graph x={[-4, 4]} y={[-1.4, 1.4]} items={[{ kind: "impulses", pts: [[-2, 1], [2, -1]] }]} xTicks={[-2, 2]} height={140} />
        </Panel>
        <Panel title="y(t) = ∫ x(τ) dτ">
          <Graph x={[-4, 4]} y={[-0.4, 1.4]} items={[{ kind: "path", pts: [[-4, 0], [-2, 0], [-2, 1], [2, 1], [2, 0], [4, 0]], area: true }]} xTicks={[-2, 2]} yTicks={[1]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-e-114": {
    caption: r`$x(t)$ with period 2: value 1 on $0\le t\le1$ and $-2$ on $1<t<2$.`,
    node: <Graph x={[-2.3, 4.3]} y={[-2.6, 1.6]} items={[{ kind: "path", pts: [[-2, 1], [-1, 1], [-1, -2], [0, -2], [0, 1], [1, 1], [1, -2], [2, -2], [2, 1], [3, 1], [3, -2], [4, -2]] }]} xTicks={[-1, 1, 2, 3]} yTicks={[1, -2]} />,
  },
  "bk-e-114-sol": {
    wide: true,
    caption: r`Every jump of size $J$ becomes an impulse of area $J$. The jumps up by 3 at even $t$ give $3g(t)$; the jumps down by 3 at odd $t$ give $-3g(t-1)$.`,
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-2.3, 4.3]} y={[-2.6, 1.6]} items={[{ kind: "fn", f: sq114, from: -2, to: 4, n: 1200 }]} xTicks={[-1, 1, 2, 3]} yTicks={[1, -2]} height={140} />
        </Panel>
        <Panel title="dx/dt = 3g(t) − 3g(t − 1)">
          <Graph x={[-2.3, 4.3]} y={[-3.8, 3.8]} items={[{ kind: "impulses", pts: [[-2, 3], [0, 3], [2, 3], [4, 3], [-1, -3], [1, -3], [3, -3]] }]} xTicks={[-1, 1, 2, 3]} yTicks={[3, -3]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-e-126c": {
    caption: r`$x[n]=\cos\left(\frac{\pi}{8}n^2\right)$. Although $n^2$ grows, the samples repeat every 8: compare $n=0..7$ with $n=8..15$ and $16..23$.`,
    node: <Graph width={460} x={[-0.8, 24.8]} y={[-1.3, 1.3]} xLabel="n" items={[{ kind: "vline", x: 7.5, tone: "muted", dashed: true }, { kind: "vline", x: 15.5, tone: "muted", dashed: true }, { kind: "stems", pts: stems(0, 24, (n) => Math.cos((PI / 8) * n * n)) }]} xTicks={[0, 8, 16, 24]} yTicks={[1, -1]} />,
  },
  "bk-e-tan32": {
    wide: true,
    caption: r`The first eight samples of each sequence. Each panel is the analog shape evaluated at whole numbers $n$: an exponential decay, a sine with 10 samples per cycle, a cosine with 20 samples per cycle starting at $30^\circ$, and a damped sine.`,
    node: (
      <>
        <Row>
          {eight("(a) 0.5ⁿ u(n)", (n) => 0.5 ** n, [-0.15, 1.2], [1, 0.5])}
          {eight("(b) 5 sin(0.2πn) u(n)", (n) => 5 * Math.sin(0.2 * PI * n), [-5.6, 5.6], [5, -5])}
        </Row>
        <Row>
          {eight("(c) 5 cos(0.1πn + 30°) u(n)", (n) => 5 * Math.cos(0.1 * PI * n + PI / 6), [-5.6, 5.6], [5, -5])}
          {eight("(d) 5(0.75)ⁿ sin(0.1πn) u(n)", (n) => 5 * 0.75 ** n * Math.sin(0.1 * PI * n), [-0.3, 2.1], [1, 2])}
        </Row>
      </>
    ),
  },
  "bk-e-tan35": {
    wide: true,
    caption: r`Each term $c\,\delta(n-n_0)$ is one stem of height $c$ at $n=n_0$.`,
    node: (
      <Row>
        <Panel title="(a)">
          <Graph x={[-3.5, 6.5]} y={[-4.8, 5.8]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 6, tan35a), values: true }]} xTicks={[-2, 0, 1, 5]} height={160} />
        </Panel>
        <Panel title="(b)">
          <Graph x={[-3.5, 6.5]} y={[-2.8, 5.8]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 6, tan35b), values: true }]} xTicks={[-1, 1, 4]} height={160} />
        </Panel>
      </Row>
    ),
  },
  "bk-e-tan36": {
    wide: true,
    caption: r`Figures 3.24 (left) and 3.25 (right), redrawn.`,
    node: (
      <Row>
        <Panel title="Fig. 3.24">
          <Graph x={[-1.5, 6]} y={[-0.3, 3.6]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 5, tan36a), values: true }]} xTicks={[0, 1, 2, 3, 4, 5]} height={150} />
        </Panel>
        <Panel title="Fig. 3.25">
          <Graph x={[-1.5, 6]} y={[-1.4, 1.4]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 5, tan36b), values: true }]} xTicks={[0, 1, 2, 3, 4, 5]} height={150} />
        </Panel>
      </Row>
    ),
  },
}
