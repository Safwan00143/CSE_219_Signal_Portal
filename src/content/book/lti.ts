import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const ltiBook: BookProblem[] = [
  {
    id: "bk-opp-2.1",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.1",
    prompt: r`Let $x[n]=\delta[n]+2\delta[n-1]-\delta[n-3]$ and $h[n]=2\delta[n+1]+2\delta[n-1]$. Compute and plot each of the following convolutions:

(a) $y_1[n]=x[n]*h[n]$  (b) $y_2[n]=x[n+2]*h[n]$  (c) $y_3[n]=x[n]*h[n+2]$`,
    solution: r`**(a)** Convolving with a shifted impulse just shifts: $\delta[n-a]*\delta[n-b]=\delta[n-a-b]$. So multiply every term of $x$ by every term of $h$ and **add the shifts**, exactly like multiplying polynomials:

| term of $x$ | $\times\,2\delta[n+1]$ | $\times\,2\delta[n-1]$ |
|---|---|---|
| $\delta[n]$ | $2\delta[n+1]$ | $2\delta[n-1]$ |
| $2\delta[n-1]$ | $4\delta[n]$ | $4\delta[n-2]$ |
| $-\delta[n-3]$ | $-2\delta[n-2]$ | $-2\delta[n-4]$ |

Collect like terms. At $n=2$, $4-2=2$:

$$y_1[n]=2\delta[n+1]+4\delta[n]+2\delta[n-1]+2\delta[n-2]-2\delta[n-4].$$

Check the support: $x$ spans $[0,3]$ and $h$ spans $[-1,1]$, so $y$ must lie in $[0+(-1),\,3+1]=[-1,4]$. ✓
` + fig("bk-l-21") + r`
**(b)** Shifting one input of a convolution shifts the output by the same amount. $x[n+2]$ is $x$ moved 2 to the left, so

$$y_2[n]=y_1[n+2]=2\delta[n+3]+4\delta[n+2]+2\delta[n+1]+2\delta[n]-2\delta[n-2].$$

**(c)** The same reasoning applies to $h$: $y_3[n]=y_1[n+2]$, identical to $y_2[n]$. It does not matter which of the two signals carries the shift.`,
  },
  {
    id: "bk-opp-2.3",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.3",
    prompt: r`Consider an input $x[n]$ and a unit impulse response $h[n]$ given by

$$x[n]=\left(\tfrac12\right)^{n-2}u[n-2],\qquad h[n]=u[n+2].$$

Determine and plot the output $y[n]=x[n]*h[n]$.`,
    solution: r`Write the convolution sum and let the step functions set the limits:

$$y[n]=\sum_{k=-\infty}^{\infty}x[k]h[n-k]=\sum_k\left(\tfrac12\right)^{k-2}u[k-2]\,u[n-k+2].$$

- $u[k-2]$ is non-zero for $k\ge2$.
- $u[n-k+2]$ is non-zero for $k\le n+2$.

So the sum runs over $2\le k\le n+2$. That range is empty unless $n+2\ge2$, i.e. $n\ge0$. For $n\ge0$, substitute $m=k-2$:

$$y[n]=\sum_{m=0}^{n}\left(\tfrac12\right)^m=\frac{1-\left(\frac12\right)^{n+1}}{1-\frac12}=2\left[1-\left(\tfrac12\right)^{n+1}\right].$$

$$\boxed{\,y[n]=2\left[1-\left(\tfrac12\right)^{n+1}\right]u[n]\,}$$

Checks:
- $y[0]=1$: only $x[2]=1$ is inside the window.
- $y[n]\to2=\sum_n x[n]$: in the end the step collects all of $x$.
` + fig("bk-l-23"),
  },
  {
    id: "bk-opp-2.4",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.4",
    prompt: r`Compute and plot $y[n]=x[n]*h[n]$, where

$$x[n]=\begin{cases}1,&3\le n\le8\\0,&\text{otherwise}\end{cases}\qquad h[n]=\begin{cases}1,&4\le n\le15\\0,&\text{otherwise.}\end{cases}$$`,
    solution: r`Both signals are 0/1 pulses, so $y[n]=\sum_kx[k]h[n-k]$ simply **counts** the values of $k$ for which both are 1:

$$3\le k\le8\quad\text{and}\quad4\le n-k\le15\iff n-15\le k\le n-4.$$

So $y[n]$ is the number of integers in $[\max(3,n-15),\ \min(8,n-4)]$.

**Support.** $x$ starts at 3 and $h$ at 4, so $y$ starts at $3+4=7$. It ends at $8+15=23$.

**Pieces.**

- $7\le n\le11$: the range is $[3,\,n-4]$, which holds $n-6$ values (1 to 5).
- $12\le n\le18$: the range is $[3,8]$, all 6 samples of $x$, so $y=6$.
- $19\le n\le23$: the range is $[n-15,\,8]$, which holds $24-n$ values (5 down to 1).

$$y[n]=\begin{cases}n-6,&7\le n\le11\\6,&12\le n\le18\\24-n,&19\le n\le23\\0,&\text{otherwise}\end{cases}$$
` + fig("bk-l-24") + r`
Checks:
- The total $\sum y=6\times12=72$, the product of the two areas.
- The length is $6+12-1=17$ samples, from 7 to 23.`,
  },
  {
    id: "bk-opp-2.5",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.5",
    prompt: r`Let

$$x[n]=\begin{cases}1,&0\le n\le9\\0,&\text{elsewhere}\end{cases}\qquad h[n]=\begin{cases}1,&0\le n\le N\\0,&\text{elsewhere}\end{cases}$$

where $N\le9$ is an integer. Determine the value of $N$, given that $y[n]=x[n]*h[n]$ satisfies $y[4]=5$ and $y[14]=0$.`,
    solution: r`As in the previous problem, $y[n]$ counts the overlap of $[0,9]$ (for $k$ in $x$) with $[n-N,\,n]$ (for $k$ in $h[n-k]$).

**Condition $y[14]=0$.** The output of two pulses ends at $9+N$, the sum of their last indices. $y[14]=0$ means the output has already ended, so $9+N<14$, i.e. $N<5$.

**Condition $y[4]=5$.** At $n=4$ the window is $[4-N,4]$, intersected with $[0,9]$:
- if $N\ge4$, the window covers $k=0..4$, which is 5 values;
- if $N<4$, it holds only $N+1<5$ values.

So $N\ge4$.

Together, $\boxed{N=4}$: $h$ is a 5-sample pulse, and $y$ is a trapezoid from $n=0$ to $n=13$ that rises to 5.`,
  },
  {
    id: "bk-opp-2.7",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.7",
    prompt: r`A linear system $S$ has the relationship

$$y[n]=\sum_{k=-\infty}^{\infty}x[k]\,g[n-2k]$$

between its input $x[n]$ and its output $y[n]$, where $g[n]=u[n]-u[n-4]$.

(a) Determine $y[n]$ when $x[n]=\delta[n-1]$. (b) Determine $y[n]$ when $x[n]=\delta[n-2]$. (c) Is $S$ LTI? (d) Determine $y[n]$ when $x[n]=u[n]$.`,
    solution: r`$g[n]$ is 1 for $n=0,1,2,3$. The formula looks like a convolution, but the shift is $2k$, not $k$. Each input sample at time $k$ produces a copy of $g$ starting at time $2k$.

**(a)** Only $k=1$ contributes: $y[n]=g[n-2]$, which is 1 for $n=2,3,4,5$.

**(b)** Only $k=2$ contributes: $y[n]=g[n-4]$, which is 1 for $n=4,5,6,7$.

**(c)** The input in (b) is the input in (a) delayed by **1**, but the output is delayed by **2**. A time-invariant system would delay the output by 1 too. So $S$ is linear but **not time-invariant**, and therefore **not LTI**.

**(d)** For $x=u[n]$, every $k\ge0$ adds a copy $g[n-2k]$, which covers $n=2k,\dots,2k+3$. Count how many copies cover each $n$:
- $n=0,1$: only $k=0$, so $y=1$;
- $n\ge2$: exactly two copies ($k=\lfloor n/2\rfloor$ and the one before it), so $y=2$.

$$y[n]=\delta[n]+\delta[n-1]+2u[n-2]=u[n]+u[n-2].$$`,
  },
  {
    id: "bk-opp-1.31",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 1.31",
    prompt: r`Consider an LTI system whose response to the signal $x_1(t)$ is the signal $y_1(t)$, as shown below.

(a) Determine and sketch carefully the response of the system to the input $x_2(t)$.

(b) Determine and sketch the response to the input $x_3(t)$.
` + fig("bk-l-131"),
    solution: r`We never need $h(t)$. Linearity and time invariance say that **if an input is a combination of shifted copies of $x_1$, the output is the same combination of shifted copies of $y_1$**:

$$\sum_i a_i\,x_1(t-t_i)\ \longrightarrow\ \sum_i a_i\,y_1(t-t_i).$$

So the task is to write $x_2$ and $x_3$ in terms of $x_1$, a unit pulse on $0<t<2$.

**(a)** $x_2$ is $+1$ on $(0,2)$ and $-1$ on $(2,4)$:

$$x_2(t)=x_1(t)-x_1(t-2)\ \Rightarrow\ y_2(t)=y_1(t)-y_1(t-2).$$

That is the triangle on $(0,2)$ with peak 2, followed by an upside-down triangle on $(2,4)$ with peak $-2$.

**(b)** $x_3$ is 1 on $(-1,0)$, 2 on $(0,1)$ and 1 on $(1,2)$. That is two overlapping pulses: one on $(-1,1)$ and one on $(0,2)$:

$$x_3(t)=x_1(t+1)+x_1(t)\ \Rightarrow\ y_3(t)=y_1(t+1)+y_1(t).$$

Adding the triangles piece by piece:
- $-1<t<0$: $2(t+1)$;
- $0<t<1$: $2(1-t)+2t=2$;
- $1<t<2$: $2(2-t)$.

The result is a trapezoid.
` + fig("bk-l-131-sol"),
  },
  {
    id: "bk-opp-2.8",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.8",
    prompt: r`Determine and sketch the convolution of the following two signals:

$$x(t)=\begin{cases}t+1,&0\le t\le1\\2-t,&1<t\le2\\0,&\text{elsewhere}\end{cases}\qquad h(t)=\delta(t+2)+2\delta(t+1).$$`,
    solution: r`Convolving with an impulse places a copy of the signal at the impulse: $x(t)*\delta(t-t_0)=x(t-t_0)$. So

$$y(t)=x(t+2)+2x(t+1).$$

- $x(t+2)$ is $x$ moved 2 to the left. It lives on $[-2,0]$: it is $t+3$ (from 1 to 2) on $[-2,-1]$ and $-t$ (from 1 to 0) on $(-1,0]$.
- $2x(t+1)$ is $x$ moved 1 to the left and doubled. It lives on $[-1,1]$: it is $2(t+2)$ (from 2 to 4) on $[-1,0]$ and $2(1-t)$ (from 2 to 0) on $(0,1]$.

Add them on each interval:

| interval | $x(t+2)$ | $2x(t+1)$ | $y(t)$ |
|---|---|---|---|
| $-2\le t\le-1$ | $t+3$ | $0$ | $t+3$ (1 to 2) |
| $-1<t\le0$ | $-t$ | $2t+4$ | $t+4$ (3 to 4) |
| $0<t\le1$ | $0$ | $2-2t$ | $2-2t$ (2 to 0) |

$y$ has jumps where either copy jumps:
- up by 1 at $t=-2$;
- up by 1 at $t=-1$ (from 2 to 3);
- down by 2 at $t=0$ (from 4 to 2).
` + fig("bk-l-28"),
  },
  {
    id: "bk-opp-2.10",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.10",
    prompt: r`Suppose that

$$x(t)=\begin{cases}1,&0\le t\le1\\0,&\text{elsewhere}\end{cases}$$

and $h(t)=x(t/\alpha)$, where $0<\alpha\le1$.

(a) Determine and sketch $y(t)=x(t)*h(t)$.

(b) If $dy(t)/dt$ contains only three discontinuities, what is the value of $\alpha$?`,
    solution: r`**(a)** $h(t)=x(t/\alpha)$ is 1 for $0\le t\le\alpha$: a pulse of width $\alpha\le1$. Flip it, $h(t-\tau)$ as a function of $\tau$ lives on $[t-\alpha,\,t]$, and slide it across $x$ on $[0,1]$. $y(t)$ is the length of the overlap:

- $t<0$: no overlap, so $y=0$.
- $0\le t\le\alpha$: the overlap is $[0,t]$, so $y=t$.
- $\alpha\le t\le1$: the short pulse is fully inside, so $y=\alpha$.
- $1\le t\le1+\alpha$: the overlap is $[t-\alpha,1]$, so $y=1+\alpha-t$.
- $t>1+\alpha$: $y=0$.
` + fig("bk-l-210") + r`
**(b)** $y$ is continuous, but its slope jumps at each corner, at $t=0$, $\alpha$, $1$ and $1+\alpha$. That is four discontinuities of $dy/dt$ in general. There are only three when two corners merge, i.e. $\alpha=1$. Then the flat top disappears and $y$ becomes the triangle $1-|t-1|$, with slope changes at $0$, $1$ and $2$.

$$\boxed{\alpha=1}$$`,
  },
  {
    id: "bk-opp-2.11",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.11",
    prompt: r`Let $x(t)=u(t-3)-u(t-5)$ and $h(t)=e^{-3t}u(t)$.

(a) Compute $y(t)=x(t)*h(t)$. (b) Compute $g(t)=\left(\frac{dx(t)}{dt}\right)*h(t)$. (c) How is $g(t)$ related to $y(t)$?`,
    solution: r`**(a)** $y(t)=\int x(\tau)h(t-\tau)\,d\tau=\int_3^5e^{-3(t-\tau)}u(t-\tau)\,d\tau$. The factor $u(t-\tau)$ keeps only $\tau\le t$, so there are three cases:

- $t<3$: no overlap, so $y=0$.
- $3\le t\le5$: $\displaystyle y=\int_3^te^{-3(t-\tau)}d\tau=\frac13\left(1-e^{-3(t-3)}\right)$.
- $t>5$: $\displaystyle y=\int_3^5e^{-3(t-\tau)}d\tau=\frac13\left(e^{-3(t-5)}-e^{-3(t-3)}\right)$.

This is the familiar RC-circuit shape: charge towards $\tfrac13$ while the input is on, then discharge.

**(b)** $\frac{dx}{dt}=\delta(t-3)-\delta(t-5)$, so convolution just places copies of $h$:

$$g(t)=e^{-3(t-3)}u(t-3)-e^{-3(t-5)}u(t-5).$$

**(c)** Differentiating (a) gives exactly this:
- for $3<t<5$, $\frac{dy}{dt}=e^{-3(t-3)}$;
- for $t>5$, $\frac{dy}{dt}=-e^{-3(t-5)}+e^{-3(t-3)}$.

So $g(t)=\dfrac{dy(t)}{dt}$. This is the **derivative property** of convolution, $\frac{d}{dt}(x*h)=\frac{dx}{dt}*h$. It is often the fastest way to convolve with a signal made of steps: convolve with the impulses, then integrate.
` + fig("bk-l-211"),
  },
  {
    id: "bk-opp-2.23",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.23",
    prompt: r`Let $h(t)$ be the triangular pulse shown below, and let $x(t)$ be the impulse train

$$x(t)=\sum_{k=-\infty}^{\infty}\delta(t-kT).$$

Determine and sketch $y(t)=x(t)*h(t)$ for the following values of $T$: (a) $T=4$ (b) $T=2$ (c) $T=3/2$ (d) $T=1$
` + fig("bk-l-223"),
    solution: r`Each impulse at $t=kT$ places a copy of the triangle there:

$$y(t)=\sum_{k}h(t-kT).$$

The triangle has width 2 (from $-1$ to $1$), so everything depends on how $T$ compares with 2.

**(a) $T=4$.** The copies are 4 apart and each is 2 wide, so they do not touch. $y$ is a row of separate triangles at $t=0,\pm4,\pm8,\dots$ with gaps of 2.

**(b) $T=2$.** Each copy ends exactly where the next begins. $y$ is a continuous triangular wave between 0 and 1, with peaks at even $t$ and zeros at odd $t$.

**(c) $T=\tfrac32$.** Neighbouring copies now overlap on intervals of length $\tfrac12$. In one period, take $0\le t\le\tfrac32$:
- $0\le t\le\tfrac12$: only the copy at 0 is non-zero, so $y=1-t$.
- $\tfrac12\le t\le1$: the copies at 0 and at $\tfrac32$ overlap, so $y=(1-t)+\big(1-(\tfrac32-t)\big)=\tfrac12$, which is flat.
- $1\le t\le\tfrac32$: only the copy at $\tfrac32$, so $y=t-\tfrac12$, rising back to 1.

**(d) $T=1$.** At every $t$, exactly two copies overlap, with heights $1-s$ and $s$ for some $s\in[0,1]$. They always add to 1, so

$$y(t)=1\quad\text{for all }t.$$
` + fig("bk-l-223-sol") + r`
Part (d) is worth remembering. It is the idea behind linear interpolation: the triangles "fill in" perfectly when their spacing equals their half-width.`,
  },
  {
    id: "bk-opp-2.24",
    topic: "lti-convolution",
    book: "Oppenheim",
    ref: "Problem 2.24",
    prompt: r`Consider the cascade interconnection of three causal LTI systems shown below. The impulse response $h_2[n]$ is $h_2[n]=u[n]-u[n-2]$, and the overall impulse response $h[n]$ is as shown.

(a) Find the impulse response $h_1[n]$.

(b) Find the response of the overall system to the input $x[n]=\delta[n]-\delta[n-1]$.
` + fig("bk-l-224"),
    solution: r`**(a)** A cascade of LTI systems has impulse response equal to the convolution of the individual ones:

$$h[n]=h_1[n]*h_2[n]*h_2[n].$$

$h_2=\delta[n]+\delta[n-1]$, so $h_2*h_2=\delta[n]+2\delta[n-1]+\delta[n-2]$. Therefore

$$h[n]=h_1[n]+2h_1[n-1]+h_1[n-2].$$

$h_1$ is causal, so we can solve for it one sample at a time:

$$h_1[n]=h[n]-2h_1[n-1]-h_1[n-2].$$

| $n$ | $h[n]$ | $h_1[n]$ |
|---|---|---|
| 0 | 1 | $1$ |
| 1 | 5 | $5-2(1)=3$ |
| 2 | 10 | $10-2(3)-1=3$ |
| 3 | 11 | $11-2(3)-3=2$ |
| 4 | 8 | $8-2(2)-3=1$ |
| 5 | 4 | $4-2(1)-2=0$ |
| 6 | 1 | $1-0-1=0$ |

So $h_1[n]=\delta[n]+3\delta[n-1]+3\delta[n-2]+2\delta[n-3]+\delta[n-4]$.

Check by multiplying the polynomials $(1+3z+3z^2+2z^3+z^4)(1+2z+z^2)$: the coefficients are $1,5,10,11,8,4,1$. ✓

**(b)** The response to $\delta[n]-\delta[n-1]$ is $h[n]-h[n-1]$:

| $n$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| $y[n]$ | 1 | 4 | 5 | 1 | $-3$ | $-4$ | $-3$ | $-1$ |
` + fig("bk-l-224-sol"),
  },
  {
    id: "bk-tan-3.16",
    topic: "lti-convolution",
    book: "Tan",
    ref: "Problem 3.16",
    prompt: r`Find the unit-impulse response for each of the following linear systems:

(a) $y(n)=0.5x(n)-0.5x(n-2)$, for $n\ge0$, $x(-2)=0$, $x(-1)=0$

(b) $y(n)=0.75y(n-1)+x(n)$, for $n\ge0$, $y(-1)=0$

(c) $y(n)=-0.8y(n-1)+x(n-1)$, for $n\ge0$, $x(-1)=0$, $y(-1)=0$`,
    solution: r`The impulse response $h(n)$ is the output when $x(n)=\delta(n)$, starting from rest. Substitute $\delta(n)$ for $x(n)$ and either read off $h$ directly or run the recursion.

**(a)** The output depends only on inputs, so substitute directly:

$$h(n)=0.5\delta(n)-0.5\delta(n-2).$$

There are two non-zero samples, $h(0)=0.5$ and $h(2)=-0.5$. This is a finite impulse response (FIR) system.

**(b)** $h(n)=0.75h(n-1)+\delta(n)$ with $h(-1)=0$:
- $h(0)=0.75(0)+1=1$;
- $h(1)=0.75$;
- $h(2)=0.75^2$;
- and so on.

$$h(n)=(0.75)^nu(n).$$

Feedback makes the response last forever: an infinite impulse response (IIR) system.

**(c)** $h(n)=-0.8h(n-1)+\delta(n-1)$ with $h(-1)=0$:
- $h(0)=-0.8(0)+\delta(-1)=0$;
- $h(1)=-0.8(0)+1=1$;
- $h(2)=-0.8$;
- $h(3)=0.64$;
- and so on.

$$h(n)=(-0.8)^{n-1}u(n-1).$$

The delayed input makes $h$ start at $n=1$, and the negative feedback coefficient makes the samples alternate in sign.
` + fig("bk-l-tan316"),
  },
]
