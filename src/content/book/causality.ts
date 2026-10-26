import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const causalityBook: BookProblem[] = [
  {
    id: "bk-tan-3.14",
    topic: "causality-stability",
    book: "Tan",
    ref: "Problems 3.14–3.15",
    prompt: r`Determine the causality of each of the following linear systems:

(a) $y(n)=0.5x(n)+100x(n-2)-20x(n-10)$

(b) $y(n)=x(n+4)+0.5x(n)-2x(n-2)$

(c) $y(n)=0.5x(n)+20x(n-2)-0.1y(n-1)$

(d) $y(n)=x(n+2)-0.4y(n-1)$

(e) $y(n)=x(n-1)+0.5y(n+2)$`,
    solution: r`A system is **causal** if computing $y(n)$ needs only the current input $x(n)$, past inputs $x(n-1),x(n-2),\dots$, and past outputs $y(n-1),y(n-2),\dots$. Anything with a **positive** shift, such as $x(n+\dots)$ or $y(n+\dots)$, looks into the future.

| system | future terms? | verdict |
|---|---|---|
| (a) | none: $x(n)$, $x(n-2)$, $x(n-10)$ | **causal** |
| (b) | $x(n+4)$ | **non-causal** |
| (c) | none: $x(n)$, $x(n-2)$, $y(n-1)$ | **causal** |
| (d) | $x(n+2)$ | **non-causal** |
| (e) | $y(n+2)$ | **non-causal** |

In (e), to produce $y(n)$ now, the equation needs the output two steps ahead, which does not exist yet. A real-time processor cannot run it as written.

The delays themselves (10 samples in (a)) do not matter. A long memory is fine; only the future is forbidden.`,
  },
  {
    id: "bk-tan-3.28",
    topic: "causality-stability",
    book: "Tan",
    ref: "Problems 3.28–3.29",
    prompt: r`Determine the stability of each of the following linear systems:

(a) $y(n)=\sum_{k=0}^{\infty}0.75^k\,x(n-k)$  (b) $y(n)=\sum_{k=0}^{\infty}2^k\,x(n-k)$

(c) $y(n)=\sum_{k=0}^{\infty}(-1.5)^k\,x(n-k)$  (d) $y(n)=\sum_{k=0}^{\infty}(-0.5)^k\,x(n-k)$`,
    solution: r`Each system is already written as a convolution sum $y(n)=\sum_kh(k)x(n-k)$, so the impulse response can be read off: $h(k)=a^ku(k)$.

**BIBO stability test:** an LTI system is stable exactly when

$$S=\sum_{k=-\infty}^{\infty}|h(k)|<\infty.$$

For $h(k)=a^ku(k)$, $S=\sum_{k\ge0}|a|^k$, a geometric series. It converges to $\frac{1}{1-|a|}$ when $|a|<1$ and diverges when $|a|\ge1$.

| | $h(k)$ | $S=\sum\vert h(k)\vert $ | verdict |
|---|---|---|---|
| (a) | $0.75^k$ | $\frac1{1-0.75}=4$ | **stable** |
| (b) | $2^k$ | $1+2+4+\dots=\infty$ | **unstable** |
| (c) | $(-1.5)^k$ | $\sum1.5^k=\infty$ | **unstable** |
| (d) | $(-0.5)^k$ | $\frac1{1-0.5}=2$ | **stable** |
` + fig("bk-c-tan328") + r`
Taking the absolute value matters. In (c) the samples alternate in sign, so their plain sum might look as if it could cancel, but the test uses $|h(k)|$. A bounded input such as $x(n)=(-1)^n$ lines up with every sign of $h$ and drives the output to infinity.`,
  },
  {
    id: "bk-tan-3.30",
    topic: "causality-stability",
    book: "Tan",
    ref: "Problem 3.30",
    prompt: r`For each of the following discrete-time systems, determine whether the system is (1) linear or nonlinear; (2) time invariant or time varying; (3) causal or noncausal; and (4) stable or unstable.

(a) $y(n)=x(-n+3)$  (b) $y(n)=x(n-1)+0.5y(n-2)$  (c) $y(n)=nx(n-1)+x(n)$  (d) $y(n)=|x(n)|$`,
    solution: r`**(a) $y(n)=x(-n+3)$**
- **Linear**: scaling or adding inputs does the same to the outputs.
- **Time varying**: delaying the input by $m$ gives $x(-n+3-m)$, but the delayed output is $y(n-m)=x(-(n-m)+3)=x(-n+3+m)$. They differ, because a reversal turns a delay into an advance.
- **Non-causal**: $y(0)=x(3)$ needs a future sample.
- **Stable**: if $|x|\le B$ then $|y|\le B$.

**(b) $y(n)=x(n-1)+0.5y(n-2)$**
- **Linear** and **time invariant**: a constant-coefficient difference equation starting from rest.
- **Causal**: it uses only $x(n-1)$ and $y(n-2)$.
- **Stable**: run the recursion with $x=\delta$ to get $h(1)=1$, $h(3)=0.5$, $h(5)=0.25$, and so on, so $\sum|h|=1+0.5+0.25+\dots=2<\infty$.

**(c) $y(n)=nx(n-1)+x(n)$**
- **Linear**.
- **Time varying**: the coefficient $n$ depends on time.
- **Causal**.
- **Unstable**: $x(n)=u(n)$ is bounded, but $y(n)=n+1$ for $n\ge1$ grows without limit.

**(d) $y(n)=|x(n)|$**
- **Nonlinear**: the input $-x$ gives $|x|$, not $-|x|$.
- **Time invariant**, **causal** (it is memoryless) and **stable**: $|y|=|x|\le B$.

| | linear | time inv. | causal | stable |
|---|---|---|---|---|
| (a) | ✓ | ✗ | ✗ | ✓ |
| (b) | ✓ | ✓ | ✓ | ✓ |
| (c) | ✓ | ✗ | ✓ | ✗ |
| (d) | ✗ | ✓ | ✓ | ✓ |`,
  },
  {
    id: "bk-opp-1.17",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problem 1.17",
    prompt: r`Consider a continuous-time system with input $x(t)$ and output $y(t)$ related by

$$y(t)=x(\sin t).$$

(a) Is this system causal? (b) Is this system linear?`,
    solution: r`**(a) Not causal.** The output at time $t$ uses the input at time $\sin t$. Causality needs $\sin t\le t$ for **every** $t$. That holds for $t\ge0$, but fails for negative $t$. For example, at $t=-\pi$:

$$y(-\pi)=x\big(\sin(-\pi)\big)=x(0),$$

and $0$ lies in the future of $-\pi$.
` + fig("bk-c-117") + r`
**(b) Linear.** Let $x_3=ax_1+bx_2$. Then

$$y_3(t)=x_3(\sin t)=ax_1(\sin t)+bx_2(\sin t)=ay_1(t)+by_2(t).$$

The system only changes *where* the input is read, never *how* the value is used. A system of the form $y(t)=x(f(t))$ is always linear, whatever $f$ is. Such a system is usually time varying, though: here a delayed input does not give a delayed output.`,
  },
  {
    id: "bk-opp-1.18",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problem 1.18",
    prompt: r`Consider a discrete-time system with input $x[n]$ and output $y[n]$ related by

$$y[n]=\sum_{k=n-n_0}^{n+n_0}x[k],$$

where $n_0$ is a finite positive integer.

(a) Is this system linear? (b) Is this system time-invariant? (c) If $x[n]$ is known to be bounded by a finite integer $B$ (i.e., $|x[n]|<B$ for all $n$), it can be shown that $y[n]$ is bounded by a finite number $C$. We conclude that the system is stable. Express $C$ in terms of $B$ and $n_0$.`,
    solution: r`**(a) Linear.** A sum of $ax_1+bx_2$ over any fixed window equals $a$ times the sum of $x_1$ plus $b$ times the sum of $x_2$.

**(b) Time invariant.** Feed $x_1[n]=x[n-m]$:

$$y_1[n]=\sum_{k=n-n_0}^{n+n_0}x[k-m]=\sum_{j=n-m-n_0}^{n-m+n_0}x[j]=y[n-m],$$

using $j=k-m$. A delayed input gives the same output, delayed.

**(c)** The window always holds $2n_0+1$ samples, each smaller than $B$ in size:

$$|y[n]|\le\sum_{k=n-n_0}^{n+n_0}|x[k]|<(2n_0+1)B.$$

So $C=(2n_0+1)B$.
` + fig("bk-c-118") + r`
Also note that the system is **not causal**: the window reaches $n_0$ samples ahead. Equivalently, $h[n]=1$ for $|n|\le n_0$ is non-zero for negative $n$, and $\sum|h|=2n_0+1$ is finite, which confirms stability.`,
  },
  {
    id: "bk-opp-1.27",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problem 1.27",
    prompt: r`Determine which of the properties (1) memoryless, (2) time invariant, (3) linear, (4) causal, (5) stable hold for each of the following continuous-time systems. Justify your answers.

(a) $y(t)=x(t-2)+x(2-t)$  (b) $y(t)=[\cos(3t)]x(t)$  (c) $y(t)=\int_{-\infty}^{2t}x(\tau)\,d\tau$

(d) $y(t)=\begin{cases}0,&t<0\\x(t)+x(t-2),&t\ge0\end{cases}$  (e) $y(t)=\begin{cases}0,&x(t)<0\\x(t)+x(t-2),&x(t)\ge0\end{cases}$

(f) $y(t)=x(t/3)$  (g) $y(t)=\dfrac{dx(t)}{dt}$`,
    solution: r`Quick tests for each property:

- **Memoryless**: is $y(t)$ built only from $x$ at the same $t$?
- **Time invariant**: are $t$ and $x$ coupled only through $x(t-\text{const})$, with no $t$ outside $x$ and no scaled or reversed $t$?
- **Linear**: do scaling the input by $-1$ (or by $a$) and adding inputs carry through?
- **Causal**: is every time inside $x(\cdot)$ at most $t$, for all $t$?
- **Stable**: does a bounded input always give a bounded output?

**(a)** $x(2-t)$ reverses time, so the system is not TI. At $t=0$ it reads $x(2)$, so it is not causal. It is linear and stable ($|y|\le2B$).

**(b)** $\cos3t$ is a time-varying gain. The system is memoryless, linear, causal and stable ($|y|\le B$), but not TI.

**(c)** The upper limit $2t$ exceeds $t$ for $t>0$, so it is not causal. The scaled time makes it not TI. For a bounded input such as $x=1$, the integral grows without limit, so it is not stable. It is linear.

**(d)** The rule switches at $t=0$, so a shifted input does not give a shifted output: not TI. It is linear, causal (it uses $x(t)$ and $x(t-2)$) and stable. It has memory.

**(e)** The rule depends on the **sign of the input**. Take $x(t)=1$, so $y=2$; then $-x=-1$ gives $y=0$, not $-2$. So it is not linear. It is TI, causal and stable. It has memory.

**(f)** For $t<0$, $t/3>t$: $y(-3)=x(-1)$ reads the future, so it is not causal. Scaled time makes it not TI. It is linear and stable.

**(g)** The derivative is linear and TI. It is causal, because it can be computed from the past via the left-hand limit. It has memory, because it needs values near $t$. It is not stable: $x=u(t)$ is bounded, but $y=\delta(t)$ is not.

| | memoryless | TI | linear | causal | stable |
|---|---|---|---|---|---|
| (a) | ✗ | ✗ | ✓ | ✗ | ✓ |
| (b) | ✓ | ✗ | ✓ | ✓ | ✓ |
| (c) | ✗ | ✗ | ✓ | ✗ | ✗ |
| (d) | ✗ | ✗ | ✓ | ✓ | ✓ |
| (e) | ✗ | ✓ | ✗ | ✓ | ✓ |
| (f) | ✗ | ✗ | ✓ | ✗ | ✓ |
| (g) | ✗ | ✓ | ✓ | ✓ | ✗ |`,
  },
  {
    id: "bk-opp-1.28",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problem 1.28",
    prompt: r`Determine which of the properties (memoryless, time invariant, linear, causal, stable) hold for each of the following discrete-time systems:

(a) $y[n]=x[-n]$  (b) $y[n]=x[n-2]-2x[n-8]$  (c) $y[n]=nx[n]$  (d) $y[n]=\mathcal{E}v\{x[n-1]\}$

(e) $y[n]=\begin{cases}x[n],&n\ge1\\0,&n=0\\x[n+1],&n\le-1\end{cases}$  (f) $y[n]=\begin{cases}x[n],&n\ge1\\0,&n=0\\x[n],&n\le-1\end{cases}$  (g) $y[n]=x[4n+1]$`,
    solution: r`**(a)** Reversal: linear and stable, but not TI and not causal ($y[-1]=x[1]$). It has memory.

**(b)** A fixed combination of delayed inputs. It is the impulse response $h[n]=\delta[n-2]-2\delta[n-8]$, so it is TI, linear, causal and stable ($\sum|h|=3$). It has memory.

**(c)** A time-varying gain $n$. It is memoryless, linear and causal. It is not TI, and not stable: $x=1$ gives $y=n$.

**(d)** $\mathcal{E}v\{x[n-1]\}=\tfrac12\big(x[n-1]+x[-n-1]\big)$. The second term reverses time, so the system is not TI, and it is not causal: $y[-2]$ uses $x[1]$. It is linear and stable.

**(e)** For $n\le-1$ it reads $x[n+1]$, one step into the future, so it is not causal and has memory. The rule changes with $n$, so it is not TI. It is linear and stable.

**(f)** The output equals $x[n]$ except that it is forced to 0 at $n=0$. It is memoryless, linear, causal and stable, but not TI, because the "hole" is always at $n=0$.

**(g)** $x[4n+1]$ compresses time. It is not TI, and not causal ($y[1]=x[5]$). It is linear and stable.

| | memoryless | TI | linear | causal | stable |
|---|---|---|---|---|---|
| (a) | ✗ | ✗ | ✓ | ✗ | ✓ |
| (b) | ✗ | ✓ | ✓ | ✓ | ✓ |
| (c) | ✓ | ✗ | ✓ | ✓ | ✗ |
| (d) | ✗ | ✗ | ✓ | ✗ | ✓ |
| (e) | ✗ | ✗ | ✓ | ✗ | ✓ |
| (f) | ✓ | ✗ | ✓ | ✓ | ✓ |
| (g) | ✗ | ✗ | ✓ | ✗ | ✓ |`,
  },
  {
    id: "bk-opp-2.14",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problems 2.14–2.15",
    prompt: r`Which of the following impulse responses correspond to stable LTI systems?

(a) $h_1(t)=e^{-(1-2j)t}u(t)$  (b) $h_2(t)=e^{-t}\cos(2t)\,u(t)$

(c) $h_1[n]=n\cos\left(\tfrac\pi4n\right)u[n]$  (d) $h_2[n]=3^nu[-n+10]$`,
    solution: r`Stable $\iff$ the impulse response is **absolutely** integrable (or summable).

**(a)** $|e^{-(1-2j)t}|=e^{-t}\,|e^{j2t}|=e^{-t}$, so $\int_0^\infty e^{-t}dt=1$. **Stable.** The complex factor only rotates; it does not grow.

**(b)** $|e^{-t}\cos2t|\le e^{-t}$, so $\int|h_2|\le1$. **Stable.**

**(c)** $|h_1[n]|=n|\cos(\pi n/4)|$. Every eighth sample ($n=0,8,16,\dots$) has $|\cos|=1$, so those samples alone add $8+16+24+\dots=\infty$. **Unstable.** The amplitude grows linearly.

**(d)** $u[-n+10]$ is non-zero for $n\le10$, so the sum runs to the left:

$$\sum_{n=-\infty}^{10}3^n=3^{10}\sum_{m=0}^{\infty}3^{-m}=3^{10}\cdot\frac{1}{1-\frac13}=\frac{3^{11}}{2}=88573.5<\infty.$$

**Stable**, although not causal. A sequence like $3^n$ grows to the right, but here it is cut off at $n=10$, and to the left it **decays**. Large but finite is still stable.`,
  },
  {
    id: "bk-opp-2.28",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problem 2.28",
    prompt: r`The following are the impulse responses of discrete-time LTI systems. Determine whether each system is causal and/or stable. Justify your answers.

(a) $h[n]=\left(\tfrac15\right)^nu[n]$  (b) $h[n]=(0.8)^nu[n+2]$  (c) $h[n]=\left(\tfrac12\right)^nu[-n]$  (d) $h[n]=5^nu[3-n]$

(e) $h[n]=\left(-\tfrac12\right)^nu[n]+(1.01)^nu[n-1]$  (f) $h[n]=\left(-\tfrac12\right)^nu[n]+(1.01)^nu[1-n]$  (g) $h[n]=n\left(\tfrac13\right)^nu[n-1]$`,
    solution: r`- **Causal** $\iff h[n]=0$ for $n<0$. Look at the step functions.
- **Stable** $\iff\sum|h[n]|<\infty$. Look at which way each exponential runs: a right-sided $a^n$ needs $|a|<1$, and a left-sided one needs $|a|>1$.

**(a)** Right-sided with ratio $\tfrac15$: **causal**, **stable** ($\sum=\tfrac54$).

**(b)** $u[n+2]$ starts at $n=-2$: **not causal**. It decays: $\sum=0.8^{-2}\cdot\frac{1}{0.2}=7.81$, so **stable**.

**(c)** Lives on $n\le0$: **not causal**. As $n\to-\infty$, $(\tfrac12)^n=2^{|n|}$ grows, so it is **unstable**.

**(d)** Lives on $n\le3$: **not causal**. As $n\to-\infty$, $5^n\to0$, and $\sum_{n\le3}5^n=\frac{125}{1-1/5}=156.25$, so **stable**.

**(e)** Both terms start at $n\ge0$: **causal**. The second term $(1.01)^n$ grows as $n\to\infty$: **unstable**.

**(f)** The second term lives on $n\le1$: **not causal**. To the left, $(1.01)^n$ decays slowly, but its sum converges: $\sum_{n\le1}1.01^n=\frac{1.01}{1-1/1.01}=102.01$. Together with $\sum|(-\tfrac12)^n|=2$, this is **stable**.

**(g)** Starts at $n=1$: **causal**. $\sum n(\tfrac13)^n=\frac{1/3}{(1-1/3)^2}=\tfrac34$: **stable**. The factor $n$ grows, but more slowly than $(\tfrac13)^n$ decays.
` + fig("bk-c-228") + r`
Compare (e) and (f). The same factor, $1.01^n$, is unstable on the right but stable on the left. Its direction decides everything.`,
  },
  {
    id: "bk-opp-2.29",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problem 2.29",
    prompt: r`The following are the impulse responses of continuous-time LTI systems. Determine whether each system is causal and/or stable.

(a) $h(t)=e^{-4t}u(t-2)$  (b) $h(t)=e^{-6t}u(3-t)$  (c) $h(t)=e^{-2t}u(t+50)$  (d) $h(t)=e^{2t}u(-1-t)$

(e) $h(t)=e^{-6|t|}$  (f) $h(t)=te^{-t}u(t)$  (g) $h(t)=\left(2e^{-t}-e^{(t-100)/100}\right)u(t)$`,
    solution: r`**(a)** Zero for $t<2$: **causal**. $\int_2^\infty e^{-4t}dt=\tfrac{e^{-8}}4$: **stable**.

**(b)** Non-zero for all $t\le3$, including negative $t$: **not causal**. As $t\to-\infty$, $e^{-6t}\to\infty$: **unstable**.

**(c)** Starts at $t=-50$: **not causal**. $\int_{-50}^\infty e^{-2t}dt=\tfrac{e^{100}}{2}$ is enormous but finite: **stable**.

**(d)** Lives on $t\le-1$: **not causal**. $\int_{-\infty}^{-1}e^{2t}dt=\tfrac{e^{-2}}2$: **stable**.

**(e)** Two-sided: **not causal**. $\int e^{-6|t|}dt=2\cdot\tfrac16=\tfrac13$: **stable**.

**(f)** **Causal**. $\int_0^\infty te^{-t}dt=1$: **stable**.

**(g)** **Causal**. The term $e^{(t-100)/100}=e^{-1}e^{t/100}$ grows, slowly but without bound, so the integral diverges: **unstable**.
` + fig("bk-c-229") + r`
Notice (c): an impulse response can be stable even though a factor such as $e^{100}$ appears. Stability asks whether the integral is *finite*, not whether it is small.`,
  },
  {
    id: "bk-opp-2.13",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problem 2.13",
    prompt: r`Consider a discrete-time system $S_1$ with impulse response $h[n]=\left(\tfrac15\right)^nu[n]$.

(a) Find the integer $A$ such that $h[n]-Ah[n-1]=\delta[n]$.

(b) Using the result from part (a), determine the impulse response $g[n]$ of an LTI system $S_2$ which is the inverse system of $S_1$.`,
    solution: r`**(a)** For $n\ge1$ both terms are non-zero:

$$\left(\tfrac15\right)^n-A\left(\tfrac15\right)^{n-1}=\left(\tfrac15\right)^{n-1}\left(\tfrac15-A\right).$$

This is zero for every $n\ge1$ only if $A=\tfrac15$. At $n=0$ we get $h[0]-Ah[-1]=1-0=1$. ✓ So $h[n]-\tfrac15h[n-1]=\delta[n]$.

The problem asks for an integer, but the only value that works is $A=\tfrac15$.

**(b)** The left side of (a) is a convolution:

$$h[n]-\tfrac15h[n-1]=h[n]*\left(\delta[n]-\tfrac15\delta[n-1]\right).$$

So with $g[n]=\delta[n]-\tfrac15\delta[n-1]$ we get $h*g=\delta$. Cascading $S_1$ with $S_2$ returns the input unchanged:

$$\boxed{g[n]=\delta[n]-\tfrac15\delta[n-1]}$$

In words, $S_2$ computes $y[n]=x[n]-\tfrac15x[n-1]$.
` + fig("bk-c-213") + r`
$S_1$ is IIR (it has an infinitely long $h$), yet its inverse is FIR with just two taps. $S_1$ is the recursion $y[n]=\tfrac15y[n-1]+x[n]$, and $S_2$ simply undoes that recursion.`,
  },
  {
    id: "bk-opp-2.30",
    topic: "causality-stability",
    book: "Oppenheim",
    ref: "Problem 2.30",
    prompt: r`Consider the first-order difference equation

$$y[n]+2y[n-1]=x[n].$$

Assuming the condition of initial rest (if $x[n]=0$ for $n<n_0$, then $y[n]=0$ for $n<n_0$), find the impulse response of a system whose input and output are related by this difference equation. You may rearrange it to express $y[n]$ in terms of $y[n-1]$ and $x[n]$ and generate $y[0],y[1],y[2],\dots$ in that order.`,
    solution: r`Rearrange the equation into a recursion and feed in $x[n]=\delta[n]$:

$$h[n]=\delta[n]-2h[n-1].$$

Initial rest means $h[n]=0$ for $n<0$.

| $n$ | $\delta[n]$ | $-2h[n-1]$ | $h[n]$ |
|---|---|---|---|
| 0 | 1 | 0 | 1 |
| 1 | 0 | $-2$ | $-2$ |
| 2 | 0 | 4 | 4 |
| 3 | 0 | $-8$ | $-8$ |

The pattern is clear:

$$h[n]=(-2)^nu[n].$$

**Causal**: yes, because of initial rest. **Stable**: no, because $\sum|h|=\sum2^n=\infty$. Every step multiplies the previous output by $-2$, so any disturbance grows. In the z-domain this is a pole at $z=-2$, outside the unit circle.
` + fig("bk-c-230"),
  },
]
