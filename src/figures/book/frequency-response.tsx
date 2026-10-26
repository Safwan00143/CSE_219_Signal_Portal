import { Graph, Panel, PI, Row, tri } from "../kit"
import type { FigureMap } from "../figure"
import { r } from "./util"

const mag = (re: number, im: number) => Math.hypot(re, im)
const ph = (w: number) => -Math.atan(w)
const phPanel = (title: string, f: (w: number) => number, slope?: number) => (
  <Panel title={title}>
    <Graph x={[-6, 6]} y={[-5, 5]} xLabel="ω" items={[...(slope !== undefined ? [{ kind: "fn" as const, f: (w: number) => slope * w, tone: "muted" as const, dashed: true }] : []), { kind: "fn", f, n: 400, tone: "second" }]} xTicks={[-4, 4]} yTicks={[[PI / 2, "π/2"], [-PI / 2, "−π/2"]]} height={130} />
  </Panel>
)

export const bookFrequencyResponseFigures: FigureMap = {
  "bk-fr-63": {
    wide: true,
    caption: r`$H(j\omega)=\frac{1-j\omega}{1+j\omega}$ is all-pass: $|H|=1$ at every frequency. Its phase $-2\arctan\omega$ (left) falls from $0$ towards $-\pi$, and the group delay $\tau(\omega)=\frac{2}{1+\omega^2}$ (right) is positive everywhere: low frequencies are delayed most.`,
    node: (
      <Row>
        <Panel title="∠H(jω) = −2 arctan ω">
          <Graph x={[-6, 6]} y={[-3.6, 3.6]} xLabel="ω" items={[{ kind: "fn", f: (w) => -2 * Math.atan(w), n: 400 }]} xTicks={[-4, 4]} yTicks={[[PI, "π"], [-PI, "−π"]]} height={140} />
        </Panel>
        <Panel title="τ(ω) = 2/(1 + ω²)">
          <Graph x={[-6, 6]} y={[-0.2, 2.4]} xLabel="ω" items={[{ kind: "fn", f: (w) => 2 / (1 + w * w), n: 400, tone: "second", area: true }]} xTicks={[-4, 4]} yTicks={[2]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-fr-431": {
    caption: r`$|H(j\omega)|$ for the three systems: $h_1=u(t)$ (sage), $h_2=-2\delta(t)+5e^{-2t}u(t)$ (ochre), $h_3=2te^{-t}u(t)$ (dashed). They are completely different filters, yet all three equal $-j$ at $\omega=1$ (dot), so they respond identically to $\cos t$.`,
    node: <Graph width={440} x={[0, 5]} y={[0, 2.6]} xLabel="ω" items={[{ kind: "fn", f: (w) => Math.min(1 / w, 2.6), from: 0.38, n: 300 }, { kind: "fn", f: (w) => mag(1, -2 * w) / mag(2, w), n: 300, tone: "second" }, { kind: "fn", f: (w) => 2 / (1 + w * w), n: 300, tone: "ink", dashed: true }, { kind: "dots", pts: [[1, 1]] }]} xTicks={[1, 2, 3, 4]} yTicks={[1, 2]} />,
  },
  "bk-fr-432": {
    caption: r`$H(j\omega)$ is an ideal low-pass filter with cutoff $4$ and a delay of 1. Inputs at $\omega=3$ (ochre) pass, delayed by 1; inputs at $\omega=6$ (dashed) are removed.`,
    node: <Graph width={420} x={[-8, 8]} y={[-0.2, 1.4]} xLabel="ω" items={[{ kind: "path", pts: [[-8, 0], [-4, 0], [-4, 1], [4, 1], [4, 0], [8, 0]], area: true }, { kind: "vline", x: 3, tone: "second" }, { kind: "vline", x: -3, tone: "second" }, { kind: "vline", x: 6, tone: "muted", dashed: true }, { kind: "vline", x: -6, tone: "muted", dashed: true }]} xTicks={[-6, -4, -3, 3, 4, 6]} yTicks={[1]} />,
  },
  "bk-fr-65": {
    wide: true,
    caption: r`Left: the ideal band-pass filter, passing $\omega_c\le|\omega|\le3\omega_c$ (here $\omega_c=1$). Right: its impulse response $h(t)=\frac{\sin\omega_ct}{\pi t}\cdot2\cos2\omega_ct$, a low-pass sinc envelope (dashed) multiplied by a cosine at the band centre $2\omega_c$.`,
    node: (
      <Row>
        <Panel title="H(jω)">
          <Graph x={[-4.5, 4.5]} y={[-0.2, 1.4]} xLabel="ω" items={[{ kind: "path", pts: [[-4.5, 0], [-3, 0], [-3, 1], [-1, 1], [-1, 0], [1, 0], [1, 1], [3, 1], [3, 0], [4.5, 0]], area: true }]} xTicks={[-3, -1, 1, 3]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="h(t)">
          <Graph x={[-10, 10]} y={[-0.8, 0.8]} items={[{ kind: "fn", f: (t) => (Math.abs(t) < 1e-6 ? 2 / PI : (2 * Math.sin(t) * Math.cos(2 * t)) / (PI * t)), n: 900, tone: "second" }, { kind: "fn", f: (t) => (Math.abs(t) < 1e-6 ? 2 / PI : (2 * Math.sin(t)) / (PI * t)), n: 400, tone: "muted", dashed: true }]} xTicks={[-2 * PI, 2 * PI].map((v) => [v, v < 0 ? "−2π" : "2π"] as [number, string])} yTicks={[[2 / PI, "2/π"]]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-fr-319": {
    wide: true,
    caption: r`$H(j\omega)=\frac{1}{1+j\omega}$ for the RL circuit: a first-order low-pass filter. At $\omega=1$ (dots) the gain is $\frac1{\sqrt2}$ and the phase is $-\frac\pi4$, which is exactly what the output for $x=\cos t$ shows.`,
    node: (
      <Row>
        <Panel title="|H(jω)|">
          <Graph x={[-5, 5]} y={[-0.1, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => 1 / Math.sqrt(1 + w * w), n: 400 }, { kind: "dots", pts: [[1, 1 / Math.SQRT2]], tone: "second" }]} xTicks={[-1, 1, 3]} yTicks={[1, [1 / Math.SQRT2, "1/√2"]]} height={140} />
        </Panel>
        <Panel title="∠H(jω)">
          <Graph x={[-5, 5]} y={[-1.8, 1.8]} xLabel="ω" items={[{ kind: "fn", f: ph, n: 400 }, { kind: "dots", pts: [[1, -PI / 4]], tone: "second" }]} xTicks={[-1, 1, 3]} yTicks={[[PI / 2, "π/2"], [-PI / 4, "−π/4"]]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-fr-418": {
    caption: r`$h(t)=\tfrac12[p(t+1)+p(t-1)]$, where $p$ is a triangle of height $\tfrac32$ on $|t|<6$. The factor $\cos\omega$ splits one triangle into two half-height copies shifted by $\pm1$ (dashed); their sum is a flat-topped hump of height $\tfrac54$.`,
    node: <Graph width={440} x={[-8, 8]} y={[-0.1, 1.6]} items={[{ kind: "fn", f: (t) => 0.75 * tri(t + 1, 6), tone: "muted", dashed: true }, { kind: "fn", f: (t) => 0.75 * tri(t - 1, 6), tone: "muted", dashed: true }, { kind: "fn", f: (t) => 0.75 * (tri(t + 1, 6) + tri(t - 1, 6)), n: 400, tone: "second" }]} xTicks={[-7, -5, -1, 1, 5, 7]} yTicks={[[1.25, "5/4"], [0.75, "3/4"]]} />,
  },
  "bk-fr-429": {
    wide: true,
    caption: r`Figure P4.29, redrawn. $|X(j\omega)|$ is shared by all five signals; only the phases differ. Dashed lines are the linear-phase terms. (b) $\angle X-a\omega$, (c) $\angle X+b\omega$, (d) the reflection $-\angle X$, (e) $-\angle X+d\omega$.`,
    node: (
      <>
        <Row>
          <Panel title="|X(jω)|">
            <Graph x={[-6, 6]} y={[-0.1, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => 1 / (1 + 0.6 * w * w), n: 400 }]} height={130} />
          </Panel>
          {phPanel("(a) ∠X(jω)", ph)}
        </Row>
        <Row>
          {phPanel("(b) ∠Xₐ(jω)", (w) => ph(w) - 0.5 * w, -0.5)}
          {phPanel("(c) ∠X_b(jω)", (w) => ph(w) + 0.5 * w, 0.5)}
        </Row>
        <Row>
          {phPanel("(d) ∠X_c(jω)", (w) => -ph(w))}
          {phPanel("(e) ∠X_d(jω)", (w) => -ph(w) + 0.5 * w, 0.5)}
        </Row>
      </>
    ),
  },
}
