const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const zNote = r`
# Part I — the z-transform

## Motivation: from Fourier to a broader transform

The same pattern appears in both time domains:

| | continuous time | discrete time |
|---|---|---|
| Fourier | $e^{j\omega t}\to H(j\omega)e^{j\omega t}$ | $e^{j\omega n}\to H(e^{j\omega})e^{j\omega n}$ (DTFT) |
| broader transform | Laplace: $s=\sigma+j\omega$, $e^{st}\to H(s)e^{st}$ | **z-transform**: $z=re^{j\omega}$, $z^n\to H(z)z^n$ |

Fourier analysis restricts us to the frequency axis. The broader transform allows a complex variable, which lets us analyse unstable systems and characterise causality and stability.

## The eigenfunction property of $z^n$

For a discrete-time LTI system with impulse response $h[n]$ and input $x[n]=z^n$:

$$
y[n]=\sum_{k=-\infty}^{\infty}h[k]z^{n-k}=z^n\sum_{k=-\infty}^{\infty}h[k]z^{-k}=H(z)\,z^n .
$$

The eigenvalue is the z-transform of $h$. In general:

$$
\boxed{\,X(z)=\mathcal Z\{x[n]\}=\sum_{n=-\infty}^{\infty}x[n]\,z^{-n}\,}
$$

> The z-transform is to the DTFT what the Laplace transform is to the CTFT. It extends analysis to more signals, handles unstable systems, and reveals causality and stability through poles, zeros and the ROC. The difference is geometric: the Fourier transform lives on the $j\omega$ axis of the s-plane; the DTFT lives on the **unit circle** of the z-plane.

## From sampled exponentials to $z$

Sampling $e^{st}$ every $T$ seconds gives $e^{snT}=(e^{sT})^n$. Define $z\triangleq e^{sT}$; the sampled signal is $z^n$, and

$$
z=e^{sT}=e^{\sigma T}e^{j\omega T}=re^{j\Omega},\qquad|z|=r=e^{\sigma T}\ (\text{damping}),\qquad\angle z=\Omega=\omega T\ (\text{frequency}).
$$

**Why $z$ instead of $e^{s}$?** In the DTFT we set $T=1$ and work with $e^{j\omega n}$; we could generalise the same way and write $e^{sn}$. But the map $s\mapsto e^{sT}$ is **many-to-one**: shifting $\omega$ by $2\pi/T$ gives the same $z$. In continuous time $e^{j(\omega+2\pi/T)t}\neq e^{j\omega t}$ for general $t$, so distinct $s$ still give distinct signals. In discrete time $n$ is an integer, so $e^{j(\omega+2\pi/T)Tn}=e^{j\omega Tn}$: different $s$ values produce the **same** discrete signal. Using $z$ as the parameter collapses this redundancy, and makes the algebra and geometry much more intuitive.

### How the mapping changes the geometry

| s-plane | | z-plane |
|---|---|---|
| vertical line $\operatorname{Re}\{s\}=\sigma_0$ | → | circle $\lvert z\rvert=e^{\sigma_0T}$ |
| $j\omega$ axis ($\sigma=0$) | → | unit circle $\lvert z\rvert=1$ |
| ROC strip | → | ROC ring (annulus) |
` + fig("z-mapping") + r`
The unit circle plays the role the $j\omega$ axis plays in the s-plane. ROC questions become questions about **radii**, not real parts.

## The system function $H(z)$

$$
H(z)=\sum_{k=-\infty}^{\infty}h[k]z^{-k},\qquad x[n]=z^n\Rightarrow y[n]=H(z)z^n .
$$

- Convolution in time becomes multiplication in $z$: $Y(z)=H(z)X(z)$ (the parallel of $Y(s)=H(s)X(s)$).
- Poles of $H(z)$ are the natural modes of the system; zeros are the frequencies it blocks.

## Connection to the DTFT

Write $z=re^{j\omega}$:

$$
X(re^{j\omega})=\sum_nx[n](re^{j\omega})^{-n}=\sum_n\big(x[n]r^{-n}\big)e^{-j\omega n}=\mathcal F\{x[n]r^{-n}\}.
$$

Setting $r=1$ restricts the z-transform to the unit circle and recovers the DTFT. **The DTFT exists iff the ROC includes $|z|=1$.**

# Part II — examples and the ROC

## Example 10.1 — a right-sided exponential

$x[n]=a^nu[n]$:

$$
X(z)=\sum_{n=0}^{\infty}a^nz^{-n}=\sum_{n=0}^{\infty}(az^{-1})^n=\frac1{1-az^{-1}}=\frac z{z-a},\qquad|az^{-1}|<1\iff|z|>|a| .
$$

- The discrete analogue of $e^{-at}u(t)$.
- Pole at $z=a$, zero at $z=0$.
- The ROC is the **exterior of a circle**; if $|a|<1$ it includes the unit circle and the DTFT exists.
` + fig("z-ex101") + r`
## Example 10.2 — a left-sided exponential

$x[n]=-a^nu[-n-1]$:

$$
X(z)=-\sum_{n=-\infty}^{-1}a^nz^{-n}=-\sum_{m=1}^{\infty}(a^{-1}z)^m=1-\frac1{1-a^{-1}z}=\frac1{1-az^{-1}}=\frac z{z-a},\qquad|z|<|a| .
$$

The same algebraic expression, but the ROC is the **interior** of the circle. Exactly the message from Laplace: the algebraic form alone is not enough.
` + fig("z-ex102") + r`
## Why the ROC matters

A z-transform is specified by **algebraic expression + ROC**. For rational transforms the zeros are the roots of the numerator and the poles the roots of the denominator; the ROC tells us whether the sequence is right-sided, left-sided or two-sided, whether the DTFT exists, and (later) whether a system is causal or stable.
` + fig("z-shapes") + r`
## Example 10.3 — sum of two exponentials

$x[n]=7\left(\frac13\right)^nu[n]-6\left(\frac12\right)^nu[n]$. By linearity and Example 10.1:

$$
X(z)=\frac7{1-\frac13z^{-1}}-\frac6{1-\frac12z^{-1}}=\frac{1-\frac32z^{-1}}{\left(1-\frac13z^{-1}\right)\left(1-\frac12z^{-1}\right)}=\frac{z\left(z-\frac32\right)}{\left(z-\frac13\right)\left(z-\frac12\right)}.
$$

Both components are right-sided, so the ROC is $|z|>\frac12$: outside the outermost pole. Poles at $\frac13,\frac12$; zeros at $0$ and $\frac32$ (from the numerator $7\left(1-\frac12z^{-1}\right)-6\left(1-\frac13z^{-1}\right)=1-\frac32z^{-1}$).
` + fig("z-ex103") + r`

## Example 10.4 — a damped sinusoid

$x[n]=\left(\frac13\right)^n\sin\left(\frac\pi4n\right)u[n]$. With Euler, $\sin\frac\pi4n=\frac{e^{j\pi n/4}-e^{-j\pi n/4}}{2j}$:

$$
X(z)=\frac1{2j}\frac1{1-\frac13e^{j\pi/4}z^{-1}}-\frac1{2j}\frac1{1-\frac13e^{-j\pi/4}z^{-1}}=\frac{\frac{\sqrt2}{6}z^{-1}}{1-\frac{\sqrt2}3z^{-1}+\frac19z^{-2}}=\frac{\frac{\sqrt2}6z}{\left(z-\frac13e^{j\pi/4}\right)\left(z-\frac13e^{-j\pi/4}\right)}.
$$

Both components are right-sided: ROC $|z|>\frac13$.
` + fig("z-ex104") + r`
## ROC properties

**Property 1.** The ROC is a **ring centred at the origin**. Absolute convergence, $\sum|x[n]|r^{-n}<\infty$, depends on the radius $r=|z|$, not on the angle.

**Property 2.** The ROC **cannot contain any poles**. Zeros may lie in the ROC; poles only on its boundary or outside it.

**Property 3 — finite-duration sequences.** The ROC is the entire z-plane, **except possibly $z=0$ and/or $z=\infty$**. Only finitely many terms appear, $X(z)=\sum_{n=N_1}^{N_2}x[n]z^{-n}$, so every finite non-zero $z$ is safe. But:

- a sample at $n>0$ creates a negative power of $z$, which blows up as $|z|\to0$: it can exclude $z=0$;
- a sample at $n<0$ creates a positive power of $z$, which blows up as $|z|\to\infty$: it can exclude $z=\infty$.

So if $N_1\ge0$ the ROC includes $\infty$; if $N_2\le0$ it includes 0.

**Example 10.5.** $\delta[n]\leftrightarrow1$ (all $z$, including 0 and $\infty$); $\delta[n-1]\leftrightarrow z^{-1}$ (all $z$ except 0); $\delta[n+1]\leftrightarrow z$ (all finite $z$, but not $\infty$).

**Property 4 — right-sided.** If $x[n]=0$ for $n<N_1$ and the circle $|z|=r_0$ is in the ROC, then every finite $z$ with $|z|>r_0$ is too. *Why:* for $r_1>r_0$, $|x[n]|r_1^{-n}=|x[n]|r_0^{-n}\left(\frac{r_0}{r_1}\right)^n$, and the extra factor decays as $n\to\infty$. (If $N_1<0$, $\infty$ may be excluded; for causal sequences $\infty$ is in the ROC.)

**Property 5 — left-sided.** If $x[n]=0$ for $n>N_2$ and $|z|=r_0$ is in the ROC, then every $z$ with $0<|z|<r_0$ is too. *Why:* now $r_0/r_1>1$ but $n\to-\infty$, so the factor still decays. (If $N_2>0$, 0 may be excluded; for anticausal sequences 0 is in the ROC.)

**Property 6 — two-sided.** If $x[n]$ is two-sided and has a z-transform, the ROC is an **annulus**. Split $x=x\,u[n-N]+x\,(1-u[n-N])$: the right-sided part gives an exterior, the left-sided part an interior. The z-transform exists only if they overlap, and the overlap is a ring $r_1<|z|<r_2$.

## Example 10.6 — a finite-length exponential

$x[n]=a^n$ for $0\le n\le N-1$ ($a>0$):

$$
X(z)=\sum_{n=0}^{N-1}a^nz^{-n}=\frac{1-(az^{-1})^N}{1-az^{-1}}=\frac1{z^{N-1}}\cdot\frac{z^N-a^N}{z-a}.
$$

The sequence is finite, so the ROC is all $z$ except possibly 0. The roots of $z^N=a^N$ are $z_k=ae^{j2\pi k/N}$; the one at $k=0$ cancels the factor $z-a$. What remains:

- zeros at $z_k=ae^{j2\pi k/N}$, $k=1,\dots,N-1$, **evenly spaced on a circle of radius $a$**;
- $N-1$ poles at the origin, so the ROC is $|z|>0$ (the origin is excluded).
` + fig("z-finite") + r`
## Example 10.7 — $b^{|n|}$

$x[n]=b^{|n|}=b^nu[n]+b^{-n}u[-n-1]$ with $b>0$.

- $0<b<1$: the right-sided part needs $|z|>b$ and the left-sided part $|z|<\frac1b$, so the ROC is $b<|z|<\frac1b$.
- $b>1$: the conditions $|z|>b$ and $|z|<\frac1b$ cannot both hold, so **no ROC exists**.
` + fig("z-bn") + r`
> A formal algebraic manipulation can exist, but without a non-empty ROC there is no z-transform.

## Properties 7–9 — rational transforms

- **Property 7.** If $X(z)$ is rational, its ROC is bounded by poles or extends to 0 and/or $\infty$.
- **Property 8.** Rational and right-sided: the ROC is **outside the outermost pole** (outside the circle through the finite pole of largest magnitude). If the sequence is causal, the ROC also includes $\infty$.
- **Property 9.** Rational and left-sided: the ROC is **inside the innermost non-zero pole**; it may include 0, and does if the sequence is anticausal.

Poles draw the possible circular boundaries; the ROC chooses the side: exterior → right-sided, interior → left-sided, annulus → two-sided.

## Example 10.8 — three possible ROCs

$$
X(z)=\frac1{\left(1-\frac12z^{-1}\right)\left(1-2z^{-1}\right)},\qquad\text{poles at }z=\tfrac12,\ 2 .
$$

The possible ROCs are $|z|>2$ (right-sided), $\frac12<|z|<2$ (two-sided) and $|z|<\frac12$ (left-sided). Only the middle annulus contains the unit circle, so only that sequence has a DTFT.
` + fig("z-ex108") + r`
# Part III — the inverse z-transform

## The contour formula

Recall $X(re^{j\omega})=\mathcal F\{x[n]r^{-n}\}$. If the circle $|z|=r$ lies in the ROC, apply the inverse DTFT and multiply by $r^n$:

$$
x[n]r^{-n}=\frac1{2\pi}\int_{2\pi}X(re^{j\omega})e^{j\omega n}d\omega\quad\Rightarrow\quad x[n]=\frac1{2\pi}\int_{2\pi}X(re^{j\omega})(re^{j\omega})^nd\omega .
$$

With $z=re^{j\omega}$ and $dz=jre^{j\omega}d\omega=jz\,d\omega$:

$$
\boxed{\,x[n]=\frac1{2\pi j}\oint_CX(z)\,z^{n-1}\,dz\,}
$$

where $C$ is any **counter-clockwise** closed contour lying entirely within the ROC (and encircling the origin). It is evaluated with residues.

## Partial fractions

### Example 10.9 — an exterior ROC

$$
X(z)=\frac{3-\frac56z^{-1}}{\left(1-\frac14z^{-1}\right)\left(1-\frac13z^{-1}\right)},\qquad|z|>\tfrac13 .
$$

Partial fractions give $X(z)=\dfrac1{1-\frac14z^{-1}}+\dfrac2{1-\frac13z^{-1}}$. The ROC is outside the outermost pole, so both terms are right-sided:

$$
x[n]=\left(\tfrac14\right)^nu[n]+2\left(\tfrac13\right)^nu[n].
$$

> **Main idea:** the partial fractions do not change; the ROC decides how each term is interpreted.

### Examples 10.10 and 10.11 — same algebra, different sequences

Keep the same expansion.

- **ROC $\frac14<|z|<\frac13$** (10.10): the pole at $\frac14$ is inside the ring's inner edge (right-sided term); the pole at $\frac13$ is outside it (left-sided term):
$$x[n]=\left(\tfrac14\right)^nu[n]-2\left(\tfrac13\right)^nu[-n-1].$$
- **ROC $|z|<\frac14$** (10.11): both terms are left-sided:
$$x[n]=-\left(\tfrac14\right)^nu[-n-1]-2\left(\tfrac13\right)^nu[-n-1].$$

## Power-series inversion

Rewrite $X(z)$ as a power series that is valid in the ROC and match it with $X(z)=\sum_nx[n]z^{-n}$. **The coefficient of $z^{-n}$ is $x[n]$**; positive powers of $z$ represent negative-time samples.

**Example 10.12.** $X(z)=4z^2+2+3z^{-1}\Rightarrow x[n]=4\delta[n+2]+2\delta[n]+3\delta[n-1]$.

**Example 10.13.** $X(z)=\dfrac1{1-az^{-1}}$.

- If $|z|>|a|$ ($|az^{-1}|<1$): $X=1+az^{-1}+a^2z^{-2}+\cdots\Rightarrow x[n]=a^nu[n]$.
- If $|z|<|a|$ ($|z/a|<1$): $X=\dfrac{-z/a}{1-z/a}=-a^{-1}z-a^{-2}z^2-a^{-3}z^3-\cdots\Rightarrow x[n]=-a^nu[-n-1]$.

**Example 10.14.** $X(z)=\log(1+az^{-1})$, $|z|>|a|$.

From the geometric series $\frac1{1+t}=1-t+t^2-t^3+\cdots$ ($|t|<1$), integrate from 0 to $v$:

$$
\log(1+v)=\int_0^v\frac{dt}{1+t}=\sum_{n=1}^{\infty}\frac{(-1)^{n+1}v^n}{n},\qquad|v|<1 .
$$

Set $v=az^{-1}$; since $|z|>|a|$, $|az^{-1}|<1$:

$$
X(z)=\sum_{n=1}^{\infty}\frac{(-1)^{n+1}a^n}{n}z^{-n}\quad\Rightarrow\quad x[n]=\begin{cases}(-1)^{n+1}\dfrac{a^n}n,&n\ge1\\0,&n\le0\end{cases}
$$

# Part IV — properties

## Linearity and time shifting

$$
ax_1[n]+bx_2[n]\ \leftrightarrow\ aX_1(z)+bX_2(z),\qquad\text{ROC contains at least }R_1\cap R_2 .
$$

The defining sum is linear; the ROC can be larger if poles and zeros cancel. (Example 10.3 is an instance.)

$$
x[n-n_0]\ \leftrightarrow\ z^{-n_0}X(z),\qquad\text{same ROC, except possibly adding or deleting }0\text{ or }\infty .
$$

*Proof:* $\sum_nx[n-n_0]z^{-n}=z^{-n_0}\sum_mx[m]z^{-m}$. The factor $z^{-n_0}$ can add or delete a pole at 0 or $\infty$, but does not move any finite non-zero boundary. Example: $\delta[n-1]\leftrightarrow z^{-1}$.

## Scaling in $z$, time reversal and conjugation

$$
z_0^n\,x[n]\ \leftrightarrow\ X\!\left(\frac z{z_0}\right),\qquad\text{ROC}=|z_0|R .
$$

*Proof:* $\sum z_0^nx[n]z^{-n}=\sum x[n](z/z_0)^{-n}$. Multiplying by $e^{j\omega_0n}$ **rotates** the pole–zero pattern ($X(e^{-j\omega_0}z)$); multiplying by $r_0^n$ **scales** its radii.

$$
x[-n]\ \leftrightarrow\ X(z^{-1}),\qquad\text{ROC inverted }(1/R).
$$

$$
x^*[n]\ \leftrightarrow\ X^*(z^*),\qquad\text{same ROC}.
$$

For real $x[n]$, $X(z)=X^*(z^*)$: non-real poles and zeros come in conjugate pairs, and the ROC is symmetric about the real axis.

## Time expansion

Insert $k-1$ zeros between samples:

$$
x_{(k)}[n]=\begin{cases}x[n/k],&n\text{ a multiple of }k\\0,&\text{otherwise}\end{cases}\qquad\leftrightarrow\qquad X(z^k),\qquad\text{ROC}=R^{1/k}.
$$

*Proof:* $\sum_nx_{(k)}[n]z^{-n}=\sum_mx[m]z^{-km}=X(z^k)$. $z$ is in the new ROC exactly when $z^k$ is in the old one, so radii map by $r\mapsto r^{1/k}$.
` + fig("z-expansion") + r`
## Convolution

$$
y[n]=x_1[n]*x_2[n]\ \leftrightarrow\ Y(z)=X_1(z)X_2(z),\qquad\text{ROC contains at least }R_1\cap R_2 .
$$

*Proof:*

$$
Y(z)=\sum_n\sum_kx_1[k]x_2[n-k]z^{-n}=\sum_kx_1[k]z^{-k}\sum_mx_2[m]z^{-m}=X_1(z)X_2(z)\qquad(m=n-k).
$$

Convergence is guaranteed wherever both series converge; if a pole is cancelled in the product, the final ROC can be larger.

## First difference and accumulation

**First difference (Example 10.15).** With $h[n]=\delta[n]-\delta[n-1]$:

$$
x[n]-x[n-1]\ \leftrightarrow\ (1-z^{-1})X(z),
$$

ROC at least $R$, except possibly deleting $z=0$; cancellation may add $z=1$. The first difference is the discrete counterpart of differentiation.

**Accumulation (Example 10.16).** $w[n]=\sum_{k=-\infty}^{n}x[k]=u[n]*x[n]$, and $u[n]\leftrightarrow\frac1{1-z^{-1}}$ ($|z|>1$), so

$$
\sum_{k=-\infty}^{n}x[k]\ \leftrightarrow\ \frac1{1-z^{-1}}X(z),\qquad\text{ROC contains at least }R\cap\{|z|>1\}.
$$

Convolution with $u[n]$ is the discrete counterpart of integration.

## Differentiation in the z-domain

$$
n\,x[n]\ \leftrightarrow\ -z\frac{dX(z)}{dz},\qquad\text{ROC}=R .
$$

*Proof:* $\frac{dX}{dz}=\sum(-n)x[n]z^{-n-1}$, so $-z\frac{dX}{dz}=\sum nx[n]z^{-n}$.

**Example 10.18.** From $a^nu[n]\leftrightarrow\frac1{1-az^{-1}}$: $\ na^nu[n]\leftrightarrow\dfrac{az^{-1}}{(1-az^{-1})^2}$, $|z|>|a|$.

## Difference equations as a z-transform property

If $\displaystyle\sum_{k=0}^{N}a_ky[n-k]=\sum_{k=0}^{M}b_kx[n-k]$, linearity and time shifting ($\mathcal Z\{y[n-k]\}=z^{-k}Y(z)$) give

$$
H(z)=\frac{Y(z)}{X(z)}=\frac{\sum_{k=0}^{M}b_kz^{-k}}{\sum_{k=0}^{N}a_kz^{-k}}.
$$

> **Warning:** the difference equation determines the algebraic system function, but **not the ROC**. The ROC is extra information: it decides causality, stability and the impulse response.

## Summary of properties

| property | sequence | z-domain | ROC / nuance |
|---|---|---|---|
| linearity | $ax_1+bx_2$ | $aX_1+bX_2$ | $\supseteq R_1\cap R_2$ |
| time shift | $x[n-n_0]$ | $z^{-n_0}X(z)$ | same $R$, except $0,\infty$ |
| scaling | $z_0^nx[n]$ | $X(z/z_0)$ | $\lvert z_0\rvert R$ |
| time reversal | $x[-n]$ | $X(z^{-1})$ | inverted $R$ |
| conjugation | $x^*[n]$ | $X^*(z^*)$ | same $R$ |
| time expansion | $x_{(k)}[n]$ | $X(z^k)$ | $R^{1/k}$ |
| convolution | $x_1*x_2$ | $X_1X_2$ | $\supseteq R_1\cap R_2$ |
| first difference | $x[n]-x[n-1]$ | $(1-z^{-1})X(z)$ | may delete 0, cancellation may add 1 |
| accumulation | $\sum_{k\le n}x[k]$ | $\frac{X(z)}{1-z^{-1}}$ | $\supseteq R\cap\{\lvert z\rvert>1\}$ |
| z-differentiation | $n\,x[n]$ | $-z\frac{dX}{dz}$ | same $R$ |
| initial value | causal $x$ | $x[0]=\lim_{z\to\infty}X(z)$ | needs $x[n]=0$ for $n<0$ |
| LCCDE | $\sum a_ky[n-k]=\sum b_kx[n-k]$ | $H=\frac{\sum b_kz^{-k}}{\sum a_kz^{-k}}$ | equation alone does not set the ROC |

# Part V — LTI systems

## The transform-domain view

$Y(z)=H(z)X(z)$; for $x[n]=z^n$, $y[n]=H(z)z^n$. If the ROC of $H$ includes the unit circle, $H(e^{j\omega})$ is the frequency response. Just as with Laplace, many system properties are visible directly in the transform domain.

## Causality from the ROC

> A discrete-time LTI system is **causal iff the ROC of $H(z)$ is the exterior of a circle and includes $\infty$**.

**Example 10.20.** $H(z)=\dfrac{z^3-2z^2+z}{z^2+\frac14z+\frac18}$ is **not causal**: written in powers of $z$, the numerator degree exceeds the denominator degree, so $H(z)$ blows up as $z\to\infty$.

**Example 10.21.** $H(z)=\dfrac1{1-\frac12z^{-1}}+\dfrac1{1-2z^{-1}}$ with $|z|>2$: the ROC is outside the outermost pole and includes $\infty$, so the system **is causal**.

## Stability from the ROC

> An LTI system is **stable iff the ROC of $H(z)$ includes the unit circle**.

- **Example 10.22:** the same $H(z)$ as Example 10.21 with ROC $|z|>2$ is **unstable** (the unit circle is not in the ROC).
- **Example 10.23:** a causal first-order system $H(z)=\frac1{1-az^{-1}}$ is stable iff $|a|<1$.
- **Example 10.24:** $H(z)=\dfrac1{1-2r\cos\theta\,z^{-1}+r^2z^{-2}}$ has poles at $re^{\pm j\theta}$, so a causal system is stable iff $r<1$.
` + fig("z-causal", "z-poles-circle", "z-interactive-poles") + r`
**Causal and stable** ⇔ all poles inside the unit circle (for rational $H$).

## Example 10.25 — difference equations become algebra

$$
y[n]-\tfrac12y[n-1]=x[n]+\tfrac13x[n-1].
$$

Taking z-transforms with linearity and time shifting,

$$
Y(z)-\tfrac12z^{-1}Y(z)=X(z)+\tfrac13z^{-1}X(z)\quad\Rightarrow\quad H(z)=\frac{1+\frac13z^{-1}}{1-\frac12z^{-1}}.
$$

The equation fixes the algebraic form but not the ROC: $|z|>\frac12$ for the causal interpretation, $|z|<\frac12$ for the anticausal one.

## Solving a difference equation

Use the causal system $H(z)=\dfrac{1+\frac13z^{-1}}{1-\frac12z^{-1}}$, $|z|>\frac12$, with the unit step input $x[n]=u[n]\leftrightarrow\frac1{1-z^{-1}}$, $|z|>1$:

$$
Y(z)=\frac{1+\frac13z^{-1}}{\left(1-\frac12z^{-1}\right)\left(1-z^{-1}\right)}=\frac{8/3}{1-z^{-1}}-\frac{5/3}{1-\frac12z^{-1}},
$$

$$
y[n]=\frac83u[n]-\frac53\left(\frac12\right)^nu[n].
$$
` + fig("z-step-response") + r`
The discrete-time version of what we did with differential equations: difference equation → algebra → inverse transform.

## Exam pointers

- Always state the ROC; the same $X(z)$ with a different ROC is a different sequence.
- Finite-length sequences: the ROC excludes $z=0$ if there are samples at $n>0$, and $\infty$ if there are samples at $n<0$. Check for pole–zero cancellation (Example 10.6).
- Logarithms and other analytic functions: use the Taylor series, or $n\,x[n]\leftrightarrow-z\frac{dX}{dz}$.
- Inverse contour formula: $x[n]=\frac1{2\pi j}\oint X(z)z^{n-1}dz$ from inverting $\mathcal F\{x[n]r^{-n}\}$ with $d\omega=\frac{dz}{jz}$.
`
