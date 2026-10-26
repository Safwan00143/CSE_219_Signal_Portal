import { Graph, Panel, Row } from "../kit"
import type { FigureMap } from "../figure"
import { at, r, table, xform, type P } from "./util"

/* Figure P1.21: corner points of x(t), with a jump drawn as two points at the same t. */
const x121: P[] = [[-3, 0], [-2, 0], [-2, -1], [-1, 0], [-1, 1], [0, 1], [0, 2], [1, 2], [1, 1], [2, 0], [3, 0]]
const ct = (title: string, pts: P[], x: [number, number], xTicks: number[]) => (
  <Panel title={title}>
    <Graph x={x} y={[-1.4, 3.4]} items={[{ kind: "path", pts }]} xTicks={xTicks} yTicks={[1, 2, -1]} height={150} />
  </Panel>
)

/* Figure P1.22 */
const x122: Record<number, number> = { [-4]: -1, [-3]: -0.5, [-2]: 0.5, [-1]: 1, 0: 1, 1: 1, 2: 1, 3: 0.5 }
const X = at(x122)
const dt = (title: string, pts: P[], x: [number, number] = [-6.5, 8.5]) => (
  <Panel title={title}>
    <Graph x={x} y={[-1.3, 1.4]} xLabel="n" items={[{ kind: "stems", pts }]} xTicks={[-4, -2, 0, 2, 4, 6, 8].filter((v) => v >= x[0] && v <= x[1])} yTicks={[1, -1]} height={140} />
  </Panel>
)
const seq = (f: (n: number) => number, a = -6, b = 8) => Array.from({ length: b - a + 1 }, (_, i) => [a + i, f(a + i)] as P)

/* Figure P1.23 */
const ev = (f: (t: number) => number) => (t: number) => (f(t) + f(-t)) / 2
const od = (f: (t: number) => number) => (t: number) => (f(t) - f(-t)) / 2
const xa = (t: number) => (t > 0 && t < 2 ? 1 - Math.abs(t - 1) : 0)
const xb = (t: number) => (t < -2 ? 0 : t < -1 ? t + 2 : t < 0 ? -t : t < 1 ? t : 1)
const xc = (t: number) => (t < 0 ? -2 * t : t)
const evOd = (f: (t: number) => number, x: [number, number], y: [number, number], ticks: number[]) => (
  <Row>
    <Panel title="even part">
      <Graph x={x} y={y} items={[{ kind: "fn", f: ev(f), n: 500 }]} xTicks={ticks} yTicks={[0.5, 1, -0.5].filter((v) => v > y[0] && v < y[1])} height={140} />
    </Panel>
    <Panel title="odd part">
      <Graph x={x} y={y} items={[{ kind: "fn", f: od(f), n: 500, tone: "second" }]} xTicks={ticks} yTicks={[0.5, 1, -0.5].filter((v) => v > y[0] && v < y[1])} height={140} />
    </Panel>
  </Row>
)

/* Figure P1.24 */
const xa24 = (n: number) => (n >= 0 ? 1 : -1)
const xb24 = at({ [-2]: 1, [-1]: 2, 0: 3, 7: 1 })
const xc24 = at({ [-4]: -1, [-3]: 2, [-2]: 2, [-1]: 1, 0: 1, 1: 2, 2: 1, 3: -1 })
const evOdD = (f: (n: number) => number, a: number, b: number, y: [number, number]) => (
  <Row>
    <Panel title="even part">
      <Graph x={[a - 0.5, b + 0.5]} y={y} xLabel="n" items={[{ kind: "stems", pts: seq((n) => (f(n) + f(-n)) / 2, a, b), values: true }]} xTicks={[a, 0, b]} height={150} />
    </Panel>
    <Panel title="odd part">
      <Graph x={[a - 0.5, b + 0.5]} y={y} xLabel="n" items={[{ kind: "stems", pts: seq((n) => (f(n) - f(-n)) / 2, a, b), tone: "second", values: true }]} xTicks={[a, 0, b]} height={150} />
    </Panel>
  </Row>
)

/* Tan 3.20 */
const h320: Record<number, number> = { 0: 2, 1: 2, 2: 2, 3: 1, 4: 1 }
const H = at(h320)
const kk = (title: string, f: (k: number) => number) => (
  <Panel title={title}>
    <Graph x={[-8.5, 5.5]} y={[-0.3, 2.6]} xLabel="k" items={[{ kind: "stems", pts: seq(f, -8, 5) }]} xTicks={[-7, -5, -3, 0, 2, 4]} yTicks={[1, 2]} height={130} />
  </Panel>
)

export const bookSignalsFigures: FigureMap = {
  "bk-s-energy": {
    caption: r`$|x_1(t)|^2=e^{-4t}u(t)$. Its total area is the energy $E_\infty=\tfrac14$. The area keeps a finite value, so the average over an ever longer window goes to zero: $P_\infty=0$.`,
    node: <Graph x={[-0.5, 2.5]} y={[-0.1, 1.2]} items={[{ kind: "fn", f: (t) => (t >= 0 ? Math.exp(-4 * t) : 0), area: true, n: 400 }, { kind: "text", at: [0.55, 0.55], text: "area = 1/4" }]} xTicks={[0, 1, 2]} yTicks={[1]} />,
  },
  "bk-s-support": {
    wide: true,
    caption: r`Problem 1.4: if $x[n]$ can be non-zero only on $-2\le n\le4$ (left), then $x[-n+2]$ can be non-zero only where $-2\le -n+2\le 4$, i.e. $-2\le n\le 4$ again (right). Reversing the range about $n=1$ maps it back onto itself.`,
    node: (
      <Row>
        <Panel title="where x[n] may be non-zero">
          <Graph x={[-7.5, 8.5]} y={[-0.2, 1.4]} xLabel="n" items={[{ kind: "stems", pts: seq((n) => (n >= -2 && n <= 4 ? 1 : 0), -7, 8) }]} xTicks={[-2, 0, 4]} height={120} />
        </Panel>
        <Panel title="x[−n + 2]">
          <Graph x={[-7.5, 8.5]} y={[-0.2, 1.4]} xLabel="n" items={[{ kind: "stems", pts: seq((n) => (-n + 2 >= -2 && -n + 2 <= 4 ? 1 : 0), -7, 8), tone: "second" }]} xTicks={[-2, 0, 4]} height={120} />
        </Panel>
      </Row>
    ),
  },
  "bk-s-121": {
    caption: r`Figure P1.21, redrawn. A ramp from $-1$ up to 0 on $-2<t<-1$, then 1 on $(-1,0)$, 2 on $(0,1)$, and a ramp from 1 down to 0 on $(1,2)$.`,
    node: <Graph x={[-3, 3]} y={[-1.4, 2.6]} items={[{ kind: "path", pts: x121 }]} xTicks={[-2, -1, 1, 2]} yTicks={[1, 2, -1]} />,
  },
  "bk-s-121-sol": {
    wide: true,
    caption: r`Parts (a)–(d), each built from the corner points of $x(t)$ with $t=(\tau-b)/a$. Part (d) is reversed and stretched by 2, so it lives on $4<t<12$.`,
    node: (
      <>
        <Row>
          {ct("(a) x(t − 1)", xform(x121, 1, -1), [-2, 4], [-1, 0, 1, 2, 3])}
          {ct("(b) x(2 − t)", xform(x121, -1, 2), [-1, 5], [0, 1, 2, 3, 4])}
        </Row>
        <Row>
          {ct("(c) x(2t + 1)", xform(x121, 2, 1), [-2.2, 1.2], [-1.5, -1, -0.5, 0.5])}
          {ct("(d) x(4 − t/2)", xform(x121, -0.5, 4), [2, 14], [4, 6, 8, 10, 12])}
        </Row>
      </>
    ),
  },
  "bk-s-121-ef": {
    wide: true,
    caption: r`(e) For $t>0$ the sum is $3$ on $(0,1)$ and $3-2t$ on $(1,2)$; $u(t)$ removes everything at negative $t$. (f) Only the values $x(-\tfrac32)=-\tfrac12$ and $x(\tfrac32)=\tfrac12$ survive, as impulses of area $-\tfrac12$ at both points.`,
    node: (
      <Row>
        {ct("(e) [x(t) + x(−t)] u(t)", [[-1, 0], [0, 0], [0, 3], [1, 3], [1, 1], [2, -1], [2, 0], [3, 0]], [-1, 3], [1, 2])}
        <Panel title="(f) x(t)[δ(t + 3/2) − δ(t − 3/2)]">
          <Graph x={[-3, 3]} y={[-1.4, 1.4]} items={[{ kind: "impulses", pts: [[-1.5, -0.5, "−½"], [1.5, -0.5, "−½"]] }]} xTicks={[[-1.5, "−3/2"], [1.5, "3/2"]]} height={150} />
        </Panel>
      </Row>
    ),
  },
  "bk-s-122": {
    caption: r`Figure P1.22, redrawn: $x[-4]=-1$, $x[-3]=-\tfrac12$, $x[-2]=\tfrac12$, $x[n]=1$ for $-1\le n\le2$, $x[3]=\tfrac12$, and zero elsewhere.`,
    node: <Graph x={[-6.5, 6.5]} y={[-1.3, 1.4]} xLabel="n" items={[{ kind: "stems", pts: table(x122, -6, 6), values: true }]} xTicks={[-4, -2, 0, 2, 4]} />,
  },
  "bk-s-122-sol": {
    wide: true,
    caption: r`All eight parts. A shift moves every sample; reversal mirrors the sequence about $n=0$; $x[3n]$ and $x[3n+1]$ keep only every third sample; (g) keeps the even-indexed samples; (h) reads $x$ only at the perfect squares $0,1,4,\dots$`,
    node: (
      <>
        <Row>
          {dt("(a) x[n − 4]", seq((n) => X(n - 4), -2, 9), [-2.5, 9.5])}
          {dt("(b) x[3 − n]", seq((n) => X(3 - n), -2, 9), [-2.5, 9.5])}
        </Row>
        <Row>
          {dt("(c) x[3n]", seq((n) => X(3 * n), -4, 4), [-4.5, 4.5])}
          {dt("(d) x[3n + 1]", seq((n) => X(3 * n + 1), -4, 4), [-4.5, 4.5])}
        </Row>
        <Row>
          {dt("(e) x[n] u[3 − n]", seq((n) => (n <= 3 ? X(n) : 0)))}
          {dt("(f) x[n − 2] δ[n − 2]", seq((n) => (n === 2 ? X(0) : 0)))}
        </Row>
        <Row>
          {dt("(g) ½x[n] + ½(−1)ⁿx[n]", seq((n) => (n % 2 === 0 ? X(n) : 0)))}
          {dt("(h) x[(n − 1)²]", seq((n) => X((n - 1) ** 2)))}
        </Row>
      </>
    ),
  },
  "bk-s-tan320": {
    wide: true,
    caption: r`$h(-k)$ mirrors $h(k)$ about $k=0$. $h(-k+2)=h(-(k-2))$ is that mirror image moved 2 to the right; $h(-k-3)=h(-(k+3))$ is it moved 3 to the left.`,
    node: (
      <>
        <Row>
          {kk("h(k)", H)}
          {kk("h(−k)", (k) => H(-k))}
        </Row>
        <Row>
          {kk("h(−k + 2)", (k) => H(-k + 2))}
          {kk("h(−k − 3)", (k) => H(-k - 3))}
        </Row>
      </>
    ),
  },
  "bk-s-123": {
    wide: true,
    caption: r`Figure P1.23, redrawn. (a) A triangle on $0<t<2$ with peak 1 at $t=1$. (b) Rises to 1 at $t=-1$, falls to 0 at $t=0$, rises to 1 at $t=1$ and then stays at 1. (c) $x(t)=-2t$ for $t<0$ and $x(t)=t$ for $t>0$.`,
    node: (
      <Row cols={3}>
        <Panel title="(a)">
          <Graph x={[-2.5, 2.5]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: xa, n: 400 }]} xTicks={[1, 2]} yTicks={[1]} height={130} />
        </Panel>
        <Panel title="(b)">
          <Graph x={[-3, 4]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: xb, n: 400 }]} xTicks={[-2, -1, 1]} yTicks={[1]} height={130} />
        </Panel>
        <Panel title="(c)">
          <Graph x={[-1.3, 2]} y={[-0.2, 2.8]} items={[{ kind: "fn", f: xc, n: 400 }]} xTicks={[-1, 1]} yTicks={[1, 2]} height={130} />
        </Panel>
      </Row>
    ),
  },
  "bk-s-123a": {
    wide: true,
    caption: r`(a) Each half-height copy of the triangle sits at $t=\pm1$. In the even part both copies are positive; in the odd part the copy at $t=-1$ is flipped.`,
    node: evOd(xa, [-2.5, 2.5], [-0.7, 0.8], [-2, -1, 1, 2]),
  },
  "bk-s-123b": {
    wide: true,
    caption: r`(b) Even part: $|t|$ for $|t|<1$, $\tfrac{3-|t|}{2}$ for $1<|t|<2$, and $\tfrac12$ beyond. Odd part: zero for $|t|<1$, $\tfrac{t-1}{2}$ for $1<t<2$, and $\tfrac12$ for $t>2$, mirrored with a sign change for $t<0$.`,
    node: evOd(xb, [-4, 4], [-0.7, 1.2], [-2, -1, 1, 2]),
  },
  "bk-s-123c": {
    wide: true,
    caption: r`(c) Even part $\tfrac32|t|$, a V shape. Odd part $-\tfrac t2$, a single straight line. Adding them gives back $-2t$ on the left and $t$ on the right.`,
    node: evOd(xc, [-1.5, 1.5], [-1, 2.4], [-1, 1]),
  },
  "bk-s-124": {
    wide: true,
    caption: r`Figure P1.24, redrawn. (a) $-1$ for $n\le-1$ and $+1$ for $n\ge0$. (b) Values $1,2,3$ at $n=-2,-1,0$ and $1$ at $n=7$. (c) $-1,2,2,1,1,2,1,-1$ at $n=-4,\dots,3$.`,
    node: (
      <Row cols={3}>
        <Panel title="(a)">
          <Graph x={[-6.5, 6.5]} y={[-1.4, 1.4]} xLabel="n" items={[{ kind: "stems", pts: seq(xa24, -6, 6) }]} xTicks={[-3, 0, 3]} yTicks={[1, -1]} height={130} />
        </Panel>
        <Panel title="(b)">
          <Graph x={[-4.5, 9.5]} y={[-0.3, 3.4]} xLabel="n" items={[{ kind: "stems", pts: seq(xb24, -4, 9), values: true }]} xTicks={[-2, 0, 7]} height={130} />
        </Panel>
        <Panel title="(c)">
          <Graph x={[-6.5, 6.5]} y={[-1.4, 2.6]} xLabel="n" items={[{ kind: "stems", pts: seq(xc24, -6, 6), values: true }]} xTicks={[-4, 0, 3]} height={130} />
        </Panel>
      </Row>
    ),
  },
  "bk-s-124a": {
    wide: true,
    caption: r`(a) The two halves cancel everywhere except $n=0$, so the even part is $\delta[n]$. The odd part is the "signum" sequence: $+1$ for $n>0$, $0$ at $n=0$, $-1$ for $n<0$.`,
    node: evOdD(xa24, -5, 5, [-1.4, 1.4]),
  },
  "bk-s-124b": {
    wide: true,
    caption: r`(b) Each sample at $n$ is split equally between $n$ and $-n$: in the even part with the same sign, in the odd part with opposite signs. Only $x[0]=3$ stays whole, in the even part.`,
    node: evOdD(xb24, -8, 8, [-1.4, 3.4]),
  },
  "bk-s-124c": {
    wide: true,
    caption: r`(c) Even part: $\tfrac{x[n]+x[-n]}{2}$, e.g. $\tfrac{2+1}{2}=\tfrac32$ at $n=\pm1$. Odd part: $\tfrac{x[n]-x[-n]}{2}$, e.g. $\tfrac{-1-2}{2}=-\tfrac32$ at $n=3$.`,
    node: evOdD(xc24, -5, 5, [-1.8, 1.8]),
  },
}
