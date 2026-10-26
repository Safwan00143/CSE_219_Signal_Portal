const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const laplaceNote = r`
# Part I — the Laplace transform

## Why generalise the Fourier transform?

A broad class of signals can be written as sums of complex exponentials $e^{j\omega t}$, and these are eigenfunctions of LTI systems: $x(t)=e^{j\omega t}$ gives $y(t)=H(j\omega)e^{j\omega t}$. That is how we expressed both input and output of an LTI system as sums of exponentials.

But the eigenfunction property holds for **any** complex $s=\sigma+j\omega$, not just $s=j\omega$. Using it leads to the Laplace transform, which:

- analyses broad classes of signals and **unstable** systems for which the Fourier transform does not exist;
- gives deeper insight into stability and instability;
- keeps powerful algebraic properties, especially for feedback systems.

## System response to complex exponentials

For an LTI system with impulse response $h(t)$ and input $x(t)=e^{st}$:

$$
y(t)=\int_{-\infty}^{\infty}h(\tau)e^{s(t-\tau)}d\tau=e^{st}\underbrace{\int_{-\infty}^{\infty}h(\tau)e^{-s\tau}d\tau}_{H(s)}=H(s)\,e^{st}.
$$

$e^{st}$ is an eigenfunction and $H(s)$ its eigenvalue. For $s=j\omega$ the integral is the Fourier transform of $h$; for general complex $s$ it is the **Laplace transform** of $h$.

## Definition

$$
\boxed{\,X(s)\triangleq\int_{-\infty}^{\infty}x(t)\,e^{-st}\,dt,\qquad s=\sigma+j\omega\,}\qquad x(t)\xleftrightarrow{\ \mathcal L\ }X(s).
$$

## Connection to the Fourier transform

On the imaginary axis ($s=j\omega$) the Laplace transform **is** the Fourier transform: $X(j\omega)=\int x(t)e^{-j\omega t}dt=\mathcal F\{x(t)\}$. For general $s$:

$$
X(\sigma+j\omega)=\int_{-\infty}^{\infty}\big[x(t)e^{-\sigma t}\big]e^{-j\omega t}dt=\mathcal F\{x(t)e^{-\sigma t}\}.
$$

> **Key insight.** The Laplace transform of $x(t)$ is the Fourier transform of $x(t)e^{-\sigma t}$. The real exponential weight $e^{-\sigma t}$ can force a signal into convergence even when the Fourier transform of $x(t)$ alone does not exist.

## Two examples that look the same

### Example 9.1 — a right-sided exponential

$x(t)=e^{-at}u(t)$:

$$
X(s)=\int_0^\infty e^{-(s+a)t}dt=\left[-\frac{e^{-(s+a)t}}{s+a}\right]_0^\infty .
$$

At the upper limit, $\lim_{t\to\infty}e^{-(\sigma+a)t}e^{-j\omega t}=0$ only if $\sigma+a>0$. So the integral converges for $\operatorname{Re}\{s\}>-a$, and then

$$
X(s)=\frac1{s+a},\qquad\operatorname{Re}\{s\}>-a .
$$
` + fig("lap-ex91") + r`
### Example 9.2 — a left-sided exponential

$x(t)=-e^{-at}u(-t)$:

$$
X(s)=\int_{-\infty}^0-e^{-(s+a)t}dt=\left[\frac{e^{-(s+a)t}}{s+a}\right]_{-\infty}^0 .
$$

For convergence as $t\to-\infty$ the exponential must decay, which needs $\sigma+a<0$. The result is the **same algebraic expression**:

$$
X(s)=\frac1{s+a},\qquad\operatorname{Re}\{s\}<-a .
$$
` + fig("lap-ex92") + r`
## The s-plane and the region of convergence

$X(s)$ depends on the complex variable $s=\sigma+j\omega$, so we picture it on the **s-plane**: horizontal axis $\sigma=\operatorname{Re}\{s\}$, vertical axis $j\omega$.

The **region of convergence (ROC)** is the set of $s$ for which the integral converges to a finite value. Unlike for the Fourier transform, **the ROC is an essential part of the Laplace transform**: Examples 9.1 and 9.2 have the same algebraic $X(s)$ and different ROCs, and they are different signals.

The $j\omega$ axis ($\sigma=0$) corresponds to the Fourier transform. If the ROC includes it, the Fourier transform of the signal converges.
` + fig("lap-splane") + r`
## Rational transforms: poles and zeros

Many important signals and systems have **rational** transforms, ratios of two polynomials:

$$
X(s)=\frac{N(s)}{D(s)}.
$$

- **Zeros** are the roots of $N(s)$, where $X(s)=0$. Marked ○.
- **Poles** are the roots of $D(s)$, where $X(s)\to\infty$. Marked ×.

### Example 9.3 — sum of two exponentials

$x(t)=3e^{-2t}u(t)-2e^{-t}u(t)$. By linearity and Example 9.1:

$$
3e^{-2t}u(t)\leftrightarrow\frac3{s+2}\ (\operatorname{Re}\{s\}>-2),\qquad -2e^{-t}u(t)\leftrightarrow\frac{-2}{s+1}\ (\operatorname{Re}\{s\}>-1),
$$

$$
X(s)=\frac3{s+2}-\frac2{s+1}=\frac{s-1}{(s+1)(s+2)},\qquad\operatorname{Re}\{s\}>-1 .
$$

The ROC is the intersection, bounded by the rightmost pole. Zero at $s=1$, poles at $-1,-2$.
` + fig("lap-ex93") + r`
### Example 9.4 — decay with oscillation

$x(t)=e^{-2t}u(t)+e^{-t}(\cos3t)u(t)$. Expand the cosine with Euler:

$$
x(t)=e^{-2t}u(t)+\tfrac12e^{-(1-3j)t}u(t)+\tfrac12e^{-(1+3j)t}u(t).
$$

$$
X(s)=\frac1{s+2}+\frac{1/2}{s+(1-3j)}+\frac{1/2}{s+(1+3j)}=\frac{2s^2+5s+12}{(s+2)(s^2+2s+10)},\qquad\operatorname{Re}\{s\}>-1 .
$$

Poles at $-2$ and $-1\pm3j$; zeros at $s\approx-1.25\pm2.11j$.
` + fig("lap-ex94") + r`
### Example 9.5 — a signal with an impulse

$x(t)=\delta(t)-\frac43e^{-t}u(t)+\frac13e^{2t}u(t)$. The impulse converges everywhere: $\mathcal L\{\delta(t)\}=\int\delta(t)e^{-st}dt=1$.

$$
X(s)=1-\frac{4/3}{s+1}+\frac{1/3}{s-2}=\frac{3s^2-6s+3}{3(s+1)(s-2)}=\frac{(s-1)^2}{(s+1)(s-2)},\qquad\operatorname{Re}\{s\}>2 .
$$

The ROC is the intersection of "all $s$", $\operatorname{Re}\{s\}>-1$ and $\operatorname{Re}\{s\}>2$.
` + fig("lap-ex95") + r`
# Part II — properties of the ROC

## Properties 1 and 2

**Property 1.** The ROC consists of **strips parallel to the $j\omega$ axis**. *Why:* convergence requires $x(t)e^{-st}$ to be absolutely integrable, and $|x(t)e^{-(\sigma+j\omega)t}|=|x(t)|e^{-\sigma t}$ because $|e^{-j\omega t}|=1$. Convergence depends only on $\sigma$, so if one point on a vertical line converges, the whole line does.

**Property 2.** For rational transforms, **the ROC contains no poles**: $X(s)$ is infinite at a pole, so the integral diverges there.

## Property 3 — finite-duration signals

If $x(t)$ has finite duration and is absolutely integrable, **the ROC is the entire s-plane**.

*Why:* let $x(t)\neq0$ only on $T_1<t<T_2$. On a finite interval $e^{-\sigma t}$ is bounded for any finite $\sigma$: its largest value is $e^{-\sigma T_1}$ if $\sigma>0$ and $e^{-\sigma T_2}$ if $\sigma<0$. Calling that point $T_{\max}$,

$$
\int_{T_1}^{T_2}|x(t)|e^{-\sigma t}dt\le e^{-\sigma T_{\max}}\int_{T_1}^{T_2}|x(t)|dt<\infty .
$$

### Example 9.6 — an apparent pole that cancels

$x(t)=e^{-at}$ for $0<t<T$, and $0$ otherwise:

$$
X(s)=\int_0^Te^{-at}e^{-st}dt=\frac{1-e^{-(s+a)T}}{s+a}.
$$

By Property 3 the ROC is the entire plane. But there seems to be a pole at $s=-a$. No contradiction: there both numerator and denominator vanish, and by L'Hôpital

$$
\lim_{s\to-a}X(s)=\lim_{s\to-a}\frac{T\,e^{-(s+a)T}}{1}=T .
$$

A finite-duration signal cannot have any true poles, because the integrals stay bounded over the finite interval.
` + fig("lap-finite") + r`
## Property 4 — right-sided signals

If $x(t)$ is right-sided (zero before some $T_1$) and the line $\operatorname{Re}\{s\}=\sigma_0$ is in the ROC, then **every $s$ with $\operatorname{Re}\{s\}>\sigma_0$ is in the ROC**.

*Why:* for $\sigma_1>\sigma_0$, the weighted signal decays even faster as $t\to+\infty$:

$$
\int_{T_1}^{\infty}|x(t)|e^{-\sigma_1t}dt=\int_{T_1}^{\infty}|x(t)|e^{-\sigma_0t}e^{-(\sigma_1-\sigma_0)t}dt\le e^{-(\sigma_1-\sigma_0)T_1}\int_{T_1}^{\infty}|x(t)|e^{-\sigma_0t}dt<\infty .
$$
` + fig("lap-right-sided") + r`
## Property 5 — left-sided signals

If $x(t)$ is left-sided (zero after some $T_2$) and $\operatorname{Re}\{s\}=\sigma_0$ is in the ROC, then **every $s$ with $\operatorname{Re}\{s\}<\sigma_0$ is in the ROC**. The same argument in the negative time direction: the weight must die out as $t\to-\infty$, which happens for smaller $\sigma$.

## Property 6 — two-sided signals

If $x(t)$ is two-sided and the line $\operatorname{Re}\{s\}=\sigma_0$ is in the ROC, the ROC is a **strip** containing that line.

*Why:* split at any $T_0$: $x=x_L+x_R$, with $x_L$ left-sided and $x_R$ right-sided. By Properties 4 and 5, $\mathcal L\{x_R\}$ converges for $\operatorname{Re}\{s\}>\sigma_R$ and $\mathcal L\{x_L\}$ for $\operatorname{Re}\{s\}<\sigma_L$. The ROC of $x$ is the intersection $\sigma_R<\operatorname{Re}\{s\}<\sigma_L$, and since $\sigma_0$ is in it, $\sigma_R<\sigma_0<\sigma_L$.

### Example 9.7 — a two-sided exponential

$x(t)=e^{-b|t|}=e^{-bt}u(t)+e^{bt}u(-t)$.

$$
e^{-bt}u(t)\leftrightarrow\frac1{s+b}\ \ (\operatorname{Re}\{s\}>-b),\qquad e^{bt}u(-t)\leftrightarrow\frac{-1}{s-b}\ \ (\operatorname{Re}\{s\}<b).
$$

The two ROCs must overlap, so we need $-b<\operatorname{Re}\{s\}<b$, which is possible only if $b>0$. **If $b\le0$ there is no common ROC and the Laplace transform does not exist.** For $b>0$:

$$
X(s)=\frac1{s+b}-\frac1{s-b}=\frac{-2b}{s^2-b^2},\qquad-b<\operatorname{Re}\{s\}<b,\quad\text{poles at }s=\pm b .
$$
` + fig("lap-ex97") + r`
## Properties 7 and 8 — rational transforms

**Property 7.** If $X(s)$ is rational, its ROC is **bounded by poles or extends to infinity**, and contains no poles. *Why:* rational transforms are combinations of exponentials, each with an ROC bounded by its pole; the ROC of a combination is the intersection.

**Property 8.** If $X(s)$ is rational:

- $x(t)$ right-sided ⇒ the ROC is to the **right of the rightmost pole**;
- $x(t)$ left-sided ⇒ the ROC is to the **left of the leftmost pole**.

### Example 9.8 — one equation, three signals

$$
X(s)=\frac1{(s+1)(s+2)}
$$

Without an ROC this maps to three possible signals, bounded by the poles at $-1$ and $-2$:
` + fig("lap-ex98") + r`
# Part III — the inverse Laplace transform

## Derivation

We interpreted $X(\sigma+j\omega)=\mathcal F\{x(t)e^{-\sigma t}\}$. Apply the inverse Fourier transform and multiply by $e^{\sigma t}$:

$$
x(t)e^{-\sigma t}=\frac1{2\pi}\int_{-\infty}^{\infty}X(\sigma+j\omega)e^{j\omega t}d\omega\quad\Rightarrow\quad x(t)=\frac1{2\pi}\int_{-\infty}^{\infty}X(\sigma+j\omega)e^{(\sigma+j\omega)t}d\omega .
$$

Change variables: $s=\sigma+j\omega$ with $\sigma$ fixed, so $ds=j\,d\omega$, and $\omega:-\infty\to\infty$ becomes $s:\sigma-j\infty\to\sigma+j\infty$.

$$
\boxed{\,x(t)=\frac1{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty}X(s)\,e^{st}\,ds\,}
$$

$\sigma$ can be chosen anywhere **within the ROC**; otherwise $X(s)$ is not defined.

## The Bromwich integral

This is the **Bromwich integral** (Mellin inversion formula): a contour integral along the vertical line $\operatorname{Re}\{s\}=\sigma$. In practice the contour is closed with an infinite semicircle, to the left for $t>0$ (enclosing the poles to the left) or to the right for $t<0$, and evaluated with the residue theorem, $\oint_Cf(s)ds=2\pi j\sum\text{residues inside }C$. This is mathematically demanding, so we rarely do it by hand.

**Numerical approximation.** Replace the integral over $\omega$ by a Riemann sum with small steps $\Delta\omega$:

$$
x(t)\approx\frac{\Delta\omega}{2\pi}\sum_{k=-\infty}^{\infty}X(\sigma+jk\Delta\omega)e^{(\sigma+jk\Delta\omega)t},
$$

with $\sigma$ still inside the ROC.

## The practical approach: partial fractions

For rational $X(s)=\frac{N(s)}{D(s)}$ with simple poles at $s=-a_i$, expand

$$
X(s)=\sum_{i=1}^{M}\frac{A_i}{s+a_i},\qquad A_i=(s+a_i)X(s)\big|_{s=-a_i}\quad(\text{cover-up method}).
$$

By linearity we invert each first-order term separately. **To invert a term we must know its ROC**, and there are two possibilities:
` + fig("lap-term-sides") + r`
$$
\frac{A}{s+a},\ \operatorname{Re}\{s\}>-a\ \leftrightarrow\ A\,e^{-at}u(t)\qquad\qquad\frac{A}{s+a},\ \operatorname{Re}\{s\}<-a\ \leftrightarrow\ -A\,e^{-at}u(-t)
$$

**Rule:** for each pole, look at where the overall ROC lies. Pole to the **left** of the ROC → right-sided term. Pole to the **right** of the ROC → left-sided term.

### Examples 9.9, 9.10, 9.11

$$
X(s)=\frac1{(s+1)(s+2)}=\frac A{s+1}+\frac B{s+2},\quad A=\frac1{s+2}\Big|_{s=-1}=1,\quad B=\frac1{s+1}\Big|_{s=-2}=-1 .
$$

So the expansion is always $X(s)=\dfrac1{s+1}-\dfrac1{s+2}$. Only the ROC changes the answer:

| ROC | pole $-1$ | pole $-2$ | $x(t)$ |
|---|---|---|---|
| $\operatorname{Re}\{s\}>-1$ (9.9) | right → $e^{-t}u(t)$ | right → $e^{-2t}u(t)$ | $\left(e^{-t}-e^{-2t}\right)u(t)$ |
| $\operatorname{Re}\{s\}<-2$ (9.10) | left → $-e^{-t}u(-t)$ | left → $-e^{-2t}u(-t)$ | $\left(-e^{-t}+e^{-2t}\right)u(-t)$ |
| $-2<\operatorname{Re}\{s\}<-1$ (9.11) | left → $-e^{-t}u(-t)$ | right → $e^{-2t}u(t)$ | $-e^{-t}u(-t)-e^{-2t}u(t)$ |
` + fig("lap-inverses") + r`
# Part IV — properties of the Laplace transform

Throughout, $x(t)\leftrightarrow X(s)$ with ROC $R$ (and $x_i\leftrightarrow X_i$ with ROC $R_i$).

## Linearity

$$
ax_1(t)+bx_2(t)\ \leftrightarrow\ aX_1(s)+bX_2(s),\qquad\text{ROC contains at least }R_1\cap R_2 .
$$

*Proof:* the integral is linear, so it converges wherever both original transforms converge. *Example:* $e^{-t}u(t)+2e^{-2t}u(t)\leftrightarrow\frac1{s+1}+\frac2{s+2}$, $\operatorname{Re}\{s\}>-1$.

**Caution — Example 9.13: cancellation can extend the ROC.** Let $X_1=\frac1{s+1}$ and $X_2=\frac1{(s+1)(s+2)}$, both with $\operatorname{Re}\{s\}>-1$. Then

$$
X_1-X_2=\frac1{s+1}-\frac1{(s+1)(s+2)}=\frac1{s+2}.
$$

The pole at $-1$ disappears, so the actual ROC expands to $\operatorname{Re}\{s\}>-2$. The intersection is only the guaranteed part.
` + fig("lap-cancel") + r`
## Time shifting

$$
x(t-t_0)\ \leftrightarrow\ e^{-st_0}X(s),\qquad\text{ROC}=R .
$$

*Proof:* substitute $\tau=t-t_0$: $\int x(t-t_0)e^{-st}dt=e^{-st_0}\int x(\tau)e^{-s\tau}d\tau$. *Example:* $u(t-2)\leftrightarrow\frac{e^{-2s}}s$, $\operatorname{Re}\{s\}>0$. The delay changes the transform, not the ROC.

## Shifting in the s-domain

$$
e^{s_0t}x(t)\ \leftrightarrow\ X(s-s_0),\qquad\text{ROC}=R+\operatorname{Re}\{s_0\}.
$$

*Proof:* $\int e^{s_0t}x(t)e^{-st}dt=\int x(t)e^{-(s-s_0)t}dt=X(s-s_0)$. The ROC shifts right by $\operatorname{Re}\{s_0\}$. *Example:* from $u(t)\leftrightarrow\frac1s$, $e^{-2t}u(t)\leftrightarrow\frac1{s+2}$, $\operatorname{Re}\{s\}>-2$.
` + fig("lap-shift-roc") + r`
## Time scaling

$$
x(at)\ \leftrightarrow\ \frac1{|a|}X\!\left(\frac sa\right),\qquad\text{ROC}=aR .
$$

*Proof:* with $\tau=at$, $\int x(at)e^{-st}dt=\frac1a\int x(\tau)e^{-(s/a)\tau}d\tau$ for $a>0$, and $-\frac1a\int\cdots$ for $a<0$ (the limits swap); both are $\frac1{|a|}X(s/a)$. *Example:* $e^{-t}u(t)\leftrightarrow\frac1{s+1}$, so $e^{-2t}u(t)=x(2t)\leftrightarrow\frac12\cdot\frac1{s/2+1}=\frac1{s+2}$. For $0<a<1$ the signal is stretched; for $a>1$ compressed; for $a<0$ flipped and scaled.

## Time reversal

The special case $a=-1$:

$$
x(-t)\ \leftrightarrow\ X(-s),\qquad\text{ROC}=-R .
$$

The ROC flips across the $j\omega$ axis. *Example:* $e^{-t}u(t)\leftrightarrow\frac1{s+1}$ ($\operatorname{Re}\{s\}>-1$), so $e^tu(-t)\leftrightarrow\frac1{1-s}$ ($\operatorname{Re}\{s\}<1$).

## Conjugation

$$
x^*(t)\ \leftrightarrow\ X^*(s^*),\qquad\text{ROC}=R .
$$

If $x$ is real, $X(s)=X^*(s^*)$: whenever $X(s_0)=0$ or $\infty$, so is $X(s_0^*)$.

> **Pole–zero symmetry for real signals.** If $x(t)$ is real and $X(s)$ rational, its poles and zeros are real or come in complex-conjugate pairs. (Example 9.4: poles at $-1\pm3j$.)

## Convolution

$$
x_1(t)*x_2(t)\ \leftrightarrow\ X_1(s)X_2(s),\qquad\text{ROC contains at least }R_1\cap R_2 .
$$

*Proof:* $\int\!\!\int x_1(\tau)x_2(t-\tau)d\tau\,e^{-st}dt=\int x_1(\tau)e^{-s\tau}\left[\int x_2(\lambda)e^{-s\lambda}d\lambda\right]d\tau=X_1(s)X_2(s)$ with $\lambda=t-\tau$. *Caution:* poles can cancel. If $X_1=\frac{s+1}{s+2}$ ($\operatorname{Re}\{s\}>-2$) and $X_2=\frac{s+2}{s+1}$ ($\operatorname{Re}\{s\}>-1$), then $X_1X_2=1$ with ROC the entire plane.

## Differentiation in time

$$
\frac{dx(t)}{dt}\ \leftrightarrow\ sX(s),\qquad\text{ROC contains }R .
$$

*Proof:* differentiate the inverse transform: $\frac{d}{dt}\frac1{2\pi j}\int X(s)e^{st}ds=\frac1{2\pi j}\int sX(s)e^{st}ds=\mathcal L^{-1}\{sX(s)\}$.

**Why it matters:** differential equations become algebraic equations, because every derivative contributes a factor $s$.

*Example and caution:* $u(t)\leftrightarrow\frac1s$ ($\operatorname{Re}\{s\}>0$), and $\frac{d}{dt}u=\delta\leftrightarrow s\cdot\frac1s=1$ for all $s$. If $X(s)$ has a first-order pole at $s=0$, multiplying by $s$ cancels it, so the ROC of the derivative can be **larger**.

*(Unilateral form used for initial-value problems: $\mathcal L\{\dot x\}=sX(s)-x(0^-)$.)*

## Differentiation in the s-domain

$$
-t\,x(t)\ \leftrightarrow\ \frac{dX(s)}{ds},\qquad\text{ROC}=R .
$$

*Proof:* $\frac{dX}{ds}=\frac{d}{ds}\int x(t)e^{-st}dt=\int(-t)x(t)e^{-st}dt$. Differentiation is valid for every $s\in R$; and if $\int|t||x(t)|e^{-\sigma t}dt$ converges then so does $\int|x(t)|e^{-\sigma t}dt$, so the ROC is exactly $R$.

**Example 9.14.** From $e^{-at}u(t)\leftrightarrow\frac1{s+a}$:

$$
t\,e^{-at}u(t)\leftrightarrow-\frac{d}{ds}\frac1{s+a}=\frac1{(s+a)^2},\qquad\frac{t^2}{2}e^{-at}u(t)\leftrightarrow\frac1{(s+a)^3},\qquad\frac{t^{n-1}}{(n-1)!}e^{-at}u(t)\leftrightarrow\frac1{(s+a)^n},
$$

all with $\operatorname{Re}\{s\}>-a$.

**Example 9.15.** $X(s)=\dfrac{2s^2+5s+5}{(s+1)^2(s+2)}$, $\operatorname{Re}\{s\}>-1$. Partial fractions (with a repeated pole):

$$
X(s)=\frac2{(s+1)^2}-\frac1{s+1}+\frac3{s+2}.
$$

The ROC is to the right of every pole, so every term is right-sided:

$$
x(t)=\left(2te^{-t}-e^{-t}+3e^{-2t}\right)u(t).
$$

## Integration in time

$$
\int_{-\infty}^{t}x(\tau)\,d\tau\ \leftrightarrow\ \frac1sX(s),\qquad\text{ROC contains }R\cap\{\operatorname{Re}\{s\}>0\}.
$$

*Proof:* $\int_{-\infty}^tx(\tau)d\tau=x(t)*u(t)$, and $u(t)\leftrightarrow\frac1s$ with $\operatorname{Re}\{s\}>0$. *Example:* $\int_{-\infty}^tu(\tau)d\tau=t\,u(t)\leftrightarrow\frac1{s^2}$, $\operatorname{Re}\{s\}>0$.

## Summary table of properties

| property | signal | transform | ROC |
|---|---|---|---|
| linearity | $ax_1+bx_2$ | $aX_1+bX_2$ | contains $R_1\cap R_2$ |
| time shift | $x(t-t_0)$ | $e^{-st_0}X(s)$ | $R$ |
| s-shift | $e^{s_0t}x(t)$ | $X(s-s_0)$ | $R+\operatorname{Re}\{s_0\}$ |
| time scaling | $x(at)$ | $\frac1{\lvert a\rvert}X(s/a)$ | $aR$ |
| time reversal | $x(-t)$ | $X(-s)$ | $-R$ |
| conjugation | $x^*(t)$ | $X^*(s^*)$ | $R$ |
| convolution | $x_1*x_2$ | $X_1X_2$ | contains $R_1\cap R_2$ |
| time differentiation | $\frac{dx}{dt}$ | $sX(s)$ | contains $R$ |
| s-differentiation | $-t\,x(t)$ | $\frac{dX}{ds}$ | $R$ |
| time integration | $\int_{-\infty}^tx\,d\tau$ | $\frac1sX(s)$ | contains $R\cap\{\operatorname{Re}\{s\}>0\}$ |

## Some Laplace transform pairs

| $x(t)$ | $X(s)$ | ROC |
|---|---|---|
| $\delta(t)$ | $1$ | all $s$ |
| $\delta(t-T)$ | $e^{-sT}$ | all $s$ |
| $u(t)$ | $\frac1s$ | $\operatorname{Re}\{s\}>0$ |
| $-u(-t)$ | $\frac1s$ | $\operatorname{Re}\{s\}<0$ |
| $\frac{t^{n-1}}{(n-1)!}u(t)$ | $\frac1{s^n}$ | $\operatorname{Re}\{s\}>0$ |
| $e^{-at}u(t)$ | $\frac1{s+a}$ | $\operatorname{Re}\{s\}>-a$ |
| $-e^{-at}u(-t)$ | $\frac1{s+a}$ | $\operatorname{Re}\{s\}<-a$ |
| $\frac{t^{n-1}}{(n-1)!}e^{-at}u(t)$ | $\frac1{(s+a)^n}$ | $\operatorname{Re}\{s\}>-a$ |
| $\cos(\omega_0t)u(t)$ | $\frac s{s^2+\omega_0^2}$ | $\operatorname{Re}\{s\}>0$ |
| $\sin(\omega_0t)u(t)$ | $\frac{\omega_0}{s^2+\omega_0^2}$ | $\operatorname{Re}\{s\}>0$ |
| $e^{-at}\cos(\omega_0t)u(t)$ | $\frac{s+a}{(s+a)^2+\omega_0^2}$ | $\operatorname{Re}\{s\}>-a$ |
| $e^{-at}\sin(\omega_0t)u(t)$ | $\frac{\omega_0}{(s+a)^2+\omega_0^2}$ | $\operatorname{Re}\{s\}>-a$ |
| $e^{-b\lvert t\rvert}$, $b>0$ | $\frac{-2b}{s^2-b^2}$ | $-b<\operatorname{Re}\{s\}<b$ |

# Part V — LTI systems with the Laplace transform

## The transform-domain view

For an LTI system with impulse response $h(t)$,

$$
Y(s)=H(s)X(s),\qquad H(s)=\mathcal L\{h(t)\}\ \ (\text{the system function}).
$$

Convolution in time becomes multiplication in $s$. For $x(t)=e^{st}$, $y(t)=H(s)e^{st}$ whenever $s$ is in the ROC of $H$. If the ROC includes the $j\omega$ axis, $H(j\omega)$ is the frequency response. This is why poles, zeros and the ROC are so valuable: they reveal causality, stability and the shape of the response, often just by inspecting $H(s)$.

## Causality from the ROC

- A causal system has $h(t)=0$ for $t<0$ (right-sided), so the **ROC of $H(s)$ is a right half-plane**.
- If $H(s)$ is rational, causality ⇔ the ROC is to the **right of the rightmost pole**.

**Example 9.17.** $h(t)=e^{-t}u(t)\Rightarrow H(s)=\frac1{s+1}$, $\operatorname{Re}\{s\}>-1$: right-sided, so causal.

**Example 9.18.** $h(t)=e^{-|t|}\Rightarrow H(s)=\frac{-2}{s^2-1}$, $-1<\operatorname{Re}\{s\}<1$: two-sided, so not causal.

## Stability from the ROC

> An LTI system is **stable iff the ROC of $H(s)$ includes the entire $j\omega$ axis**.

(Stability means $\int|h|<\infty$, which is exactly convergence of the transform at $\sigma=0$.)

**Example 9.20.** $H(s)=\dfrac{s-1}{(s+1)(s-2)}$ has poles at $-1$ and $2$, hence three possible ROCs:

- $\operatorname{Re}\{s\}>2$: causal but unstable;
- $-1<\operatorname{Re}\{s\}<2$: non-causal but stable;
- $\operatorname{Re}\{s\}<-1$: anticausal and unstable.

Only the middle ROC contains the $j\omega$ axis.
` + fig("lap-stability") + r`
## Causal + stable: the pole test

> A **causal** system with rational $H(s)$ is stable **iff all poles of $H(s)$ lie in the left half-plane**.

**Example 9.21.** $H(s)=\frac1{s-2}$ with the causal ROC $\operatorname{Re}\{s\}>2$: the pole is in the right half-plane, so the system is unstable.
` + fig("lap-causal-stable") + r`
# Part VI — differential equations

## The system function from a differential equation

Often we are given a differential equation instead of $h(t)$. Take Laplace transforms (zero initial conditions); every derivative becomes a factor of $s$:

$$
\frac{dy}{dt}+3y(t)=x(t)\ \xrightarrow{\ \mathcal L\ }\ sY(s)+3Y(s)=X(s)\ \Rightarrow\ H(s)=\frac{Y(s)}{X(s)}=\frac1{s+3}.
$$

We can then analyse the system with $H(s)$, or find $h(t)$ by inverting it, being careful about the ROC.

**Example 9.23.** The same equation gives two possible impulse responses:

$$
h(t)=e^{-3t}u(t)\ \ (\operatorname{Re}\{s\}>-3)\qquad\text{or}\qquad h(t)=-e^{-3t}u(-t)\ \ (\operatorname{Re}\{s\}<-3).
$$

The differential equation fixes the algebraic form; **causality selects the ROC**.
` + fig("lap-de-rocs") + r`
## Solving a differential equation

Use the causal system $H(s)=\frac1{s+3}$, $h(t)=e^{-3t}u(t)$: pole at $-3$, ROC $\operatorname{Re}\{s\}>-3$, causal and stable. Input $x(t)=e^{-2t}u(t)\leftrightarrow\frac1{s+2}$:

$$
Y(s)=H(s)X(s)=\frac1{(s+2)(s+3)}=\frac1{s+2}-\frac1{s+3}\quad\Rightarrow\quad y(t)=\left(e^{-2t}-e^{-3t}\right)u(t).
$$
` + fig("lap-de-response") + r`
The transform solved the differential equation by turning it into algebra, then using known inverse pairs.

## LCCDEs become algebra

For a linear constant-coefficient differential equation

$$
\sum_{k=0}^{N}a_k\frac{d^ky(t)}{dt^k}=\sum_{k=0}^{M}b_k\frac{d^kx(t)}{dt^k},
$$

zero initial conditions and the differentiation property give $\left(\sum a_ks^k\right)Y(s)=\left(\sum b_ks^k\right)X(s)$, so

$$
\boxed{\,H(s)=\frac{Y(s)}{X(s)}=\frac{\sum_{k=0}^{M}b_ks^k}{\sum_{k=0}^{N}a_ks^k}\,}
$$

Zeros come from the numerator, poles from the denominator, and the ROC still depends on causality or other side information.

## Exam pointers

- Every transform needs its ROC; quote it and use it when inverting.
- A strip ROC means a two-sided signal: one term with $u(t)$, one with $u(-t)$.
- Before declaring a pole, check whether a zero cancels it (finite-duration signals have none).
- "Relation between Laplace and Fourier": $X(j\omega)=X(s)|_{s=j\omega}$ if the ROC contains the $j\omega$ axis; in general $X(\sigma+j\omega)=\mathcal F\{x(t)e^{-\sigma t}\}$.
`
