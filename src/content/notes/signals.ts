const r = String.raw

export const signalsNote = r`
## What is a signal?

A **signal** is a pattern of change that carries information. The change can happen over **time** (a voice, a voltage, the speed of a car) or over **space** (the brightness of an image from pixel to pixel).

We write a signal as a function of an independent variable. In this course that variable is almost always called "time", even when it is really position.

## Continuous and discrete signals

There are two kinds of time, and each has its own notation.

- A **continuous-time** signal $x(t)$ has a value at **every** real instant $t$. It is drawn as a smooth, unbroken curve. Examples: a microphone voltage, the temperature in a room, the velocity of a car.
- A **discrete-time** signal $x[n]$ has values only at **integer** instants $n=\dots,-2,-1,0,1,2,\dots$ Between samples there is nothing; the signal is not zero there, it is simply **undefined**. Examples: digital audio samples, a daily temperature log, a weekly stock index.

` + "```fig\nsig-ct-dt\n```" + r`

**Convention.** Round brackets mean continuous time, square brackets mean discrete time.

| | continuous $x(t)$ | discrete $x[n]$ |
|---|---|---|
| allowed values of the variable | any real $t$ | integers $n$ only |
| meaningful | $x(1)$, $x(2)$, $x(0.5)$, $x(\pi)$ | $x[1]$, $x[2]$ |
| meaningless | — | $x[0.5]$, $x[\pi]$ |

Discrete signals often come from **sampling** a continuous one, $x[n]=x(nT_s)$, but they do not have to. A list of numbers is already a discrete signal.

## How big is a signal? Energy

To measure the "size" of a signal, square its values and add them up. Squaring makes negative values count as much as positive ones, and the absolute value lets the same formula work for complex signals.

**Energy over an interval:**

$$
E_{[t_1,t_2]}=\int_{t_1}^{t_2}|x(t)|^2\,dt\qquad\qquad E_{[n_1,n_2]}=\sum_{n=n_1}^{n_2}|x[n]|^2
$$

**Total energy** uses the whole time axis:

$$
E_\infty=\int_{-\infty}^{\infty}|x(t)|^2\,dt\qquad\qquad E_\infty=\sum_{n=-\infty}^{\infty}|x[n]|^2
$$

### Example: one half-sine

$$
x(t)=\begin{cases}\sin t,&0\le t\le\pi\\0,&\text{otherwise}\end{cases}
$$

The signal is non-zero only on $[0,\pi]$, so we only integrate there:

$$
E=\int_0^\pi\sin^2t\,dt=\int_0^\pi\frac{1-\cos 2t}{2}\,dt=\frac{\pi}{2}.
$$

` + "```fig\nsig-half-sine\n```" + r`

### Example: four samples

Let $x[0]=1,\ x[1]=-2,\ x[2]=2,\ x[3]=-1$, and $0$ elsewhere.

$$
E=|1|^2+|-2|^2+|2|^2+|-1|^2=1+4+4+1=10 .
$$

` + "```fig\nsig-discrete-4\n```" + r`

## Power: energy per unit time

**Power** is energy averaged over the interval. Divide the energy by the length of the interval (continuous) or by the number of samples (discrete):

$$
P_{[t_1,t_2]}=\frac{1}{t_2-t_1}\int_{t_1}^{t_2}|x(t)|^2\,dt\qquad\qquad P_{[n_1,n_2]}=\frac{1}{n_2-n_1+1}\sum_{n=n_1}^{n_2}|x[n]|^2
$$

Note the $+1$ in the discrete case: from $n_1$ to $n_2$ there are $n_2-n_1+1$ samples.

**Average power over all time** is the limit as the interval grows:

$$
P_\infty=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2dt\qquad\qquad P_\infty=\lim_{N\to\infty}\frac{1}{2N+1}\sum_{n=-N}^{N}|x[n]|^2
$$

**Back to the examples.**

- Half-sine: $P_{[0,\pi]}=\dfrac{\pi/2}{\pi-0}=\dfrac12$. This is the average squared size over $0\le t\le\pi$.
- Four samples: $P_{[0,3]}=\dfrac{10}{4}=2.5$.

### What if the half-sine repeats forever?

Now the half-sine repeats with period $\pi$: $x(t)=|\sin t|$.

- **Energy:** every period contributes the same $\pi/2$, so $E=\frac\pi2+\frac\pi2+\frac\pi2+\cdots=\infty$.
- **Power:** a periodic signal looks the same in every period, so averaging over one period is enough:
$$P=\frac1\pi\int_0^\pi\sin^2t\,dt=\frac1\pi\cdot\frac\pi2=\frac12 .$$

If instead the lobe is followed by an equal rest, so the period becomes $2\pi$, the energy per period is still $\pi/2$ but it is spread over twice the time:

$$
E=\infty,\qquad P=\frac1{2\pi}\int_0^\pi\sin^2t\,dt=\frac14 .
$$

` + "```fig\nsig-periodic-half-sine\n```" + r`

### Can a signal that never ends have finite energy?

Yes. Consider

$$
x(t)=\begin{cases}1,&|t|\le1\\[2pt] \dfrac1{|t|},&|t|>1\end{cases}
$$

` + "```fig\nsig-inv-t\n```" + r`

$$
E=\int_{-1}^{1}1^2\,dt+2\int_1^\infty\frac{1}{t^2}\,dt=2+2\left[-\frac1t\right]_1^\infty=2+2=4 .
$$

The total energy is finite, and when a finite amount of energy is spread over infinite time, the average power is $P=0$.

### Energy signals and power signals

| class | total energy $E_\infty$ | average power $P_\infty$ | examples |
|---|---|---|---|
| energy signal | finite | $0$ | pulses, the half-sine, $e^{-at}u(t)$, the $1/\lvert t\rvert$ signal |
| power signal | $\infty$ | finite and non-zero | periodic signals, $\cos\omega_0t$, $u(t)$ |
| neither | $\infty$ | $\infty$ | $e^{t}$, $t$ |

> Every periodic signal (other than zero) is a power signal. Its power is the average over **one** period.

## Transforming signals: vertical and horizontal changes

We often need to move, flip or stretch a signal. There are two very different kinds of change:

- **Vertical** (amplitude) changes act on the **value**: $2x(t)$ doubles every value.
- **Horizontal** (time) changes act on the **time axis**: $x(2t)$ makes everything happen twice as fast.

` + "```fig\nsig-vertical-horizontal\n```" + r`

The trick to reading horizontal changes: ask "when does the value that used to occur at $t=a$ now occur?" In $x(2t)$, the value $A=x(a)$ appears when $2t=a$, i.e. at $t=a/2$.

## Time shift

$$
y(t)=x(t-t_0)
$$

For $t_0>0$:

- $x(t-t_0)$ is a **delay**: the signal moves **right** by $t_0$. Every value occurs $t_0$ later.
- $x(t+t_0)$ is an **advance**: the signal moves **left** by $t_0$.

The height and shape do not change at all.

` + "```fig\nsig-shift\n```" + r`

> Why does "minus" move it right? The feature that was at $t=a$ now needs $t-t_0=a$, i.e. $t=a+t_0$: later, so further right.

In discrete time, a shift moves every sample to a new index. $x[n-4]$ is $x[n]$ delayed by four samples. The shift must be an integer.

` + "```fig\nsig-dshift\n```" + r`

## Time reversal

$$
y(t)=x(-t)
$$

Replace $t$ by $-t$. The signal is **mirrored about the vertical axis** $t=0$: a feature at $t=a$ appears at $t=-a$. It is like playing a recording backwards.

` + "```fig\nsig-reverse\n```" + r`

## Time scaling

$$
y(t)=x(at),\qquad a>0
$$

- $a>1$: **compression**. The signal happens faster and becomes narrower. $x(2t)$ is half as wide.
- $0<a<1$: **stretching**. The signal happens slower and becomes wider. $x(t/2)$ is twice as wide.

Scaling changes only the horizontal axis, **not the height**.

` + "```fig\nsig-scaling\n```" + r`

In discrete time scaling is delicate: $x[2n]$ keeps only every other sample (information is lost), and $x[n/2]$ is only defined when $n$ is even.

## Combining transformations

We can combine shifts, reversal and scaling, but **the order matters**. Each operation acts on the **whole** intermediate signal, replacing its time variable.

**Goal: $x(2t+3)$.**

- Shift left by 3: $x(t)\to x(t+3)$.
- Then compress by 2, i.e. replace $t$ by $2t$ in $x(t+3)$: $x(2t+3)$. ✓

**Reverse the order** and you get something else:

- Compress first: $x(t)\to x(2t)$.
- Then shift left by 3, i.e. replace $t$ by $t+3$ in $x(2t)$: $x\big(2(t+3)\big)=x(2t+6)$. ✗

The shift got multiplied by 2.

` + "```fig\nsig-order\n```" + r`

### A safe recipe for $x(\alpha t+\beta)$

1. **Shift first** by $\beta$: $g_1(t)=x(t+\beta)$. If $\beta>0$ shift left; if $\beta<0$ shift right.
2. **Reverse** only if $\alpha<0$: $g_2(t)=g_1(-t)$. Otherwise $g_2=g_1$.
3. **Scale** by $|\alpha|$: $g_3(t)=g_2(|\alpha|t)=x(\alpha t+\beta)$. If $|\alpha|>1$ compress; if $0<|\alpha|<1$ stretch.

Always write the intermediate signal before applying the next step.

### Worked example: $x(-3t+2)$

Start from

$$
x(t)=\begin{cases}1,&0\le t<1\\ 2-t,&1\le t\le2\\ 0,&\text{otherwise}\end{cases}
$$

**Step 1 — shift left by 2.** Replace $t$ by $t+2$; every feature moves 2 units left:

$$
x(t+2)=\begin{cases}1,&-2\le t<-1\\ -t,&-1\le t\le 0\\ 0,&\text{otherwise}\end{cases}
$$

**Step 2 — reverse** (since $\alpha=-3<0$). Replace $t$ by $-t$:

$$
x(-t+2)=\begin{cases}t,&0\le t\le1\\ 1,&1< t\le 2\\ 0,&\text{otherwise}\end{cases}
$$

**Step 3 — compress by 3.** Replace $t$ by $3t$; the signal becomes three times narrower:

$$
x(-3t+2)=\begin{cases}3t,&0\le t\le\frac13\\ 1,&\frac13< t\le\frac23\\ 0,&\text{otherwise}\end{cases}
$$

` + "```fig\nsig-recipe\nsig-interactive-transform\n```" + r`

**Check with a single point.** The corner of $x(t)$ at $t=1$ (where the flat part ends) must appear where $-3t+2=1$, i.e. $t=\frac13$. ✓

### Practice 1

Starting from $x(t)$, how do we obtain $y(t)=x\!\left(3\left(2-\frac t2\right)\right)$?

*Solution.* First simplify the argument: $x\!\left(6-\frac{3t}{2}\right)$. Then:

- shift left by 6: $x(t)\to x(t+6)$;
- reverse: $x(t+6)\to x(-t+6)$;
- compress by $\frac32$: $x(-t+6)\to x\!\left(-\frac32t+6\right)$.

### Practice 2

Start with $y_0(t)=x(t)$ and apply, in this order: stretch by 2, shift left by 3, compress by 4, reverse.

*Solution.* Each step replaces $t$ in the **previous** signal:

$$
y_1(t)=x\!\left(\tfrac t2\right),\quad y_2(t)=y_1(t+3)=x\!\left(\tfrac{t+3}{2}\right),
$$

$$
y_3(t)=y_2(4t)=x\!\left(\tfrac{4t+3}{2}\right)=x\!\left(2t+\tfrac32\right),\quad y_4(t)=y_3(-t)=x\!\left(-2t+\tfrac32\right).
$$

> **Fast check for any combination.** In $x(\alpha t+\beta)$, a feature of $x$ at $t_0$ appears at $t=\dfrac{t_0-\beta}{\alpha}$. Map every corner and jump this way, then join the dots.

## Even and odd signals

- **Even:** $x(-t)=x(t)$. The graph is a mirror image about the vertical axis. Example: $\cos t$.
- **Odd:** $x(-t)=-x(t)$. The graph flips sign across the origin. Example: $\sin t$. An odd signal must have $x(0)=0$, because $x(0)=-x(0)$.

` + "```fig\nsig-even-odd\n```" + r`

Useful facts:

- even × even = even, odd × odd = even, even × odd = odd;
- $\displaystyle\int_{-a}^{a}\text{(odd)}\,dt=0$ and $\displaystyle\int_{-a}^{a}\text{(even)}\,dt=2\int_0^a\text{(even)}\,dt$.

## Every signal has an even part and an odd part

Any signal, even one that is neither even nor odd, can be split as $x=x_e+x_o$ with

$$
x_e(t)=\frac12\big[x(t)+x(-t)\big],\qquad x_o(t)=\frac12\big[x(t)-x(-t)\big].
$$

**Three quick checks** that this works:

1. $x_e$ is even: $x_e(-t)=\frac12[x(-t)+x(t)]=x_e(t)$.
2. $x_o$ is odd: $x_o(-t)=\frac12[x(-t)-x(t)]=-x_o(t)$.
3. They add up: $x_e+x_o=\frac12[x(t)+x(-t)]+\frac12[x(t)-x(-t)]=x(t)$.

### Continuous example

$$
x(t)=\begin{cases}t+1,&-1\le t\le1\\0,&\text{otherwise}\end{cases}
$$

This is neither even nor odd. Reflect it: for $-1\le t\le1$, $x(-t)=-t+1=1-t$.

- **Even part** (add, then average): $x_e(t)=\frac12\big[(t+1)+(1-t)\big]=1$ for $|t|\le1$.
- **Odd part** (subtract, then average): $x_o(t)=\frac12\big[(t+1)-(1-t)\big]=t$ for $|t|\le1$.

` + "```fig\nsig-eo-ct\n```" + r`

### Discrete example: the unit step

$$
x[n]=u[n]=\begin{cases}1,&n\ge0\\0,&n<0\end{cases}\qquad x[-n]=\begin{cases}1,&n\le0\\0,&n>0\end{cases}
$$

$$
x_e[n]=\tfrac12\big(x[n]+x[-n]\big)=\begin{cases}1,&n=0\\ \tfrac12,&n\ne0\end{cases}\qquad
x_o[n]=\tfrac12\big(x[n]-x[-n]\big)=\begin{cases}-\tfrac12,&n<0\\ 0,&n=0\\ \tfrac12,&n>0\end{cases}
$$

` + "```fig\nsig-eo-dt\n```" + r`

**Recipe for piece-wise signals:** write out $x(-t)$ piece by piece, line up the intervals, then add or subtract interval by interval. Check that $x_o(0)=0$ and that $x_e+x_o$ gives back $x$.

## Exam pointers

- For any $x(\alpha t+\beta)$ question, make a small table: interval of the argument → interval of $t$ → expression. State the property used at each step (shift, reversal, scaling).
- Energy or power: first decide whether the integral (or sum) converges. If $E$ is finite, $P=0$; if the signal is periodic, compute $P$ over one period.
- Even–odd decomposition: show $x(-t)$ explicitly, then both formulas, then the checks.
`
