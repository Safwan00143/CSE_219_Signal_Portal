const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const fourierSeriesNote = r`
## The big idea

Can we break a complicated periodic signal into simple sine and cosine waves? **Yes, always** (for any reasonable signal).

$$
\text{complicated periodic signal}=\text{sum of simple periodic waves}.
$$
` + fig("fs-decompose") + r`
### Why this is useful

1. Some problems are easy for simple waves: a sine-shaped vibration on a string, or a sinusoidal temperature pattern in a metal rod, evolves in a simple, predictable way.
2. Real initial shapes are not simple: a string can be plucked into a strange shape, and a rod can start with an arbitrary heat pattern.
3. Fourier series is the bridge: **break** the random shape into simple waves, **solve** each simple wave on its own, then **add** the answers back together.

This was exactly Fourier's problem: how heat spreads in a solid. The same strategy later powered audio, images, communications and almost all of signal processing.

## Which frequencies are allowed?

### The bell analogy

Bell A rings every 2 minutes, bell B every 3, bell C every 5. Together the pattern repeats after $\operatorname{lcm}(2,3,5)=30$ minutes.
` + fig("fs-bells") + r`
Look at the same story in frequency. Periods of 2, 3, 5 minutes are frequencies of 30, 20, 12 rings per hour. The combined pattern repeats every 30 minutes, i.e. at $f_0=2$ times per hour, and

$$
30=15f_0,\qquad 20=10f_0,\qquad 12=6f_0 .
$$

> Every component frequency of a periodic signal is a **whole multiple** of the signal's own (fundamental) frequency.

### Harmonics

A signal with period $T$ has **fundamental frequency**

$$
\omega_0=\frac{2\pi}{T}.
$$

The only building blocks that repeat with period $T$ are those at the frequencies $k\omega_0$, $k\in\mathbb Z$:

$$
\dots,\ -2\omega_0,\ -\omega_0,\ 0,\ \omega_0,\ 2\omega_0,\ \dots
$$
` + fig("fs-harmonics") + r`
### Complex exponentials instead of sines and cosines

Instead of separate sines and cosines we use complex exponentials, which package both (Euler):

$$
e^{j\omega_0t}=\cos\omega_0t+j\sin\omega_0t .
$$

Negative $k$ rotate backward, positive $k$ rotate forward, $k=0$ is the constant part.

## The Fourier series

$$
\boxed{\,x(t)=\sum_{k=-\infty}^{\infty}a_k\,e^{jk\omega_0t}\,}\qquad\text{(synthesis)}
$$

- $e^{jk\omega_0t}$ is the $k$-th simple wave (the $k$-th harmonic);
- $a_k$ says **how much** of that wave is present. $a_k=0$ means the frequency is absent.

**Example.** $\cos\omega_0t=\frac12e^{j\omega_0t}+\frac12e^{-j\omega_0t}$, so $a_1=a_{-1}=\frac12$ and every other $a_k$ is $0$. Only $\pm\omega_0$ are present.
` + fig("fs-cos-lines") + r`
## Finding the coefficients

### A detour: averaging a rotating exponential

Over one full period, a rotating exponential goes all the way round and its average is $0$. A non-rotating constant keeps its value:

$$
\frac1T\int_T e^{jk\omega_0t}\,dt=\begin{cases}1,&k=0\\0,&k\neq0\end{cases}
$$
` + fig("fs-average") + r`
### Finding $a_0$: just take the average

$$
x(t)=\cdots+a_{-1}e^{-j\omega_0t}+a_0+a_1e^{j\omega_0t}+a_2e^{j2\omega_0t}+\cdots
$$

Every term averages to $0$ except the constant $a_0$, which survives:

$$
a_0=\frac1T\int_T x(t)\,dt .
$$

$a_0$ is the **average (DC) value** of the signal.

### Finding $a_1$: make it stop rotating

Multiply the whole series by $e^{-j\omega_0t}$. Every term's frequency drops by one step:

$$
x(t)e^{-j\omega_0t}=\cdots+a_{-1}e^{-j2\omega_0t}+a_0e^{-j\omega_0t}+a_1+a_2e^{j\omega_0t}+\cdots
$$

Now $a_1$ is the non-rotating term, so averaging extracts it:

$$
a_1=\frac1T\int_T x(t)e^{-j\omega_0t}\,dt .
$$

### The general rule

Multiply by $e^{-jk\omega_0t}$ to **move the wanted coefficient to zero frequency**, then average. Everything else keeps rotating and averages away.
` + fig("fs-shift-to-zero") + r`
$$
\boxed{\,a_k=\frac1T\int_T x(t)\,e^{-jk\omega_0t}\,dt,\qquad k=0,\pm1,\pm2,\dots,\quad\omega_0=\frac{2\pi}{T}\,}\qquad\text{(analysis)}
$$

The integral can be taken over **any one full period** $[t_0,t_0+T]$, since the integrand repeats every $T$.

## Worked examples

### Example 1: no integration needed

$$
x(t)=1+\sin\omega_0t+2\cos\omega_0t+\cos\!\left(2\omega_0t+\frac\pi4\right),\qquad T_0=\frac{2\pi}{\omega_0}.
$$
` + fig("fs-example-signal") + r`
The Fourier components are already visible; use $\sin\theta=\frac{e^{j\theta}-e^{-j\theta}}{2j}$ and $\cos\theta=\frac{e^{j\theta}+e^{-j\theta}}{2}$.

**Frequencies $\pm\omega_0$:**

$$
\sin\omega_0t+2\cos\omega_0t=\frac{e^{j\omega_0t}-e^{-j\omega_0t}}{2j}+e^{j\omega_0t}+e^{-j\omega_0t}=\left(1+\frac1{2j}\right)e^{j\omega_0t}+\left(1-\frac1{2j}\right)e^{-j\omega_0t}.
$$

Since $\frac1{2j}=-\frac j2$: $a_1=1-\frac j2$ and $a_{-1}=1+\frac j2$.

**Frequencies $\pm2\omega_0$:**

$$
\cos\!\left(2\omega_0t+\tfrac\pi4\right)=\tfrac12e^{j\pi/4}e^{j2\omega_0t}+\tfrac12e^{-j\pi/4}e^{-j2\omega_0t},
$$

so $a_2=\frac12e^{j\pi/4}=\frac{\sqrt2}{4}(1+j)$ and $a_{-2}=\frac{\sqrt2}{4}(1-j)$.

**Constant:** $a_0=1$.

| $k$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|---|
| $a_k$ | $\frac{\sqrt2}{4}(1-j)$ | $1+\frac j2$ | $1$ | $1-\frac j2$ | $\frac{\sqrt2}{4}(1+j)$ |
| $\lvert a_k\rvert$ | $\frac12$ | $\frac{\sqrt5}{2}$ | $1$ | $\frac{\sqrt5}2$ | $\frac12$ |
| $\angle a_k$ | $-\frac\pi4$ | $\tan^{-1}\frac12$ | $0$ | $-\tan^{-1}\frac12$ | $\frac\pi4$ |
` + fig("fs-example-spectrum") + r`
The magnitude spectrum is even and the phase spectrum is odd. That is always true for real signals (see below).

### Example 2: the periodic square wave

$$
x(t)=\begin{cases}1,&|t|<T_1\\0,&T_1<|t|<T/2\end{cases},\qquad x(t+T)=x(t),\qquad\omega_0=\frac{2\pi}T .
$$
` + fig("fs-square") + r`
Choose the period $-T/2<t<T/2$. Outside $-T_1<t<T_1$ the signal is zero, so

$$
a_k=\frac1T\int_{-T_1}^{T_1}e^{-jk\omega_0t}\,dt .
$$

**For $k\neq0$:**

$$
a_k=\frac1T\left[\frac{e^{-jk\omega_0t}}{-jk\omega_0}\right]_{-T_1}^{T_1}=\frac{2}{Tk\omega_0}\cdot\frac{e^{jk\omega_0T_1}-e^{-jk\omega_0T_1}}{2j}=\frac{2\sin(k\omega_0T_1)}{Tk\omega_0}=\frac{\sin(k\omega_0T_1)}{k\pi}.
$$

**For $k=0$:** just the average value, (time spent at height 1) / (period):

$$
a_0=\frac1T\int_{-T_1}^{T_1}1\,dt=\frac{2T_1}{T}.
$$

**When $T_1=T/4$** (50% duty cycle): $a_0=\frac12$ and $a_k=\dfrac{\sin(k\pi/2)}{k\pi}$:

| $k$ | 0 | ±1 | ±2 | ±3 | ±4 | ±5 |
|---|---|---|---|---|---|---|
| $a_k$ | $\frac12$ | $\frac1\pi$ | 0 | $-\frac1{3\pi}$ | 0 | $\frac1{5\pi}$ |
` + fig("fs-square-coeffs") + r`
> The coefficients are samples of a smooth sinc-shaped envelope. This is our first glimpse of the Fourier transform: the envelope belongs to the single pulse, and the period only decides where it is sampled.

### Example 3: a repeated triangular ramp

$$
x(t)=\begin{cases}t,&0\le t<1\\ \dfrac{3-t}{2},&1\le t<3\end{cases},\qquad x(t+3)=x(t),\qquad\omega_0=\frac{2\pi}3 .
$$
` + fig("fs-ramp") + r`
**$a_0$ — the average height.**

$$
a_0=\frac13\left[\int_0^1t\,dt+\int_1^3\frac{3-t}2\,dt\right]=\frac13\left[\frac12+1\right]=\frac12 .
$$

Geometrically: one period contains a triangle of area $\frac12\cdot3\cdot1=\frac32$, and $\frac{3/2}{3}=\frac12$.

**$a_k$ for $k\neq0$.** Split the integral and integrate each piece by parts. Write $s=jk\omega_0$ for short, and use $e^{-3s}=e^{-j2\pi k}=1$:

$$
\int_0^1t\,e^{-st}dt=-\frac{e^{-s}}{s}+\frac{1-e^{-s}}{s^2},\qquad
\int_1^3\frac{3-t}2\,e^{-st}dt=\frac{e^{-s}}{s}+\frac{1-e^{-s}}{2s^2}.
$$

The $\frac{e^{-s}}{s}$ terms cancel:

$$
a_k=\frac13\cdot\frac32\cdot\frac{1-e^{-s}}{s^2}=\frac{1-e^{-jk\omega_0}}{2(jk\omega_0)^2}.
$$

Since $(jk\omega_0)^2=-k^2\omega_0^2$:

$$
\boxed{\,a_0=\frac12,\qquad a_k=\frac{e^{-jk\omega_0}-1}{2k^2\omega_0^2}\ \ (k\neq0),\qquad\omega_0=\frac{2\pi}3\,}
$$

*Note on the slides:* the slide's second integral is written as $\frac{e^{-jk\omega_0}-e^{-j3k\omega_0}}{2(jk\omega_0)^2}$, which has the wrong sign. With that slip the final answer comes out as $\frac{e^{-jk\omega_0}-1}{6k^2\omega_0^2}$, three times too small. Evaluating the integral numerically confirms the result above (for $k=1$: $a_1\approx-0.171-0.099j$).

## A beautiful intuition: coordinates

A point in the plane is described by coordinates: $(3,2)$ means "3 steps along $x$, 2 steps along $y$". Functions can have coordinates too.

- All functions $f(t)=a+bt$ have coordinates $(a,b)$ along the "axes" $1$ and $t$. So $3+2t\leftrightarrow(3,2)$.
- With more axes $1,t,t^2,t^3,\dots$ we describe more complicated functions: $e^t=1+t+\frac{t^2}{2!}+\frac{t^3}{3!}+\cdots$ has coordinates $\left(1,1,\frac1{2!},\frac1{3!},\dots\right)$.
- **The Fourier series simply chooses different axes:** $\dots,e^{-j\omega_0t},1,e^{j\omega_0t},e^{j2\omega_0t},\dots$. In these coordinates, $\cos\omega_0t$ has only two non-zero coordinates, $\frac12$ at $k=\pm1$.

To find a coordinate of a vector we **project**: $v\cdot u$. For signals, the dot product is an average over one period,

$$
\langle x,z\rangle=\frac1T\int_T x(t)\,z^*(t)\,dt,
$$

and projecting onto the $k$-th axis $z(t)=e^{jk\omega_0t}$ (so $z^*=e^{-jk\omega_0t}$) gives exactly the coefficient formula. **A Fourier coefficient is a projection.** Orthogonality of the axes is what makes every other harmonic average to zero.

## Symmetry shortcuts

Write $e^{-jk\omega_0t}=\cos k\omega_0t-j\sin k\omega_0t$:

$$
a_k=\frac1T\int_{-T/2}^{T/2}x(t)\cos k\omega_0t\,dt-\frac jT\int_{-T/2}^{T/2}x(t)\sin k\omega_0t\,dt .
$$

Over a symmetric interval, an odd integrand integrates to zero. For a **real** signal:

| signal | coefficients | half-period formula |
|---|---|---|
| real | $a_{-k}=a_k^*$, so $\lvert a_k\rvert$ even and $\angle a_k$ odd | — |
| real and **even** | **real** and even | $a_k=\frac2T\int_0^{T/2}x(t)\cos k\omega_0t\,dt$ |
| real and **odd** | **purely imaginary** and odd; $a_0=0$ | $a_k=-\frac{2j}{T}\int_0^{T/2}x(t)\sin k\omega_0t\,dt$ |

- $\cos\omega_0t$ (even): $a_{\pm1}=\frac12$, real. $\sin\omega_0t$ (odd): $a_1=-\frac j2$, $a_{-1}=\frac j2$, imaginary.
- **Trigonometric form** for real signals: $x(t)=a_0+2\sum_{k\ge1}|a_k|\cos(k\omega_0t+\angle a_k)$.

## Convergence: the Dirichlet conditions

The series converges to $x(t)$ wherever $x$ is continuous, and to the midpoint of each jump, if over one period:

1. $x$ is absolutely integrable: $\int_T|x(t)|\,dt<\infty$;
2. $x$ has a finite number of maxima and minima;
3. $x$ has a finite number of discontinuities, each finite.

Near a jump the partial sums overshoot by about 9%, however many terms are used. This is the **Gibbs phenomenon**.
` + fig("fs-gibbs", "fs-interactive-gibbs") + r`
## Properties of Fourier series

Finding $a_k$ directly needs an integral. **Properties let us reuse a series we already know**: shift a signal, scale it, add it, differentiate it, and simply transfer the coefficients. Underneath, every operation on $x(t)$ is really an operation on each little wave $a_ke^{jk\omega_0t}$.

Throughout, $x(t)\leftrightarrow a_k$ and $y(t)\leftrightarrow b_k$, both with period $T$.

### Linearity

If both signals have the same period, their Fourier axes line up exactly, so the ingredients simply add:

$$
x(t)+y(t)=\sum_k(a_k+b_k)e^{jk\omega_0t}\qquad\Longrightarrow\qquad Ax(t)+By(t)\leftrightarrow Aa_k+Bb_k .
$$

### Time shifting

Does delaying a signal change its frequencies? No. Shift every simple wave underneath:

$$
x(t-t_0)=\sum_k a_ke^{jk\omega_0(t-t_0)}=\sum_k\underbrace{a_ke^{-jk\omega_0t_0}}_{\text{new coefficient}}e^{jk\omega_0t}
\qquad\Longrightarrow\qquad x(t-t_0)\leftrightarrow a_k\,e^{-jk\omega_0t_0}.
$$

Multiplying by $e^{j\phi}$ keeps the radius and rotates the angle by $\phi$. So:

- **magnitude unchanged**: $|e^{-jk\omega_0t_0}|=1$;
- **phase shifted** by $-k\omega_0t_0$: higher harmonics rotate more, because their frequency is $k\omega_0$.

*A delay in time becomes a phase shift in frequency.* Example: $x(t-3)\leftrightarrow a_ke^{-j3k\omega_0}$.

### Time reversal

$$
x(-t)=\sum_ka_ke^{jk\omega_0(-t)}=\sum_ka_ke^{j(-k)\omega_0t}\qquad\Longrightarrow\qquad x(-t)\leftrightarrow a_{-k}.
$$

The term that lived at $+k\omega_0$ now lives at $-k\omega_0$: playing the rotation backwards flips its direction. *Reversal in time is index reversal in frequency.*

**Problem.** Find the coefficients of $x(4-t)+y(t-3)$.

- $x(t+4)\leftrightarrow a_ke^{j4k\omega_0}$ (shift), then reverse: $x(-t+4)\leftrightarrow a_{-k}e^{-j4k\omega_0}$.
- $y(t-3)\leftrightarrow b_ke^{-j3k\omega_0}$.

$$
x(4-t)+y(t-3)\ \leftrightarrow\ a_{-k}e^{-j4k\omega_0}+b_ke^{-j3k\omega_0}.
$$

### Time scaling

Here the frequencies themselves change. Compressing time makes every hidden wave rotate faster:

$$
x(\alpha t)=\sum_ka_ke^{jk(\alpha\omega_0)t}\qquad\Longrightarrow\qquad x(\alpha t)\leftrightarrow a_k\ \text{ with new fundamental } \alpha\omega_0\ (\alpha>0).
$$

The coefficient sequence is the same; only the frequency ruler changes.
` + fig("fs-scaling-views") + r`
**Practice.** Coefficients of $p(t)=x(4-3t)$: shift left by 4, reverse, then compress by 3.

$$
x(t+4)\leftrightarrow a_ke^{j4k\omega_0},\quad x(4-t)\leftrightarrow a_{-k}e^{-j4k\omega_0},\quad x(4-3t)\leftrightarrow a_{-k}e^{-j4k\omega_0}\ \text{ with }\ \omega_0'=3\omega_0 .
$$

### Differentiation

Every little wave gets differentiated: $\frac{d}{dt}e^{jk\omega_0t}=jk\omega_0e^{jk\omega_0t}$, so

$$
\frac{dx}{dt}\leftrightarrow jk\omega_0\,a_k .
$$

*Why $jk\omega_0$?* Think of $a_ke^{jk\omega_0t}$ as a point moving on a circle of radius $|a_k|$ at angular speed $k\omega_0$. Its velocity has size $|k\omega_0|\,|a_k|$ (speed = radius × angular speed), and it points **tangent** to the circle, a 90° turn from the position. Multiplying by $j$ is exactly a 90° turn.

**Problem.** Coefficients of $\frac{d}{dt}x(4-3t)$: from the practice above, $x(4-3t)\leftrightarrow a_{-k}e^{-j4k\omega_0}$ with $\omega_0'=3\omega_0$. Differentiating multiplies by $jk\omega_0'$:

$$
\frac{d}{dt}x(4-3t)\ \leftrightarrow\ j3k\omega_0\,a_{-k}e^{-j4k\omega_0}.
$$

### Drawing derivatives of signals

For smooth parts, the derivative is the slope. At a jump, the derivative contains an impulse: a jump of height $A$ at $t_0$ contributes $A\,\delta(t-t_0)$. So

$$
\frac{dx}{dt}=\text{(slope between jumps)}+\text{(impulses at jumps)}.
$$
` + fig("fs-derivative-sketch") + r`
### A detour: the impulse as a value-picker

$$
\sum_{n=-\infty}^{\infty}x[n]\,\delta[n-a]=x[a],\qquad\int_{-\infty}^{\infty}x(t)\,\delta(t-a)\,dt=x(a).
$$

The impulse is zero everywhere except at $a$, so only one value survives. **But the impulse must be inside the integration window:**

$$
\int_L^R x(t)\,\delta(t-a)\,dt=\begin{cases}x(a),&L<a<R\\0,&a\notin[L,R]\end{cases}
$$
` + fig("fs-sift") + r`
**Practice** with $x(t)=e^t$:

- $\int_{-\infty}^{\infty}e^t\delta(t)\,dt=e^0=1$;
- $\int_{1}^{\infty}e^t\delta(t)\,dt=0$, because the impulse at $t=0$ is outside the interval;
- $\int_{-5}^{5}e^t[\delta(t+1)+2\delta(t-2)]\,dt=e^{-1}+2e^2$.

### Fourier series of an impulse train

$$
x(t)=\sum_{m=-\infty}^{\infty}\delta(t-mT).
$$

Choose the period $-\frac T2<t<\frac T2$, which contains exactly one impulse, $\delta(t)$. By sifting:

$$
a_k=\frac1T\int_{-T/2}^{T/2}\delta(t)e^{-jk\omega_0t}\,dt=\frac1Te^{0}=\frac1T\quad\text{for every }k.
$$

The coefficient sequence is flat. As a line spectrum in $\omega$, the lines sit at $k\omega_0$: **a train remains a train.** This result is the key to the sampling theorem.
` + fig("fs-impulse-train") + r`
### Checking the differentiation property on the rectangular pulse

The periodic rectangular pulse has $a_0=\frac{2T_1}T$ and $a_k=\frac{\sin k\omega_0T_1}{k\pi}$. Its derivative has a $+\delta$ at every rising edge and a $-\delta$ at every falling edge; in one period,

$$
\frac{dx}{dt}=\delta(t+T_1)-\delta(t-T_1).
$$
` + fig("fs-rect-derivative") + r`
*Direct calculation* by sifting, calling the coefficients $b_k$:

$$
b_k=\frac1T\int_{-T/2}^{T/2}[\delta(t+T_1)-\delta(t-T_1)]e^{-jk\omega_0t}dt=\frac1T\left(e^{jk\omega_0T_1}-e^{-jk\omega_0T_1}\right)=\frac{2j}{T}\sin k\omega_0T_1 .
$$

*From the property:* $jk\omega_0a_k=jk\omega_0\dfrac{\sin k\omega_0T_1}{k\pi}=\dfrac{j\omega_0}{\pi}\sin k\omega_0T_1=\dfrac{2j}T\sin k\omega_0T_1$ (using $\omega_0=2\pi/T$). **Perfect match**, and it also gives $b_0=0$, as it must: a derivative of a periodic signal has no average.

### Integration

Integration reverses differentiation, so it should divide by the same factor:

$$
\int x(t)\,dt\ \leftrightarrow\ \frac{a_k}{jk\omega_0},\qquad k\neq0 .
$$

**Warning:** integration cannot recover the constant term, since $\frac{d}{dt}(x+C)=\frac{dx}{dt}$. The coefficient $a_0$ must be found separately (it is the average value). The series of $\int x\,dt$ is periodic only if $a_0=0$ for the original $x$.

**Problem: the sawtooth.** $x(t)=t$ for $0\le t<1$, period 1 (so $\omega_0=2\pi$).
` + fig("fs-sawtooth") + r`
Between jumps the slope is 1, and at each integer the signal drops by 1:

$$
y(t)=\frac{dx}{dt}=1-\sum_m\delta(t-m).
$$

- The constant 1 has coefficient 1 at $k=0$ only.
- The impulse train has coefficient $\frac1T=1$ for every $k$.

So $b_0=1-1=0$ and $b_k=-1$ for $k\neq0$. Integrate back: $a_k=\dfrac{b_k}{jk\omega_0}=\dfrac{-1}{j2\pi k}=\dfrac{j}{2\pi k}$. And $a_0$ is the average, $\int_0^1t\,dt=\frac12$:

$$
a_0=\frac12,\qquad a_k=\frac{j}{2\pi k}\ \ (k\neq0).
$$

### Multiplication: convolution returns

What about $x(t)y(t)$? Multiply the two series:

$$
x(t)y(t)=\sum_pa_pe^{jp\omega_0t}\sum_qb_qe^{jq\omega_0t}.
$$

With $z=e^{j\omega_0t}$ this is just multiplying two polynomials. A product $a_pb_q\,e^{j(p+q)\omega_0t}$ contributes to harmonic $k$ when $p+q=k$, i.e. $q=k-p$:

$$
x(t)y(t)\ \leftrightarrow\ c_k=\sum_{p=-\infty}^{\infty}a_p\,b_{k-p}=(a*b)_k .
$$

*Multiplication in time becomes convolution in frequency.*

**Practice.** $x(t)=1+\cos\omega_0t$ has $a_{-1}=\frac12$, $a_0=1$, $a_1=\frac12$. Find the coefficients of $p(t)=x^2(t)$.

Convolve $\{\frac12,1,\frac12\}$ with itself:

| $k$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|---|
| $c_k$ | $\frac14$ | $1$ | $\frac32$ | $1$ | $\frac14$ |
` + fig("fs-square-signal") + r`
*Check with trigonometry:* $(1+\cos\omega_0t)^2=1+2\cos\omega_0t+\cos^2\omega_0t=\frac32+2\cos\omega_0t+\frac12\cos2\omega_0t$, so $c_0=\frac32$, $c_{\pm1}=1$, $c_{\pm2}=\frac14$. ✓

### Parseval's relation

$$
\frac1T\int_T|x(t)|^2dt=\sum_{k=-\infty}^{\infty}|a_k|^2 .
$$

The average power of the signal equals the sum of the powers in its harmonics.

### Property table

| property | signal | coefficients |
|---|---|---|
| linearity | $Ax(t)+By(t)$ | $Aa_k+Bb_k$ |
| time shift | $x(t-t_0)$ | $a_ke^{-jk\omega_0t_0}$ |
| frequency shift | $e^{jM\omega_0t}x(t)$ | $a_{k-M}$ |
| time reversal | $x(-t)$ | $a_{-k}$ |
| time scaling | $x(\alpha t)$, $\alpha>0$ | $a_k$, with fundamental $\alpha\omega_0$ |
| conjugation | $x^*(t)$ | $a_{-k}^*$ |
| differentiation | $\frac{dx}{dt}$ | $jk\omega_0a_k$ |
| integration | $\int x\,dt$ ($a_0=0$) | $\frac{a_k}{jk\omega_0}$ |
| multiplication | $x(t)y(t)$ | $\sum_pa_pb_{k-p}$ |
| periodic convolution | $\int_Tx(\tau)y(t-\tau)d\tau$ | $T\,a_kb_k$ |
| real signal | $x$ real | $a_{-k}=a_k^*$ |
| Parseval | $\frac1T\int_T\lvert x\rvert^2$ | $\sum\lvert a_k\rvert^2$ |

## Exam pointers

- For sums of sinusoids, read the coefficients off Euler's formulas; do not integrate.
- To decide whether a signal given by its series is real or even: real needs $a_{-k}=a_k^*$, even needs $a_{-k}=a_k$. A series with only $k\ge0$ terms (and some $a_k\ne0$ for $k>0$) is never real.
- "Do we need a full cycle?" In general yes (orthogonality); with even or odd symmetry, half a cycle doubled is enough.
- Use the derivative trick for piecewise-linear signals: differentiate until you get impulses (whose coefficients are easy by sifting), divide by $jk\omega_0$, and find $a_0$ separately.
`
