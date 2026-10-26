import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const elementaryBook: BookProblem[] = [
  {
    id: "bk-tan-3.5",
    topic: "elementary-signals",
    book: "Tan",
    ref: "Problem 3.5",
    prompt: r`Sketch the following sequences:

(a) $x(n)=3\delta(n+2)-0.5\delta(n)+5\delta(n-1)-4\delta(n-5)$

(b) $x(n)=\delta(n+1)-2\delta(n-1)+5\delta(n-4)$`,
    solution: r`$\delta(n-n_0)$ is 1 at $n=n_0$ and 0 everywhere else, so $c\,\delta(n-n_0)$ is a single stem of height $c$ at $n=n_0$. Watch the sign inside: $\delta(n+2)$ sits at $n=-2$.

**(a)** Stems of height $3$ at $n=-2$, $-0.5$ at $n=0$, $5$ at $n=1$ and $-4$ at $n=5$.

**(b)** Stems of height $1$ at $n=-1$, $-2$ at $n=1$ and $5$ at $n=4$.
` + fig("bk-e-tan35"),
  },
  {
    id: "bk-tan-3.6",
    topic: "elementary-signals",
    book: "Tan",
    ref: "Problem 3.6",
    prompt: r`Given the digital signals $x(n)$ in Figs. 3.24 and 3.25, write an expression for each digital signal using the unit-impulse sequence and its shifted sequences.
` + fig("bk-e-tan36"),
    solution: r`This is the reverse of the previous problem. Any sequence is a sum of scaled, shifted impulses, **one term per non-zero sample**:

$$x(n)=\sum_k x(k)\,\delta(n-k).$$

**Fig. 3.24.** The non-zero samples are $x(0)=3$, $x(1)=1$, $x(2)=2$, $x(3)=1$ and $x(5)=1$ ($x(4)=0$ contributes nothing):

$$x(n)=3\delta(n)+\delta(n-1)+2\delta(n-2)+\delta(n-3)+\delta(n-5).$$

**Fig. 3.25.** The non-zero samples are $x(1)=1$, $x(2)=-1$, $x(4)=1$ and $x(5)=-1$:

$$x(n)=\delta(n-1)-\delta(n-2)+\delta(n-4)-\delta(n-5).$$

This "sum of impulses" view is the first step towards the convolution sum: if a system turns $\delta(n)$ into $h(n)$, it turns each term $x(k)\delta(n-k)$ into $x(k)h(n-k)$.`,
  },
  {
    id: "bk-tan-3.2",
    topic: "elementary-signals",
    book: "Tan",
    ref: "Problem 3.2",
    prompt: r`Calculate the first eight sample values and sketch each of the following sequences:

(a) $x(n)=0.5^n u(n)$  (b) $x(n)=5\sin(0.2\pi n)u(n)$  (c) $x(n)=5\cos(0.1\pi n+30^\circ)u(n)$  (d) $x(n)=5(0.75)^n\sin(0.1\pi n)u(n)$`,
    solution: r`$u(n)$ makes every sequence zero for $n<0$, so we only evaluate $n=0,1,\dots,7$. In (c), convert the phase so the units agree: $0.1\pi n$ rad $=18^\circ n$.

| $n$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| (a) | 1 | 0.5 | 0.25 | 0.125 | 0.0625 | 0.0313 | 0.0156 | 0.0078 |
| (b) | 0 | 2.9389 | 4.7553 | 4.7553 | 2.9389 | 0 | $-2.9389$ | $-4.7553$ |
| (c) | 4.3301 | 3.3457 | 2.0337 | 0.5226 | $-1.0396$ | $-2.5$ | $-3.7157$ | $-4.5677$ |
| (d) | 0 | 1.1588 | 1.6531 | 1.7065 | 1.5046 | 1.1865 | 0.8463 | 0.5400 |

Sample calculations:

- (b), $n=1$: $5\sin(0.2\pi)=5\sin36^\circ=5(0.5878)=2.9389$.
- (c), $n=1$: $5\cos(18^\circ+30^\circ)=5\cos48^\circ=3.3457$.
- (d), $n=3$: $5(0.75)^3\sin(54^\circ)=5(0.421875)(0.8090)=1.7065$.

What to notice:

- In (b), $\Omega_0=0.2\pi$, so one cycle takes $2\pi/0.2\pi=10$ samples. The sequence is zero again at $n=5$, half a cycle.
- In (c), $\Omega_0=0.1\pi$ gives a cycle of 20 samples, so eight samples cover less than half a cycle.
- In (d), the sine would rise for 5 samples, but the factor $0.75^n$ pulls it down, so the peak comes early, at $n=3$.
` + fig("bk-e-tan32"),
  },
  {
    id: "bk-opp-1.12",
    topic: "elementary-signals",
    book: "Oppenheim",
    ref: "Problem 1.12",
    prompt: r`Consider the discrete-time signal

$$x[n]=1-\sum_{k=3}^{\infty}\delta[n-1-k].$$

Determine the values of the integers $M$ and $n_0$ so that $x[n]$ may be expressed as $x[n]=u[Mn-n_0]$.`,
    solution: r`The sum places an impulse at $n=1+k$ for $k=3,4,5,\dots$, that is at $n=4,5,6,\dots$. Subtracting them from the constant 1 gives

$$x[n]=\begin{cases}1,&n\le3\\0,&n\ge4.\end{cases}$$
` + fig("bk-e-112") + r`
A sequence that is 1 up to some point and 0 after it is a **reversed step**. $u[m]=1$ exactly when $m\ge0$, so we need an argument that is $\ge0$ exactly when $n\le3$. The choice $3-n$ works:

$$x[n]=u[3-n]=u[-n+3].$$

Matching with $u[Mn-n_0]$ gives $M=-1$ and $n_0=-3$.`,
  },
  {
    id: "bk-opp-1.13",
    topic: "elementary-signals",
    book: "Oppenheim",
    ref: "Problem 1.13",
    prompt: r`Consider the continuous-time signal $x(t)=\delta(t+2)-\delta(t-2)$. Calculate the value of $E_\infty$ for the signal

$$y(t)=\int_{-\infty}^{t}x(\tau)\,d\tau.$$`,
    solution: r`The running integral of an impulse is a step: $\int_{-\infty}^{t}\delta(\tau-t_0)\,d\tau=u(t-t_0)$. So

$$y(t)=u(t+2)-u(t-2)=\begin{cases}1,&-2<t<2\\0,&\text{otherwise.}\end{cases}$$

In words, the area collected so far becomes 1 when we pass $t=-2$ and returns to 0 when we pass $t=2$.
` + fig("bk-e-113") + r`
The energy is

$$E_\infty=\int_{-\infty}^{\infty}|y(t)|^2dt=\int_{-2}^{2}1\,dt=4.$$`,
  },
  {
    id: "bk-opp-1.14",
    topic: "elementary-signals",
    book: "Oppenheim",
    ref: "Problem 1.14",
    prompt: r`Consider a periodic signal with period $T=2$:

$$x(t)=\begin{cases}1,&0\le t\le1\\-2,&1<t<2.\end{cases}$$

The derivative of this signal is related to the impulse train $g(t)=\sum_{k=-\infty}^{\infty}\delta(t-2k)$, also of period 2. It can be shown that

$$\frac{dx(t)}{dt}=A_1g(t-t_1)+A_2g(t-t_2).$$

Determine the values of $A_1$, $t_1$, $A_2$ and $t_2$.
` + fig("bk-e-114"),
    solution: r`$x(t)$ is flat between its jumps, so its derivative is zero there. At a jump of size $J$ (new value minus old), the derivative contains $J\,\delta(t-t_{\text{jump}})$, because $\frac{d}{dt}u(t)=\delta(t)$.

Within one period:

- At $t=0$ the signal jumps from $-2$ to $1$: $J=+3$.
- At $t=1$ it jumps from $1$ to $-2$: $J=-3$.

These repeat every 2 seconds. The impulses at $t=0,\pm2,\pm4,\dots$ form $3g(t)$, and those at $t=1,1\pm2,\dots$ form $-3g(t-1)$:

$$\frac{dx}{dt}=3g(t)-3g(t-1).$$

So $A_1=3$, $t_1=0$, $A_2=-3$ and $t_2=1$.
` + fig("bk-e-114-sol") + r`
Check: over one period the impulse areas add to $3-3=0$, as they must for a periodic signal, which returns to its starting value.`,
  },
  {
    id: "bk-opp-1.8",
    topic: "elementary-signals",
    book: "Oppenheim",
    ref: "Problem 1.8",
    prompt: r`Express the real part of each of the following signals in the form $Ae^{-at}\cos(\omega t+\phi)$, where $A$, $a$, $\omega$ and $\phi$ are real numbers with $A>0$ and $-\pi<\phi\le\pi$:

(a) $x_1(t)=-2$  (b) $x_2(t)=\sqrt2\,e^{j\pi/4}\cos(3t+2\pi)$  (c) $x_3(t)=e^{-t}\sin(3t+\pi)$  (d) $x_4(t)=je^{(-2+j100)t}$`,
    solution: r`Two identities do all the work:
- a minus sign is a phase of $\pi$: $-\cos\theta=\cos(\theta+\pi)$;
- a sine is a shifted cosine: $\sin\theta=\cos\left(\theta-\frac\pi2\right)$, so $-\sin\theta=\cos\left(\theta+\frac\pi2\right)$.

**(a)** $-2=2\cos(0\cdot t+\pi)$, so $A=2$, $a=0$, $\omega=0$, $\phi=\pi$. We need $A>0$, so the minus sign goes into the phase.

**(b)** $\cos(3t+2\pi)=\cos3t$ is real. So the real part is

$$\sqrt2\cos\left(\tfrac\pi4\right)\cos3t=\sqrt2\cdot\tfrac{1}{\sqrt2}\cos3t=\cos3t.$$

$A=1$, $a=0$, $\omega=3$, $\phi=0$.

**(c)** $\sin(3t+\pi)=-\sin3t=\cos\left(3t+\frac\pi2\right)$, so

$$x_3(t)=e^{-t}\cos\left(3t+\tfrac\pi2\right),$$

with $A=1$, $a=1$, $\omega=3$, $\phi=\frac\pi2$.
` + fig("bk-e-18c") + r`
**(d)** Separate the decaying part from the rotating part:

$$x_4(t)=e^{-2t}\cdot je^{j100t}=e^{-2t}\big(j\cos100t-\sin100t\big).$$

The real part is

$$-e^{-2t}\sin100t=e^{-2t}\cos\left(100t+\tfrac\pi2\right),$$

so $A=1$, $a=2$, $\omega=100$, $\phi=\frac\pi2$. The factor $j=e^{j\pi/2}$ simply adds $\frac\pi2$ to the phase.`,
  },
  {
    id: "bk-opp-1.9",
    topic: "elementary-signals",
    book: "Oppenheim",
    ref: "Problem 1.9",
    prompt: r`Determine whether or not each of the following signals is periodic. If a signal is periodic, specify its fundamental period.

(a) $x_1(t)=je^{j10t}$  (b) $x_2(t)=e^{(-1+j)t}$  (c) $x_3[n]=e^{j7\pi n}$  (d) $x_4[n]=3e^{j3\pi(n+1/2)/5}$  (e) $x_5[n]=3e^{j3(n+1/2)/5}$`,
    solution: r`The two time domains follow different rules:
- **Continuous time:** $e^{j\omega_0t}$ is always periodic, with $T=\dfrac{2\pi}{|\omega_0|}$.
- **Discrete time:** $e^{j\Omega_0n}$ is periodic only if $\dfrac{2\pi}{\Omega_0}$ is a ratio of integers. Then the fundamental period is the smallest integer $N$ with $\Omega_0N=2\pi m$ for some integer $m$.

Constant factors and constant phase shifts, such as $j$, 3 or $e^{j3\pi/10}$, do not affect periodicity.

**(a)** $\omega_0=10$. Periodic with $T=\frac{2\pi}{10}=\frac\pi5$.

**(b)** $e^{(-1+j)t}=e^{-t}e^{jt}$. The envelope $e^{-t}$ decays, so the signal never repeats. **Not periodic.**

**(c)** $e^{j7\pi n}=\left(e^{j\pi}\right)^{7n}=(-1)^{7n}=(-1)^n$. Periodic with $N=2$. Formally, $\frac{2\pi}{7\pi}=\frac27$, so $N=2$ with $m=7$.

**(d)** $\Omega_0=\frac{3\pi}5$, so $\frac{2\pi}{\Omega_0}=\frac{10}3$, a ratio of integers. The smallest $N$ with $\frac{3\pi}5N=2\pi m$ is $N=10$ (with $m=3$). **Periodic, $N=10$.**

**(e)** $\Omega_0=\frac35$, so $\frac{2\pi}{\Omega_0}=\frac{10\pi}3$, which is irrational. No integer $N$ works. **Not periodic.**

Parts (d) and (e) differ only by a factor of $\pi$ in the frequency, and that is exactly what decides periodicity in discrete time.`,
  },
  {
    id: "bk-opp-1.10",
    topic: "elementary-signals",
    book: "Oppenheim",
    ref: "Problem 1.10",
    prompt: r`Determine the fundamental period of the signal $x(t)=2\cos(10t+1)-\sin(4t-1)$.`,
    solution: r`Find each term's period, then the smallest time that is a whole number of periods of **both**:

- $2\cos(10t+1)$: $T_1=\frac{2\pi}{10}=\frac\pi5$.
- $\sin(4t-1)$: $T_2=\frac{2\pi}4=\frac\pi2$.

We need $T=kT_1=mT_2$ with integers $k,m$:

$$k\frac\pi5=m\frac\pi2\;\Rightarrow\;\frac km=\frac52.$$

The smallest choice is $k=5$, $m=2$, so $T=5\cdot\frac\pi5=\pi$.

Equivalently, the fundamental frequency is the greatest common divisor of 10 and 4, which is $\omega_0=2$, so $T=\frac{2\pi}{2}=\pi$. The phase constants $+1$ and $-1$ do not matter.`,
  },
  {
    id: "bk-opp-1.26",
    topic: "elementary-signals",
    book: "Oppenheim",
    ref: "Problem 1.26",
    prompt: r`Determine whether or not each of the following discrete-time signals is periodic. If the signal is periodic, determine its fundamental period.

(a) $x[n]=\sin\left(\frac{6\pi}7n+1\right)$  (b) $x[n]=\cos\left(\frac n8-\pi\right)$  (c) $x[n]=\cos\left(\frac\pi8n^2\right)$  (d) $x[n]=\cos\left(\frac\pi2n\right)\cos\left(\frac\pi4n\right)$  (e) $x[n]=2\cos\left(\frac\pi4n\right)+\sin\left(\frac\pi8n\right)-2\cos\left(\frac\pi2n+\frac\pi6\right)$`,
    solution: r`**(a)** $\Omega_0=\frac{6\pi}7$. The smallest $N$ with $\frac{6\pi}{7}N=2\pi m$ is $N=7$ (with $m=3$). **Periodic, $N=7$.**

**(b)** $\Omega_0=\frac18$, so $\frac{2\pi}{\Omega_0}=16\pi$, which is irrational. **Not periodic.**

**(c)** This is not a sinusoid in $n$, so test the definition directly. We need $\cos\left(\frac\pi8(n+N)^2\right)=\cos\left(\frac\pi8n^2\right)$ for every $n$. It is enough that the angles differ by a multiple of $2\pi$:

$$\frac\pi8\big[(n+N)^2-n^2\big]=\frac\pi8\big(2nN+N^2\big)=2\pi m\iff 2nN+N^2\text{ is a multiple of }16.$$

This must hold for every $n$:
- $n=0$ requires $N^2$ to be a multiple of 16, so $N$ must be a multiple of 4.
- $n=1$ then requires $2N$ to be a multiple of 16, so $N$ must be a multiple of 8.

$N=8$ works for all $n$: $16n+64$ is a multiple of 16. **Periodic, $N=8$.**
` + fig("bk-e-126c") + r`
**(d)** Use the product-to-sum identity:

$$\cos\left(\tfrac\pi2n\right)\cos\left(\tfrac\pi4n\right)=\tfrac12\cos\left(\tfrac{3\pi}4n\right)+\tfrac12\cos\left(\tfrac\pi4n\right).$$

The periods are 8 (since $\frac{3\pi}4\cdot8=6\pi$) and 8. **Periodic, $N=8$.**

**(e)** The three terms have periods $\frac{2\pi}{\pi/4}=8$, $\frac{2\pi}{\pi/8}=16$ and $\frac{2\pi}{\pi/2}=4$. Their least common multiple is 16. **Periodic, $N=16$.**`,
  },
  {
    id: "bk-opp-1.33",
    topic: "elementary-signals",
    book: "Oppenheim",
    ref: "Problem 1.33",
    prompt: r`Let $x[n]$ be a discrete-time signal, and let

$$y_1[n]=x[2n],\qquad y_2[n]=\begin{cases}x[n/2],&n\text{ even}\\0,&n\text{ odd.}\end{cases}$$

For each statement, decide whether it is true. If so, relate the fundamental periods; if not, give a counterexample.

(1) If $x[n]$ is periodic, then $y_1[n]$ is periodic.
(2) If $y_1[n]$ is periodic, then $x[n]$ is periodic.
(3) If $x[n]$ is periodic, then $y_2[n]$ is periodic.
(4) If $y_2[n]$ is periodic, then $x[n]$ is periodic.`,
    solution: r`Let $N$ be the fundamental period of $x[n]$.

**(1) True.** $y_1[n+N]=x[2n+2N]=x[2n]=y_1[n]$, so $N$ is a period of $y_1$. If $N$ is even, $N/2$ already works: $y_1[n+N/2]=x[2n+N]=x[2n]$. So the fundamental period of $y_1$ is $N/2$ if $N$ is even, and $N$ if $N$ is odd.

**(2) False.** $y_1$ only looks at the even-indexed samples of $x$. The odd-indexed ones can be anything. Counterexample:

$$x[n]=\begin{cases}1,&n\text{ even}\\\left(\tfrac12\right)^{n},&n\text{ odd.}\end{cases}$$

Here $y_1[n]=x[2n]=1$ is constant and so periodic, but $x$ is not periodic.

**(3) True.** $y_2$ is $x$ with a zero inserted after every sample. Shifting $y_2$ by $2N$ shifts the original samples by $N$:

$$y_2[n+2N]=x[n/2+N]=x[n/2]\quad(n\text{ even}),$$

and odd positions stay zero. The fundamental period of $y_2$ is $2N$.

**(4) True.** No information is lost here, because $x[n]=y_2[2n]$. If $y_2$ has period $N_2$, then $x[n+N_2]=y_2[2n+2N_2]=y_2[2n]=x[n]$. Unless $x$ is identically zero, $N_2$ is even (it is $2N$ by part (3)), and the fundamental period of $x$ is $N_2/2$.

**The lesson:** in continuous time, speeding up and slowing down are both reversible (see Problem 1.32 in the previous topic). In discrete time, $x[2n]$ discards samples, which is why statement (2) fails.`,
  },
]
