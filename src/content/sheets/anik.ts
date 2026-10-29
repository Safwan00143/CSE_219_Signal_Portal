import type { SheetProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

const A = { sheet: "Anik Sir" } as const

export const sheetA: SheetProblem[] = [
  /* ─────────────── Lecture 1: Introduction to signals ─────────────── */
  {
    ...A,
    id: "sa-1.1",
    topic: "signals",
    ref: "Problem 1.1",
    title: "Energy and average power",
    prompt: r`Consider

$$
x(t)=\begin{cases}t+1,&-1\le t<0,\\2-t,&0\le t\le2,\\0,&\text{otherwise.}\end{cases}
$$

Sketch $x(t)$. Compute its total energy and its average power over the interval $[-1,2]$.`,
    solution: r`**Step 1: sketch.** The first piece rises in a straight line from $(-1,0)$ to $(0,1)$; the point at $t=0$ is open. At $t=0$ the second piece starts at height $2$ and falls to $(2,0)$. So there is a jump at the origin.
` + fig("sa-11") + r`
**Step 2: energy.** Integrate the square of the signal over the two pieces where it is non-zero:

$$
E=\int_{-1}^{0}(t+1)^2\,dt+\int_{0}^{2}(2-t)^2\,dt
$$

Integrate each piece:

$$
E=\left[\frac{(t+1)^3}{3}\right]_{-1}^{0}+\left[-\frac{(2-t)^3}{3}\right]_{0}^{2}=\frac13+\frac83=3
$$

**Step 3: average power over $[-1,2]$.** The interval has length $2-(-1)=3$:

$$
P_{[-1,2]}=\frac{E_{[-1,2]}}{3}=\frac33=1
$$

A single jump does not change an integral, so the value at $t=0$ makes no difference.`,
  },
  {
    ...A,
    id: "sa-1.2",
    topic: "signals",
    ref: "Problem 1.2",
    title: "An infinitely long energy signal",
    prompt: r`Consider

$$
x(t)=\begin{cases}1,&|t|\le1,\\[4pt]\dfrac{1}{|t|},&|t|>1.\end{cases}
$$

Find its total energy and its average power over the entire time axis.`,
    solution: r`**Step 1: energy.** The signal goes on forever, but its two tails shrink. Split the energy into the middle part and the two identical tails:

$$
E=\int_{-1}^{1}1^2\,dt+2\int_1^\infty\frac1{t^2}\,dt
$$

$$
E=2+2\left[-\frac1t\right]_1^\infty=2+2=4
$$

**Step 2: average power.** Average over $[-R,R]$, then let $R\to\infty$:

$$
0\le\frac1{2R}\int_{-R}^{R}|x(t)|^2\,dt\le\frac{E}{2R}=\frac{2}{R}\longrightarrow0
$$

So $P=0$.

This is an important example of a **finite-energy** signal that lasts forever: its total energy is finite, so its long-term average power is zero.`,
  },
  {
    ...A,
    id: "sa-1.3",
    topic: "signals",
    ref: "Problem 1.3",
    title: "Discrete-time energy",
    prompt: r`A finite-length sequence has samples

| $n$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|---|
| $x[n]$ | $1$ | $-2$ | $0$ | $3$ | $-1$ |

and is zero elsewhere. Sketch the stem plot, calculate its total energy, and find its average power over $-2\le n\le2$.`,
    solution: r`**Step 1: stem plot.** Each sample is a vertical stem. $x[0]=0$ lies on the axis.
` + fig("sa-13") + r`
**Step 2: energy.** Only five samples contribute:

$$
E=\sum_{n}|x[n]|^2=1^2+(-2)^2+0^2+3^2+(-1)^2=15
$$

**Step 3: average power.** The interval holds $2-(-2)+1=5$ samples:

$$
P_{[-2,2]}=\frac{15}{5}=3
$$`,
  },
  {
    ...A,
    id: "sa-1.4",
    topic: "elementary-signals",
    ref: "Problem 1.4",
    title: "Two frequencies, one period",
    prompt: r`Find the fundamental period of $x(t)=\cos(4t)+2\sin(6t)$.`,
    solution: r`**Step 1: each sinusoid's period.**

$$
T_1=\frac{2\pi}{4}=\frac\pi2,\qquad T_2=\frac{2\pi}{6}=\frac\pi3
$$

**Step 2: the common period.** The whole signal repeats when **both** parts complete a whole number of cycles. The smallest such time is

$$
T_0=\pi
$$

because $\pi=2T_1=3T_2$.

**Check.** The fundamental angular frequency is $\gcd(4,6)=2$ rad/s, and $T_0=\frac{2\pi}{2}=\pi$. ✓`,
  },
  {
    ...A,
    id: "sa-1.5",
    topic: "signals",
    ref: "Problem 1.5",
    title: "Transforming a signal",
    prompt: r`Starting from $x(t)$, write **one valid sequence** of shifts, time reversal and time scaling that produces

$$
y(t)=x\!\left(4-\frac t3\right).
$$

Use arrows to show the intermediate expressions.`,
    solution: r`Work on the argument of $x(\cdot)$ one operation at a time.

1. **Shift left by 4:** $\ x(t)\ \longrightarrow\ x(t+4)$
2. **Reverse time:** $\ x(t+4)\ \longrightarrow\ x(4-t)$
3. **Expand time by 3:** $\ x(4-t)\ \longrightarrow\ x\!\left(4-\dfrac t3\right)$

$$
x(t)\ \xrightarrow{\text{left shift 4}}\ x(t+4)\ \xrightarrow{\text{reverse}}\ x(4-t)\ \xrightarrow{\text{expand by 3}}\ x\!\left(4-\tfrac t3\right)
$$

**Check the last step.** Expanding by three replaces the variable $t$ by $\frac t3$ in the **current** expression $x(4-t)$. It does not divide the constant $4$ by three.`,
  },
  {
    ...A,
    id: "sa-1.6",
    topic: "signals",
    ref: "Problem 1.6",
    title: "Even and odd components",
    prompt: r`Consider the continuous-time signal

$$
x(t)=\begin{cases}t+2,&-2\le t\le-1,\\-t,&-1<t\le0,\\0,&\text{otherwise.}\end{cases}
$$

Sketch $x(t)$ and $x(-t)$, then derive and sketch the even and odd components $x_e(t)$ and $x_o(t)$.`,
    solution: r`**Step 1: draw $x(t)$ and $x(-t)$.**

- $x(t)$ is a triangle on the left of the origin, through the points $(-2,0)$, $(-1,1)$, $(0,0)$.
- Reflecting it about the vertical axis gives $x(-t)$, through $(0,0)$, $(1,1)$, $(2,0)$.

Recall:

$$
x_e(t)=\frac{x(t)+x(-t)}2,\qquad x_o(t)=\frac{x(t)-x(-t)}2
$$

**Step 2: the even component (for $t\ge0$).**

- For $0\le t\le1$: $x(t)=0$ and $x(-t)=t$, so $x_e(t)=\dfrac t2$.
- For $1<t\le2$: $x(t)=0$ and $x(-t)=2-t$, so $x_e(t)=1-\dfrac t2$.

$x_e$ is even, so:

$$
x_e(t)=\begin{cases}\dfrac{|t|}2,&|t|\le1,\\[6pt]1-\dfrac{|t|}2,&1<|t|\le2,\\[6pt]0,&\text{otherwise.}\end{cases}
$$

**Step 3: the odd component (for $t\ge0$).**

- For $0\le t\le1$: $x_o(t)=\dfrac{0-t}2=-\dfrac t2$.
- For $1<t\le2$: $x_o(t)=-\dfrac{2-t}2=\dfrac t2-1$.

Using the odd symmetry of $x_o$:

$$
x_o(t)=\begin{cases}\dfrac{t+2}2,&-2\le t<-1,\\[6pt]-\dfrac t2,&-1\le t\le1,\\[6pt]\dfrac{t-2}2,&1<t\le2,\\[6pt]0,&\text{otherwise.}\end{cases}
$$

**Step 4: the graphs.**
` + fig("sa-16") + r`
The even part is symmetric about the vertical axis; the odd part is antisymmetric. As expected, $x(t)=x_e(t)+x_o(t)$.`,
  },
  {
    ...A,
    id: "sa-1.7",
    topic: "signals",
    ref: "Problem 1.7",
    title: "Even and odd components 2.0",
    prompt: r`Consider the continuous-time signal

$$
x(t)=\begin{cases}t+1,&-1\le t\le0,\\[4pt]1-\dfrac t2,&0<t\le2,\\[4pt]0,&\text{otherwise.}\end{cases}
$$

Sketch $x(t)$ and $x(-t)$, then derive and sketch the even and odd components $x_e(t)$ and $x_o(t)$.`,
    solution: r`**Step 1: draw $x(t)$ and $x(-t)$.** Draw the signal, then reflect it about the vertical axis. Recall:

$$
x_e(t)=\frac{x(t)+x(-t)}2,\qquad x_o(t)=\frac{x(t)-x(-t)}2
$$

So at each instant, add or subtract the heights of the two graphs, then divide by 2.

**Step 2: the components for positive $t$.** There are two regions.

**Case 1: $0\le t\le1$.** Both signals are non-zero:

$$
x(t)=1-\frac t2,\qquad x(-t)=1-t
$$

$$
x_e(t)=\frac12\left[\left(1-\frac t2\right)+(1-t)\right]=1-\frac{3t}4
$$

$$
x_o(t)=\frac12\left[\left(1-\frac t2\right)-(1-t)\right]=\frac t4
$$

**Case 2: $1<t\le2$.** Here $x(-t)=0$; only the original signal is present:

$$
x_e(t)=x_o(t)=\frac12\left(1-\frac t2\right)=\frac12-\frac t4
$$

In this region the even and odd parts have exactly the same height.

**Step 3: complete the graphs using symmetry.** Reflect the even part without changing sign; reflect the odd part and change its sign.

$$
x_e(t)=\begin{cases}1-\dfrac{3|t|}4,&|t|\le1,\\[6pt]\dfrac12-\dfrac{|t|}4,&1<|t|\le2,\\[6pt]0,&\text{otherwise.}\end{cases}
$$

$$
x_o(t)=\begin{cases}\dfrac t4,&|t|\le1,\\[6pt]\operatorname{sgn}(t)\left(\dfrac12-\dfrac{|t|}4\right),&1<|t|\le2,\\[6pt]0,&\text{otherwise.}\end{cases}
$$

**Step 4: the four graphs.** Adding the first two graphs gives twice the even part; subtracting them gives twice the odd part.
` + fig("sa-17") + r`
We can always rebuild the signal: $x(t)=x_e(t)+x_o(t)$.`,
  },
  {
    ...A,
    id: "sa-1.8",
    topic: "signals",
    ref: "Problem 1.8",
    title: "Reversing a transformation",
    prompt: r`Suppose you are given $y(t)=x(2t-3)$, rather than $x(t)$. Describe a sequence of operations on $y(t)$ that recovers $x(t)$.`,
    solution: r`**Step 1: how $x$ became $y$.**

$$
x(t)\ \xrightarrow{\text{right shift by 3}}\ x(t-3)\ \xrightarrow{\text{compress by 2}}\ x(2t-3)=y(t)
$$

**Step 2: undo the operations in reverse order.**

$$
y(t)\ \xrightarrow{\text{expand by 2}}\ y\!\left(\tfrac t2\right)\ \xrightarrow{\text{left shift by 3}}\ y\!\left(\tfrac{t+3}{2}\right)=x(t)
$$

**Check:** $y\!\left(\frac{t+3}2\right)=x\!\left(2\cdot\frac{t+3}{2}-3\right)=x(t)$. ✓

So the required sequence is: **expand by 2, then shift left by 3.**`,
  },

  /* ─────────────── Lecture 2: Some useful signals ─────────────── */
  {
    ...A,
    id: "sa-2.1",
    topic: "elementary-signals",
    ref: "Problem 2.1",
    title: "A signal made of switches",
    prompt: r`Plot the discrete-time sequence

$$
x[n]=2\big(u[n+2]-u[n-1]\big)-\big(u[n-1]-u[n-3]\big).
$$

Write down every non-zero sample and represent the same sequence as a sum of shifted impulses.`,
    solution: r`**Step 1: read each bracket.** $u[n-a]-u[n-b]$ (with $a<b$) is $1$ for $a\le n<b$ and $0$ otherwise.

- The first bracket is $1$ for $n=-2,-1,0$.
- The second bracket is $1$ for $n=1,2$.

$$
x[n]=\begin{cases}2,&n=-2,-1,0,\\-1,&n=1,2,\\0,&\text{otherwise.}\end{cases}
$$
` + fig("sa-21") + r`
**Step 2: as a sum of impulses.** $\delta[n-m]$ places a single sample at $n=m$, so five impulses build the sequence:

$$
x[n]=2\delta[n+2]+2\delta[n+1]+2\delta[n]-\delta[n-1]-\delta[n-2]
$$`,
  },
  {
    ...A,
    id: "sa-2.2",
    topic: "elementary-signals",
    ref: "Problem 2.2",
    title: "The impulse picks a value",
    prompt: r`Let $x(t)=3\delta(t+2)-2\delta(t-1)$ and $f(t)=(t+1)^2$. Evaluate

$$
\int_{-\infty}^{\infty}x(t)f(t)\,dt.
$$

You may sketch the two impulses first.`,
    solution: r`**The sifting property:** $\displaystyle\int_{-\infty}^{\infty}f(t)\,\delta(t-a)\,dt=f(a)$.

- $\delta(t+2)$ picks the value at $t=-2$.
- $\delta(t-1)$ picks the value at $t=1$.

$$
\int x(t)f(t)\,dt=3f(-2)-2f(1)
$$

$$
3f(-2)-2f(1)=3(-2+1)^2-2(1+1)^2=3-8=-5
$$

Keep the impulse **weights**, including the minus sign on the second impulse.`,
  },
  {
    ...A,
    id: "sa-2.3",
    topic: "elementary-signals",
    ref: "Problem 2.3",
    title: "Differentiating jumps",
    prompt: r`A continuous-time signal is

$$
x(t)=2u(t+1)-3u(t-2)+u(t-4).
$$

Sketch $x(t)$ and write $\frac{d}{dt}x(t)$ as a weighted sum of impulses.`,
    solution: r`**Step 1: add the steps.** Each step switches on at its own location:

$$
x(t)=\begin{cases}0,&t<-1,\\2,&-1<t<2,\\-1,&2<t<4,\\0,&t>4.\end{cases}
$$

**Step 2: differentiate.** The derivative of $u(t-a)$ is $\delta(t-a)$, so a jump of size $J$ gives an impulse of weight $J$:

- $+2$ at $t=-1$;
- $-3$ at $t=2$;
- $+1$ at $t=4$.

$$
x'(t)=2\delta(t+1)-3\delta(t-2)+\delta(t-4)
$$

Between the jumps the signal is flat, so the derivative is zero there.
` + fig("sa-23"),
  },
  {
    ...A,
    id: "sa-2.4",
    topic: "elementary-signals",
    ref: "Problem 2.4",
    title: "Exponential plus a switch",
    prompt: r`Sketch $x(t)=e^{2t}u(-3t)$.`,
    solution: r`**The factor $u(-3t)$ is a switch.** It is on when $-3t>0$, that is for $t<0$, and off for $t>0$. So

$$
x(t)=\begin{cases}e^{2t},&t<0,\\0,&t>0.\end{cases}
$$
` + fig("sa-24") + r`
Moving left to right, the exponential grows towards $1$ just before $t=0$; then the switch turns it off. The value exactly at $t=0$ depends on the convention for $u(0)$ and does not affect the shape.`,
  },
  {
    ...A,
    id: "sa-2.5",
    topic: "elementary-signals",
    ref: "Problem 2.5",
    title: "Periodic or not",
    prompt: r`For each signal, decide whether it is periodic and, if it is, find the fundamental period:

(a) $\cos(2t)$, (b) $\cos(2n)$, (c) $3\sin\!\left(\dfrac{3\pi n}{5}+\dfrac\pi2\right)$.

Here (a) is continuous-time; (b) and (c) are discrete-time signals.`,
    solution: r`**(a) Continuous time.** $\cos(2t)$ repeats whenever $2T=2\pi m$. The smallest positive choice, $m=1$, gives

$$
T_0=\pi
$$

**(b) Discrete time.** A discrete sinusoid of frequency $\Omega$ is periodic only if $\Omega N=2\pi m$ for some positive integer $N$ and integer $m$.

- Here $\Omega=2$, which would need $N=m\pi$.
- No integers satisfy this, because $\pi$ is irrational.

So $\cos(2n)$ is **not periodic**.

**(c) Discrete time.** The phase $\frac\pi2$ does not affect the period. We need

$$
\frac{3\pi}{5}N=2\pi m\iff 3N=10m
$$

The smallest positive integer solution is $N=10$ (with $m=3$). So $N_0=10$.`,
  },
  {
    ...A,
    id: "sa-2.6",
    topic: "elementary-signals",
    ref: "Problem 2.6",
    title: "Sinusoids as rotating exponentials",
    prompt: r`Express

$$
x(t)=2\sin\!\left(\omega_0t+\frac\pi6\right)+\cos(2\omega_0t)
$$

as a sum of complex exponentials $c_ke^{jk\omega_0t}$. Identify the non-zero values of $c_k$.`,
    solution: r`**Step 1: Euler's identities.**

$$
\sin\theta=\frac{e^{j\theta}-e^{-j\theta}}{2j},\qquad\cos\theta=\frac{e^{j\theta}+e^{-j\theta}}{2}
$$

**Step 2: the sine term**, with $\theta=\omega_0t+\frac\pi6$:

$$
2\sin\!\left(\omega_0t+\frac\pi6\right)=\frac{e^{j\pi/6}}{j}\,e^{j\omega_0t}-\frac{e^{-j\pi/6}}{j}\,e^{-j\omega_0t}
$$

**Step 3: the cosine term** supplies the harmonics $k=\pm2$, each with weight $\frac12$.

**Step 4: the coefficients.** Using $\frac{e^{j\pi/6}}{j}=-j\left(\frac{\sqrt3}2+\frac j2\right)$:

$$
c_1=\frac12-j\frac{\sqrt3}2,\qquad c_{-1}=\frac12+j\frac{\sqrt3}2
$$

$$
c_2=\frac12,\qquad c_{-2}=\frac12
$$

Every other coefficient is zero; in particular there is no constant part ($c_0=0$). The conjugate pairs $c_{-k}=c_k^*$ fit a real signal.`,
  },

  /* ─────────────── Lecture 3: LTI systems and discrete convolution ─────────────── */
  {
    ...A,
    id: "sa-3.1",
    topic: "lti-convolution",
    ref: "Problem 3.1",
    title: "Convolution by sliding",
    prompt: r`Two sequences are zero outside the given ranges:

| $n$ | $0$ | $1$ |
|---|---|---|
| $x[n]$ | $1$ | $2$ |

| $n$ | $0$ | $1$ | $2$ |
|---|---|---|---|
| $h[n]$ | $1$ | $-1$ | $2$ |

Compute $y[n]=x[n]*h[n]$ using the reflect–shift–multiply–add method. Draw the output stem plot.`,
    solution: r`**Step 1: the convolution sum.**

$$
y[n]=\sum_{k=-\infty}^{\infty}x[k]\,h[n-k]
$$

**Step 2: only two terms survive.** $x[k]$ is non-zero only for $k=0,1$:

$$
y[n]=x[0]h[n]+x[1]h[n-1]=h[n]+2h[n-1]
$$

That is one copy of $h$, plus a twice-as-tall copy moved right by one sample.

**Step 3: add them up, sample by sample.**

| $n$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $h[n]$ | 1 | $-1$ | 2 | 0 |
| $2h[n-1]$ | 0 | 2 | $-2$ | 4 |
| $y[n]$ | **1** | **1** | **0** | **4** |
` + fig("sa-31") + r`
So $y[0]=1$, $y[1]=1$, $y[2]=0$, $y[3]=4$, and every other sample is zero. A zero **inside** the output does not mean the convolution has ended.`,
  },
  {
    ...A,
    id: "sa-3.2",
    topic: "lti-convolution",
    ref: "Problem 3.2",
    title: "Reusing a known input–output pair",
    prompt: r`For an LTI system, suppose $x_1(t)=u(t)-u(t-1)$ produces $y_1(t)=e^{-t}u(t)$. What output is produced by

$$
x_2(t)=2x_1(t+1)-x_1(t-2)?
$$`,
    solution: r`An LTI system keeps time shifts and linear combinations:

- shifting the input shifts the output by the same amount;
- scaling or subtracting inputs does the same to the outputs.

**Step 1: the shifted pairs.** From $x_1(t)\to y_1(t)=e^{-t}u(t)$:

$$
x_1(t+1)\ \longmapsto\ y_1(t+1),\qquad x_1(t-2)\ \longmapsto\ y_1(t-2)
$$

**Step 2: combine them the same way as the input.**

$$
y_2(t)=2y_1(t+1)-y_1(t-2)=2e^{-(t+1)}u(t+1)-e^{-(t-2)}u(t-2)
$$
` + fig("sa-32") + r`
No convolution integral is needed: the known input–output pair already holds all the information.`,
  },
  {
    ...A,
    id: "sa-3.3",
    topic: "lti-convolution",
    ref: "Problem 3.3",
    title: "Build a signal out of impulses",
    prompt: r`A sequence is zero except for $x[-1]=2$, $x[0]=-1$ and $x[2]=3$. Write $x[n]$ as a weighted sum of shifted unit impulses. If an LTI system has impulse response $h[n]$, write its output directly in terms of shifted copies of $h[n]$.`,
    solution: r`**Step 1: one impulse per non-zero sample.** The non-zero samples are at $n=-1,0,2$:

$$
x[n]=2\delta[n+1]-\delta[n]+3\delta[n-2]
$$

**Step 2: apply the system.** The response to $\delta[n-m]$ is $h[n-m]$. By linearity, each impulse becomes a copy of $h$ with the same weight and shift:

$$
y[n]=2h[n+1]-h[n]+3h[n-2]
$$

We don't need a formula for $h[n]$: this already gives the output as three scaled, shifted copies of the impulse response.`,
  },
  /* ─────────────── Lecture 4: Convolution, causality and stability ─────────────── */
  {
    ...A,
    id: "sa-4.1",
    topic: "lti-convolution",
    ref: "Problem 4.1",
    title: "A short graphical convolution",
    prompt: r`Compute $y[n]=x[n]*h[n]$ by drawing the overlap as $h[n-k]$ slides past $x[k]$. The non-zero samples are

$$
x[0]=\tfrac12,\qquad x[1]=2,\qquad h[0]=h[1]=h[2]=1.
$$

Sketch the output, labelling every non-zero sample.`,
    solution: r`**Step 1: where they overlap.**

- $x[k]$ is non-zero at $k=0,1$.
- The reflected, shifted $h[n-k]$ is non-zero for $n-2\le k\le n$.

They overlap only for $0\le n\le3$.

**Step 2: each sample of $x$ places a scaled copy of $h$.**

$$
y[n]=\tfrac12h[n]+2h[n-1]
$$

**Step 3: add the copies.**

| $n$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $\tfrac12h[n]$ | $\tfrac12$ | $\tfrac12$ | $\tfrac12$ | 0 |
| $2h[n-1]$ | 0 | 2 | 2 | 2 |
| $y[n]$ | $\tfrac12$ | $\tfrac52$ | $\tfrac52$ | $2$ |
` + fig("sa-41") + r`
So the non-zero output samples are $\tfrac12,\ \tfrac52,\ \tfrac52,\ 2$ at $n=0,1,2,3$. The overlap first grows, then shrinks, as the window passes the input.`,
  },
  {
    ...A,
    id: "sa-4.2",
    topic: "lti-convolution",
    ref: "Problem 4.2",
    title: "The α convolution",
    prompt: r`Let $0<\alpha<1$. Compute

$$
y[n]=x[n]*h[n],\qquad x[n]=\alpha^nu[n],\qquad h[n]=u[n].
$$

Use graphical convolution: keep $x[k]$ fixed, reflect $h[k]$ to get $h[-k]$, shift to $h[n-k]$, and find the overlap for $n<0$ and $n\ge0$. Obtain a closed-form formula for $y[n]$ and sketch the output.`,
    solution: r`**Step 1: reflect and shift the step.** $x[k]=\alpha^ku[k]$ is non-zero only for $k\ge0$. The reflected step is

$$
h[n-k]=u[n-k]=\begin{cases}1,&k\le n,\\0,&k>n,\end{cases}
$$

so it covers every sample **to the left of** $k=n$. The overlap with $x[k]$ is therefore $0\le k\le n$ (when $n\ge0$).
` + fig("sa-42-overlap") + r`
**Step 2: evaluate the sum.**

**Case $n<0$:** no overlap, so $y[n]=0$.

**Case $n\ge0$:**

$$
y[n]=\sum_{k=0}^{n}\alpha^k=1+\alpha+\alpha^2+\cdots+\alpha^n=\frac{1-\alpha^{n+1}}{1-\alpha}
$$

using the finite geometric sum ($0<\alpha<1$ ensures $\alpha\ne1$). Combining both cases:

$$
y[n]=\frac{1-\alpha^{n+1}}{1-\alpha}\,u[n]
$$

**Step 3: read the graph.** $y[0]=1$, then $y[1]=1+\alpha$, then $y[2]=1+\alpha+\alpha^2$, and so on. Each new sample adds a smaller positive amount, so $y[n]$ rises towards $\frac1{1-\alpha}$ without passing it.
` + fig("sa-42-out"),
  },
  {
    ...A,
    id: "sa-4.3",
    topic: "lti-convolution",
    ref: "Problem 4.3",
    title: "Overlapping rectangles",
    prompt: r`Compute and sketch the continuous-time convolution

$$
y(t)=\underbrace{\big(u(t)-u(t-2)\big)}_{x(t)}*\underbrace{\big(u(t-1)-u(t-3)\big)}_{h(t)}.
$$`,
    solution: r`**Step 1: the two rectangles.**

- $x(\tau)=1$ on $0<\tau<2$.
- After reflecting and shifting, $h(t-\tau)=1$ when $1<t-\tau<3$, that is on

$$
t-3<\tau<t-1
$$

**Step 2: convolution = length of the overlap.** Both have height 1, so

$$
y(t)=\int x(\tau)\,h(t-\tau)\,d\tau=\text{length of }\big((0,2)\cap(t-3,\,t-1)\big)
$$

**Step 3: slide the window.** The rectangles first touch at $t=1$, overlap most at $t=3$ and separate at $t=5$.

**Case $1\le t<3$ (entering):**
` + fig("sa-43-a") + r`
$$
y(t)=t-1
$$

**Case $3\le t<5$ (leaving):**
` + fig("sa-43-b") + r`
$$
y(t)=5-t
$$

**Answer.**

$$
y(t)=\begin{cases}0,&t<1,\\t-1,&1\le t<3,\\5-t,&3\le t<5,\\0,&t\ge5.\end{cases}
$$
` + fig("sa-43-out") + r`
At the peak, $y(3)=2$, because the two width-2 rectangles overlap completely. Where they only touch at a point, the overlap length is zero.`,
  },
  {
    ...A,
    id: "sa-4.4",
    topic: "lti-convolution",
    ref: "Problem 4.4",
    title: "Step input, rectangular impulse response",
    prompt: r`An LTI system has $h(t)=u(t-1)-u(t-3)$. Find and sketch its response to $x(t)=u(t)$, using convolution. Label the values at $t=1$ and $t=3$.`,
    solution: r`**Step 1: the two signals.**

- The step input $x(\tau)=u(\tau)$ is non-zero for $\tau\ge0$.
- $h(t-\tau)=1$ when $1<t-\tau<3$, that is on $t-3<\tau<t-1$.

**Step 2: $y(t)$ is the length of $[0,\infty)$ inside $(t-3,\,t-1)$.**

- $t<1$: the window lies left of $0$. No overlap, so $y=0$.
- $1\le t<3$: the overlap is $[0,\ t-1)$, so $y=t-1$.
- $t\ge3$: the whole window is inside, so $y=2$.

$$
y(t)=\begin{cases}0,&t<1,\\t-1,&1\le t<3,\\2,&t\ge3.\end{cases}
$$
` + fig("sa-44") + r`
So $y(1)=0$ and $y(3)=2$. After $t=3$ the whole impulse-response rectangle is inside the integration window, so the output stops increasing.`,
  },
  {
    ...A,
    id: "sa-4.5",
    topic: "lti-convolution",
    ref: "Problem 4.5",
    title: "Exponential meets exponential",
    prompt: r`Find

$$
y(t)=\big(e^{-2t}u(t)\big)*\big(e^{-t}u(t)\big).
$$

Start by stating the overlap limits for $t<0$ and $t\ge0$.`,
    solution: r`**Step 1: the overlap.** Both exponentials are right-sided. The integrand is non-zero only if $\tau\ge0$ **and** $t-\tau\ge0$.

- For $t<0$ both can't hold: no overlap, so $y(t)=0$.
- For $t\ge0$ the overlap is $0\le\tau\le t$.
` + fig("sa-45-overlap") + r`
**Step 2: integrate over the overlap ($t\ge0$).**

$$
y(t)=\int_0^te^{-2\tau}\,e^{-(t-\tau)}\,d\tau
$$

Take $e^{-t}$ outside:

$$
y(t)=e^{-t}\int_0^te^{-\tau}\,d\tau=e^{-t}\left(1-e^{-t}\right)
$$

**Answer.**

$$
y(t)=\left(e^{-t}-e^{-2t}\right)u(t)
$$
` + fig("sa-45-out") + r`
**Quick check:** the result is zero at $t=0$, positive for $t>0$, and eventually returns to zero, as the overlap picture suggests.`,
  },
  {
    ...A,
    id: "sa-4.6",
    topic: "causality-stability",
    ref: "Problem 4.6",
    title: "Maximum shift that preserves causality",
    prompt: r`System $S_1$ has impulse response $h_1(t)=u(t-1)-u(t-3)$. Another LTI system has $h_2(t)=h_1(t+a)$. Determine whether $S_1$ is stable, and find the **maximum** possible value of $a$ for which $S_2$ is causal.`,
    solution: r`**Step 1: $h_1$ is a rectangle.**

$$
h_1(t)=\begin{cases}1,&1<t<3,\\0,&\text{otherwise.}\end{cases}
$$

**Step 2: stability.** BIBO stability needs $\int|h(t)|\,dt<\infty$:

$$
\int_{-\infty}^{\infty}|h_1(t)|\,dt=\int_1^31\,dt=2<\infty
$$

So $S_1$ **is stable**.

**Step 3: causality after shifting.** $h_2(t)=h_1(t+a)$ is non-zero on

$$
1-a<t<3-a
$$

A causal system needs $h(t)=0$ for every $t<0$, so the left edge must not be before zero:

$$
1-a\ge0\iff a\le1
$$
` + fig("sa-46") + r`
So the maximum shift is $a_{\max}=1$.`,
  },
  {
    ...A,
    id: "sa-4.7",
    topic: "causality-stability",
    ref: "Problem 4.7",
    title: "Causal? Stable?",
    prompt: r`For each impulse response, determine whether the corresponding continuous-time LTI system is causal and whether it is BIBO-stable. Justify each conclusion using the appropriate condition:

$$
h_1(t)=e^{2t}u(-t-2),\quad h_2(t)=te^{-t}u(t),\quad h_3(t)=u(t),\quad h_4(t)=2e^{-7|t|},\quad h_5(t)=e^{-2t}u(-3t).
$$`,
    solution: r`**The two tests:**

- **Causal:** $h(t)=0$ for all $t<0$.
- **Stable:** $\displaystyle\int_{-\infty}^{\infty}|h(t)|\,dt<\infty$.

**(1) $h_1(t)=e^{2t}u(-t-2)$.** The switch is on for $t\le-2$, entirely **before** zero, so it is **not causal**. But the exponential decays towards $-\infty$:

$$
\int_{-\infty}^{-2}e^{2t}\,dt=\left[\frac{e^{2t}}2\right]_{-\infty}^{-2}=\frac{e^{-4}}2<\infty
$$

So it **is stable**.

**(2) $h_2(t)=te^{-t}u(t)$.** Zero for $t<0$, so **causal**. $\int_0^\infty te^{-t}\,dt=1<\infty$, so **stable**.

**(3) $h_3(t)=u(t)$.** **Causal**. But $\int_0^\infty1\,dt=\infty$, so **unstable**.

**(4) $h_4(t)=2e^{-7|t|}$.** Non-zero at negative times, so **not causal**. But $\int_{-\infty}^{\infty}2e^{-7|t|}\,dt=\frac47$, so **stable**.

**(5) $h_5(t)=e^{-2t}u(-3t)$.** The switch is on for $t\le0$, so **not causal**. As $t\to-\infty$, $e^{-2t}$ **grows**, and $\int_{-\infty}^{0}e^{-2t}\,dt=\infty$, so **unstable**.

| impulse response | causal? | stable? |
|---|---|---|
| $h_1$ | no | yes |
| $h_2$ | yes | yes |
| $h_3$ | yes | no |
| $h_4$ | no | yes |
| $h_5$ | no | no |`,
  },
  {
    ...A,
    id: "sa-4.8",
    topic: "causality-stability",
    ref: "Problem 4.8",
    title: "Periodicity versus causality and stability",
    prompt: r`Suppose a non-zero continuous function $h(t)$ is periodic with period $T>0$, and serves as the impulse response of an LTI system. Can this system be causal? Can it be stable? Give brief mathematical reasons.`,
    solution: r`**Causality: no.**

1. $h$ is continuous and not identically zero, so pick a time $t_0$ with $h(t_0)\ne0$.
2. Periodicity says

$$
h(t_0-mT)=h(t_0)\ne0\quad\text{for every integer }m
$$

3. For a large enough positive $m$, $t_0-mT<0$.
4. So $h$ is non-zero at some negative time: the system **cannot be causal**.

**BIBO stability: no.**

1. Since $h$ is continuous and non-zero somewhere, the area of $|h|$ over one period is strictly positive:

$$
C=\int_0^T|h(t)|\,dt>0
$$

2. Every period contributes the same $C$, and there are infinitely many periods:

$$
\int_{-\infty}^{\infty}|h(t)|\,dt=\cdots+C+C+C+\cdots=\infty
$$

So the system is **neither causal nor BIBO-stable**.

The word **non-zero** matters: the zero impulse response is both causal and stable.`,
  },
  {
    ...A,
    id: "sa-4.9",
    topic: "lti-convolution",
    ref: "Problem 4.9",
    title: "Simulating room acoustics",
    prompt: r`Suppose you have a recording of someone speaking and want to simulate how their voice would sound inside a large, empty hall. How could convolution help you achieve this? What information about the hall would you need?`,
    solution: r`- We need the **impulse response of the hall**. It describes how sound behaves inside it: every reflection and the reverberation.
- **Convolve** the original voice recording with this impulse response.
- The result is how the voice would sound inside the hall.

(In practice, the impulse response is recorded by making a short, sharp sound in the hall, such as a clap or a starter pistol, and recording what the microphone hears.)`,
  },
  {
    ...A,
    id: "sa-4.10",
    topic: "lti-convolution",
    ref: "Problem 4.10",
    title: "Smoothing sensor readings",
    prompt: r`A temperature sensor produces readings that fluctuate rapidly due to noise, even though the actual temperature changes slowly. How could convolution be used to make the readings smoother and more reliable?`,
    solution: r`- Convolve the readings with a **moving-average filter**, for example $h[n]=\frac1M$ for $n=0,\dots,M-1$.
- Each output is then a (weighted) average of nearby readings.
- Rapid random fluctuations average out, while the slow changes in temperature are kept.`,
  },
  {
    ...A,
    id: "sa-4.11",
    topic: "lti-convolution",
    ref: "Problem 4.11",
    title: "Creating an echo effect",
    prompt: r`You are developing an audio editing application. A user wants to add an echo effect to a voice recording. Explain how you could use convolution to create the effect. How could you control the delay and strength of the echo?`,
    solution: r`- Build an impulse response with a **main impulse** plus additional **delayed impulses**, for example

$$
h(t)=\delta(t)+a\,\delta(t-T)
$$

- Convolve it with the voice recording: $y(t)=x(t)+a\,x(t-T)$.
- The **positions** of the delayed impulses ($T$) control **when** the echoes occur.
- Their **amplitudes** ($a$) control **how loud** the echoes are.`,
  },
  /* ─────────────── Lecture 5: Fourier series ─────────────── */
  {
    ...A,
    id: "sa-5.1",
    topic: "fourier-series",
    ref: "Problem 5.1",
    title: "No integral needed",
    prompt: r`Write $x(t)$ in the complex exponential Fourier series form and identify all its non-zero coefficients $a_k$:

$$
x(t)=2+3\sin\!\left(\omega_0t+\frac\pi6\right)+\cos(2\omega_0t).
$$`,
    solution: r`**Step 1: Euler's formulas.**

$$
\sin\theta=\frac{e^{j\theta}-e^{-j\theta}}{2j},\qquad\cos\theta=\frac{e^{j\theta}+e^{-j\theta}}{2}
$$

**Step 2: read off the harmonics of $\omega_0$.**

- The constant $2$ is the DC term: $a_0=2$.
- $3\sin\!\left(\omega_0t+\frac\pi6\right)=\frac{3e^{j\pi/6}}{2j}e^{j\omega_0t}-\frac{3e^{-j\pi/6}}{2j}e^{-j\omega_0t}$, giving $k=\pm1$.
- $\cos(2\omega_0t)$ gives $k=\pm2$, each with weight $\frac12$.

**Step 3: the coefficients.**

$$
a_0=2
$$

$$
a_1=\frac34-j\frac{3\sqrt3}4,\qquad a_{-1}=\frac34+j\frac{3\sqrt3}4
$$

$$
a_2=\frac12,\qquad a_{-2}=\frac12
$$

Every other $a_k$ is zero, so

$$
x(t)=2+\sum_{k\in\{-2,-1,1,2\}}a_ke^{jk\omega_0t}
$$

$a_0=2$ is the DC (average) part. Positive and negative harmonics come in conjugate pairs because $x(t)$ is real.`,
  },
  {
    ...A,
    id: "sa-5.2",
    topic: "fourier-series",
    ref: "Problem 5.2",
    title: "Fourier series of a rectangular pulse train",
    prompt: r`The periodic signal $x(t)$ has period $T=3$ and is defined over $-\frac32<t<\frac32$ by

$$
x(t)=\begin{cases}1,&-\frac12<t<\frac12,\\0,&\text{otherwise within the period.}\end{cases}
$$

Find its complex Fourier coefficients $a_k$, handling $k=0$ separately. Determine which non-zero harmonic indices have $a_k=0$.`,
    solution: r`**Step 1: setup.** The waveform repeats every $T=3$, so

$$
\omega_0=\frac{2\pi}{3},\qquad a_k=\frac13\int_{-3/2}^{3/2}x(t)\,e^{-jk\omega_0t}\,dt
$$

Only the middle interval $-\frac12<t<\frac12$ contributes.

**Step 2: $k=0$, the average height.**

$$
a_0=\frac13\cdot(1\times1)=\frac13
$$

**Step 3: $k\ne0$.**

$$
a_k=\frac13\int_{-1/2}^{1/2}e^{-jk(2\pi/3)t}\,dt=\frac13\left[\frac{e^{-jk(2\pi/3)t}}{-jk(2\pi/3)}\right]_{-1/2}^{1/2}
$$

$$
a_k=\frac{\sin(k\pi/3)}{k\pi}
$$

**Step 4: the missing harmonics.** The sine is zero when $\frac{k\pi}3=m\pi$, that is at

$$
k=\pm3,\ \pm6,\ \pm9,\ \dots
$$
` + fig("sa-52") + r`
The zeros are regularly spaced: every non-zero harmonic index divisible by 3 is missing.`,
  },
  {
    ...A,
    id: "sa-5.3",
    topic: "fourier-series",
    ref: "Problem 5.3",
    title: "Periodic ramp",
    prompt: r`Let $x(t)=t$ for $0\le t<2$, extended periodically with $x(t+2)=x(t)$. Find the fundamental angular frequency and derive $a_0$ and $a_k$ for $k\ne0$.`,
    solution: r`**Step 1: frequency.** The ramp resets every 2 units, so $T_0=2$ and

$$
\omega_0=\frac{2\pi}{T_0}=\pi
$$

**Step 2: $a_0$, the average.**

$$
a_0=\frac12\int_0^2t\,dt=1
$$

**Step 3: $a_k$ for $k\ne0$.**

$$
a_k=\frac12\int_0^2t\,e^{-jk\pi t}\,dt
$$

Integrate by parts with $u=t$ and $dv=e^{-jk\pi t}dt$:

$$
a_k=\frac12\left(\left[\frac{-t\,e^{-jk\pi t}}{jk\pi}\right]_0^2+\frac1{jk\pi}\int_0^2e^{-jk\pi t}\,dt\right)
$$

- $e^{-j2k\pi}=1$, so the bracket is $\frac{-2}{jk\pi}$.
- The remaining integral is over a whole period, so it is zero.

$$
a_k=-\frac1{jk\pi}=\frac{j}{k\pi},\qquad k\ne0
$$

**Check:** a real signal has $a_{-k}=a_k^*$, which holds here.`,
  },
  {
    ...A,
    id: "sa-5.4",
    topic: "fourier-series",
    ref: "Problem 5.4",
    title: "Average height of a triangular ramp",
    prompt: r`A periodic waveform with $T=3$ is

$$
x(t)=\begin{cases}t,&0\le t<1,\\[4pt]\dfrac{3-t}2,&1\le t<3,\end{cases}\qquad x(t+3)=x(t).
$$

Sketch one period and calculate $a_0$ by geometry, without integrating.`,
    solution: r`**Step 1: the shape.** One period is a triangle: up from $(0,0)$ to $(1,1)$, then down in a straight line to $(3,0)$. Base 3, height 1.
` + fig("sa-54") + r`
**Step 2: $a_0$ is the average height over one period.** No integral is needed; use the triangle's area:

$$
\text{area}=\frac12(\text{base})(\text{height})=\frac12\cdot3\cdot1=\frac32
$$

**Step 3: divide by the period.**

$$
a_0=\frac{\text{area}}{T}=\frac{3/2}{3}=\frac12
$$`,
  },
  {
    ...A,
    id: "sa-5.5",
    topic: "fourier-series",
    ref: "Problem 5.5",
    title: "Fourier series: DC coefficient",
    prompt: r`Consider the continuous-time periodic signal $x(t)$ with period $T=2$, defined over one period as

$$
x(t)=\begin{cases}t^2,&0\le t<1,\\0,&1\le t<2.\end{cases}
$$

Let $a_k$ be its complex exponential Fourier series coefficients. Find $a_0$.`,
    solution: r`**$a_0$ is the average of the signal over one period**, whatever its shape:

$$
a_0=\frac1T\int_{\text{one period}}x(t)\,dt
$$

Here $T=2$ and the signal is non-zero only on $0\le t<1$:

$$
a_0=\frac12\int_0^1t^2\,dt=\frac12\left[\frac{t^3}3\right]_0^1=\frac16
$$

We only need $a_0$, so there is no reason to compute the other coefficients.`,
  },
  {
    ...A,
    id: "sa-5.6",
    topic: "fourier-series",
    ref: "Problem 5.6",
    title: "Zeros in a Fourier spectrum",
    prompt: r`Consider the continuous-time periodic signal $x(t)$ with period $T=4$, defined over one period as

$$
x(t)=\begin{cases}1,&|t|<1,\\0,&1<|t|<2.\end{cases}
$$

For a periodic rectangular pulse of amplitude $A$, width $\tau$ and period $T$, centred at the origin, the coefficients are

$$
a_k=\begin{cases}\dfrac{A\tau}{T},&k=0,\\[8pt]\dfrac{A}{k\pi}\sin\!\left(\dfrac{k\pi\tau}{T}\right),&k\ne0.\end{cases}
$$

Using this formula, determine the coefficients $a_k$ of $x(t)$ without evaluating any integrals. Also identify the non-zero integers $k$ for which $a_k=0$.`,
    solution: r`**Step 1: read off the numbers.** A centred rectangle with

- amplitude $A=1$;
- width $\tau=2$ (from $-1$ to $1$);
- period $T=4$.

**Step 2: substitute.**

$$
a_0=\frac{A\tau}{T}=\frac12
$$

$$
a_k=\frac{\sin(k\pi/2)}{k\pi}\qquad(k\ne0)
$$

**Step 3: the missing harmonics.** A non-zero harmonic vanishes when $\sin(k\pi/2)=0$, that is when $\frac{k\pi}2=m\pi$, or $k=2m$:

$$
a_k=0\quad\text{for }k=\pm2,\ \pm4,\ \pm6,\ \dots
$$
` + fig("sa-56") + r`
The odd harmonics survive, with alternating signs and shrinking sizes. Note that $k=0$ is **not** a zero: it is the positive average $\frac12$.`,
  },

  /* ─────────────── Lecture 6: Properties of Fourier series ─────────────── */
  {
    ...A,
    id: "sa-6.1",
    topic: "fourier-series",
    ref: "Problem 6.1",
    title: "Shift, reverse, then combine",
    prompt: r`A periodic signal $x(t)$ has period $T=4$ and Fourier coefficients $a_k$. Without evaluating an integral, write the coefficients $b_k$ of

$$
y(t)=3x(t-1)-2x(2-t)
$$

in terms of $a_k$, inserting the numerical value of $\omega_0$.`,
    solution: r`**Step 0:** $T=4$, so $\omega_0=\frac{2\pi}4=\frac\pi2$. Transform the two terms separately.

**Step 1: the first term (time shift).** The coefficients of $x(t-1)$ are

$$
a_ke^{-jk\omega_0\cdot1}=a_ke^{-jk\pi/2}
$$

Multiplying by 3 multiplies every coefficient by 3.

**Step 2: the second term (reversal and shift).** Write $x(2-t)=x(-(t-2))$ and expand the Fourier series:

$$
x(2-t)=\sum_{m}a_me^{jm\omega_0(2-t)}=\sum_{k}\underbrace{a_{-k}\,e^{-j2k\omega_0}}_{\text{coefficient at }k}\,e^{jk\omega_0t}
$$

Since $2\omega_0=\pi$, $e^{-j2k\omega_0}=(-1)^k$. So the second term has coefficients $(-1)^ka_{-k}$.

**Step 3: combine (linearity).**

$$
b_k=3e^{-jk\pi/2}a_k-2(-1)^ka_{-k}
$$

A useful habit is to handle **one transformation at a time**: a reversal changes the index from $k$ to $-k$; a time shift adds a phase factor.`,
  },
  {
    ...A,
    id: "sa-6.2",
    topic: "elementary-signals",
    ref: "Problem 6.2",
    title: "Which impulses are actually inside",
    prompt: r`Evaluate

$$
\int_{-1}^{3}(t^2+1)\big[2\delta(t+2)-3\delta(t-1)+\delta(t-2)\big]\,dt.
$$

Show which impulses contribute, and which do not.`,
    solution: r`**An impulse contributes only if its location lies inside the integration interval $[-1,3]$.**

| impulse | location | contribution |
|---|---|---|
| $2\delta(t+2)$ | $t=-2$ | $0$ (outside) |
| $-3\delta(t-1)$ | $t=1$ | $-3(1^2+1)=-6$ |
| $\delta(t-2)$ | $t=2$ | $2^2+1=5$ |

**Add the contributing terms:**

$$
\int_{-1}^{3}(t^2+1)\big[2\delta(t+2)-3\delta(t-1)+\delta(t-2)\big]\,dt=-6+5=-1
$$

The impulse at $t=-2$ does not count, even though its coefficient is non-zero.`,
  },
  {
    ...A,
    id: "sa-6.3",
    topic: "fourier-series",
    ref: "Problem 6.3",
    title: "Differentiation includes the jumps",
    prompt: r`A periodic signal has period $T=2$, and one period is given by

$$
x(t)=\begin{cases}2t,&0\le t<1,\\0,&1\le t<2.\end{cases}
$$

Sketch two periods and then sketch $\frac{d}{dt}x(t)$, including impulses at all jump locations. Write the derivative as an ordinary piecewise signal plus an impulse train.`,
    solution: r`**Step 1: draw the repeated ramp.** For every integer $m$, the signal rises as $2(t-2m)$ from $0$ to almost $2$ on $(2m,\,2m+1)$, then stays at $0$ on $(2m+1,\,2m+2)$. At $t=2m+1$ it jumps down by 2.

**Step 2: differentiate the smooth pieces.**

- On each rising piece the slope is $+2$.
- On each flat piece the slope is $0$.

**Step 3: include the jumps.**

- Each jump at $t=2m+1$ has size $0-2=-2$, so it adds $-2\,\delta(t-(2m+1))$.
- There is no jump at the even integers: the signal is zero on both sides there.

**Putting both parts together:**

$$
x'(t)=2\sum_{m=-\infty}^{\infty}\big[u(t-2m)-u(t-(2m+1))\big]-2\sum_{m=-\infty}^{\infty}\delta\big(t-(2m+1)\big)
$$
` + fig("sa-63") + r`
**The derivative:** plateaus of height 2 on $(2m,\,2m+1)$, height 0 on the other half-periods, plus downward impulses of weight $-2$ at the odd integers. The arrows are impulses, not tall negative spikes of finite height.`,
  },
  {
    ...A,
    id: "sa-6.4",
    topic: "fourier-series",
    ref: "Problem 6.4",
    title: "Fourier series properties",
    prompt: r`Let $x(t)$ be a differentiable periodic signal with fundamental period $T_0=4$ and complex exponential Fourier series coefficients $a_k$. Consider

$$
y(t)=\frac{d}{dt}\big[x(2t-1)\big].
$$

Determine the fundamental period and fundamental angular frequency of $y(t)$. Express the Fourier series coefficients $b_k$ of $y(t)$ in terms of $a_k$, without computing $a_k$.`,
    solution: r`**Step 1: the original frequency.**

$$
\omega_0=\frac{2\pi}{T_0}=\frac\pi2
$$

**Step 2: replace $t$ with $2t-1$ in the Fourier series.**

$$
x(2t-1)=\sum_{k}a_ke^{jk\omega_0(2t-1)}=\sum_k\underbrace{a_ke^{-jk\pi/2}}_{\text{shifted coefficient}}e^{jk\pi t}
$$

The factor 2 in time halves the period from 4 to 2, so the **new** fundamental frequency is $\Omega_0=2\omega_0=\pi$.

**Step 3: differentiate.** Differentiating each harmonic $e^{jk\pi t}$ multiplies it by $jk\pi$:

$$
b_k=jk\pi\,a_k\,e^{-jk\pi/2}
$$

In particular $b_0=0$: the derivative of a periodic signal has zero average.

**Step 4: period and frequency of $y$.**

$$
T_y=2,\qquad\Omega_0=\pi\ \text{rad/s}
$$

(It cannot have a smaller period without contradicting the fundamental period of $x$.)

Always use the **new** fundamental frequency when applying the differentiation rule after a time scaling.`,
  },
  {
    ...A,
    id: "sa-6.5",
    topic: "fourier-series",
    ref: "Problem 6.5",
    title: "A train remains a train",
    prompt: r`Using the complex exponential Fourier series, prove that an impulse train in the time domain corresponds to another impulse train in the frequency domain.`,
    solution: r`Take a unit impulse train with spacing $T>0$:

$$
p_T(t)=\sum_{m=-\infty}^{\infty}\delta(t-mT),\qquad\omega_0=\frac{2\pi}T
$$

**Step 1: its Fourier-series coefficients.**

$$
a_k=\frac1T\int_{\text{one period}}p_T(t)\,e^{-jk\omega_0t}\,dt
$$

Choose a period that contains exactly one impulse, at $t=0$. By the sifting property:

$$
a_k=\frac1Te^{-jk\omega_0\cdot0}=\frac1T\quad\text{for every integer }k
$$

**Step 2: the frequency-domain picture.** The Fourier series of the train is

$$
p_T(t)=\frac1T\sum_{k=-\infty}^{\infty}e^{jk\omega_0t}
$$

Each $e^{jk\omega_0t}$ has Fourier transform $2\pi\,\delta(\omega-k\omega_0)$. So the spectrum is

$$
P_T(j\omega)=\frac{2\pi}T\sum_{k=-\infty}^{\infty}\delta\!\left(\omega-\frac{2\pi k}{T}\right)
$$

This is another equally spaced impulse train, with spacing $\Delta\omega=\frac{2\pi}T$ and every impulse of weight $\frac{2\pi}T$.
` + fig("sa-65") + r`
**A useful distinction:** the Fourier-**series coefficient** sequence is flat ($a_k=\frac1T$), while the continuous-frequency Fourier **spectrum** is an impulse train. They are related descriptions, but not the same object.`,
  },
  /* ─────────────── Lecture 7: Fourier transform ─────────────── */
  {
    ...A,
    id: "sa-7.1",
    topic: "fourier-transform",
    ref: "Problem 7.1",
    title: "Shifted rectangular pulse",
    prompt: r`Consider the continuous-time signal

$$
x(t)=\begin{cases}1,&4<t<10,\\0,&\text{otherwise.}\end{cases}
$$

The Fourier transform of a rectangular pulse of amplitude $A$ and width $\tau$, centred at the origin, is

$$
X(j\omega)=\begin{cases}\dfrac{2A\sin(\omega\tau/2)}{\omega},&\omega\ne0,\\[8pt]A\tau,&\omega=0.\end{cases}
$$

Also recall the time-shifting property, $x(t-t_0)\longleftrightarrow e^{-j\omega t_0}X(j\omega)$. Using these, determine $X(j\omega)$ without evaluating any integrals. Also find $X(0)$.`,
    solution: r`**Step 1: describe the pulse.** It starts at 4 and ends at 10:

- width $\tau=10-4=6$;
- amplitude $A=1$;
- centre $t_0=\dfrac{4+10}2=7$.

So it is the width-6 rectangle centred at zero, moved **right by 7**.
` + fig("sa-71") + r`
**Step 2: the centred pulse.** The given formula:

$$
R(j\omega)=\frac{2\sin(3\omega)}{\omega}\quad(\omega\ne0),\qquad R(0)=6
$$

**Step 3: shift right by 7.** Time shifting multiplies by $e^{-j7\omega}$:

$$
X(j\omega)=e^{-j7\omega}\,\frac{2\sin(3\omega)}{\omega},\qquad\omega\ne0
$$

**Step 4: $X(0)$.** At $\omega=0$ the phase factor is 1, and the rectangle's transform equals its area:

$$
X(0)=6
$$

The shift changes the **phase** of the spectrum, not its magnitude.`,
  },
  {
    ...A,
    id: "sa-7.2",
    topic: "fourier-transform",
    ref: "Problem 7.2",
    title: "A Lego-block waveform",
    prompt: r`The pulse is

$$
x(t)=\begin{cases}3,&1<t<2,\\4.5,&2<t<3,\\3,&3<t<4,\\0,&\text{otherwise.}\end{cases}
$$

Express it as a sum of two rectangular pulses, then derive $X(j\omega)$ using only the rectangle formula and time shifting.`,
    solution: r`**Step 1: build it from two blocks.**

- A rectangle of height 3 on $1<t<4$ gives the lower level everywhere.
- Add a rectangle of height $1.5$ on $2<t<3$, which raises the middle from 3 to $4.5$.

$$
x(t)=3\big[u(t-1)-u(t-4)\big]+\tfrac32\big[u(t-2)-u(t-3)\big]
$$
` + fig("sa-72") + r`
**Step 2: transform each block.** Both are centred at $t_0=2.5$; their widths are 3 and 1. The centred-rectangle formula plus time shifting gives

$$
X(j\omega)=e^{-j(5/2)\omega}\left[3\cdot\frac{2\sin(3\omega/2)}{\omega}+\frac32\cdot\frac{2\sin(\omega/2)}{\omega}\right]
$$

$$
X(j\omega)=e^{-j5\omega/2}\left(\frac{6\sin(3\omega/2)}{\omega}+\frac{3\sin(\omega/2)}{\omega}\right),\qquad\omega\ne0
$$

**Step 3: $X(0)$**, from the rectangle areas:

$$
X(0)=3(3)+1.5(1)=10.5
$$

This is the **Lego-block** idea: we never had to integrate three separate pieces.`,
  },
  {
    ...A,
    id: "sa-7.3",
    topic: "fourier-transform",
    ref: "Problem 7.3",
    title: "Lock a cosine inside a rectangle",
    prompt: r`Let $r(t)=1$ for $|t|<1$ and $0$ otherwise. Define

$$
x(t)=r(t)\cos(3t).
$$

Find $X(j\omega)$ using the frequency-shifting property. Indicate the centres of the two shifted spectral copies.`,
    solution: r`**Step 1: the centred rectangle.**

$$
R(j\omega)=\frac{2\sin\omega}{\omega},\qquad R(0)=2
$$

**Step 2: write the cosine as two exponentials.**

$$
\cos(3t)=\tfrac12e^{j3t}+\tfrac12e^{-j3t}
$$

So $x(t)=\tfrac12r(t)e^{j3t}+\tfrac12r(t)e^{-j3t}$.

**Step 3: frequency shifting.** Multiplying by $e^{j\omega_ct}$ moves the spectrum **right by** $\omega_c$:

$$
r(t)e^{j\omega_ct}\ \longleftrightarrow\ R\big(j(\omega-\omega_c)\big)
$$

Apply it to both terms:

$$
X(j\omega)=\tfrac12R\big(j(\omega-3)\big)+\tfrac12R\big(j(\omega+3)\big)
$$

$$
X(j\omega)=\frac{\sin(\omega-3)}{\omega-3}+\frac{\sin(\omega+3)}{\omega+3}
$$

At $\omega=\pm3$ the $\frac00$ is read as its limit, 1.

**Step 4: the centres.** The two shifted copies of the rectangle's spectrum sit at

$$
\omega=+3\quad\text{and}\quad\omega=-3\ \text{rad/s}
$$
` + fig("sa-73") + r`
The plot shows the two parts **before** adding them. $X(j\omega)$ is their sum, so its value at each peak also includes a little from the other copy.`,
  },
  {
    ...A,
    id: "sa-7.4",
    topic: "fourier-transform",
    ref: "Problem 7.4",
    title: "Fourier transform of impulses",
    prompt: r`Find the Fourier transform of

$$
x(t)=3\delta(t+2)-2\delta(t-1).
$$

Also determine $X(0)$.`,
    solution: r`**Step 1: one impulse.** A shifted impulse has a very simple transform:

$$
\mathcal F\{\delta(t-t_0)\}=e^{-j\omega t_0}
$$

**Step 2: use linearity.** There is an impulse of weight 3 at $t=-2$ and one of weight $-2$ at $t=1$:

$$
X(j\omega)=3e^{-j\omega(-2)}-2e^{-j\omega(1)}=3e^{j2\omega}-2e^{-j\omega}
$$

**Step 3: set $\omega=0$.**

$$
X(0)=3-2=1
$$

This is also the net impulse weight, because $X(0)=\int_{-\infty}^{\infty}x(t)\,dt$.`,
  },
  {
    ...A,
    id: "sa-7.5",
    topic: "fourier-transform",
    ref: "Problem 7.5",
    title: "Detecting hidden signals in space",
    prompt: r`Astronomers receive radio signals from distant regions of space. Some signals may contain weak, repeating patterns that are difficult to notice directly. How could the Fourier transform help astronomers detect such hidden patterns in the received signals?`,
    solution: r`- The Fourier transform splits the received signal into its frequency components.
- A **repeating** pattern has a definite frequency, so it shows up as a **distinct peak** in the spectrum.
- That peak can be easy to spot even when the pattern is buried in noise and hard to see in the original signal.`,
  },
  {
    ...A,
    id: "sa-7.6",
    topic: "fourier-transform",
    ref: "Problem 7.6",
    title: "Removing unwanted audio noise",
    prompt: r`A voice recording contains an unwanted high-pitched electronic tone. How could the Fourier transform help you identify and remove this unwanted sound while preserving the speaker's voice?`,
    solution: r`1. Take the Fourier transform to find the **frequency of the unwanted tone**; it appears as a sharp spike.
2. **Suppress** that frequency component (a narrow notch), leaving the rest of the spectrum alone.
3. Apply the **inverse Fourier transform** to rebuild a cleaner voice recording.`,
  },
  {
    ...A,
    id: "sa-7.7",
    topic: "fourier-transform",
    ref: "Problem 7.7",
    title: "Audio compression",
    prompt: r`Suppose you are developing an audio compression application that aims to reduce the size of audio files while preserving their perceived sound quality. How could the Fourier transform help you achieve this? Which frequency components would you consider removing, and why?`,
    solution: r`- The Fourier transform shows the different frequency components of the audio.
- Remove, or store less precisely, the components that are **inaudible or very low in amplitude**.
- They contribute little to how the sound is perceived, so dropping them reduces the information needed to store the audio while keeping the quality.`,
  },
]
