import { Blocks, Graph, Panel, PI, Row, tri } from "../kit"
import type { FigureMap } from "../figure"
import { r, type P } from "./util"

const bump = (w: number, c: number) => (Math.abs(w) < c ? Math.cos((PI * w) / (2 * c)) ** 2 : 0)
const lines = (fs: number[], tone: "accent" | "second" = "accent") => ({ kind: "impulses" as const, pts: fs.map((f) => [f, 1] as P), tone })

export const bookSamplingFigures: FigureMap = {
  "bk-sm-73": {
    caption: r`Part (c): $\frac{\sin4000\pi t}{\pi t}$ has a rectangular spectrum on $|\omega|<4000\pi$. Squaring in time convolves that rectangle with itself, giving a triangle that reaches $|\omega|=8000\pi$, so the Nyquist rate doubles to $16000\pi$.`,
    node: <Graph width={440} x={[-10, 10]} y={[-0.1, 1.3]} xLabel="ω (×1000π)" items={[{ kind: "path", pts: [[-10, 0], [-4, 0], [-4, 0.5], [4, 0.5], [4, 0], [10, 0]], tone: "muted", dashed: true }, { kind: "fn", f: (w) => tri(w, 8), n: 300, area: true }]} xTicks={[-8, -4, 4, 8]} yTicks={[]} />,
  },
  "bk-sm-76": {
    wide: true,
    caption: r`Figure P7.6, redrawn. $w(t)=x_1(t)x_2(t)$ is impulse-sampled. Multiplying in time convolves the spectra, so $W(j\omega)$ (right) extends to $\omega_1+\omega_2$: the band-limit of a product is the **sum** of the band-limits.`,
    node: (
      <>
        <Blocks
          width={460}
          height={96}
          nodes={[
            { id: "x1", x: 40, y: 20, shape: "text", label: "x₁(t)" },
            { id: "x2", x: 40, y: 82, shape: "text", label: "x₂(t)" },
            { id: "m1", x: 140, y: 50, shape: "mult" },
            { id: "m2", x: 300, y: 50, shape: "mult" },
            { id: "p", x: 300, y: 10, shape: "text", label: "p(t) = Σ δ(t − nT)" },
            { id: "o", x: 420, y: 50, shape: "text", label: "w_p(t)" },
          ]}
          wires={[
            { pts: [[62, 20], [140, 20], [140, 39]] },
            { pts: [[62, 82], [140, 82], [140, 61]] },
            { pts: [[151, 50], [289, 50]], label: "w(t)", labelDy: -8 },
            { pts: [[300, 22], [300, 39]] },
            { pts: [[311, 50], [392, 50]] },
          ]}
        />
        <Row cols={3}>
          <Panel title="X₁(jω)">
            <Graph x={[-4, 4]} y={[-0.1, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => bump(w, 1.5), area: true }]} xTicks={[[-1.5, "−ω₁"], [1.5, "ω₁"]]} yTicks={[]} height={120} />
          </Panel>
          <Panel title="X₂(jω)">
            <Graph x={[-4, 4]} y={[-0.1, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => bump(w, 1), area: true, tone: "second" }]} xTicks={[[-1, "−ω₂"], [1, "ω₂"]]} yTicks={[]} height={120} />
          </Panel>
          <Panel title="W(jω)">
            <Graph x={[-4, 4]} y={[-0.1, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => bump(w, 2.5) * 0.9, area: true }]} xTicks={[[-2.5, "−(ω₁+ω₂)"], [2.5, "ω₁+ω₂"]]} yTicks={[]} height={120} />
          </Panel>
        </Row>
      </>
    ),
  },
  "bk-sm-77": {
    wide: true,
    caption: r`Left: the zero-order hold $h_0(t)$ and the first-order hold $h_1(t)$ (Figure P7.7). Right: $|H(j\omega)|=\left|\frac{2\sin(\omega T/2)}{\omega T}\right|$ for $T=1$, the filter that turns a staircase into straight-line interpolation. It is a further low-pass smoothing, with zeros at multiples of $\omega_s=\frac{2\pi}T$.`,
    node: (
      <Row>
        <Panel title="h₀(t) and h₁(t)">
          <Graph x={[-1.8, 1.8]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-1.8, 0], [0, 0], [0, 1], [1, 1], [1, 0], [1.8, 0]], tone: "second" }, { kind: "fn", f: (t) => tri(t, 1) }]} xTicks={[[-1, "−T"], [1, "T"]]} yTicks={[1]} height={140} />
        </Panel>
        <Panel title="|H(jω)|, T = 1">
          <Graph x={[-20, 20]} y={[-0.1, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => Math.abs(Math.abs(w) < 1e-6 ? 1 : (2 * Math.sin(w / 2)) / w), n: 600 }]} xTicks={[[-4 * PI, "−2ωₛ"], [-2 * PI, "−ωₛ"], [2 * PI, "ωₛ"], [4 * PI, "2ωₛ"]]} yTicks={[1]} height={140} />
        </Panel>
      </Row>
    ),
  },
  "bk-sm-78": {
    caption: r`Spectrum lines of $x(t)$ at $k\pi$, $k=1..5$ (sage), and the first shifted copy at $10\pi-k\pi$ (ochre). With $\omega_s=10\pi$, the harmonic at $5\pi$ lands exactly on its own image: it is aliased, and in fact cancels, since $\sin(5\pi\cdot0.2n)=\sin(\pi n)=0$.`,
    node: <Graph width={460} x={[0, 11]} y={[-0.2, 1.4]} xLabel="ω/π" items={[{ kind: "vline", x: 5, tone: "muted", dashed: true, label: "ωₛ/2" }, lines([1, 2, 3, 4, 5]), { kind: "impulses", pts: [5.12, 6, 7, 8, 9].map((f) => [f, 0.75] as P), tone: "second" }]} xTicks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} yTicks={[]} />,
  },
  "bk-sm-79": {
    caption: r`$G(j\omega)=75\sum_kX(j(\omega-150\pi k))$. Each copy is a triangle of half-width $100\pi$ (sage, with neighbours in ochre). Copies overlap for $50\pi<|\omega|<100\pi$, so $G=75X$ is guaranteed only for $|\omega|\le50\pi$ (shaded).`,
    node: <Graph width={460} x={[-260, 260]} y={[-0.1, 1.3]} xLabel="ω (×π)" items={[{ kind: "band", from: -50, to: 50 }, { kind: "fn", f: (w) => tri(w, 100) }, { kind: "fn", f: (w) => tri(w - 150, 100), tone: "second" }, { kind: "fn", f: (w) => tri(w + 150, 100), tone: "second" }]} xTicks={[-150, -50, 50, 150]} yTicks={[]} />,
  },
  "bk-sm-tan21": {
    wide: true,
    caption: r`(a) $x(t)=5\cos(2\pi\cdot1500t)$ has two lines of height 2.5 at $\pm1500$ Hz. (b) Sampling at 8 kHz repeats them around every multiple of 8 kHz; up to 20 kHz the lines are at 1.5, 6.5, 9.5, 14.5 and 17.5 kHz, each of height $2.5/T=2.5f_s$.`,
    node: (
      <Row>
        <Panel title="(a) X(f)">
          <Graph x={[-3, 3]} y={[-0.1, 1.4]} xLabel="f (kHz)" items={[lines([-1.5, 1.5])]} xTicks={[-1.5, 1.5]} yTicks={[]} height={130} />
        </Panel>
        <Panel title="(b) Xₛ(f), 0–20 kHz">
          <Graph x={[0, 20.5]} y={[-0.1, 1.4]} xLabel="f (kHz)" items={[{ kind: "vline", x: 4, tone: "muted", dashed: true, label: "fₛ/2" }, lines([1.5]), lines([6.5, 9.5, 14.5, 17.5], "second")]} xTicks={[1.5, 6.5, 8, 9.5, 16]} yTicks={[]} height={130} />
        </Panel>
      </Row>
    ),
  },
  "bk-sm-tan25": {
    caption: r`Sampled spectrum up to 20 kHz. Lines from the 2500 Hz term in sage, lines from the 4500 Hz term in ochre. The 4500 Hz tone exceeds $f_s/2=4$ kHz, so its image at $8000-4500=3500$ Hz falls inside the 4 kHz low-pass filter (shaded): that is the aliasing noise.`,
    node: <Graph width={460} x={[0, 20.5]} y={[-0.1, 1.4]} xLabel="f (kHz)" items={[{ kind: "band", from: 0, to: 4, label: "LPF" }, lines([2.5, 5.5, 10.5, 13.5, 18.5]), { kind: "impulses", pts: [3.5, 4.5, 11.5, 12.5, 19.5].map((f) => [f, 0.6] as P), tone: "second" }]} xTicks={[2.5, 3.5, 4.5, 8, 16]} yTicks={[]} />,
  },
}
