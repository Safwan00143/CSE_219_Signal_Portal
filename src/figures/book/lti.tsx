import { Blocks, Graph, Panel, Row, tri } from "../kit"
import type { FigureMap } from "../figure"
import { at, r, stems, type P } from "./util"

const x21 = at({ 0: 1, 1: 2, 3: -1 })
const h21 = at({ [-1]: 2, 1: 2 })
const y21 = at({ [-1]: 2, 0: 4, 1: 2, 2: 2, 4: -2 })
const dpanel = (title: string, f: (n: number) => number, a: number, b: number, y: [number, number], tone: "accent" | "second" = "accent", ticks?: number[]) => (
  <Panel title={title}>
    <Graph x={[a - 0.5, b + 0.5]} y={y} xLabel="n" items={[{ kind: "stems", pts: stems(a, b, f), tone, values: true }]} xTicks={ticks ?? [a, 0, b]} height={140} />
  </Panel>
)

const y24 = (n: number) => (n < 7 || n > 23 ? 0 : n <= 11 ? n - 6 : n <= 18 ? 6 : 24 - n)

const x131: P[] = [[-0.5, 0], [0, 0], [0, 1], [2, 1], [2, 0], [3, 0]]
const y1 = (t: number) => 2 * tri(t - 1)
const x28 = (t: number) => (t >= 0 && t <= 1 ? t + 1 : t > 1 && t <= 2 ? 2 - t : 0)
const trap = (a: number) => (t: number) => (t < 0 ? 0 : t < a ? t : t < 1 ? a : t < 1 + a ? 1 + a - t : 0)
const y211 = (t: number) => (t < 3 ? 0 : t <= 5 ? (1 - Math.exp(-3 * (t - 3))) / 3 : (Math.exp(-3 * (t - 5)) - Math.exp(-3 * (t - 3))) / 3)
const g211 = (t: number) => (t < 3 ? 0 : t < 5 ? Math.exp(-3 * (t - 3)) : Math.exp(-3 * (t - 3)) - Math.exp(-3 * (t - 5)))
const train = (T: number) => (t: number) => {
  let s = 0
  for (let k = -12; k <= 12; k++) s += tri(t - k * T)
  return s
}
const h24 = at({ 0: 1, 1: 5, 2: 10, 3: 11, 4: 8, 5: 4, 6: 1 })
const h1 = at({ 0: 1, 1: 3, 2: 3, 3: 2, 4: 1 })

export const bookLtiFigures: FigureMap = {
  "bk-l-21": {
    wide: true,
    caption: r`$x[n]$ and $h[n]$ (top), and $y_1=x*h$ (bottom). Each sample of $x$ places a copy of $h$, scaled by that sample, at its own position; the copies are then added.`,
    node: (
      <>
        <Row>
          {dpanel("x[n]", x21, -2, 5, [-1.5, 2.6])}
          {dpanel("h[n]", h21, -2, 5, [-0.4, 2.6], "second")}
        </Row>
        <Row cols={1}>{dpanel("y₁[n] = x[n] ∗ h[n]", y21, -3, 6, [-2.7, 4.8], "accent", [-3, -1, 0, 1, 2, 4, 6])}</Row>
      </>
    ),
  },
  "bk-l-23": {
    wide: true,
    caption: r`$y[n]=2\left[1-\left(\tfrac12\right)^{n+1}\right]u[n]$. It starts at 1 and climbs towards 2, the total area of $x[n]$, as the step $h$ collects more and more of $x$.`,
    node: (
      <Row>
        <Panel title="x[n] = (½)ⁿ⁻² u[n − 2]">
          <Graph x={[-3.5, 10.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 10, (n) => (n >= 2 ? 0.5 ** (n - 2) : 0)) }]} xTicks={[0, 2, 5, 10]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="y[n] = x[n] ∗ u[n + 2]">
          <Graph x={[-3.5, 10.5]} y={[-0.2, 2.3]} xLabel="n" items={[{ kind: "hline", y: 2, tone: "muted", dashed: true }, { kind: "stems", pts: stems(-3, 10, (n) => (n >= 0 ? 2 * (1 - 0.5 ** (n + 1)) : 0)), tone: "second" }]} xTicks={[0, 5, 10]} yTicks={[1, 2]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-l-24": {
    caption: r`$y[n]$ for Problem 2.4. A 6-sample pulse sliding past a 12-sample pulse: the overlap grows by one each step (ramp up), stays at 6 while the short pulse sits inside the long one, then shrinks.`,
    node: <Graph width={440} x={[4.5, 25.5]} y={[-0.4, 7]} xLabel="n" items={[{ kind: "stems", pts: stems(5, 25, y24), values: true }]} xTicks={[7, 12, 18, 23]} />,
  },
  "bk-l-131": {
    wide: true,
    caption: r`Figure P1.31, redrawn. The known pair $x_1\to y_1$ (top). The new inputs $x_2$ and $x_3$ (bottom) are built from shifted copies of $x_1$.`,
    node: (
      <>
        <Row>
          <Panel title="x₁(t)">
            <Graph x={[-1.5, 4.5]} y={[-1.4, 2.4]} items={[{ kind: "path", pts: x131 }]} xTicks={[1, 2]} yTicks={[1]} height={130} />
          </Panel>
          <Panel title="y₁(t)">
            <Graph x={[-1.5, 4.5]} y={[-1.4, 2.4]} items={[{ kind: "fn", f: y1 }]} xTicks={[1, 2]} yTicks={[1, 2]} height={130} />
          </Panel>
        </Row>
        <Row>
          <Panel title="x₂(t)">
            <Graph x={[-1.5, 4.5]} y={[-1.4, 2.4]} items={[{ kind: "path", pts: [[-0.5, 0], [0, 0], [0, 1], [2, 1], [2, -1], [4, -1], [4, 0], [4.5, 0]] }]} xTicks={[1, 2, 3, 4]} yTicks={[1, -1]} height={130} />
          </Panel>
          <Panel title="x₃(t)">
            <Graph x={[-1.5, 4.5]} y={[-1.4, 2.4]} items={[{ kind: "path", pts: [[-1.5, 0], [-1, 0], [-1, 1], [0, 1], [0, 2], [1, 2], [1, 1], [2, 1], [2, 0], [4.5, 0]] }]} xTicks={[-1, 1, 2]} yTicks={[1, 2]} height={130} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-l-131-sol": {
    wide: true,
    caption: r`Left: $y_2(t)=y_1(t)-y_1(t-2)$, a positive triangle followed by a negative one. Right: $y_3(t)=y_1(t)+y_1(t+1)$; the two overlapping triangles add to a trapezoid with a flat top of height 2 on $0\le t\le1$.`,
    node: (
      <Row>
        <Panel title="y₂(t)">
          <Graph x={[-1.5, 4.5]} y={[-2.4, 2.4]} items={[{ kind: "fn", f: (t) => y1(t) - y1(t - 2), tone: "second" }]} xTicks={[1, 2, 3, 4]} yTicks={[2, -2]} height={140} />
        </Panel>
        <Panel title="y₃(t)">
          <Graph x={[-1.5, 4.5]} y={[-0.4, 2.6]} items={[{ kind: "fn", f: (t) => y1(t + 1), tone: "muted", dashed: true }, { kind: "fn", f: y1, tone: "muted", dashed: true }, { kind: "fn", f: (t) => y1(t) + y1(t + 1), tone: "second" }]} xTicks={[-1, 1, 2]} yTicks={[2]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-l-28": {
    wide: true,
    caption: r`Left: $x(t)$, which jumps to 1 at $t=0$, rises to 2, drops to 1 at $t=1$ and falls to 0 at $t=2$. Right: $y(t)=x(t+2)+2x(t+1)$, a copy shifted left by 2 plus a double-height copy shifted left by 1 (dashed).`,
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-3, 3]} y={[-0.3, 4.4]} items={[{ kind: "path", pts: [[-3, 0], [0, 0], [0, 1], [1, 2], [1, 1], [2, 0], [3, 0]] }]} xTicks={[1, 2]} yTicks={[1, 2]} height={150} />
        </Panel>
        <Panel title="y(t) = x(t + 2) + 2x(t + 1)">
          <Graph x={[-3, 3]} y={[-0.3, 4.4]} items={[{ kind: "fn", f: (t) => x28(t + 2), tone: "muted", dashed: true, n: 900 }, { kind: "fn", f: (t) => 2 * x28(t + 1), tone: "muted", dashed: true, n: 900 }, { kind: "path", pts: [[-3, 0], [-2, 0], [-2, 1], [-1, 2], [-1, 3], [0, 4], [0, 2], [1, 0], [3, 0]], tone: "second" }]} xTicks={[-2, -1, 1]} yTicks={[1, 2, 3, 4]} height={150} />
        </Panel>
      </Row>
    ),
  },
  "bk-l-210": {
    caption: r`$y(t)$ for $\alpha=0.4$. It ramps up while the short pulse enters, is flat at height $\alpha$ while it lies fully inside, and ramps down as it leaves. The slope changes at $t=0,\ \alpha,\ 1,\ 1+\alpha$.`,
    node: <Graph x={[-0.5, 2]} y={[-0.1, 0.6]} items={[{ kind: "fn", f: trap(0.4), n: 800, area: true }]} xTicks={[[0.4, "α"], 1, [1.4, "1+α"]]} yTicks={[[0.4, "α"]]} />,
  },
  "bk-l-211": {
    wide: true,
    caption: r`Left: $y(t)$ charges up towards $\tfrac13$ while the pulse is on ($3<t<5$) and decays after it ends. Right: $g(t)=\frac{dx}{dt}*h$ is exactly the slope of $y(t)$; it jumps at $t=3$ and $t=5$, where $y$ has corners.`,
    node: (
      <Row>
        <Panel title="y(t) = x(t) ∗ h(t)">
          <Graph x={[2, 8]} y={[-0.05, 0.4]} items={[{ kind: "fn", f: y211, n: 600 }]} xTicks={[3, 5, 7]} yTicks={[[1 / 3, "⅓"]]} height={150} />
        </Panel>
        <Panel title="g(t) = (dx/dt) ∗ h(t) = dy/dt">
          <Graph x={[2, 8]} y={[-1.1, 1.1]} items={[{ kind: "fn", f: g211, n: 1200, tone: "second" }]} xTicks={[3, 5, 7]} yTicks={[1, -1]} height={150} />
        </Panel>
      </Row>
    ),
  },
  "bk-l-223": {
    wide: true,
    caption: r`Figure P2.23, redrawn: the triangle $h(t)$ of width 2 and height 1, and the impulse train $x(t)$ with spacing $T$.`,
    node: (
      <Row>
        <Panel title="h(t)">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: tri }]} xTicks={[-1, 1]} yTicks={[1]} height={130} />
        </Panel>
        <Panel title="x(t) = Σ δ(t − kT)">
          <Graph x={[-3.5, 4.5]} y={[-0.2, 1.4]} items={[{ kind: "impulses", pts: [-3, -2, -1, 0, 1, 2, 3, 4].map((k) => [k, 1] as P) }]} xTicks={[[-2, "−2T"], [-1, "−T"], [1, "T"], [2, "2T"], [3, "3T"]]} height={130} />
        </Panel>
      </Row>
    ),
  },
  "bk-l-223-sol": {
    wide: true,
    caption: r`$y(t)=\sum_k h(t-kT)$ for the four spacings. When $T\ge2$ the triangles do not overlap; at $T=2$ they just touch; at $T=\tfrac32$ neighbouring tails overlap and add to a flat $\tfrac12$; at $T=1$ the sum is exactly constant, $y(t)=1$.`,
    node: (
      <>
        <Row>
          <Panel title="(a) T = 4">
            <Graph x={[-5, 7]} y={[-0.2, 1.4]} items={[{ kind: "fn", f: train(4), n: 800 }]} xTicks={[-4, 0, 4]} yTicks={[1]} height={130} />
          </Panel>
          <Panel title="(b) T = 2">
            <Graph x={[-5, 7]} y={[-0.2, 1.4]} items={[{ kind: "fn", f: train(2), n: 800 }]} xTicks={[-4, -2, 0, 2, 4, 6]} yTicks={[1]} height={130} />
          </Panel>
        </Row>
        <Row>
          <Panel title="(c) T = 3/2">
            <Graph x={[-4, 5]} y={[-0.2, 1.4]} items={[{ kind: "fn", f: train(1.5), n: 900 }]} xTicks={[[-1.5, "−3/2"], [1.5, "3/2"], 3]} yTicks={[[0.5, "½"], 1]} height={130} />
          </Panel>
          <Panel title="(d) T = 1">
            <Graph x={[-4, 5]} y={[-0.2, 1.4]} items={[{ kind: "fn", f: (t) => tri(t), tone: "muted", dashed: true }, { kind: "fn", f: (t) => tri(t - 1), tone: "muted", dashed: true }, { kind: "fn", f: train(1), n: 900 }]} xTicks={[-2, 0, 2, 4]} yTicks={[1]} height={130} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-l-224": {
    wide: true,
    caption: r`Figure P2.24, redrawn. Three causal LTI systems in cascade, with $h_2[n]=u[n]-u[n-2]$ used twice, and the overall impulse response $h[n]$: $1,5,10,11,8,4,1$ for $n=0,\dots,6$.`,
    node: (
      <>
        <Blocks
          width={460}
          height={70}
          nodes={[
            { id: "in", x: 30, y: 35, shape: "text", label: "x[n]" },
            { id: "a", x: 130, y: 35, label: "h₁[n]", w: 70, h: 40 },
            { id: "b", x: 240, y: 35, label: "h₂[n]", w: 70, h: 40 },
            { id: "c", x: 350, y: 35, label: "h₂[n]", w: 70, h: 40 },
            { id: "out", x: 435, y: 35, shape: "text", label: "y[n]" },
          ]}
          wires={[
            { pts: [[52, 35], [95, 35]] },
            { pts: [[165, 35], [205, 35]] },
            { pts: [[275, 35], [315, 35]] },
            { pts: [[385, 35], [415, 35]] },
          ]}
        />
        <Graph width={360} x={[-2.5, 8.5]} y={[-0.5, 12.5]} xLabel="n" items={[{ kind: "stems", pts: stems(-2, 8, h24), values: true }]} xTicks={[0, 2, 4, 6]} />
      </>
    ),
  },
  "bk-l-224-sol": {
    wide: true,
    caption: r`Left: the recovered $h_1[n]=\{1,3,3,2,1\}$ for $n=0..4$. Right: the response to $\delta[n]-\delta[n-1]$, which is the first difference $h[n]-h[n-1]$: positive while $h$ rises, negative while it falls.`,
    node: (
      <Row>
        {dpanel("h₁[n]", h1, -1, 6, [-0.4, 3.6])}
        {dpanel("y[n] = h[n] − h[n − 1]", (n) => h24(n) - h24(n - 1), -1, 8, [-4.8, 5.8], "second", [0, 2, 4, 6, 8])}
      </Row>
    ),
  },
  "bk-l-tan316": {
    wide: true,
    caption: r`Impulse responses for Tan 3.16. (a) Two taps: $0.5$ and $-0.5$. (b) The feedback $0.75y(n-1)$ gives a decaying geometric tail. (c) The feedback $-0.8$ makes the tail alternate in sign, and the delayed input makes it start at $n=1$.`,
    node: (
      <Row cols={3}>
        {dpanel("(a)", at({ 0: 0.5, 2: -0.5 }), -1, 6, [-0.7, 0.7], "accent", [0, 2, 4])}
        {dpanel("(b) 0.75ⁿ u(n)", (n) => (n >= 0 ? 0.75 ** n : 0), -1, 8, [-0.2, 1.2], "accent", [0, 4, 8])}
        {dpanel("(c) (−0.8)ⁿ⁻¹ u(n − 1)", (n) => (n >= 1 ? (-0.8) ** (n - 1) : 0), -1, 8, [-0.9, 1.2], "accent", [0, 1, 4, 8])}
      </Row>
    ),
  },
}
