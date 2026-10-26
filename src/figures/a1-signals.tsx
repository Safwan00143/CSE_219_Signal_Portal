import { Graph, Panel, PI, Row, range, u } from "./kit"
import type { FigureMap } from "./figure"

// x(t) used in the lecture's step-by-step transformation example.
const xs = (t: number) => (t >= 0 && t < 1 ? 1 : t >= 1 && t <= 2 ? 2 - t : 0)
// A lopsided bump, so shifts, flips and stretches are easy to see.
const bump = (t: number) => (t > 0 && t < 2 ? (t < 0.5 ? t / 0.5 : (2 - t) / 1.5) : 0)

export const signalsFigures: FigureMap = {
  "sig-ct-dt": {
    wide: true,
    caption: "A continuous signal has a value at every instant. A discrete signal exists only at integer n; between samples it is simply undefined.",
    node: (
      <Row>
        <Panel title="Continuous: x(t)">
          <Graph x={[-4, 4]} y={[-1.4, 1.6]} items={[{ kind: "fn", f: (t) => Math.sin(1.1 * t) + 0.35 * Math.cos(2.3 * t) }]} xTicks={[-3, 0, 3]} yLabel="x(t)" />
        </Panel>
        <Panel title="Discrete: x[n]">
          <Graph
            x={[-5.5, 5.5]}
            y={[-1.4, 1.6]}
            xLabel="n"
            yLabel="x[n]"
            items={[{ kind: "stems", pts: range(-5, 5).map((n) => [n, Math.sin(1.1 * n * 0.75) + 0.35 * Math.cos(2.3 * n * 0.75)] as [number, number]) }]}
            xTicks={[-5, 0, 5]}
          />
        </Panel>
      </Row>
    ),
  },
  "sig-half-sine": {
    caption: "One half-sine. Its energy is the area under |x(t)|² = sin²t, which is π/2.",
    node: (
      <Graph
        width={420}
        x={[-1, 4.5]}
        y={[-0.3, 1.3]}
        items={[
          { kind: "fn", f: (t) => (t >= 0 && t <= PI ? Math.sin(t) ** 2 : 0), tone: "second", area: true, dashed: true },
          { kind: "fn", f: (t) => (t >= 0 && t <= PI ? Math.sin(t) : 0) },
          { kind: "text", at: [2.2, 1.05], text: "x(t) = sin t", tone: "accent" },
          { kind: "text", at: [PI / 2, 0.35], text: "|x(t)|²", tone: "second" },
        ]}
        xTicks={[0, [PI / 2, "π/2"], [PI, "π"]]}
        yTicks={[1]}
      />
    ),
  },
  "sig-discrete-4": {
    caption: "Four samples. Energy = 1 + 4 + 4 + 1 = 10; average power over the four samples = 10/4 = 2.5.",
    node: <Graph width={360} x={[-1.5, 4.5]} y={[-2.6, 2.6]} xLabel="n" yLabel="x[n]" items={[{ kind: "stems", pts: [[0, 1], [1, -2], [2, 2], [3, -1]], values: true }]} xTicks={[0, 1, 2, 3]} />,
  },
  "sig-periodic-half-sine": {
    wide: true,
    caption: "Left: the half-sine repeating every π. Every period adds π/2 of energy, so total energy is infinite, but the average power is ½. Right: the same lobe followed by an equal rest (period 2π): power drops to ¼.",
    node: (
      <Row>
        <Panel title="Period π: E = ∞, P = ½">
          <Graph x={[-7, 7]} y={[-0.3, 1.3]} items={[{ kind: "fn", f: (t) => Math.abs(Math.sin(t)) }]} xTicks={[[-2 * PI, "−2π"], [-PI, "−π"], [PI, "π"], [2 * PI, "2π"]]} yTicks={[1]} />
        </Panel>
        <Panel title="Period 2π: E = ∞, P = ¼">
          <Graph x={[-7, 13]} y={[-0.3, 1.3]} items={[{ kind: "fn", f: (t) => (Math.sin(t) > 0 ? Math.sin(t) : 0), n: 400 }]} xTicks={[[-2 * PI, "−2π"], [PI, "π"], [2 * PI, "2π"], [3 * PI, "3π"]]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "sig-inv-t": {
    caption: "This signal never ends, yet its energy is finite (E = 4) because 1/t² falls off fast enough. Finite energy over infinite time means zero average power.",
    node: (
      <Graph
        width={420}
        x={[-5, 5]}
        y={[-0.2, 1.3]}
        items={[
          { kind: "fn", f: (t) => (Math.abs(t) <= 1 ? 1 : 1 / Math.abs(t)) },
          { kind: "text", at: [3, 0.55], text: "1/|t|", tone: "accent" },
        ]}
        xTicks={[-4, -2, -1, 1, 2, 4]}
        yTicks={[1]}
      />
    ),
  },
  "sig-vertical-horizontal": {
    wide: true,
    caption: "x(2t) changes the time axis: the value A that was at t = a now arrives at a/2. 2x(t) changes only the height.",
    node: (
      <Row cols={3}>
        <Panel title="x(t)">
          <Graph x={[-0.5, 2.5]} y={[-0.2, 2.3]} items={[{ kind: "fn", f: bump }, { kind: "dots", pts: [[0.5, 1]] }]} xTicks={[[0.5, "a"]]} yTicks={[[1, "A"]]} />
        </Panel>
        <Panel title="x(2t): compressed">
          <Graph x={[-0.5, 2.5]} y={[-0.2, 2.3]} items={[{ kind: "fn", f: (t) => bump(2 * t) }, { kind: "dots", pts: [[0.25, 1]] }]} xTicks={[[0.25, "a/2"]]} yTicks={[[1, "A"]]} />
        </Panel>
        <Panel title="2x(t): taller">
          <Graph x={[-0.5, 2.5]} y={[-0.2, 2.3]} items={[{ kind: "fn", f: (t) => 2 * bump(t) }, { kind: "dots", pts: [[0.5, 2]] }]} xTicks={[[0.5, "a"]]} yTicks={[[2, "2A"]]} />
        </Panel>
      </Row>
    ),
  },
  "sig-shift": {
    wide: true,
    caption: "x(t − 2) is a delay (move right by 2). x(t + 3) is an advance (move left by 3). The shape and height never change.",
    node: (
      <Row>
        <Panel title="Delay: x(t) → x(t − 2)">
          <Graph x={[-1, 5]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: bump, tone: "muted", dashed: true }, { kind: "fn", f: (t) => bump(t - 2) }, { kind: "arrow", from: [0.6, 1.12], to: [2.4, 1.12], label: "+2" }]} xTicks={[0, [0.5, "a"], [2.5, "a+2"]]} />
        </Panel>
        <Panel title="Advance: x(t) → x(t + 3)">
          <Graph x={[-4, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: bump, tone: "muted", dashed: true }, { kind: "fn", f: (t) => bump(t + 3) }, { kind: "arrow", from: [0.4, 1.12], to: [-2.4, 1.12], label: "−3" }]} xTicks={[[-2.5, "a−3"], 0, [0.5, "a"]]} />
        </Panel>
      </Row>
    ),
  },
  "sig-dshift": {
    wide: true,
    caption: "In discrete time a shift moves every sample to a new index. x[n − 4] is x[n] delayed by four samples.",
    node: (
      <Row>
        <Panel title="x[n]">
          <Graph x={[-1.5, 8.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: [[0, 1], [1, 0.75], [2, 0.5], [3, 0.25]] }]} xTicks={[0, 4, 8]} />
        </Panel>
        <Panel title="x[n − 4]">
          <Graph x={[-1.5, 8.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: [[4, 1], [5, 0.75], [6, 0.5], [7, 0.25]] }]} xTicks={[0, 4, 8]} />
        </Panel>
      </Row>
    ),
  },
  "sig-reverse": {
    caption: "Time reversal mirrors the signal about t = 0: a feature at t = a appears at t = −a.",
    node: (
      <Graph width={420} x={[-3, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: bump, tone: "muted", dashed: true }, { kind: "fn", f: (t) => bump(-t) }, { kind: "text", at: [1.2, 1.1], text: "x(t)", tone: "muted" }, { kind: "text", at: [-1.2, 1.1], text: "x(−t)", tone: "accent" }]} xTicks={[[-0.5, "−a"], 0, [0.5, "a"]]} />
    ),
  },
  "sig-scaling": {
    wide: true,
    caption: "Scaling acts on the horizontal axis only. x(2t) is twice as fast (half as wide); x(t/2) is twice as slow (twice as wide).",
    node: (
      <Row cols={3}>
        <Panel title="x(t)">
          <Graph x={[-0.5, 4.5]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: bump }]} xTicks={[0, 2, 4]} />
        </Panel>
        <Panel title="x(2t)">
          <Graph x={[-0.5, 4.5]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => bump(2 * t) }]} xTicks={[0, 1, 2, 4]} />
        </Panel>
        <Panel title="x(t/2)">
          <Graph x={[-0.5, 4.5]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => bump(t / 2) }]} xTicks={[0, 2, 4]} />
        </Panel>
      </Row>
    ),
  },
  "sig-order": {
    wide: true,
    caption: "Order matters. Shifting first and then compressing gives x(2t + 3). Compressing first and then shifting gives x(2(t + 3)) = x(2t + 6), a different signal.",
    node: (
      <Row>
        <Panel title="shift then compress: x(2t + 3)">
          <Graph x={[-4, 2]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: bump, tone: "muted", dashed: true }, { kind: "fn", f: (t) => bump(2 * t + 3) }]} xTicks={[-3, [-1.5, "−1.5"], 0, 2]} />
        </Panel>
        <Panel title="compress then shift: x(2t + 6)">
          <Graph x={[-4, 2]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: bump, tone: "muted", dashed: true }, { kind: "fn", f: (t) => bump(2 * t + 6) }]} xTicks={[-3, [-1.5, "−1.5"], 0, 2]} />
        </Panel>
      </Row>
    ),
  },
  "sig-recipe": {
    wide: true,
    caption: "The recipe in action for x(−3t + 2): shift left by 2, reverse, then compress by 3. Write down each intermediate signal before moving on.",
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-3, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: xs, n: 600 }]} xTicks={[-2, -1, 0, 1, 2]} yTicks={[1]} />
        </Panel>
        <Panel title="Step 1 · x(t + 2)">
          <Graph x={[-3, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => xs(t + 2), n: 600 }]} xTicks={[-2, -1, 0, 1, 2]} yTicks={[1]} />
        </Panel>
        <Panel title="Step 2 · x(−t + 2)">
          <Graph x={[-3, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => xs(-t + 2), n: 600 }]} xTicks={[-2, -1, 0, 1, 2]} yTicks={[1]} />
        </Panel>
        <Panel title="Step 3 · x(−3t + 2)">
          <Graph x={[-3, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => xs(-3 * t + 2), n: 900 }]} xTicks={[-1, [1 / 3, "⅓"], [2 / 3, "⅔"], 1]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "sig-even-odd": {
    wide: true,
    caption: "Even signals are mirror images about the vertical axis (cos t). Odd signals flip sign across the origin (sin t) and must pass through 0 at t = 0.",
    node: (
      <Row>
        <Panel title="Even: x(−t) = x(t)">
          <Graph x={[-7, 7]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: Math.cos }]} xTicks={[[-PI, "−π"], [PI, "π"]]} yTicks={[1, -1]} />
        </Panel>
        <Panel title="Odd: x(−t) = −x(t)">
          <Graph x={[-7, 7]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: Math.sin }]} xTicks={[[-PI, "−π"], [PI, "π"]]} yTicks={[1, -1]} />
        </Panel>
      </Row>
    ),
  },
  "sig-eo-ct": {
    wide: true,
    caption: "x(t) = t + 1 on [−1, 1]. Reflect to get x(−t) = 1 − t. Averaging gives the even part xₑ(t) = 1; half the difference gives the odd part xₒ(t) = t.",
    node: (
      <Row>
        <Panel title="x(t) and x(−t)">
          <Graph
            x={[-2, 2]}
            y={[-1.3, 2.4]}
            items={[
              { kind: "path", pts: [[-2, 0], [-1, 0]], tone: "accent" },
              { kind: "path", pts: [[-1, 0], [1, 2], [1, 0], [2, 0]] },
              { kind: "path", pts: [[-2, 0], [-1, 0], [-1, 2], [1, 0], [2, 0]], tone: "second", dashed: true },
              { kind: "text", at: [0.75, 2.05], text: "x(t)", tone: "accent" },
              { kind: "text", at: [-0.75, 2.05], text: "x(−t)", tone: "second" },
            ]}
            xTicks={[-1, 1]}
            yTicks={[1, 2]}
          />
        </Panel>
        <Panel title="xₑ(t) = 1 and xₒ(t) = t">
          <Graph
            x={[-2, 2]}
            y={[-1.3, 2.4]}
            items={[
              { kind: "path", pts: [[-2, 0], [-1, 0], [-1, 1], [1, 1], [1, 0], [2, 0]] },
              { kind: "path", pts: [[-2, 0], [-1, 0], [-1, -1], [1, 1], [1, 0], [2, 0]], tone: "second" },
              { kind: "text", at: [0, 1.3], text: "xₑ", tone: "accent" },
              { kind: "text", at: [0.75, 0.35], text: "xₒ", tone: "second" },
            ]}
            xTicks={[-1, 1]}
            yTicks={[1, -1]}
          />
        </Panel>
      </Row>
    ),
  },
  "sig-eo-dt": {
    wide: true,
    caption: "Even and odd parts of the unit step u[n]. The even part is ½ everywhere except 1 at n = 0; the odd part is −½ for n < 0, 0 at n = 0 and +½ for n > 0.",
    node: (
      <Row cols={3}>
        <Panel title="u[n]">
          <Graph x={[-4.5, 4.5]} y={[-0.8, 1.3]} xLabel="n" items={[{ kind: "stems", pts: range(-4, 4).map((n) => [n, u(n)] as [number, number]) }]} xTicks={[-3, 0, 3]} />
        </Panel>
        <Panel title="even part">
          <Graph x={[-4.5, 4.5]} y={[-0.8, 1.3]} xLabel="n" items={[{ kind: "stems", pts: range(-4, 4).map((n) => [n, n === 0 ? 1 : 0.5] as [number, number]) }]} xTicks={[-3, 0, 3]} yTicks={[[0.5, "½"]]} />
        </Panel>
        <Panel title="odd part">
          <Graph x={[-4.5, 4.5]} y={[-0.8, 1.3]} xLabel="n" items={[{ kind: "stems", pts: range(-4, 4).filter((n) => n !== 0).map((n) => [n, n > 0 ? 0.5 : -0.5] as [number, number]) }]} xTicks={[-3, 0, 3]} yTicks={[[0.5, "½"], [-0.5, "−½"]]} />
        </Panel>
      </Row>
    ),
  },
}
