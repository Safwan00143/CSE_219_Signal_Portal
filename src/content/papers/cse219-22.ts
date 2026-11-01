import type { Paper } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

/*
  CSE 219 term final of the 22 batch: L-2/T-II B.Sc. Engineering Examinations
  2023-2024, held 16/05/2026. Every part is solved in full; the topic pages
  pick the same parts up through src/content/papers/index.ts.
*/
export const paper22: Paper = {
  slug: "22-batch",
  name: "22 batch",
  course: "CSE 219",
  session: "2023-24",
  exam: "L-2/T-II B.Sc. Engineering Examinations 2023-2024",
  date: "16 May 2026",
  fullMarks: 210,
  time: "3 hours",
  sections: [
    {
      name: "Section A",
      instructions:
        "There are four questions in this section. Question 1 (45 marks) is compulsory. Answer any two of Questions 2 to 4 (30 marks each).",
      questions: [
        /* ───────────────────────── Q1 ───────────────────────── */
        {
          no: 1,
          parts: [
            {
              part: "a",
              marks: 15,
              topic: "signals",
              prompt: r`Let

$$
x(t)=\begin{cases}1-|t|, & |t|\le 1\\ 0, & \text{otherwise.}\end{cases}
$$

Sketch the signal

$$
y(t)=x\big(-2(t-1)\big)+x\!\left(\frac{t+2}{2}\right)
$$

You must clearly show the effect of each signal operation on the two component signals before obtaining the final sketch of $y(t)$. In your sketch, you need to properly label both x-axis and y-axis.`,
              solution: r`**Step 1: the starting signal.** $x(t)$ is a triangle of height 1 on $-1\le t\le 1$ with its peak at $t=0$. Each operation below only moves its three corner points $(-1,0)$, $(0,1)$ and $(1,0)$.
` + fig("p22-1a-x") + r`
**Step 2: the first component, $x_1(t)=x\big(-2(t-1)\big)$.**

Take the operations one at a time, in this order:

1. **Compress by 2:** $x(2t)$. A corner at $t$ moves to $t/2$, so the triangle now runs from $-\frac12$ to $\frac12$.
2. **Reverse:** $x(-2t)$. Flip about $t=0$. The triangle is even, so nothing visibly changes.
3. **Shift right by 1:** replace $t$ by $t-1$ to get $x\big(-2(t-1)\big)$. The triangle moves to $\frac12\le t\le\frac32$ with its peak at $t=1$.

Check with the argument. The peak is where the argument is 0, and the edges are where it is $\pm1$:

$$
-2(t-1)=0\ \Rightarrow\ t=1
$$

$$
-2(t-1)=\pm1\ \Rightarrow\ t=\tfrac12,\ \tfrac32
$$
` + fig("p22-1a-c1") + r`
**Step 3: the second component, $x_2(t)=x\!\left(\frac{t+2}{2}\right)$.**

1. **Expand by 2:** $x(t/2)$. A corner at $t$ moves to $2t$, so the triangle runs from $-2$ to $2$.
2. **Shift left by 2:** replace $t$ by $t+2$ to get $x\!\left(\frac{t+2}{2}\right)$. It now runs from $-4$ to $0$ with its peak at $t=-2$.

Check:

$$
\frac{t+2}{2}=0\ \Rightarrow\ t=-2
$$

$$
\frac{t+2}{2}=\pm1\ \Rightarrow\ t=0,\ -4
$$
` + fig("p22-1a-c2") + r`
**Step 4: add the two components.** The first triangle starts at $t=\frac12$ and the second ends at $t=0$, so they do not overlap and $y(t)$ is simply both of them drawn on one axis. Written out piece by piece:

$$
y(t)=\begin{cases}2+\frac t2, & -4\le t\le -2\\[2pt] -\frac t2, & -2\le t\le 0\\[2pt] 2t-1, & \frac12\le t\le 1\\[2pt] 3-2t, & 1\le t\le \frac32\\[2pt] 0, & \text{otherwise}\end{cases}
$$
` + fig("p22-1a-y"),
            },
            {
              part: "b",
              marks: 15,
              topic: "lti-convolution",
              prompt: r`Consider the combination of discrete-time LTI systems shown in Figure 1. The input signal $x[n]$ is applied to the overall system, which provides the output signal $y[n]$. The impulse responses $h_1[n]$, $h_2[n]$ and $h_3[n]$ are defined as follows:

$$
h_1[n]=\delta[n]-\delta[n-2],\qquad h_2[n]=u[n-1],\qquad h_3[n]=\delta[n]-\delta[n-1]
$$

Suppose the input is $x[n]=u[n]$. Analyze Figure 1 and answer the following questions.
` + fig("p22-1b-fig") + r`
(i) Express the equivalent impulse response $h_{eq}[n]$ of the overall system.

(ii) Infer the output $y[n]$ for the given input $x[n]$.`,
              solution: r`Two rules do all the work:

- Systems **in parallel** whose outputs are added act like one system with impulse response $h_1+h_2$.
- Systems **in cascade** act like one system with impulse response $h_a*h_b$.

**(i) Step 1: combine the parallel branches.**

$$
g[n]=h_1[n]+h_2[n]=\delta[n]-\delta[n-2]+u[n-1]
$$

Sample by sample:

| $n$ | $<0$ | $0$ | $1$ | $2$ | $\ge 3$ |
|---|---|---|---|---|---|
| $\delta[n]-\delta[n-2]$ | 0 | 1 | 0 | $-1$ | 0 |
| $u[n-1]$ | 0 | 0 | 1 | 1 | 1 |
| $g[n]$ | 0 | 1 | 1 | 0 | 1 |

So $g[n]$ is a unit step with the sample at $n=2$ removed:

$$
g[n]=u[n]-\delta[n-2]
$$

**Step 2: pass it through $h_3$.** Convolving with $\delta[n]-\delta[n-1]$ gives the signal minus itself delayed by one sample (a first difference):

$$
h_{eq}[n]=g[n]*h_3[n]=g[n]-g[n-1]
$$

$$
h_{eq}[n]=\big(u[n]-u[n-1]\big)-\delta[n-2]+\delta[n-3]
$$

and $u[n]-u[n-1]=\delta[n]$, so

$$
\boxed{h_{eq}[n]=\delta[n]-\delta[n-2]+\delta[n-3]}
$$

**Cross-check, branch by branch.**

$$
h_1*h_3=\big(\delta[n]-\delta[n-2]\big)*\big(\delta[n]-\delta[n-1]\big)=\delta[n]-\delta[n-1]-\delta[n-2]+\delta[n-3]
$$

$$
h_2*h_3=u[n-1]-u[n-2]=\delta[n-1]
$$

Adding them, the $\delta[n-1]$ terms cancel and we get the same $h_{eq}[n]$.

**(ii) Step 3: the output for $x[n]=u[n]$.** Convolving $u[n]$ with $\delta[n-k]$ just delays it by $k$:

$$
y[n]=u[n]*h_{eq}[n]=u[n]-u[n-2]+u[n-3]
$$

Evaluate:

- $y[0]=1$ and $y[1]=1$ (only $u[n]$ is on).
- $y[2]=1-1=0$.
- For $n\ge 3$: $y[n]=1-1+1=1$.

$$
\boxed{y[n]=u[n]-\delta[n-2]}
$$
` + fig("p22-1b"),
            },
            {
              part: "c",
              marks: 15,
              topic: "fourier-transform",
              prompt: r`Determine the Fourier transform of the rectangular function $x_1(t)=\mathrm{rect}(t)$. Then apply the properties of continuous Fourier transform and find the Fourier transform of $x_2(t)$ where

$$
x_2(t)=\mathrm{rect}\!\left(\frac{t-\tau}{T}\right)\cos 2\pi f_0t
$$`,
              solution: r`The question uses $f$ (Hz) and $\cos 2\pi f_0t$, so we use $X(f)=\int x(t)e^{-j2\pi ft}\,dt$. Here $\mathrm{rect}(t)=1$ for $|t|<\frac12$ and $0$ otherwise.

**Step 1: transform of $\mathrm{rect}(t)$.**

$$
X_1(f)=\int_{-1/2}^{1/2}e^{-j2\pi ft}\,dt=\left[\frac{e^{-j2\pi ft}}{-j2\pi f}\right]_{-1/2}^{1/2}=\frac{e^{j\pi f}-e^{-j\pi f}}{j2\pi f}
$$

Use $e^{j\theta}-e^{-j\theta}=2j\sin\theta$:

$$
X_1(f)=\frac{2j\sin\pi f}{j2\pi f}=\frac{\sin\pi f}{\pi f}
$$

$$
\boxed{\mathrm{rect}(t)\ \longleftrightarrow\ \mathrm{sinc}(f)},\qquad \mathrm{sinc}(f)=\frac{\sin\pi f}{\pi f}
$$

At $f=0$ it equals 1 (the area of the pulse), and it is zero at every nonzero integer $f$. In terms of $\omega$ the same result reads $\frac{2\sin(\omega/2)}{\omega}$.
` + fig("p22-1c-rect") + r`
Now build $x_2(t)$ from $\mathrm{rect}(t)$ one property at a time.

**Step 2: time scaling.** $x(t/T)\leftrightarrow |T|\,X(fT)$, so a pulse of width $T$ gives

$$
\mathrm{rect}\!\left(\frac tT\right)\ \longleftrightarrow\ T\,\mathrm{sinc}(fT)
$$

(Wider pulse, narrower spectrum: the first zeros move to $f=\pm\frac1T$.)

**Step 3: time shifting.** $x(t-\tau)\leftrightarrow X(f)\,e^{-j2\pi f\tau}$, so

$$
g(t)=\mathrm{rect}\!\left(\frac{t-\tau}{T}\right)\ \longleftrightarrow\ G(f)=T\,\mathrm{sinc}(fT)\,e^{-j2\pi f\tau}
$$

**Step 4: modulation.** Write the cosine as two exponentials:

$$
\cos 2\pi f_0t=\tfrac12\left(e^{j2\pi f_0t}+e^{-j2\pi f_0t}\right)
$$

Multiplying by $e^{j2\pi f_0t}$ shifts a spectrum to $f_0$ (frequency shifting), so

$$
g(t)\cos 2\pi f_0t\ \longleftrightarrow\ \tfrac12\big[G(f-f_0)+G(f+f_0)\big]
$$

Substitute $G$, replacing $f$ by $f\mp f_0$ everywhere, including in the phase:

$$
\boxed{X_2(f)=\frac T2\,\mathrm{sinc}\big((f-f_0)T\big)\,e^{-j2\pi(f-f_0)\tau}+\frac T2\,\mathrm{sinc}\big((f+f_0)T\big)\,e^{-j2\pi(f+f_0)\tau}}
$$

Properties used: scaling, time shift, and frequency shift (modulation).

**Reading the answer.** $|X_2(f)|$ is two copies of $\frac T2|\mathrm{sinc}(fT)|$ centred at $\pm f_0$, each with main lobe from $f_0-\frac1T$ to $f_0+\frac1T$. The delay $\tau$ changes only the phase.
` + fig("p22-1c-x2"),
            },
          ],
        },

        /* ───────────────────────── Q2 ───────────────────────── */
        {
          no: 2,
          stem: r`Suppose you have two signals $x_1(t)=e^{-at}u(t)$ and $x_2(t)=e^{-a|t|}$. Answer the following questions.`,
          parts: [
            {
              part: "a",
              marks: 10,
              topic: "fourier-transform",
              prompt: r`Determine the Fourier transform of $x_1(t)$. Then using your answer, determine the Fourier transform of $x_2(t)$. Mention the properties you used in your answer.`,
              solution: r`Throughout, $a>0$; otherwise neither signal decays and neither transform exists. Part (b) uses $f$, so we work in $f$ here too.

**Step 1: transform of $x_1(t)$.**

$$
X_1(f)=\int_0^\infty e^{-at}e^{-j2\pi ft}\,dt=\int_0^\infty e^{-(a+j2\pi f)t}\,dt=\left[\frac{e^{-(a+j2\pi f)t}}{-(a+j2\pi f)}\right]_0^\infty
$$

The upper limit gives 0 because $a>0$. The lower limit gives $\frac{1}{a+j2\pi f}$:

$$
\boxed{X_1(f)=\frac{1}{a+j2\pi f}}
$$

(In $\omega$: $\frac{1}{a+j\omega}$.)

**Step 2: write $x_2$ using $x_1$.**

- For $t>0$: $e^{-a|t|}=e^{-at}=x_1(t)$.
- For $t<0$: $e^{-a|t|}=e^{at}=x_1(-t)$.

So

$$
x_2(t)=x_1(t)+x_1(-t)
$$

(At the single point $t=0$ the right side is 2 instead of 1. A single point does not change any integral, so the transform is unaffected.)

**Step 3: time reversal.** $x(-t)\leftrightarrow X(-f)$, so

$$
x_1(-t)\ \longleftrightarrow\ \frac{1}{a-j2\pi f}
$$

**Step 4: linearity.** Add the two transforms over a common denominator:

$$
X_2(f)=\frac{1}{a+j2\pi f}+\frac{1}{a-j2\pi f}=\frac{(a-j2\pi f)+(a+j2\pi f)}{a^2+(2\pi f)^2}
$$

$$
\boxed{X_2(f)=\frac{2a}{a^2+(2\pi f)^2}}
$$

**Properties used:** time reversal and linearity. The result is real and even, as it must be for a real, even signal.
` + fig("p22-2a"),
            },
            {
              part: "b",
              marks: 20,
              topic: "fourier-transform",
              prompt: r`Evaluate the integral $I(a)$ given below. You have to use Parseval's theorem, your answer from question 2(a) and properties of continuous Fourier transform.

$$
I(a)=\int_{-\infty}^{\infty}\frac{f^2}{\big(a^2+(2\pi f)^2\big)^2}\,df
$$`,
              solution: r`**Step 1: see the integrand as a squared magnitude.**

$$
\frac{f^2}{\big(a^2+(2\pi f)^2\big)^2}=\left|\frac{f}{a^2+(2\pi f)^2}\right|^2
$$

Parseval's theorem (in $f$) says

$$
\int_{-\infty}^{\infty}|G(f)|^2\,df=\int_{-\infty}^{\infty}|g(t)|^2\,dt
$$

So we need a signal $g(t)$ whose transform is proportional to $\frac{f}{a^2+(2\pi f)^2}$.

**Step 2: get the factor $f$ from differentiation.** From 2(a), $X_2(f)=\frac{2a}{a^2+(2\pi f)^2}$ already has the right denominator. Differentiation in time multiplies the transform by $j2\pi f$:

$$
\frac{dx}{dt}\ \longleftrightarrow\ j2\pi f\,X(f)
$$

So

$$
x_2'(t)\ \longleftrightarrow\ j2\pi f\cdot\frac{2a}{a^2+(2\pi f)^2}=j4\pi a\cdot\frac{f}{a^2+(2\pi f)^2}
$$

which gives

$$
\frac{f}{a^2+(2\pi f)^2}=\frac{1}{j4\pi a}\,\mathcal F\{x_2'(t)\}
$$

**Step 3: apply Parseval.** Since $|j4\pi a|^2=16\pi^2a^2$,

$$
I(a)=\frac{1}{16\pi^2a^2}\int_{-\infty}^{\infty}\big|\mathcal F\{x_2'(t)\}\big|^2df=\frac{1}{16\pi^2a^2}\int_{-\infty}^{\infty}|x_2'(t)|^2\,dt
$$

**Step 4: find $x_2'(t)$.**

- For $t>0$: $\frac{d}{dt}e^{-at}=-a\,e^{-at}$.
- For $t<0$: $\frac{d}{dt}e^{at}=a\,e^{at}$.

$$
x_2'(t)=-a\,\mathrm{sgn}(t)\,e^{-a|t|}
$$

$x_2$ is continuous at $t=0$ (both sides equal 1), so the derivative has no impulse there.
` + fig("p22-2b") + r`
**Step 5: the energy of $x_2'$.**

$$
|x_2'(t)|^2=a^2e^{-2a|t|}
$$

$$
\int_{-\infty}^{\infty}a^2e^{-2a|t|}\,dt=2a^2\int_0^\infty e^{-2at}\,dt=2a^2\cdot\frac{1}{2a}=a
$$

**Step 6: put it together.**

$$
I(a)=\frac{a}{16\pi^2a^2}
$$

$$
\boxed{I(a)=\frac{1}{16\pi^2a}},\qquad a>0
$$

**Check by substitution.** Put $w=2\pi f$ and use the standard integral $\int_{-\infty}^{\infty}\frac{w^2}{(a^2+w^2)^2}dw=\frac{\pi}{2a}$:

$$
I(a)=\frac{1}{8\pi^3}\int_{-\infty}^{\infty}\frac{w^2}{(a^2+w^2)^2}\,dw=\frac{1}{8\pi^3}\cdot\frac{\pi}{2a}=\frac{1}{16\pi^2a}
$$

The two methods agree.`,
            },
          ],
        },

        /* ───────────────────────── Q3 ───────────────────────── */
        {
          no: 3,
          parts: [
            {
              part: "a",
              marks: 15,
              topic: "elementary-signals",
              prompt: r`Suppose

$$
x[n]=(3-4j)\,e^{j\frac{13\pi}{7}n}
$$

is a complex exponential discrete-time signal.

(i) Show whether the real and imaginary parts of $x[n]$ are periodic or not. If periodic, determine their fundamental period.

(ii) Justify carefully whether the phase shift in each part can be interpreted as an integer time shift of a cosine sequence.`,
              solution: r`**Step 1: put the constant in polar form.** $3-4j$ lies in the fourth quadrant:

$$
|3-4j|=\sqrt{9+16}=5
$$

$$
\theta=\tan^{-1}\frac43\approx 0.9273\ \text{rad}\ (53.13^\circ)
$$

$$
3-4j=5e^{-j\theta}
$$

So

$$
x[n]=5e^{j\left(\frac{13\pi}{7}n-\theta\right)}
$$

and the two parts are

$$
\mathrm{Re}\{x[n]\}=5\cos\!\left(\tfrac{13\pi}{7}n-\theta\right),\qquad \mathrm{Im}\{x[n]\}=5\sin\!\left(\tfrac{13\pi}{7}n-\theta\right)
$$

(Multiplying out $(3-4j)(\cos\Omega_0n+j\sin\Omega_0n)$ gives the same thing: $\mathrm{Re}=3\cos\Omega_0n+4\sin\Omega_0n$ and $\mathrm{Im}=3\sin\Omega_0n-4\cos\Omega_0n$.)

**(i) Step 2: periodicity.** A discrete sinusoid $\cos(\Omega_0n+\phi)$ is periodic exactly when $\frac{\Omega_0}{2\pi}$ is a rational number. Here

$$
\frac{\Omega_0}{2\pi}=\frac{13\pi/7}{2\pi}=\frac{13}{14}
$$

which is rational, so both parts are periodic. The period $N$ must make $\Omega_0N$ a whole number of turns:

$$
\frac{13\pi}{7}N=2\pi m\ \Rightarrow\ N=\frac{14m}{13}
$$

13 and 14 share no factor, so the smallest integer $N$ comes from $m=13$:

$$
\boxed{N_0=14\ \text{for both the real and the imaginary part}}
$$

The phase $\theta$ does not affect the period. Note also that $\frac{13\pi}{7}=2\pi-\frac\pi7$, so $x[n]$ is the same sequence as $5e^{-j(\frac\pi7n+\theta)}$: a slow rotation that takes 14 samples per cycle.
` + fig("p22-3a") + r`
**(ii) Step 3: when is a phase shift a time shift?** Delaying a cosine by $n_0$ samples gives

$$
\cos\big(\Omega_0(n-n_0)\big)=\cos(\Omega_0n-\Omega_0n_0)
$$

So $\cos(\Omega_0n-\phi)$ is an integer time shift of $\cos(\Omega_0n)$ only if

$$
\Omega_0n_0=\phi+2\pi m\quad\text{for some integers } n_0,\ m
$$

In continuous time any phase works ($t_0=\phi/\omega_0$), but in discrete time $n_0$ must be an integer.

**Step 4: which phases are reachable here?** With $\Omega_0=\frac{13\pi}{7}$, the values $\frac{13\pi}{7}n_0$ reduced mod $2\pi$ are

$$
0,\ \tfrac{\pi}{7},\ \tfrac{2\pi}{7},\ \dots,\ \tfrac{13\pi}{7}
$$

(as $n_0$ runs over $0,\dots,13$, $13n_0 \bmod 14$ takes every value once). So a phase can be turned into a delay only if it is an integer multiple of $\frac\pi7$.

**Step 5: test each part.**

- **Real part**, $5\cos\!\left(\frac{13\pi}{7}n-\theta\right)$: the phase is $\theta=0.9273\text{ rad}=0.2952\pi$. This lies between $\frac{2\pi}{7}=0.2857\pi$ and $\frac{3\pi}{7}=0.4286\pi$, so it is **not** a multiple of $\frac\pi7$.
- **Imaginary part**, $5\sin\!\left(\frac{13\pi}{7}n-\theta\right)=5\cos\!\left(\frac{13\pi}{7}n-\theta-\frac\pi2\right)$: the phase is $\theta+\frac\pi2=0.7952\pi$. This lies between $\frac{5\pi}{7}=0.714\pi$ and $\frac{6\pi}{7}=0.857\pi$, so it is **not** a multiple either.

(More strongly, $\theta/\pi$ is irrational. If it were rational with $\cos\theta$ rational, Niven's theorem would force $\cos\theta\in\{0,\pm\frac12,\pm1\}$, but $\cos\theta=\frac35$.)

**Conclusion.** In neither part can the phase shift be read as an integer time shift of a cosine sequence. Both parts are still periodic with $N_0=14$; the phase only sets where the samples fall on the cosine curve, and no whole-sample delay of $5\cos\frac{13\pi}{7}n$ reproduces them.`,
            },
            {
              part: "b",
              marks: 15,
              topic: "causality-stability",
              prompt: r`The following are the impulse responses of continuous-time LTI systems. Determine whether each system is causal and/or stable. Justify your answers.

(i) $h(t)=e^{-4t}u(3-t)$

(ii) $h(t)=e^{-6|t|}$

(iii) $h(t)=te^{-t}u(t)$`,
              solution: r`For an LTI system:

- **Causal** $\iff$ $h(t)=0$ for all $t<0$.
- **BIBO stable** $\iff$ $\displaystyle\int_{-\infty}^{\infty}|h(t)|\,dt<\infty$.

**(i) $h(t)=e^{-4t}u(3-t)$.** $u(3-t)=1$ when $t\le3$, so $h$ is non-zero for every $t\le 3$, including all $t<0$. **Not causal.**

Stability:

$$
\int_{-\infty}^{3}e^{-4t}\,dt=\left[-\frac{e^{-4t}}{4}\right]_{-\infty}^{3}
$$

As $t\to-\infty$, $e^{-4t}\to\infty$, so the integral diverges. **Not stable.**

**(ii) $h(t)=e^{-6|t|}$.** It is non-zero for $t<0$. **Not causal.**

$$
\int_{-\infty}^{\infty}e^{-6|t|}\,dt=2\int_0^{\infty}e^{-6t}\,dt=\frac26=\frac13<\infty
$$

**Stable.**

**(iii) $h(t)=te^{-t}u(t)$.** It is zero for $t<0$. **Causal.** It is never negative, so $|h|=h$. Integrate by parts:

$$
\int_0^{\infty}te^{-t}\,dt=\Big[-te^{-t}\Big]_0^{\infty}+\int_0^{\infty}e^{-t}\,dt=0+1=1<\infty
$$

**Stable.**

| System | Causal | Stable |
|---|---|---|
| (i) $e^{-4t}u(3-t)$ | No | No |
| (ii) $e^{-6\lvert t\rvert}$ | No | Yes |
| (iii) $te^{-t}u(t)$ | Yes | Yes |
` + fig("p22-3b"),
            },
          ],
        },

        /* ───────────────────────── Q4 ───────────────────────── */
        {
          no: 4,
          stem: r`Let $x(t)$ be the odd square wave

$$
x(t)=\begin{cases}A, & 0<t<\frac{T_0}{2}\\[2pt] -A, & -\frac{T_0}{2}<t<0\end{cases}\qquad x(t+T_0)=x(t)
$$

Now define

$$
y(t)=x\!\left(t-\frac{T_0}{6}\right)
$$`,
          parts: [
            {
              part: "a",
              marks: 5,
              topic: "fourier-series",
              prompt: r`Show that $y(t)$ still has half-wave symmetry.`,
              solution: r`A signal of period $T_0$ has **half-wave symmetry** when shifting it by half a period flips its sign:

$$
s\!\left(t+\tfrac{T_0}{2}\right)=-s(t)
$$

**Step 1: $x(t)$ has it.** Shifting by $\frac{T_0}{2}$ moves the interval $-\frac{T_0}{2}<t<0$ (value $-A$) onto $0<t<\frac{T_0}{2}$ (value $A$), and vice versa. So $x\!\left(t+\frac{T_0}{2}\right)=-x(t)$.

**Step 2: $y(t)$ inherits it.**

$$
y\!\left(t+\tfrac{T_0}{2}\right)=x\!\left(t+\tfrac{T_0}{2}-\tfrac{T_0}{6}\right)=x\!\left(\Big(t-\tfrac{T_0}{6}\Big)+\tfrac{T_0}{2}\right)
$$

Apply Step 1 with $t-\frac{T_0}{6}$ in place of $t$:

$$
y\!\left(t+\tfrac{T_0}{2}\right)=-x\!\left(t-\tfrac{T_0}{6}\right)=-y(t)
$$

So $y(t)$ has half-wave symmetry. A delay moves the whole wave, so "half a period later, the sign flips" stays true.

**What is lost: odd symmetry.**

$$
y(-t)=x\!\left(-t-\tfrac{T_0}{6}\right)=-x\!\left(t+\tfrac{T_0}{6}\right)\ne -y(t)
$$

$y$ is neither even nor odd. Half-wave symmetry still means only odd harmonics appear, which we will see in (b).
` + fig("p22-4-xy"),
            },
            {
              part: "b",
              marks: 10,
              topic: "fourier-series",
              prompt: r`Find the complex Fourier series coefficients $Y_k$ from those of $x(t)$.`,
              solution: r`Let $\omega_0=\frac{2\pi}{T_0}$, so $\omega_0T_0=2\pi$.

**Step 1: the coefficients $X_k$ of $x(t)$.**

$$
X_k=\frac1{T_0}\int_{-T_0/2}^{T_0/2}x(t)e^{-jk\omega_0t}\,dt=\frac{A}{T_0}\left[\int_0^{T_0/2}e^{-jk\omega_0t}\,dt-\int_{-T_0/2}^{0}e^{-jk\omega_0t}\,dt\right]
$$

For $k\ne0$, use $e^{\mp jk\omega_0T_0/2}=e^{\mp jk\pi}=(-1)^k$:

$$
\int_0^{T_0/2}e^{-jk\omega_0t}\,dt=\frac{1-e^{-jk\pi}}{jk\omega_0}=\frac{1-(-1)^k}{jk\omega_0}
$$

$$
\int_{-T_0/2}^{0}e^{-jk\omega_0t}\,dt=\frac{e^{jk\pi}-1}{jk\omega_0}=\frac{(-1)^k-1}{jk\omega_0}
$$

Subtract and use $\omega_0T_0=2\pi$:

$$
X_k=\frac{A}{T_0}\cdot\frac{2\big(1-(-1)^k\big)}{jk\omega_0}=\frac{A\big(1-(-1)^k\big)}{j\pi k}
$$

For $k=0$ the average of $x$ over a period is 0. So

$$
X_k=\begin{cases}\dfrac{2A}{j\pi k}=-j\dfrac{2A}{\pi k}, & k\ \text{odd}\\[6pt] 0, & k\ \text{even (including } k=0)\end{cases}
$$

**Step 2: time shift.** If $x(t)$ has coefficients $X_k$, then $x(t-t_0)$ has coefficients $X_k\,e^{-jk\omega_0t_0}$. Here $t_0=\frac{T_0}{6}$:

$$
k\omega_0t_0=k\cdot\frac{2\pi}{T_0}\cdot\frac{T_0}{6}=\frac{k\pi}{3}
$$

$$
Y_k=X_k\,e^{-jk\pi/3}
$$

**Result.**

$$
\boxed{Y_k=\begin{cases}\dfrac{2A}{j\pi k}\,e^{-jk\pi/3}=\dfrac{2A}{\pi k}\,e^{-j\left(\frac\pi2+\frac{k\pi}{3}\right)}, & k\ \text{odd}\\[6pt] 0, & k\ \text{even}\end{cases}}
$$

The shift leaves every magnitude unchanged, $|Y_k|=|X_k|=\frac{2A}{\pi|k|}$, and adds a phase $-\frac{k\pi}{3}$ that grows linearly with $k$.`,
            },
            {
              part: "c",
              marks: 10,
              topic: "fourier-series",
              prompt: r`Draw the magnitude and phase spectra of $Y_k$ (up to $k=5$ is sufficient).`,
              solution: r`From (b), for odd $k$:

$$
|Y_k|=\frac{2A}{\pi|k|}
$$

For $k>0$ the phase is $-\frac\pi2-\frac{k\pi}{3}$, brought into $(-\pi,\pi]$ by adding $2\pi$ where needed. $y(t)$ is real, so $Y_{-k}=Y_k^*$: the magnitude is even in $k$ and the phase is odd.

**Positive $k$:**

- $k=1$: $-\frac\pi2-\frac\pi3=-\frac{5\pi}{6}$.
- $k=3$: $-\frac\pi2-\pi=-\frac{3\pi}{2}$, which is the same angle as $\frac{\pi}{2}$.
- $k=5$: $-\frac\pi2-\frac{5\pi}{3}=-\frac{13\pi}{6}$, which is the same angle as $-\frac{\pi}{6}$.

**Check $k=3$ directly:**

$$
Y_3=\frac{2A}{j3\pi}e^{-j\pi}=-\frac{2A}{j3\pi}=j\frac{2A}{3\pi}
$$

This is positive imaginary, so its phase is $\frac\pi2$.

| $k$ | $\pm1$ | $\pm2$ | $\pm3$ | $\pm4$ | $\pm5$ |
|---|---|---|---|---|---|
| $\lvert Y_k\rvert$ | $\frac{2A}{\pi}\approx0.637A$ | 0 | $\frac{2A}{3\pi}\approx0.212A$ | 0 | $\frac{2A}{5\pi}\approx0.127A$ |
| $\angle Y_k$, $k>0$ | $-\frac{5\pi}{6}$ | n/a | $\frac{\pi}{2}$ | n/a | $-\frac{\pi}{6}$ |
| $\angle Y_k$, $k<0$ | $\frac{5\pi}{6}$ | n/a | $-\frac{\pi}{2}$ | n/a | $\frac{\pi}{6}$ |

$Y_0=0$: the wave spends equal time at $+A$ and $-A$.

For comparison, $x(t)$ itself has phase $-\frac\pi2$ for every $k>0$ and $+\frac\pi2$ for every $k<0$. The delay adds $-\frac{k\pi}{3}$ to each harmonic.
` + fig("p22-4c"),
            },
            {
              part: "d",
              marks: 5,
              topic: "fourier-series",
              prompt: r`Compare the trigonometric Fourier series of $x(t)$ and $y(t)$.`,
              solution: r`For a real signal, pairing $k$ with $-k$ gives

$$
s(t)=S_0+\sum_{k=1}^{\infty}2|S_k|\cos\big(k\omega_0t+\angle S_k\big)
$$

**$x(t)$.** $2|X_k|=\frac{4A}{\pi k}$ and $\angle X_k=-\frac\pi2$ for odd $k$. Since $\cos\!\left(\phi-\frac\pi2\right)=\sin\phi$:

$$
x(t)=\frac{4A}{\pi}\left[\sin\omega_0t+\frac13\sin3\omega_0t+\frac15\sin5\omega_0t+\cdots\right]=\sum_{k\ \mathrm{odd}}\frac{4A}{\pi k}\sin k\omega_0t
$$

**$y(t)$.** Replace $t$ by $t-\frac{T_0}{6}$, which turns $k\omega_0t$ into $k\omega_0t-\frac{k\pi}{3}$:

$$
y(t)=\sum_{k\ \mathrm{odd}}\frac{4A}{\pi k}\sin\!\left(k\omega_0t-\frac{k\pi}{3}\right)
$$

Expand the first three terms with $\sin(\alpha-\beta)=\sin\alpha\cos\beta-\cos\alpha\sin\beta$:

- $k=1$: $\cos\frac\pi3=\frac12$ and $\sin\frac\pi3=\frac{\sqrt3}{2}$.
- $k=3$: $\cos\pi=-1$ and $\sin\pi=0$.
- $k=5$: $\cos\frac{5\pi}{3}=\frac12$ and $\sin\frac{5\pi}{3}=-\frac{\sqrt3}{2}$.

$$
y(t)=\frac{4A}{\pi}\left[\left(\tfrac12\sin\omega_0t-\tfrac{\sqrt3}{2}\cos\omega_0t\right)-\tfrac13\sin3\omega_0t+\tfrac15\left(\tfrac12\sin5\omega_0t+\tfrac{\sqrt3}{2}\cos5\omega_0t\right)+\cdots\right]
$$

**Comparison.**

| | $x(t)$ | $y(t)$ |
|---|---|---|
| DC term | 0 | 0 |
| Harmonics present | odd only | odd only (half-wave symmetry kept) |
| Amplitude of harmonic $k$ | $\frac{4A}{\pi k}$ | $\frac{4A}{\pi k}$ (same) |
| Terms | sines only (odd signal) | sines and cosines (neither even nor odd) |
| Phase of harmonic $k$ | $-\frac\pi2$ | $-\frac\pi2-\frac{k\pi}{3}$ |
| Average power | $A^2$ | $A^2$ (same) |

Harmonics that are multiples of 3 are shifted by a multiple of $\pi$, so in $y$ they stay pure sines with their sign flipped ($3\omega_0$, $9\omega_0$, …) or unchanged. All the other harmonics pick up a cosine part.`,
            },
          ],
        },
      ],
    },
    {
      name: "Section B",
      instructions: "There are four questions in this section. Question 5 is compulsory. Answer any two of Questions 6, 7 and 8.",
      questions: [
        /* ───────────────────────── Q5 ───────────────────────── */
        {
          no: 5,
          parts: [
            {
              part: "a",
              marks: 15,
              topic: "fft",
              prompt: r`A discrete-time signal is given as:

$$
x[n]=\{1,\ 2,\ 3,\ 4,\ 3,\ 2\}
$$

Calculate the 8-point Discrete Fourier Transform (DFT) of the sequence using the Radix-2 Decimation-in-Time (DIT) FFT algorithm, showing all intermediate stages with proper butterfly diagram.`,
              solution: r`**Step 1: pad to 8 points.**

$$
x[n]=\{1,\ 2,\ 3,\ 4,\ 3,\ 2,\ 0,\ 0\},\qquad n=0,\dots,7
$$

**Step 2: twiddle factors.** $W_8=e^{-j2\pi/8}$:

$$
W_8^0=1,\qquad W_8^1=\frac{1-j}{\sqrt2},\qquad W_8^2=-j,\qquad W_8^3=-\frac{1+j}{\sqrt2}
$$

**Step 3: bit-reversed input order.** DIT splits into even and odd samples again and again. That is the same as reading the inputs in bit-reversed order:

| $n$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| binary | 000 | 001 | 010 | 011 | 100 | 101 | 110 | 111 |
| reversed | 000 | 100 | 010 | 110 | 001 | 101 | 011 | 111 |
| input row | $x[0]$ | $x[4]$ | $x[2]$ | $x[6]$ | $x[1]$ | $x[5]$ | $x[3]$ | $x[7]$ |
| value | 1 | 3 | 3 | 0 | 2 | 2 | 4 | 0 |

Each butterfly takes a top input $p$ and a bottom input $q$ and gives

$$
p+W\,q\quad\text{and}\quad p-W\,q
$$

**Step 4: stage 1, four 2-point DFTs** (all with $W_8^0=1$):

| pair | top: $p+q$ | bottom: $p-q$ |
|---|---|---|
| $x[0],x[4]=1,3$ | 4 | $-2$ |
| $x[2],x[6]=3,0$ | 3 | 3 |
| $x[1],x[5]=2,2$ | 4 | 0 |
| $x[3],x[7]=4,0$ | 4 | 4 |

**Step 5: stage 2, two 4-point DFTs** (twiddles $W_8^0=1$ and $W_8^2=-j$).

Even samples, giving $G[k]$:

$$
G[0]=4+3=7,\qquad G[2]=4-3=1
$$

$$
G[1]=-2+(-j)(3)=-2-3j,\qquad G[3]=-2-(-j)(3)=-2+3j
$$

Odd samples, giving $H[k]$:

$$
H[0]=4+4=8,\qquad H[2]=4-4=0
$$

$$
H[1]=0+(-j)(4)=-4j,\qquad H[3]=0-(-j)(4)=4j
$$

**Step 6: stage 3, combine with $W_8^k$.**

$$
X[k]=G[k]+W_8^kH[k],\qquad X[k+4]=G[k]-W_8^kH[k],\qquad k=0,1,2,3
$$

The products first:

$$
W_8^0H[0]=8
$$

$$
W_8^1H[1]=\frac{1-j}{\sqrt2}(-4j)=\frac{-4j-4}{\sqrt2}=-2\sqrt2-2\sqrt2\,j
$$

$$
W_8^2H[2]=0
$$

$$
W_8^3H[3]=-\frac{1+j}{\sqrt2}(4j)=\frac{4-4j}{\sqrt2}=2\sqrt2-2\sqrt2\,j
$$

Then the outputs:

| $k$ | $X[k]$ exact | $X[k]$ decimal |
|---|---|---|
| 0 | $7+8=15$ | $15$ |
| 1 | $(-2-2\sqrt2)-j(3+2\sqrt2)$ | $-4.828-5.828j$ |
| 2 | $1+0=1$ | $1$ |
| 3 | $(-2+2\sqrt2)+j(3-2\sqrt2)$ | $0.828+0.172j$ |
| 4 | $7-8=-1$ | $-1$ |
| 5 | $(-2+2\sqrt2)-j(3-2\sqrt2)$ | $0.828-0.172j$ |
| 6 | $1-0=1$ | $1$ |
| 7 | $(-2-2\sqrt2)+j(3+2\sqrt2)$ | $-4.828+5.828j$ |
` + fig("p22-5a") + r`
**Checks.**

- $X[0]$ is the sum of the samples: $1+2+3+4+3+2=15$. ✓
- $X[4]$ is the alternating sum: $1-2+3-4+3-2=-1$. ✓
- $x$ is real, so $X[8-k]=X^*[k]$: $X[7]=X^*[1]$, $X[5]=X^*[3]$, and $X[6]=X[2]$ is real. ✓`,
            },
            {
              part: "b",
              marks: 10,
              topic: "dtft-dft",
              prompt: r`Two discrete-time sequences are given as:

$$
x[n]=\{1,\ 2\}\quad\text{and}\quad h[n]=\{1,\ 1\}
$$

Demonstrate the step-by-step process of computing the linear convolution of $x[n]$ and $h[n]$ using the naive Discrete Fourier Transform (DFT) method, performing all calculations to obtain the final time-domain result.`,
              solution: r`**Step 1: choose the DFT length.** Multiplying DFTs gives a **circular** convolution of length $N$. It equals the linear convolution only if $N$ is at least the linear length:

$$
N\ge L_x+L_h-1=2+2-1=3
$$

Take $N=4$: it is a power of 2 and its twiddles are just $1,-j,-1,j$. (With $N=2$ the last sample would wrap around onto the first.) Pad with zeros:

$$
x=\{1,2,0,0\},\qquad h=\{1,1,0,0\}
$$

**Step 2: the 4-point DFT.** $X[k]=\sum_{n=0}^{3}x[n]W_4^{kn}$ with $W_4=e^{-j\pi/2}=-j$. In matrix form:

$$
\begin{bmatrix}X[0]\\X[1]\\X[2]\\X[3]\end{bmatrix}=\begin{bmatrix}1&1&1&1\\1&-j&-1&j\\1&-1&1&-1\\1&j&-1&-j\end{bmatrix}\begin{bmatrix}x[0]\\x[1]\\x[2]\\x[3]\end{bmatrix}
$$

Only the first two samples are non-zero, so $X[k]=x[0]+x[1](-j)^k$:

$$
X[k]=1+2(-j)^k\ \Rightarrow\ X=\{3,\ 1-2j,\ -1,\ 1+2j\}
$$

$$
H[k]=1+(-j)^k\ \Rightarrow\ H=\{2,\ 1-j,\ 0,\ 1+j\}
$$

**Step 3: multiply point by point.**

$$
Y[0]=3\cdot2=6
$$

$$
Y[1]=(1-2j)(1-j)=1-j-2j+2j^2=-1-3j
$$

$$
Y[2]=(-1)\cdot0=0
$$

$$
Y[3]=(1+2j)(1+j)=1+j+2j+2j^2=-1+3j
$$

**Step 4: inverse DFT.**

$$
y[n]=\frac14\sum_{k=0}^{3}Y[k]\,j^{kn}
$$

$n=0$:

$$
y[0]=\tfrac14\big(6+(-1-3j)+0+(-1+3j)\big)=\tfrac44=1
$$

$n=1$, multiplying by $j^k=1,j,-1,-j$:

$$
(-1-3j)\,j=3-j,\qquad (-1+3j)(-j)=3+j
$$

$$
y[1]=\tfrac14\big(6+(3-j)+0+(3+j)\big)=\tfrac{12}{4}=3
$$

$n=2$, multiplying by $1,-1,1,-1$:

$$
y[2]=\tfrac14\big(6+(1+3j)+0+(1-3j)\big)=\tfrac84=2
$$

$n=3$, multiplying by $1,-j,-1,j$:

$$
(-1-3j)(-j)=-3+j,\qquad (-1+3j)\,j=-3-j
$$

$$
y[3]=\tfrac14\big(6+(-3+j)+0+(-3-j)\big)=0
$$

**Result.**

$$
y=\{1,3,2,0\}\ \Rightarrow\ \boxed{x[n]*h[n]=\{1,\ 3,\ 2\}}
$$

The fourth sample is 0, as it must be, since the linear result has only 3 samples.

**Check directly.** $y[0]=1\cdot1=1$, $y[1]=1\cdot1+2\cdot1=3$, $y[2]=2\cdot1=2$. ✓
` + fig("p22-5b"),
            },
            {
              part: "c",
              marks: 10,
              topic: "sampling",
              prompt: r`A sound engineer is restoring a vintage vinyl recording. He has digitised the record at a sufficient sampling rate (no aliasing). He now needs to convert the stored digital samples back to a smooth analogue audio signal for playback. He has three reconstruction methods available: an ideal sinc-based low-pass filter, a Zero-Order Hold (ZOH) circuit, and a linear interpolation module. His hardware cannot implement non-causal filters, and his system requires a method that can be directly embedded into a real-time Digital-to-Analog Converter (DAC) with no delay buffer. Based on the scenario above, answer the following questions.

(i) Compare the impulse responses of the three reconstruction methods mentioned above. *(5)*

(ii) Justify which single reconstruction method the engineer should choose for his real-time DAC. *(5)*`,
              solution: r`Let $T$ be the sampling interval. Each method rebuilds the signal as

$$
x_r(t)=\sum_n x(nT)\,h(t-nT)
$$

so the method is completely described by the pulse $h(t)$ placed at each sample.

**(i) The three impulse responses.**

**Ideal low-pass filter.** Gain $T$, cutoff $\frac{\pi}{T}$:

$$
h_{\text{ideal}}(t)=\frac{\sin(\pi t/T)}{\pi t/T}
$$

It equals 1 at $t=0$ and 0 at every other sample instant, and it extends forever in both directions.

**Zero-order hold.** A box that holds each sample for one interval:

$$
h_0(t)=\begin{cases}1, & 0\le t<T\\ 0, & \text{otherwise}\end{cases}
$$

Its frequency response is

$$
H_0(j\omega)=T\,\frac{\sin(\omega T/2)}{\omega T/2}\,e^{-j\omega T/2}
$$

**Linear interpolation (first-order hold).** A triangle that joins neighbouring samples with straight lines:

$$
h_1(t)=\begin{cases}1-\dfrac{|t|}{T}, & |t|\le T\\[4pt] 0, & \text{otherwise}\end{cases}
$$

Its frequency response is

$$
H_1(j\omega)=T\left[\frac{\sin(\omega T/2)}{\omega T/2}\right]^2
$$
` + fig("p22-5c-h") + r`
| | Ideal sinc LPF | Zero-order hold | Linear interpolation |
|---|---|---|---|
| Shape of $h(t)$ | sinc, infinite length | box on $[0,T)$ | triangle on $[-T,T]$ |
| Causal? | No ($h\ne0$ for $t<0$) | **Yes** | No (needs the next sample) |
| Duration | infinite | $T$ | $2T$ |
| Output waveform | exact original | staircase | straight lines between samples |
| Frequency response | flat to $\frac\pi T$, then 0 | sinc: droops, leaks images | sinc²: less leakage |
| Delay / buffering | infinite look-ahead | none (about $T/2$ group delay) | one sample of look-ahead |
| Realisable? | no, only approximately | yes, trivially | only with a 1-sample delay |
` + fig("p22-5c-rec") + r`
**(ii) The choice: zero-order hold.** Test each method against the two constraints.

1. **Causal hardware.** The ideal filter's sinc is non-zero for $t<0$ and never ends; it would need every future sample, so it cannot be built at all, let alone in real time. The triangle of linear interpolation is also non-zero for $-T<t<0$. To draw the line from $x(nT)$ to $x((n+1)T)$ it must already know $x((n+1)T)$.
2. **No delay buffer.** Linear interpolation can be made causal only by delaying the output by one sample, which means storing that sample: a delay buffer, which the system does not allow.

The ZOH uses only the sample that has already arrived and holds it until the next one. That is exactly what a DAC's output latch does, so it is **causal, needs no buffer, and is built into the DAC directly**.

**Choose the zero-order hold.** Its weaknesses are the staircase shape, a gentle high-frequency droop (the $\frac{\sin x}{x}$ factor) and a delay of about $T/2$. A simple analogue low-pass (anti-imaging) filter after the DAC smooths the steps for playback. If needed, a digital $\frac{x}{\sin x}$ pre-emphasis compensates the droop. Neither of these changes the choice of reconstruction method.`,
            },
          ],
        },

        /* ───────────────────────── Q6 ───────────────────────── */
        {
          no: 6,
          parts: [
            {
              part: "a",
              marks: 12,
              topic: "laplace",
              prompt: r`Solve the following differential equation using the Laplace Transform:

$$
\frac{d^2y(t)}{dt^2}+7\frac{dy(t)}{dt}+12y(t)=\frac{dx(t)}{dt}+2x(t)
$$

with input $x(t)=u(t)$ and initial conditions $y(0)=0$, $y'(0)=0$.`,
              solution: r`**Step 1: transform both sides.** The unilateral Laplace transform turns derivatives into powers of $s$ minus initial values:

$$
\mathcal L\{y''\}=s^2Y(s)-s\,y(0^-)-y'(0^-),\qquad \mathcal L\{y'\}=sY(s)-y(0^-)
$$

Both initial conditions are zero. For the input, $x(0^-)=u(0^-)=0$, so $\mathcal L\{x'\}=sX(s)$ and $X(s)=\frac1s$:

$$
(s^2+7s+12)\,Y(s)=(s+2)\,X(s)=\frac{s+2}{s}
$$

**Step 2: solve for $Y(s)$.** Factor $s^2+7s+12=(s+3)(s+4)$:

$$
Y(s)=\frac{s+2}{s(s+3)(s+4)}
$$

**Step 3: partial fractions.**

$$
Y(s)=\frac{A}{s}+\frac{B}{s+3}+\frac{C}{s+4}
$$

Cover up each factor and put in its root:

$$
A=\left.\frac{s+2}{(s+3)(s+4)}\right|_{s=0}=\frac{2}{12}=\frac16
$$

$$
B=\left.\frac{s+2}{s(s+4)}\right|_{s=-3}=\frac{-1}{(-3)(1)}=\frac13
$$

$$
C=\left.\frac{s+2}{s(s+3)}\right|_{s=-4}=\frac{-2}{(-4)(-1)}=-\frac12
$$

Check: the numerator has no $s^2$ term, so $A+B+C$ must be 0, and $\frac16+\frac13-\frac12=0$. ✓

**Step 4: invert.**

$$
\boxed{y(t)=\left(\frac16+\frac13e^{-3t}-\frac12e^{-4t}\right)u(t)}
$$

**Checks.**

- $y(0)=\frac16+\frac13-\frac12=0$. ✓
- Final value: $\lim_{s\to0}sY(s)=\frac{2}{12}=\frac16$, the DC gain. ✓
- $y'(0^+)=-1+2=1$, not 0. This is correct: the right side contains $\frac{dx}{dt}=\delta(t)$, which kicks $y'$ at $t=0$. The given conditions hold at $0^-$, which is what the unilateral transform uses.
` + fig("p22-6a"),
            },
            {
              part: "b",
              marks: 13,
              topic: "laplace",
              prompt: r`Find the Laplace Transform $X(s)$ and its Region of Convergence (ROC) for the following signal $x(t)$. Also, sketch the ROC in the s-plane, clearly marking all poles.

$$
x(t)=|t|e^{-2|t|}-e^{-t}\cos(3t)\,u(t)+t^2e^{-4t}u(t)
$$`,
              solution: r`Transform the three terms one at a time, each with its own ROC. The final ROC is where all of them converge.

**Term 1: $|t|e^{-2|t|}$, a two-sided signal.** Split it at $t=0$:

$$
|t|e^{-2|t|}=t\,e^{-2t}u(t)+(-t)\,e^{2t}u(-t)
$$

The right-sided part is a standard pair:

$$
t\,e^{-2t}u(t)\ \longleftrightarrow\ \frac{1}{(s+2)^2},\qquad \mathrm{Re}\{s\}>-2
$$

For the left-sided part, integrate directly and put $\tau=-t$:

$$
\int_{-\infty}^{0}(-t)e^{2t}e^{-st}\,dt=\int_0^{\infty}\tau\,e^{-(2-s)\tau}\,d\tau=\frac{1}{(2-s)^2}=\frac{1}{(s-2)^2}
$$

This converges only when $\mathrm{Re}\{2-s\}>0$, that is $\mathrm{Re}\{s\}<2$. So

$$
|t|e^{-2|t|}\ \longleftrightarrow\ \frac{1}{(s+2)^2}+\frac{1}{(s-2)^2}=\frac{2(s^2+4)}{(s^2-4)^2},\qquad -2<\mathrm{Re}\{s\}<2
$$

**Term 2: $-e^{-t}\cos(3t)\,u(t)$.** Use $\cos(\omega_0t)u(t)\leftrightarrow\frac{s}{s^2+\omega_0^2}$, then multiplying by $e^{-t}$ replaces $s$ with $s+1$:

$$
-e^{-t}\cos(3t)\,u(t)\ \longleftrightarrow\ -\frac{s+1}{(s+1)^2+9}=-\frac{s+1}{s^2+2s+10},\qquad \mathrm{Re}\{s\}>-1
$$

Its poles are at $s=-1\pm j3$.

**Term 3: $t^2e^{-4t}u(t)$.** Use $t^ne^{-at}u(t)\leftrightarrow\frac{n!}{(s+a)^{n+1}}$:

$$
t^2e^{-4t}u(t)\ \longleftrightarrow\ \frac{2}{(s+4)^3},\qquad \mathrm{Re}\{s\}>-4
$$

**Step 4: add the terms and intersect the ROCs.**

$$
\{-2<\sigma<2\}\cap\{\sigma>-1\}\cap\{\sigma>-4\}=\{-1<\sigma<2\}
$$

$$
\boxed{X(s)=\frac{1}{(s+2)^2}+\frac{1}{(s-2)^2}-\frac{s+1}{s^2+2s+10}+\frac{2}{(s+4)^3},\qquad -1<\mathrm{Re}\{s\}<2}
$$

**Poles.**

| Pole | Order | From |
|---|---|---|
| $s=-4$ | 3 | $t^2e^{-4t}u(t)$ |
| $s=-2$ | 2 | right half of $\lvert t\rvert e^{-2\lvert t\rvert}$ |
| $s=-1\pm j3$ | 1 each | $e^{-t}\cos 3t\,u(t)$ |
| $s=2$ | 2 | left half of $\lvert t\rvert e^{-2\lvert t\rvert}$ |

The ROC is the vertical strip between the complex pair (on the left) and the double pole at 2 (on the right), with no pole inside. It contains the $j\omega$ axis, so the Fourier transform of $x(t)$ also exists. A strip ROC matches a two-sided signal.
` + fig("p22-6b"),
            },
            {
              part: "c",
              marks: 10,
              topic: "laplace",
              prompt: r`Is it possible for a system to be:

(i) Causal but unstable? *(5)*

(ii) Stable but non-causal? *(5)*

For each case, explain with reasoning based on the Region of Convergence (ROC) and support your answer with an example.`,
              solution: r`Two ROC facts for an LTI system with rational $H(s)$:

- **Causal** $\iff$ the ROC is a right half-plane, to the right of the rightmost pole.
- **Stable** $\iff$ the ROC contains the $j\omega$ axis. On the axis, $|H(j\omega)|$ is bounded only when $\int|h|\,dt$ is finite.

The two conditions are independent, so each can hold without the other.

**(i) Causal but unstable: yes.** Put the rightmost pole in the right half-plane (or on the axis). The causal ROC $\mathrm{Re}\{s\}>\sigma_{\max}$ then lies entirely to the right of the $j\omega$ axis and cannot contain it.

Example:

$$
h(t)=e^{2t}u(t)\ \longleftrightarrow\ H(s)=\frac{1}{s-2},\qquad \mathrm{Re}\{s\}>2
$$

$h=0$ for $t<0$, so it is causal. But $\int_0^\infty e^{2t}dt=\infty$, and the ROC misses $\sigma=0$, so it is unstable.

**(ii) Stable but non-causal: yes.** Let the ROC contain the $j\omega$ axis but not be a right half-plane: a strip, or a left half-plane.

Example:

$$
h(t)=e^{-|t|}=e^{-t}u(t)+e^{t}u(-t)
$$

$$
H(s)=\frac{1}{s+1}-\frac{1}{s-1}=\frac{-2}{s^2-1},\qquad -1<\mathrm{Re}\{s\}<1
$$

The strip contains $\sigma=0$, and $\int e^{-|t|}dt=2<\infty$, so it is stable. A strip is not a right half-plane, and $h(t)\ne0$ for $t<0$, so it is not causal.
` + fig("p22-6c") + r`
**Summary.** Only when a system is **both** causal and stable must every pole lie in the open left half-plane, with the ROC to the right of all of them.`,
            },
          ],
        },

        /* ───────────────────────── Q7 ───────────────────────── */
        {
          no: 7,
          parts: [
            {
              part: "a",
              marks: 15,
              topic: "fft",
              prompt: r`Using the Radix-2 Cooley-Tukey 2D Matrix Formulation, compute the Discrete Fourier Transform of the sequence $x[n]=\{1,2,3,4,9,0,7,8\}$. Follow the steps below for step-by-step calculation:

(i) Arrange the sequence into the standard $2\times4$ column-major matrix, separating even and odd indices. Compute the 4-point DFT along each row. Show the exact complex values of the resulting intermediate matrix $G$.

(ii) Determine the exact rectangular form $(a+jb)$ of the Cooley-Tukey twiddle factors $W_8^{n_1k_2}$, where $n_1\in\{0,1\}$ is the row index and $k_2\in\{0,1,2,3\}$ is the column index. Multiply the intermediate matrix $G$ element-wise by these twiddle factors to produce matrix $H$.

(iii) Compute the 2-point DFT (butterfly operations) down each column of matrix $H$. Read the matrix in row-major order to state the final sequence $X[k]$. Group your final answers neatly into real and imaginary parts.`,
              solution: r`**Why the three steps work.** Write $N=8=2\times4$ with

$$
n=2n_2+n_1,\quad n_1\in\{0,1\},\ n_2\in\{0,1,2,3\}
$$

$$
k=k_2+4k_1,\quad k_2\in\{0,1,2,3\},\ k_1\in\{0,1\}
$$

Then

$$
W_8^{nk}=W_8^{2n_2k_2}\cdot W_8^{8n_2k_1}\cdot W_8^{n_1k_2}\cdot W_8^{4n_1k_1}=W_4^{n_2k_2}\cdot 1\cdot W_8^{n_1k_2}\cdot W_2^{n_1k_1}
$$

so

$$
X[k_2+4k_1]=\sum_{n_1=0}^{1}W_2^{n_1k_1}\Big[W_8^{n_1k_2}\underbrace{\sum_{n_2=0}^{3}x[2n_2+n_1]\,W_4^{n_2k_2}}_{\text{4-point DFT of row } n_1}\Big]
$$

That is: row DFTs, then twiddles, then column DFTs.

**(i) Step 1: the $2\times4$ matrix.** Filling column by column, $x[2n_2+n_1]$ goes to row $n_1$, column $n_2$, so the even samples form row 0 and the odd samples row 1:

| | $n_2=0$ | $n_2=1$ | $n_2=2$ | $n_2=3$ |
|---|---|---|---|---|
| $n_1=0$ (even) | $x[0]=1$ | $x[2]=3$ | $x[4]=9$ | $x[6]=7$ |
| $n_1=1$ (odd) | $x[1]=2$ | $x[3]=4$ | $x[5]=0$ | $x[7]=8$ |

**Step 2: 4-point DFT of each row.** For a row $[a,b,c,d]$, using $W_4=-j$:

$$
\big[\,a+b+c+d,\ \ (a-c)-j(b-d),\ \ a-b+c-d,\ \ (a-c)+j(b-d)\,\big]
$$

Row 0, $[1,3,9,7]$: $a-c=-8$ and $b-d=-4$:

$$
[\,20,\ -8+4j,\ 0,\ -8-4j\,]
$$

Row 1, $[2,4,0,8]$: $a-c=2$ and $b-d=-4$:

$$
[\,14,\ 2+4j,\ -10,\ 2-4j\,]
$$

$$
G=\begin{bmatrix}20 & -8+4j & 0 & -8-4j\\ 14 & 2+4j & -10 & 2-4j\end{bmatrix}
$$

**(ii) Step 3: twiddle factors $W_8^{n_1k_2}$.** Row $n_1=0$ is all ones. Row $n_1=1$ is $W_8^{k_2}$:

| $W_8^{n_1k_2}$ | $k_2=0$ | $k_2=1$ | $k_2=2$ | $k_2=3$ |
|---|---|---|---|---|
| $n_1=0$ | $1$ | $1$ | $1$ | $1$ |
| $n_1=1$ | $1$ | $\frac{\sqrt2}{2}-j\frac{\sqrt2}{2}$ | $-j$ | $-\frac{\sqrt2}{2}-j\frac{\sqrt2}{2}$ |

**Step 4: $H=G\odot W$ (element by element).** Row 0 is unchanged. Row 1:

$$
14\cdot1=14
$$

$$
(2+4j)\cdot\tfrac{\sqrt2}{2}(1-j)=\tfrac{\sqrt2}{2}(2-2j+4j+4)=\tfrac{\sqrt2}{2}(6+2j)=3\sqrt2+j\sqrt2
$$

$$
(-10)(-j)=10j
$$

$$
(2-4j)\cdot\left(-\tfrac{\sqrt2}{2}\right)(1+j)=-\tfrac{\sqrt2}{2}(2+2j-4j+4)=-\tfrac{\sqrt2}{2}(6-2j)=-3\sqrt2+j\sqrt2
$$

$$
H=\begin{bmatrix}20 & -8+4j & 0 & -8-4j\\ 14 & 3\sqrt2+j\sqrt2 & 10j & -3\sqrt2+j\sqrt2\end{bmatrix}
$$

**(iii) Step 5: 2-point DFT down each column.** The top output is $H_0+H_1$, which gives $X[k_2]$. The bottom output is $H_0-H_1$, which gives $X[k_2+4]$:

| column $k_2$ | top: $X[k_2]$ | bottom: $X[k_2+4]$ |
|---|---|---|
| 0 | $20+14=34$ | $20-14=6$ |
| 1 | $(-8+3\sqrt2)+j(4+\sqrt2)$ | $(-8-3\sqrt2)+j(4-\sqrt2)$ |
| 2 | $0+10j=10j$ | $0-10j=-10j$ |
| 3 | $(-8-3\sqrt2)+j(-4+\sqrt2)$ | $(-8+3\sqrt2)+j(-4-\sqrt2)$ |

The final matrix has $X[0..3]$ in row 0 and $X[4..7]$ in row 1, so reading it row by row gives $X[0],X[1],\dots,X[7]$ in order:

| $k$ | $\mathrm{Re}\{X[k]\}$ | $\mathrm{Im}\{X[k]\}$ |
|---|---|---|
| 0 | $34$ | $0$ |
| 1 | $-8+3\sqrt2\approx-3.757$ | $4+\sqrt2\approx5.414$ |
| 2 | $0$ | $10$ |
| 3 | $-8-3\sqrt2\approx-12.243$ | $-4+\sqrt2\approx-2.586$ |
| 4 | $6$ | $0$ |
| 5 | $-8-3\sqrt2\approx-12.243$ | $4-\sqrt2\approx2.586$ |
| 6 | $0$ | $-10$ |
| 7 | $-8+3\sqrt2\approx-3.757$ | $-4-\sqrt2\approx-5.414$ |

**Checks.**

- $X[0]$ is the sum of all samples: $1+2+3+4+9+0+7+8=34$. ✓
- $X[4]$ is the alternating sum: $1-2+3-4+9-0+7-8=6$. ✓
- $X[7]=X^*[1]$, $X[6]=X^*[2]$, $X[5]=X^*[3]$, as they must be for real $x$. ✓`,
            },
            {
              part: "b",
              marks: 10,
              topic: "fft",
              prompt: r`Derive the formulation of an $N$-point Discrete Fourier Transform (DFT) as a linear convolution using the Chirp-Z identity

$$
kn=\frac{n^2}{2}+\frac{k^2}{2}-\frac{(k-n)^2}{2}
$$

to maintain $O(N\log N)$ complexity for prime lengths, and outline the practical implementation of this convolution via Fast Convolution, explaining the requirement of padding $M\ge 2N-1$.`,
              solution: r`**The problem.** Radix-2 FFTs need $N$ to be a power of 2. If $N$ is prime it cannot be split at all, and the direct DFT costs $O(N^2)$. The chirp-z (Bluestein) trick rewrites the DFT as a convolution, and a convolution can be done with power-of-two FFTs of any convenient size.

**Step 1: split the exponent.** With $W=e^{-j2\pi/N}$,

$$
X[k]=\sum_{n=0}^{N-1}x[n]\,W^{kn},\qquad k=0,\dots,N-1
$$

Use the identity $kn=\frac{n^2}{2}+\frac{k^2}{2}-\frac{(k-n)^2}{2}$:

$$
W^{kn}=W^{k^2/2}\;W^{n^2/2}\;W^{-(k-n)^2/2}
$$

$W^{k^2/2}$ does not depend on $n$, so it comes out of the sum:

$$
X[k]=W^{k^2/2}\sum_{n=0}^{N-1}\Big(x[n]\,W^{n^2/2}\Big)\,W^{-(k-n)^2/2}
$$

**Step 2: name the pieces.** Here $W^{m^2/2}=e^{-j\pi m^2/N}$, a "chirp" whose frequency rises linearly with $m$.

$$
a[n]=x[n]\,e^{-j\pi n^2/N},\qquad n=0,\dots,N-1
$$

$$
b[m]=e^{\,j\pi m^2/N},\qquad m=-(N-1),\dots,N-1
$$

Then the sum is exactly a linear convolution evaluated at $k$:

$$
\boxed{X[k]=e^{-j\pi k^2/N}\,\big(a*b\big)[k]=e^{-j\pi k^2/N}\sum_{n=0}^{N-1}a[n]\,b[k-n],\qquad k=0,\dots,N-1}
$$

So the DFT is: chirp multiply, convolve with a chirp, chirp multiply. Both multiplications cost $O(N)$; all the work is in the convolution.

**Step 3: fast convolution.** Compute $a*b$ with FFTs of a power-of-two size $M\ge 2N-1$:

1. **Pick $M$**: the smallest power of 2 with $M\ge 2N-1$. For example, $N=7$ gives $M=16$.
2. **Pad $a$:** $a_M[n]=a[n]$ for $0\le n\le N-1$, and $0$ for $N\le n\le M-1$.
3. **Wrap $b$:** $b_M[m]=b[m]$ for $0\le m\le N-1$; $b_M[m]=b[m-M]$ for $M-N+1\le m\le M-1$ (negative lags stored at the end); $0$ in between.
4. **Transform:** $A=\mathrm{FFT}_M(a_M)$ and $B=\mathrm{FFT}_M(b_M)$. $B$ depends only on $N$, so it can be computed once and reused.
5. **Multiply and invert:** $C[k]=A[k]B[k]$, then $c=\mathrm{IFFT}_M(C)$.
6. **Finish:** $X[k]=e^{-j\pi k^2/N}\,c[k]$ for $k=0,\dots,N-1$. Throw away $c[N],\dots,c[M-1]$.
` + fig("p22-7b") + r`
**Step 4: why $M\ge 2N-1$.** The FFT product gives a **circular** convolution:

$$
c[k]=\sum_{n=0}^{N-1}a[n]\,b_M\big[(k-n)\bmod M\big]
$$

For $k$ and $n$ both in $0,\dots,N-1$, the lag $k-n$ takes every value from $-(N-1)$ to $N-1$: that is $2N-1$ different lags, and each needs its own value of $b$.

- Lags $0,\dots,N-1$ sit in slots $0,\dots,N-1$.
- Lags $-1,\dots,-(N-1)$ wrap round to slots $M-1,\dots,M-N+1$.

These two groups of slots do not collide only if

$$
M-N+1>N-1\iff M\ge 2N-1
$$

With a smaller $M$, a negative lag would land in a slot already holding a positive lag. Circular wrap-around would then mix wrong values of $b$ into $c[k]$, and $X[k]$ would be wrong. With $M\ge2N-1$, circular convolution equals the linear convolution for every output we keep.

**Step 5: cost.** Three FFTs of size $M<4N$ cost $O(M\log M)=O(N\log N)$. The chirp products add $O(N)$. So a prime-length DFT keeps the $O(N\log N)$ cost instead of $O(N^2)$.`,
            },
            {
              part: "c",
              marks: 10,
              topic: "sampling",
              prompt: r`State the Nyquist-Shannon Sampling Theorem and analyze the behavior of the sampled spectrum $X_p(j\omega)$ when the sampling frequency $\omega_s$ both satisfies and violates the Nyquist condition. Illustrate your answer with appropriate spectral sketches, and hence briefly explain why perfect reconstruction of the original signal is not possible once aliasing occurs.`,
              solution: r`**The theorem.** Let $x(t)$ be band-limited, with $X(j\omega)=0$ for $|\omega|>\omega_M$. Then $x(t)$ is uniquely determined by its samples $x(nT)$ if

$$
\omega_s=\frac{2\pi}{T}>2\omega_M
$$

$2\omega_M$ is the Nyquist rate. Then $x(t)$ is recovered exactly by passing the impulse-sampled signal through an ideal low-pass filter of gain $T$ and cutoff $\omega_c$ with $\omega_M<\omega_c<\omega_s-\omega_M$.

**The sampled spectrum.** Sampling multiplies by an impulse train $p(t)=\sum_n\delta(t-nT)$. Its transform is

$$
P(j\omega)=\frac{2\pi}{T}\sum_k\delta(\omega-k\omega_s)
$$

Multiplication in time is convolution in frequency, divided by $2\pi$:

$$
X_p(j\omega)=\frac1{2\pi}X(j\omega)*P(j\omega)=\frac1T\sum_{k=-\infty}^{\infty}X\big(j(\omega-k\omega_s)\big)
$$

So $X_p$ is the original spectrum copied every $\omega_s$ and scaled by $\frac1T$. The copy at $k=0$ covers $[-\omega_M,\omega_M]$, and the next one starts at $\omega_s-\omega_M$.

**Three cases.**

1. **$\omega_s>2\omega_M$ (Nyquist satisfied).** $\omega_s-\omega_M>\omega_M$, so a gap of width $\omega_s-2\omega_M$ separates neighbouring copies. A low-pass filter passes the middle copy alone, and $x(t)$ comes back exactly.
2. **$\omega_s=2\omega_M$ (limit).** The copies touch at $\pm\omega_M$. Only a perfectly sharp filter with cutoff exactly $\omega_M$ would work, so in practice we sample faster than this.
3. **$\omega_s<2\omega_M$ (violated).** The copies overlap on $\omega_s-\omega_M<|\omega|<\omega_M$ and **add**. Frequencies above $\frac{\omega_s}{2}$ fold back to $\omega_s-\omega$ and appear as lower frequencies. This is aliasing.
` + fig("p22-7c") + r`
**Why aliasing cannot be undone.**

- In the overlap band, the filter only sees the sum $\frac1T\big[X(j\omega)+X(j(\omega-\omega_s))\big]$: one known value made of two unknown parts. Infinitely many different spectra give the same sum, so the samples no longer pin down $x(t)$.
- A filter can keep or remove frequencies, but it cannot split two components that occupy the same frequencies. Removing the overlap also removes true content, and keeping it keeps the folded content.
- In the time domain, two different signals give identical samples. Since $\omega_sT=2\pi$,

$$
\cos\big((\omega_s-\omega_0)nT\big)=\cos(2\pi n-\omega_0nT)=\cos(\omega_0nT)
$$

so a tone at $\omega_s-\omega_0$ and a tone at $\omega_0$ are indistinguishable after sampling.

The information is lost at the moment of sampling. The only cure is before sampling: an anti-aliasing low-pass filter that limits $x(t)$ to below $\frac{\omega_s}{2}$, or a higher $\omega_s$.`,
            },
          ],
        },

        /* ───────────────────────── Q8 ───────────────────────── */
        {
          no: 8,
          parts: [
            {
              part: "a",
              marks: 12,
              topic: "z-transform",
              prompt: r`Determine all possible two-sided sequences $x[n]$ that correspond to the following Z-Transform.

$$
X(z)=\frac{1+2z^{-1}-z^{-2}}{1-\frac{11}{6}z^{-1}+z^{-2}-\frac16z^{-3}}
$$

For each sequence, clearly state:

(i) The associated Region of Convergence (ROC)

(ii) The resulting mathematical expression for $x[n]$.`,
              solution: r`**Step 1: find the poles.** Multiply the denominator by $z^3$:

$$
z^3-\tfrac{11}{6}z^2+z-\tfrac16
$$

$z=1$ is a root, since $1-\frac{11}{6}+1-\frac16=0$. Divide it out:

$$
z^3-\tfrac{11}{6}z^2+z-\tfrac16=(z-1)\left(z^2-\tfrac56z+\tfrac16\right)=(z-1)\left(z-\tfrac12\right)\left(z-\tfrac13\right)
$$

So

$$
X(z)=\frac{1+2z^{-1}-z^{-2}}{(1-z^{-1})\left(1-\frac12z^{-1}\right)\left(1-\frac13z^{-1}\right)}
$$

with poles at $z=\frac13,\ \frac12,\ 1$.

The zeros solve $z^2+2z-1=0$, so $z=-1\pm\sqrt2$ ($\approx0.414$ and $-2.414$). They cancel no pole.
` + fig("p22-8a-pz") + r`
**Step 2: partial fractions in $z^{-1}$.** The numerator has lower degree in $z^{-1}$ (2) than the denominator (3), so

$$
X(z)=\frac{A}{1-\frac12z^{-1}}+\frac{B}{1-\frac13z^{-1}}+\frac{C}{1-z^{-1}}
$$

Write $w=z^{-1}$ and $N(w)=1+2w-w^2$. Cover up each factor:

$$
A=\frac{N(2)}{\left(1-\frac23\right)(1-2)}=\frac{1+4-4}{\left(\frac13\right)(-1)}=-3
$$

$$
B=\frac{N(3)}{\left(1-\frac32\right)(1-3)}=\frac{1+6-9}{\left(-\frac12\right)(-2)}=-2
$$

$$
C=\frac{N(1)}{\left(1-\frac12\right)\left(1-\frac13\right)}=\frac{1+2-1}{\frac12\cdot\frac23}=6
$$

Check at $w=0$: $A+B+C=-3-2+6=1=X\big|_{z^{-1}=0}$. ✓

$$
X(z)=\frac{-3}{1-\frac12z^{-1}}+\frac{-2}{1-\frac13z^{-1}}+\frac{6}{1-z^{-1}}
$$

**Step 3: the two inverse pairs.** For each pole $p$, the ROC decides which way the term goes:

$$
\frac{1}{1-pz^{-1}}\ \longleftrightarrow\ \begin{cases}p^n\,u[n], & |z|>|p|\ \text{(ROC outside the pole: right-sided)}\\[3pt] -p^n\,u[-n-1], & |z|<|p|\ \text{(ROC inside the pole: left-sided)}\end{cases}
$$

**Step 4: the possible ROCs.** An ROC is a ring with no pole inside. With poles at radii $\frac13,\frac12,1$ there are exactly four:
` + fig("p22-8a-roc") + r`
**ROC 1: $|z|>1$, right-sided (causal).** All three poles are inside.

$$
x[n]=\left[-3\left(\tfrac12\right)^n-2\left(\tfrac13\right)^n+6\right]u[n]
$$

**ROC 2: $\frac12<|z|<1$, two-sided.** The poles $\frac13$ and $\frac12$ are inside; the pole $1$ is outside.

$$
x[n]=-3\left(\tfrac12\right)^nu[n]-2\left(\tfrac13\right)^nu[n]-6\,u[-n-1]
$$

**ROC 3: $\frac13<|z|<\frac12$, two-sided.** Only the pole $\frac13$ is inside.

$$
x[n]=-2\left(\tfrac13\right)^nu[n]+3\left(\tfrac12\right)^nu[-n-1]-6\,u[-n-1]
$$

**ROC 4: $|z|<\frac13$, left-sided (anti-causal).** All poles are outside.

$$
x[n]=\left[3\left(\tfrac12\right)^n+2\left(\tfrac13\right)^n-6\right]u[-n-1]
$$

| ROC | Type | $x[n]$ |
|---|---|---|
| $\lvert z\rvert>1$ | right-sided | $\left[-3(\frac12)^n-2(\frac13)^n+6\right]u[n]$ |
| $\frac12<\lvert z\rvert<1$ | two-sided | $-3(\frac12)^nu[n]-2(\frac13)^nu[n]-6u[-n-1]$ |
| $\frac13<\lvert z\rvert<\frac12$ | two-sided | $-2(\frac13)^nu[n]+3(\frac12)^nu[-n-1]-6u[-n-1]$ |
| $\lvert z\rvert<\frac13$ | left-sided | $\left[3(\frac12)^n+2(\frac13)^n-6\right]u[-n-1]$ |

The sequences that are two-sided in the strict sense are ROC 2 and ROC 3; ROCs 1 and 4 give the one-sided extremes.

**Check of ROC 1.** Running the difference equation from $X(z)$ gives $x[0]=1$, $x[1]=\frac{23}{6}$. The formula gives $-3-2+6=1$ and $-\frac32-\frac23+6=\frac{23}{6}$. ✓

**Note.** The pole at $z=1$ lies on the unit circle, so no ROC contains the unit circle. None of these sequences is absolutely summable: none has a DTFT in the ordinary sense, and none is a stable impulse response.`,
            },
            {
              part: "b",
              marks: 8,
              topic: "z-transform",
              prompt: r`Figure 2 shows the pole-zero plot of the Z-transform $Y(z)$ corresponding to a discrete-time sequence $y[n]$. Determine what can be inferred about the associated region of convergence (ROC) from each of the following independent statements:
` + fig("p22-8b-fig") + r`
(i) $y[n]$ is right-sided.

(ii) The Fourier Transform of $y[n]$ converges.

(iii) The Fourier Transform of $y[n]$ does not converge.

(iv) $y[n]$ is left-sided.`,
              solution: r`The poles are at $z=\frac13$, $\frac23$ and $2$. The ROC is a ring bounded by poles with none inside, so the only candidates are

$$
|z|<\tfrac13,\qquad \tfrac13<|z|<\tfrac23,\qquad \tfrac23<|z|<2,\qquad |z|>2
$$

Two rules decide between them:

- **Sidedness:** a right-sided sequence has its ROC outside the outermost pole; a left-sided one has it inside the innermost pole; a two-sided one gets a ring in between.
- **Fourier transform:** the DTFT is $Y(z)$ on the unit circle $|z|=1$, so it converges exactly when the ROC contains the unit circle.

**(i) Right-sided:**

$$
\boxed{|z|>2}
$$

It lies outside the outermost pole. The unit circle is not in it, so this $y[n]$ has no DTFT.

**(ii) Fourier transform converges:** the ROC must contain $|z|=1$. Only one ring does:

$$
\boxed{\tfrac23<|z|<2}
$$

So $y[n]$ must be two-sided.

**(iii) Fourier transform does not converge:** the ROC must not contain $|z|=1$. That leaves three possibilities, and the statement cannot single one out:

$$
|z|>2,\qquad \tfrac13<|z|<\tfrac23,\qquad |z|<\tfrac13
$$

**(iv) Left-sided:**

$$
\boxed{|z|<\tfrac13}
$$

It lies inside the innermost pole. It may exclude $z=0$ if $Y$ has a pole there; Figure 2 shows none.
` + fig("p22-8b"),
            },
            {
              part: "c",
              marks: 10,
              topic: "z-transform",
              prompt: r`Determine the Z-Transform for the following sequence and sketch the pole-zero plot.

$$
x[n]=|n|\left(\frac12\right)^{|n|}
$$`,
              solution: r`**Step 1: split into a right-sided and a left-sided part.** At $n=0$ the factor $|n|$ makes $x[0]=0$, so

$$
x[n]=\underbrace{n\left(\tfrac12\right)^nu[n]}_{n\ge0}+\underbrace{(-n)\,2^{\,n}\,u[-n-1]}_{n<0}
$$

For $n<0$: $|n|=-n$ and $\left(\frac12\right)^{|n|}=\left(\frac12\right)^{-n}=2^n$.

**Step 2: the right-sided part.** Use the pair $n a^n u[n]\leftrightarrow\frac{az^{-1}}{(1-az^{-1})^2}$, $|z|>|a|$, with $a=\frac12$:

$$
n\left(\tfrac12\right)^nu[n]\ \longleftrightarrow\ \frac{\frac12z^{-1}}{\left(1-\frac12z^{-1}\right)^2}=\frac{z/2}{\left(z-\frac12\right)^2}=\frac{2z}{(2z-1)^2},\qquad |z|>\tfrac12
$$

**Step 3: the left-sided part.** Sum it directly with $m=-n=1,2,\dots$:

$$
\sum_{n=-\infty}^{-1}(-n)\,2^n z^{-n}=\sum_{m=1}^{\infty}m\left(\frac z2\right)^m
$$

Use $\sum_{m\ge1}m r^m=\frac{r}{(1-r)^2}$ for $|r|<1$, with $r=\frac z2$:

$$
\frac{z/2}{\left(1-\frac z2\right)^2}=\frac{2z}{(2-z)^2}=\frac{2z}{(z-2)^2},\qquad |z|<2
$$

**Step 4: add, and intersect the ROCs.**

$$
X(z)=\frac{2z}{(2z-1)^2}+\frac{2z}{(z-2)^2},\qquad \tfrac12<|z|<2
$$

Over a common denominator, using $(z-2)^2+(2z-1)^2=5z^2-8z+5$:

$$
\boxed{X(z)=\frac{2z\,(5z^2-8z+5)}{(2z-1)^2(z-2)^2},\qquad \tfrac12<|z|<2}
$$

**Step 5: poles and zeros.**

- Poles: $z=\frac12$ (double) and $z=2$ (double).
- Zeros: $z=0$, and the roots of $5z^2-8z+5=0$:

$$
z=\frac{8\pm\sqrt{64-100}}{10}=0.8\pm j0.6
$$

Since $0.8^2+0.6^2=1$, these two zeros sit **on the unit circle**. The denominator has degree 4 and the numerator degree 3, so there is one more zero at $z=\infty$.

The ROC is the ring between the double poles. It contains the unit circle, so the DTFT exists. It is zero at $\omega=\pm\cos^{-1}0.8\approx\pm0.6435$ rad because of the zeros there.

**Check at $z=1$.** The formula gives

$$
X(1)=\frac{2(5-8+5)}{(1)(1)}=4
$$

and directly

$$
\sum_n|n|\left(\tfrac12\right)^{|n|}=2\sum_{m\ge1}\frac{m}{2^m}=2\cdot2=4
$$

✓
` + fig("p22-8c"),
            },
            {
              part: "d",
              marks: 5,
              topic: "z-transform",
              prompt: r`Differentiate between the Laplace Transform and the Z-Transform, and briefly justify why the Z-Transform is preferred for discrete-time systems.`,
              solution: r`| | Laplace transform | Z-transform |
|---|---|---|
| Signals | continuous-time $x(t)$ | discrete-time $x[n]$ |
| Definition | $X(s)=\int x(t)e^{-st}dt$ | $X(z)=\sum_n x[n]z^{-n}$ |
| Variable | $s=\sigma+j\omega$ (rectangular) | $z=re^{j\Omega}$ (polar) |
| Shape of ROC | vertical strips / half-planes | rings / discs / outside of a circle |
| Fourier transform on | the $j\omega$ axis | the unit circle $\lvert z\rvert=1$ |
| Causal and stable when | all poles in the left half-plane | all poles inside the unit circle |
| Basic operation | differentiation: multiply by $s$ | one-sample delay: multiply by $z^{-1}$ |
| Turns into algebra | differential equations | difference equations |

**The link.** For samples $x(nT)$, the Laplace transform of the impulse-sampled signal is $\sum_n x(nT)e^{-snT}$. Putting $z=e^{sT}$ turns this into the Z-transform. This maps the left half-plane into the unit disc and the $j\omega$ axis onto the unit circle.

**Why the Z-transform for discrete-time systems.**

1. A discrete signal only has values at integer $n$. Its Laplace transform is a function of $e^{sT}$: periodic in $\omega$ with period $\frac{2\pi}{T}$, with every pole repeated infinitely often up and down the $s$-plane. The substitution $z=e^{sT}$ folds all of that into a **rational function of $z$ with finitely many poles**, which is easy to factor, invert and analyse.
2. Delays are the building block of discrete systems: $x[n-1]\leftrightarrow z^{-1}X(z)$. Difference equations become polynomial ratios in $z^{-1}$, and each $z^{-1}$ is literally one delay register in hardware or software.
3. Stability and causality are read straight off the plot: poles inside the unit circle, with the ROC outside the outermost pole.`,
            },
          ],
        },
      ],
    },
  ],
}
