import { Graph, Panel, PI, Row, range } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]
const r = String.raw
const ex = (t: number) => 1 + Math.sin(t) + 2 * Math.cos(t) + Math.cos(2 * t + PI / 4)
const sq = (t: number, T: number, T1: number) => {
  const m = ((t % T) + T + T / 2) % T - T / 2
  return Math.abs(m) < T1 ? 1 : 0
}
const partial = (t: number, N: number) => {
  // square wave, T1 = T/4, T = 2π (ω0 = 1)
  let s = 0.5
  for (let k = 1; k <= N; k++) s += ((2 * Math.sin((k * PI) / 2)) / (k * PI)) * Math.cos(k * t)
  return s
}

export const fourierSeriesFigures: FigureMap = {
  "fs-decompose": {
    wide: true,
    caption: "A complicated periodic signal (top left) is a sum of simple waves at the fundamental frequency and its multiples: here sin ω₀t, sin 2ω₀t and cos 3ω₀t.",
    node: (
      <Row>
        <Panel title="x(t) = sin ω₀t + 0.6 sin 2ω₀t + 0.4 cos 3ω₀t">
          <Graph x={[0, 13]} y={[-2, 2]} items={[{ kind: "fn", f: (t) => Math.sin(t) + 0.6 * Math.sin(2 * t) + 0.4 * Math.cos(3 * t), n: 500 }]} xTicks={[[2 * PI, "T"], [4 * PI, "2T"]]} />
        </Panel>
        <Panel title="the three ingredients">
          <Graph
            x={[0, 13]}
            y={[-2, 2]}
            items={[
              { kind: "fn", f: Math.sin, tone: "accent", width: 1.6 },
              { kind: "fn", f: (t) => 0.6 * Math.sin(2 * t), tone: "second", width: 1.6 },
              { kind: "fn", f: (t) => 0.4 * Math.cos(3 * t), tone: "muted", width: 1.6, n: 500 },
            ]}
            xTicks={[[2 * PI, "T"], [4 * PI, "2T"]]}
          />
        </Panel>
      </Row>
    ),
  },
  "fs-bells": {
    caption: "Bell A rings every 2 min, B every 3 min, C every 5 min. The combined pattern repeats after lcm(2, 3, 5) = 30 minutes. In frequency terms, each bell's rate is a whole multiple of the combined rate.",
    node: (
      <Graph
        width={460}
        height={150}
        x={[-1, 32]}
        y={[0, 3.6]}
        noYAxis
        xLabel="min"
        items={[
          { kind: "dots", pts: range(0, 15).map((k) => [2 * k, 3] as P) },
          { kind: "dots", pts: range(0, 10).map((k) => [3 * k, 2] as P), tone: "second" },
          { kind: "dots", pts: range(0, 6).map((k) => [5 * k, 1] as P), tone: "ink" },
          { kind: "text", at: [-0.5, 3], text: "A", anchor: "end", dx: -4, dy: 4 },
          { kind: "text", at: [-0.5, 2], text: "B", anchor: "end", dx: -4, dy: 4 },
          { kind: "text", at: [-0.5, 1], text: "C", anchor: "end", dx: -4, dy: 4 },
          { kind: "vline", x: 30, tone: "accent", label: "all ring together" },
        ]}
        xTicks={[0, 6, 12, 18, 24, 30]}
      />
    ),
  },
  "fs-harmonics": {
    caption: "For a period-T signal the allowed building blocks are e^(jkω₀t) at the frequencies kω₀, ω₀ = 2π/T. Negative k rotate backward, k = 0 is the constant part, positive k rotate forward.",
    node: (
      <Graph
        width={460}
        x={[-4.6, 4.6]}
        y={[-0.3, 1.3]}
        xLabel="ω"
        noYAxis
        items={[
          { kind: "stems", pts: range(-4, 4).map((k) => [k, 1] as P), tone: "muted" },
          { kind: "text", at: [-2.5, 1.2], text: "negative harmonics", tone: "muted" },
          { kind: "text", at: [2.5, 1.2], text: "positive harmonics", tone: "muted" },
        ]}
        xTicks={[[-4, "−4ω₀"], [-3, "−3ω₀"], [-2, "−2ω₀"], [-1, "−ω₀"], [0, "0"], [1, "ω₀"], [2, "2ω₀"], [3, "3ω₀"], [4, "4ω₀"]]}
      />
    ),
  },
  "fs-cos-lines": {
    caption: r`$\cos\omega_0 t=\tfrac12e^{j\omega_0t}+\tfrac12e^{-j\omega_0t}$: only the components at $\pm\omega_0$ are present, each with coefficient ½.`,
    node: <Graph width={400} x={[-3.6, 3.6]} y={[-0.15, 0.7]} xLabel="k" yLabel="aₖ" items={[{ kind: "stems", pts: [[-1, 0.5], [1, 0.5]], values: true }, { kind: "stems", pts: [[-3, 0], [-2, 0], [0, 0], [2, 0], [3, 0]], tone: "muted" }]} xTicks={[-3, -2, -1, 0, 1, 2, 3]} />,
  },
  "fs-average": {
    wide: true,
    caption: "Averaging over one period: a rotating exponential (shown through its real part cos kω₀t) has equal positive and negative area and averages to 0. Only the non-rotating constant survives.",
    node: (
      <Row>
        <Panel title="cos ω₀t over one period: average 0">
          <Graph x={[0, 2 * PI]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: Math.cos, area: true }]} xTicks={[[PI, "T/2"], [2 * PI, "T"]]} />
        </Panel>
        <Panel title="the constant 1: average 1">
          <Graph x={[0, 2 * PI]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: () => 1, area: true }]} xTicks={[[PI, "T/2"], [2 * PI, "T"]]} />
        </Panel>
      </Row>
    ),
  },
  "fs-shift-to-zero": {
    wide: true,
    caption: "To extract aₖ, multiply by e^(−jkω₀t). This slides the whole line spectrum left by k, so the wanted coefficient lands at zero frequency, where it stops rotating. Averaging then removes everything else.",
    node: (
      <Row>
        <Panel title="before: aₖ sits at kω₀ (k = 2)">
          <Graph x={[-3.6, 3.6]} y={[-0.2, 1.3]} xLabel="k" noYAxis items={[{ kind: "stems", pts: [[-3, 0.3], [-2, 0.5], [-1, 0.7], [0, 0.9], [1, 0.7], [3, 0.3]], tone: "muted" }, { kind: "stems", pts: [[2, 1]] }]} xTicks={[-3, -2, -1, 0, 1, 2, 3]} />
        </Panel>
        <Panel title="after × e^(−j2ω₀t): a₂ at zero">
          <Graph x={[-3.6, 3.6]} y={[-0.2, 1.3]} xLabel="k" noYAxis items={[{ kind: "stems", pts: [[-3, 0.7], [-2, 0.9], [-1, 0.7], [1, 0.3]], tone: "muted" }, { kind: "stems", pts: [[0, 1]] }]} xTicks={[-3, -2, -1, 0, 1, 2, 3]} />
        </Panel>
      </Row>
    ),
  },
  "fs-example-signal": {
    caption: "x(t) = 1 + sin ω₀t + 2cos ω₀t + cos(2ω₀t + π/4), two periods.",
    node: <Graph width={440} x={[-2 * PI - 0.2, 2 * PI + 0.2]} y={[-2.6, 4.6]} items={[{ kind: "fn", f: ex, n: 500 }]} xTicks={[[-2 * PI, "−T₀"], 0, [2 * PI, "T₀"]]} yTicks={[1]} />,
  },
  "fs-example-spectrum": {
    wide: true,
    caption: "Magnitude spectrum |aₖ| (even) and phase spectrum ∠aₖ (odd) of the example. |a₀| = 1, |a±₁| = √5/2, |a±₂| = ½; ∠a₁ = −tan⁻¹½, ∠a₂ = π/4.",
    node: (
      <Row>
        <Panel title="|aₖ|">
          <Graph x={[-3.6, 3.6]} y={[-0.2, 1.45]} xLabel="k" items={[{ kind: "stems", pts: [[-2, 0.5], [-1, Math.sqrt(5) / 2], [0, 1], [1, Math.sqrt(5) / 2], [2, 0.5]] }]} xTicks={[-3, -2, -1, 0, 1, 2, 3]} yTicks={[[0.5, "½"], [1, "1"], [Math.sqrt(5) / 2, "√5/2"]]} />
        </Panel>
        <Panel title="∠aₖ">
          <Graph x={[-3.6, 3.6]} y={[-1, 1]} xLabel="k" items={[{ kind: "stems", pts: [[-2, -PI / 4], [-1, Math.atan(0.5)], [1, -Math.atan(0.5)], [2, PI / 4]], tone: "second" }]} xTicks={[-3, -2, -1, 1, 2, 3]} yTicks={[[PI / 4, "π/4"], [-PI / 4, "−π/4"]]} />
        </Panel>
      </Row>
    ),
  },
  "fs-square": {
    caption: "The periodic square wave: 1 for |t| < T₁, 0 for T₁ < |t| < T/2, repeating every T. Integrate over the convenient period −T/2 < t < T/2; only −T₁ < t < T₁ contributes.",
    node: <Graph width={460} x={[-2.3, 2.3]} y={[-0.25, 1.4]} items={[{ kind: "fn", f: (t) => sq(t, 1, 0.25), n: 1200 }, { kind: "band", from: -0.5, to: 0.5, tone: "muted", label: "one period" }]} xTicks={[[-2, "−2T"], [-1, "−T"], [-0.25, "−T₁"], [0.25, "T₁"], [1, "T"], [2, "2T"]]} yTicks={[1]} />,
  },
  "fs-square-coeffs": {
    caption: "Square-wave coefficients for T₁ = T/4: a₀ = ½ and aₖ = sin(kπ/2)/(kπ). The coefficients are samples of a sinc-shaped envelope (dashed); even harmonics land on its zeros.",
    node: (
      <Graph
        width={460}
        x={[-7.6, 7.6]}
        y={[-0.25, 0.62]}
        xLabel="k"
        yLabel="aₖ"
        items={[
          { kind: "fn", f: (k) => (Math.abs(k) < 1e-6 ? 0.5 : Math.sin((k * PI) / 2) / (k * PI)), dashed: true, tone: "muted", width: 1.2, n: 500 },
          { kind: "stems", pts: range(-7, 7).map((k) => [k, k === 0 ? 0.5 : Math.sin((k * PI) / 2) / (k * PI)] as P) },
        ]}
        xTicks={[-7, -5, -3, -1, 1, 3, 5, 7]}
        yTicks={[[0.5, "½"], [1 / PI, "1/π"], [-1 / (3 * PI), "−1/3π"]]}
      />
    ),
  },
  "fs-gibbs": {
    wide: true,
    caption: "Partial sums of the square wave's series with N = 1, 3, 9 and 41 harmonics. The approximation improves everywhere except next to the jumps, where an overshoot of about 9% remains: the Gibbs phenomenon.",
    node: (
      <Row>
        {[1, 3, 9, 41].map((N) => (
          <Panel key={N} title={`N = ${N}`}>
            <Graph x={[-PI, PI]} y={[-0.3, 1.3]} items={[{ kind: "fn", f: (t) => sq(t, 2 * PI, PI / 2), tone: "muted", width: 1, n: 800 }, { kind: "fn", f: (t) => partial(t, N), n: 800 }]} xTicks={[[-PI / 2, "−T₁"], [PI / 2, "T₁"]]} />
          </Panel>
        ))}
      </Row>
    ),
  },
  "fs-ramp": {
    caption: "The repeated triangular ramp: rises as t on 0 ≤ t < 1, falls as (3 − t)/2 on 1 ≤ t < 3, period T = 3. Its average height is the area of one triangle divided by the period: (3/2)/3 = ½.",
    node: <Graph width={460} x={[-3.4, 6.6]} y={[-0.2, 1.35]} items={[{ kind: "path", pts: [[-3, 0], [-2, 1], [0, 0], [1, 1], [3, 0], [4, 1], [6, 0]] }, { kind: "hline", y: 0.5, label: "a₀ = ½" }]} xTicks={[-3, 0, 1, 3, 4, 6]} yTicks={[1]} />,
  },

  /* ───── properties ───── */
  "fs-scaling-views": {
    wide: true,
    caption: "Time scaling x(αt) keeps the same coefficients aₖ against the index k (left), but on the true frequency axis the lines move to kαω₀ and spread apart when α > 1 (right).",
    node: (
      <Row>
        <Panel title="against index k: unchanged">
          <Graph x={[-3.6, 3.6]} y={[-0.2, 1.2]} xLabel="k" noYAxis items={[{ kind: "stems", pts: [[-3, 0.3], [-2, 0.5], [-1, 0.8], [0, 1], [1, 0.8], [2, 0.5], [3, 0.3]] }]} xTicks={[-3, -2, -1, 0, 1, 2, 3]} />
        </Panel>
        <Panel title="against ω: lines at kαω₀ (α = 2)">
          <Graph x={[-6.6, 6.6]} y={[-0.2, 1.2]} xLabel="ω" noYAxis items={[{ kind: "stems", pts: [[-3, 0.3], [-2, 0.5], [-1, 0.8], [0, 1], [1, 0.8], [2, 0.5], [3, 0.3]].map(([k, v]) => [2 * k, v] as P), tone: "second" }]} xTicks={[[-6, "−3αω₀"], [-2, "−αω₀"], [2, "αω₀"], [6, "3αω₀"]]} />
        </Panel>
      </Row>
    ),
  },
  "fs-derivative-sketch": {
    wide: true,
    caption: "A sawtooth with slope −1 that jumps up by 2 at every odd integer. Its derivative is the slope (−1) between jumps plus an impulse of strength 2 at each jump.",
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-2.6, 4.6]} y={[-1.4, 2.6]} items={[-3, -1, 1, 3].map((c) => ({ kind: "path", pts: [[c, 1], [c + 2, -1]] as P[] }))} xTicks={[-2, -1, 0, 1, 2, 3, 4]} yTicks={[1, -1]} />
        </Panel>
        <Panel title="dx/dt = −1 + 2Σ δ(t − (2m + 1))">
          <Graph x={[-2.6, 4.6]} y={[-1.4, 2.6]} items={[{ kind: "path", pts: [[-2.6, -1], [4.6, -1]], tone: "second" }, { kind: "impulses", pts: [[-1, 2, "2"], [1, 2, "2"], [3, 2, "2"]] }]} xTicks={[-2, -1, 0, 1, 2, 3, 4]} yTicks={[-1]} />
        </Panel>
      </Row>
    ),
  },
  "fs-sift": {
    caption: "Sifting: the impulse δ(t − a) only 'feels' the height of x(t) at the exact point where it stands, so ∫x(t)δ(t − a)dt = x(a), provided a lies inside the integration window.",
    node: <Graph width={420} x={[-1, 4]} y={[-0.2, 2.4]} items={[{ kind: "fn", f: (t) => 0.6 + 0.3 * t + 0.25 * Math.sin(2 * t) }, { kind: "impulses", pts: [[2, 1.8, "δ(t − a)"]], tone: "second" }, { kind: "dots", pts: [[2, 0.6 + 0.6 + 0.25 * Math.sin(4)]] }, { kind: "text", at: [2.15, 0.95], text: "x(a)", anchor: "start" }]} xTicks={[[2, "a"]]} />,
  },
  "fs-impulse-train": {
    wide: true,
    caption: "The impulse train Σδ(t − mT) and its Fourier coefficients: every aₖ equals 1/T. A train in time stays a train in frequency.",
    node: (
      <Row>
        <Panel title="x(t) = Σ δ(t − mT)">
          <Graph x={[-2.6, 3.6]} y={[-0.2, 1.4]} items={[{ kind: "impulses", pts: [-2, -1, 0, 1, 2, 3].map((m) => [m, 1] as P) }]} xTicks={[[-2, "−2T"], [-1, "−T"], 0, [1, "T"], [2, "2T"], [3, "3T"]]} />
        </Panel>
        <Panel title="aₖ = 1/T for every k">
          <Graph x={[-4.6, 4.6]} y={[-0.2, 1.4]} xLabel="k" items={[{ kind: "stems", pts: range(-4, 4).map((k) => [k, 0.8] as P) }]} xTicks={[-4, -2, 0, 2, 4]} yTicks={[[0.8, "1/T"]]} />
        </Panel>
      </Row>
    ),
  },
  "fs-rect-derivative": {
    wide: true,
    caption: "Differentiating the periodic rectangular pulse: each rising edge gives +δ, each falling edge gives −δ. In one period, dx/dt = δ(t + T₁) − δ(t − T₁).",
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-1.6, 1.6]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: (t) => sq(t, 1, 0.2), n: 1200 }]} xTicks={[[-1, "−T"], [-0.2, "−T₁"], [0.2, "T₁"], [1, "T"]]} />
        </Panel>
        <Panel title="dx/dt">
          <Graph x={[-1.6, 1.6]} y={[-1.4, 1.4]} items={[{ kind: "impulses", pts: [[-1.2, 1, "+1"], [-0.8, -1, "−1"], [-0.2, 1, "+1"], [0.2, -1, "−1"], [0.8, 1, "+1"], [1.2, -1, "−1"]] }]} xTicks={[[-1, "−T"], [-0.2, "−T₁"], [0.2, "T₁"], [1, "T"]]} />
        </Panel>
      </Row>
    ),
  },
  "fs-sawtooth": {
    wide: true,
    caption: "x(t) = t on 0 ≤ t < 1, period 1. Between jumps the slope is 1; at every integer it drops by 1. So dx/dt = 1 − Σδ(t − m).",
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-2.4, 4.4]} y={[-1.4, 1.4]} items={[-2, -1, 0, 1, 2, 3].map((c) => ({ kind: "path", pts: [[c, 0], [c + 1, 1]] as P[] }))} xTicks={[-2, -1, 0, 1, 2, 3, 4]} yTicks={[1]} />
        </Panel>
        <Panel title="dx/dt = 1 − Σ δ(t − m)">
          <Graph x={[-2.4, 4.4]} y={[-1.4, 1.4]} items={[{ kind: "path", pts: [[-2.4, 1], [4.4, 1]], tone: "second" }, { kind: "impulses", pts: [-2, -1, 0, 1, 2, 3, 4].map((m) => [m, -1] as P) }]} xTicks={[-2, -1, 0, 1, 2, 3, 4]} yTicks={[1, -1]} />
        </Panel>
      </Row>
    ),
  },
  "fs-square-signal": {
    wide: true,
    caption: "x(t) = 1 + cos ω₀t has a = {½, 1, ½}. Squaring the signal convolves the coefficients with themselves: c = {¼, 1, 3/2, 1, ¼}.",
    node: (
      <Row>
        <Panel title="aₖ of x(t)">
          <Graph x={[-2.8, 2.8]} y={[-0.2, 1.8]} xLabel="k" items={[{ kind: "stems", pts: [[-1, 0.5], [0, 1], [1, 0.5]], values: true }]} xTicks={[-2, -1, 0, 1, 2]} />
        </Panel>
        <Panel title="cₖ of x²(t) = (a ∗ a)ₖ">
          <Graph x={[-2.8, 2.8]} y={[-0.2, 1.8]} xLabel="k" items={[{ kind: "stems", pts: [[-2, 0.25], [-1, 1], [0, 1.5], [1, 1], [2, 0.25]], values: true, tone: "second" }]} xTicks={[-2, -1, 0, 1, 2]} />
        </Panel>
      </Row>
    ),
  },
}
