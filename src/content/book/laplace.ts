import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const laplaceBook: BookProblem[] = [
  {
    id: "bk-opp-9.1",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.1",
    prompt: r`For each of the following integrals, specify the values of the real parameter $\sigma$ which ensure that the integral converges:

(a) $\int_0^\infty e^{-5t}e^{-(\sigma+j\omega)t}dt$  (b) $\int_{-\infty}^0e^{-5t}e^{-(\sigma+j\omega)t}dt$  (c) $\int_{-5}^{5}e^{-5t}e^{-(\sigma+j\omega)t}dt$

(d) $\int_{-\infty}^{\infty}e^{-5t}e^{-(\sigma+j\omega)t}dt$  (e) $\int_{-\infty}^{\infty}e^{-5|t|}e^{-(\sigma+j\omega)t}dt$  (f) $\int_{-\infty}^{0}e^{-5|t|}e^{-(\sigma+j\omega)t}dt$`,
    solution: r`The factor $e^{-j\omega t}$ has magnitude 1, so convergence depends only on the real exponential. Look at what happens at each infinite end:
- an integrand $e^{-ct}$ dies at $t\to+\infty$ when $c>0$;
- it dies at $t\to-\infty$ when $c<0$.

**(a)** $e^{-(5+\sigma)t}$ on $(0,\infty)$ needs $5+\sigma>0$: $\ \sigma>-5$.

**(b)** The same exponential on $(-\infty,0)$ needs $5+\sigma<0$: $\ \sigma<-5$.

**(c)** A finite interval with a bounded integrand: converges for **all** $\sigma$.

**(d)** It needs both (a) and (b) at once, $\sigma>-5$ and $\sigma<-5$: **no** value of $\sigma$ works.

**(e)** For $t>0$ we need $\sigma>-5$. For $t<0$ the integrand is $e^{(5-\sigma)t}$, which needs $\sigma<5$. So $\ -5<\sigma<5$.

**(f)** Only the $t<0$ half: $\ \sigma<5$.

These are exactly the ROC rules:
- right-sided signals have ROCs to the **right** of a line;
- left-sided signals have ROCs to the **left**;
- two-sided signals have a **strip**;
- finite-duration signals have the **whole** plane.`,
  },
  {
    id: "bk-opp-9.2",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.2",
    prompt: r`Consider the signal $x(t)=e^{-5t}u(t-1)$, and denote its Laplace transform by $X(s)$.

(a) Evaluate $X(s)$ and specify its region of convergence.

(b) Determine the values of the finite numbers $A$ and $t_0$ such that the Laplace transform $G(s)$ of $g(t)=Ae^{-5t}u(-t-t_0)$ has the same algebraic form as $X(s)$. What is the region of convergence corresponding to $G(s)$?`,
    solution: r`**(a)**

$$X(s)=\int_1^\infty e^{-5t}e^{-st}dt=\left[\frac{e^{-(s+5)t}}{-(s+5)}\right]_1^\infty=\frac{e^{-(s+5)}}{s+5},\qquad\mathrm{Re}\{s\}>-5.$$

The term at infinity vanishes only when $\mathrm{Re}\{s+5\}>0$.

**(b)** $g$ is non-zero for $t<-t_0$:

$$G(s)=A\int_{-\infty}^{-t_0}e^{-(s+5)t}dt=A\left[\frac{e^{-(s+5)t}}{-(s+5)}\right]_{-\infty}^{-t_0}=-A\frac{e^{(s+5)t_0}}{s+5},\qquad\mathrm{Re}\{s\}<-5.$$

Here the lower limit vanishes only when $\mathrm{Re}\{s+5\}<0$.

Match $-Ae^{(s+5)t_0}=e^{-(s+5)}$: $\ t_0=-1$ and $A=-1$. So

$$g(t)=-e^{-5t}u(-t+1),\qquad\text{ROC }\mathrm{Re}\{s\}<-5.$$
` + fig("bk-lp-92") + r`
The same algebraic $X(s)$ describes two completely different signals. Only the ROC tells them apart.`,
  },
  {
    id: "bk-opp-9.3",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.3",
    prompt: r`Consider the signal $x(t)=e^{-5t}u(t)+e^{-\beta t}u(t)$, and denote its Laplace transform by $X(s)$. What are the constraints placed on the real and imaginary parts of $\beta$ if the region of convergence of $X(s)$ is $\mathrm{Re}\{s\}>-3$?`,
    solution: r`Each term is right-sided:

$$e^{-5t}u(t)\leftrightarrow\frac1{s+5},\ \ \mathrm{Re}\{s\}>-5;\qquad e^{-\beta t}u(t)\leftrightarrow\frac1{s+\beta},\ \ \mathrm{Re}\{s\}>-\mathrm{Re}\{\beta\}.$$

The ROC of the sum is the intersection: $\mathrm{Re}\{s\}>\max\big(-5,\ -\mathrm{Re}\{\beta\}\big)$. For this to equal $\mathrm{Re}\{s\}>-3$, the second pole must set the boundary:

$$-\mathrm{Re}\{\beta\}=-3\ \Rightarrow\ \mathrm{Re}\{\beta\}=3.$$

$\mathrm{Im}\{\beta\}$ is **unconstrained**, because the imaginary part only moves the pole up or down, not the vertical boundary of the ROC.

(If $\beta$ is complex, $x(t)$ is complex too. Nothing in the problem forbids that.)`,
  },
  {
    id: "bk-opp-9.4",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.4",
    prompt: r`For the Laplace transform of

$$x(t)=\begin{cases}e^t\sin2t,&t\le0\\0,&t>0,\end{cases}$$

indicate the location of its poles and its region of convergence.`,
    solution: r`Write the sine as exponentials. The signal is left-sided:

$$x(t)=\frac{1}{2j}\left[e^{(1+2j)t}-e^{(1-2j)t}\right]u(-t).$$

The left-sided pair is $-e^{-at}u(-t)\leftrightarrow\frac1{s+a}$, with $\mathrm{Re}\{s\}<-\mathrm{Re}\{a\}$. So $e^{bt}u(-t)\leftrightarrow\frac{-1}{s-b}$ for $\mathrm{Re}\{s\}<\mathrm{Re}\{b\}$. Then

$$X(s)=\frac1{2j}\left[\frac{-1}{s-1-2j}+\frac{1}{s-1+2j}\right]=\frac{1}{2j}\cdot\frac{-4j}{(s-1)^2+4}=\frac{-2}{(s-1)^2+4}.$$

**Poles:** $s=1\pm2j$. There are no finite zeros.

**ROC:** $\mathrm{Re}\{s\}<1$, to the left of both poles, as for every left-sided signal.
` + fig("bk-lp-94"),
  },
  {
    id: "bk-opp-9.6",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.6",
    prompt: r`An absolutely integrable signal $x(t)$ is known to have a pole at $s=2$. Answer the following questions:

(a) Could $x(t)$ be of finite duration? (b) Could $x(t)$ be left sided? (c) Could $x(t)$ be right sided? (d) Could $x(t)$ be two sided?`,
    solution: r`"Absolutely integrable" means the Fourier transform exists, so **the ROC contains the $j\omega$-axis**. The ROC can never contain a pole. With a pole at $s=2$, the ROC must therefore lie to the left of $\mathrm{Re}\{s\}=2$, at least in the region around the axis.

**(a) No.** A finite-duration signal has the entire $s$-plane as its ROC, so it cannot have any (finite) pole.

**(b) Yes.** A left-sided ROC $\mathrm{Re}\{s\}<2$ contains the $j\omega$-axis. Example: $x(t)=-e^{2t}u(-t)$.

**(c) No.** A right-sided ROC would be $\mathrm{Re}\{s\}>\sigma_{\max}\ge2$, which excludes the $j\omega$-axis.

**(d) Yes.** For example, a strip $\sigma_1<\mathrm{Re}\{s\}<2$ with $\sigma_1<0$, from an additional pole on the left. Example: $e^{-t}u(t)-e^{2t}u(-t)$ has ROC $-1<\mathrm{Re}\{s\}<2$.`,
  },
  {
    id: "bk-opp-9.7",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.7",
    prompt: r`How many signals have a Laplace transform that may be expressed as

$$\frac{(s-1)}{(s+2)(s+3)(s^2+s+1)}$$

in its region of convergence?`,
    solution: r`Find the poles, then count the possible ROCs. For a rational transform, the ROC is a vertical strip bounded by poles, with no pole inside.

**Poles:**
- $s=-2$ and $s=-3$;
- $s^2+s+1=0$ gives $s=-\frac12\pm j\frac{\sqrt3}2$.

The **distinct real parts** are $-3$, $-2$ and $-\frac12$ (the complex pair shares one value). Three vertical lines split the plane into **four** strips:

$$\mathrm{Re}\{s\}<-3,\quad-3<\mathrm{Re}\{s\}<-2,\quad-2<\mathrm{Re}\{s\}<-\tfrac12,\quad\mathrm{Re}\{s\}>-\tfrac12.$$

Each strip gives a different inverse transform: left-sided, two two-sided ones, and right-sided. So **4 signals** share this algebraic form.
` + fig("bk-lp-97") + r`
Only the last ROC is causal, and only the last ROC contains the $j\omega$-axis. So exactly one of the four signals is causal and stable.`,
  },
  {
    id: "bk-opp-9.9",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.9",
    prompt: r`Given that

$$e^{-at}u(t)\longleftrightarrow\frac1{s+a},\qquad\mathrm{Re}\{s\}>\mathrm{Re}\{-a\},$$

determine the inverse Laplace transform of

$$X(s)=\frac{2(s+2)}{s^2+7s+12},\qquad\mathrm{Re}\{s\}>-3.$$`,
    solution: r`Factor the denominator, $(s+3)(s+4)$, and expand in partial fractions:

$$X(s)=\frac{A}{s+3}+\frac{B}{s+4}.$$

Cover-up:

$$A=\frac{2(s+2)}{s+4}\Big|_{s=-3}=\frac{2(-1)}{1}=-2,\qquad B=\frac{2(s+2)}{s+3}\Big|_{s=-4}=\frac{2(-2)}{-1}=4.$$

The ROC $\mathrm{Re}\{s\}>-3$ lies to the right of **both** poles, so both terms are right-sided:

$$\boxed{x(t)=\left(4e^{-4t}-2e^{-3t}\right)u(t)}$$

Checks:
- $X(0)=\frac{4}{12}=\frac13$, and $\int_0^\infty x\,dt=\frac44-\frac23=\frac13$. ✓
- $x(0^+)=4-2=2$, which matches the initial value theorem: $\lim_{s\to\infty}sX(s)=2$. ✓`,
  },
  {
    id: "bk-opp-9.10",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.10",
    prompt: r`Using geometric evaluation of the magnitude of the Fourier transform from the corresponding pole-zero plot, determine, for each of the following Laplace transforms, whether the magnitude of the corresponding Fourier transform is approximately lowpass, highpass or bandpass:

(a) $H_1(s)=\dfrac{1}{(s+1)(s+3)}$, $\mathrm{Re}\{s\}>-1$  (b) $H_2(s)=\dfrac{s}{s^2+s+1}$, $\mathrm{Re}\{s\}>-\tfrac12$  (c) $H_3(s)=\dfrac{s^2}{s^2+2s+1}$, $\mathrm{Re}\{s\}>-1$`,
    solution: r`**Geometric rule.** On the $j\omega$-axis,

$$|H(j\omega)|=K\,\frac{\prod(\text{distances from }j\omega\text{ to the zeros})}{\prod(\text{distances from }j\omega\text{ to the poles})}.$$

Move the point $j\omega$ up the axis and watch the distances.

**(a)** There are poles at $-1$ and $-3$ and no zeros. As $|\omega|$ grows, both pole distances grow, so $|H|$ falls from $\frac13$ at $\omega=0$ towards 0. **Low-pass.**

**(b)** There is a zero at $s=0$ and poles at $-\frac12\pm j\frac{\sqrt3}{2}$.
- At $\omega=0$ the zero distance is 0, so $|H|=0$.
- For large $\omega$ there is one zero against two poles, so $|H|\approx\frac1\omega\to0$.
- In between, near $\omega\approx\frac{\sqrt3}2$, the point passes close to the upper pole and $|H|$ peaks: $|H_2(j1)|=1$.

**Band-pass.**

**(c)** There is a double zero at $s=0$ and a double pole at $s=-1$.
- At $\omega=0$, $|H|=0$.
- For large $\omega$ the zero and pole distances become nearly equal, so $|H|\to1$.

**High-pass.**
` + fig("bk-lp-910") + r`
A pole close to the $j\omega$-axis creates a peak there, and a zero on or near the axis creates a notch. With practice you can sketch $|H|$ straight from the plot.`,
  },
  {
    id: "bk-opp-9.13",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.13",
    prompt: r`Let $g(t)=x(t)+\alpha x(-t)$, where $x(t)=\beta e^{-t}u(t)$, and the Laplace transform of $g(t)$ is

$$G(s)=\frac{s}{s^2-1},\qquad-1<\mathrm{Re}\{s\}<1.$$

Determine the values of the constants $\alpha$ and $\beta$.`,
    solution: r`Transform both pieces:

$$x(t)=\beta e^{-t}u(t)\ \leftrightarrow\ \frac{\beta}{s+1},\quad\mathrm{Re}\{s\}>-1.$$

$$x(-t)=\beta e^{t}u(-t)\ \leftrightarrow\ \frac{-\beta}{s-1},\quad\mathrm{Re}\{s\}<1.$$

The second pair is the time-reversal property, $X(-s)$ with the ROC mirrored.

Add them:

$$G(s)=\frac{\beta}{s+1}-\frac{\alpha\beta}{s-1}=\frac{\beta\big[(s-1)-\alpha(s+1)\big]}{s^2-1}=\frac{\beta(1-\alpha)s-\beta(1+\alpha)}{s^2-1},$$

with ROC $-1<\mathrm{Re}\{s\}<1$, which matches.

Compare the numerator with $s$:

$$\beta(1+\alpha)=0,\qquad\beta(1-\alpha)=1\ \Rightarrow\ \boxed{\alpha=-1,\quad\beta=\tfrac12}$$

So $g(t)=\tfrac12\left(e^{-t}u(t)-e^{t}u(-t)\right)=\tfrac12\,\mathrm{sgn}(t)\,e^{-|t|}$, an odd signal. That fits the odd $G(s)$: $G(-s)=-G(s)$.`,
  },
  {
    id: "bk-opp-9.15",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.15",
    prompt: r`Consider two right-sided signals $x(t)$ and $y(t)$ related through the differential equations

$$\frac{dx(t)}{dt}=-2y(t)+\delta(t)\qquad\text{and}\qquad\frac{dy(t)}{dt}=2x(t).$$

Determine $Y(s)$ and $X(s)$, along with their regions of convergence.`,
    solution: r`Transform both equations, using $\frac{d}{dt}\to s$:

$$sX(s)=-2Y(s)+1,\qquad sY(s)=2X(s).$$

From the second equation, $Y=\frac{2X}{s}$. Substitute into the first:

$$sX=-\frac{4X}{s}+1\ \Rightarrow\ X\,\frac{s^2+4}{s}=1.$$

$$X(s)=\frac{s}{s^2+4},\qquad Y(s)=\frac{2}{s^2+4}.$$

**ROC:** the poles are at $\pm2j$, and both signals are right-sided, so the ROC lies to the right of the poles:

$$\mathrm{Re}\{s\}>0\ \text{ for both}.$$

Inverting gives $x(t)=\cos(2t)\,u(t)$ and $y(t)=\sin(2t)\,u(t)$. This is an undamped oscillator started by the impulse: $x$ and $y$ chase each other around a circle. Check: $\frac{dy}{dt}=2\cos2t=2x$. ✓ The ROC boundary sits exactly on the $j\omega$-axis, so the Fourier transforms exist only in the generalised (impulse) sense.`,
  },
  {
    id: "bk-opp-9.17",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.17",
    prompt: r`A causal LTI system $S$ has the block diagram representation shown below. Determine a differential equation relating the input $x(t)$ to the output $y(t)$ of this system.
` + fig("bk-lp-917"),
    solution: r`Work out each branch as a feedback loop, then add.

**Top branch.** Call the output of $\frac2s$ $v$. The summer feeds $x-4v$ into the integrator:

$$V=\frac2s\left(X-4V\right)\ \Rightarrow\ V\left(1+\frac8s\right)=\frac2sX\ \Rightarrow\ \frac VX=\frac{2}{s+8}.$$

**Bottom branch.** Similarly, with output $w$:

$$W=\frac1s(X-2W)\ \Rightarrow\ \frac WX=\frac1{s+2}.$$

**Sum.**

$$H(s)=\frac{2}{s+8}+\frac1{s+2}=\frac{2(s+2)+(s+8)}{(s+8)(s+2)}=\frac{3s+12}{s^2+10s+16}.$$

**Back to the time domain:** cross-multiply $Y(s)\,(s^2+10s+16)=X(s)\,(3s+12)$ and replace $s$ by $\frac{d}{dt}$:

$$\boxed{\frac{d^2y}{dt^2}+10\frac{dy}{dt}+16y(t)=3\frac{dx}{dt}+12x(t)}$$

The poles $-8$ and $-2$ are both in the left half-plane, so this causal system is also stable.`,
  },
  {
    id: "bk-opp-9.22",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.22",
    prompt: r`Determine the function of time, $x(t)$, for each of the following Laplace transforms and their associated regions of convergence:

(a) $\dfrac{1}{s^2+9}$, $\mathrm{Re}\{s\}>0$  (b) $\dfrac{s}{s^2+9}$, $\mathrm{Re}\{s\}<0$  (c) $\dfrac{s+1}{(s+1)^2+9}$, $\mathrm{Re}\{s\}<-1$

(d) $\dfrac{s+2}{s^2+7s+12}$, $-4<\mathrm{Re}\{s\}<-3$  (e) $\dfrac{s+1}{s^2+5s+6}$, $-3<\mathrm{Re}\{s\}<-2$`,
    solution: r`**Rule for each pole:** if the ROC lies to the **right** of the pole, the term is right-sided ($\cdot\,u(t)$); if it lies to the **left**, the term is left-sided, $-(\cdot)\,u(-t)$.

**(a)** The poles $\pm3j$ lie left of the ROC, so the term is right-sided: $x(t)=\tfrac13\sin(3t)\,u(t)$.

**(b)** The same poles now lie right of the ROC, so the term is left-sided. The right-sided version would be $\cos3t\,u(t)$, so here

$$x(t)=-\cos(3t)\,u(-t).$$

**(c)** The ROC is left of the poles $-1\pm3j$:

$$x(t)=-e^{-t}\cos(3t)\,u(-t).$$

**(d)** Partial fractions:

$$\frac{s+2}{(s+3)(s+4)}=\frac{-1}{s+3}+\frac{2}{s+4}.$$

- The pole $-4$ lies left of the strip, so its term is right-sided: $2e^{-4t}u(t)$.
- The pole $-3$ lies right of the strip, so its term is left-sided: $-1\cdot\big(-e^{-3t}u(-t)\big)=e^{-3t}u(-t)$.

$$x(t)=2e^{-4t}u(t)+e^{-3t}u(-t).$$
` + fig("bk-lp-922d") + r`
**(e)** Partial fractions:

$$\frac{s+1}{(s+2)(s+3)}=\frac{-1}{s+2}+\frac{2}{s+3}.$$

- The pole $-3$ is left of the strip: $2e^{-3t}u(t)$.
- The pole $-2$ is right of the strip: $e^{-2t}u(-t)$.

$$x(t)=2e^{-3t}u(t)+e^{-2t}u(-t).$$

Both terms decay away from $t=0$, as they must for a two-sided signal whose ROC is a finite strip.`,
  },
  {
    id: "bk-opp-9.23",
    topic: "laplace",
    book: "Oppenheim",
    ref: "Problem 9.23",
    prompt: r`For each of the following statements about $x(t)$, and for each of the four pole-zero plots below, determine the corresponding constraint on the ROC:

1. $x(t)e^{-3t}$ is absolutely integrable.
2. $x(t)*\left(e^{-t}u(t)\right)$ is absolutely integrable.
3. $x(t)=0$ for $t>1$.
4. $x(t)=0$ for $t<-1$.
` + fig("bk-lp-923"),
    solution: r`**Translate each statement into ROC language:**

1. $x(t)e^{-3t}$ has Fourier transform $X(3+j\omega)$. It is absolutely integrable $\iff$ the **line $\mathrm{Re}\{s\}=3$ is in the ROC**.
2. The convolution has transform $\frac{X(s)}{s+1}$, with ROC at least $\text{ROC}_x\cap\{\mathrm{Re}\{s\}>-1\}$. No zero at $-1$ cancels anything, so absolute integrability $\iff$ the **$j\omega$-axis is in the ROC of $x$**.
3. $x$ is left-sided, so the ROC is **left of all poles**.
4. $x$ is right-sided, so the ROC is **right of all poles**.

**Now apply them to each plot.** The poles decide the possible ROCs.

| | plot 1 (poles at $\mathrm{Re}=\pm2$) | plot 2 (poles at $\mathrm{Re}=-2$) | plot 3 (poles at $\mathrm{Re}=2$) | plot 4 (no poles) |
|---|---|---|---|---|
| 1 | $\mathrm{Re}\{s\}>2$ | $\mathrm{Re}\{s\}>-2$ | $\mathrm{Re}\{s\}>2$ | entire $s$-plane |
| 2 | $-2<\mathrm{Re}\{s\}<2$ | $\mathrm{Re}\{s\}>-2$ | $\mathrm{Re}\{s\}<2$ | entire $s$-plane |
| 3 | $\mathrm{Re}\{s\}<-2$ | $\mathrm{Re}\{s\}<-2$ | $\mathrm{Re}\{s\}<2$ | entire $s$-plane |
| 4 | $\mathrm{Re}\{s\}>2$ | $\mathrm{Re}\{s\}>-2$ | $\mathrm{Re}\{s\}>2$ | entire $s$-plane |

Plot 4 has no finite poles. Its $X(s)$ is a polynomial, so the signal is made of impulses and their derivatives at a single point, and the ROC is the whole plane in every case. Zeros never restrict an ROC; only poles do.`,
  },
]
