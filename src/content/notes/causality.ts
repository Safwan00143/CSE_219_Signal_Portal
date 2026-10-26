const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const causalityNote = r`
## Causality: no time travel

A system is **causal** if its output at any time depends only on the input at the **present and past**, never the future. Every physical system that runs in real time is causal: a speaker cannot react to a sound before it is played.

### Reading causality from $h(t)$

The impulse response $h(t)$ shows what the system does after we poke it with $\delta(t)$ at $t=0$. If anything happens **before** $t=0$, the effect came before the cause.
` + fig("cs-causal") + r`
**Test for LTI systems:**

$$
\text{causal}\iff h(t)=0\ \text{ for all } t<0\qquad\qquad \text{causal}\iff h[n]=0\ \text{ for all } n<0 .
$$

*Why:* $y(t)=\int h(\tau)x(t-\tau)\,d\tau$. The input is used at times $t-\tau$; these are in the **future** exactly when $\tau<0$. If $h(\tau)=0$ for every $\tau<0$, no future value is ever used.

Systems that process stored data (images, recorded audio) are allowed to be non-causal: the whole signal is already available.

## Stability: bounded in, bounded out

A system is **BIBO stable** (bounded-input, bounded-output) if every bounded input produces a bounded output. If $|x(t)|\le B$ always, the output must not shoot up to infinity.
` + fig("cs-bibo") + r`
### Stability depends on the size of $h$

Write the convolution with $h$ first (we may, since convolution commutes):

$$
y(t)=\int_{-\infty}^{\infty}h(\tau)\,x(t-\tau)\,d\tau .
$$

If $|x(t)|\le B$ for all $t$, then $|x(t-\tau)|\le B$ too, and

$$
|y(t)|\le\int_{-\infty}^{\infty}|h(\tau)|\,|x(t-\tau)|\,d\tau\le B\int_{-\infty}^{\infty}|h(\tau)|\,d\tau .
$$

So the output is bounded whenever the total area under $|h|$ is finite. (Conversely, if that area is infinite, the bounded input $x(t)=\operatorname{sgn}h(-t)$ makes $y(0)=\int|h|=\infty$.)

**Test for LTI systems:**

$$
\text{stable}\iff\int_{-\infty}^{\infty}|h(t)|\,dt<\infty\qquad\qquad\text{stable}\iff\sum_{n=-\infty}^{\infty}|h[n]|<\infty .
$$

## Two little problems: can $h(t)$ be periodic?

**1. If the system is causal, can $h(t)$ be periodic?** Suppose $h$ is periodic with period $T$ and $h(t_0)\neq0$ for some $t_0>0$. Then the same value repeats backwards:

$$
h(t_0)=h(t_0-T)=h(t_0-2T)=\cdots
$$

Eventually $t_0-kT<0$, so $h$ is non-zero at negative time, which contradicts causality. **Only $h(t)=0$ is both causal and periodic.**

**2. If the system is stable, can $h(t)$ be periodic?** A non-zero periodic $h$ has some positive area $A$ of $|h|$ in each period. Over infinitely many periods,

$$
\int_{-\infty}^{\infty}|h(t)|\,dt=A+A+A+\cdots=\infty .
$$

**Only $h(t)=0$ is both stable and periodic.**
` + fig("cs-periodic") + r`
## Practice: causal? stable?

**System 1: $h_1(t)=e^{2t}u(-2-t)$.**

- *Support:* $u(-2-t)=1\iff-2-t\ge0\iff t\le-2$. So $h_1$ lives only at $t\le-2$.
- *Causality:* $h_1$ is non-zero before $t=0$, so the system is **not causal**.
- *Stability:*
$$\int_{-\infty}^{\infty}|h_1|\,dt=\int_{-\infty}^{-2}e^{2t}dt=\left[\tfrac12e^{2t}\right]_{-\infty}^{-2}=\tfrac12e^{-4}<\infty ,$$
  so the system **is stable**. The growing exponential only exists far to the left, where it is tiny.

**System 2: $h_2(t)=t\,e^{-t}u(t)$.**

- *Causality:* $u(t)=0$ for $t<0$, so $h_2$ is zero before the impulse: **causal**.
- *Stability:* $\displaystyle\int_0^\infty t\,e^{-t}dt=1<\infty$, so it **is stable**.
` + fig("cs-h1h2") + r`
## Problem: how much delay makes it causal?

Let $x(t)=e^{-2t}u(t+2)$ and $y(t)=x(t-a)$. Find the minimum $a$ so that $y(t)$ is causal (zero for $t<0$).

$x(t)$ starts at $t=-2$. Shifting right by $a$ moves the start to $-2+a$. For causality we need $-2+a\ge0$, so

$$
a\ge2 .
$$
` + fig("cs-delay") + r`
## Quick reference

| $h(t)$ | causal | stable | reason |
|---|---|---|---|
| $e^{-at}u(t)$, $a>0$ | ✓ | ✓ | area $1/a$ |
| $e^{at}u(t)$, $a>0$ | ✓ | ✗ | grows forever |
| $u(t)$ (integrator) | ✓ | ✗ | area $\infty$ |
| $t\,e^{-t}u(t)$ | ✓ | ✓ | area 1 |
| $e^{2t}u(-2-t)$ | ✗ | ✓ | lives at $t\le-2$; area $\frac12e^{-4}$ |
| $\delta(t-t_0)$, $t_0>0$ | ✓ | ✓ | pure delay |
| $\delta(t+1)$ | ✗ | ✓ | pure advance |
| $\frac{\sin Wt}{\pi t}$ (ideal LPF) | ✗ | ✗ | two-sided; $\int\lvert h\rvert=\infty$ |

Later, the Laplace and z-transforms give the same answers from the ROC: causal means the ROC lies to the right of the rightmost pole (outside the outermost pole), and stable means the ROC contains the $j\omega$ axis (the unit circle).

## Exam pointers

- Decide causality and stability **separately**; all four combinations are possible.
- For any $u(c-t)$ or $u(t+c)$ factor, first write down the support of $h$. That settles causality in one line.
- For stability, actually evaluate $\int|h|$ (or $\sum|h|$) and quote the finite value.
`
