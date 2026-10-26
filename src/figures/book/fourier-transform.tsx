import { Graph, Panel, PI, Row } from "../kit"
import type { FigureMap } from "../figure"
import { r, type P } from "./util"

const x0 = (t: number) => (t >= 0 && t <= 1 ? Math.exp(-t) : 0)
const X421 = (w: number) => (Math.abs(w) < 1e-4 ? 0 : (2 / w) * (Math.cos(2 * w) - Math.sin(w) / w))
const y422 = (t: number) => (Math.abs(t) < 1e-4 ? 1 / (2 * PI) : (Math.sin(t) / t + (Math.cos(t) - 1) / (t * t)) / PI)
const x425 = (t: number) => (t < -1 || t > 3 ? 0 : t < 0 ? 2 : t < 1 ? 2 - t : t < 2 ? t : 2)
const sinc45 = (t: number) => {
  const s = t - 1.5
  return Math.abs(s) < 1e-6 ? -6 / PI : (-2 * Math.sin(3 * s)) / (PI * s)
}

export const bookFourierTransformFigures: FigureMap = {
  "bk-ft-41": {
    wide: true,
    caption: r`Both transforms have the factor $e^{-j\omega}$ from the delay by 1, which changes only the phase. (a) The one-sided exponential has $|X|=\frac1{\sqrt{4+\omega^2}}$, falling slowly like $1/|\omega|$ because of the jump. (b) The two-sided exponential has $|X|=\frac{4}{4+\omega^2}$, falling like $1/\omega^2$ because the signal is continuous.`,
    node: (
      <Row>
        <Panel title="(a) |X(jω)| = 1/√(4 + ω²)">
          <Graph x={[-10, 10]} y={[-0.05, 0.6]} xLabel="ω" items={[{ kind: "fn", f: (w) => 1 / Math.sqrt(4 + w * w), n: 400 }]} xTicks={[-8, -4, 4, 8]} yTicks={[[0.5, "½"]]} height={140} />
        </Panel>
        <Panel title="(b) |X(jω)| = 4/(4 + ω²)">
          <Graph x={[-10, 10]} y={[-0.1, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => 4 / (4 + w * w), n: 400, tone: "second" }]} xTicks={[-8, -4, 4, 8]} yTicks={[1]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-ft-43": {
    caption: r`Part (b): a periodic signal has a spectrum made only of impulses. $1$ gives $2\pi\delta(\omega)$; the cosine gives impulses of area $\pi$ at $\omega=\pm6\pi$, carrying the phases $\pm\frac\pi8$ (magnitudes shown).`,
    node: <Graph width={420} x={[-25, 25]} y={[-0.4, 7.5]} xLabel="ω" items={[{ kind: "impulses", pts: [[0, 2 * PI, "2π"], [-6 * PI, PI, "π"], [6 * PI, PI, "π"]] }]} xTicks={[[-6 * PI, "−6π"], [6 * PI, "6π"]]} />,
  },
  "bk-ft-45": {
    wide: true,
    caption: r`Left: $|X(j\omega)|=2$ on $|\omega|<3$. Right: $x(t)=-\frac{2\sin3(t-\frac32)}{\pi(t-\frac32)}$, a sinc centred at $t=\frac32$ (the linear phase $-\frac32\omega$ is a delay) and turned upside down (the phase $+\pi$ is a sign flip). Its zeros are at $t=\frac32+\frac{k\pi}3$, $k\ne0$ (dots).`,
    node: (
      <Row>
        <Panel title="|X(jω)|">
          <Graph x={[-5, 5]} y={[-0.3, 2.6]} xLabel="ω" items={[{ kind: "path", pts: [[-5, 0], [-3, 0], [-3, 2], [3, 2], [3, 0], [5, 0]], area: true }]} xTicks={[-3, 3]} yTicks={[2]} height={140} />
        </Panel>
        <Panel title="x(t)">
          <Graph x={[-4, 7]} y={[-2.2, 0.7]} items={[{ kind: "fn", f: sinc45, n: 800, tone: "second" }, { kind: "dots", pts: [-2, -1, 1, 2, 3, 4].map((k) => [1.5 + (k * PI) / 3, 0] as P), tone: "accent" }]} xTicks={[[1.5, "3/2"], [1.5 + PI / 3, ""], [1.5 + PI, "3/2 + π"]]} yTicks={[[-6 / PI, "−6/π"]]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-ft-48": {
    wide: true,
    caption: r`Left: $x(t)$ ramps from 0 to 1 over $|t|<\frac12$ and then stays at 1. Right: its derivative is the unit rectangle of width 1, whose transform $\frac{2\sin(\omega/2)}{\omega}$ is in every table. Integrating back adds the DC term $\pi\delta(\omega)$, because $x$ ends at a non-zero level.`,
    node: (
      <Row>
        <Panel title="x(t)">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => (t < -0.5 ? 0 : t < 0.5 ? t + 0.5 : 1), n: 400 }]} xTicks={[[-0.5, "−½"], [0.5, "½"]]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="dx/dt">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-0.5, 0], [-0.5, 1], [0.5, 1], [0.5, 0], [2, 0]], tone: "second", area: true }]} xTicks={[[-0.5, "−½"], [0.5, "½"]]} yTicks={[1]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-ft-49": {
    wide: true,
    caption: r`$x(t)=\frac{t+1}2$ on $|t|\le1$ (left) splits into an even part, a pulse of height $\frac12$ (middle), and an odd part, the ramp $\frac t2$ (right). The even part gives the real part of $X$; the odd part gives the imaginary part.`,
    node: (
      <Row cols={3}>
        <Panel title="x(t)">
          <Graph x={[-1.6, 1.6]} y={[-0.7, 1.2]} items={[{ kind: "path", pts: [[-1.6, 0], [-1, 0], [-1, 0], [1, 1], [1, 0], [1.6, 0]] }]} xTicks={[-1, 1]} yTicks={[1]} height={130} />
        </Panel>
        <Panel title="even part">
          <Graph x={[-1.6, 1.6]} y={[-0.7, 1.2]} items={[{ kind: "path", pts: [[-1.6, 0], [-1, 0], [-1, 0.5], [1, 0.5], [1, 0], [1.6, 0]] }]} xTicks={[-1, 1]} yTicks={[[0.5, "½"]]} height={130} />
        </Panel>
        <Panel title="odd part">
          <Graph x={[-1.6, 1.6]} y={[-0.7, 1.2]} items={[{ kind: "path", pts: [[-1.6, 0], [-1, 0], [-1, -0.5], [1, 0.5], [1, 0], [1.6, 0]], tone: "second" }]} xTicks={[-1, 1]} yTicks={[[0.5, "½"], [-0.5, "−½"]]} height={130} />
        </Panel>
      </Row>
    ),
  },
  "bk-ft-421a": {
    caption: r`Figure P4.21(a), redrawn: $x(t)=-1$ on $(-2,-1)$, $x(t)=t$ on $(-1,1)$, $x(t)=1$ on $(1,2)$, and zero outside. It is real and odd.`,
    node: <Graph x={[-3, 3]} y={[-1.4, 1.4]} items={[{ kind: "path", pts: [[-3, 0], [-2, 0], [-2, -1], [-1, -1], [1, 1], [2, 1], [2, 0], [3, 0]] }]} xTicks={[-2, -1, 1, 2]} yTicks={[1, -1]} />,
  },
  "bk-ft-421a-sol": {
    caption: r`$X(j\omega)$ is purely imaginary (because $x$ is real and odd); plotted is $\mathrm{Im}\,X=\frac2\omega\left(\cos2\omega-\frac{\sin\omega}{\omega}\right)$. It is zero at $\omega=0$, since an odd signal has zero area.`,
    node: <Graph width={420} x={[-12, 12]} y={[-2.6, 2.6]} xLabel="ω" items={[{ kind: "fn", f: X421, n: 900, tone: "second" }]} xTicks={[-10, -5, 5, 10]} yTicks={[2, -2]} />,
  },
  "bk-ft-422a": {
    wide: true,
    caption: r`Figure P4.22(a), redrawn: $|X(j\omega)|=|\omega|$ for $|\omega|<1$ and 0 outside; $\angle X(j\omega)=-3\omega$.`,
    node: (
      <Row>
        <Panel title="|X(jω)|">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} xLabel="ω" items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [-1, 1], [0, 0], [1, 1], [1, 0], [2, 0]] }]} xTicks={[-1, 1]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="∠X(jω)">
          <Graph x={[-1.5, 1.5]} y={[-4.5, 4.5]} xLabel="ω" items={[{ kind: "fn", f: (w) => -3 * w, tone: "second" }]} xTicks={[-1, 1]} yTicks={[3, -3]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-ft-422a-sol": {
    caption: r`$x(t)=\frac1\pi\left[\frac{\sin(t-3)}{t-3}+\frac{\cos(t-3)-1}{(t-3)^2}\right]$: the inverse of the "V"-shaped band, delayed by 3 (the phase $-3\omega$). Its peak is $\frac1{2\pi}$ at $t=3$, equal to the area of $|X|$ divided by $2\pi$.`,
    node: <Graph width={440} x={[-12, 18]} y={[-0.1, 0.2]} items={[{ kind: "fn", f: (t) => y422(t - 3), n: 900 }]} xTicks={[-9, -3, 3, 9, 15]} yTicks={[[1 / (2 * PI), "1/2π"]]} />,
  },
  "bk-ft-423": {
    wide: true,
    caption: r`Figure P4.23, redrawn. Every signal is built from $x_0(t)=e^{-t}$ on $0\le t\le1$: (a) $x_0(t)+x_0(-t)$, (b) $x_0(t)-x_0(-t)$, (c) $x_0(t)+x_0(t+1)$, (d) $t\,x_0(t)$.`,
    node: (
      <>
        <Row>
          <Panel title="(a) x₁(t)">
            <Graph x={[-1.6, 1.6]} y={[-1.2, 1.2]} items={[{ kind: "fn", f: (t) => x0(t) + x0(-t), n: 600 }]} xTicks={[-1, 1]} yTicks={[1]} height={130} />
          </Panel>
          <Panel title="(b) x₂(t)">
            <Graph x={[-1.6, 1.6]} y={[-1.2, 1.2]} items={[{ kind: "fn", f: (t) => (t > 0 ? x0(t) : t < 0 ? -x0(-t) : 0), n: 600 }]} xTicks={[-1, 1]} yTicks={[1, -1]} height={130} />
          </Panel>
        </Row>
        <Row>
          <Panel title="(c) x₃(t)">
            <Graph x={[-1.6, 1.6]} y={[-1.2, 1.2]} items={[{ kind: "fn", f: (t) => (t < 0 ? x0(t + 1) : x0(t)), n: 600 }]} xTicks={[-1, 1]} yTicks={[1]} height={130} />
          </Panel>
          <Panel title="(d) x₄(t)">
            <Graph x={[-1.6, 1.6]} y={[-1.2, 1.2]} items={[{ kind: "fn", f: (t) => t * x0(t), n: 600 }]} xTicks={[-1, 1]} yTicks={[1]} height={130} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-ft-425": {
    caption: r`Figure P4.25, redrawn: $x(t)=2$ on $(-1,0)$, then a V from 2 down to 1 at $t=1$ and back to 2 at $t=2$, then 2 on $(2,3)$. It is symmetric about $t=1$ (dashed).`,
    node: <Graph x={[-2, 4]} y={[-0.3, 2.6]} items={[{ kind: "vline", x: 1, tone: "muted", dashed: true }, { kind: "path", pts: [[-2, 0], [-1, 0], [-1, 2], [0, 2], [1, 1], [2, 2], [3, 2], [3, 0], [4, 0]] }]} xTicks={[-1, 1, 2, 3]} yTicks={[1, 2]} />,
  },
  "bk-ft-425-sol": {
    caption: r`Part (f): the inverse transform of $\mathrm{Re}\{X(j\omega)\}$ is the even part $x_e(t)=\frac{x(t)+x(-t)}2$. For $t>0$ it is $2-\frac t2$ on $(0,1)$, $\frac t2$ on $(1,2)$, $1$ on $(2,3)$, and 0 beyond; for $t<0$ it is the mirror image.`,
    node: <Graph x={[-4, 4]} y={[-0.3, 2.4]} items={[{ kind: "fn", f: (t) => (x425(t) + x425(-t)) / 2, n: 1600, tone: "second" }]} xTicks={[-3, -2, -1, 1, 2, 3]} yTicks={[[0.5, "½"], 1, 2]} />,
  },
}
