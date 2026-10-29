const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const ltiNote = r`
## Systems: signals in, signals out

A **system** transforms an input signal into an output signal. We write $x(t)\to y(t)$ or $x[n]\to y[n]$.
` + fig("lti-system") + r`
An ordinary function takes one number and returns one number. A system takes a **whole signal** (a whole function) and returns another **whole signal**. A filter, an amplifier, an echo chamber and a camera sensor are all systems.

## Two properties that make life easy

### Linearity

A system is **linear** if it obeys two rules:

1. **Homogeneity (scaling):** if $x(t)\to y(t)$, then $a\,x(t)\to a\,y(t)$.
2. **Additivity:** if $x_1\to y_1$ and $x_2\to y_2$, then $x_1+x_2\to y_1+y_2$.

Together they form **superposition**: $a\,x_1+b\,x_2\to a\,y_1+b\,y_2$. You can treat the pieces of an input separately and add the outputs.
` + fig("lti-linear") + r`
Consequences and quick tests:

- Put $a=0$: **zero input must give zero output.** $y=x+1$ fails this, so it is not linear.
- $y=3x(t)$, $y=\frac{dx}{dt}$, $y=\int x\,dt$ are linear; $y=x^2(t)$ is not (doubling $x$ quadruples $y$).

### Time invariance

A system is **time invariant** if delaying the input only delays the output:

$$
x(t)\to y(t)\quad\Longrightarrow\quad x(t-t_0)\to y(t-t_0)\ \text{ for every } t_0 .
$$
` + fig("lti-ti") + r`
*How to test:* (1) feed the shifted input $x(t-t_0)$ and compute the output; (2) shift the original output to get $y(t-t_0)$; (3) compare.

- $y(t)=x(t-1)$ and $y(t)=x^2(t)$ are time invariant.
- $y(t)=t\,x(t)$ is **not**: feeding $x(t-t_0)$ gives $t\,x(t-t_0)$, but $y(t-t_0)=(t-t_0)\,x(t-t_0)$.
- $y(t)=x(2t)$ is **not**: feeding $x(t-t_0)$ gives $x(2t-t_0)$, but $y(t-t_0)=x(2t-2t_0)$.

### LTI systems

A system that is both linear and time invariant is called **LTI**. Why we care: for an LTI system, the response to **one special input** lets us compute the output for **any** input. That special input is the impulse, and the tool is convolution.

## A detour: convolution as polynomial multiplication

Convolution is just another way of combining two sequences, like adding or subtracting them, but it mixes them differently. It appears naturally when you multiply polynomials.

$$
A(z)=1+3z+2z^2+5z^3+4z^4,\qquad B(z)=2-z+4z^2+z^3+3z^4 .
$$
` + fig("lti-poly") + r`
**What is the coefficient of $z^4$ in $A(z)B(z)$?** Collect every product whose powers add to 4: $a_0b_4,\ a_1b_3,\ a_2b_2,\ a_3b_1,\ a_4b_0$.

$$
c[4]=1\cdot3+3\cdot1+2\cdot4+5\cdot(-1)+4\cdot2=17 .
$$

In general, the coefficient of $z^n$ pairs up indices that add to $n$:

$$
c[n]=\sum_k a[k]\,b[n-k].
$$

### Reflection turns crossed pairs into vertical pairs

The index $b[n-k]$ means: **reflect** $b$ (so $b[k]\to b[-k]$), then **shift** it right by $n$. Now the pairs that multiply sit directly above each other.

- $n=0$: only $a[0]b[0]=1\cdot2=2$ overlaps, so $c[0]=2$.
- $n=2$: $c[2]=1\cdot4+3\cdot(-1)+2\cdot2=5$.
- $n=4$: all five pairs line up, giving the same $c[4]=17$ as before.
` + fig("lti-reflect") + r`
> **Convolution:** keep the first signal as it is, **reflect** the second, **slide** it right to position $n$, **multiply** the overlapping samples and **add**. One position gives one output value.

$$
c[n]=(a*b)[n]=\sum_{k=-\infty}^{\infty}a[k]\,b[n-k]
$$

## Practice: two short sequences

$$
x=\{1,2,1,1\},\qquad h=\{1,1,-1,2\}\qquad(\text{both starting at } n=0).
$$

First reflect $h$: $h[-k]=\{2,-1,1,1\}$ sitting at $k=-3,\dots,0$. Then slide.

| $n$ | products that line up | $y[n]$ |
|---|---|---|
| 0 | $1\cdot1$ | 1 |
| 1 | $1\cdot1+2\cdot1$ | 3 |
| 2 | $1\cdot(-1)+2\cdot1+1\cdot1$ | 2 |
| 3 | $1\cdot2+2\cdot(-1)+1\cdot1+1\cdot1$ | 2 |
| 4 | $2\cdot2+1\cdot(-1)+1\cdot1$ | 4 |
| 5 | $1\cdot2+1\cdot(-1)$ | 1 |
| 6 | $1\cdot2$ | 2 |
` + fig("lti-practice", "lti-practice-result", "lti-interactive-conv") + r`
**Length rule.** Convolving lengths $L$ and $M$ gives length $L+M-1$. Here $4+4-1=7$.

**Order does not matter.** Since $A(z)B(z)=B(z)A(z)$, convolution is commutative: $a*b=b*a$. You may reflect whichever signal is easier.

## Why convolution matters

**Goal:** find the output of an LTI system for **any** input. The philosophy is the same as counting the factors of $72=2^3\cdot3^2$: solve the easy pieces ($2^0..2^3$ gives 4 choices, $3^0..3^2$ gives 3), then combine them ($4\cdot3=12$ factors). For systems:

1. Solve for the **simplest input**.
2. Break **any** input into simple pieces.
3. **Combine** the small answers.

### Step 1: the impulse response

The simplest input is the impulse $\delta[n]$: zero everywhere except one instant. The output it produces is the **impulse response**:

$$
\delta[n]\ \longrightarrow\ h[n].
$$
` + fig("lti-impulse-response") + r`
Like poking a sleeping cat and watching how it reacts, the impulse response is the system's **signature**.

- **Echo system.** One short "hello" produces equal echoes forever: $h[n]=u[n]$.
- **Fading echoes.** $h[n]=\alpha^nu[n]$ with $0<\alpha<1$: each echo keeps a fraction $\alpha$ of the previous one. Large $\alpha$ means slow fading; small $\alpha$ means the echoes die quickly.
` + fig("lti-echo") + r`
- **Pure delay.** $y[n]=x[n-3]$ has $h[n]=\delta[n-3]$ (and $h(t)=\delta(t-3)$ in continuous time).
` + fig("lti-delay") + r`
### Step 2 and 3: one example by hand

Send $x[n]=\delta[n]+2\delta[n-1]-\delta[n-2]+\delta[n-3]$ into the echo system $h[n]=u[n]$.

By the two LTI properties:

- time invariance: $\delta[n-k]\to h[n-k]=u[n-k]$;
- homogeneity: $a\,\delta[n-k]\to a\,u[n-k]$;
- additivity: add the four outputs.

$$
y[n]=u[n]+2u[n-1]-u[n-2]+u[n-3],
$$

which is $\{1,3,2,3,3,3,\dots\}$ starting at $n=0$.
` + fig("lti-decompose") + r`
### The general case: the convolution sum

**Any** discrete input is a stack of scaled, shifted impulses (the sifting identity from the previous topic):

$$
x[n]=\sum_{k=-\infty}^{\infty}x[k]\,\delta[n-k].
$$

The value $x[k]$ is the height of the impulse placed at $n=k$. Each piece produces a piece of output:

$$
x[k]\,\delta[n-k]\ \xrightarrow{\ \text{TI + homogeneity}\ }\ x[k]\,h[n-k],
$$

and additivity adds them all:

$$
\boxed{\,y[n]=\sum_{k=-\infty}^{\infty}x[k]\,h[n-k]=(x*h)[n]\,}
$$

> **The bridge is complete.** (1) Find $h$, the response to $\delta$. (2) Break the input into shifted impulses. (3) Shift, scale and add copies of $h$. That sum is convolution.

## Continuous-time convolution

The same idea with an integral instead of a sum:

$$
\boxed{\,y(t)=(x*h)(t)=\int_{-\infty}^{\infty}x(\tau)\,h(t-\tau)\,d\tau\,}
$$

For a fixed $t$, reflect $h(\tau)\to h(-\tau)$, shift it to $h(t-\tau)$, multiply by $x(\tau)$ and integrate over the overlap. As $t$ changes, $h(t-\tau)$ slides along the $\tau$ axis.
` + fig("lti-ct-conv") + r`
**The recipe, both domains:**

1. Choose the output location ($n$ or $t$).
2. Reflect and shift the second signal: $h[k]\to h[-k]\to h[n-k]$, or $h(\tau)\to h(-\tau)\to h(t-\tau)$.
3. Multiply where they overlap, then add (sum over $k$) or integrate (over $\tau$).
4. The overlap region changes at "break points"; treat each range of $n$ or $t$ as a separate case.

## Worked examples

### Example 2.2 — a short input through a short filter

$x[n]=0.5\,\delta[n]+2\,\delta[n-1]$ and $h[n]=1$ for $n=0,1,2$ (zero elsewhere).

For each $n$, draw $h[n-k]$: three ones at $k=n-2,\ n-1,\ n$.

- $n<0$: no overlap, $y[n]=0$.
- $n=0$: one overlap, $y[0]=0.5\cdot1=0.5$.
- $n=1$: two overlaps, $y[1]=0.5+2=2.5$.
- $n=2$: still two, $y[2]=0.5+2=2.5$.
- $n=3$: one overlap, $y[3]=2$.
- $n>3$: the sliding signal has passed $x$; $y[n]=0$.
` + fig("conv-ex22") + r`
### Example 2.3 — exponential into an accumulator

$x[n]=\alpha^nu[n]$ with $0<\alpha<1$, and $h[n]=u[n]$.

$h[n-k]=u[n-k]$ is 1 for $k\le n$ (the reflected step has its edge at $k=n$).

**Case 1: $n<0$.** $x[k]$ lives at $k\ge0$ and $h[n-k]$ at $k\le n<0$. No overlap, so $y[n]=0$.
` + fig("cc-L23-a") + r`
**Case 2: $n\ge0$.** The overlap is $0\le k\le n$, where the product is just $\alpha^k$.
` + fig("cc-L23-b") + r`

$$
y[n]=\sum_{k=0}^{n}\alpha^k=1+\alpha+\cdots+\alpha^n=\frac{1-\alpha^{n+1}}{1-\alpha}.
$$

$$
y[n]=\frac{1-\alpha^{n+1}}{1-\alpha}\,u[n]\ \xrightarrow{\ n\to\infty\ }\ \frac1{1-\alpha}.
$$
` + fig("conv-ex23") + r`
### Example 2.5 — a left-sided input

$x[n]=2^nu[-n]$ (non-zero for $n\le0$) and $h[n]=u[n]$.

**Case 1: $n<0$.** The overlap is $k\le n$.
` + fig("cc-L25-a") + r`
$$
y[n]=\sum_{k=-\infty}^{n}2^k=2^n+2^{n-1}+\cdots=2^n\cdot\frac{1}{1-\frac12}=2^{n+1}
$$

**Case 2: $n\ge0$.** Every non-zero sample of $x$ ($k\le0$) overlaps.
` + fig("cc-L25-b") + r`
$$
y[n]=\sum_{k=-\infty}^{0}2^k=1+\tfrac12+\tfrac14+\cdots=2
$$
` + fig("conv-ex25") + r`
### Example 2.6 — continuous exponential into an integrator

$x(t)=e^{-at}u(t)$ with $a>0$, and $h(t)=u(t)$.

$h(t-\tau)=u(t-\tau)$ is 1 for $\tau<t$.

**Case 1: $t<0$.** No overlap, so $y(t)=0$.
` + fig("cc-L26-a") + r`
**Case 2: $t>0$.** The overlap is $0<\tau<t$.
` + fig("cc-L26-b") + r`
$$
y(t)=\int_0^te^{-a\tau}d\tau=\left[-\frac1ae^{-a\tau}\right]_0^t=\frac1a\left(1-e^{-at}\right)
$$

$$
y(t)=\frac1a\left(1-e^{-at}\right)u(t).
$$

As $t$ grows the overlap grows and the output rises toward $1/a$.
` + fig("conv-ex26") + r`
### Property: convolution distributes over addition

$$
x*(h_1+h_2)=x*h_1+x*h_2,\qquad (x_1+x_2)*h=x_1*h+x_2*h .
$$

If one signal is a sum of simpler pieces (for instance a different formula on the left and on the right), split it and convolve each piece separately.

### Example 2.10 — a two-sided input

$x[n]=\left(\tfrac12\right)^nu[n]+2^nu[-n]$ and $h[n]=u[n]$. The formula changes at the origin, so split:

- Right-sided part, from Example 2.3 with $\alpha=\frac12$: $y_1[n]=\dfrac{1-(\frac12)^{n+1}}{1-\frac12}u[n]=\left(2-2^{-n}\right)u[n]$.
- Left-sided part, from Example 2.5: $y_2[n]=2^{n+1}$ for $n<0$ and $2$ for $n\ge0$.

$$
y[n]=y_1[n]+y_2[n]=\begin{cases}2^{n+1},&n<0\\ 4-2^{-n},&n\ge0\end{cases}
$$

The left side rises toward 1, then the right side climbs toward 4.
` + fig("conv-ex210") + r`
### Practice — two one-sided exponentials

$x(t)=e^{t}u(-t)$ and $h(t)=e^{-t}u(t)$. Here the second signal is not just a step, so first find the overlap:

- $x(\tau)\neq0$ only for $\tau\le0$;
- $h(t-\tau)=e^{-(t-\tau)}u(t-\tau)\neq0$ only for $\tau\le t$.

So the overlap is $\tau\le\min(0,t)$, and on it $x(\tau)h(t-\tau)=e^{\tau}e^{-(t-\tau)}=e^{-t}e^{2\tau}$.

**Case 1: $t<0$.** The overlap ends at $\tau=t$.
` + fig("cc-Ltwo-a") + r`
$$
y(t)=e^{-t}\int_{-\infty}^{t}e^{2\tau}d\tau=e^{-t}\cdot\tfrac12e^{2t}=\tfrac12e^{t}
$$

**Case 2: $t\ge0$.** The overlap ends at $\tau=0$.
` + fig("cc-Ltwo-b") + r`
$$
y(t)=e^{-t}\int_{-\infty}^{0}e^{2\tau}d\tau=\tfrac12e^{-t}
$$

$$
y(t)=\tfrac12e^{-|t|},
$$

a two-sided decaying exponential.
` + fig("conv-two-exp") + r`
## Properties of convolution

| property | statement | what it means for systems |
|---|---|---|
| commutative | $x*h=h*x$ | input and impulse response can swap roles |
| associative | $(x*h_1)*h_2=x*(h_1*h_2)$ | two systems in cascade act like one with $h_1*h_2$ |
| distributive | $x*(h_1+h_2)=x*h_1+x*h_2$ | two systems in parallel act like one with $h_1+h_2$ |
| identity | $x*\delta=x$ | $h=\delta$ is the "do nothing" system |
| shift | $x*\delta(t-t_0)=x(t-t_0)$ | $h=\delta(t-t_0)$ is a pure delay |

## Exam pointers

- Always draw (or describe) $h[n-k]$ as a function of $k$ and mark where its edge sits. Then list the cases of $n$ where the overlap changes.
- Two-sided inputs: split with the distributive property and convolve each side.
- Shifted steps such as $\left(\frac14\right)^nu[n+3]$: rewrite as $64\left(\frac14\right)^{n+3}u[n+3]$, convolve with the unshifted signal, then shift the result by time invariance.
- "Prove $y=x*h$ using only time-domain analysis": sifting + time invariance + homogeneity + additivity, in that order.
- Check one output value by direct summation before finishing.
`
