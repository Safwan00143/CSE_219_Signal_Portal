import { useId } from "react"
import { Graph, Panel, Row } from "../kit"
import type { FigureMap } from "../figure"
import { r, stems, type P } from "./util"

/**
 * A 4-point radix-2 butterfly with the value at every node, so a worked FFT
 * can be read stage by stage. Rows follow the usual drawing: DIT takes its
 * inputs in bit-reversed order, DIF delivers its outputs in bit-reversed order.
 */
export function Butterfly4({ variant, inverse, values, inLabels, outLabels }: { variant: "dit" | "dif"; inverse?: boolean; values: string[][]; inLabels: string[]; outLabels: string[] }) {
  const id = "b" + useId().replace(/[^a-zA-Z0-9]/g, "")
  const rowH = 46
  const colW = 150
  const left = 70
  const top = 26
  const W = left + 2 * colW + 76
  const H = top + 3 * rowH + 30
  const X = (c: number) => left + c * colW
  const Y = (row: number) => top + row * rowH
  const tw = (k: number) => (inverse ? (k === 0 ? "W⁰" : "W⁻¹") : k === 0 ? "W⁰" : "W¹")
  // Each stage is a list of butterflies [upper row, lower row, twiddle exponent].
  const stages: [number, number, number][][] =
    variant === "dif"
      ? [
          [[0, 2, 0], [1, 3, 1]],
          [[0, 1, 0], [2, 3, 0]],
        ]
      : [
          [[0, 1, 0], [2, 3, 0]],
          [[0, 2, 0], [1, 3, 1]],
        ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" style={{ fontFamily: "var(--font-inter)" }}>
      <defs>
        <marker id={`${id}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0.5 L10,5 L0,9.5 Z" className="fill-foreground/50" />
        </marker>
      </defs>
      {stages.map((bfs, s) =>
        bfs.map(([a, b, k]) => (
          <g key={`${s}-${a}`}>
            <line x1={X(s)} y1={Y(a)} x2={X(s + 1)} y2={Y(a)} className="stroke-foreground/50" strokeWidth={1.1} />
            <line x1={X(s)} y1={Y(b)} x2={X(s + 1)} y2={Y(a)} className="stroke-foreground/50" strokeWidth={1.1} />
            <line x1={X(s)} y1={Y(a)} x2={X(s + 1)} y2={Y(b)} className="stroke-foreground/50" strokeWidth={1.1} />
            <line x1={X(s)} y1={Y(b)} x2={X(s + 1)} y2={Y(b)} className="stroke-foreground/50" strokeWidth={1.1} markerEnd={`url(#${id}-a)`} />
            <text x={variant === "dit" ? X(s) + 22 : X(s + 1) - 48} y={Y(b) + 16} className="fill-figure-2 text-[11px]">
              {tw(k)}
            </text>
            <text x={X(s + 1) - 16} y={Y(b) - 6} className="fill-muted-foreground text-[10px]">
              −1
            </text>
          </g>
        )),
      )}
      {values.map((col, c) =>
        col.map((v, row) => (
          <g key={`${c}-${row}`}>
            <circle cx={X(c)} cy={Y(row)} r={3} className={c === 1 ? "fill-foreground/60" : "fill-primary"} />
            <text x={X(c) + (c === 2 ? 0 : 6)} y={Y(row) - 8} textAnchor={c === 2 ? "middle" : "start"} className="fill-primary text-[11.5px] font-medium">
              {v}
            </text>
          </g>
        )),
      )}
      {[0, 1, 2, 3].map((row) => (
        <g key={`l${row}`}>
          <text x={X(0) - 12} y={Y(row) + 4} textAnchor="end" className="fill-foreground text-[12px]">
            {inLabels[row]}
          </text>
          <text x={X(2) + 12} y={Y(row) + 4} className="fill-foreground text-[12px]">
            {outLabels[row]}
          </text>
        </g>
      ))}
      {[0, 1].map((s) => (
        <text key={s} x={(X(s) + X(s + 1)) / 2} y={H - 6} textAnchor="middle" className="fill-muted-foreground text-[10.5px]">
          stage {s + 1}
        </text>
      ))}
    </svg>
  )
}

const xn = ["x(0)", "x(1)", "x(2)", "x(3)"]
const xr = ["x(0)", "x(2)", "x(1)", "x(3)"]
const Xn = ["X(0)", "X(1)", "X(2)", "X(3)"]
const Xr = ["X(0)", "X(2)", "X(1)", "X(3)"]

export const bookFftFigures: FigureMap = {
  "bk-f-421": {
    caption: r`Decimation in frequency for $x=\{4,3,2,1\}$. Stage 1 combines samples $N/2=2$ apart, putting the sums on top and the differences times $W_4^n$ below. Stage 2 is two 2-point DFTs. The outputs come out in bit-reversed order $X(0),X(2),X(1),X(3)$.`,
    node: <Butterfly4 variant="dif" values={[["4", "3", "2", "1"], ["6", "4", "2", "−j2"], ["10", "2", "2 − j2", "2 + j2"]]} inLabels={xn} outLabels={Xr} />,
  },
  "bk-f-422": {
    caption: r`The inverse through the same DIF graph: inputs $X(k)$ in natural order, twiddles conjugated to $W_4^{-n}$ (here $W_4^{-1}=j$), and every output divided by $N=4$. Stage 2 produces $16,8,12,4$, which become $x(0)=4$, $x(2)=2$, $x(1)=3$, $x(3)=1$.`,
    node: <Butterfly4 variant="dif" inverse values={[["10", "2 − j2", "2", "2 + j2"], ["12", "4", "8", "4"], ["16 → 4", "8 → 2", "12 → 3", "4 → 1"]]} inLabels={Xn} outLabels={xr} />,
  },
  "bk-f-425": {
    caption: r`Decimation in time for the same data. The inputs enter in bit-reversed order (even samples first), stage 1 forms two 2-point DFTs, and stage 2 combines them with $W_4^0=1$ and $W_4^1=-j$. The outputs are in natural order and agree with the DIF result.`,
    node: <Butterfly4 variant="dit" values={[["4", "2", "3", "1"], ["6", "2", "4", "2"], ["10", "2 − j2", "2", "2 + j2"]]} inLabels={xr} outLabels={Xn} />,
  },
  "bk-f-426": {
    caption: r`Inverse DIT: the inputs $X(0),X(2),X(1),X(3)$ in bit-reversed order, the twiddle $W_4^{-1}=j$, and a final $\times\frac14$. The lower butterfly in stage 2 gives $8+j(-j4)=12$, i.e. $x(1)=3$.`,
    node: <Butterfly4 variant="dit" inverse values={[["10", "2", "2 − j2", "2 + j2"], ["12", "8", "4", "−j4"], ["16 → 4", "12 → 3", "8 → 2", "4 → 1"]]} inLabels={Xr} outLabels={xn} />,
  },
  "bk-f-423": {
    caption: r`DIF for $x=\{0.8,0.6,0.4,0.2\}$. The only non-trivial twiddle multiplies $x(1)-x(3)=0.4$ by $-j$.`,
    node: <Butterfly4 variant="dif" values={[["0.8", "0.6", "0.4", "0.2"], ["1.2", "0.8", "0.4", "−j0.4"], ["2", "0.4", "0.4 − j0.4", "0.4 + j0.4"]]} inLabels={xn} outLabels={Xr} />,
  },
  "bk-f-427": {
    caption: r`DIT for $x=\{0.8,0.4,-0.4,-0.2\}$, with inputs in bit-reversed order $0.8,-0.4,0.4,-0.2$. The lower stage-2 butterfly computes $1.2\pm(-j)(0.6)$.`,
    node: <Butterfly4 variant="dit" values={[["0.8", "−0.4", "0.4", "−0.2"], ["0.4", "1.2", "0.2", "0.6"], ["0.6", "1.2 − j0.6", "0.2", "1.2 + j0.6"]]} inLabels={xr} outLabels={Xn} />,
  },
  "bk-f-437": {
    wide: true,
    caption: r`For $N=8$: keeping only the even samples (left) means the DFT is an $\frac N2$-point DFT of ones, repeated twice around the circle (right). So $X(k)=\frac N2=4$ at $k=0$ and $k=\frac N2=4$, and zero elsewhere.`,
    node: (
      <Row>
        <Panel title="x(n)">
          <Graph x={[-0.7, 7.7]} y={[-0.2, 1.3]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 7, (n) => (n % 2 === 0 ? 1 : 0)) }]} xTicks={[0, 2, 4, 6]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="X(k)">
          <Graph x={[-0.7, 7.7]} y={[-0.3, 4.8]} xLabel="k" items={[{ kind: "stems", pts: stems(0, 7, (k) => (k % 4 === 0 ? 4 : 0)), tone: "second", values: true }]} xTicks={[0, 2, 4, 6]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-f-420": {
    wide: true,
    caption: r`$|X(k)|/N$ for the 2000 Hz sine. Left, $N=100$: the record holds exactly 25 cycles, so all the energy lands in the single bin at 2000 Hz (and its mirror). Right, $N=73$: 18.25 cycles, so the tone falls between bins and leaks into its neighbours.`,
    node: (
      <Row>
        <Panel title="N = 100 (Δf = 80 Hz)">
          <Graph x={[0, 4000]} y={[-0.05, 1.15]} xLabel="f (Hz)" items={[{ kind: "stems", pts: leak(100) }]} xTicks={[0, 2000, 4000]} yTicks={[1]} height={150} />
        </Panel>
        <Panel title="N = 73 (Δf ≈ 109.6 Hz)">
          <Graph x={[0, 4000]} y={[-0.05, 1.15]} xLabel="f (Hz)" items={[{ kind: "stems", pts: leak(73), tone: "second" }]} xTicks={[0, 2000, 4000]} yTicks={[1]} height={150} />
        </Panel>
      </Row>
    ),
  },
}

/** |X(k)|/N of 2 sin(2π·2000n/8000) for the bins from 0 to fs/2. */
function leak(N: number): P[] {
  const out: P[] = []
  for (let k = 0; k <= Math.floor(N / 2); k++) {
    let re = 0
    let im = 0
    for (let n = 0; n < N; n++) {
      const v = 2 * Math.sin((2 * Math.PI * 2000 * n) / 8000)
      re += v * Math.cos((2 * Math.PI * k * n) / N)
      im -= v * Math.sin((2 * Math.PI * k * n) / N)
    }
    out.push([(k * 8000) / N, Math.hypot(re, im) / N])
  }
  return out
}
