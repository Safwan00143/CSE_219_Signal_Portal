import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const zBook: BookProblem[] = [
  {
    id: "bk-tan-5.1",
    topic: "z-transform",
    book: "Tan",
    ref: "Problem 5.1",
    prompt: r`Find the z-transform for each of the following sequences:

(a) $x(n)=4u(n)$  (b) $x(n)=(-0.7)^nu(n)$  (c) $x(n)=4e^{-2n}u(n)$  (d) $x(n)=4(0.8)^n\cos(0.1\pi n)u(n)$  (e) $x(n)=4e^{-3n}\sin(0.1\pi n)u(n)$`,
    solution: r`The table pairs we need (all right-sided, with ROC outside the pole radius):

$$a^nu(n)\leftrightarrow\frac{z}{z-a},\qquad a^n\cos(\Omega n)u(n)\leftrightarrow\frac{z(z-a\cos\Omega)}{z^2-2a\cos\Omega\,z+a^2},\qquad a^n\sin(\Omega n)u(n)\leftrightarrow\frac{a\sin\Omega\,z}{z^2-2a\cos\Omega\,z+a^2}.$$

**(a)** $a=1$: $\ X(z)=\dfrac{4z}{z-1}$, $\ |z|>1$.

**(b)** $a=-0.7$: $\ X(z)=\dfrac{z}{z+0.7}$, $\ |z|>0.7$.

**(c)** $e^{-2n}=(e^{-2})^n$, so $a=e^{-2}=0.1353$: $\ X(z)=\dfrac{4z}{z-0.1353}$, $\ |z|>0.1353$.

**(d)** $a=0.8$ and $\Omega=0.1\pi$. Then $a\cos\Omega=0.7608$, $2a\cos\Omega=1.5217$ and $a^2=0.64$:

$$X(z)=\frac{4z(z-0.7608)}{z^2-1.5217z+0.64},\qquad|z|>0.8.$$

**(e)** $a=e^{-3}=0.04979$ and $\Omega=0.1\pi$. Then $4a\sin\Omega=0.06154$, $2a\cos\Omega=0.0947$ and $a^2=0.002479$:

$$X(z)=\frac{0.06154z}{z^2-0.0947z+0.002479},\qquad|z|>0.04979.$$

In every case the ROC is set by $|a|$, the radius of the poles. A cosine or sine factor puts the poles at $ae^{\pm j\Omega}$, on the same circle.`,
  },
  {
    id: "bk-opp-10.1",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.1",
    prompt: r`Determine the constraint on $r=|z|$ for each of the following sums to converge:

(a) $\displaystyle\sum_{n=-1}^{\infty}\left(\tfrac12\right)^{n+1}z^{-n}$  (b) $\displaystyle\sum_{n=1}^{\infty}\left(\tfrac12\right)^{-n+1}z^{n}$  (c) $\displaystyle\sum_{n=0}^{\infty}\left\{\frac{1+(-1)^n}{2}\right\}z^{-n}$  (d) $\displaystyle\sum_{n=-\infty}^{\infty}\left(\tfrac12\right)^{|n|}\cos\left(\tfrac\pi4n\right)z^{-n}$`,
    solution: r`Each sum is (nearly) a geometric series. It converges when the ratio between successive terms has magnitude less than 1.

**(a)** The terms are $\frac12\left(\frac{1}{2z}\right)^{n}$ for $n\ge-1$, with ratio $\frac{1}{2z}$. This needs $\left|\frac1{2z}\right|<1$, i.e. $r>\frac12$. The $n=-1$ term is $z$, which is finite for any finite $z$.

**(b)** The terms are $2^{n-1}z^n=\frac12(2z)^n$, with ratio $2z$. This needs $r<\frac12$.

**(c)** The bracket is 1 for even $n$ and 0 for odd $n$, so the sum is $\sum_mz^{-2m}$, with ratio $z^{-2}$. This needs $r>1$.

**(d)** Split at $n=0$:
- The part $n\ge0$ behaves like $\left(\frac{1}{2z}\right)^n$ and needs $r>\frac12$.
- The part $n<0$: put $m=-n$, giving $\left(\frac{z}{2}\right)^m$, which needs $r<2$.

The cosine has magnitude at most 1 and does not change the conditions. So $\frac12<r<2$, an annulus, as for any two-sided sequence.`,
  },
  {
    id: "bk-opp-10.2",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.2",
    prompt: r`Consider the signal $x[n]=\left(\tfrac15\right)^nu[n-3]$. Use the definition of the z-transform to evaluate $X(z)$ and specify the corresponding region of convergence.`,
    solution: r`The step starts the sum at $n=3$:

$$X(z)=\sum_{n=3}^{\infty}\left(\tfrac15\right)^nz^{-n}=\sum_{n=3}^{\infty}\left(\tfrac15z^{-1}\right)^n=\frac{\left(\frac15z^{-1}\right)^3}{1-\frac15z^{-1}}.$$

This is a geometric series starting from its third power.

$$\boxed{X(z)=\frac{1}{125}\cdot\frac{z^{-3}}{1-\frac15z^{-1}},\qquad|z|>\tfrac15}$$
` + fig("bk-z-102") + r`
Alternative: $x[n]=\left(\frac15\right)^3\left(\frac15\right)^{n-3}u[n-3]$ is a delayed and scaled copy of $\left(\frac15\right)^nu[n]$. By the shift property, $X(z)=\frac1{125}z^{-3}\cdot\frac{1}{1-\frac15z^{-1}}$, the same result.`,
  },
  {
    id: "bk-opp-10.3",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.3",
    prompt: r`Let $x[n]=(-1)^nu[n]+\alpha^nu[-n-n_0]$. Determine the constraints on the complex number $\alpha$ and the integer $n_0$, given that the ROC of $X(z)$ is $1<|z|<2$.`,
    solution: r`The ROC of a sum is the intersection of the two ROCs.

- $(-1)^nu[n]$ is right-sided with a pole at $z=-1$, so its ROC is $|z|>1$. That gives the inner boundary.
- $\alpha^nu[-n-n_0]$ is left-sided (non-zero for $n\le-n_0$). For $n\to-\infty$ the terms $\alpha^nz^{-n}=\left(\frac z\alpha\right)^{-n}$ require $|z|<|\alpha|$. That must be the outer boundary 2.

$$\boxed{|\alpha|=2,\qquad n_0\text{ any integer}}$$

The phase of $\alpha$ is free. A shift $n_0$ only moves the starting point of a left-sided sequence. It multiplies the transform by a power of $z$, which could only affect $z=0$ or $z=\infty$, and neither lies on the boundary of this annulus.`,
  },
  {
    id: "bk-opp-10.4",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.4",
    prompt: r`Consider the signal

$$x[n]=\begin{cases}\left(\frac13\right)^n\cos\left(\frac\pi4n\right),&n\le0\\0,&n>0.\end{cases}$$

Determine the poles and ROC for $X(z)$.`,
    solution: r`Write the cosine as exponentials and sum over $n\le0$ with $m=-n$:

$$X(z)=\frac12\sum_{m=0}^{\infty}\left[\left(3e^{-j\pi/4}z\right)^m+\left(3e^{j\pi/4}z\right)^m\right]=\frac12\left[\frac{1}{1-3e^{-j\pi/4}z}+\frac{1}{1-3e^{j\pi/4}z}\right].$$

Both series converge when $|3z|<1$, i.e. **ROC: $|z|<\frac13$**.

Combine the fractions:

$$X(z)=\frac{1-\frac{3}{\sqrt2}z}{9z^2-3\sqrt2\,z+1}.$$

- **Poles:** $9z^2-3\sqrt2z+1=0$ gives $z=\frac13e^{\pm j\pi/4}$.
- **Zero:** $z=\frac{\sqrt2}{3}$.

A left-sided signal always has its ROC **inside** the innermost pole. Here that is a disc of radius $\frac13$.
` + fig("bk-z-104"),
  },
  {
    id: "bk-opp-10.7",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.7",
    prompt: r`Suppose that the algebraic expression for the z-transform of $x[n]$ is

$$X(z)=\frac{1-\frac14z^{-2}}{\left(1+\frac14z^{-2}\right)\left(1+\frac54z^{-1}+\frac38z^{-2}\right)}.$$

How many different regions of convergence could correspond to $X(z)$?`,
    solution: r`Factor everything:

- Numerator: $1-\frac14z^{-2}=\left(1-\frac12z^{-1}\right)\left(1+\frac12z^{-1}\right)$, so zeros at $z=\pm\frac12$.
- $1+\frac14z^{-2}=0$ gives $z^2=-\frac14$, so poles at $z=\pm\frac j2$.
- $1+\frac54z^{-1}+\frac38z^{-2}=\left(1+\frac12z^{-1}\right)\left(1+\frac34z^{-1}\right)$, so poles at $z=-\frac12$ and $z=-\frac34$.

The factor $\left(1+\frac12z^{-1}\right)$ **cancels**, so the pole at $-\frac12$ disappears. The remaining poles are $\pm\frac j2$ (radius $\frac12$) and $-\frac34$ (radius $\frac34$).

ROCs are annuli bounded by pole **radii**. Two distinct radii give **3** possible ROCs:

$$|z|<\tfrac12,\qquad\tfrac12<|z|<\tfrac34,\qquad|z|>\tfrac34.$$
` + fig("bk-z-107") + r`
Even without the cancellation the answer would be 3, because $-\frac12$ has the same radius as $\pm\frac j2$. It is still good practice to cancel first.`,
  },
  {
    id: "bk-opp-10.9",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.9",
    prompt: r`Using partial-fraction expansion and the fact that $a^nu[n]\leftrightarrow\dfrac{1}{1-az^{-1}}$, $|z|>|a|$, find the inverse z-transform of

$$X(z)=\frac{1-\frac13z^{-1}}{(1-z^{-1})(1+2z^{-1})},\qquad|z|>2.$$`,
    solution: r`Expand in terms of $z^{-1}$:

$$X(z)=\frac{A}{1-z^{-1}}+\frac{B}{1+2z^{-1}}.$$

Use cover-up, evaluating at the value of $z^{-1}$ that kills each factor:

- $z^{-1}=1$: $\ A=\dfrac{1-\frac13}{1+2}=\dfrac29$.
- $z^{-1}=-\frac12$: $\ B=\dfrac{1+\frac16}{1+\frac12}=\dfrac{7/6}{3/2}=\dfrac79$.

Check: as $z^{-1}\to0$, $X\to1$, and indeed $A+B=1$. ✓

The ROC $|z|>2$ lies outside both poles ($z=1$ and $z=-2$), so both terms are right-sided:

$$\boxed{x[n]=\left[\tfrac29+\tfrac79(-2)^n\right]u[n]}$$

Check: $x[0]=1$ matches the initial value theorem, $\lim_{z\to\infty}X(z)=1$. Because of the pole at $-2$, this signal grows. The ROC excludes the unit circle, so it is not absolutely summable.`,
  },
  {
    id: "bk-opp-10.10",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.10",
    prompt: r`Consider the algebraic expression for the z-transform of a signal $x[n]$:

$$X(z)=\frac{1+z^{-1}}{1+\frac13z^{-1}}.$$

(a) Assuming the ROC to be $|z|>\frac13$, use long division to determine $x[0]$, $x[1]$ and $x[2]$.

(b) Assuming the ROC to be $|z|<\frac13$, use long division to determine $x[0]$, $x[-1]$ and $x[-2]$.`,
    solution: r`**The rule for the direction of division:**
- for a **right-sided** signal, divide to get a series in $z^{-1}$;
- for a **left-sided** signal, divide to get a series in $z$.

**(a)** Divide $1+z^{-1}$ by $1+\frac13z^{-1}$:

1. The first term is $1$. Subtracting $1\cdot(1+\frac13z^{-1})$ leaves the remainder $\frac23z^{-1}$.
2. The next term is $\frac23z^{-1}$. Subtracting $\frac23z^{-1}(1+\frac13z^{-1})$ leaves the remainder $-\frac29z^{-2}$.
3. The next term is $-\frac29z^{-2}$, and so on.

$$X(z)=1+\tfrac23z^{-1}-\tfrac29z^{-2}+\cdots\ \Rightarrow\ x[0]=1,\ x[1]=\tfrac23,\ x[2]=-\tfrac29.$$

**(b)** Multiply the top and bottom by $3z$ to get ascending powers of $z$: $X(z)=\dfrac{3+3z}{1+3z}$. Divide:

1. The first term is $3$, leaving the remainder $3z-9z=-6z$.
2. The next term is $-6z$, leaving the remainder $18z^2$.
3. The next term is $18z^2$, and so on.

$$X(z)=3-6z+18z^2-\cdots$$

A term $z^{m}$ is $z^{-n}$ with $n=-m$, so $x[0]=3$, $x[-1]=-6$ and $x[-2]=18$.

**Check with partial fractions.** $X(z)=3-\dfrac{2}{1+\frac13z^{-1}}$.
- For $|z|>\frac13$: $x[n]=3\delta[n]-2\left(-\frac13\right)^nu[n]$, giving $x[0]=1$, $x[1]=\frac23$, $x[2]=-\frac29$. ✓
- For $|z|<\frac13$: $x[n]=3\delta[n]+2\left(-\frac13\right)^nu[-n-1]$, giving $x[-1]=-6$ and $x[-2]=18$. ✓`,
  },
  {
    id: "bk-opp-10.12",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.12",
    prompt: r`By considering the geometric interpretation of the magnitude of the Fourier transform from the pole-zero plot, determine, for each of the following z-transforms, whether the corresponding signal has an approximately lowpass, bandpass or highpass characteristic:

(a) $X(z)=\dfrac{z^{-1}}{1+\frac89z^{-1}}$, $|z|>\frac89$  (b) $X(z)=\dfrac{1+\frac89z^{-1}}{1-\frac{16}9z^{-1}+\frac{64}{81}z^{-2}}$, $|z|>\frac89$  (c) $X(z)=\dfrac{1}{1+\frac{64}{81}z^{-2}}$, $|z|>\frac89$`,
    solution: r`**Geometric rule:** $|X(e^{j\omega})|$ is the product of the distances from $e^{j\omega}$ to the zeros, divided by the product of the distances to the poles. As $\omega$ goes from 0 to $\pi$, the point $e^{j\omega}$ moves from $z=1$ to $z=-1$. A pole close to the circle gives a peak at the nearest point on the circle.

**(a)** There is one pole at $z=-\frac89$, very close to $z=-1$, which is $\omega=\pi$. $|X|$ is largest near $\omega=\pm\pi$: $\frac{1}{1-8/9}=9$ there, against $\frac{1}{1+8/9}=0.53$ at $\omega=0$. **High-pass.**

**(b)** The denominator is $\left(1-\frac89z^{-1}\right)^2$: a **double pole** at $z=\frac89$, near $\omega=0$. There is also a zero at $z=-\frac89$, near $\omega=\pi$. Huge gain at DC (153), almost nothing at $\omega=\pi$. **Low-pass.**

**(c)** $1+\frac{64}{81}z^{-2}=0$ gives poles at $z=\pm j\frac89$, near $\omega=\pm\frac\pi2$. The response peaks in the middle of the band. **Band-pass.**
` + fig("bk-z-1012"),
  },
  {
    id: "bk-opp-10.13",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.13",
    prompt: r`Consider the rectangular signal

$$x[n]=\begin{cases}1,&0\le n\le5\\0,&\text{otherwise}\end{cases}$$

and let $g[n]=x[n]-x[n-1]$.

(a) Find the signal $g[n]$ and directly evaluate its z-transform.

(b) Noting that $x[n]=\sum_{k=-\infty}^{n}g[k]$, use the table of properties to determine the z-transform of $x[n]$.`,
    solution: r`**(a)** Subtracting the delayed pulse leaves only the two edges:

$$g[n]=\delta[n]-\delta[n-6].$$

That is $+1$ where the pulse starts and $-1$ one step after it ends. Then

$$G(z)=1-z^{-6},\qquad\text{ROC: all }z\ne0.$$
` + fig("bk-z-1013") + r`
**(b)** **Accumulation** divides by $1-z^{-1}$:

$$X(z)=\frac{G(z)}{1-z^{-1}}=\frac{1-z^{-6}}{1-z^{-1}}.$$

Check directly: $\sum_{n=0}^{5}z^{-n}=1+z^{-1}+\dots+z^{-5}=\frac{1-z^{-6}}{1-z^{-1}}$. ✓

The apparent pole at $z=1$ is cancelled by the zero of $1-z^{-6}$ there, as it must be for a finite-length signal. Its ROC is all $z\ne0$, with no pole outside the origin. The other five zeros of $1-z^{-6}$ are spread around the unit circle at $e^{j2\pi k/6}$, $k=1,\dots,5$.`,
  },
  {
    id: "bk-opp-10.18",
    topic: "z-transform",
    book: "Oppenheim",
    ref: "Problem 10.18",
    prompt: r`Consider a causal LTI system whose input $x[n]$ and output $y[n]$ are related through the block diagram representation shown below.

(a) Determine a difference equation relating $y[n]$ and $x[n]$. (b) Is this system stable?
` + fig("bk-z-1018"),
    solution: r`**(a)** Call the signal leaving the first adder $w[n]$. It is the node that feeds the delay chain.

**Feedback side** (left):

$$w[n]=x[n]+\tfrac23w[n-1]-\tfrac19w[n-2]\ \Rightarrow\ W(z)=\frac{X(z)}{1-\frac23z^{-1}+\frac19z^{-2}}.$$

**Feed-forward side** (right):

$$y[n]=w[n]-6w[n-1]+8w[n-2]\ \Rightarrow\ Y(z)=\left(1-6z^{-1}+8z^{-2}\right)W(z).$$

Together:

$$H(z)=\frac{1-6z^{-1}+8z^{-2}}{1-\frac23z^{-1}+\frac19z^{-2}},$$

$$\boxed{y[n]-\tfrac23y[n-1]+\tfrac19y[n-2]=x[n]-6x[n-1]+8x[n-2]}$$

**(b)** Factor both polynomials:

$$H(z)=\frac{(1-2z^{-1})(1-4z^{-1})}{\left(1-\frac13z^{-1}\right)^2}.$$

The poles are a double pole at $z=\frac13$. The system is causal, so its ROC is $|z|>\frac13$, which contains the unit circle. **The system is stable.**
` + fig("bk-z-1018-sol") + r`
The zeros at $z=2$ and $z=4$ lie outside the unit circle. That makes the system non-minimum-phase, but it has nothing to do with stability. Only poles matter.`,
  },
  {
    id: "bk-tan-5.5",
    topic: "z-transform",
    book: "Tan",
    ref: "Problem 5.5",
    prompt: r`Given two sequences $x_1(n)=5\delta(n)-2\delta(n-2)$ and $x_2(n)=3\delta(n-3)$:

(a) determine the z-transform of the convolution of the two sequences using the convolution property $X(z)=X_1(z)X_2(z)$;

(b) determine the convolution by the inverse z-transform of the result from (a).`,
    solution: r`**(a)** Each impulse $\delta(n-k)$ transforms to $z^{-k}$:

$$X_1(z)=5-2z^{-2},\qquad X_2(z)=3z^{-3}.$$

$$X(z)=X_1(z)X_2(z)=\left(5-2z^{-2}\right)3z^{-3}=15z^{-3}-6z^{-5}.$$

**(b)** Read the powers of $z^{-1}$ straight back as delays:

$$x(n)=x_1(n)*x_2(n)=15\delta(n-3)-6\delta(n-5).$$

Check in the time domain: convolving with $3\delta(n-3)$ just triples the sequence and delays it by 3. So $5\delta(n)\to15\delta(n-3)$ and $-2\delta(n-2)\to-6\delta(n-5)$. ✓

For finite sequences, the z-transform turns convolution into **polynomial multiplication** in $z^{-1}$.`,
  },
  {
    id: "bk-tan-5.10",
    topic: "z-transform",
    book: "Tan",
    ref: "Problem 5.10",
    prompt: r`A system is described by the difference equation

$$y(n)+0.5y(n-1)=2(0.8)^nu(n).$$

Determine the solution when the initial condition is $y(-1)=2$.`,
    solution: r`Use the **one-sided** z-transform. It carries the initial condition through the shift property:

$$y(n-1)\leftrightarrow z^{-1}Y(z)+y(-1).$$

Transform both sides:

$$Y(z)+0.5\left[z^{-1}Y(z)+2\right]=\frac{2z}{z-0.8}.$$

Collect the $Y$ terms:

$$Y(z)\left(1+0.5z^{-1}\right)=\frac{2z}{z-0.8}-1=\frac{z+0.8}{z-0.8}.$$

Multiply through by $z$:

$$Y(z)=\frac{z(z+0.8)}{(z-0.8)(z+0.5)}.$$

**Partial fractions** on $\frac{Y(z)}{z}$:

$$\frac{Y(z)}{z}=\frac{A}{z-0.8}+\frac{B}{z+0.5},\qquad A=\frac{1.6}{1.3}=1.2308,\quad B=\frac{0.3}{-1.3}=-0.2308.$$

$$\boxed{y(n)=1.2308(0.8)^n-0.2308(-0.5)^n,\quad n\ge0}$$

Check with the recursion $y(n)=2(0.8)^n-0.5y(n-1)$:
- $y(0)=2-0.5(2)=1$; the formula gives $1.2308-0.2308=1$. ✓
- $y(1)=1.6-0.5=1.1$; the formula gives $0.9846+0.1154=1.1$. ✓
` + fig("bk-z-tan510"),
  },
  {
    id: "bk-tan-5.14",
    topic: "z-transform",
    book: "Tan",
    ref: "Problem 5.14",
    prompt: r`Given the following difference equation with the input-output relationship of a certain initially relaxed system (all initial conditions are zero),

$$y(n)-0.7y(n-1)+0.1y(n-2)=x(n)+x(n-1),$$

(a) find the impulse response sequence $y(n)$ due to the impulse sequence $\delta(n)$;

(b) find the output response of the system when the unit step function $u(n)$ is applied.`,
    solution: r`With zero initial conditions, the transfer function is

$$H(z)=\frac{1+z^{-1}}{1-0.7z^{-1}+0.1z^{-2}}=\frac{z(z+1)}{(z-0.5)(z-0.2)}.$$

**(a) Impulse response.** Expand $\frac{H(z)}{z}$:

$$\frac{z+1}{(z-0.5)(z-0.2)}=\frac{A}{z-0.5}+\frac{B}{z-0.2},\qquad A=\frac{1.5}{0.3}=5,\quad B=\frac{1.2}{-0.3}=-4.$$

$$h(n)=5(0.5)^n-4(0.2)^n,\quad n\ge0.$$

Check: $h(0)=1$ and $h(1)=0.7+1=1.7$, both from the recursion. ✓

**(b) Step response.** $Y(z)=H(z)\frac{z}{z-1}$, so

$$\frac{Y(z)}{z}=\frac{z(z+1)}{(z-0.5)(z-0.2)(z-1)}.$$

Residues:
- at $z=1$: $\frac{1\cdot2}{0.5\cdot0.8}=5$;
- at $z=0.5$: $\frac{0.5\cdot1.5}{(0.3)(-0.5)}=-5$;
- at $z=0.2$: $\frac{0.2\cdot1.2}{(-0.3)(-0.8)}=1$.

$$y(n)=5-5(0.5)^n+(0.2)^n,\quad n\ge0.$$

Checks:
- $y(0)=1$ and $y(1)=2.7$. ✓
- As $n\to\infty$, $y\to5=H(1)$, the DC gain, as expected for a stable system with poles inside the unit circle.
` + fig("bk-z-tan514"),
  },
]
