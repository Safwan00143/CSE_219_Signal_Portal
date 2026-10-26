import { Blocks, Graph, Panel, Row, range, u } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]
const seq = (start: number, vals: number[]): P[] => vals.map((v, i) => [start + i, v] as P)
const stems = (a: number, b: number, f: (n: number) => number): P[] => range(a, b).map((n) => [n, f(n)] as P)

/** One frame of a discrete convolution: x[k] fixed, the flipped and shifted h[n − k] overlaid. */
function slide(x: P[], h: number[], n: number, xr: [number, number], yr: [number, number], title: string, value: string) {
  const flipped = h.map((v, i) => [n - i, v] as P)
  return (
    <Panel title={`${title}   ${value}`}>
      <Graph
        x={xr}
        y={yr}
        xLabel="k"
        items={[
          { kind: "stems", pts: x },
          { kind: "stems", pts: flipped.map(([k, v]) => [k + 0.18, v] as P), tone: "second" },
        ]}
        xTicks={range(Math.ceil(xr[0]), Math.floor(xr[1])).filter((k) => k % 1 === 0)}
      />
    </Panel>
  )
}

const io = (input: string, output: string, box = "S", sub?: string) => (
  <Blocks
    width={420}
    height={70}
    nodes={[
      { id: "in", x: 50, y: 35, shape: "text", label: input },
      { id: "s", x: 210, y: 35, label: box, sub, w: 110, h: 44 },
      { id: "out", x: 370, y: 35, shape: "text", label: output },
    ]}
    wires={[
      { pts: [[92, 35], [155, 35]] },
      { pts: [[265, 35], [328, 35]] },
    ]}
  />
)

export const ltiFigures: FigureMap = {
  "lti-system": {
    caption: "A system takes a whole input signal and produces a whole output signal.",
    node: io("x(t)", "y(t)", "System S"),
  },
  "lti-linear": {
    wide: true,
    caption: "Linearity: scaling the input scales the output by the same factor, and adding inputs adds the outputs.",
    node: (
      <Row>
        <Panel title="homogeneity">
          <div className="space-y-1">
            {io("x(t)", "y(t)")}
            {io("a·x(t)", "a·y(t)")}
          </div>
        </Panel>
        <Panel title="additivity">
          <div className="space-y-1">
            {io("x₁(t)", "y₁(t)")}
            {io("x₁(t) + x₂(t)", "y₁(t) + y₂(t)")}
          </div>
        </Panel>
      </Row>
    ),
  },
  "lti-ti": {
    caption: "Time invariance: delaying the input by t₀ only delays the output by the same t₀. The system behaves the same today as tomorrow.",
    node: (
      <div className="space-y-1">
        {io("x(t)", "y(t)")}
        {io("x(t − t₀)", "y(t − t₀)")}
      </div>
    ),
  },
  "lti-poly": {
    wide: true,
    caption: "The coefficient sequences of A(z) = 1 + 3z + 2z² + 5z³ + 4z⁴ and B(z) = 2 − z + 4z² + z³ + 3z⁴.",
    node: (
      <Row>
        <Panel title="a[k]">
          <Graph x={[-0.8, 4.8]} y={[-1.6, 5.8]} xLabel="k" items={[{ kind: "stems", pts: seq(0, [1, 3, 2, 5, 4]), values: true }]} xTicks={[0, 1, 2, 3, 4]} />
        </Panel>
        <Panel title="b[k]">
          <Graph x={[-0.8, 4.8]} y={[-1.6, 5.8]} xLabel="k" items={[{ kind: "stems", pts: seq(0, [2, -1, 4, 1, 3]), values: true, tone: "second" }]} xTicks={[0, 1, 2, 3, 4]} />
        </Panel>
      </Row>
    ),
  },
  "lti-reflect": {
    wide: true,
    caption: "c[n] = Σ a[k] b[n − k]. Reflect b, slide it to position n, multiply the samples that line up vertically, and add. Shown: n = 0, 2 and 4 (sage = a[k], ochre = b[n − k]).",
    node: (
      <Row cols={3}>
        {slide(seq(0, [1, 3, 2, 5, 4]), [2, -1, 4, 1, 3], 0, [-4.6, 4.6], [-1.6, 5.8], "n = 0", "c[0] = 2")}
        {slide(seq(0, [1, 3, 2, 5, 4]), [2, -1, 4, 1, 3], 2, [-4.6, 4.6], [-1.6, 5.8], "n = 2", "c[2] = 5")}
        {slide(seq(0, [1, 3, 2, 5, 4]), [2, -1, 4, 1, 3], 4, [-4.6, 4.6], [-1.6, 5.8], "n = 4", "c[4] = 17")}
      </Row>
    ),
  },
  "lti-practice": {
    wide: true,
    caption: "x = {1, 2, 1, 1} and h = {1, 1, −1, 2}. Each frame shows x[k] (sage) and h[n − k] (ochre); the sum of vertical products is y[n].",
    node: (
      <Row cols={3}>
        {slide(seq(0, [1, 2, 1, 1]), [1, 1, -1, 2], 0, [-3.6, 6.6], [-1.5, 2.6], "n = 0", "y = 1")}
        {slide(seq(0, [1, 2, 1, 1]), [1, 1, -1, 2], 1, [-3.6, 6.6], [-1.5, 2.6], "n = 1", "y = 3")}
        {slide(seq(0, [1, 2, 1, 1]), [1, 1, -1, 2], 2, [-3.6, 6.6], [-1.5, 2.6], "n = 2", "y = 2")}
        {slide(seq(0, [1, 2, 1, 1]), [1, 1, -1, 2], 3, [-3.6, 6.6], [-1.5, 2.6], "n = 3", "y = 2")}
        {slide(seq(0, [1, 2, 1, 1]), [1, 1, -1, 2], 4, [-3.6, 6.6], [-1.5, 2.6], "n = 4", "y = 4")}
        {slide(seq(0, [1, 2, 1, 1]), [1, 1, -1, 2], 6, [-3.6, 6.6], [-1.5, 2.6], "n = 6", "y = 2")}
      </Row>
    ),
  },
  "lti-practice-result": {
    caption: "The final output y[n] = {1, 3, 2, 2, 4, 1, 2}. Its length is 4 + 4 − 1 = 7.",
    node: <Graph width={400} x={[-1, 7.5]} y={[-0.5, 4.8]} xLabel="n" items={[{ kind: "stems", pts: seq(0, [1, 3, 2, 2, 4, 1, 2]), values: true }]} xTicks={[0, 1, 2, 3, 4, 5, 6]} />,
  },
  "lti-impulse-response": {
    caption: "The impulse response h[n] is the system's output when the input is a single impulse δ[n]. For an LTI system it is the system's complete signature.",
    node: io("δ[n]", "h[n]", "LTI system"),
  },
  "lti-echo": {
    wide: true,
    caption: "Toy echo systems. h[n] = u[n]: one 'hello' produces equal echoes forever. h[n] = αⁿu[n]: each echo keeps a fraction α of the previous one; large α fades slowly, small α fades fast.",
    node: (
      <Row cols={3}>
        <Panel title="h[n] = u[n]">
          <Graph x={[-2.5, 8.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: stems(-2, 8, u) }]} xTicks={[0, 4, 8]} />
        </Panel>
        <Panel title="α = 0.9: slow fading">
          <Graph x={[-2.5, 8.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: stems(-2, 8, (n) => (n >= 0 ? 0.9 ** n : 0)) }]} xTicks={[0, 4, 8]} />
        </Panel>
        <Panel title="α = 0.3: fast fading">
          <Graph x={[-2.5, 8.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: stems(-2, 8, (n) => (n >= 0 ? 0.3 ** n : 0)) }]} xTicks={[0, 4, 8]} />
        </Panel>
      </Row>
    ),
  },
  "lti-delay": {
    wide: true,
    caption: "A pure delay of 3 samples: an impulse in gives a delayed impulse out, so h[n] = δ[n − 3] (and h(t) = δ(t − 3) in continuous time).",
    node: (
      <Row>
        <Panel title="input δ[n]">
          <Graph x={[-1.5, 5.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: [[0, 1]] }]} xTicks={[0, 1, 2, 3]} />
        </Panel>
        <Panel title="output δ[n − 3]">
          <Graph x={[-1.5, 5.5]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: [[3, 1]] }]} xTicks={[0, 1, 2, 3]} />
        </Panel>
      </Row>
    ),
  },
  "lti-decompose": {
    wide: true,
    caption: "x[n] = δ[n] + 2δ[n − 1] − δ[n − 2] + δ[n − 3] through the echo system h[n] = u[n]. Each scaled, shifted impulse produces a scaled, shifted copy of h; adding the four copies gives y[n].",
    node: (
      <Row>
        <Panel title="input x[n]">
          <Graph x={[-1.5, 5.5]} y={[-1.5, 3.6]} xLabel="n" items={[{ kind: "stems", pts: seq(0, [1, 2, -1, 1]), values: true }]} xTicks={[0, 1, 2, 3, 4, 5]} />
        </Panel>
        <Panel title="the four responses">
          <Graph
            x={[-1.5, 5.5]}
            y={[-1.5, 3.6]}
            xLabel="n"
            items={[
              { kind: "stems", pts: stems(0, 5, () => 1).map(([n, v]) => [n - 0.24, v] as P) },
              { kind: "stems", pts: stems(1, 5, () => 2).map(([n, v]) => [n - 0.08, v] as P), tone: "second" },
              { kind: "stems", pts: stems(2, 5, () => -1).map(([n, v]) => [n + 0.08, v] as P), tone: "muted" },
              { kind: "stems", pts: stems(3, 5, () => 1).map(([n, v]) => [n + 0.24, v] as P), tone: "ink" },
            ]}
            xTicks={[0, 1, 2, 3, 4, 5]}
          />
        </Panel>
        <Panel title="output y[n] = u[n] + 2u[n−1] − u[n−2] + u[n−3]">
          <Graph x={[-1.5, 5.5]} y={[-1.5, 3.6]} xLabel="n" items={[{ kind: "stems", pts: seq(0, [1, 3, 2, 3, 3, 3]), values: true }]} xTicks={[0, 1, 2, 3, 4, 5]} />
        </Panel>
      </Row>
    ),
  },
  "lti-ct-conv": {
    caption: "Continuous convolution at one fixed t: slide h(t − τ) along the τ axis and integrate the product over the overlap (shaded).",
    node: (
      <Graph
        width={440}
        x={[-2.5, 4.5]}
        y={[-0.2, 1.4]}
        xLabel="τ"
        items={[
          { kind: "fn", f: (t) => (t >= 0 && t <= 3 ? 1 - t / 4 : 0), n: 400 },
          { kind: "fn", f: (t) => (t <= 1.6 && t >= -1 ? 0.8 : 0), tone: "second", n: 600 },
          { kind: "fn", f: (t) => (t >= 0 && t <= 1.6 ? Math.min(1 - t / 4, 0.8) : 0), tone: "accent", area: true, width: 0, n: 400 },
          { kind: "text", at: [2.7, 0.55], text: "x(τ)", tone: "accent" },
          { kind: "text", at: [-0.6, 0.95], text: "h(t − τ)", tone: "second" },
          { kind: "text", at: [0.8, 0.3], text: "overlap" },
        ]}
        xTicks={[0, [1.6, "t"]]}
      />
    ),
  },
  "conv-ex22": {
    wide: true,
    caption: "Example 2.2: x[k] = 0.5δ[k] + 2δ[k − 1] (sage) and h[k] = 1 for 0 ≤ k ≤ 2. The reflected h[n − k] (ochre) slides right; the overlap grows, stays, then shrinks.",
    node: (
      <Row cols={3}>
        {slide(seq(0, [0.5, 2]), [1, 1, 1], -1, [-4.5, 4.5], [-0.2, 2.4], "n < 0", "y = 0")}
        {slide(seq(0, [0.5, 2]), [1, 1, 1], 0, [-4.5, 4.5], [-0.2, 2.4], "n = 0", "y = 0.5")}
        {slide(seq(0, [0.5, 2]), [1, 1, 1], 1, [-4.5, 4.5], [-0.2, 2.4], "n = 1", "y = 2.5")}
        {slide(seq(0, [0.5, 2]), [1, 1, 1], 2, [-4.5, 4.5], [-0.2, 2.4], "n = 2", "y = 2.5")}
        {slide(seq(0, [0.5, 2]), [1, 1, 1], 3, [-4.5, 4.5], [-0.2, 2.4], "n = 3", "y = 2")}
        <Panel title="result y[n]">
          <Graph x={[-2.5, 4.5]} y={[-0.2, 3.1]} xLabel="n" items={[{ kind: "stems", pts: seq(0, [0.5, 2.5, 2.5, 2]), values: true }]} xTicks={[0, 1, 2, 3]} />
        </Panel>
      </Row>
    ),
  },
  "conv-ex23": {
    wide: true,
    caption: "Example 2.3: x[k] = αᵏu[k] with h[n − k] = u[n − k], which is 1 for k ≤ n. For n ≥ 0 the overlap is 0 ≤ k ≤ n (shaded). The output rises toward 1/(1 − α).",
    node: (
      <Row>
        <Panel title="overlap for a fixed n ≥ 0">
          <Graph x={[-4.5, 10.5]} y={[-0.2, 1.35]} xLabel="k" items={[{ kind: "band", from: -0.4, to: 5.4, label: "0 ≤ k ≤ n" }, { kind: "stems", pts: stems(-4, 10, (k) => (k >= 0 ? 0.8 ** k : 0)) }, { kind: "path", pts: [[-4.5, 1.12], [5, 1.12], [5, 0]], tone: "second", dashed: true }]} xTicks={[0, [5, "n"], 10]} />
        </Panel>
        <Panel title="y[n] = (1 − αⁿ⁺¹)/(1 − α) · u[n]   (α = 0.8)">
          <Graph x={[-3.5, 20.5]} y={[-0.4, 5.6]} xLabel="n" items={[{ kind: "hline", y: 5, label: "1/(1−α)" }, { kind: "stems", pts: stems(-3, 20, (n) => (n >= 0 ? (1 - 0.8 ** (n + 1)) / 0.2 : 0)) }]} xTicks={[0, 5, 10, 15, 20]} />
        </Panel>
      </Row>
    ),
  },
  "conv-ex25": {
    wide: true,
    caption: "Example 2.5: x[k] = 2ᵏu[−k] (left-sided) with h[n − k] = u[n − k]. For n < 0 the sum stops at k = n and gives 2ⁿ⁺¹; for n ≥ 0 every sample of x overlaps and the sum is 2.",
    node: (
      <Row>
        <Panel title="n < 0: overlap k ≤ n">
          <Graph x={[-8.5, 4.5]} y={[-0.2, 1.35]} xLabel="k" items={[{ kind: "band", from: -8.5, to: -2.6, label: "k ≤ n" }, { kind: "stems", pts: stems(-8, 4, (k) => (k <= 0 ? 2 ** k : 0)) }]} xTicks={[[-3, "n"], 0, 4]} />
        </Panel>
        <Panel title="y[n]">
          <Graph x={[-8.5, 6.5]} y={[-0.2, 2.5]} xLabel="n" items={[{ kind: "stems", pts: stems(-8, 6, (n) => (n < 0 ? 2 ** (n + 1) : 2)) }]} xTicks={[-8, -4, 0, 4]} yTicks={[2]} />
        </Panel>
      </Row>
    ),
  },
  "conv-ex26": {
    wide: true,
    caption: "Example 2.6: x(τ) = e^(−aτ)u(τ) and h(t − τ) = u(t − τ). For t > 0 the overlap is 0 < τ < t; the integral rises toward 1/a.",
    node: (
      <Row>
        <Panel title="overlap 0 < τ < t">
          <Graph x={[-2, 5]} y={[-0.2, 1.4]} xLabel="τ" items={[{ kind: "fn", f: (t) => (t >= 0 ? Math.exp(-0.8 * t) : 0), area: false, n: 400 }, { kind: "fn", f: (t) => (t >= 0 && t <= 2.2 ? Math.exp(-0.8 * t) : 0), area: true, width: 0, n: 400 }, { kind: "path", pts: [[-2, 1.15], [2.2, 1.15], [2.2, 0]], tone: "second", dashed: true }, { kind: "text", at: [3.6, 0.35], text: "e^(−aτ)", tone: "accent" }]} xTicks={[0, [2.2, "t"]]} />
        </Panel>
        <Panel title="y(t) = (1/a)(1 − e^(−at)) u(t)">
          <Graph x={[-2, 8]} y={[-0.2, 1.6]} items={[{ kind: "hline", y: 1.25, label: "1/a" }, { kind: "path", pts: [[-2, 0], [0, 0]] }, { kind: "fn", f: (t) => 1.25 * (1 - Math.exp(-0.8 * t)), from: 0 }]} xTicks={[0]} />
        </Panel>
      </Row>
    ),
  },
  "conv-ex210": {
    caption: "Example 2.10: x[n] = (½)ⁿu[n] + 2ⁿu[−n] with h[n] = u[n]. Split, convolve each part, add. The left side rises like 2ⁿ⁺¹; the right side climbs toward 4.",
    node: <Graph width={440} x={[-6.5, 8.5]} y={[-0.3, 4.6]} xLabel="n" items={[{ kind: "hline", y: 4, label: "4" }, { kind: "stems", pts: stems(-6, 8, (n) => (n < 0 ? 2 ** (n + 1) : 4 - 2 ** -n)) }]} xTicks={[-6, -3, 0, 3, 6]} yTicks={[1, 2, 3]} />,
  },
  "conv-two-exp": {
    wide: true,
    caption: "x(t) = eᵗu(−t) and h(t) = e⁻ᵗu(t). The overlap is τ ≤ min(0, t). Both cases give the same shape mirrored, so y(t) = ½e^(−|t|).",
    node: (
      <Row>
        <Panel title="t < 0: overlap −∞ < τ ≤ t">
          <Graph x={[-4, 3]} y={[-0.2, 1.4]} xLabel="τ" items={[{ kind: "fn", f: (t) => (t <= 0 ? Math.exp(t) : 0) }, { kind: "fn", f: (t) => (t <= -1 ? Math.exp(-(-1 - t)) : 0), tone: "second" }, { kind: "fn", f: (t) => (t <= -1 ? Math.min(Math.exp(t), Math.exp(t + 1)) : 0), area: true, width: 0 }]} xTicks={[[-1, "t"], 0]} />
        </Panel>
        <Panel title="result y(t) = ½e^(−|t|)">
          <Graph x={[-4, 4]} y={[-0.1, 0.7]} items={[{ kind: "fn", f: (t) => 0.5 * Math.exp(-Math.abs(t)) }]} yTicks={[[0.5, "½"]]} />
        </Panel>
      </Row>
    ),
  },

  /* ───── causality and stability ───── */
  "cs-causal": {
    wide: true,
    caption: "Causal: nothing happens before the impulse arrives at t = 0, so h(t) = 0 for t < 0. Non-causal: the effect starts before the cause.",
    node: (
      <Row>
        <Panel title="causal: h(t) = 0 for t < 0">
          <Graph x={[-2, 4]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [0, 0]] }, { kind: "fn", f: (t) => Math.exp(-t), from: 0 }]} xTicks={[0]} />
        </Panel>
        <Panel title="non-causal: effect before cause">
          <Graph x={[-3, 3]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-(t * t)) }, { kind: "band", from: -3, to: 0, tone: "second", label: "t < 0" }]} xTicks={[0]} />
        </Panel>
      </Row>
    ),
  },
  "cs-bibo": {
    wide: true,
    caption: "Stability: a bounded input (|x| ≤ B always) must give a bounded output. An unstable system turns a bounded input into an output that grows without limit.",
    node: (
      <Row>
        <Panel title="stable: bounded output">
          <Graph x={[0, 10]} y={[-1.6, 1.6]} items={[{ kind: "hline", y: 1.2, label: "B" }, { kind: "hline", y: -1.2, label: "−B" }, { kind: "fn", f: (t) => 0.9 * Math.sin(1.6 * t) * (1 - Math.exp(-t)) }]} />
        </Panel>
        <Panel title="unstable: keeps growing">
          <Graph x={[0, 10]} y={[-1.6, 1.6]} items={[{ kind: "fn", f: (t) => 0.12 * t * Math.sin(1.6 * t) }]} />
        </Panel>
      </Row>
    ),
  },
  "cs-periodic": {
    caption: "A periodic h(t) that is non-zero at some t₀ > 0 repeats the same value at t₀ − T, t₀ − 2T, … which eventually lands at negative time. So no non-zero periodic h can be causal, and its area over infinitely many periods is infinite, so it cannot be stable either.",
    node: <Graph width={440} x={[-6, 6]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => Math.sin(1.5 * t) }, { kind: "band", from: -6, to: 0, tone: "second", label: "forced into t < 0" }]} xTicks={[0]} />,
  },
  "cs-h1h2": {
    wide: true,
    caption: "h₁(t) = e²ᵗu(−2 − t) lives only at t ≤ −2: not causal, but its total area ½e⁻⁴ is finite, so it is stable. h₂(t) = te⁻ᵗu(t) is zero for t < 0 (causal) and has area 1 (stable).",
    node: (
      <Row>
        <Panel title="h₁(t) = e²ᵗ u(−2 − t)   (vertical scale enlarged)">
          <Graph x={[-6, 2]} y={[-0.003, 0.022]} items={[{ kind: "fn", f: (t) => (t <= -2 ? Math.exp(2 * t) : 0), n: 600 }]} xTicks={[-4, -2, 0]} yTicks={[[Math.exp(-4), "e⁻⁴"]]} />
        </Panel>
        <Panel title="h₂(t) = t e⁻ᵗ u(t)">
          <Graph x={[-1, 8]} y={[-0.05, 0.48]} items={[{ kind: "fn", f: (t) => (t >= 0 ? t * Math.exp(-t) : 0), area: true }]} xTicks={[0, 1, 4]} yTicks={[[1 / Math.E, "1/e"]]} />
        </Panel>
      </Row>
    ),
  },
  "cs-delay": {
    wide: true,
    caption: "x(t) = e^(−2t)u(t + 2) starts at t = −2. Shifting it right by a moves the start to −2 + a; it is causal once −2 + a ≥ 0, i.e. a ≥ 2.",
    node: (
      <Row>
        <Panel title="x(t) = e^(−2t) u(t + 2)">
          <Graph x={[-3, 3]} y={[-5, 60]} items={[{ kind: "path", pts: [[-3, 0], [-2, 0]] }, { kind: "fn", f: (t) => Math.exp(-2 * t), from: -2 }]} xTicks={[-2, 0, 2]} />
        </Panel>
        <Panel title="y(t) = x(t − 2): starts at 0">
          <Graph x={[-3, 3]} y={[-5, 60]} items={[{ kind: "path", pts: [[-3, 0], [0, 0]] }, { kind: "fn", f: (t) => Math.exp(-2 * (t - 2)), from: 0 }]} xTicks={[-2, 0, 2]} />
        </Panel>
      </Row>
    ),
  },
}
