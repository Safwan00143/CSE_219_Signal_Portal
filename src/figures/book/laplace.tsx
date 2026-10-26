import { Blocks, Graph, Panel, Plane, Row } from "../kit"
import type { FigureMap } from "../figure"
import { r, type P } from "./util"

const sq3 = Math.sqrt(3) / 2
const quad: P[] = [[-2, 2], [-2, -2], [2, 2], [2, -2]]
const left: P[] = [[-2, 2], [-2, -2]]
const right: P[] = [[2, 2], [2, -2]]
const mag = (num: (w: number) => [number, number], den: (w: number) => [number, number]) => (w: number) => {
  const [a, b] = num(w)
  const [c, d] = den(w)
  return Math.hypot(a, b) / Math.hypot(c, d)
}

export const bookLaplaceFigures: FigureMap = {
  "bk-lp-92": {
    wide: true,
    caption: r`Both transforms have the same algebraic form, $\frac{e^{-(s+5)}}{s+5}$, with a single pole at $s=-5$. The right-sided $x(t)$ has ROC $\mathrm{Re}\{s\}>-5$ (left); the left-sided $g(t)$ has ROC $\mathrm{Re}\{s\}<-5$ (right).`,
    node: (
      <Row>
        <Panel title="x(t) = e^(−5t) u(t − 1)">
          <Plane kind="s" range={7} poles={[[-5, 0]]} roc={{ left: -5 }} ticks={[-5]} size={200} />
        </Panel>
        <Panel title="g(t) = −e^(−5t) u(−t + 1)">
          <Plane kind="s" range={7} poles={[[-5, 0]]} roc={{ right: -5 }} ticks={[-5]} size={200} />
        </Panel>
      </Row>
    ),
  },
  "bk-lp-94": {
    caption: r`$X(s)=\frac{-2}{(s-1)^2+4}$: poles at $s=1\pm2j$. The signal lives on $t\le0$, so its ROC lies to the **left** of the poles: $\mathrm{Re}\{s\}<1$. It includes the $j\omega$-axis, so the Fourier transform exists.`,
    node: <Plane kind="s" range={3} poles={[[1, 2], [1, -2]]} roc={{ right: 1 }} ticks={[1, 2]} />,
  },
  "bk-lp-97": {
    wide: true,
    caption: r`The poles have three different real parts, $-3$, $-2$ and $-\frac12$, which split the plane into four vertical strips. Each strip is a valid ROC and gives a different signal. (The zero at $s=1$ plays no role.)`,
    node: (
      <>
        <Row>
          <Panel title="Re{s} < −3: left-sided">
            <Plane kind="s" range={4} poles={[[-2, 0], [-3, 0], [-0.5, sq3], [-0.5, -sq3]]} zeros={[[1, 0]]} roc={{ right: -3 }} size={170} />
          </Panel>
          <Panel title="−3 < Re{s} < −2">
            <Plane kind="s" range={4} poles={[[-2, 0], [-3, 0], [-0.5, sq3], [-0.5, -sq3]]} zeros={[[1, 0]]} roc={{ left: -3, right: -2 }} size={170} />
          </Panel>
        </Row>
        <Row>
          <Panel title="−2 < Re{s} < −½">
            <Plane kind="s" range={4} poles={[[-2, 0], [-3, 0], [-0.5, sq3], [-0.5, -sq3]]} zeros={[[1, 0]]} roc={{ left: -2, right: -0.5 }} size={170} />
          </Panel>
          <Panel title="Re{s} > −½: right-sided">
            <Plane kind="s" range={4} poles={[[-2, 0], [-3, 0], [-0.5, sq3], [-0.5, -sq3]]} zeros={[[1, 0]]} roc={{ left: -0.5 }} size={170} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-lp-910": {
    wide: true,
    caption: r`Pole–zero plots (top) and $|H(j\omega)|$ (bottom). (a) Poles only: the vectors to the poles lengthen as $|\omega|$ grows, giving low-pass. (b) A zero at the origin kills DC, and the poles near $\pm j\frac{\sqrt3}2$ lift the middle: band-pass. (c) A double zero at the origin and a double pole at $-1$: high-pass.`,
    node: (
      <>
        <Row cols={3}>
          <Panel title="(a)">
            <Plane kind="s" range={3.5} poles={[[-1, 0], [-3, 0]]} roc={{ left: -1 }} size={150} />
          </Panel>
          <Panel title="(b)">
            <Plane kind="s" range={2} poles={[[-0.5, sq3], [-0.5, -sq3]]} zeros={[[0, 0]]} roc={{ left: -0.5 }} size={150} />
          </Panel>
          <Panel title="(c)">
            <Plane kind="s" range={2} poles={[[-1, 0]]} zeros={[[0, 0]]} poleOrder={[{ at: [-1, 0], text: "(2)" }]} roc={{ left: -1 }} size={150} />
          </Panel>
        </Row>
        <Row cols={3}>
          <Panel title="|H₁(jω)|">
            <Graph x={[-6, 6]} y={[-0.05, 0.4]} xLabel="ω" items={[{ kind: "fn", f: mag(() => [1, 0], (w) => [3 - w * w, 4 * w]), n: 400 }]} xTicks={[-4, 4]} yTicks={[[1 / 3, "⅓"]]} height={120} />
          </Panel>
          <Panel title="|H₂(jω)|">
            <Graph x={[-6, 6]} y={[-0.05, 1.2]} xLabel="ω" items={[{ kind: "fn", f: mag((w) => [0, w], (w) => [1 - w * w, w]), n: 500, tone: "second" }]} xTicks={[-1, 1]} yTicks={[1]} height={120} />
          </Panel>
          <Panel title="|H₃(jω)|">
            <Graph x={[-6, 6]} y={[-0.05, 1.2]} xLabel="ω" items={[{ kind: "fn", f: mag((w) => [-w * w, 0], (w) => [1 - w * w, 2 * w]), n: 400 }]} xTicks={[-4, 4]} yTicks={[1]} height={120} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-lp-917": {
    caption: r`Figure P9.17, redrawn. Each branch is an integrator ($\frac2s$ or $\frac1s$) with negative feedback ($-4$ or $-2$) around it. The two branch outputs are added to form $y(t)$.`,
    node: (
      <Blocks
        width={480}
        height={190}
        nodes={[
          { id: "x", x: 30, y: 30, shape: "text", label: "x(t)" },
          { id: "s1", x: 130, y: 30, shape: "sum" },
          { id: "i1", x: 230, y: 30, label: "2/s", w: 56, h: 34 },
          { id: "f1", x: 230, y: 78, label: "−4", w: 56, h: 30 },
          { id: "s2", x: 130, y: 128, shape: "sum" },
          { id: "i2", x: 230, y: 128, label: "1/s", w: 56, h: 34 },
          { id: "f2", x: 230, y: 172, label: "−2", w: 56, h: 30 },
          { id: "s3", x: 360, y: 30, shape: "sum" },
          { id: "y", x: 445, y: 30, shape: "text", label: "y(t)" },
        ]}
        wires={[
          { pts: [[52, 30], [119, 30]] },
          { pts: [[80, 30], [80, 128], [119, 128]] },
          { pts: [[141, 30], [202, 30]] },
          { pts: [[258, 30], [349, 30]] },
          { pts: [[300, 30], [300, 78], [258, 78]] },
          { pts: [[202, 78], [130, 78], [130, 41]] },
          { pts: [[141, 128], [202, 128]] },
          { pts: [[258, 128], [360, 128], [360, 41]] },
          { pts: [[320, 128], [320, 172], [258, 172]] },
          { pts: [[202, 172], [130, 172], [130, 139]] },
          { pts: [[371, 30], [425, 30]] },
        ]}
      />
    ),
  },
  "bk-lp-923": {
    wide: true,
    caption: r`Figure P9.23, redrawn. Plot 1: four poles at $\pm2\pm2j$. Plot 2: poles at $-2\pm2j$, zeros at $2\pm2j$. Plot 3: zeros at $-2\pm2j$, poles at $2\pm2j$. Plot 4: four zeros and no poles.`,
    node: (
      <>
        <Row>
          <Panel title="plot 1">
            <Plane kind="s" range={3} poles={quad} ticks={[-2, 2]} size={170} />
          </Panel>
          <Panel title="plot 2">
            <Plane kind="s" range={3} poles={left} zeros={right} ticks={[-2, 2]} size={170} />
          </Panel>
        </Row>
        <Row>
          <Panel title="plot 3">
            <Plane kind="s" range={3} poles={right} zeros={left} ticks={[-2, 2]} size={170} />
          </Panel>
          <Panel title="plot 4">
            <Plane kind="s" range={3} zeros={quad} ticks={[-2, 2]} size={170} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-lp-922d": {
    caption: r`Part (d): poles at $-4$ and $-3$ with the ROC strip $-4<\mathrm{Re}\{s\}<-3$. The pole on the **left** of the strip gives a right-sided term, and the pole on the **right** gives a left-sided term.`,
    node: <Plane kind="s" range={5} poles={[[-3, 0], [-4, 0]]} zeros={[[-2, 0]]} roc={{ left: -4, right: -3 }} ticks={[-4, -3, -2]} />,
  },
}
