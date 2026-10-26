import { Graph, Panel, PI, Plane, Row, range } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]
const stems = (a: number, b: number, f: (n: number) => number): P[] => range(a, b).map((n) => [n, f(n)] as P)

export const zFigures: FigureMap = {
  "z-mapping": {
    wide: true,
    caption: "The map z = e^(sT). A vertical strip of the s-plane (left) becomes a ring of the z-plane (right). The jω axis maps to the unit circle, so ROC questions become questions about radii.",
    node: (
      <Row>
        <Panel title="s-plane: strip σ₁ < Re{s} < σ₂">
          <Plane kind="s" range={2} roc={{ left: -1, right: 0.5 }} ticks={[[-1, "σ₁"], [0.5, "σ₂"]]} />
        </Panel>
        <Panel title="z-plane: ring e^(σ₁T) < |z| < e^(σ₂T)">
          <Plane kind="z" range={2} ring={{ inner: 0.6, outer: 1.4 }} ticks={[[1, "1"]]} />
        </Panel>
      </Row>
    ),
  },
  "z-ex101": {
    wide: true,
    caption: "Example 10.1: x[n] = aⁿu[n] (a = 0.6). X(z) = z/(z − a), pole at z = a, zero at z = 0, ROC |z| > |a|: the exterior of a circle. Because |a| < 1 the ROC contains the unit circle, so the DTFT exists.",
    node: (
      <Row>
        <Panel title="x[n] = 0.6ⁿ u[n]">
          <Graph x={[-3.5, 8.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 8, (n) => (n >= 0 ? 0.6 ** n : 0)) }]} xTicks={[0, 2, 4, 6, 8]} />
        </Panel>
        <Panel title="ROC: |z| > a">
          <Plane kind="z" range={1.6} poles={[[0.6, 0]]} zeros={[[0, 0]]} ring={{ inner: 0.6 }} ticks={[[0.6, "a"], [1, "1"]]} />
        </Panel>
      </Row>
    ),
  },
  "z-ex102": {
    wide: true,
    caption: "Example 10.2: x[n] = −aⁿu[−n − 1]. Same X(z) = z/(z − a), but the ROC is |z| < |a|: the interior of the circle.",
    node: (
      <Row>
        <Panel title="x[n] = −aⁿ u[−n − 1]   (a = 1.6)">
          <Graph x={[-7.5, 3.5]} y={[-0.8, 0.2]} xLabel="n" items={[{ kind: "stems", pts: stems(-7, 3, (n) => (n <= -1 ? -(1.6 ** n) : 0)) }]} xTicks={[-6, -4, -2, -1, 0]} />
        </Panel>
        <Panel title="ROC: |z| < a">
          <Plane kind="z" range={2} poles={[[1.6, 0]]} zeros={[[0, 0]]} ring={{ outer: 1.6 }} ticks={[[1.6, "a"]]} />
        </Panel>
      </Row>
    ),
  },
  "z-shapes": {
    wide: true,
    caption: "Laplace ROCs are half-planes or strips; z-transform ROCs are discs, exteriors of discs, or rings (annuli).",
    node: (
      <Row cols={3}>
        <Panel title="exterior: right-sided">
          <Plane kind="z" range={2} ring={{ inner: 0.8 }} size={200} />
        </Panel>
        <Panel title="disc: left-sided">
          <Plane kind="z" range={2} ring={{ outer: 1.3 }} size={200} />
        </Panel>
        <Panel title="ring: two-sided">
          <Plane kind="z" range={2} ring={{ inner: 0.6, outer: 1.5 }} size={200} />
        </Panel>
      </Row>
    ),
  },
  "z-ex103": {
    caption: "Example 10.3: 7(1/3)ⁿu[n] − 6(1/2)ⁿu[n]. Poles at 1/3 and 1/2, zeros at 0 and 3/2. Both parts are right-sided, so the ROC is outside the outermost pole: |z| > 1/2.",
    node: <Plane kind="z" range={1.8} poles={[[1 / 3, 0], [0.5, 0]]} zeros={[[0, 0], [1.5, 0]]} ring={{ inner: 0.5 }} ticks={[[0.5, "½"], [1, "1"], [1.5, "3/2"]]} />,
  },
  "z-ex104": {
    wide: true,
    caption: "Example 10.4: the damped sinusoid (1/3)ⁿ sin(πn/4) u[n]. Poles at (1/3)e^(±jπ/4), zero at 0; ROC |z| > 1/3.",
    node: (
      <Row>
        <Panel title="x[n]">
          <Graph x={[-1.5, 9.5]} y={[-0.05, 0.3]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 9, (n) => (1 / 3) ** n * Math.sin((PI * n) / 4)) }]} xTicks={[0, 2, 4, 6, 8]} />
        </Panel>
        <Panel title="ROC: |z| > 1/3">
          <Plane kind="z" range={1.4} poles={[[Math.cos(PI / 4) / 3, Math.sin(PI / 4) / 3], [Math.cos(PI / 4) / 3, -Math.sin(PI / 4) / 3]]} zeros={[[0, 0]]} ring={{ inner: 1 / 3 }} ticks={[[1, "1"]]} />
        </Panel>
      </Row>
    ),
  },
  "z-finite": {
    caption: "Example 10.6: x[n] = aⁿ for 0 ≤ n ≤ 7. The zeros lie evenly on a circle of radius a (the one at z = a cancels the pole there), and N − 1 = 7 poles sit at the origin. ROC: all z except 0.",
    node: <Plane kind="z" range={1.4} poles={[[0, 0]]} poleOrder={[{ at: [0, 0], text: "7th order" }]} zeros={range(1, 7).map((k) => [0.8 * Math.cos((2 * PI * k) / 8), 0.8 * Math.sin((2 * PI * k) / 8)] as P)} ring={{ inner: 0.001 }} ticks={[[0.8, "a"]]} />,
  },
  "z-bn": {
    wide: true,
    caption: "Example 10.7: x[n] = b^|n| with 0 < b < 1. The right-sided part needs |z| > b, the left-sided part |z| < 1/b; the ROC is the ring b < |z| < 1/b. For b > 1 the two conditions cannot both hold and there is no z-transform.",
    node: (
      <Row>
        <Panel title="x[n] = 0.6^|n|">
          <Graph x={[-6.5, 6.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: stems(-6, 6, (n) => 0.6 ** Math.abs(n)) }]} xTicks={[-4, -2, 0, 2, 4]} />
        </Panel>
        <Panel title="ROC: b < |z| < 1/b">
          <Plane kind="z" range={2} poles={[[0.6, 0], [1 / 0.6, 0]]} ring={{ inner: 0.6, outer: 1 / 0.6 }} ticks={[[0.6, "b"], [1 / 0.6, "1/b"]]} />
        </Panel>
      </Row>
    ),
  },
  "z-ex108": {
    wide: true,
    caption: "Example 10.8: poles at 1/2 and 2 allow three ROCs. Only the middle ring contains the unit circle, so only the two-sided sequence has a DTFT.",
    node: (
      <Row cols={3}>
        <Panel title="|z| > 2: right-sided">
          <Plane kind="z" range={2.6} poles={[[0.5, 0], [2, 0]]} ring={{ inner: 2 }} ticks={[[2, "2"]]} size={200} />
        </Panel>
        <Panel title="½ < |z| < 2: two-sided">
          <Plane kind="z" range={2.6} poles={[[0.5, 0], [2, 0]]} ring={{ inner: 0.5, outer: 2 }} ticks={[[2, "2"]]} size={200} />
        </Panel>
        <Panel title="|z| < ½: left-sided">
          <Plane kind="z" range={2.6} poles={[[0.5, 0], [2, 0]]} ring={{ outer: 0.5 }} ticks={[[2, "2"]]} size={200} />
        </Panel>
      </Row>
    ),
  },
  "z-expansion": {
    wide: true,
    caption: "Time expansion: x₍₂₎[n] inserts one zero between consecutive samples of x[n]. Its z-transform is X(z²).",
    node: (
      <Row>
        <Panel title="x[n]">
          <Graph x={[-0.8, 9.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: [[0, 1], [1, 0.8], [2, 0.6], [3, 0.4], [4, 0.2]] }]} xTicks={[0, 1, 2, 3, 4]} />
        </Panel>
        <Panel title="x₍₂₎[n]">
          <Graph x={[-0.8, 9.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: [[0, 1], [2, 0.8], [4, 0.6], [6, 0.4], [8, 0.2]] }]} xTicks={[0, 2, 4, 6, 8]} />
        </Panel>
      </Row>
    ),
  },
  "z-causal": {
    caption: "Example 10.21: H(z) = 1/(1 − ½z⁻¹) + 1/(1 − 2z⁻¹) with ROC |z| > 2. The ROC is outside the outermost pole and includes ∞, so the system is causal; it does not contain the unit circle, so it is unstable (Example 10.22).",
    node: <Plane kind="z" range={2.6} poles={[[0.5, 0], [2, 0]]} zeros={[[0, 0], [1.25, 0]]} ring={{ inner: 2 }} ticks={[[0.5, "½"], [2, "2"]]} />,
  },
  "z-poles-circle": {
    wide: true,
    caption: "Example 10.24: a causal H(z) = 1/(1 − 2r cos θ z⁻¹ + r²z⁻²) has poles at re^(±jθ). It is stable iff r < 1 (poles inside the unit circle).",
    node: (
      <Row>
        <Panel title="r < 1: stable">
          <Plane kind="z" range={1.5} poles={[[0.7 * Math.cos(0.8), 0.7 * Math.sin(0.8)], [0.7 * Math.cos(0.8), -0.7 * Math.sin(0.8)]]} zeros={[[0, 0]]} ring={{ inner: 0.7 }} />
        </Panel>
        <Panel title="r > 1: unstable">
          <Plane kind="z" range={1.5} poles={[[1.25 * Math.cos(0.8), 1.25 * Math.sin(0.8)], [1.25 * Math.cos(0.8), -1.25 * Math.sin(0.8)]]} zeros={[[0, 0]]} ring={{ inner: 1.25 }} />
        </Panel>
      </Row>
    ),
  },
  "z-step-response": {
    caption: "Step response of y[n] − ½y[n − 1] = x[n] + ⅓x[n − 1]: y[n] = (8/3 − (5/3)(½)ⁿ)u[n]. It starts at 1 and settles at 8/3.",
    node: <Graph width={440} x={[-2.5, 12.5]} y={[-0.3, 3.2]} xLabel="n" items={[{ kind: "hline", y: 8 / 3, label: "8/3" }, { kind: "stems", pts: stems(-2, 12, (n) => (n >= 0 ? 8 / 3 - (5 / 3) * 0.5 ** n : 0)) }]} xTicks={[0, 4, 8, 12]} yTicks={[1]} />,
  },
}
