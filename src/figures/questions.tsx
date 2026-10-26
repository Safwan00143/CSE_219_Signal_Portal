import { Graph, Panel, PI, Plane, Row, range, sinc } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]
const r = String.raw
const stems = (a: number, b: number, f: (n: number) => number): P[] => range(a, b).map((n) => [n, f(n)] as P)

export const questionFigures: FigureMap = {
  /* ───── CSE 219 2022-23 ───── */
  "q-219-5c": {
    caption: r`$x[n]=2\cos\left(\frac{16\pi n}{63}+\frac\pi3\right)$ for $0\le n\le 126$. The pattern of samples repeats exactly after $N=63$ (dashed line), during which the underlying cosine completes 8 cycles.`,
    node: <Graph width={460} x={[-2, 128]} y={[-2.6, 2.6]} xLabel="n" items={[{ kind: "vline", x: 63, label: "N = 63" }, { kind: "stems", pts: stems(0, 126, (n) => 2 * Math.cos((16 * PI * n) / 63 + PI / 3)) }]} xTicks={[0, 63, 126]} yTicks={[2, -2]} />,
  },
  "q-219-5b-prompt": {
    wide: true,
    caption: r`Figure 1 of the paper, redrawn: the magnitude $|X_1(j\omega)|$ rises linearly from 0 to $9\pi$ at $|\omega|=3\pi$, and the phase is $+\pi/2$ for $\omega>0$ and $-\pi/2$ for $\omega<0$.`,
    node: (
      <Row>
        <Panel title="|X₁(jω)|">
          <Graph x={[-14, 14]} y={[-3, 32]} xLabel="ω" items={[{ kind: "path", pts: [[-14, 0], [-3 * PI, 0], [-3 * PI, 9 * PI], [0, 0], [3 * PI, 9 * PI], [3 * PI, 0], [14, 0]] }]} xTicks={[[-3 * PI, "−3π"], [3 * PI, "3π"]]} yTicks={[[9 * PI, "9π"]]} />
        </Panel>
        <Panel title="∠X₁(jω)">
          <Graph x={[-14, 14]} y={[-2.1, 2.1]} xLabel="ω" items={[{ kind: "path", pts: [[-14, -PI / 2], [0, -PI / 2]], tone: "second" }, { kind: "path", pts: [[0, PI / 2], [14, PI / 2]], tone: "second" }]} xTicks={[[-3 * PI, "−3π"], [3 * PI, "3π"]]} yTicks={[[PI / 2, "π/2"], [-PI / 2, "−π/2"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-219-5b-sol": {
    wide: true,
    caption: r`Left: $x(t)=\frac{\sin3\pi t}{\pi t}$, even, peak 3. Right: $x_1(t)=3\frac{dx}{dt}$, odd, zero at $t=0$ and largest where $x$ is steepest.`,
    node: (
      <Row>
        <Panel title="x(t) = sin 3πt / πt">
          <Graph x={[-2, 2]} y={[-1.2, 3.4]} items={[{ kind: "fn", f: (t) => (Math.abs(t) < 1e-9 ? 3 : Math.sin(3 * PI * t) / (PI * t)), n: 600 }]} xTicks={[[-1 / 3, "−⅓"], [1 / 3, "⅓"], 1]} yTicks={[3]} />
        </Panel>
        <Panel title="x₁(t) = 3 dx/dt">
          <Graph x={[-2, 2]} y={[-30, 30]} items={[{ kind: "fn", f: (t) => (Math.abs(t) < 1e-6 ? 0 : (3 * (3 * PI * t * Math.cos(3 * PI * t) - Math.sin(3 * PI * t))) / (PI * t * t)), tone: "second", n: 800 }]} xTicks={[[-1 / 3, "−⅓"], [1 / 3, "⅓"], 1]} />
        </Panel>
      </Row>
    ),
  },
  "q-219-5d": {
    caption: r`The coefficients $a_k=(\tfrac12)^k$ exist only for $k=0,\dots,100$. With nothing at negative $k$ there is no partner $a_{-k}=a_k^*$, so $x(t)$ cannot be real (or even).`,
    node: <Graph width={420} x={[-6.5, 8.5]} y={[-0.15, 1.25]} xLabel="k" yLabel="aₖ" items={[{ kind: "stems", pts: stems(-6, -1, () => 0), tone: "muted" }, { kind: "stems", pts: stems(0, 8, (k) => 0.5 ** k) }, { kind: "text", at: [-3.5, 0.3], text: "nothing here", tone: "muted" }]} xTicks={[-6, -3, 0, 3, 6]} yTicks={[1, [0.5, "½"]]} />,
  },
  "q-219-8a": {
    wide: true,
    caption: r`Left: $x[n]=3^nu[-n-1]+(\tfrac13)^nu[n]$ (sage) and $h[n]=(\tfrac14)^nu[n+3]$ (ochre, which starts at $n=-3$ with value 64; scaled by 1/64 here). Right: the result $y[n]$, with its left branch $\frac{20736}{11}3^n$ for $n\le-4$ and the right branch for $n\ge-3$ (peak $y[-3]=768/11\approx69.8$).`,
    node: (
      <Row>
        <Panel title="x[n] and h[n]/64">
          <Graph x={[-7.5, 6.5]} y={[-0.15, 1.2]} xLabel="n" items={[{ kind: "stems", pts: stems(-7, 6, (n) => (n < 0 ? 3 ** n : (1 / 3) ** n)) }, { kind: "stems", pts: stems(-3, 6, (n) => (0.25 ** n) / 64).map(([n, v]) => [n + 0.22, v] as P), tone: "second" }]} xTicks={[-6, -3, 0, 3, 6]} yTicks={[1]} />
        </Panel>
        <Panel title="y[n] = x[n] ∗ h[n]">
          <Graph x={[-8.5, 6.5]} y={[-4, 75]} xLabel="n" items={[{ kind: "stems", pts: stems(-8, 6, (n) => (n <= -4 ? (20736 / 11) * 3 ** n : (256 / 27) * (1 / 3) ** n - (32 / 11) * 0.25 ** n)) }]} xTicks={[-6, -3, 0, 3, 6]} yTicks={[[768 / 11, "768/11"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-219-2b": {
    wide: true,
    caption: r`$X(s)=\frac{s+2}{(s+3)(s+4)}$ with ROC $-4<\operatorname{Re}\{s\}<-3$. The pole at $-4$ is left of the strip (right-sided term) and the pole at $-3$ is right of it (left-sided term), giving the two-sided $x(t)=2e^{-4t}u(t)+e^{-3t}u(-t)$.`,
    node: (
      <Row>
        <Panel title="poles, zero and the strip ROC">
          <Plane kind="s" range={5} poles={[[-3, 0], [-4, 0]]} zeros={[[-2, 0]]} roc={{ left: -4, right: -3 }} ticks={[-4, -3, -2]} />
        </Panel>
        <Panel title="x(t)">
          <Graph x={[-1.5, 1.5]} y={[-0.3, 110]} items={[{ kind: "fn", f: (t) => (t < 0 ? Math.exp(-3 * t) : 2 * Math.exp(-4 * t)), n: 600 }]} yTicks={[[2, "2"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-219-2c": {
    wide: true,
    caption: r`$x(t)=e^{-b|t-2|}$ is a two-sided exponential centred at $t=2$. Its poles are at $\pm b$ and the ROC is the strip $-b<\operatorname{Re}\{s\}<b$; the time shift only adds the factor $e^{-2s}$.`,
    node: (
      <Row>
        <Panel title="x(t) = e^(−b|t−2|)">
          <Graph x={[-2, 6]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => Math.exp(-Math.abs(t - 2)) }]} xTicks={[0, 2, 4]} yTicks={[1]} />
        </Panel>
        <Panel title="ROC: −b < Re{s} < b">
          <Plane kind="s" range={3} poles={[[-1, 0], [1, 0]]} roc={{ left: -1, right: 1 }} ticks={[[-1, "−b"], [1, "b"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-contour": {
    caption: "The inverse z-transform integrates counter-clockwise around a circle C of radius r that lies inside the ROC (shaded) and encircles the origin.",
    node: <Plane kind="z" range={2} poles={[[0.5, 0], [-0.4, 0.4]]} ring={{ inner: 0.75 }} labels={[{ at: [1.05, 1.05], text: "C: |z| = r" }]} ticks={[[1.2, "r"]]} />,
  },
  "q-219-3c": {
    caption: r`$x[n]=\frac{(-1)^{n+1}a^n}{n}u[n-1]$ for $a=0.8$: alternating in sign, starting at $n=1$ with $x[1]=a$, and decaying like $a^n/n$.`,
    node: <Graph width={420} x={[-1.5, 10.5]} y={[-0.5, 0.95]} xLabel="n" items={[{ kind: "stems", pts: stems(0, 10, (n) => (n >= 1 ? ((-1) ** (n + 1) * 0.8 ** n) / n : 0)) }]} xTicks={[0, 1, 2, 4, 6, 8, 10]} yTicks={[[0.8, "a"]]} />,
  },

  /* ───── Fourier series / transform (CSE 311) ───── */
  "q-sin-lines": {
    wide: true,
    caption: r`$\cos2\pi t$ (even) has real coefficients $\frac12$ at $k=\pm1$. $\sin2\pi t$ (odd) has purely imaginary ones: $\operatorname{Im}\,a_1=-\frac12$, $\operatorname{Im}\,a_{-1}=+\frac12$.`,
    node: (
      <Row>
        <Panel title="cos: aₖ (real)">
          <Graph x={[-2.8, 2.8]} y={[-0.7, 0.7]} xLabel="k" items={[{ kind: "stems", pts: [[-1, 0.5], [1, 0.5]], values: true }]} xTicks={[-2, -1, 0, 1, 2]} />
        </Panel>
        <Panel title="sin: Im aₖ (imaginary)">
          <Graph x={[-2.8, 2.8]} y={[-0.7, 0.7]} xLabel="k" items={[{ kind: "stems", pts: [[-1, 0.5], [1, -0.5]], values: true, tone: "second" }]} xTicks={[-2, -1, 0, 1, 2]} />
        </Panel>
      </Row>
    ),
  },
  "q-gate": {
    wide: true,
    caption: "The four pictures. Top: a single gate of width B and its continuous sinc spectrum. Bottom: the periodic gate (period 2B) and its line spectrum: lines at n/(2B) whose heights follow the same envelope (dashed). Even harmonics land on the zeros.",
    node: (
      <Row>
        <Panel title="gate of width B">
          <Graph x={[-2.5, 2.5]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2.5, 0], [-0.5, 0], [-0.5, 1], [0.5, 1], [0.5, 0], [2.5, 0]] }]} xTicks={[[-0.5, "−B/2"], [0.5, "B/2"]]} />
        </Panel>
        <Panel title="G(f) = B sin(πfB)/(πfB)">
          <Graph x={[-5, 5]} y={[-0.3, 1.2]} xLabel="f" items={[{ kind: "fn", f: (f) => sinc(PI * f), n: 600 }]} xTicks={[[-2, "−2/B"], [-1, "−1/B"], [1, "1/B"], [2, "2/B"]]} yTicks={[[1, "B"]]} />
        </Panel>
        <Panel title="periodic gate, period 2B">
          <Graph x={[-2.5, 2.5]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => (Math.abs((((t % 2) + 3) % 2) - 1) < 0.5 ? 1 : 0), n: 1200 }]} xTicks={[[-2, "−2B"], [-1, "−B"], [1, "B"], [2, "2B"]]} />
        </Panel>
        <Panel title="Dₙ = ½ sin(nπ/2)/(nπ/2)">
          <Graph x={[-5, 5]} y={[-0.3, 1.2]} xLabel="f" items={[{ kind: "fn", f: (f) => 0.5 * sinc(PI * f), dashed: true, tone: "muted", width: 1.2, n: 600 }, { kind: "stems", pts: stems(-9, 9, (n) => 0.5 * sinc((PI * n) / 2)).map(([n, v]) => [n / 2, v] as P) }]} xTicks={[[-1, "−1/B"], [-0.5, "−1/2B"], [0.5, "1/2B"], [1, "1/B"]]} yTicks={[[0.5, "½"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-sinc2": {
    wide: true,
    caption: r`Duality in action: $\operatorname{sinc}^2(t)$ with Lathi's $\operatorname{sinc}x=\frac{\sin x}x$ (left; area $\pi$) has the triangular spectrum $\pi\,\Delta(\pi f/2)$, peak $\pi$ and band-limited to $|f|<1/\pi$ (right).`,
    node: (
      <Row>
        <Panel title="sinc²(t)">
          <Graph x={[-12, 12]} y={[-0.1, 1.2]} items={[{ kind: "fn", f: (t) => sinc(t) ** 2, n: 600 }]} xTicks={[[-PI, "−π"], [PI, "π"]]} yTicks={[1]} />
        </Panel>
        <Panel title="π Δ(πf/2)">
          <Graph x={[-0.6, 0.6]} y={[-0.2, 3.6]} xLabel="f" items={[{ kind: "path", pts: [[-0.6, 0], [-1 / PI, 0], [0, PI], [1 / PI, 0], [0.6, 0]], area: true }]} xTicks={[[-1 / PI, "−1/π"], [1 / PI, "1/π"]]} yTicks={[[PI, "π"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-sin2-spectrum": {
    caption: r`$\sin^2(2\pi f_ct)\,g(t)$ in frequency: a half-height copy of $G(f)$ at baseband and quarter-height, negative copies at $\pm2f_c$.`,
    node: <Graph width={460} x={[-6, 6]} y={[-0.4, 0.65]} xLabel="f" items={[{ kind: "fn", f: (f) => 0.5 * Math.exp(-4 * f * f) - 0.25 * Math.exp(-4 * (f - 3.5) ** 2) - 0.25 * Math.exp(-4 * (f + 3.5) ** 2), area: true, n: 600 }]} xTicks={[[-3.5, "−2f_c"], 0, [3.5, "2f_c"]]} yTicks={[[0.5, "½G"], [-0.25, "−¼G"]]} />,
  },
  "q-l4-6a": {
    wide: true,
    caption: "The two figures of the question, redrawn. (i) A triangle spanning −W to W around f = 0. (ii) Two triangles, each of total width 2W, centred at ±f_c.",
    node: (
      <Row>
        <Panel title="(i) signal one">
          <Graph x={[-3, 3]} y={[-0.2, 1.3]} xLabel="f" items={[{ kind: "path", pts: [[-3, 0], [-1, 0], [0, 1], [1, 0], [3, 0]], area: true }]} xTicks={[[-1, "−W"], [1, "W"]]} />
        </Panel>
        <Panel title="(ii) signal two">
          <Graph x={[-6, 6]} y={[-0.2, 1.3]} xLabel="f" items={[{ kind: "path", pts: [[-6, 0], [-5, 0], [-4, 1], [-3, 0], [3, 0], [4, 1], [5, 0], [6, 0]], area: true }]} xTicks={[[-4, "−f_c"], [4, "f_c"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-periodic-pulse": {
    caption: r`The periodic signal $g_{T_0}(t)$ from the question: the same smooth pulse repeated every $T_0$. The single pulse $g(t)$ is the part between $-T_0/2$ and $T_0/2$ (shaded).`,
    node: <Graph width={460} x={[-5, 5]} y={[-0.2, 1.3]} items={[{ kind: "band", from: -1.5, to: 1.5, label: "g(t)" }, { kind: "fn", f: (t) => { const m = ((t % 3) + 4.5) % 3 - 1.5; return m > -0.9 && m < 1 ? 0.55 + 0.4 * Math.sin(1.6 * (m + 0.9)) : 0 }, n: 1200 }]} xTicks={[[-3, "−T₀"], [-1.5, "−T₀/2"], [1.5, "T₀/2"], [3, "T₀"]]} />,
  },
  "q-1112-5": {
    wide: true,
    caption: "The three figures of the 2011-12 question, redrawn. f(t): height V on |t| < τ/2. g(t): +V on (−τ, 0) and −V on (0, τ). h(t): a triangle of peak V on (−τ, τ).",
    node: (
      <Row cols={3}>
        <Panel title="f(t): Figure 5(a)">
          <Graph x={[-2, 2]} y={[-1.3, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-0.5, 0], [-0.5, 1], [0.5, 1], [0.5, 0], [2, 0]] }]} xTicks={[[-0.5, "−τ/2"], [0.5, "τ/2"]]} yTicks={[[1, "V"]]} />
        </Panel>
        <Panel title="g(t): Figure 5(b)">
          <Graph x={[-2, 2]} y={[-1.3, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [-1, 1], [0, 1], [0, -1], [1, -1], [1, 0], [2, 0]] }]} xTicks={[[-1, "−τ"], [1, "τ"]]} yTicks={[[1, "V"], [-1, "−V"]]} />
        </Panel>
        <Panel title="h(t): Figure 5(c)">
          <Graph x={[-2, 2]} y={[-1.3, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0]] }]} xTicks={[[-1, "−τ"], [1, "τ"]]} yTicks={[[1, "V"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-1112-5-sol": {
    caption: r`The three amplitude spectra, normalised to the same peak (τ = 1). $|F|$ (grey) falls like $1/|\omega|$; $|G|$ (ochre) is zero at DC and its energy sits at higher frequencies; $|H|$ (sage) falls like $1/\omega^2$, so $h(t)$ has the lowest bandwidth.`,
    node: (
      <Graph
        width={460}
        x={[0, 30]}
        y={[-0.05, 1.15]}
        xLabel="ω"
        items={[
          { kind: "fn", f: (w) => Math.abs(sinc(w / 2)), tone: "muted", n: 600 },
          { kind: "fn", f: (w) => (Math.abs((2 * Math.sin(w / 2) * sinc(w / 2))) / 1.45), tone: "second", n: 600 },
          { kind: "fn", f: (w) => sinc(w / 2) ** 2, n: 600 },
        ]}
        xTicks={[[2 * PI, "2π/τ"], [4 * PI, "4π/τ"], [6 * PI, "6π/τ"], [8 * PI, "8π/τ"]]}
      />
    ),
  },
  "q-1011-5b": {
    wide: true,
    caption: "The figures of the 2010-11 question, redrawn. f(t): jumps to 1 at t = −1 and falls linearly to 0 at t = 0, i.e. f(t) = −t on [−1, 0]. g(t): a triangle of peak 1 on [−1, 1].",
    node: (
      <Row>
        <Panel title="f(t): Figure 5(a)">
          <Graph x={[-2, 1.5]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [-1, 1], [0, 0], [1.5, 0]] }]} xTicks={[-1, 0]} yTicks={[1]} />
        </Panel>
        <Panel title="g(t): Figure 5(b)">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0]] }]} xTicks={[-1, 1]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "q-1011-5b-sol": {
    wide: true,
    caption: r`How $g$ is built from $f$: the right half is $f(t-1)$ (shift right by 1) and the left half is $f(-t-1)$ (reverse, then shift). The result $G(\omega)=\left[\frac{\sin(\omega/2)}{\omega/2}\right]^2$ is real, even and non-negative, with first zero at $\omega=2\pi$.`,
    node: (
      <Row>
        <Panel title="g(t) = f(−t − 1) + f(t − 1)">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [0, 1]], tone: "second" }, { kind: "path", pts: [[0, 1], [1, 0], [2, 0]] }, { kind: "text", at: [-0.9, 0.85], text: "f(−t−1)", tone: "second" }, { kind: "text", at: [0.9, 0.85], text: "f(t−1)", tone: "accent" }]} xTicks={[-1, 1]} />
        </Panel>
        <Panel title="G(ω) = [sin(ω/2)/(ω/2)]²">
          <Graph x={[-20, 20]} y={[-0.1, 1.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => sinc(w / 2) ** 2, n: 600 }]} xTicks={[[-4 * PI, "−4π"], [-2 * PI, "−2π"], [2 * PI, "2π"], [4 * PI, "4π"]]} yTicks={[1]} />
        </Panel>
      </Row>
    ),
  },
  "q-1011-6b": {
    caption: "Output of H(ω) = jω (a differentiator) for the triangle g(t): the slope, +1 on (−1, 0) and −1 on (0, 1). The corners of the triangle become jumps.",
    node: <Graph width={420} x={[-2, 2]} y={[-1.4, 1.4]} items={[{ kind: "path", pts: [[-2, 0], [-1, 0], [-1, 1], [0, 1], [0, -1], [1, -1], [1, 0], [2, 0]] }, { kind: "path", pts: [[-1, 0], [0, 1], [1, 0]], tone: "muted", dashed: true }]} xTicks={[-1, 1]} yTicks={[1, -1]} />,
  },
  "q-freq-shift": {
    wide: true,
    caption: "Shifting a baseband spectrum to a different band by multiplying with cos 2πf_c t (left), and using different carriers to stack several signals side by side on one channel: frequency-division multiplexing (right).",
    node: (
      <Row>
        <Panel title="G(f) → ½G(f ∓ f_c)">
          <Graph x={[-6, 6]} y={[-0.1, 1.2]} xLabel="f" items={[{ kind: "fn", f: (f) => Math.max(0, 1 - Math.abs(f)), tone: "muted", dashed: true, width: 1.2 }, { kind: "fn", f: (f) => 0.5 * (Math.max(0, 1 - Math.abs(f - 4)) + Math.max(0, 1 - Math.abs(f + 4))), area: true }]} xTicks={[[-4, "−f_c"], [4, "f_c"]]} />
        </Panel>
        <Panel title="three signals on three carriers (FDM)">
          <Graph x={[0, 10]} y={[-0.1, 1.2]} xLabel="f" items={[{ kind: "fn", f: (f) => Math.max(0, 1 - Math.abs(f - 2.5) / 0.9), area: true }, { kind: "fn", f: (f) => Math.max(0, 1 - Math.abs(f - 5) / 0.9), area: true, tone: "second" }, { kind: "fn", f: (f) => Math.max(0, 1 - Math.abs(f - 7.5) / 0.9), area: true }]} xTicks={[[2.5, "f₁"], [5, "f₂"], [7.5, "f₃"]]} />
        </Panel>
      </Row>
    ),
  },

  /* ───── Sampling (CSE 311) ───── */
  "q-1920-3": {
    wide: true,
    caption: r`Sampling at $f_s=1.5\times$ Nyquist $=3B$. Odd rolls (left): copies of the flat spectrum $\Pi(f/2B)$, height $3B$. Even rolls (right): copies of the triangle $\Lambda(f/B)$. Either way the copies are separated by guard bands $B$ wide.`,
    node: (
      <Row>
        <Panel title="2B sinc(2Bt) sampled at 3B">
          <Graph x={[-7, 7]} y={[-0.15, 1.3]} xLabel="f" items={[{ kind: "fn", f: (f) => ([-2, -1, 0, 1, 2].some((k) => Math.abs(f - 3 * k) < 1) ? 1 : 0), area: true, n: 1400 }]} xTicks={[[-3, "−3B"], [-1, "−B"], [1, "B"], [3, "3B"], [6, "6B"]]} yTicks={[[1, "3B"]]} />
        </Panel>
        <Panel title="B sinc²(Bt) sampled at 3B">
          <Graph x={[-7, 7]} y={[-0.15, 1.3]} xLabel="f" items={[{ kind: "fn", f: (f) => [-2, -1, 0, 1, 2].reduce((s, k) => s + Math.max(0, 1 - Math.abs(f - 3 * k)), 0), area: true, n: 1400 }]} xTicks={[[-3, "−3B"], [-1, "−B"], [1, "B"], [3, "3B"], [6, "6B"]]} yTicks={[[1, "3B"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-1819-1a": {
    wide: true,
    caption: "Left: g(t) = sin(100πt)/(100πt). It equals 1 at t = 0 and crosses zero at every other sample instant (dots), exactly matching the given samples. Right: G(f) = (1/100) Π(f/100), flat up to 50 Hz.",
    node: (
      <Row>
        <Panel title="g(t)">
          <Graph x={[-0.05, 0.05]} y={[-0.35, 1.2]} xLabel="t" items={[{ kind: "fn", f: (t) => sinc(100 * PI * t), n: 600 }, { kind: "dots", pts: range(-4, 4).map((n) => [n * 0.01, n === 0 ? 1 : 0] as P), tone: "second" }]} xTicks={[[-0.02, "−0.02"], [0.01, "0.01"], [0.03, "0.03"]]} yTicks={[1]} />
        </Panel>
        <Panel title="G(f)">
          <Graph x={[-100, 100]} y={[-0.2, 1.3]} xLabel="f" items={[{ kind: "path", pts: [[-100, 0], [-50, 0], [-50, 1], [50, 1], [50, 0], [100, 0]], area: true }]} xTicks={[[-50, "−50 Hz"], [50, "50 Hz"]]} yTicks={[[1, "0.01"]]} />
        </Panel>
      </Row>
    ),
  },
  "q-l4-8a": {
    wide: true,
    caption: "The setup of the question: an arbitrary g(t) with spectrum G(f), multiplied by the impulse train δ_Tₛ(t) to give g_δ(t).",
    node: (
      <Row>
        <Panel title="g(t) ↔ G(f)">
          <Graph x={[-3, 3]} y={[-1, 1.3]} items={[{ kind: "fn", f: (t) => 0.7 * Math.sin(1.4 * t) * Math.exp(-0.15 * t * t) + 0.25 }]} />
        </Panel>
        <Panel title="g_δ(t) = Σ g(nTₛ) δ(t − nTₛ)">
          <Graph x={[-3, 3]} y={[-1, 1.3]} items={[{ kind: "fn", f: (t) => 0.7 * Math.sin(1.4 * t) * Math.exp(-0.15 * t * t) + 0.25, tone: "muted", dashed: true, width: 1 }, { kind: "impulses", pts: range(-3, 3).map((n) => [n * 0.9, 0.7 * Math.sin(1.4 * n * 0.9) * Math.exp(-0.15 * (n * 0.9) ** 2) + 0.25] as P) }]} xTicks={[[0.9, "Tₛ"], [1.8, "2Tₛ"]]} />
        </Panel>
      </Row>
    ),
  },

  /* ───── Frequency response (CSE 311) ───── */
  "q-rect-pulse": {
    caption: "The input pulse of the question: height A on −T/2 < t < T/2.",
    node: <Graph width={380} x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "path", pts: [[-2, 0], [-0.6, 0], [-0.6, 1], [0.6, 1], [0.6, 0], [2, 0]] }]} xTicks={[[-0.6, "−T/2"], [0.6, "T/2"]]} yTicks={[[1, "A"]]} />,
  },
  "q-lpf-ripple": {
    caption: r`The filter of the question: $|H(f)|=1+k\cos2\pi fT$ inside $|f|<B$ and zero outside, with linear phase $-2\pi ft_d$.`,
    node: <Graph width={440} x={[-1.4, 1.4]} y={[-0.2, 1.65]} xLabel="f" items={[{ kind: "fn", f: (f) => (Math.abs(f) < 1 ? 1 + 0.35 * Math.cos(2 * PI * 2.2 * f) : 0), n: 800 }]} xTicks={[[-1, "−B"], [1, "B"]]} yTicks={[[1.35, "1+k"], [1, "1"]]} />,
  },
}
