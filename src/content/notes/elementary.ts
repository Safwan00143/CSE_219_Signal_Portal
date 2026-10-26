const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const elementaryNote = r`
## Why these signals?

A handful of simple signals appear everywhere in this course. The **unit step** and **unit impulse** are the building blocks for describing switches, pulses and systems. **Exponentials** and **sinusoids** are the building blocks for Fourier, Laplace and z-transforms. Learn their shapes and how they relate, and most later derivations become one-liners.

## The discrete unit step

$$
u[n]=\begin{cases}0,&n<0\\1,&n\ge0\end{cases}
$$

It is "off" for negative $n$ and switches "on" at $n=0$, staying on forever. Note that $u[0]=1$.

## The discrete unit impulse

$$
\delta[n]=\begin{cases}1,&n=0\\0,&n\ne0\end{cases}
$$

It is non-zero at exactly one instant, the origin. Think of it as a single tap: the simplest possible input.
` + fig("el-step-impulse") + r`
**Quick values.** $u[1]=1$, $u[-3]=0$, $u[0]=1$; $\delta[0]=1$, $\delta[4]=0$, $\delta[-2]=0$.

### Shifted steps and impulses

The rules of time shifting from the previous topic apply directly:

- $u[n-2]$ switches on at $n=2$ (delay by 2); $u[n+3]$ switches on at $n=-3$ (advance by 3).
- $\delta[n-2]$ is a single 1 at $n=2$; $\delta[n+3]$ is a single 1 at $n=-3$.

In general, $\delta[n-k]$ is $1$ exactly where $n=k$.
` + fig("el-shifted") + r`
## Three relations between step and impulse

### R1 — the impulse is the first difference of the step

$$
\delta[n]=u[n]-u[n-1]
$$

Subtract the step delayed by one sample from the step itself. For $n\ge1$ both are 1 and cancel; for $n<0$ both are 0. Only at $n=0$ do we get $1-0=1$.
` + fig("el-first-diff") + r`
### R2 — the running sum of the impulse is the step

$$
u[n]=\sum_{m=-\infty}^{n}\delta[m]
$$

The running sum adds every value of $\delta[m]$ from $-\infty$ up to $m=n$. The only non-zero value of $\delta[m]$ is at $m=0$, so the question is simply: **is the spike inside the window?**

- If $n<0$, the window stops before $m=0$: the sum is $0$.
- If $n\ge0$, the window includes $m=0$: the sum is $1$.

That is exactly $u[n]$.
` + fig("el-running-sum") + r`
### R3 — delayed impulses build the step

$$
u[n]=\delta[n]+\delta[n-1]+\delta[n-2]+\cdots=\sum_{k=0}^{\infty}\delta[n-k]
$$

Each delayed impulse $\delta[n-k]$ contributes exactly one sample, a 1 at $n=k$. Adding them for $k=0,1,2,\dots$ puts a 1 at every $n\ge0$.
` + fig("el-delayed-impulses") + r`
> R1 and R2 are the discrete versions of "differentiate" and "integrate". The first difference undoes the running sum, just as $\frac{d}{dt}$ undoes $\int$.

## The continuous unit step

$$
u(t)=\begin{cases}0,&t<0\\1,&t>0\end{cases}
$$

It jumps from 0 to 1 at $t=0$. The value exactly at $t=0$ is usually left undefined (or set to ½); it never matters in our operations.
` + fig("el-ut") + r`
## The continuous unit impulse

In discrete time we had $\delta[n]=u[n]-u[n-1]$, a difference. In continuous time we want the analogous idea, a derivative:

$$
\delta(t)=\frac{du(t)}{dt}.
$$

**But there is a problem.** Away from $t=0$ the step is flat, so its derivative is 0. At $t=0$ it jumps instantly, and the ordinary derivative does not exist there.

### The fix: smooth the jump first

Replace the instant jump by a short ramp that rises from 0 to 1 over a tiny interval $\Delta$:

$$
u_\Delta(t)=\begin{cases}0,&t<0\\ t/\Delta,&0\le t\le\Delta\\ 1,&t>\Delta\end{cases}
\qquad\Rightarrow\qquad
\delta_\Delta(t)=\frac{du_\Delta}{dt}=\begin{cases}1/\Delta,&0<t<\Delta\\0,&\text{otherwise}\end{cases}
$$
` + fig("el-smoothed") + r`
The derivative is a rectangular pulse of height $1/\Delta$ and width $\Delta$. Its **area is always**

$$
\int_{-\infty}^{\infty}\delta_\Delta(t)\,dt=\frac1\Delta\cdot\Delta=1 .
$$

### Make the ramp steeper

As $\Delta$ shrinks, the ramp becomes steeper and the pulse becomes **taller and narrower**, but its area stays exactly 1. The area is the quantity that survives.
` + fig("el-narrowing") + r`
The **ideal impulse** $\delta(t)$ is the limit of this infinitely narrow, infinitely tall pulse of unit area:

$$
\delta(t)=0\ \ (t\ne0),\qquad\int_{-\infty}^{\infty}\delta(t)\,dt=1,
$$

$$
\delta(t)=\frac{du(t)}{dt},\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)\,d\tau .
$$

### Drawing impulses

An impulse is drawn as an **arrow**. The arrow's height is not a value; the **number beside it is the area (strength)**. $2\delta(t-1)$ is an impulse of strength 2 at $t=1$; $-3\delta(t-3)$ points downward with strength 3 at $t=3$.
` + fig("el-arrows") + r`
### Example: differentiating $2u(t)$

$$
\frac{d}{dt}\,2u(t)=2\delta(t).
$$

A jump of height 2 becomes an impulse of area 2.
` + fig("el-2u") + r`
### Example: a signal with several jumps

Read the jumps of the signal below from left to right:

| at | from → to | jump |
|---|---|---|
| $t=1$ | $0\to2$ | $+2$ |
| $t=2$ | $2\to-1$ | $-3$ |
| $t=4$ | $-1\to1$ | $+2$ |

Each jump is a scaled, shifted step, so

$$
x(t)=2u(t-1)-3u(t-2)+2u(t-4),\qquad \frac{dx}{dt}=2\delta(t-1)-3\delta(t-2)+2\delta(t-4).
$$
` + fig("el-jumps") + r`
> **Derivative of any piecewise signal** = (slope of each smooth piece) + (an impulse at every jump, with strength equal to the jump: up is positive, down is negative).

## Real exponentials

$$
x(t)=Ce^{at},\qquad C,\ a\ \text{real}.
$$

- $a>0$: **grows** without bound.
- $a=0$: **constant** at $C$.
- $a<0$: **decays** toward 0.

Every curve passes through $C$ at $t=0$.
` + fig("el-exp") + r`
### The step as a switch

Multiplying by $u(t)$ keeps the right side of a signal and removes the left side: $x(t)u(t)=x(t)$ for $t>0$ and $0$ for $t<0$.
` + fig("el-switch") + r`
Shifted and reversed steps choose **where** the signal turns on or off:

- $e^{t}u(-t)$: kept only for $t\le0$.
- $e^{-t}u(t-2)$: turns on at $t=2$, starting from height $e^{-2}$.
- $e^{t}u(3-t)$: kept only for $t\le3$; zero after 3.
- $e^{-t}u(3t)=e^{-t}u(t)$, because $3t$ has the same sign as $t$, so $u(3t)=u(t)$.
` + fig("el-switch-practice") + r`
## Sinusoids

$$
x(t)=A\cos(\omega_0t+\phi)
$$

- $A$ controls the **height** (amplitude).
- $\omega_0$ controls the **speed** of oscillation (rad/s).
- $\phi$ **shifts** the wave (phase).

One full cycle takes the **fundamental period**

$$
T_0=\frac{2\pi}{|\omega_0|}.
$$
` + fig("el-sinusoid") + r`
Larger $|\omega_0|$ means faster oscillation and a shorter period.
` + fig("el-speeds") + r`
## Complex exponentials: a rotating point

Picture a point moving around the unit circle. At angle $\theta=\omega_0t$, its horizontal coordinate is $\cos\omega_0t$ and its vertical coordinate is $\sin\omega_0t$. Both sinusoids are two views of the **same rotation**.
` + fig("el-unit-circle") + r`
**Euler's formula** packages both into one expression:

$$
e^{j\theta}=\cos\theta+j\sin\theta\qquad\Rightarrow\qquad e^{j\omega_0t}=\cos\omega_0t+j\sin\omega_0t .
$$

$$
\operatorname{Re}\{e^{j\omega_0t}\}=\cos\omega_0t,\qquad \operatorname{Im}\{e^{j\omega_0t}\}=\sin\omega_0t .
$$

- $e^{j\omega_0t}$ rotates **counter-clockwise** at speed $\omega_0$.
- $e^{j2\omega_0t}$ rotates twice as fast.
- $e^{-j\omega_0t}$ rotates in the **opposite** direction.

### A real cosine is two opposite rotations

$$
\cos\omega_0t=\tfrac12e^{j\omega_0t}+\tfrac12e^{-j\omega_0t},\qquad \sin\omega_0t=\frac{1}{2j}\left(e^{j\omega_0t}-e^{-j\omega_0t}\right).
$$

Two half-length arrows turn in opposite directions. Their imaginary parts always cancel, so their sum stays on the real axis.
` + fig("el-cos-two") + r`
These two identities are used constantly: they let us read Fourier series coefficients straight off a sinusoid without integrating.

### Periodicity of $e^{j\omega_0t}$

After one full rotation the point is back where it started:

$$
e^{j\omega_0(t+T)}=e^{j\omega_0t}\iff e^{j\omega_0T}=1\iff\omega_0T=2\pi\iff T_0=\frac{2\pi}{|\omega_0|}.
$$

A continuous complex exponential (or sinusoid) is **always** periodic, for any $\omega_0\ne0$.

## Discrete sinusoids and periodicity

In discrete time we only keep the values at integers:

$$
x[n]=\cos(\omega_0n).
$$
` + fig("el-dt-cos") + r`
A discrete signal is periodic with period $N$ if $x[n+N]=x[n]$ for all $n$, **with $N$ a positive integer**. The continuous cosine repeats every $\frac{2\pi}{\omega_0}$, so the samples repeat after any multiple of it that happens to be an integer:

$$
N=m\cdot\frac{2\pi}{\omega_0}\ \text{ must be an integer for some integer } m\iff\frac{\omega_0}{2\pi}=\frac mN\ \text{is rational}.
$$

> **Test.** $\cos(\omega_0 n)$ is periodic **only if** $\dfrac{2\pi}{\omega_0}$ is rational. Write $\dfrac{2\pi}{\omega_0}=\dfrac Nm$ in lowest terms; then $N$ is the fundamental period. The phase does not affect the period.

### Examples

- **$\cos 2t$ is periodic, but $\cos 2n$ is not.** The continuous period is $T_0=\frac{2\pi}{2}=\pi$, which is not an integer, and no integer multiple of $\pi$ is an integer either. The samples never repeat exactly.
- **$\cos\frac{2\pi}{5}n$ repeats every 5 samples.** After $N=5$ samples the angle has increased by $2\pi$.
` + fig("el-cos2n") + r`
- **$3\sin\frac{5}{7}n$ is not periodic.** $\dfrac{2\pi}{\omega_0}=\dfrac{2\pi}{5/7}=\dfrac{14\pi}{5}$, which is irrational, so no integer $N$ works.
- **$2\cos\left(\frac{16\pi}{63}n+\frac\pi3\right)$ has fundamental period 63.** $\dfrac{2\pi}{\omega_0}=\dfrac{2\pi}{16\pi/63}=\dfrac{63}{8}=\dfrac Nm$, so $N=63$ and $m=8$: after 8 cycles of the underlying cosine, the samples land exactly 63 steps later. The phase $\frac\pi3$ plays no part.

## Exam pointers

- Always state $u[0]=1$ and $\delta[0]=1$ explicitly when proving step–impulse relations, and use the "is the spike in the window?" argument for the running sum.
- For $\delta(t)=du/dt$, use the smoothed-ramp argument: pulse of height $1/\Delta$, width $\Delta$, area 1.
- When differentiating piecewise signals, list every jump and turn it into an impulse.
- Discrete periodicity: reduce $\frac{2\pi}{\omega_0}=\frac Nm$ to lowest terms before quoting $N$; an irrational value means "not periodic".
`
