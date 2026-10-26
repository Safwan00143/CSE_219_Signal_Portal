import { Blocks, Graph, Panel, PI, Plane, Row } from "../kit"
import type { FigureMap } from "../figure"
import { r, stems } from "./util"

const third = 1 / 3
const c45 = Math.SQRT1_2 / 3
const zmag = (num: number[], den: number[]) => (w: number) => {
  const ev = (c: number[]) => {
    let re = 0
    let im = 0
    c.forEach((v, k) => {
      re += v * Math.cos(w * k)
      im -= v * Math.sin(w * k)
    })
    return Math.hypot(re, im)
  }
  return ev(num) / ev(den)
}
const piTicks: [number, string][] = [[-PI, "−π"], [PI, "π"]]

export const bookZFigures: FigureMap = {
  "bk-z-102": {
    caption: r`$X(z)=\frac{1}{125}\,\frac{z^{-3}}{1-\frac15z^{-1}}=\frac1{125}\,\frac{1}{z^2(z-\frac15)}$: a pole at $z=\frac15$ and a double pole at $z=0$ (from the delay). The signal is right-sided, so the ROC is outside the outermost pole: $|z|>\frac15$.`,
    node: <Plane kind="z" range={1.4} poles={[[0.2, 0], [0, 0]]} poleOrder={[{ at: [0, 0], text: "(2)" }]} ring={{ inner: 0.2, outer: Infinity }} />,
  },
  "bk-z-104": {
    caption: r`Poles at $z=\frac13e^{\pm j\pi/4}$ and a zero at $z=\frac{\sqrt2}3$. The signal lives on $n\le0$, so the ROC is the disc **inside** the poles: $|z|<\frac13$. The unit circle is outside the ROC, so the DTFT does not exist; indeed $\left(\frac13\right)^n$ blows up as $n\to-\infty$.`,
    node: <Plane kind="z" range={1.4} poles={[[c45, c45], [c45, -c45]]} zeros={[[Math.SQRT2 / 3, 0]]} ring={{ inner: 0, outer: third }} />,
  },
  "bk-z-107": {
    wide: true,
    caption: r`After the factor $(1+\frac12z^{-1})$ cancels, the poles sit on two circles: $|z|=\frac12$ (at $\pm\frac j2$) and $|z|=\frac34$ (at $-\frac34$). The zero at $z=\frac12$ does not limit the ROC. Two circles give three possible ROCs.`,
    node: (
      <Row cols={3}>
        <Panel title="|z| < ½">
          <Plane kind="z" range={1.2} poles={[[0, 0.5], [0, -0.5], [-0.75, 0]]} zeros={[[0.5, 0]]} ring={{ inner: 0, outer: 0.5 }} size={160} />
        </Panel>
        <Panel title="½ < |z| < ¾">
          <Plane kind="z" range={1.2} poles={[[0, 0.5], [0, -0.5], [-0.75, 0]]} zeros={[[0.5, 0]]} ring={{ inner: 0.5, outer: 0.75 }} size={160} />
        </Panel>
        <Panel title="|z| > ¾">
          <Plane kind="z" range={1.2} poles={[[0, 0.5], [0, -0.5], [-0.75, 0]]} zeros={[[0.5, 0]]} ring={{ inner: 0.75, outer: Infinity }} size={160} />
        </Panel>
      </Row>
    ),
  },
  "bk-z-1012": {
    wide: true,
    caption: r`Top: pole–zero plots. Bottom: $|X(e^{j\omega})|$ on $-\pi<\omega\le\pi$. (a) A pole near $z=-1$ boosts $\omega=\pm\pi$: high-pass. (b) A double pole near $z=1$ boosts $\omega=0$, and the zero near $z=-1$ removes $\omega=\pi$: low-pass. (c) Poles near $z=\pm j$ boost $\omega=\pm\frac\pi2$: band-pass.`,
    node: (
      <>
        <Row cols={3}>
          <Panel title="(a)">
            <Plane kind="z" range={1.3} poles={[[-8 / 9, 0]]} zeros={[]} size={150} />
          </Panel>
          <Panel title="(b)">
            <Plane kind="z" range={1.3} poles={[[8 / 9, 0]]} zeros={[[-8 / 9, 0]]} poleOrder={[{ at: [8 / 9, 0], text: "(2)" }]} size={150} />
          </Panel>
          <Panel title="(c)">
            <Plane kind="z" range={1.3} poles={[[0, 8 / 9], [0, -8 / 9]]} size={150} />
          </Panel>
        </Row>
        <Row cols={3}>
          <Panel title="|X₁|">
            <Graph x={[-3.5, 3.5]} y={[-0.4, 10]} xLabel="ω" items={[{ kind: "fn", f: zmag([0, 1], [1, 8 / 9]), n: 500 }]} xTicks={piTicks} yTicks={[9]} height={120} />
          </Panel>
          <Panel title="|X₂|">
            <Graph x={[-3.5, 3.5]} y={[-8, 170]} xLabel="ω" items={[{ kind: "fn", f: zmag([1, 8 / 9], [1, -16 / 9, 64 / 81]), n: 700, tone: "second" }]} xTicks={piTicks} yTicks={[153]} height={120} />
          </Panel>
          <Panel title="|X₃|">
            <Graph x={[-3.5, 3.5]} y={[-0.3, 5.3]} xLabel="ω" items={[{ kind: "fn", f: zmag([1], [1, 0, 64 / 81]), n: 700 }]} xTicks={[[-PI / 2, "−π/2"], [PI / 2, "π/2"]]} yTicks={[[81 / 17, "81/17"]]} height={120} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-z-1013": {
    wide: true,
    caption: r`The rectangle $x[n]$ (left) and its first difference $g[n]=x[n]-x[n-1]=\delta[n]-\delta[n-6]$ (right): $+1$ where the pulse switches on, $-1$ just after it switches off.`,
    node: (
      <Row>
        <Panel title="x[n]">
          <Graph x={[-2.5, 8.5]} y={[-1.4, 1.4]} xLabel="n" items={[{ kind: "stems", pts: stems(-2, 8, (n) => (n >= 0 && n <= 5 ? 1 : 0)) }]} xTicks={[0, 5]} yTicks={[1]} height={130} />
        </Panel>
        <Panel title="g[n]">
          <Graph x={[-2.5, 8.5]} y={[-1.4, 1.4]} xLabel="n" items={[{ kind: "stems", pts: stems(-2, 8, (n) => (n === 0 ? 1 : n === 6 ? -1 : 0)), tone: "second" }]} xTicks={[0, 6]} yTicks={[1, -1]} height={130} />
        </Panel>
      </Row>
    ),
  },
  "bk-z-1018": {
    caption: r`Figure P10.18, redrawn: a direct-form II structure. The left column feeds back $\frac23w[n-1]$ and $-\frac19w[n-2]$; the right column feeds forward $-6w[n-1]$ and $8w[n-2]$.`,
    node: (
      <Blocks
        width={460}
        height={210}
        nodes={[
          { id: "x", x: 26, y: 26, shape: "text", label: "x[n]" },
          { id: "s1", x: 90, y: 26, shape: "sum" },
          { id: "s2", x: 90, y: 104, shape: "sum" },
          { id: "d1", x: 230, y: 66, label: "z⁻¹", w: 42, h: 28 },
          { id: "d2", x: 230, y: 146, label: "z⁻¹", w: 42, h: 28 },
          { id: "a1", x: 160, y: 104, label: "2/3", w: 44, h: 26 },
          { id: "a2", x: 160, y: 186, label: "−1/9", w: 48, h: 26 },
          { id: "b1", x: 300, y: 104, label: "−6", w: 44, h: 26 },
          { id: "b2", x: 300, y: 186, label: "8", w: 44, h: 26 },
          { id: "s3", x: 370, y: 104, shape: "sum" },
          { id: "s4", x: 370, y: 26, shape: "sum" },
          { id: "y", x: 432, y: 26, shape: "text", label: "y[n]" },
        ]}
        wires={[
          { pts: [[48, 26], [79, 26]] },
          { pts: [[101, 26], [359, 26]] },
          { pts: [[230, 26], [230, 52]] },
          { pts: [[230, 80], [230, 132]] },
          { pts: [[230, 104], [182, 104]] },
          { pts: [[138, 104], [101, 104]] },
          { pts: [[90, 93], [90, 37]] },
          { pts: [[230, 104], [278, 104]] },
          { pts: [[322, 104], [359, 104]] },
          { pts: [[370, 93], [370, 37]] },
          { pts: [[230, 160], [230, 186], [184, 186]] },
          { pts: [[136, 186], [90, 186], [90, 115]] },
          { pts: [[230, 186], [278, 186]] },
          { pts: [[322, 186], [370, 186], [370, 115]] },
          { pts: [[381, 26], [412, 26]] },
        ]}
      />
    ),
  },
  "bk-z-1018-sol": {
    caption: r`$H(z)=\frac{(1-2z^{-1})(1-4z^{-1})}{(1-\frac13z^{-1})^2}$: a double pole at $z=\frac13$, inside the unit circle, and zeros at $z=2$ and $z=4$. The system is causal, so its ROC is $|z|>\frac13$, which contains the unit circle: stable. Zeros outside the circle do not affect stability.`,
    node: <Plane kind="z" range={4.6} poles={[[third, 0]]} zeros={[[2, 0], [4, 0]]} poleOrder={[{ at: [third, 0], text: "(2)" }]} ring={{ inner: third, outer: Infinity }} />,
  },
  "bk-z-tan510": {
    caption: r`$y(n)=1.2308(0.8)^n-0.2308(-0.5)^n$. The first term follows the input $2(0.8)^n$, and the second is the system's own mode $(-0.5)^n$, which dies out quickly. The stems match the recursion: $y(0)=1$, $y(1)=1.1$, $y(2)=0.73$.`,
    node: <Graph width={420} x={[-1.5, 12.5]} y={[-0.1, 1.3]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 12, (n) => (1.6 / 1.3) * 0.8 ** n - (0.3 / 1.3) * (-0.5) ** n) }]} xTicks={[0, 4, 8, 12]} yTicks={[1]} />,
  },
  "bk-z-tan514": {
    wide: true,
    caption: r`Left: the impulse response $h(n)=5(0.5)^n-4(0.2)^n$. Right: the step response $5-5(0.5)^n+(0.2)^n$, which settles at $H(1)=5$, the DC gain.`,
    node: (
      <Row>
        <Panel title="h(n)">
          <Graph x={[-0.7, 10.7]} y={[-0.1, 2]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 10, (n) => 5 * 0.5 ** n - 4 * 0.2 ** n) }]} xTicks={[0, 5, 10]} yTicks={[1, 1.7]} height={150} />
        </Panel>
        <Panel title="step response">
          <Graph x={[-0.7, 10.7]} y={[-0.2, 5.6]} xLabel="n" items={[{ kind: "hline", y: 5, tone: "muted", dashed: true }, { kind: "stems", pts: stems(0, 10, (n) => 5 - 5 * 0.5 ** n + 0.2 ** n), tone: "second" }]} xTicks={[0, 5, 10]} yTicks={[5]} height={150} />
        </Panel>
      </Row>
    ),
  },
}
