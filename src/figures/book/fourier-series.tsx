import { Graph, Panel, PI, Row } from "../kit"
import type { FigureMap } from "../figure"
import { r, stems, type P } from "./util"

const per = (f: (t: number) => number, T: number, t0 = 0) => (t: number) => f(((((t - t0) % T) + T) % T) + t0)
const sq = per((t) => (t < 1 ? 1.5 : -1.5), 2)
const sq8 = per((t) => (t < 4 ? 1 : -1), 8)
const saw = per((t) => t, 2, -1)
const triw = per((t) => (t <= 1 ? t : 2 - t), 2)
const dsq = per((t) => (t < 1 ? 1 : -1), 2)
const partial = (coef: (k: number) => number, w0: number, K: number, kind: "sin" | "cos") => (t: number) => {
  let s = 0
  for (let k = 1; k <= K; k++) s += coef(k) * (kind === "sin" ? Math.sin(k * w0 * t) : Math.cos(k * w0 * t))
  return s
}

export const bookFourierSeriesFigures: FigureMap = {
  "bk-fs-33": {
    caption: r`Coefficient magnitudes $|a_k|$ for $x(t)=2+\cos\frac{2\pi}3t+4\sin\frac{5\pi}3t$ with $\omega_0=\frac\pi3$. Only $k=0,\pm2,\pm5$ are non-zero, so the harmonics $k=\pm1,\pm3,\pm4$ are simply absent.`,
    node: <Graph width={420} x={[-6.5, 6.5]} y={[-0.2, 2.5]} xLabel="k" yLabel="|aₖ|" items={[{ kind: "stems", pts: stems(-6, 6, (k) => ({ 0: 2, 2: 0.5, [-2]: 0.5, 5: 2, [-5]: 2 })[k] ?? 0), values: true }]} xTicks={[-5, -2, 0, 2, 5]} />,
  },
  "bk-fs-34": {
    caption: r`The $\pm1.5$ square wave (ochre) and the sum of its first three non-zero harmonics, $k=\pm1,\pm3,\pm5$ (sage). Only odd harmonics appear, each with size $\frac{3}{k\pi}$, so they shrink like $1/k$.`,
    node: <Graph width={440} x={[-2.2, 2.2]} y={[-2.2, 2.2]} items={[{ kind: "fn", f: sq, tone: "second", n: 1200 }, { kind: "fn", f: partial((k) => (k % 2 ? 6 / (k * PI) : 0), PI, 5, "sin"), n: 800 }]} xTicks={[-2, -1, 1, 2]} yTicks={[1.5, -1.5]} />,
  },
  "bk-fs-313": {
    wide: true,
    caption: r`Left: the square wave has harmonics at $\omega=k\frac\pi4$ (odd $k$ only). Right: $H(j\omega)=\frac{\sin4\omega}{\omega}$ is zero at **every** multiple of $\frac\pi4$ except $\omega=0$, so it removes every harmonic, and the DC term is already zero.`,
    node: (
      <Row>
        <Panel title="x(t), period 8">
          <Graph x={[-9, 9]} y={[-1.5, 1.5]} items={[{ kind: "fn", f: sq8, n: 1200 }]} xTicks={[-8, -4, 4, 8]} yTicks={[1, -1]} height={140} />
        </Panel>
        <Panel title="H(jω) = sin 4ω / ω">
          <Graph x={[-3.4, 3.4]} y={[-1.2, 4.4]} xLabel="ω" items={[{ kind: "fn", f: (w) => (Math.abs(w) < 1e-6 ? 4 : Math.sin(4 * w) / w), n: 700 }, { kind: "dots", pts: [-4, -3, -2, -1, 1, 2, 3, 4].map((k) => [(k * PI) / 4, 0] as P), tone: "second" }]} xTicks={[[-PI / 2, "−π/2"], [PI / 4, "π/4"], [PI / 2, "π/2"], [PI, "π"]]} yTicks={[4]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-fs-315": {
    caption: r`With $\omega_0=12$ the harmonics sit at $0,\pm12,\pm24,\dots$ The ideal low-pass filter keeps $|\omega|\le100$, which covers $|k|\le8$ (up to $\pm96$). Harmonic 9 at $108$ would be removed, so for $y=x$ it must already be zero.`,
    node: <Graph width={460} x={[-130, 130]} y={[-0.2, 1.4]} xLabel="ω" items={[{ kind: "path", pts: [[-130, 0], [-100, 0], [-100, 1], [100, 1], [100, 0], [130, 0]], tone: "muted" }, { kind: "stems", pts: stems(-8, 8, () => 0.7).map(([k, v]) => [12 * k, v] as P) }, { kind: "stems", pts: [-10, -9, 9, 10].map((k) => [12 * k, 0.7] as P), tone: "second" }]} xTicks={[-108, [-100, ""], 0, [100, "100"], 108]} yTicks={[1]} />,
  },
  "bk-fs-322a": {
    caption: r`Figure P3.22(a): the sawtooth $x(t)=t$ for $-1<t<1$, repeated with period 2. Overlaid is the sum of its first six harmonics, $\sum_{k=1}^{6}\frac{2(-1)^{k+1}}{k\pi}\sin k\pi t$; note the overshoot at the jumps.`,
    node: <Graph width={440} x={[-3.2, 3.2]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: saw, tone: "second", n: 1200 }, { kind: "fn", f: partial((k) => (2 * (-1) ** (k + 1)) / (k * PI), PI, 6, "sin"), n: 900 }]} xTicks={[-3, -2, -1, 1, 2, 3]} yTicks={[1, -1]} />,
  },
  "bk-fs-322d": {
    caption: r`Figure P3.22(d), redrawn: impulses of area $+1$ at even $t$ and $-2$ at odd $t$; the period is 2.`,
    node: <Graph width={440} x={[-4.5, 6.5]} y={[-2.5, 1.4]} items={[{ kind: "impulses", pts: [-4, -2, 0, 2, 4, 6].map((t) => [t, 1] as P) }, { kind: "impulses", pts: [-3, -1, 1, 3, 5].map((t) => [t, -2] as P), tone: "second" }]} xTicks={[-4, -2, 2, 4, 6]} yTicks={[1, -2]} />,
  },
  "bk-fs-322d-sol": {
    caption: r`The coefficients alternate: $a_k=-\tfrac12$ for even $k$ and $\tfrac32$ for odd $k$. They never decay, the signature of impulses in time.`,
    node: <Graph width={420} x={[-6.5, 6.5]} y={[-0.8, 1.8]} xLabel="k" yLabel="aₖ" items={[{ kind: "stems", pts: stems(-6, 6, (k) => (k % 2 === 0 ? -0.5 : 1.5)), values: true }]} xTicks={[-6, -3, 0, 3, 6]} />,
  },
  "bk-fs-323": {
    wide: true,
    caption: r`The four signals of period 4 recovered from their coefficients. (a) A pulse of width 1 centred at $t=-1$, lowered by its average $\tfrac14$. (b) Pulses of height $\tfrac12$ and width $\tfrac12$ centred at $t=2+4m$. (c) Two sine terms. (d) Impulses of area 6 at $t=4m$ and $-2$ at $t=2+4m$.`,
    node: (
      <>
        <Row>
          <Panel title="(a)">
            <Graph x={[-5, 5]} y={[-0.5, 1]} items={[{ kind: "fn", f: per((t) => (t > -1.5 && t < -0.5 ? 0.75 : -0.25), 4, -2), n: 1200 }]} xTicks={[[-1.5, "−3/2"], [-0.5, "−½"], 2.5]} yTicks={[[0.75, "¾"], [-0.25, "−¼"]]} height={140} />
          </Panel>
          <Panel title="(b)">
            <Graph x={[-5, 5]} y={[-0.15, 0.7]} items={[{ kind: "fn", f: per((t) => (Math.abs(t - 2) < 0.25 ? 0.5 : 0), 4), n: 1600 }]} xTicks={[-2, 2]} yTicks={[[0.5, "½"]]} height={140} />
          </Panel>
        </Row>
        <Row>
          <Panel title="(c) −2 sin(πt/2) − 4 sin(πt)">
            <Graph x={[-4, 4]} y={[-6.5, 6.5]} items={[{ kind: "fn", f: (t) => -2 * Math.sin((PI * t) / 2) - 4 * Math.sin(PI * t), n: 700 }]} xTicks={[-4, -2, 2, 4]} yTicks={[5, -5]} height={140} />
          </Panel>
          <Panel title="(d)">
            <Graph x={[-5, 7]} y={[-2.6, 6.8]} items={[{ kind: "impulses", pts: [[-4, 6], [0, 6], [4, 6]] }, { kind: "impulses", pts: [[-2, -2], [2, -2], [6, -2]], tone: "second" }]} xTicks={[-4, -2, 2, 4, 6]} yTicks={[6, -2]} height={140} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-fs-324": {
    wide: true,
    caption: r`Left: the triangle wave $x(t)$ of Problem 3.24. Right: its derivative, a $\pm1$ square wave. Differentiating multiplies $a_k$ by $jk\omega_0$, so dividing the square wave's coefficients by $jk\pi$ gives the triangle's, which fall off like $1/k^2$.`,
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-2.3, 4.3]} y={[-0.3, 1.3]} items={[{ kind: "fn", f: triw, n: 800 }]} xTicks={[-2, -1, 1, 2, 3, 4]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="dx/dt">
          <Graph x={[-2.3, 4.3]} y={[-1.4, 1.4]} items={[{ kind: "fn", f: dsq, n: 1200, tone: "second" }]} xTicks={[-2, -1, 1, 2, 3, 4]} yTicks={[1, -1]} height={140} />
        </Panel>
      </Row>
    ),
  },
}
