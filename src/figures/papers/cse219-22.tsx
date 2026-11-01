import { useId } from "react"
import { Blocks, Graph, Panel, PI, Plane, Row, sinc, tri } from "../kit"
import type { FigureMap } from "../figure"
import { at, r, stems, type P } from "../book/util"

/* Figures for the CSE 219 term final of the 22 batch (L-2/T-II, 2023–24). */

const nsinc = (x: number) => sinc(PI * x)
const triPts = (c: number, half: number): P[] => [[c - half, 0], [c, 1], [c + half, 0]]

/** Odd square wave of period 1 and height ±1, delayed by `shift`, as a path with vertical jumps. */
function square(shift: number, from: number, to: number): P[] {
  const v = (t: number) => (((((t - shift) % 1) + 1) % 1) < 0.5 ? 1 : -1)
  const pts: P[] = [[from, v(from + 1e-6)]]
  const first = Math.ceil((from - shift) / 0.5) * 0.5 + shift
  for (let b = first; b < to; b += 0.5) {
    if (b <= from) continue
    pts.push([b, v(b - 1e-6)], [b, v(b + 1e-6)])
  }
  pts.push([to, v(to - 1e-6)])
  return pts
}

/** Samples used to compare the reconstruction methods. */
const smooth = (t: number) => 0.9 + 0.55 * Math.sin(0.9 * t) + 0.25 * Math.sin(2.1 * t + 0.4)
const sampleTimes = [0, 1, 2, 3, 4, 5, 6]

/** Radix-2 DIT flow graph for N = 8 with the value at every node. */
function Butterfly8({ values, inLabels, outLabels }: { values: string[][]; inLabels: string[]; outLabels: string[] }) {
  const id = "b8" + useId().replace(/[^a-zA-Z0-9]/g, "")
  const rowH = 44
  const colW = 165
  const left = 96
  const top = 24
  const W = left + 3 * colW + 150
  const H = top + 7 * rowH + 30
  const X = (c: number) => left + c * colW
  const Y = (row: number) => top + row * rowH
  const SUP = "⁰¹²³"

  const edges = []
  for (let s = 0; s < 3; s++) {
    const m = 2 << s
    for (let blk = 0; blk < 8; blk += m) {
      for (let k = 0; k < m / 2; k++) {
        const a = blk + k
        const b = a + m / 2
        const tw = (k * 8) / m
        edges.push(
          <g key={`${s}-${a}`}>
            <line x1={X(s)} y1={Y(a)} x2={X(s + 1)} y2={Y(a)} className="stroke-foreground/45" strokeWidth={1.1} />
            <line x1={X(s)} y1={Y(b)} x2={X(s + 1)} y2={Y(a)} className="stroke-foreground/45" strokeWidth={1.1} />
            <line x1={X(s)} y1={Y(a)} x2={X(s + 1)} y2={Y(b)} className="stroke-foreground/45" strokeWidth={1.1} />
            <line x1={X(s)} y1={Y(b)} x2={X(s + 1)} y2={Y(b)} className="stroke-foreground/45" strokeWidth={1.1} markerEnd={`url(#${id}-a)`} />
            <text x={X(s) + 10} y={Y(b) + 15} className="fill-figure-2 text-[10.5px]">
              W₈{SUP[tw]}
            </text>
            <text x={X(s + 1) - 18} y={Y(b) + 14} className="fill-muted-foreground text-[10px]">
              −1
            </text>
          </g>,
        )
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" style={{ fontFamily: "var(--font-inter)" }}>
      <defs>
        <marker id={`${id}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0.5 L10,5 L0,9.5 Z" className="fill-foreground/50" />
        </marker>
      </defs>
      {edges}
      {values.map((col, c) =>
        col.map((v, row) => (
          <g key={`${c}-${row}`}>
            <circle cx={X(c)} cy={Y(row)} r={3} className={c === 0 || c === 3 ? "fill-primary" : "fill-foreground/60"} />
            {c === 0 ? (
              <text x={X(0) - 10} y={Y(row) + 4} textAnchor="end" className="fill-foreground text-[12px]">
                {inLabels[row]} = {v}
              </text>
            ) : c === 3 ? (
              <text x={X(3) + 10} y={Y(row) + 4} className="fill-foreground text-[12px]">
                {outLabels[row]} = {v}
              </text>
            ) : (
              <text x={X(c)} y={Y(row) - 8} textAnchor="middle" className="fill-primary stroke-card text-[11.5px] font-medium" strokeWidth={4} style={{ paintOrder: "stroke" }}>
                {v}
              </text>
            )}
          </g>
        )),
      )}
      {[0, 1, 2].map((s) => (
        <text key={s} x={(X(s) + X(s + 1)) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[10.5px]">
          stage {s + 1}
        </text>
      ))}
    </svg>
  )
}

/* Spectral copies of a triangle of half-width 1 placed every ws. */
const copy = (ws: number, k: number) => (w: number) => tri(w - k * ws, 1)
const copies = (ws: number) => (w: number) => [-3, -2, -1, 0, 1, 2, 3].reduce((s, k) => s + tri(w - k * ws, 1), 0)

export const paper22Figures: FigureMap = {
  /* ───── Q1 ───── */
  "p22-1a-x": {
    caption: r`The starting signal: a triangle of height 1 on $-1\le t\le1$.`,
    node: <Graph x={[-2, 2]} y={[-0.15, 1.3]} yLabel="x(t)" items={[{ kind: "path", pts: [[-2, 0], ...triPts(0, 1), [2, 0]] }]} xTicks={[-1, 1]} yTicks={[1]} height={140} />,
  },
  "p22-1a-c1": {
    wide: true,
    caption: r`Component 1, step by step. Compressing by 2 halves the width; reversing changes nothing because the triangle is even; shifting right by 1 moves the peak to $t=1$.`,
    node: (
      <Row>
        <Panel title="x(2t): compress by 2">
          <Graph x={[-1.2, 2]} y={[-0.15, 1.3]} yLabel="x(2t)" items={[{ kind: "path", pts: [[-1.2, 0], ...triPts(0, 0.5), [2, 0]] }]} xTicks={[[-0.5, "−½"], [0.5, "½"]]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="x(−2t): reverse (no visible change)">
          <Graph x={[-1.2, 2]} y={[-0.15, 1.3]} yLabel="x(−2t)" items={[{ kind: "path", pts: [[-1.2, 0], ...triPts(0, 0.5), [2, 0]] }]} xTicks={[[-0.5, "−½"], [0.5, "½"]]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="x(−2(t−1)): shift right by 1">
          <Graph x={[-1.2, 2]} y={[-0.15, 1.3]} yLabel="x(−2(t−1))" items={[{ kind: "path", pts: [[-1.2, 0], ...triPts(1, 0.5), [2, 0]] }]} xTicks={[[0.5, "½"], 1, [1.5, "3⁄2"]]} yTicks={[1]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "p22-1a-c2": {
    wide: true,
    caption: r`Component 2. Expanding by 2 doubles the width to $[-2,2]$; shifting left by 2 moves it to $[-4,0]$ with the peak at $t=-2$.`,
    node: (
      <Row>
        <Panel title="x(t/2): expand by 2">
          <Graph x={[-4.6, 2.6]} y={[-0.15, 1.3]} yLabel="x(t/2)" items={[{ kind: "path", pts: [[-4.6, 0], ...triPts(0, 2), [2.6, 0]] }]} xTicks={[-2, 2]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="x((t+2)/2): shift left by 2">
          <Graph x={[-4.6, 2.6]} y={[-0.15, 1.3]} yLabel="x((t+2)/2)" items={[{ kind: "path", pts: [[-4.6, 0], ...triPts(-2, 2), [2.6, 0]] }]} xTicks={[-4, -2]} yTicks={[1]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "p22-1a-y": {
    wide: true,
    caption: r`The final $y(t)$: a wide triangle on $[-4,0]$ (peak at $-2$) and a narrow one on $[\tfrac12,\tfrac32]$ (peak at $1$). They do not overlap.`,
    node: (
      <Graph
        width={520}
        x={[-5, 2.5]}
        y={[-0.15, 1.3]}
        yLabel="y(t)"
        items={[
          { kind: "path", pts: [[-5, 0], ...triPts(-2, 2), [0.5, 0], [1, 1], [1.5, 0], [2.5, 0]] },
          { kind: "hline", y: 1, from: -2, to: 1, dashed: true },
        ]}
        xTicks={[-4, -3, -2, -1, [0.5, "½"], 1, [1.5, "3⁄2"]]}
        yTicks={[[0.5, "½"], 1]}
        height={160}
      />
    ),
  },
  "p22-1b-fig": {
    caption: r`Figure 1: $h_1$ and $h_2$ in parallel, followed by $h_3$.`,
    node: (
      <Blocks
        width={520}
        height={170}
        nodes={[
          { id: "x", x: 34, y: 85, shape: "text", label: "x[n]" },
          { id: "d", x: 90, y: 85, shape: "dot" },
          { id: "h1", x: 200, y: 38, label: "h₁[n]" },
          { id: "h2", x: 200, y: 132, label: "h₂[n]" },
          { id: "s", x: 320, y: 85, shape: "sum" },
          { id: "h3", x: 420, y: 85, label: "h₃[n]" },
          { id: "y", x: 500, y: 85, shape: "text", label: "y[n]" },
        ]}
        wires={[
          { pts: [[58, 85], [90, 85]], arrow: false },
          { pts: [[90, 85], [90, 38], [158, 38]] },
          { pts: [[90, 85], [90, 132], [158, 132]] },
          { pts: [[242, 38], [320, 38], [320, 73]] },
          { pts: [[242, 132], [320, 132], [320, 97]] },
          { pts: [[332, 85], [378, 85]] },
          { pts: [[462, 85], [482, 85]] },
        ]}
      />
    ),
  },
  "p22-1b": {
    wide: true,
    caption: r`Left: $h_{eq}[n]=\delta[n]-\delta[n-2]+\delta[n-3]$. Right: the step response $y[n]=u[n]-\delta[n-2]$; it is 1 everywhere from $n=0$ except for the gap at $n=2$.`,
    node: (
      <Row>
        <Panel title="hₑq[n]">
          <Graph x={[-1.6, 6.6]} y={[-1.5, 1.6]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 6, at({ 0: 1, 2: -1, 3: 1 })), values: true }]} xTicks={[0, 1, 2, 3, 4, 5, 6]} height={150} />
        </Panel>
        <Panel title="y[n] for x[n] = u[n]">
          <Graph x={[-1.6, 6.6]} y={[-0.4, 1.6]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 6, (n) => (n >= 0 && n !== 2 ? 1 : 0)), values: true }, { kind: "text", at: [6.3, 0.55], text: "…" }]} xTicks={[0, 1, 2, 3, 4, 5, 6]} height={150} />
        </Panel>
      </Row>
    ),
  },
  "p22-1c-rect": {
    wide: true,
    caption: r`$\mathrm{rect}(t)$, width 1, and its transform $\mathrm{sinc}(f)=\frac{\sin\pi f}{\pi f}$, with zeros at every nonzero integer $f$.`,
    node: (
      <Row>
        <Panel title="x₁(t) = rect(t)">
          <Graph x={[-1.5, 1.5]} y={[-0.15, 1.3]} items={[{ kind: "path", pts: [[-1.5, 0], [-0.5, 0], [-0.5, 1], [0.5, 1], [0.5, 0], [1.5, 0]] }]} xTicks={[[-0.5, "−½"], [0.5, "½"]]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="X₁(f) = sinc(f)">
          <Graph x={[-4.4, 4.4]} y={[-0.35, 1.2]} xLabel="f" items={[{ kind: "fn", f: nsinc, n: 400 }]} xTicks={[-3, -2, -1, 1, 2, 3]} yTicks={[1]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "p22-1c-x2": {
    wide: true,
    caption: r`Example with $\tau=2$, $T=2$, $f_0=2$. Left: a cosine burst inside the window $\tau-\frac T2<t<\tau+\frac T2$. Right: $|X_2(f)|$ is two copies of $\frac T2|\mathrm{sinc}(fT)|$ centred at $\pm f_0$; the delay $\tau$ only changes the phase.`,
    node: (
      <Row>
        <Panel title="x₂(t)">
          <Graph
            x={[-0.4, 3.6]}
            y={[-1.3, 1.3]}
            items={[
              { kind: "fn", f: (t) => (t > 1 && t < 3 ? Math.cos(2 * PI * 2 * t) : 0), n: 1400, width: 1.5 },
              { kind: "path", pts: [[1, 1], [3, 1]], dashed: true, tone: "muted" },
              { kind: "path", pts: [[1, -1], [3, -1]], dashed: true, tone: "muted" },
            ]}
            xTicks={[[1, "τ−T/2"], [3, "τ+T/2"]]}
            yTicks={[1, -1]}
            height={150}
          />
        </Panel>
        <Panel title="|X₂(f)|">
          <Graph
            x={[-4, 4]}
            y={[-0.1, 1.25]}
            xLabel="f"
            items={[{ kind: "fn", f: (f) => Math.abs(nsinc((f - 2) * 2)) + Math.abs(nsinc((f + 2) * 2)), n: 900 }]}
            xTicks={[[-2, "−f₀"], [2, "f₀"]]}
            yTicks={[[1, "T/2"]]}
            height={150}
          />
        </Panel>
      </Row>
    ),
  },

  /* ───── Q2 ───── */
  "p22-2a": {
    wide: true,
    caption: r`With $a=1$. The two-sided $x_2$ is $x_1(t)$ plus its mirror $x_1(-t)$, so its transform is $X_1(f)+X_1(-f)=\frac{2a}{a^2+(2\pi f)^2}$: real, even and positive.`,
    node: (
      <Row cols={3}>
        <Panel title="x₁(t)">
          <Graph x={[-3, 3.4]} y={[-0.15, 1.3]} items={[{ kind: "path", pts: [[-3, 0], [0, 0]] }, { kind: "fn", f: (t) => Math.exp(-t), from: 0, to: 3.4 }, { kind: "path", pts: [[0, 0], [0, 1]] }]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="x₂(t)">
          <Graph x={[-3, 3.4]} y={[-0.15, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-Math.abs(t)) }]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="X₂(f)">
          <Graph x={[-1, 1]} y={[-0.2, 2.4]} xLabel="f" items={[{ kind: "fn", f: (f) => 2 / (1 + (2 * PI * f) ** 2), n: 300 }]} yTicks={[[2, "2/a"]]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "p22-2b": {
    wide: true,
    caption: r`Left: $x_2'(t)=-a\,\mathrm{sgn}(t)\,e^{-a|t|}$ (here $a=1$). $x_2$ has a corner at $t=0$ but no jump, so the derivative has no impulse. Right: $|x_2'(t)|^2=a^2e^{-2a|t|}$, whose area is $a$.`,
    node: (
      <Row>
        <Panel title="x₂′(t)">
          <Graph
            x={[-3, 3.4]}
            y={[-1.3, 1.3]}
            items={[
              { kind: "fn", f: (t) => Math.exp(t), from: -3, to: 0 },
              { kind: "fn", f: (t) => -Math.exp(-t), from: 0, to: 3.4 },
              { kind: "dots", pts: [[0, 1]], hollow: true },
              { kind: "dots", pts: [[0, -1]], hollow: true },
            ]}
            yTicks={[[1, "a"], [-1, "−a"]]}
            height={150}
          />
        </Panel>
        <Panel title="|x₂′(t)|², area = a">
          <Graph x={[-3, 3.4]} y={[-0.15, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-2 * Math.abs(t)), area: true }]} yTicks={[[1, "a²"]]} height={150} />
        </Panel>
      </Row>
    ),
  },

  /* ───── Q3 ───── */
  "p22-3a": {
    wide: true,
    caption: r`$\mathrm{Re}\{x[n]\}=5\cos\!\left(\frac{13\pi}{7}n-\theta\right)$ for $n=0,\dots,28$. The pattern repeats every 14 samples. Because $\frac{13\pi}{7}=2\pi-\frac\pi7$, it looks like a slow cosine with 14 samples per cycle.`,
    node: (
      <Graph
        width={560}
        x={[-0.8, 29]}
        y={[-6, 6.4]}
        xLabel="n"
        items={[
          { kind: "stems", pts: stems(0, 28, (n) => 5 * Math.cos((13 * PI * n) / 7 - Math.atan2(4, 3))) },
          { kind: "vline", x: 14, label: "n = 14" },
          { kind: "vline", x: 28, label: "n = 28" },
        ]}
        xTicks={[0, 7, 14, 21, 28]}
        yTicks={[5, -5]}
        height={170}
      />
    ),
  },
  "p22-3b": {
    wide: true,
    caption: r`(i) is non-zero for all $t<3$ and grows without bound as $t\to-\infty$: non-causal and unstable. (ii) is two-sided but decays both ways: non-causal, stable. (iii) starts at $t=0$ and decays: causal and stable.`,
    node: (
      <Row cols={3}>
        <Panel title="(i) non-causal, unstable">
          <Graph x={[-0.9, 3.8]} y={[-2, 40]} items={[{ kind: "fn", f: (t) => Math.exp(-4 * t), from: -0.9, to: 3 }, { kind: "path", pts: [[3, 0], [3.8, 0]] }]} xTicks={[3]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="(ii) non-causal, stable">
          <Graph x={[-1.5, 1.5]} y={[-0.1, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-6 * Math.abs(t)), n: 400 }]} xTicks={[-1, 1]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="(iii) causal, stable">
          <Graph x={[-1, 7]} y={[-0.05, 0.48]} items={[{ kind: "path", pts: [[-1, 0], [0, 0]] }, { kind: "fn", f: (t) => t * Math.exp(-t), from: 0, to: 7 }]} xTicks={[1]} yTicks={[[1 / Math.E, "1/e"]]} height={140} />
        </Panel>
      </Row>
    ),
  },

  /* ───── Q4 ───── */
  "p22-4-xy": {
    wide: true,
    caption: r`Top: the odd square wave $x(t)$. Bottom: $y(t)=x(t-T_0/6)$, the same wave delayed by $T_0/6$. Shifting by half a period still flips the sign of both, so both have half-wave symmetry; only $x$ is odd.`,
    node: (
      <>
        <Graph width={520} x={[-1.1, 1.35]} y={[-1.4, 1.4]} yLabel="x(t)" items={[{ kind: "path", pts: square(0, -1.1, 1.35) }, { kind: "text", at: [0.25, 1], text: "A", dy: -7 }, { kind: "text", at: [-0.25, -1], text: "−A", dy: 17 }]} xTicks={[[-1, "−T₀"], [-0.5, "−T₀/2"], [0.5, "T₀/2"], [1, "T₀"]]} yTicks={[]} height={140} />
        <Graph width={520} x={[-1.1, 1.35]} y={[-1.4, 1.4]} yLabel="y(t)" items={[{ kind: "path", pts: square(1 / 6, -1.1, 1.35) }, { kind: "text", at: [5 / 12, 1], text: "A", dy: -7 }, { kind: "text", at: [-1 / 12, -1], text: "−A", dy: 17 }]} xTicks={[[-1 / 3, "−T₀/3"], [1 / 6, "T₀/6"], [2 / 3, "2T₀/3"], [7 / 6, "7T₀/6"]]} yTicks={[]} height={140} />
      </>
    ),
  },
  "p22-4c": {
    wide: true,
    caption: r`Spectra of $Y_k$ for $k=-5,\dots,5$ (amplitudes in units of $A$). Even harmonics are zero. The magnitudes are the same as those of $X_k$; only the phases change.`,
    node: (
      <Row>
        <Panel title="|Yₖ| (× A)">
          <Graph x={[-5.8, 5.8]} y={[-0.08, 0.8]} xLabel="k" items={[{ kind: "stems", pts: stems(-5, 5, (k) => (k % 2 ? 2 / (PI * Math.abs(k)) : 0)), values: true }]} xTicks={[-5, -3, -1, 1, 3, 5]} height={170} />
        </Panel>
        <Panel title="∠Yₖ">
          <Graph
            x={[-5.8, 5.8]}
            y={[-3.4, 3.4]}
            xLabel="k"
            items={[
              { kind: "stems", pts: [[-5, PI / 6], [-3, -PI / 2], [-1, (5 * PI) / 6], [1, (-5 * PI) / 6], [3, PI / 2], [5, -PI / 6]] },
              { kind: "text", at: [-5, PI / 6], text: "π/6", dy: -10, size: 10.5 },
              { kind: "text", at: [-3, -PI / 2], text: "−π/2", dy: 16, size: 10.5 },
              { kind: "text", at: [-1, (5 * PI) / 6], text: "5π/6", dy: -10, size: 10.5 },
              { kind: "text", at: [1, (-5 * PI) / 6], text: "−5π/6", dy: 16, size: 10.5 },
              { kind: "text", at: [3, PI / 2], text: "π/2", dy: -10, size: 10.5 },
              { kind: "text", at: [5, -PI / 6], text: "−π/6", dy: 16, size: 10.5 },
            ]}
            xTicks={[-5, -3, -1, 1, 3, 5]}
            yTicks={[[PI, "π"], [-PI, "−π"]]}
            height={170}
          />
        </Panel>
      </Row>
    ),
  },

  /* ───── Q5 ───── */
  "p22-5a": {
    wide: true,
    caption: r`8-point radix-2 DIT FFT of $x=[1,2,3,4,3,2,0,0]$. Inputs enter in bit-reversed order. Stage 1 forms 2-point DFTs, stage 2 the 4-point DFTs $G$ (even samples) and $H$ (odd samples), stage 3 combines them with $W_8^k$. Decimals are rounded to 2 places.`,
    node: (
      <Butterfly8
        inLabels={["x[0]", "x[4]", "x[2]", "x[6]", "x[1]", "x[5]", "x[3]", "x[7]"]}
        outLabels={["X[0]", "X[1]", "X[2]", "X[3]", "X[4]", "X[5]", "X[6]", "X[7]"]}
        values={[
          ["1", "3", "3", "0", "2", "2", "4", "0"],
          ["4", "−2", "3", "3", "4", "0", "4", "4"],
          ["7", "−2 − 3j", "1", "−2 + 3j", "8", "−4j", "0", "4j"],
          ["15", "−4.83 − 5.83j", "1", "0.83 + 0.17j", "−1", "0.83 − 0.17j", "1", "−4.83 + 5.83j"],
        ]}
      />
    ),
  },
  "p22-5b": {
    wide: true,
    caption: r`$x=[1,2]$ and $h=[1,1]$, padded to $N=4$. The DFT route gives $[1,3,2,0]$: the linear convolution $[1,3,2]$ plus one padding zero.`,
    node: (
      <Row cols={3}>
        <Panel title="x[n]">
          <Graph x={[-0.6, 3.6]} y={[-0.3, 3.6]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 3, at({ 0: 1, 1: 2 })), values: true }]} xTicks={[0, 1, 2, 3]} height={130} />
        </Panel>
        <Panel title="h[n]">
          <Graph x={[-0.6, 3.6]} y={[-0.3, 3.6]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 3, at({ 0: 1, 1: 1 })), values: true }]} xTicks={[0, 1, 2, 3]} height={130} />
        </Panel>
        <Panel title="y[n] = x[n] ∗ h[n]">
          <Graph x={[-0.6, 3.6]} y={[-0.3, 3.6]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 3, at({ 0: 1, 1: 3, 2: 2 })), values: true }]} xTicks={[0, 1, 2, 3]} height={130} />
        </Panel>
      </Row>
    ),
  },
  "p22-5c-h": {
    wide: true,
    caption: r`Impulse responses with sample spacing $T=1$. The ideal filter's sinc runs forever in both directions. The zero-order hold is a box on $[0,T)$, the only causal one. Linear interpolation is a triangle on $[-T,T]$: it reaches back into $t<0$, so it needs the next sample.`,
    node: (
      <Row cols={3}>
        <Panel title="ideal LPF: sinc(t/T)">
          <Graph x={[-4.5, 4.5]} y={[-0.35, 1.25]} items={[{ kind: "fn", f: nsinc, n: 400 }]} xTicks={[-3, -2, -1, 1, 2, 3]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="ZOH: box on [0, T)">
          <Graph x={[-2, 2.5]} y={[-0.35, 1.25]} items={[{ kind: "path", pts: [[-2, 0], [0, 0], [0, 1], [1, 1], [1, 0], [2.5, 0]] }]} xTicks={[[1, "T"]]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="linear: triangle on [−T, T]">
          <Graph x={[-2, 2.5]} y={[-0.35, 1.25]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [0, 1], [1, 0], [2.5, 0]] }]} xTicks={[[-1, "−T"], [1, "T"]]} yTicks={[1]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "p22-5c-rec": {
    wide: true,
    caption: r`The same samples (dots) rebuilt two ways; the dashed curve is the original. The ZOH output is a staircase that lags by about $T/2$. Linear interpolation is smoother, but each segment needs the sample at its right end before it can be drawn.`,
    node: (
      <Row>
        <Panel title="zero-order hold">
          <Graph
            x={[-0.4, 7]}
            y={[-0.1, 1.9]}
            items={[
              { kind: "fn", f: smooth, from: 0, to: 6.8, tone: "muted", dashed: true },
              { kind: "path", pts: sampleTimes.flatMap((n) => [[n, smooth(n)], [n + 1, smooth(n)]] as P[]).slice(0, -1) },
              { kind: "dots", pts: sampleTimes.map((n) => [n, smooth(n)] as P) },
            ]}
            xTicks={[1, 2, 3, 4, 5, 6]}
            height={150}
          />
        </Panel>
        <Panel title="linear interpolation">
          <Graph
            x={[-0.4, 7]}
            y={[-0.1, 1.9]}
            items={[
              { kind: "fn", f: smooth, from: 0, to: 6.8, tone: "muted", dashed: true },
              { kind: "path", pts: sampleTimes.map((n) => [n, smooth(n)] as P) },
              { kind: "dots", pts: sampleTimes.map((n) => [n, smooth(n)] as P) },
            ]}
            xTicks={[1, 2, 3, 4, 5, 6]}
            height={150}
          />
        </Panel>
      </Row>
    ),
  },

  /* ───── Q6 ───── */
  "p22-6a": {
    caption: r`$y(t)=\left(\frac16+\frac13e^{-3t}-\frac12e^{-4t}\right)u(t)$ starts at 0 and settles at the DC gain $\frac{2}{12}=\frac16$.`,
    node: (
      <Graph
        x={[-0.3, 3]}
        y={[-0.02, 0.24]}
        items={[
          { kind: "fn", f: (t) => 1 / 6 + Math.exp(-3 * t) / 3 - Math.exp(-4 * t) / 2, from: 0, to: 3 },
          { kind: "hline", y: 1 / 6, label: "1/6" },
        ]}
        xTicks={[1, 2]}
        height={150}
      />
    ),
  },
  "p22-6b": {
    caption: r`Poles: $-4$ (triple), $-2$ (double), $2$ (double), $-1\pm j3$. The ROC is the strip $-1<\mathrm{Re}\{s\}<2$ between the complex pair and the pole at 2. It contains the $j\omega$ axis.`,
    node: (
      <Plane
        kind="s"
        range={5}
        size={280}
        poles={[[-4, 0], [-2, 0], [2, 0], [-1, 3], [-1, -3]]}
        poleOrder={[
          { at: [-4, 0], text: "(3)" },
          { at: [-2, 0], text: "(2)" },
          { at: [2, 0], text: "(2)" },
        ]}
        roc={{ left: -1, right: 2 }}
        ticks={[-4, -2, -1, 2]}
        labels={[{ at: [0.5, -4.2], text: "ROC" }]}
      />
    ),
  },
  "p22-6c": {
    wide: true,
    caption: r`Left: $H(s)=\frac{1}{s-2}$ with $\mathrm{Re}\{s\}>2$ is causal (right half-plane) but misses the $j\omega$ axis, so it is unstable. Right: $H(s)=\frac{-2}{s^2-1}$ with $-1<\mathrm{Re}\{s\}<1$ contains the axis, so it is stable, but a strip is not a right half-plane, so it is not causal.`,
    node: (
      <Row>
        <Panel title="causal, unstable">
          <Plane kind="s" range={3} size={220} poles={[[2, 0]]} roc={{ left: 2 }} ticks={[2]} />
        </Panel>
        <Panel title="stable, non-causal">
          <Plane kind="s" range={3} size={220} poles={[[-1, 0], [1, 0]]} roc={{ left: -1, right: 1 }} ticks={[-1, 1]} />
        </Panel>
      </Row>
    ),
  },

  /* ───── Q7 ───── */
  "p22-7b": {
    wide: true,
    caption: r`Bluestein (chirp-z) DFT. Multiply by a chirp, convolve with the conjugate chirp using size-$M$ FFTs ($M\ge 2N-1$, a power of 2), multiply by the chirp again. $B[k]$ depends only on $N$ and can be computed once.`,
    node: (
      <Blocks
        width={780}
        height={110}
        nodes={[
          { id: "x", x: 30, y: 50, shape: "text", label: "x[n]" },
          { id: "c1", x: 120, y: 50, label: "× chirp", sub: "e^(−jπn²/N)", w: 104 },
          { id: "f", x: 260, y: 50, label: "FFT (M)", sub: "zero-padded" },
          { id: "m", x: 390, y: 50, label: "× B[k]", sub: "B = FFT of b" },
          { id: "i", x: 520, y: 50, label: "IFFT (M)", sub: "keep 0…N−1" },
          { id: "c2", x: 660, y: 50, label: "× chirp", sub: "e^(−jπk²/N)", w: 104 },
          { id: "X", x: 752, y: 50, shape: "text", label: "X[k]" },
        ]}
        wires={[
          { pts: [[50, 50], [68, 50]] },
          { pts: [[172, 50], [218, 50]], label: "a[n]" },
          { pts: [[302, 50], [348, 50]], label: "A[k]" },
          { pts: [[432, 50], [478, 50]], label: "C[k]" },
          { pts: [[562, 50], [608, 50]], label: "c[k]" },
          { pts: [[712, 50], [732, 50]] },
        ]}
      />
    ),
  },
  "p22-7c": {
    wide: true,
    caption: r`$X_p(j\omega)$ for a triangle spectrum of half-width $\omega_M$. Top: $\omega_s>2\omega_M$, a gap separates the copies and a low-pass filter recovers the middle one. Middle: $\omega_s=2\omega_M$, the copies just touch. Bottom: $\omega_s<2\omega_M$, neighbouring copies overlap and add (solid), and the shape of $X$ is lost.`,
    node: (
      <>
        <Graph width={540} x={[-6.5, 6.5]} y={[-0.1, 1.35]} xLabel="ω" items={[{ kind: "fn", f: copies(3), n: 900 }, { kind: "band", from: 1, to: 2, label: "gap" }]} xTicks={[[-3, "−ωₛ"], [-1, "−ωₘ"], [1, "ωₘ"], [3, "ωₛ"]]} yTicks={[[1, "1/T"]]} height={115} />
        <Graph width={540} x={[-6.5, 6.5]} y={[-0.1, 1.35]} xLabel="ω" items={[{ kind: "fn", f: copies(2), n: 900 }]} xTicks={[[-2, "−ωₛ"], [-1, "−ωₘ"], [1, "ωₘ"], [2, "ωₛ"]]} yTicks={[[1, "1/T"]]} height={115} />
        <Graph
          width={540}
          x={[-6.5, 6.5]}
          y={[-0.1, 1.35]}
          xLabel="ω"
          items={[
            ...[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((k) => ({ kind: "fn" as const, f: copy(1.5, k), n: 600, tone: "muted" as const, dashed: true })),
            { kind: "fn", f: copies(1.5), n: 900 },
            { kind: "band", from: 0.5, to: 1, tone: "second", label: "overlap" },
          ]}
          xTicks={[[-1.5, "−ωₛ"], [1.5, "ωₛ"]]}
          yTicks={[[1, "1/T"]]}
          height={115}
        />
      </>
    ),
  },

  /* ───── Q8 ───── */
  "p22-8a-pz": {
    caption: r`Poles at $\frac13$, $\frac12$ and $1$ (on the unit circle); zeros at $-1\pm\sqrt2$. Only the zero at $\sqrt2-1\approx0.41$ is inside this view; the other is at $-2.41$.`,
    node: <Plane kind="z" range={1.1} size={300} poles={[[1 / 3, 0], [0.5, 0], [1, 0]]} zeros={[[Math.SQRT2 - 1, 0]]} ticks={[[1, "1"]]} labels={[{ at: [0.3, -0.17], text: "⅓" }, { at: [0.53, -0.17], text: "½" }, { at: [0.41, 0.12], text: "√2−1" }]} />,
  },
  "p22-8a-roc": {
    wide: true,
    caption: r`The four ROCs allowed by the poles $\frac13,\frac12,1$, each a ring with no pole inside (zeros left out for clarity). None contains the unit circle, because the pole at $z=1$ sits on it.`,
    node: (
      <Row>
        {[
          { t: "|z| > 1: right-sided", ring: { inner: 1 } },
          { t: "½ < |z| < 1: two-sided", ring: { inner: 0.5, outer: 1 } },
          { t: "⅓ < |z| < ½: two-sided", ring: { inner: 1 / 3, outer: 0.5 } },
          { t: "|z| < ⅓: left-sided", ring: { outer: 1 / 3 } },
        ].map((c) => (
          <Panel key={c.t} title={c.t}>
            <Plane kind="z" range={1.2} size={240} poles={[[1 / 3, 0], [0.5, 0], [1, 0]]} ring={c.ring} ticks={[[1, "1"]]} />
          </Panel>
        ))}
      </Row>
    ),
  },
  "p22-8b-fig": {
    caption: r`Figure 2: pole-zero plot of $Y(z)$, with poles at $\frac13$, $\frac23$ and $2$.`,
    node: <Plane kind="z" range={2.5} size={260} poles={[[1 / 3, 0], [2 / 3, 0], [2, 0]]} ticks={[[1, "1"], [2, "2"]]} labels={[{ at: [1 / 3, -0.4], text: "⅓" }, { at: [0.72, -0.4], text: "⅔" }]} />,
  },
  "p22-8b": {
    wide: true,
    caption: r`The four candidate ROCs for poles at $\frac13,\frac23,2$. Only $\frac23<|z|<2$ contains the unit circle.`,
    node: (
      <Row>
        {[
          { t: "(i) right-sided: |z| > 2", ring: { inner: 2 } },
          { t: "(ii) FT converges: ⅔ < |z| < 2", ring: { inner: 2 / 3, outer: 2 } },
          { t: "(iii) one option: ⅓ < |z| < ⅔", ring: { inner: 1 / 3, outer: 2 / 3 } },
          { t: "(iv) left-sided: |z| < ⅓", ring: { outer: 1 / 3 } },
        ].map((c) => (
          <Panel key={c.t} title={c.t}>
            <Plane kind="z" range={2.3} size={240} poles={[[1 / 3, 0], [2 / 3, 0], [2, 0]]} ring={c.ring} ticks={[[1, "1"], [2, "2"]]} />
          </Panel>
        ))}
      </Row>
    ),
  },
  "p22-8c": {
    caption: r`$X(z)=\frac{2z(5z^2-8z+5)}{(2z-1)^2(z-2)^2}$, ROC $\frac12<|z|<2$. Double poles at $\frac12$ and $2$; zeros at $0$ and at $0.8\pm j0.6$, which lie on the unit circle.`,
    node: (
      <Plane
        kind="z"
        range={2.5}
        size={280}
        poles={[[0.5, 0], [2, 0]]}
        zeros={[[0, 0], [0.8, 0.6], [0.8, -0.6]]}
        poleOrder={[
          { at: [0.5, 0], text: "(2)" },
          { at: [2, 0], text: "(2)" },
        ]}
        ring={{ inner: 0.5, outer: 2 }}
        ticks={[[1, "1"], [2, "2"]]}
      />
    ),
  },
}
