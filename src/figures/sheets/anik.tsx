import { Graph, Panel, PI, Row } from "../kit"
import type { FigureMap } from "../figure"
import { Overlap } from "../overlap"
import { at, r, stems } from "../book/util"

/* Problems 1.6 and 1.7: x(t), its mirror image, and the even and odd parts. */
const x16 = (t: number) => (t >= -2 && t <= -1 ? t + 2 : t > -1 && t <= 0 ? -t : 0)
const x17 = (t: number) => (t >= -1 && t <= 0 ? t + 1 : t > 0 && t <= 2 ? 1 - t / 2 : 0)
const four = (x: (t: number) => number, y: [number, number], yTicks: (number | [number, string])[]) => (
  <>
    <Row>
      <Panel title="x(t)">
        <Graph x={[-2.6, 2.6]} y={y} items={[{ kind: "fn", f: x, n: 600 }]} xTicks={[-2, -1, 1, 2]} yTicks={yTicks} height={130} />
      </Panel>
      <Panel title="x(−t)">
        <Graph x={[-2.6, 2.6]} y={y} items={[{ kind: "fn", f: (t) => x(-t), n: 600, tone: "second" }]} xTicks={[-2, -1, 1, 2]} yTicks={yTicks} height={130} />
      </Panel>
    </Row>
    <Row>
      <Panel title="xₑ(t) = [x(t) + x(−t)] / 2">
        <Graph x={[-2.6, 2.6]} y={y} items={[{ kind: "fn", f: (t) => (x(t) + x(-t)) / 2, n: 600 }]} xTicks={[-2, -1, 1, 2]} yTicks={yTicks} height={130} />
      </Panel>
      <Panel title="xₒ(t) = [x(t) − x(−t)] / 2">
        <Graph x={[-2.6, 2.6]} y={y} items={[{ kind: "fn", f: (t) => (x(t) - x(-t)) / 2, n: 600, tone: "second" }]} xTicks={[-2, -1, 1, 2]} yTicks={yTicks} height={130} />
      </Panel>
    </Row>
  </>
)

const x23 = (t: number) => (t < -1 ? 0 : t < 2 ? 2 : t < 4 ? -1 : 0)
const x31y = at({ 0: 1, 1: 1, 2: 0, 3: 4 })
const y32 = (t: number) => 2 * (t >= -1 ? Math.exp(-(t + 1)) : 0) - (t >= 2 ? Math.exp(-(t - 2)) : 0)

export const sheetAnikFigures: FigureMap = {
  "sa-11": {
    caption: r`$x(t)$ rises from $0$ at $t=-1$ to $1$ just before $t=0$, jumps to $2$ at $t=0$, then falls to $0$ at $t=2$.`,
    node: <Graph x={[-1.8, 2.8]} y={[-0.3, 2.4]} items={[{ kind: "path", pts: [[-1.8, 0], [-1, 0], [0, 1]] }, { kind: "path", pts: [[0, 2], [2, 0], [2.8, 0]] }, { kind: "dots", pts: [[0, 1]], hollow: true }, { kind: "dots", pts: [[0, 2]] }]} xTicks={[-1, 1, 2]} yTicks={[1, 2]} />,
  },
  "sa-13": {
    caption: r`The five samples of $x[n]$. The sample at $n=0$ is zero, so it sits on the axis.`,
    node: <Graph x={[-3.5, 3.5]} y={[-2.5, 3.5]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 3, at({ [-2]: 1, [-1]: -2, 0: 0, 1: 3, 2: -1 })), values: true }]} xTicks={[-2, -1, 0, 1, 2]} />,
  },
  "sa-16": {
    wide: true,
    caption: r`Problem 1.6. Adding $x(t)$ and $x(-t)$ and halving gives the even part (two half-height triangles); subtracting and halving gives the odd part (one up, one down). $x_e+x_o=x$.`,
    node: four(x16, [-0.7, 1.2], [1, [0.5, "½"], [-0.5, "−½"]]),
  },
  "sa-17": {
    wide: true,
    caption: r`Problem 1.7. On $0<t\le1$ both signals overlap; on $1<t\le2$ only $x(t)$ is non-zero, so there the even and odd parts are equal. The odd part is mirrored with a sign change.`,
    node: four(x17, [-0.5, 1.2], [1, [0.25, "¼"], [-0.25, "−¼"]]),
  },
  "sa-21": {
    caption: r`$x[n]=2$ for $n=-2,-1,0$ and $-1$ for $n=1,2$. Each stem is one shifted impulse.`,
    node: <Graph x={[-3.5, 4.5]} y={[-1.5, 2.6]} xLabel="n" items={[{ kind: "stems", pts: stems(-3, 4, at({ [-2]: 2, [-1]: 2, 0: 2, 1: -1, 2: -1 })), values: true }]} xTicks={[-2, -1, 0, 1, 2, 3]} />,
  },
  "sa-23": {
    wide: true,
    caption: r`Left: $x(t)$ steps up by 2 at $t=-1$, down by 3 at $t=2$ and up by 1 at $t=4$. Right: each jump becomes an impulse of the same size at the same place.`,
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-2.5, 5.5]} y={[-1.5, 2.6]} items={[{ kind: "fn", f: x23, n: 1200 }]} xTicks={[-1, 2, 4]} yTicks={[2, -1]} height={140} />
        </Panel>
        <Panel title="dx/dt">
          <Graph x={[-2.5, 5.5]} y={[-3.6, 2.8]} items={[{ kind: "impulses", pts: [[-1, 2, "2"], [2, -3, "−3"], [4, 1, "1"]] }]} xTicks={[-1, 2, 4]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "sa-24": {
    caption: r`$x(t)=e^{2t}u(-3t)$: a left-sided exponential that grows towards $1$ just before $t=0$, then is switched off.`,
    node: <Graph x={[-3.2, 2.2]} y={[-0.15, 1.25]} items={[{ kind: "fn", f: (t) => (t < 0 ? Math.exp(2 * t) : 0), n: 600 }]} xTicks={[-3, -2, -1, 1, 2]} yTicks={[1]} />,
  },
  "sa-31": {
    caption: r`$y[n]=h[n]+2h[n-1]$: the samples $1,\,1,\,0,\,4$ at $n=0,1,2,3$. The zero at $n=2$ is inside the output, not its end.`,
    node: <Graph x={[-1.5, 4.5]} y={[-0.4, 4.6]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 4, x31y), values: true }]} xTicks={[0, 1, 2, 3]} />,
  },
  "sa-32": {
    caption: r`$y_2(t)=2e^{-(t+1)}u(t+1)-e^{-(t-2)}u(t-2)$: a doubled copy of $y_1$ starting at $t=-1$, minus a copy starting at $t=2$.`,
    node: <Graph x={[-2, 6]} y={[-1.2, 2.3]} items={[{ kind: "fn", f: y32, n: 1200 }]} xTicks={[-1, 2, 4]} yTicks={[2, 1, -1]} />,
  },
  /* ───── Lecture 4 ───── */
  "sa-41": {
    caption: r`$y[n]=\tfrac12h[n]+2h[n-1]$: the samples $\tfrac12,\ \tfrac52,\ \tfrac52,\ 2$ at $n=0,1,2,3$. The overlap first grows, then shrinks, as the window passes the input.`,
    node: <Graph x={[-1.5, 4.5]} y={[-0.3, 3]} xLabel="n" items={[{ kind: "stems", pts: stems(-1, 4, at({ 0: 0.5, 1: 2.5, 2: 2.5, 3: 2 })), values: true }]} xTicks={[0, 1, 2, 3]} />,
  },
  "sa-42-overlap": {
    caption: r`The reflected step $h[n-k]=u[n-k]$ covers every $k\le n$ (drawn for $n=4$). Together with $x[k]=\alpha^k u[k]$ it overlaps on $0\le k\le n$.`,
    node: <Overlap discrete title="Overlap for n ≥ 0" top={(k) => (k >= 0 ? 0.6 ** k : 0)} bottom={(k) => (k <= 4 ? 1 : 0)} x={[-4.5, 7.5]} yTop={[-0.15, 1.25]} yBot={[-0.15, 1.35]} overlap={[0, 4]} edge={{ at: 4, label: "k = n" }} ticks={[0, 2, 4, 6]} />,
  },
  "sa-42-out": {
    caption: r`$y[n]=\dfrac{1-\alpha^{n+1}}{1-\alpha}u[n]$ for $\alpha=\tfrac12$: each new sample adds a smaller positive amount, so $y[n]$ climbs towards $\dfrac1{1-\alpha}=2$ without reaching it.`,
    node: <Graph x={[-1.5, 7.5]} y={[-0.2, 2.4]} xLabel="n" items={[{ kind: "hline", y: 2, tone: "muted", dashed: true }, { kind: "stems", pts: stems(-1, 7, (n) => (n >= 0 ? 2 * (1 - 0.5 ** (n + 1)) : 0)) }]} xTicks={[0, 2, 4, 6]} yTicks={[1, 2]} />,
  },
  "sa-43-a": {
    caption: r`$1\le t<3$ (drawn for $t=2$): the sliding rectangle $h(t-\tau)$, on $(t-3,\,t-1)$, has partly entered $x(\tau)$ on $(0,2)$. Overlap $(0,\ t-1)$, of length $t-1$.`,
    node: <Overlap title="Case: 1 ≤ t < 3 (entering)" top={(v) => (v > 0 && v < 2 ? 1 : 0)} bottom={(v) => (v > -1 && v < 1 ? 1 : 0)} x={[-3.5, 4.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[0, 1]} edge={{ at: 1, label: "τ = t−1" }} ticks={[-1, 0, 1, 2, 3]} />,
  },
  "sa-43-b": {
    caption: r`$3\le t<5$ (drawn for $t=4$): the sliding rectangle is leaving. Overlap $(t-3,\ 2)$, of length $5-t$.`,
    node: <Overlap title="Case: 3 ≤ t < 5 (leaving)" top={(v) => (v > 0 && v < 2 ? 1 : 0)} bottom={(v) => (v > 1 && v < 3 ? 1 : 0)} x={[-3.5, 4.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[1, 2]} edge={{ at: 1, label: "τ = t−3" }} ticks={[-1, 0, 1, 2, 3]} />,
  },
  "sa-43-out": {
    caption: r`The overlap length forms a triangle: it starts at $t=1$, peaks at $y(3)=2$ when the two width-2 rectangles coincide, and ends at $t=5$.`,
    node: <Graph x={[-0.5, 6.5]} y={[-0.2, 2.4]} items={[{ kind: "path", pts: [[-0.5, 0], [1, 0], [3, 2], [5, 0], [6.5, 0]] }, { kind: "vline", x: 3, tone: "second", dashed: true }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[1, 2]} />,
  },
  "sa-44": {
    caption: r`$y(t)$ is the length of $[0,\infty)$ inside the window $(t-3,\,t-1)$: zero until $t=1$, rising to $2$ at $t=3$, then constant once the whole rectangle is inside.`,
    node: <Graph x={[-0.5, 5.5]} y={[-0.2, 2.4]} items={[{ kind: "path", pts: [[-0.5, 0], [1, 0], [3, 2], [5.5, 2]] }, { kind: "vline", x: 1, tone: "second", dashed: true }, { kind: "vline", x: 3, tone: "second", dashed: true }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[1, 2]} />,
  },
  "sa-45-overlap": {
    caption: r`For $t\ge0$ (drawn for $t=1.5$) the flipped exponential $h(t-\tau)$ lives on $\tau\le t$ and $x(\tau)$ on $\tau\ge0$, so the overlap is $0\le\tau\le t$. For $t<0$ they never meet.`,
    node: <Overlap title="Overlap for t ≥ 0" top={(v) => (v >= 0 ? Math.exp(-2 * v) : 0)} bottom={(v) => (v <= 1.5 ? Math.exp(-(1.5 - v)) : 0)} x={[-2, 4]} yTop={[-0.15, 1.25]} yBot={[-0.15, 1.35]} overlap={[0, 1.5]} edge={{ at: 1.5, label: "τ = t" }} ticks={[-1, 1, 2, 3]} />,
  },
  "sa-45-out": {
    caption: r`$y(t)=(e^{-t}-e^{-2t})u(t)$: zero at $t=0$, positive for $t>0$, peaking at $t=\ln2$ (value $\tfrac14$), then decaying back to zero.`,
    node: <Graph x={[-0.5, 5.5]} y={[-0.03, 0.3]} items={[{ kind: "fn", f: (t) => (t >= 0 ? Math.exp(-t) - Math.exp(-2 * t) : 0), n: 500 }]} xTicks={[1, 2, 3, 4, 5]} yTicks={[[0.25, "¼"]]} />,
  },
  "sa-46": {
    caption: r`$h_1$ is a rectangle on $(1,3)$ (sage). $h_2(t)=h_1(t+a)$ moves it left by $a$, to $(1-a,\ 3-a)$. It stays causal while its left edge is at or after $0$; $a=1$ (ochre) is the furthest it can go.`,
    node: <Graph x={[-1, 4]} y={[-0.2, 1.4]} items={[{ kind: "path", pts: [[-1, 0], [1, 0], [1, 1], [3, 1], [3, 0], [4, 0]] }, { kind: "path", pts: [[-1, 0], [0, 0], [0, 0.85], [2, 0.85], [2, 0], [4, 0]], tone: "second", dashed: true }]} xTicks={[1, 2, 3]} yTicks={[1]} />,
  },
  /* ───── Lectures 5–6 ───── */
  "sa-52": {
    caption: r`$a_k=\dfrac{\sin(k\pi/3)}{k\pi}$ with $a_0=\tfrac13$. Every harmonic whose index is a multiple of 3 (dots on the axis at $k=\pm3,\pm6$) is missing.`,
    node: <Graph width={440} x={[-7.5, 7.5]} y={[-0.12, 0.4]} xLabel="k" yLabel="aₖ" items={[{ kind: "stems", pts: stems(-7, 7, (k) => (k === 0 ? 1 / 3 : Math.sin((k * PI) / 3) / (k * PI))) }]} xTicks={[-6, -3, 0, 3, 6]} yTicks={[[1 / 3, "⅓"]]} />,
  },
  "sa-54": {
    caption: r`One period of the triangular ramp: up from $(0,0)$ to $(1,1)$, then down to $(3,0)$. Area $\tfrac12\cdot3\cdot1=\tfrac32$, so the average height is $a_0=\tfrac12$ (dashed).`,
    node: <Graph x={[-0.5, 3.6]} y={[-0.15, 1.3]} items={[{ kind: "path", pts: [[-0.5, 0], [0, 0], [1, 1], [3, 0], [3.6, 0]], area: true }, { kind: "hline", y: 0.5, tone: "second", dashed: true, from: 0, to: 3 }]} xTicks={[1, 2, 3]} yTicks={[1, [0.5, "½"]]} />,
  },
  "sa-56": {
    caption: r`$a_k=\dfrac{\sin(k\pi/2)}{k\pi}$ with $a_0=\tfrac12$: the even harmonics vanish; odd ones alternate in sign and shrink.`,
    node: <Graph width={440} x={[-7.5, 7.5]} y={[-0.15, 0.6]} xLabel="k" yLabel="aₖ" items={[{ kind: "stems", pts: stems(-7, 7, (k) => (k === 0 ? 0.5 : Math.sin((k * PI) / 2) / (k * PI))) }]} xTicks={[-6, -4, -2, 0, 2, 4, 6]} yTicks={[[0.5, "½"]]} />,
  },
  "sa-63": {
    wide: true,
    caption: r`Left: two periods of the repeated ramp. Right: its derivative, plateaus of height 2 on $(2m,2m+1)$, plus downward impulses of weight $-2$ at the odd integers, where the ramp drops.`,
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-2.3, 4.3]} y={[-0.3, 2.4]} items={[{ kind: "fn", f: (t) => { const m = ((t % 2) + 2) % 2; return m < 1 ? 2 * m : 0 }, from: -2, to: 4, n: 1600 }]} xTicks={[-2, -1, 1, 2, 3, 4]} yTicks={[2]} height={140} />
        </Panel>
        <Panel title="dx/dt">
          <Graph x={[-2.3, 4.3]} y={[-2.6, 2.6]} items={[{ kind: "fn", f: (t) => { const m = ((t % 2) + 2) % 2; return m < 1 ? 2 : 0 }, from: -2, to: 4, n: 1600 }, { kind: "impulses", pts: [[-1, -2], [1, -2], [3, -2]], tone: "second" }]} xTicks={[-2, -1, 1, 2, 3, 4]} yTicks={[2, -2]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "sa-65": {
    caption: r`The spectrum of the impulse train $p_T(t)$: impulses of weight $\frac{2\pi}{T}$ every $\omega_0=\frac{2\pi}{T}$. A train in time is a train in frequency.`,
    node: <Graph width={440} x={[-4.6, 4.6]} y={[-0.2, 1.4]} xLabel="ω" items={[{ kind: "impulses", pts: [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((k) => [k, 1] as [number, number]) }]} xTicks={[[-2, "−2ω₀"], [-1, "−ω₀"], [1, "ω₀"], [2, "2ω₀"]]} yTicks={[[1, "2π/T"]]} />,
  },
  /* ───── Lecture 7 ───── */
  "sa-71": {
    caption: r`The pulse on $4<t<10$: width $\tau=6$, centred at $t_0=7$ (dashed). It is the centred width-6 rectangle moved right by 7.`,
    node: <Graph x={[2, 11.5]} y={[-0.15, 1.3]} items={[{ kind: "path", pts: [[2, 0], [4, 0], [4, 1], [10, 1], [10, 0], [11.5, 0]] }, { kind: "vline", x: 7, tone: "second", dashed: true }]} xTicks={[4, 7, 10]} yTicks={[1]} />,
  },
  "sa-72": {
    caption: r`The waveform is a wide block of height 3 on $(1,4)$ plus a narrower block of height $1.5$ on $(2,3)$. Both are centred at $t=2.5$.`,
    node: <Graph x={[0, 5]} y={[-0.3, 5]} items={[{ kind: "path", pts: [[0, 0], [1, 0], [1, 3], [4, 3], [4, 0], [5, 0]], tone: "muted", dashed: true, area: true }, { kind: "path", pts: [[0, 0], [1, 0], [1, 3], [2, 3], [2, 4.5], [3, 4.5], [3, 3], [4, 3], [4, 0], [5, 0]] }]} xTicks={[1, 2, 3, 4]} yTicks={[3, 4.5]} />,
  },
  "sa-73": {
    caption: r`The two shifted copies before adding: $\tfrac12R(j(\omega-3))$ centred at $\omega=+3$ (sage) and $\tfrac12R(j(\omega+3))$ centred at $\omega=-3$ (ochre). $X(j\omega)$ is their sum.`,
    node: <Graph width={460} x={[-9, 9]} y={[-0.35, 1.25]} xLabel="ω" items={[{ kind: "fn", f: (w) => (Math.abs(w - 3) < 1e-6 ? 1 : Math.sin(w - 3) / (w - 3)), n: 800 }, { kind: "fn", f: (w) => (Math.abs(w + 3) < 1e-6 ? 1 : Math.sin(w + 3) / (w + 3)), n: 800, tone: "second" }]} xTicks={[-6, -3, 3, 6]} yTicks={[1]} />,
  },
}
