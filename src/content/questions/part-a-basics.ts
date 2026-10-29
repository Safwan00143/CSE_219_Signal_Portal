import type { Question } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const basicsQuestions: Question[] = [
  // ───────────────────────── Signals and their properties ─────────────────────────
  {
    id: "219-2223-5a",
    topic: "signals",
    course: "CSE 219",
    session: "2022-23",
    label: "Q5(a)",
    marks: 15,
    prompt: r`A signal $f(t)$ is defined as

$$
f(t)=\begin{cases} t+1, & -2\le t\le 0\\[2pt] -\dfrac{t}{2}+1, & 0<t\le 2\\[2pt] 0, & \text{everywhere else}\end{cases}
$$

1. Draw the graph of $f(t)$. *(3)*
2. Determine the even–odd decomposition of $f(t)$. Apply the definitions of both the even function and the odd function in the decomposition. *(6)*
3. Draw the graphs of the even and odd parts. *(6)*`,
    solution: r`**1. The graph.** $f$ rises linearly from $f(-2)=-1$ to $f(0)=1$, then falls linearly to $f(2)=0$. It is zero outside $[-2,2]$, so there is a jump from $0$ to $-1$ at $t=-2$.

**2. Decomposition.** By definition

$$
f_e(t)=\frac{f(t)+f(-t)}{2},\qquad f_o(t)=\frac{f(t)-f(-t)}{2},\qquad f=f_e+f_o .
$$

First write the reflected signal. Replacing $t$ by $-t$ in each piece:

$$
f(-t)=\begin{cases} \tfrac{t}{2}+1, & -2\le t<0\\ -t+1, & 0\le t\le 2\\ 0, & \text{else}\end{cases}
$$

*For $-2\le t<0$:*

$$
f_e=\tfrac12\Big[(t+1)+(\tfrac t2+1)\Big]=1+\tfrac{3t}{4},\qquad f_o=\tfrac12\Big[(t+1)-(\tfrac t2+1)\Big]=\tfrac t4 .
$$

*For $0< t\le 2$:*

$$
f_e=\tfrac12\Big[(-\tfrac t2+1)+(-t+1)\Big]=1-\tfrac{3t}{4},\qquad f_o=\tfrac12\Big[(-\tfrac t2+1)-(-t+1)\Big]=\tfrac t4 .
$$

So, compactly,

$$
\boxed{f_e(t)=1-\tfrac34|t|,\quad |t|\le 2}\qquad \boxed{f_o(t)=\tfrac t4,\quad |t|\le 2}
$$

and both are $0$ for $|t|>2$.

**Checks.** $f_e(-t)=f_e(t)$ and $f_o(-t)=-f_o(t)$, as required. For $t>0$: $f_e+f_o=1-\tfrac{3t}{4}+\tfrac t4=1-\tfrac t2=f(t)$. At the edges $f_e(\pm2)=-\tfrac12$, which matches $\tfrac12[f(2)+f(-2)]=\tfrac12(0-1)$.

**3. Graphs.** $f_e$ is a "tent" with peak $1$ at $t=0$, falling to $-\tfrac12$ at $t=\pm2$. $f_o$ is a straight line through the origin with slope $\tfrac14$, from $-\tfrac12$ to $\tfrac12$, cut off at $t=\pm 2$.`,
    solutionPlots: [
      {
        title: "f(t)",
        segments: [[[-3, 0], [-2, 0]], [[-2, -1], [0, 1], [2, 0], [3, 0]]],
        xRange: [-3, 3],
        yRange: [-1.2, 1.2],
        xTicks: [-2, -1, 0, 1, 2],
        yTicks: [-1, 1],
      },
      {
        title: "Even part  fₑ(t) = 1 − ¾|t|",
        segments: [[[-3, 0], [-2, 0]], [[-2, -0.5], [0, 1], [2, -0.5]], [[2, 0], [3, 0]]],
        xRange: [-3, 3],
        yRange: [-1.2, 1.2],
        xTicks: [-2, -1, 0, 1, 2],
        yTicks: [-0.5, 1],
      },
      {
        title: "Odd part  fₒ(t) = t/4",
        segments: [[[-3, 0], [-2, 0]], [[-2, -0.5], [2, 0.5]], [[2, 0], [3, 0]]],
        xRange: [-3, 3],
        yRange: [-1.2, 1.2],
        xTicks: [-2, -1, 0, 1, 2],
        yTicks: [-0.5, 0.5],
      },
    ],
  },
  {
    id: "219-2223-7",
    topic: "signals",
    course: "CSE 219",
    session: "2022-23",
    label: "Q7(a)–(c)",
    marks: 23,
    prompt: r`The graph of $x(t)$ is shown (it is $0$ for $t<-2$ and $t>2$): from $t=-2$ it rises linearly from $-1$ to $0$ at $t=-1$, jumps to $1$ and stays flat until $t=0$, then falls linearly to $0$ at $t=2$.

(a) Write down the piece-wise definition of $x(t)$. *(3)*

(b) Determine $x(-2t+2)$ using the properties of signals. State the properties you use and draw the graph. *(10)*

(c) Determine $x\!\left(-\tfrac t2+1\right)$ in the same way and draw it. *(10)*`,
    promptPlots: [
      {
        title: "x(t) as given in Figure 2",
        segments: [[[-3, 0], [-2, 0]], [[-2, -1], [-1, 0]], [[-1, 1], [0, 1], [2, 0], [3, 0]]],
        xRange: [-3, 3],
        yRange: [-1.2, 1.2],
        xTicks: [-2, -1, 0, 1, 2],
        yTicks: [-1, 1],
      },
    ],
    solution: r`**(a) Piece-wise definition.**

$$
x(t)=\begin{cases} t+1, & -2\le t<-1\\ 1, & -1< t< 0\\ 1-\dfrac t2, & 0\le t\le 2\\ 0, & \text{otherwise}\end{cases}
$$

**(b) $x(-2t+2)$.** Write $x(-2t+2)=x\big(-2(t-1)\big)$. Three operations, applied in this order:

1. **Time shift** by $2$ to the left: $v_1(t)=x(t+2)$.
2. **Time scaling** (compression by $2$): $v_2(t)=v_1(2t)=x(2t+2)$.
3. **Time reversal**: $v_3(t)=v_2(-t)=x(-2t+2)$.

Equivalently, substitute $\tau=-2t+2$, so $t=(2-\tau)/2$, into each piece:

| range of $\tau$ | range of $t$ | value |
|---|---|---|
| $-2\le\tau<-1$ | $1.5< t\le 2$ | $\tau+1=3-2t$ |
| $-1<\tau<0$ | $1< t<1.5$ | $1$ |
| $0\le\tau\le 2$ | $0\le t\le 1$ | $1-\tau/2=t$ |

$$
x(-2t+2)=\begin{cases} t, & 0\le t\le 1\\ 1, & 1<t<1.5\\ 3-2t, & 1.5< t\le 2\\ 0, & \text{otherwise}\end{cases}
$$

The signal is reversed, squeezed to half its width (support $[0,2]$ instead of $[-2,2]$), and its centre moves from $0$ to $t=1$.

**(c) $x(-t/2+1)$.** Write $x\big(-\tfrac12(t-2)\big)$: shift left by $1$, then **expand** by $2$, then reverse. Substituting $\tau=1-t/2$, so $t=2-2\tau$:

| range of $\tau$ | range of $t$ | value |
|---|---|---|
| $-2\le\tau<-1$ | $4< t\le 6$ | $\tau+1=2-\tfrac t2$ |
| $-1<\tau<0$ | $2< t<4$ | $1$ |
| $0\le\tau\le 2$ | $-2\le t\le 2$ | $1-\tau/2=\tfrac12+\tfrac t4$ |

$$
x\!\left(1-\tfrac t2\right)=\begin{cases} \tfrac12+\tfrac t4, & -2\le t\le 2\\ 1, & 2< t<4\\ 2-\tfrac t2, & 4< t\le 6\\ 0, & \text{otherwise}\end{cases}
$$

The signal is reversed and stretched to twice its width, so the support becomes $[-2,6]$.

**Quick check.** A point $t_0$ of $x(t)$ moves to $t=(b-t_0)/a$ for $x(-at+b)$. The jump at $t_0=-1$ lands at $t=1.5$ in (b) and at $t=4$ in (c), as in the tables.`,
    solutionPlots: [
      {
        title: "x(−2t + 2)",
        segments: [[[-1, 0], [0, 0], [1, 1], [1.5, 1]], [[1.5, 0], [2, -1]], [[2, 0], [3, 0]]],
        xRange: [-1, 3],
        yRange: [-1.2, 1.2],
        xTicks: [0, 1, 1.5, 2],
        yTicks: [-1, 1],
      },
      {
        title: "x(−t/2 + 1)",
        segments: [[[-3, 0], [-2, 0], [2, 1], [4, 1]], [[4, 0], [6, -1]], [[6, 0], [7, 0]]],
        xRange: [-3, 7],
        yRange: [-1.2, 1.2],
        xTicks: [-2, 0, 2, 4, 6],
        yTicks: [-1, 1],
      },
    ],
  },
  {
    id: "219-2223-7d",
    topic: "signals",
    course: "CSE 219",
    session: "2022-23",
    label: "Q7(d)",
    marks: 7,
    prompt: r`Treat an image as a discrete (2-D) signal. For each task below, name the signal property or operation that is useful. No details are needed.

- Image compression
- Blurring the image
- Sharpening the image
- Flipping the image
- Zooming in or out
- Determining the image contrast
- Detecting edges`,
    solution: r`| Task | Useful property / operation |
|---|---|
| Compression | Frequency-domain representation (DFT/DCT): most **energy** sits in a few low-frequency coefficients. Also **down-sampling** and quantization. |
| Blurring | **Convolution** with a smoothing kernel, i.e. an LTI **low-pass** (averaging) system. |
| Sharpening | Convolution with a **high-pass** kernel, i.e. adding back differences or derivatives. |
| Flipping | **Time (space) reversal**: $x[-n]$, or $x[-m,n]$ in 2-D. |
| Zooming | **Time scaling**: up-sampling with interpolation to zoom in, down-sampling (decimation) to zoom out. |
| Contrast | **Amplitude scaling** $a\,x[n]+b$, and the signal's spread or **power** about its mean. |
| Edge detection | **First difference** $x[n]-x[n-1]$, the discrete derivative (gradient), applied by convolution. |`,
  },
  {
    id: "219-2223-5c",
    topic: "signals",
    course: "CSE 219",
    session: "2022-23",
    label: "Q5(c)",
    marks: 5,
    prompt: r`Is $x[n]=2\cos\!\left(\dfrac{16\pi n}{63}+\dfrac{\pi}{3}\right)$ periodic? Explain.`,
    solution: r`A discrete sinusoid $\cos(\omega_0 n+\phi)$ is periodic **only if** $\omega_0/2\pi$ is a rational number $m/N$. When it is, the fundamental period is $N$ (with $m/N$ in lowest terms).

$$
\frac{\omega_0}{2\pi}=\frac{16\pi/63}{2\pi}=\frac{8}{63}.
$$

This is rational and already in lowest terms, since $\gcd(8,63)=1$. So **$x[n]$ is periodic with fundamental period $N=63$**: the sequence repeats after 63 samples, and in that time the underlying continuous cosine completes $m=8$ cycles.

Check: $x[n+63]=2\cos\!\left(\tfrac{16\pi n}{63}+16\pi+\tfrac\pi3\right)=x[n]$, because $16\pi$ is a multiple of $2\pi$. The amplitude $2$ and the phase $\pi/3$ do not affect periodicity.`,
  },
  {
    id: "311-2021-1b",
    topic: "signals",
    course: "CSE 311",
    session: "2020-21",
    label: "Q1(b)",
    marks: 10,
    prompt: r`Can we foretell the future events of a signal from its past samples? Justify.`,
    solution: r`**Short answer:** it depends on what kind of signal it is.

**1. Deterministic signals: yes.**

- They follow a known formula, such as $A\cos(\omega_0 t+\phi)$ or $e^{-at}u(t)$.
- A few past values are enough to find the unknown numbers ($A$, $\omega_0$, $\phi$).
- After that, every future value follows from the formula.

**2. Random signals: only partly.**

- Speech, noise and data streams have no formula.
- Their future is known only as a probability.
- Past samples let us **estimate** the next one. A linear predictor does exactly this, as in DPCM.
- But there is always some error left that cannot be predicted.

**3. The key point for communication.**

1. Suppose we could foretell a signal's future exactly.
2. Then the receiver would learn nothing new from it.
3. So it would carry **no information**.
4. Every useful, information-carrying signal must therefore be at least partly unpredictable.

We can predict **partly** (that is how predictive coders save bits), but never **completely**.

**A side note.** In theory, a perfectly band-limited signal is fixed everywhere by its exact values over any short interval. Real signals are only roughly band-limited and always noisy, so this does not allow prediction in practice.`,
  },

  // ───────────────────────── Unit step, impulse ─────────────────────────
  {
    id: "311-1920-2b",
    topic: "elementary-signals",
    course: "CSE 311",
    session: "2019-20",
    label: "Q2(b)",
    marks: 11,
    prompt: r`Prove that a unit step signal can be derived from a unit impulse signal, and vice versa.`,
    solution: r`**Continuous time.** Treat $\delta(t)$ as the limit of a rectangular pulse $\delta_\Delta(t)$ of width $\Delta$ and height $1/\Delta$ (area $1$). Its running integral

$$
u_\Delta(t)=\int_{-\infty}^{t}\delta_\Delta(\tau)\,d\tau
$$

is $0$ for $t<0$, a ramp from $0$ to $1$ over $0\le t\le\Delta$, and $1$ afterwards. As $\Delta\to 0$ the ramp becomes a jump, so

$$
\boxed{u(t)=\int_{-\infty}^{t}\delta(\tau)\,d\tau}
$$

This is because the integral picks up the full unit area once $t>0$ and nothing before. Conversely, $u_\Delta(t)$ has slope $1/\Delta$ on $[0,\Delta]$ and slope $0$ elsewhere, so $\frac{d}{dt}u_\Delta(t)=\delta_\Delta(t)$. In the limit:

$$
\boxed{\delta(t)=\frac{d\,u(t)}{dt}}
$$

**Discrete time.**

$$
\delta[n]=u[n]-u[n-1],\qquad u[n]=\sum_{k=-\infty}^{n}\delta[k]=\sum_{k=0}^{\infty}\delta[n-k].
$$

Check: $u[n]-u[n-1]$ is $1$ only at $n=0$, which is $\delta[n]$. The running sum $\sum_{k\le n}\delta[k]$ is $0$ for $n<0$ and $1$ for $n\ge0$, which is $u[n]$. So the first difference and the running sum play the roles of the derivative and the integral.`,
  },
  {
    id: "311-1213-5a",
    topic: "elementary-signals",
    course: "CSE 311",
    session: "2012-13",
    label: "Q5(a)",
    marks: 8,
    prompt: r`Define the unit impulse function. Derive the sampling property of the unit impulse function.`,
    solution: r`**Definition.** $\delta(t)$ is defined by

$$
\delta(t)=0 \ \ (t\ne 0),\qquad \int_{-\infty}^{\infty}\delta(t)\,dt=1 ,
$$

that is, the limit of a pulse whose width goes to $0$ while its area stays $1$, such as a rectangle of width $\epsilon$ and height $1/\epsilon$.

**Sampling (multiplication) property.** Let $\phi(t)$ be continuous at $t=T$. Since $\delta(t-T)$ is zero everywhere except $t=T$, only the value $\phi(T)$ matters:

$$
\phi(t)\,\delta(t-T)=\phi(T)\,\delta(t-T).
$$

**Sifting property (integrate both sides).**

$$
\int_{-\infty}^{\infty}\phi(t)\,\delta(t-T)\,dt=\phi(T)\int_{-\infty}^{\infty}\delta(t-T)\,dt=\phi(T).
$$

With the rectangle model: $\int \phi(t)\delta_\epsilon(t-T)\,dt=\frac1\epsilon\int_{T-\epsilon/2}^{T+\epsilon/2}\phi(t)\,dt\to\phi(T)$ as $\epsilon\to 0$. This is the mean value theorem.

So the impulse "samples" or "sifts out" the value of a function at the point where the impulse sits. This is the basis of ideal sampling, $g(t)\sum_n\delta(t-nT_s)=\sum_n g(nT_s)\delta(t-nT_s)$.`,
  },
  {
    id: "311-1415-1a",
    topic: "elementary-signals",
    course: "CSE 311",
    session: "2014-15",
    label: "Q1(a)",
    marks: 12,
    prompt: r`How is the bandwidth of a signal calculated? Accordingly, calculate the bandwidth of the unit impulse function $\delta(t)$, defined by $\delta(t)=0$ for $t\neq 0$ and $\int_{-\infty}^{\infty}\delta(t)\,dt=1$.`,
    solution: r`**Bandwidth.** Take the Fourier transform $G(f)$ of the signal. The bandwidth is the width of the band of **positive** frequencies where $|G(f)|$ is significant.

- For a strictly band-limited signal ($G(f)=0$ for $|f|>B$), the bandwidth is $B$.
- Otherwise we use an *essential bandwidth*: the band holding a chosen fraction (say 90–99%) of the energy, or the first null of the spectrum.

**Impulse.** By the sifting property,

$$
\Delta(f)=\int_{-\infty}^{\infty}\delta(t)e^{-j2\pi f t}\,dt=e^{0}=1\quad\text{for all } f .
$$

The amplitude spectrum is flat at $1$ from $f=0$ to $\infty$. No band holds "most" of the energy, and there is no first null. So **the bandwidth of $\delta(t)$ is infinite.**

Intuition: $\delta(t)$ is the narrowest possible pulse (zero width). Since bandwidth is inversely proportional to pulse width, it has infinite bandwidth.`,
  },

  // ───────────────────────── LTI systems & convolution ─────────────────────────
  {
    id: "219-2223-8a",
    topic: "lti-convolution",
    course: "CSE 219",
    session: "2022-23",
    label: "Q8(a)",
    marks: 20,
    prompt: r`Compute the convolution $y[n]=x[n]*h[n]$ for

$$
x[n]=3^n u[-n-1]+\left(\tfrac13\right)^n u[n]
$$

$$
h[n]=\left(\tfrac14\right)^n u[n+3]
$$`,
    solution: r`**Step 1: write the convolution sum.**

$$
y[n]=\sum_{k=-\infty}^{\infty}x[k]\,h[n-k]
$$

Keep $x[k]$ fixed. Flip $h$ and slide it to $n$.

**Step 2: where is each signal non-zero?**

- $x[k]$ has two pieces: $3^k$ for $k\le-1$ (left part) and $\left(\tfrac13\right)^k$ for $k\ge0$ (right part).
- $h[n-k]=\left(\tfrac14\right)^{n-k}u[n-k+3]$ is non-zero when $n-k+3\ge0$, that is when

$$
k\le n+3
$$

So the flipped $h$ covers everything to the **left** of its edge at $k=n+3$.

**Step 3: find the cases.** The picture changes when the edge $k=n+3$ crosses $k=0$, where $x$ switches formula. That gives two cases:

- the edge is left of 0: $n+3\le-1$, so $n\le-4$;
- the edge is at 0 or right of it: $n\ge-3$.

**Case 1: $n\le-4$.**
` + fig("cc-8a-a") + r`
The edge is inside the left part, so only $3^k$ overlaps, for $k\le n+3$:

$$
y[n]=\sum_{k=-\infty}^{n+3}3^k\left(\tfrac14\right)^{n-k}
$$

Take $\left(\tfrac14\right)^n$ outside, and combine $3^k\cdot4^k=12^k$:

$$
y[n]=\left(\tfrac14\right)^n\sum_{k=-\infty}^{n+3}12^k
$$

A geometric series that runs to the left: $\displaystyle\sum_{k=-\infty}^{m}a^k=\frac{a^m}{1-\frac1a}$ for $a>1$. With $a=12$ and $m=n+3$:

$$
y[n]=\left(\tfrac14\right)^n\cdot\frac{12^{n+3}}{1-\frac1{12}}=\left(\tfrac14\right)^n\cdot12^n\cdot1728\cdot\frac{12}{11}=\frac{20736}{11}\,3^n
$$

**Case 2: $n\ge-3$.**
` + fig("cc-8a-b") + r`
Now the overlap has two parts. Add them separately.

*Left part* ($k\le-1$, all of it):

$$
\sum_{k=-\infty}^{-1}3^k\left(\tfrac14\right)^{n-k}=\left(\tfrac14\right)^n\sum_{k=-\infty}^{-1}12^k=\left(\tfrac14\right)^n\cdot\frac{1}{11}
$$

*Right part* ($0\le k\le n+3$):

$$
\sum_{k=0}^{n+3}\left(\tfrac13\right)^k\left(\tfrac14\right)^{n-k}=\left(\tfrac14\right)^n\sum_{k=0}^{n+3}\left(\tfrac43\right)^k
$$

A finite geometric series, $\displaystyle\sum_{k=0}^{m}a^k=\frac{a^{m+1}-1}{a-1}$, with $a=\frac43$ and $m=n+3$:

$$
\left(\tfrac14\right)^n\cdot\frac{\left(\frac43\right)^{n+4}-1}{\frac13}=3\left(\tfrac14\right)^n\left(\tfrac43\right)^{n+4}-3\left(\tfrac14\right)^n=\frac{256}{27}\left(\tfrac13\right)^n-3\left(\tfrac14\right)^n
$$

*Add the two parts.* The $\left(\tfrac14\right)^n$ terms combine: $\frac1{11}-3=-\frac{32}{11}$.

$$
y[n]=\frac{256}{27}\left(\tfrac13\right)^n-\frac{32}{11}\left(\tfrac14\right)^n
$$

**Answer.**

$$
\boxed{\,y[n]=\begin{cases}\dfrac{20736}{11}\,3^{n}, & n\le-4\\[10pt]\dfrac{256}{27}\left(\tfrac13\right)^{n}-\dfrac{32}{11}\left(\tfrac14\right)^{n}, & n\ge-3\end{cases}}
$$
` + fig("q-219-8a") + r`
**Quick check at $n=-3$.** Case 2 gives $\frac{256}{27}\cdot27-\frac{32}{11}\cdot64=256-\frac{2048}{11}=\frac{768}{11}$. Case 1 at $n=-4$ gives $\frac{20736}{11}\cdot\frac{1}{81}=\frac{256}{11}$, which is smaller, as the picture of $y[n]$ shows. ✓

*Another way:* use z-transforms, $Y(z)=X(z)H(z)$ with ROC $\tfrac13<|z|<3$, then partial fractions.`,
  },
  {
    id: "311-2223-2a",
    topic: "lti-convolution",
    course: "CSE 311",
    session: "2022-23",
    label: "Q2(a)",
    marks: 20,
    prompt: r`Filtering a signal $G(f)$ by a filter $H(f)$ in the frequency domain gives $G(f)H(f)$. Derive its time-domain equivalent. Then prove that the same output is obtained when $g(t)=\mathcal F^{-1}\{G(f)\}$ is passed through an LTI system with impulse response $h(t)=\mathcal F^{-1}\{H(f)\}$, using **only time-domain analysis** for the second proof.`,
    alsoAsked: ["CSE 311 · 2018-19 Q4(b)"],
    solution: r`**Part 1 — frequency to time (the convolution theorem).** Let $y(t)=\mathcal F^{-1}\{G(f)H(f)\}$. Write $H(f)=\int h(\tau)e^{-j2\pi f\tau}d\tau$:

$$
y(t)=\int_{-\infty}^{\infty}G(f)\left[\int_{-\infty}^{\infty}h(\tau)e^{-j2\pi f\tau}d\tau\right]e^{j2\pi ft}df
=\int_{-\infty}^{\infty}h(\tau)\underbrace{\left[\int_{-\infty}^{\infty}G(f)e^{j2\pi f(t-\tau)}df\right]}_{g(t-\tau)}d\tau .
$$

Hence

$$
\boxed{y(t)=\int_{-\infty}^{\infty}h(\tau)\,g(t-\tau)\,d\tau=g(t)*h(t)}
$$

**Part 2 — time domain only.** Let the system be linear and time invariant, with $\delta(t)\to h(t)$.

1. **Sifting.** Any input is a continuum of weighted, shifted impulses:
$$g(t)=\int_{-\infty}^{\infty}g(\tau)\,\delta(t-\tau)\,d\tau .$$
2. **Time invariance.** $\delta(t-\tau)\ \to\ h(t-\tau)$.
3. **Homogeneity.** The constant weight $g(\tau)\,d\tau$ passes through: $g(\tau)\delta(t-\tau)d\tau\ \to\ g(\tau)h(t-\tau)d\tau$.
4. **Additivity.** The integral is the limit of a sum of such terms, so the outputs add:
$$y(t)=\int_{-\infty}^{\infty}g(\tau)\,h(t-\tau)\,d\tau=g(t)*h(t).$$

This is the same as Part 1. Filtering in frequency (multiply by $H$) and passing through the LTI system in time (convolve with $h$) are the same operation.`,
  },
  {
    id: "311-1415L4-7a",
    topic: "lti-convolution",
    course: "CSE 311",
    session: "2014-15",
    label: "Q7(a)",
    marks: 10,
    prompt: r`Write short notes on (i) linear system, (ii) time-invariant system.`,
    alsoAsked: ["CSE 311 · 2014-15 (L-3/T-1) Q1(b)", "CSE 311 · 2011-12 Q6(a)"],
    solution: r`**(i) Linear system.** A system $x\to y$ is linear if it obeys **superposition**:

- *Additivity:* $x_1\to y_1,\ x_2\to y_2\ \Rightarrow\ x_1+x_2\to y_1+y_2$.
- *Homogeneity:* $x\to y\ \Rightarrow\ a x\to a y$ for any constant $a$.

Together: $a_1x_1+a_2x_2\ \to\ a_1y_1+a_2y_2$. Consequences:

- **zero input gives zero output**;
- the total response = zero-input response + zero-state response.

Examples: $y=3x(t)$, $y=dx/dt$ and $y=\int x$ are linear. $y=x^2$ and $y=x+1$ are not (the second fails the zero-in, zero-out test).

**(ii) Time-invariant system.** The system's behaviour does not change with time. If $x(t)\to y(t)$, then $x(t-t_0)\to y(t-t_0)$ for every shift $t_0$: delaying the input only delays the output.

- *Test:* compute the output for the shifted input, then shift the original output, and compare.
- $y(t)=x(t-1)$ and $y=x^2(t)$ are time invariant.
- $y(t)=t\,x(t)$ and $y(t)=x(2t)$ are not.

**Why we care.** An LTI system is fully described by its impulse response $h(t)$: $y=x*h$. In the frequency domain $Y(\omega)=H(\omega)X(\omega)$, because $e^{j\omega t}$ passes through an LTI system unchanged except for the complex gain $H(\omega)$.`,
  },
  {
    id: "311-1112-6a",
    topic: "lti-convolution",
    course: "CSE 311",
    session: "2011-12",
    label: "Q6(a)",
    marks: 18,
    prompt: r`Explain the linearity and time-invariance properties of an LTI system. Let $g(t)$ be the output of an LTI system with transfer function $H(\omega)$ for input $f(t)$, with $F(\omega)$ and $G(\omega)$ their Fourier transforms. Show that $G(\omega)=H(\omega)F(\omega)$.`,
    solution: r`*Linearity and time invariance are covered in the short note above: superposition, and "shifted input gives shifted output".*

**Proof of $G=HF$.**

**Step 1 — eigenfunction.** Let $h(t)$ be the impulse response. For the input $e^{j\omega t}$,

$$
e^{j\omega t}*h(t)=\int h(\tau)e^{j\omega(t-\tau)}d\tau=e^{j\omega t}\underbrace{\int h(\tau)e^{-j\omega\tau}d\tau}_{H(\omega)} .
$$

A complex exponential comes out as itself, multiplied by $H(\omega)$.

**Step 2 — synthesis.** Write the input as a sum of exponentials:

$$
f(t)=\frac1{2\pi}\int_{-\infty}^{\infty}F(\omega)e^{j\omega t}\,d\omega .
$$

**Step 3 — linearity.** Each component $F(\omega)e^{j\omega t}\,d\omega$ produces $F(\omega)H(\omega)e^{j\omega t}\,d\omega$, and these add:

$$
g(t)=\frac1{2\pi}\int_{-\infty}^{\infty}H(\omega)F(\omega)\,e^{j\omega t}\,d\omega .
$$

**Step 4 — read off.** By the inverse-transform definition this says exactly that $G(\omega)=H(\omega)F(\omega)$. (Equivalently: $g=f*h$, and convolution in time is multiplication in frequency.)`,
  },

  // ───────────────────────── Causality & stability ─────────────────────────
  {
    id: "219-2223-8b",
    topic: "causality-stability",
    course: "CSE 219",
    session: "2022-23",
    label: "Q8(b)",
    marks: 10,
    prompt: r`Determine whether each of the following systems is causal and/or stable:

- $h_1(t)=e^{2t}u(-2-t)$
- $h_2(t)=t\,e^{-t}u(t)$`,
    solution: r`For an LTI system:

- **causal** $\iff h(t)=0$ for $t<0$;
- **BIBO stable** $\iff \int_{-\infty}^{\infty}|h(t)|\,dt<\infty$.

**$h_1(t)=e^{2t}u(-2-t)$.** Here $u(-2-t)=1$ when $t\le -2$, so $h_1$ is non-zero only for $t\le-2$.

- *Causality:* $h_1(t)\ne0$ for negative $t$, so the system is **not causal**. The output depends on future input values.
- *Stability:*
$$\int_{-\infty}^{-2}e^{2t}dt=\left.\tfrac12e^{2t}\right|_{-\infty}^{-2}=\tfrac12e^{-4}<\infty .$$
  So it **is stable**: the growing exponential $e^{2t}$ only exists for very negative $t$, where it has decayed.

**$h_2(t)=t\,e^{-t}u(t)$.**

- *Causality:* $h_2(t)=0$ for $t<0$, so it **is causal**.
- *Stability:*
$$\int_0^\infty t\,e^{-t}dt=\Gamma(2)=1<\infty .$$
  So it **is stable**. The decaying exponential beats the linear growth of $t$.

| | causal | stable |
|---|---|---|
| $h_1$ | ✗ | ✓ |
| $h_2$ | ✓ | ✓ |`,
  },
]
