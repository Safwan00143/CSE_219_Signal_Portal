import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const fourierSeriesBook: BookProblem[] = [
  {
    id: "bk-opp-3.1",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.1",
    prompt: r`A continuous-time periodic signal $x(t)$ is real valued and has a fundamental period $T=8$. The nonzero Fourier series coefficients for $x(t)$ are

$$a_1=a_{-1}=2,\qquad a_3=a_{-3}^*=4j.$$

Express $x(t)$ in the form $x(t)=\sum_{k=0}^{\infty}A_k\cos(\omega_kt+\phi_k)$.`,
    solution: r`$\omega_0=\frac{2\pi}{8}=\frac\pi4$. For a real signal, each pair $a_k,a_{-k}=a_k^*$ combines into one cosine:

$$a_ke^{jk\omega_0t}+a_k^*e^{-jk\omega_0t}=2\,\mathrm{Re}\{a_ke^{jk\omega_0t}\}=2|a_k|\cos(k\omega_0t+\angle a_k).$$

**$k=\pm1$:** $a_1=2$, with $|a_1|=2$ and $\angle a_1=0$, giving $4\cos\frac\pi4t$.

**$k=\pm3$:** $a_3=4j$, with $|a_3|=4$ and $\angle a_3=\frac\pi2$, giving $8\cos\left(\frac{3\pi}4t+\frac\pi2\right)$.

$$\boxed{x(t)=4\cos\left(\tfrac\pi4t\right)+8\cos\left(\tfrac{3\pi}4t+\tfrac\pi2\right)}$$

Since $\cos(\theta+\frac\pi2)=-\sin\theta$, this equals $4\cos\frac\pi4t-8\sin\frac{3\pi}4t$. In the requested form: $A_1=4$, $\omega_1=\frac\pi4$, $\phi_1=0$; $A_3=8$, $\omega_3=\frac{3\pi}4$, $\phi_3=\frac\pi2$; all other $A_k=0$.`,
  },
  {
    id: "bk-opp-3.3",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.3",
    prompt: r`For the continuous-time periodic signal

$$x(t)=2+\cos\left(\frac{2\pi}{3}t\right)+4\sin\left(\frac{5\pi}{3}t\right),$$

determine the fundamental frequency $\omega_0$ and the Fourier series coefficients $a_k$ such that $x(t)=\sum_k a_ke^{jk\omega_0t}$.`,
    solution: r`**Fundamental frequency.** The two frequencies are $\frac{2\pi}3$ and $\frac{5\pi}3$. The fundamental is the largest $\omega_0$ that divides both, which is their greatest common divisor:

$$\omega_0=\frac\pi3\qquad\left(\tfrac{2\pi}3=2\omega_0,\ \tfrac{5\pi}3=5\omega_0\right),\qquad T=\frac{2\pi}{\omega_0}=6.$$

**Coefficients.** No integrals are needed. Expand with Euler's formulas and read off the coefficients:

$$x(t)=2+\tfrac12e^{j2\omega_0t}+\tfrac12e^{-j2\omega_0t}+\tfrac{4}{2j}e^{j5\omega_0t}-\tfrac4{2j}e^{-j5\omega_0t}.$$

| $k$ | $0$ | $\pm2$ | $5$ | $-5$ |
|---|---|---|---|---|
| $a_k$ | $2$ | $\tfrac12$ | $\frac{2}{j}=-2j$ | $\frac{-2}{j}=2j$ |

All other $a_k=0$.
` + fig("bk-fs-33") + r`
Check: the signal is real, so $a_{-k}=a_k^*$. Indeed $a_{-5}=2j=(-2j)^*$. ✓`,
  },
  {
    id: "bk-opp-3.4",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.4",
    prompt: r`Use the Fourier series analysis equation to calculate the coefficients $a_k$ for the continuous-time periodic signal

$$x(t)=\begin{cases}1.5,&0\le t<1\\-1.5,&1\le t<2\end{cases}$$

with fundamental frequency $\omega_0=\pi$.`,
    solution: r`$T=2$ and $a_k=\frac1T\int_Tx(t)e^{-jk\omega_0t}dt$.

**$k=0$:** the average value, $a_0=\frac12(1.5-1.5)=0$.

**$k\ne0$:** integrate the two halves separately, using $\int e^{-jk\pi t}dt=\frac{e^{-jk\pi t}}{-jk\pi}$:

$$a_k=\frac12\left[1.5\int_0^1e^{-jk\pi t}dt-1.5\int_1^2e^{-jk\pi t}dt\right]=\frac{1.5}{2}\cdot\frac{(1-e^{-jk\pi})-(e^{-jk\pi}-e^{-j2k\pi})}{jk\pi}.$$

With $e^{-jk\pi}=(-1)^k$ and $e^{-j2k\pi}=1$, the numerator is $2\big(1-(-1)^k\big)$, so

$$a_k=\frac{1.5\,\big(1-(-1)^k\big)}{jk\pi}=\begin{cases}\dfrac{3}{jk\pi},&k\text{ odd}\\[4pt]0,&k\text{ even.}\end{cases}$$

**Reading the result:**
- The coefficients are purely imaginary and odd in $k$, because $x$ is real and odd: it is $-1.5$ on $(-1,0)$ and $+1.5$ on $(0,1)$.
- Even harmonics vanish, because $x$ has **half-wave symmetry**: $x(t+1)=-x(t)$.
- Pairing $\pm k$ gives the sine series $x(t)=\sum_{k\text{ odd}>0}\frac{6}{k\pi}\sin k\pi t$.
` + fig("bk-fs-34"),
  },
  {
    id: "bk-opp-3.22a",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.22(a)",
    prompt: r`Determine the Fourier series representation of the periodic sawtooth shown below: $x(t)=t$ for $-1<t<1$, with period 2.
` + fig("bk-fs-322a"),
    solution: r`$T=2$, so $\omega_0=\pi$.

**$a_0$:** the average of $t$ over $(-1,1)$ is $0$.

**$a_k$, $k\ne0$:** integrate by parts with $u=t$ and $dv=e^{-jk\pi t}dt$:

$$a_k=\frac12\int_{-1}^{1}te^{-jk\pi t}dt=\frac12\left[\frac{te^{-jk\pi t}}{-jk\pi}\right]_{-1}^{1}+\frac12\cdot\frac{1}{jk\pi}\int_{-1}^{1}e^{-jk\pi t}dt.$$

The last integral is $\frac{2\sin k\pi}{k\pi}=0$. The boundary term is

$$\frac{1}{-2jk\pi}\left(e^{-jk\pi}+e^{jk\pi}\right)=\frac{2(-1)^k}{-2jk\pi}=\frac{j(-1)^k}{k\pi}.$$

$$\boxed{a_k=\frac{j(-1)^k}{k\pi},\quad k\ne0;\qquad a_0=0}$$

**Checks and trigonometric form.** $x$ is real and odd, so $a_k$ should be purely imaginary and odd in $k$, and it is. Pairing $\pm k$:

$$x(t)=\sum_{k=1}^{\infty}\frac{2(-1)^{k+1}}{k\pi}\sin(k\pi t)=\frac2\pi\left(\sin\pi t-\tfrac12\sin2\pi t+\tfrac13\sin3\pi t-\cdots\right).$$

The coefficients decay like $1/k$, as expected for a signal with jumps. At the jump points the series converges to the midpoint, 0.`,
  },
  {
    id: "bk-opp-3.22d",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.22(a), Fig. (d)",
    prompt: r`Determine the Fourier series representation of the periodic impulse signal shown below.
` + fig("bk-fs-322d"),
    solution: r`The period is $T=2$ (the pattern "$+1$ at even $t$, $-2$ at odd $t$" repeats every 2), so $\omega_0=\pi$.

Integrate over one period that contains one impulse of each kind, e.g. $-\tfrac12<t<\tfrac32$:

$$x(t)=\delta(t)-2\delta(t-1)\quad\text{on this interval}.$$

The sifting property makes the integral trivial:

$$a_k=\frac12\int_{-1/2}^{3/2}\big[\delta(t)-2\delta(t-1)\big]e^{-jk\pi t}dt=\frac12\left(1-2e^{-jk\pi}\right)=\frac{1-2(-1)^k}{2}.$$

$$a_k=\begin{cases}-\tfrac12,&k\text{ even}\\[2pt]\ \ \tfrac32,&k\text{ odd.}\end{cases}$$
` + fig("bk-fs-322d-sol") + r`
Checks:
- $a_0=-\tfrac12$ equals the average area per unit time, $\frac{1-2}{2}$. ✓
- The coefficients are real and even in $k$, because $x$ is real and even: impulses sit symmetrically about $t=0$.`,
  },
  {
    id: "bk-opp-3.22b",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.22(b)",
    prompt: r`Determine the Fourier series representation of $x(t)$, periodic with period 2, where

$$x(t)=e^{-t}\quad\text{for }-1<t<1.$$`,
    solution: r`$T=2$, $\omega_0=\pi$. The exponentials combine, so the integral is direct:

$$a_k=\frac12\int_{-1}^{1}e^{-t}e^{-jk\pi t}dt=\frac12\int_{-1}^{1}e^{-(1+jk\pi)t}dt=\frac{1}{2(1+jk\pi)}\left[e^{(1+jk\pi)}-e^{-(1+jk\pi)}\right].$$

Use $e^{\pm jk\pi}=(-1)^k$:

$$a_k=\frac{(-1)^k\left(e-e^{-1}\right)}{2(1+jk\pi)}=\frac{(-1)^k\sinh(1)}{1+jk\pi}.$$

**Checks:**
- $k=0$: $a_0=\sinh1\approx1.175$. The average of $e^{-t}$ over $(-1,1)$ is $\frac{e-e^{-1}}{2}=\sinh1$. ✓
- $x$ is real, so $a_{-k}=a_k^*$: replacing $k$ by $-k$ conjugates $1+jk\pi$. ✓
- $|a_k|\approx\frac{\sinh1}{k\pi}$ for large $k$, a $1/k$ decay, because the periodic extension jumps from $e^{-1}$ up to $e^{1}$ at every odd $t$.`,
  },
  {
    id: "bk-opp-3.23",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.23",
    prompt: r`In each of the following, we specify the Fourier series coefficients of a continuous-time signal that is periodic with period 4. Determine the signal $x(t)$ in each case.

(a) $a_k=\begin{cases}0,&k=0\\(j)^k\dfrac{\sin(k\pi/4)}{k\pi},&\text{otherwise}\end{cases}$  (b) $a_k=(-1)^k\dfrac{\sin(k\pi/8)}{2k\pi}$, $a_0=\dfrac1{16}$

(c) $a_k=\begin{cases}jk,&|k|<3\\0,&\text{otherwise}\end{cases}$  (d) $a_k=\begin{cases}1,&k\text{ even}\\2,&k\text{ odd}\end{cases}$`,
    solution: r`Here $\omega_0=\frac{2\pi}4=\frac\pi2$. Rather than summing series, **recognise known pairs** and apply properties.

Two pairs we need:
- **Pulse train**, $g(t)=1$ for $|t|<T_1$ (period $T$): $\ a_k=\dfrac{\sin(k\omega_0T_1)}{k\pi}$, $\ a_0=\dfrac{2T_1}{T}$.
- **Shift**, $x(t-t_0)$: $\ a_k\to a_ke^{-jk\omega_0t_0}$.

**(a)** $\frac{\sin(k\pi/4)}{k\pi}$ is a pulse train with $\omega_0T_1=\frac\pi4$, i.e. $T_1=\frac12$, whose own $a_0=\frac14$. The factor $j^k=e^{jk\pi/2}=e^{-jk\omega_0(-1)}$ is a shift by $t_0=-1$. Setting $a_0=0$ removes the average $\frac14$:

$$x(t)=g(t+1)-\tfrac14:\quad x=\tfrac34\text{ for }-\tfrac32<t<-\tfrac12,\quad x=-\tfrac14\text{ for the rest of each period.}$$

**(b)** $\frac{\sin(k\pi/8)}{2k\pi}=\frac12\cdot\frac{\sin(k\omega_0T_1)}{k\pi}$ with $T_1=\frac14$. Its $a_0$ is $\frac12\cdot\frac{2(1/4)}4=\frac1{16}$, which matches the given value. The factor $(-1)^k=e^{-jk\omega_0\cdot2}$ is a shift by $t_0=2$:

$$x(t)=\tfrac12\ \text{ for }|t-2|<\tfrac14\ (\text{repeating every 4}),\quad0\text{ otherwise.}$$

**(c)** There are only four terms, $k=\pm1,\pm2$:

$$x(t)=j\left(e^{j\frac\pi2t}-e^{-j\frac\pi2t}\right)+2j\left(e^{j\pi t}-e^{-j\pi t}\right)=-2\sin\left(\tfrac\pi2t\right)-4\sin(\pi t).$$

**(d)** Split the coefficients as $a_k=\frac32-\frac12(-1)^k$.
- A constant $c$ for all $k$ is an impulse train, $cT\sum_m\delta(t-mT)$, because $\sum\delta(t-mT)\leftrightarrow\frac1T$. So $\frac32\to6\sum\delta(t-4m)$.
- $(-1)^k=e^{-jk\omega_0\cdot2}$ shifts by 2. So $-\frac12(-1)^k\to-2\sum\delta(t-2-4m)$.

$$x(t)=6\sum_m\delta(t-4m)-2\sum_m\delta(t-2-4m).$$

Check: $a_k=\frac14\left(6-2e^{-jk\pi}\right)$ gives 1 for even $k$ and 2 for odd $k$. ✓
` + fig("bk-fs-323"),
  },
  {
    id: "bk-opp-3.24",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.24",
    prompt: r`Let

$$x(t)=\begin{cases}t,&0\le t\le1\\2-t,&1\le t\le2\end{cases}$$

be a periodic signal with fundamental period $T=2$ and Fourier coefficients $a_k$.

(a) Determine the value of $a_0$. (b) Determine the Fourier series representation of $dx(t)/dt$. (c) Use the result of part (b) and the differentiation property of the continuous-time Fourier series to help determine the Fourier series coefficients of $x(t)$.`,
    solution: r`**(a)** $a_0$ is the average: the triangle has area $\frac12\cdot2\cdot1=1$ over a period of 2, so $a_0=\frac12$.

**(b)** $g(t)=\frac{dx}{dt}$ is $+1$ on $(0,1)$ and $-1$ on $(1,2)$, a square wave. By the same calculation as Problem 3.4, with amplitude 1:

$$b_k=\frac{1-(-1)^k}{jk\pi}=\begin{cases}\dfrac{2}{jk\pi},&k\text{ odd}\\0,&k\text{ even (including }k=0).\end{cases}$$

**(c)** The differentiation property says $\frac{dx}{dt}\leftrightarrow jk\omega_0a_k$, so $b_k=jk\pi\,a_k$. For $k\ne0$:

$$a_k=\frac{b_k}{jk\pi}=\begin{cases}\dfrac{2}{(jk\pi)^2}=-\dfrac{2}{k^2\pi^2},&k\text{ odd}\\0,&k\text{ even},\ k\ne0.\end{cases}$$

The property cannot give $a_0$, because the derivative destroys the average. That is why part (a) was needed: $a_0=\frac12$.
` + fig("bk-fs-324") + r`
**Check at $t=0$**, where $x(0)=0$:

$$a_0+\sum_{k\text{ odd}}a_k=\frac12-\frac{4}{\pi^2}\left(1+\frac19+\frac1{25}+\cdots\right)=\frac12-\frac4{\pi^2}\cdot\frac{\pi^2}8=0.\ ✓$$

The coefficients decay like $1/k^2$, faster than for a square wave, because the triangle is continuous.`,
  },
  {
    id: "bk-opp-3.25",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.25",
    prompt: r`Consider the following three continuous-time signals with a fundamental period of $T=1/2$:

$$x(t)=\cos(4\pi t),\qquad y(t)=\sin(4\pi t),\qquad z(t)=x(t)y(t).$$

(a) Determine the Fourier series coefficients of $x(t)$. (b) Determine the Fourier series coefficients of $y(t)$. (c) Use the results of parts (a) and (b), along with the multiplication property, to determine the coefficients of $z(t)$. (d) Determine the coefficients of $z(t)$ through direct expansion of $z(t)$ in trigonometric form, and compare.`,
    solution: r`$\omega_0=\frac{2\pi}{1/2}=4\pi$, so both signals sit at the first harmonic.

**(a)** $\cos4\pi t=\frac12e^{j\omega_0t}+\frac12e^{-j\omega_0t}$, so $a_{\pm1}=\frac12$ and all other $a_k$ are 0.

**(b)** $\sin4\pi t=\frac1{2j}e^{j\omega_0t}-\frac1{2j}e^{-j\omega_0t}$, so $b_1=\frac1{2j}$, $b_{-1}=-\frac1{2j}$, and all other $b_k$ are 0.

**(c)** Multiplication in time is convolution of coefficients: $c_k=\sum_l a_lb_{k-l}$. Only $l=\pm1$ and $k-l=\pm1$ contribute:

- $c_2=a_1b_1=\frac12\cdot\frac1{2j}=\frac1{4j}$
- $c_{-2}=a_{-1}b_{-1}=-\frac1{4j}$
- $c_0=a_1b_{-1}+a_{-1}b_1=-\frac1{4j}+\frac1{4j}=0$

All other $c_k=0$.

**(d)** $\cos\theta\sin\theta=\frac12\sin2\theta$, so $z(t)=\frac12\sin(8\pi t)=\frac12\sin(2\omega_0t)$. That is $\frac1{4j}e^{j2\omega_0t}-\frac1{4j}e^{-j2\omega_0t}$, the same coefficients as (c). ✓

$z$ still has period $\frac12$ as a member of this family, but its own fundamental period is $\frac14$. That is why it shows up at $k=\pm2$.`,
  },
  {
    id: "bk-opp-3.26",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.26",
    prompt: r`Let $x(t)$ be a periodic signal whose Fourier series coefficients are

$$a_k=\begin{cases}2,&k=0\\j\left(\tfrac12\right)^{|k|},&\text{otherwise.}\end{cases}$$

Use Fourier series properties to answer: (a) Is $x(t)$ real? (b) Is $x(t)$ even? (c) Is $dx(t)/dt$ even?`,
    solution: r`The symmetry rules to use:
- $x$ real $\iff a_{-k}=a_k^*$;
- $x$ even $\iff a_{-k}=a_k$;
- $x$ real and even $\iff a_k$ real and even.

**(a) Not real.** $a_{-k}=j(\tfrac12)^{|k|}$, while $a_k^*=-j(\tfrac12)^{|k|}$. These are not equal (for $k\ne0$), so $x(t)$ is complex.

**(b) Even.** $a_{-k}=a_k$ because $|k|=|-k|$. So $x(-t)=x(t)$.

Concretely, $x(t)=2+j\sum_{k\ne0}(\tfrac12)^{|k|}e^{jk\omega_0t}=2+2j\sum_{k\ge1}(\tfrac12)^k\cos k\omega_0t$, which is even but has an imaginary part.

**(c) Not even.** $\frac{dx}{dt}$ has coefficients $jk\omega_0a_k$. The factor $k$ is odd, so the new coefficients satisfy $b_{-k}=-b_k$, and the derivative is **odd**. This matches intuition: the derivative of an even function is odd.`,
  },
  {
    id: "bk-opp-3.8",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.8",
    prompt: r`Suppose we are given the following information about a signal $x(t)$:

1. $x(t)$ is real and odd.
2. $x(t)$ is periodic with period $T=2$ and has Fourier coefficients $a_k$.
3. $a_k=0$ for $|k|>1$.
4. $\frac12\int_0^2|x(t)|^2dt=1$.

Specify two different signals that satisfy these conditions.`,
    solution: r`Use each clue in turn.

**Clue 3:** only $a_{-1}$, $a_0$ and $a_1$ can be non-zero.

**Clue 1:** for a real and odd signal, $a_k$ is purely imaginary and odd in $k$. So $a_0=0$, and $a_{-1}=-a_1$ with $a_1=jc$ for some real $c$. Then

$$x(t)=jc\,e^{j\pi t}-jc\,e^{-j\pi t}=jc\cdot2j\sin\pi t=-2c\sin(\pi t),$$

using $\omega_0=\pi$ from clue 2.

**Clue 4 (Parseval):** the average power equals $\sum|a_k|^2$:

$$|a_1|^2+|a_{-1}|^2=2c^2=1\ \Rightarrow\ c=\pm\frac1{\sqrt2}.$$

The two signals are

$$x(t)=\sqrt2\sin(\pi t)\qquad\text{and}\qquad x(t)=-\sqrt2\sin(\pi t).$$

Check the power of the first: $\frac12\int_0^2 2\sin^2\pi t\,dt=\frac12\cdot2\cdot1=1$. ✓ The clues fix everything except the sign.`,
  },
  {
    id: "bk-opp-3.13",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.13",
    prompt: r`Consider a continuous-time LTI system whose frequency response is

$$H(j\omega)=\int_{-\infty}^{\infty}h(t)e^{-j\omega t}dt=\frac{\sin(4\omega)}{\omega}.$$

If the input to this system is the periodic signal

$$x(t)=\begin{cases}1,&0\le t<4\\-1,&4\le t<8\end{cases}$$

with period $T=8$, determine the corresponding system output $y(t)$.`,
    solution: r`**Key fact:** a periodic input passes through an LTI system one harmonic at a time:

$$y(t)=\sum_ka_kH(jk\omega_0)e^{jk\omega_0t}.$$

**Input harmonics.** $\omega_0=\frac{2\pi}8=\frac\pi4$. The square wave has zero average, so $a_0=0$. Its other coefficients are $a_k=\frac{1-(-1)^k}{jk\pi}$, non-zero for odd $k$ (as in Problem 3.4).

**The filter at the harmonics.**

$$H\left(jk\tfrac\pi4\right)=\frac{\sin(k\pi)}{k\pi/4}=0\quad\text{for every }k\ne0.$$

So every non-zero harmonic is multiplied by zero. $H(0)=4$, but $a_0=0$, so the DC term is zero too.

$$\boxed{y(t)=0}$$
` + fig("bk-fs-313") + r`
**Time-domain view.** $\frac{\sin4\omega}{\omega}$ is the transform of a pulse of width 8, $h(t)=1$ for $|t|<4$. So $y(t)$ is the integral of $x$ over a window of length 8, one full period. The square wave has zero average, so that integral is zero at every $t$.`,
  },
  {
    id: "bk-opp-3.15",
    topic: "fourier-series",
    book: "Oppenheim",
    ref: "Problem 3.15",
    prompt: r`Consider a continuous-time ideal lowpass filter $S$ whose frequency response is

$$H(j\omega)=\begin{cases}1,&|\omega|\le100\\0,&|\omega|>100.\end{cases}$$

When the input to this filter is a signal $x(t)$ with fundamental period $T=\pi/6$ and Fourier series coefficients $a_k$, it is found that $y(t)=x(t)$. For what values of $k$ is it guaranteed that $a_k=0$?`,
    solution: r`$\omega_0=\frac{2\pi}{\pi/6}=12$ rad/s, so harmonic $k$ sits at $\omega=12k$.

The output coefficients are $a_kH(j12k)$:
- for $|12k|\le100$ the filter passes the harmonic unchanged;
- for $|12k|>100$ the filter sets it to zero.

$y=x$ means no harmonic was changed. So every harmonic the filter would remove must already have been zero.

$$|12k|>100\iff|k|>8.33\iff|k|\ge9.$$

$$\boxed{a_k=0\ \text{ for }|k|\ge9}$$

Harmonics $|k|\le8$ (up to $96$ rad/s) are allowed to be anything.
` + fig("bk-fs-315"),
  },
]
