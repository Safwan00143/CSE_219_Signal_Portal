import { Graph, Panel, Plane, Row } from "./kit"
import type { FigureMap } from "./figure"

const right = (t: number, a: number) => (t >= 0 ? Math.exp(-a * t) : 0)
const left = (t: number, a: number) => (t < 0 ? -Math.exp(-a * t) : 0)

export const laplaceFigures: FigureMap = {
  "lap-ex91": {
    wide: true,
    caption: "Example 9.1: x(t) = e^(−at)u(t) has X(s) = 1/(s + a) with ROC Re{s} > −a: everything to the right of the pole.",
    node: (
      <Row>
        <Panel title="x(t) = e^(−at) u(t)">
          <Graph x={[-2, 4]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => right(t, 1), n: 400 }]} yTicks={[1, -1]} />
        </Panel>
        <Panel title="ROC: Re{s} > −a">
          <Plane kind="s" range={3} poles={[[-1, 0]]} roc={{ left: -1 }} ticks={[[-1, "−a"]]} />
        </Panel>
      </Row>
    ),
  },
  "lap-ex92": {
    wide: true,
    caption: "Example 9.2: x(t) = −e^(−at)u(−t) has the same algebraic X(s) = 1/(s + a), but the ROC is Re{s} < −a: everything to the left of the pole. (Drawn with a < 0 so the signal decays to the left.)",
    node: (
      <Row>
        <Panel title="x(t) = −e^(−at) u(−t)">
          <Graph x={[-4, 2]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => left(t, -0.5), n: 400 }]} yTicks={[1, -1]} />
        </Panel>
        <Panel title="ROC: Re{s} < −a">
          <Plane kind="s" range={3} poles={[[0.5, 0]]} roc={{ right: 0.5 }} ticks={[[0.5, "−a"]]} />
        </Panel>
      </Row>
    ),
  },
  "lap-splane": {
    caption: "The s-plane: horizontal axis σ = Re{s}, vertical axis jω. The ROC (shaded) is the set of s where the integral converges. The jω axis is where the Fourier transform lives; if the ROC contains it, the Fourier transform exists.",
    node: <Plane kind="s" range={3} roc={{ left: -1.5 }} labels={[{ at: [1.2, 2.3], text: "ROC" }, { at: [0.45, -2.5], text: "jω axis" }]} />,
  },
  "lap-ex93": {
    caption: "Example 9.3: X(s) = (s − 1)/((s + 1)(s + 2)). Poles (×) at −1 and −2, zero (○) at 1. The ROC Re{s} > −1 is bounded by the rightmost pole.",
    node: <Plane kind="s" range={3} poles={[[-1, 0], [-2, 0]]} zeros={[[1, 0]]} roc={{ left: -1 }} ticks={[-2, -1, 1]} />,
  },
  "lap-ex94": {
    caption: "Example 9.4: e^(−2t)u(t) + e^(−t)cos(3t)u(t). Poles at −2 and −1 ± 3j, zeros near −1.25 ± 2.11j. ROC Re{s} > −1.",
    node: <Plane kind="s" range={4} poles={[[-2, 0], [-1, 3], [-1, -3]]} zeros={[[-1.25, 2.11], [-1.25, -2.11]]} roc={{ left: -1 }} ticks={[-2, -1]} />,
  },
  "lap-ex95": {
    caption: "Example 9.5: δ(t) − (4/3)e^(−t)u(t) + (1/3)e^(2t)u(t) = (s − 1)²/((s + 1)(s − 2)). A double zero at s = 1, poles at −1 and 2; ROC Re{s} > 2.",
    node: <Plane kind="s" range={3} poles={[[-1, 0], [2, 0]]} zeros={[[1, 0]]} poleOrder={[{ at: [1, 0], text: "2nd order" }]} roc={{ left: 2 }} ticks={[-1, 1, 2]} />,
  },
  "lap-right-sided": {
    caption: "Why a right-sided signal's ROC extends to the right: if x(t)e^(−σ₀t) converges, then x(t)e^(−σ₁t) with σ₁ > σ₀ decays even faster as t → ∞.",
    node: <Graph width={440} x={[-1, 6]} y={[-0.2, 2.2]} items={[{ kind: "fn", f: (t) => (t >= 0.5 ? Math.exp(0.3 * t) * Math.exp(-0.6 * t) * 1.6 : 0), tone: "second", n: 400 }, { kind: "fn", f: (t) => (t >= 0.5 ? Math.exp(0.3 * t) * Math.exp(-1.2 * t) * 1.6 : 0), n: 400 }, { kind: "text", at: [4.2, 0.85], text: "x(t)e^(−σ₀t)", tone: "second" }, { kind: "text", at: [3.2, 0.25], text: "x(t)e^(−σ₁t)", tone: "accent" }]} xTicks={[[0.5, "T₁"]]} />,
  },
  "lap-ex97": {
    wide: true,
    caption: "Example 9.7: x(t) = e^(−b|t|), b > 0. The right-sided part needs Re{s} > −b, the left-sided part needs Re{s} < b; the ROC is the strip between, with poles at ±b.",
    node: (
      <Row>
        <Panel title="x(t) = e^(−b|t|)">
          <Graph x={[-4, 4]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-Math.abs(t)) }]} yTicks={[1]} />
        </Panel>
        <Panel title="ROC: −b < Re{s} < b">
          <Plane kind="s" range={3} poles={[[-1, 0], [1, 0]]} roc={{ left: -1, right: 1 }} ticks={[[-1, "−b"], [1, "b"]]} />
        </Panel>
      </Row>
    ),
  },
  "lap-ex98": {
    wide: true,
    caption: "Example 9.8: X(s) = 1/((s + 1)(s + 2)) alone does not fix the signal. The poles at −1 and −2 allow three ROCs: right-sided (Re{s} > −1), left-sided (Re{s} < −2), or two-sided (−2 < Re{s} < −1).",
    node: (
      <Row cols={3}>
        <Panel title="right-sided">
          <Plane kind="s" range={3} poles={[[-1, 0], [-2, 0]]} roc={{ left: -1 }} ticks={[-2, -1]} size={200} />
        </Panel>
        <Panel title="left-sided">
          <Plane kind="s" range={3} poles={[[-1, 0], [-2, 0]]} roc={{ right: -2 }} ticks={[-2, -1]} size={200} />
        </Panel>
        <Panel title="two-sided">
          <Plane kind="s" range={3} poles={[[-1, 0], [-2, 0]]} roc={{ left: -2, right: -1 }} ticks={[-2, -1]} size={200} />
        </Panel>
      </Row>
    ),
  },
  "lap-term-sides": {
    wide: true,
    caption: "The ROC decides how each partial fraction A/(s + a) is inverted. ROC to the right of the pole: Ae^(−at)u(t), right-sided. ROC to the left: −Ae^(−at)u(−t), left-sided.",
    node: (
      <Row>
        <Panel title="ROC right of −a  →  Ae^(−at)u(t)">
          <Graph x={[-3, 3]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => right(t, 1), n: 400 }]} yTicks={[[1, "A"], [-1, "−A"]]} />
        </Panel>
        <Panel title="ROC left of −a  →  −Ae^(−at)u(−t)">
          <Graph x={[-3, 3]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => (t < 0 ? -Math.exp(-0.4 * t) * 0.3 : 0), tone: "second", n: 400 }]} yTicks={[[1, "A"], [-1, "−A"]]} />
        </Panel>
      </Row>
    ),
  },
  "lap-inverses": {
    wide: true,
    caption: "Examples 9.9–9.11: the same X(s) = 1/(s + 1) − 1/(s + 2) inverted with each of the three ROCs.",
    node: (
      <Row cols={3}>
        <Panel title="Re{s} > −1: (e⁻ᵗ − e⁻²ᵗ)u(t)">
          <Graph x={[-3, 4]} y={[-0.35, 0.35]} items={[{ kind: "fn", f: (t) => (t >= 0 ? Math.exp(-t) - Math.exp(-2 * t) : 0), n: 400 }]} />
        </Panel>
        <Panel title="Re{s} < −2: (−e⁻ᵗ + e⁻²ᵗ)u(−t)">
          <Graph x={[-2, 3]} y={[-2, 50]} items={[{ kind: "fn", f: (t) => (t < 0 ? -Math.exp(-t) + Math.exp(-2 * t) : 0), n: 400 }]} />
        </Panel>
        <Panel title="−2 < Re{s} < −1: −e⁻ᵗu(−t) − e⁻²ᵗu(t)">
          <Graph x={[-2, 3]} y={[-8, 1]} items={[{ kind: "fn", f: (t) => (t < 0 ? -Math.exp(-t) : -Math.exp(-2 * t)), n: 600 }]} />
        </Panel>
      </Row>
    ),
  },
  "lap-cancel": {
    wide: true,
    caption: "Example 9.13: X₁(s) = 1/(s + 1) and X₂(s) = 1/((s + 1)(s + 2)), both with ROC Re{s} > −1. Their difference is 1/(s + 2): the pole at −1 cancels and the actual ROC grows to Re{s} > −2.",
    node: (
      <Row>
        <Panel title="guaranteed: Re{s} > −1">
          <Plane kind="s" range={3} poles={[[-1, 0], [-2, 0]]} roc={{ left: -1 }} ticks={[-2, -1]} />
        </Panel>
        <Panel title="after cancellation: Re{s} > −2">
          <Plane kind="s" range={3} poles={[[-2, 0]]} roc={{ left: -2 }} ticks={[-2, -1]} />
        </Panel>
      </Row>
    ),
  },
  "lap-shift-roc": {
    caption: "Shifting in the s-domain: e^(s₀t)x(t) ↔ X(s − s₀). The whole pole–zero pattern and the ROC move right by Re{s₀}.",
    node: <Plane kind="s" range={3} poles={[[-2, 0], [-0.5, 0]]} roc={{ left: -0.5 }} ticks={[-2, -0.5]} labels={[{ at: [1.6, 2.3], text: "R + Re{s₀}" }]} />,
  },
  "lap-stability": {
    wide: true,
    caption: "Example 9.20: H(s) = (s − 1)/((s + 1)(s − 2)). Re{s} > 2 is causal but unstable; −1 < Re{s} < 2 is non-causal but stable (it contains the jω axis); Re{s} < −1 is anticausal and unstable.",
    node: (
      <Row cols={3}>
        <Panel title="causal, unstable">
          <Plane kind="s" range={3} poles={[[-1, 0], [2, 0]]} zeros={[[1, 0]]} roc={{ left: 2 }} ticks={[-1, 1, 2]} size={200} />
        </Panel>
        <Panel title="stable, non-causal">
          <Plane kind="s" range={3} poles={[[-1, 0], [2, 0]]} zeros={[[1, 0]]} roc={{ left: -1, right: 2 }} ticks={[-1, 1, 2]} size={200} />
        </Panel>
        <Panel title="anticausal, unstable">
          <Plane kind="s" range={3} poles={[[-1, 0], [2, 0]]} zeros={[[1, 0]]} roc={{ right: -1 }} ticks={[-1, 1, 2]} size={200} />
        </Panel>
      </Row>
    ),
  },
  "lap-causal-stable": {
    wide: true,
    caption: "Causal rational systems: stable if and only if every pole is in the left half-plane (left). Example 9.21, H(s) = 1/(s − 2) with a causal ROC, has its pole in the right half-plane, so it is unstable (right).",
    node: (
      <Row>
        <Panel title="all poles in LHP: stable">
          <Plane kind="s" range={3} poles={[[-1, 1.5], [-1, -1.5], [-2, 0]]} roc={{ left: -1 }} ticks={[-2, -1]} />
        </Panel>
        <Panel title="pole at s = 2: unstable">
          <Plane kind="s" range={3} poles={[[2, 0]]} roc={{ left: 2 }} ticks={[2]} />
        </Panel>
      </Row>
    ),
  },
  "lap-de-response": {
    caption: "Zero-state response of dy/dt + 3y = x to x(t) = e^(−2t)u(t): y(t) = (e^(−2t) − e^(−3t))u(t). It rises from 0, peaks near t = 0.4, and decays.",
    node: <Graph width={420} x={[-0.5, 4]} y={[-0.03, 0.18]} items={[{ kind: "fn", f: (t) => (t >= 0 ? Math.exp(-2 * t) - Math.exp(-3 * t) : 0), n: 400 }]} yTicks={[[4 / 27, "4/27"]]} xTicks={[1, 2, 3]} />,
  },
  "lap-de-rocs": {
    wide: true,
    caption: "Example 9.23: the equation dy/dt + 3y = x fixes H(s) = 1/(s + 3) but not the ROC. Causality picks Re{s} > −3 (h = e^(−3t)u(t)); the anticausal choice Re{s} < −3 gives h = −e^(−3t)u(−t).",
    node: (
      <Row>
        <Panel title="causal ROC">
          <Plane kind="s" range={4} poles={[[-3, 0]]} roc={{ left: -3 }} ticks={[-3]} />
        </Panel>
        <Panel title="anticausal ROC">
          <Plane kind="s" range={4} poles={[[-3, 0]]} roc={{ right: -3 }} ticks={[-3]} />
        </Panel>
      </Row>
    ),
  },
  "lap-finite": {
    wide: true,
    caption: "Example 9.6: a finite-duration signal (left) has no true poles. The apparent pole of (1 − e^(−(s+a)T))/(s + a) at s = −a cancels with a zero, and the ROC is the whole s-plane (right).",
    node: (
      <Row>
        <Panel title="x(t) = e^(−at), 0 < t < T">
          <Graph x={[-1, 3]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-1, 0], [0, 0]] }, { kind: "fn", f: (t) => Math.exp(-0.6 * t), from: 0, to: 2 }, { kind: "path", pts: [[2, Math.exp(-1.2)], [2, 0], [3, 0]] }]} xTicks={[[2, "T"]]} yTicks={[1]} />
        </Panel>
        <Panel title="ROC: entire s-plane">
          <Plane kind="s" range={3} roc={{}} ticks={[[-1, "−a"]]} labels={[{ at: [-1, 0.45], text: "no pole" }]} />
        </Panel>
      </Row>
    ),
  },
}
