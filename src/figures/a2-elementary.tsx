import { Graph, Panel, PI, Row, range, u } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]
const stems = (a: number, b: number, f: (n: number) => number): P[] => range(a, b).map((n) => [n, f(n)] as P)
const circle = (r: number): P[] => range(0, 120).map((k) => [r * Math.cos((2 * PI * k) / 120), r * Math.sin((2 * PI * k) / 120)] as P)
const d = (n: number) => (n === 0 ? 1 : 0)

export const elementaryFigures: FigureMap = {
  "el-step-impulse": {
    wide: true,
    caption: "The discrete unit step switches on at n = 0 and stays on. The discrete unit impulse is 1 only at n = 0.",
    node: (
      <Row>
        <Panel title="u[n]">
          <Graph x={[-6.5, 6.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-6, 6, u) }]} xTicks={[-6, -3, 0, 3, 6]} yTicks={[1]} />
        </Panel>
        <Panel title="δ[n]">
          <Graph x={[-6.5, 6.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-6, 6, d) }]} xTicks={[-6, -3, 0, 3, 6]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "el-shifted": {
    wide: true,
    caption: "Shifted steps and impulses. u[n − 2] switches on two samples later; u[n + 3] three samples earlier. δ[n − 2] sits at n = 2; δ[n + 3] sits at n = −3.",
    node: (
      <Row>
        <Panel title="u[n − 2]">
          <Graph x={[-5.5, 6.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-5, 6, (n) => u(n - 2)) }]} xTicks={[-3, 0, 2, 5]} />
        </Panel>
        <Panel title="u[n + 3]">
          <Graph x={[-5.5, 6.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-5, 6, (n) => u(n + 3)) }]} xTicks={[-3, 0, 2, 5]} />
        </Panel>
        <Panel title="δ[n − 2]">
          <Graph x={[-5.5, 6.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-5, 6, (n) => d(n - 2)) }]} xTicks={[-3, 0, 2, 5]} />
        </Panel>
        <Panel title="δ[n + 3]">
          <Graph x={[-5.5, 6.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-5, 6, (n) => d(n + 3)) }]} xTicks={[-3, 0, 2, 5]} />
        </Panel>
      </Row>
    ),
  },
  "el-first-diff": {
    wide: true,
    caption: "Subtract the step delayed by one sample from the step: everything cancels except n = 0. So δ[n] = u[n] − u[n − 1].",
    node: (
      <Row cols={3}>
        <Panel title="u[n]">
          <Graph x={[-3.5, 5.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 5, u) }]} xTicks={[0, 1]} />
        </Panel>
        <Panel title="u[n − 1]">
          <Graph x={[-3.5, 5.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 5, (n) => u(n - 1)), tone: "second" }]} xTicks={[0, 1]} />
        </Panel>
        <Panel title="u[n] − u[n − 1] = δ[n]">
          <Graph x={[-3.5, 5.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 5, d) }]} xTicks={[0, 1]} />
        </Panel>
      </Row>
    ),
  },
  "el-running-sum": {
    wide: true,
    caption: "The running sum Σ δ[m] for m ≤ n. The shaded window is the range being added. If n < 0 the window stops before the spike (sum = 0); if n ≥ 0 it includes the spike (sum = 1).",
    node: (
      <Row>
        <Panel title="n < 0: spike not included → 0">
          <Graph x={[-6.5, 4.5]} y={[-0.25, 1.35]} xLabel="m" items={[{ kind: "band", from: -6.5, to: -2.5, label: "m ≤ n" }, { kind: "stems", pts: stems(-6, 4, d) }]} xTicks={[[-3, "n"], 0]} />
        </Panel>
        <Panel title="n ≥ 0: spike included → 1">
          <Graph x={[-6.5, 4.5]} y={[-0.25, 1.35]} xLabel="m" items={[{ kind: "band", from: -6.5, to: 2.5, label: "m ≤ n" }, { kind: "stems", pts: stems(-6, 4, d) }]} xTicks={[0, [2, "n"]]} />
        </Panel>
      </Row>
    ),
  },
  "el-delayed-impulses": {
    wide: true,
    caption: "Each delayed impulse δ[n − k] contributes exactly one sample, at n = k. Stacking δ[n] + δ[n − 1] + δ[n − 2] + … builds the step.",
    node: (
      <Row cols={3}>
        <Panel title="δ[n], δ[n − 1], δ[n − 2], δ[n − 3]">
          <Graph
            x={[-1.5, 5.5]}
            y={[-0.25, 1.35]}
            xLabel="n"
            items={[
              { kind: "stems", pts: [[0, 1]] },
              { kind: "stems", pts: [[1, 1]], tone: "second" },
              { kind: "stems", pts: [[2, 1]] },
              { kind: "stems", pts: [[3, 1]], tone: "second" },
            ]}
            xTicks={[0, 1, 2, 3]}
          />
        </Panel>
        <Panel title="their sum">
          <Graph x={[-1.5, 5.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 5, () => 1) }, { kind: "text", at: [5.2, 1.15], text: "···" }]} xTicks={[0, 1, 2, 3]} />
        </Panel>
        <Panel title="= u[n]">
          <Graph x={[-1.5, 5.5]} y={[-0.25, 1.35]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 5, u) }]} xTicks={[0, 1, 2, 3]} />
        </Panel>
      </Row>
    ),
  },
  "el-ut": {
    caption: "The continuous unit step jumps from 0 to 1 at t = 0. Its value exactly at t = 0 does not matter for our operations.",
    node: <Graph width={420} x={[-3, 3]} y={[-0.25, 1.35]} items={[{ kind: "path", pts: [[-3, 0], [0, 0]] }, { kind: "path", pts: [[0, 1], [3, 1]] }, { kind: "path", pts: [[0, 0], [0, 1]], dashed: true, tone: "muted" }]} xTicks={[-2, -1, 1, 2]} yTicks={[1]} yLabel="u(t)" />,
  },
  "el-smoothed": {
    wide: true,
    caption: "Replace the jump by a short ramp of width Δ. Its derivative is a pulse of height 1/Δ and width Δ: area exactly 1.",
    node: (
      <Row>
        <Panel title="smoothed step u_Δ(t)">
          <Graph x={[-1, 2]} y={[-0.25, 1.5]} items={[{ kind: "path", pts: [[-1, 0], [0, 0], [0.5, 1], [2, 1]] }]} xTicks={[[0.5, "Δ"]]} yTicks={[1]} />
        </Panel>
        <Panel title="its derivative δ_Δ(t)">
          <Graph x={[-1, 2]} y={[-0.25, 2.5]} items={[{ kind: "path", pts: [[-1, 0], [0, 0], [0, 2], [0.5, 2], [0.5, 0], [2, 0]], area: true }, { kind: "text", at: [0.25, 1], text: "area 1" }]} xTicks={[[0.5, "Δ"]]} yTicks={[[2, "1/Δ"]]} />
        </Panel>
      </Row>
    ),
  },
  "el-narrowing": {
    caption: "Making the ramp steeper makes the derivative pulse taller and narrower, but its area stays 1. In the limit Δ → 0 the pulse becomes the ideal impulse δ(t).",
    node: (
      <Graph
        width={420}
        x={[-0.3, 1.3]}
        y={[-0.3, 3.6]}
        items={[
          { kind: "path", pts: [[0, 0], [0, 1], [1, 1], [1, 0]], tone: "muted" },
          { kind: "path", pts: [[0, 0], [0, 2], [0.5, 2], [0.5, 0]], tone: "second" },
          { kind: "path", pts: [[0, 0], [0, 3], [1 / 3, 3], [1 / 3, 0]] },
          { kind: "text", at: [1.05, 1.1], text: "Δ = 1", tone: "muted", anchor: "start" },
          { kind: "text", at: [0.55, 2.1], text: "Δ = ½", tone: "second", anchor: "start" },
          { kind: "text", at: [0.38, 3.1], text: "Δ = ⅓", tone: "accent", anchor: "start" },
        ]}
        xTicks={[[1 / 3, "⅓"], [0.5, "½"], 1]}
        yTicks={[1, 2, 3]}
      />
    ),
  },
  "el-arrows": {
    caption: "Impulses are drawn as arrows. The number beside the arrow is the area (strength), not a height. A negative strength points down.",
    node: (
      <Graph
        width={420}
        x={[-2.5, 4.5]}
        y={[-3.5, 2.8]}
        items={[{ kind: "impulses", pts: [[0, 1, "δ(t)"], [1, 2, "2δ(t − 1)"], [3, -3, "−3δ(t − 3)"]] }]}
        xTicks={[-2, -1, 1, 2, 3, 4]}
      />
    ),
  },
  "el-2u": {
    wide: true,
    caption: "Differentiating 2u(t): flat everywhere except a jump of +2 at t = 0, which becomes an impulse of area 2.",
    node: (
      <Row>
        <Panel title="2u(t)">
          <Graph x={[-2, 2]} y={[-0.4, 2.6]} items={[{ kind: "path", pts: [[-2, 0], [0, 0]] }, { kind: "path", pts: [[0, 2], [2, 2]] }]} xTicks={[-1, 1]} yTicks={[2]} />
        </Panel>
        <Panel title="d/dt 2u(t) = 2δ(t)">
          <Graph x={[-2, 2]} y={[-0.4, 2.6]} items={[{ kind: "impulses", pts: [[0, 2, "area 2"]] }]} xTicks={[-1, 1]} />
        </Panel>
      </Row>
    ),
  },
  "el-jumps": {
    wide: true,
    caption: "Read the jumps: +2 at t = 1, −3 at t = 2, +2 at t = 4. So x(t) = 2u(t − 1) − 3u(t − 2) + 2u(t − 4), and its derivative is an impulse at every jump with the jump as its strength.",
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-0.5, 5.5]} y={[-3.5, 2.6]} items={[{ kind: "path", pts: [[-0.5, 0], [1, 0]] }, { kind: "path", pts: [[1, 2], [2, 2]] }, { kind: "path", pts: [[2, -1], [4, -1]] }, { kind: "path", pts: [[4, 1], [5.5, 1]] }]} xTicks={[1, 2, 3, 4]} yTicks={[2, 1, -1]} />
        </Panel>
        <Panel title="dx/dt">
          <Graph x={[-0.5, 5.5]} y={[-3.5, 2.6]} items={[{ kind: "impulses", pts: [[1, 2, "+2"], [2, -3, "−3"], [4, 2, "+2"]] }]} xTicks={[1, 2, 3, 4]} />
        </Panel>
      </Row>
    ),
  },
  "el-exp": {
    wide: true,
    caption: "The real exponential Ceᵃᵗ grows when a > 0, stays constant when a = 0, and decays when a < 0. Every curve passes through C at t = 0.",
    node: (
      <Row cols={3}>
        <Panel title="a > 0: grows">
          <Graph x={[-2, 2]} y={[-0.3, 3.3]} items={[{ kind: "fn", f: (t) => 0.8 * Math.exp(0.7 * t) }]} yTicks={[[0.8, "C"]]} />
        </Panel>
        <Panel title="a = 0: constant">
          <Graph x={[-2, 2]} y={[-0.3, 3.3]} items={[{ kind: "fn", f: () => 0.8 }]} yTicks={[[0.8, "C"]]} />
        </Panel>
        <Panel title="a < 0: decays">
          <Graph x={[-2, 2]} y={[-0.3, 3.3]} items={[{ kind: "fn", f: (t) => 0.8 * Math.exp(-0.7 * t) }]} yTicks={[[0.8, "C"]]} />
        </Panel>
      </Row>
    ),
  },
  "el-switch": {
    wide: true,
    caption: "The step acts as a switch. Multiplying e²ᵗ by u(t) keeps the right side and removes the left side.",
    node: (
      <Row>
        <Panel title="e²ᵗ">
          <Graph x={[-2, 1]} y={[-0.3, 4]} items={[{ kind: "fn", f: (t) => Math.exp(2 * t) }]} yTicks={[1]} />
        </Panel>
        <Panel title="e²ᵗ u(t)">
          <Graph x={[-2, 1]} y={[-0.3, 4]} items={[{ kind: "path", pts: [[-2, 0], [0, 0]] }, { kind: "fn", f: (t) => Math.exp(2 * t), from: 0 }]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "el-switch-practice": {
    wide: true,
    caption: "Shifted and reversed switches. Note u(3t) = u(t), because 3t has the same sign as t.",
    node: (
      <Row>
        <Panel title="eᵗ u(−t)">
          <Graph x={[-3, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(t), to: 0 }, { kind: "path", pts: [[0, 0], [3, 0]] }]} yTicks={[1]} />
        </Panel>
        <Panel title="e⁻ᵗ u(t − 2)">
          <Graph x={[-1, 5]} y={[-0.05, 0.25]} items={[{ kind: "path", pts: [[-1, 0], [2, 0]] }, { kind: "fn", f: (t) => Math.exp(-t), from: 2 }]} xTicks={[2]} yTicks={[[Math.exp(-2), "e⁻²"]]} />
        </Panel>
        <Panel title="eᵗ u(3 − t)">
          <Graph x={[-2, 5]} y={[-1.5, 22]} items={[{ kind: "fn", f: (t) => Math.exp(t), to: 3 }, { kind: "path", pts: [[3, 0], [5, 0]] }]} xTicks={[3]} yTicks={[[Math.exp(3), "e³"]]} />
        </Panel>
        <Panel title="e⁻ᵗ u(3t) = e⁻ᵗ u(t)">
          <Graph x={[-2, 4]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [0, 0]] }, { kind: "fn", f: (t) => Math.exp(-t), from: 0 }]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "el-sinusoid": {
    caption: "A cos(ω₀t + φ): A sets the height, ω₀ the speed, φ the starting position. One full cycle takes T₀ = 2π/|ω₀|.",
    node: (
      <Graph
        width={440}
        x={[-1, 8]}
        y={[-1.5, 1.6]}
        items={[
          { kind: "fn", f: (t) => Math.cos(1.2 * t + 0.6) },
          { kind: "arrow", from: [-0.5 / 1.2 + 0.0, 1.35], to: [(2 * PI - 0.6) / 1.2, 1.35], double: true, label: "T₀ = 2π/ω₀", tone: "second" },
          { kind: "vline", x: -0.5, tone: "muted" },
          { kind: "vline", x: (2 * PI - 0.6) / 1.2, tone: "muted" },
        ]}
        yTicks={[[1, "A"], [-1, "−A"]]}
      />
    ),
  },
  "el-speeds": {
    wide: true,
    caption: "Larger |ω₀| means faster oscillation and a shorter period.",
    node: (
      <Row cols={3}>
        <Panel title="cos t">
          <Graph x={[0, 13]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: Math.cos }]} />
        </Panel>
        <Panel title="cos 2t">
          <Graph x={[0, 13]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: (t) => Math.cos(2 * t) }]} />
        </Panel>
        <Panel title="cos 4t">
          <Graph x={[0, 13]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: (t) => Math.cos(4 * t), n: 500 }]} />
        </Panel>
      </Row>
    ),
  },
  "el-unit-circle": {
    caption: "A point rotating on the unit circle at angle θ = ω₀t. Its horizontal coordinate is cos ω₀t and its vertical coordinate is sin ω₀t. Euler's formula packs both into $e^{j\\omega_0 t}$.",
    node: (
      <Graph
        width={300}
        height={280}
        x={[-1.6, 1.6]}
        y={[-1.45, 1.5]}
        xLabel="Re"
        yLabel="Im"
        items={[
          { kind: "path", pts: circle(1), tone: "muted", width: 1.2 },
          { kind: "arrow", from: [0, 0], to: [Math.cos(0.9), Math.sin(0.9)] },
          { kind: "path", pts: [[Math.cos(0.9), 0], [Math.cos(0.9), Math.sin(0.9)]], dashed: true, tone: "second" },
          { kind: "path", pts: [[0, Math.sin(0.9)], [Math.cos(0.9), Math.sin(0.9)]], dashed: true, tone: "second" },
          { kind: "text", at: [Math.cos(0.9) / 2, -0.17], text: "cos θ", tone: "second" },
          { kind: "text", at: [-0.28, Math.sin(0.9) / 2], text: "sin θ", tone: "second" },
          { kind: "text", at: [0.95, 1.08], text: "eʲᶿ", tone: "accent", anchor: "start" },
          { kind: "text", at: [0.3, 0.12], text: "θ", italic: true },
        ]}
        xTicks={[[1, "1"], [-1, "−1"]]}
      />
    ),
  },
  "el-cos-two": {
    caption: "cos θ is the sum of two half-length arrows turning in opposite directions. Their imaginary parts cancel, so what remains is real: $\\tfrac12 e^{j\\theta}+\\tfrac12 e^{-j\\theta}=\\cos\\theta$.",
    node: (
      <Graph
        width={300}
        height={260}
        x={[-1.4, 1.6]}
        y={[-1.2, 1.2]}
        xLabel="Re"
        yLabel="Im"
        items={[
          { kind: "path", pts: circle(0.5), tone: "muted", width: 1 },
          { kind: "arrow", from: [0, 0], to: [0.5 * Math.cos(0.8), 0.5 * Math.sin(0.8)] },
          { kind: "arrow", from: [0, 0], to: [0.5 * Math.cos(0.8), -0.5 * Math.sin(0.8)], tone: "second" },
          { kind: "arrow", from: [0, 0], to: [Math.cos(0.8), 0], tone: "ink" },
          { kind: "text", at: [0.5 * Math.cos(0.8), 0.5 * Math.sin(0.8) + 0.12], text: "½eʲᶿ", tone: "accent" },
          { kind: "text", at: [0.5 * Math.cos(0.8), -0.5 * Math.sin(0.8) - 0.16], text: "½e⁻ʲᶿ", tone: "second" },
          { kind: "text", at: [Math.cos(0.8) + 0.05, 0.12], text: "cos θ", tone: "ink", anchor: "start" },
        ]}
      />
    ),
  },
  "el-dt-cos": {
    caption: "x[n] = cos(πn/4): the samples of cos(πt/4) at integer n. This one is periodic with N = 8.",
    node: <Graph width={440} x={[-8.5, 8.5]} y={[-1.4, 1.4]} xLabel="n" items={[{ kind: "fn", f: (t) => Math.cos((PI * t) / 4), dashed: true, tone: "muted", width: 1.2 }, { kind: "stems", pts: stems(-8, 8, (n) => Math.cos((PI * n) / 4)) }]} xTicks={[-8, -4, 4, 8]} yTicks={[1, -1]} />,
  },
  "el-cos2n": {
    wide: true,
    caption: "cos 2t repeats every π, but π is not an integer, so the samples cos 2n never land on the same pattern again: cos 2n is not periodic. cos(2πn/5) repeats after exactly N = 5 samples.",
    node: (
      <Row>
        <Panel title="cos 2n: not periodic">
          <Graph x={[-0.5, 12.5]} y={[-1.4, 1.4]} xLabel="n" items={[{ kind: "fn", f: (t) => Math.cos(2 * t), dashed: true, tone: "muted", width: 1.1, n: 400 }, { kind: "stems", pts: stems(0, 12, (n) => Math.cos(2 * n)) }]} xTicks={[0, 5, 10]} />
        </Panel>
        <Panel title="cos(2πn/5): period 5">
          <Graph x={[-5.5, 10.5]} y={[-1.4, 1.4]} xLabel="n" items={[{ kind: "fn", f: (t) => Math.cos((2 * PI * t) / 5), dashed: true, tone: "muted", width: 1.1 }, { kind: "stems", pts: stems(-5, 10, (n) => Math.cos((2 * PI * n) / 5)) }, { kind: "arrow", from: [0, 1.25], to: [5, 1.25], double: true, label: "N = 5", tone: "second" }]} xTicks={[-5, 0, 5, 10]} />
        </Panel>
      </Row>
    ),
  },
}
