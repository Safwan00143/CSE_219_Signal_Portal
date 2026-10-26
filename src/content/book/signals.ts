import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const signalsBook: BookProblem[] = [
  {
    id: "bk-opp-1.3",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.3",
    prompt: r`Determine the values of $P_\infty$ and $E_\infty$ for each of the following signals:

(a) $x_1(t)=e^{-2t}u(t)$  (b) $x_2(t)=e^{j(2t+\pi/4)}$  (c) $x_3(t)=\cos t$

(d) $x_1[n]=\left(\tfrac12\right)^n u[n]$  (e) $x_2[n]=e^{j(\pi n/2+\pi/8)}$  (f) $x_3[n]=\cos\left(\tfrac{\pi}{4}n\right)$`,
    solution: r`Use the definitions

$$E_\infty=\int_{-\infty}^{\infty}|x(t)|^2dt,\qquad P_\infty=\lim_{T\to\infty}\frac1{2T}\int_{-T}^{T}|x(t)|^2dt$$

and, in discrete time, $E_\infty=\sum_n|x[n]|^2$ and $P_\infty=\lim_{N\to\infty}\frac1{2N+1}\sum_{-N}^{N}|x[n]|^2$.

A useful shortcut: **finite energy forces zero power**, and **non-zero power forces infinite energy**.

**(a)** $|x_1(t)|^2=e^{-4t}$ for $t\ge0$:

$$E_\infty=\int_0^\infty e^{-4t}dt=\frac14,\qquad P_\infty=0.$$
` + fig("bk-s-energy") + r`
**(b)** $|e^{j\theta}|=1$, so $|x_2(t)|^2=1$ for every $t$. The integral of 1 over all time diverges: $E_\infty=\infty$. The average is $\frac1{2T}\cdot2T=1$, so $P_\infty=1$.

**(c)** $\cos^2t=\frac12+\frac12\cos2t$. The constant $\tfrac12$ integrates to infinity, so $E_\infty=\infty$. The cosine term averages to zero over a long window, so

$$P_\infty=\lim_{T\to\infty}\frac1{2T}\int_{-T}^{T}\left(\tfrac12+\tfrac12\cos2t\right)dt=\frac12.$$

**(d)** $|x_1[n]|^2=\left(\frac14\right)^n$ for $n\ge0$, a geometric series:

$$E_\infty=\sum_{n=0}^{\infty}\left(\tfrac14\right)^n=\frac{1}{1-\frac14}=\frac43,\qquad P_\infty=0.$$

**(e)** Every sample has $|x_2[n]|=1$, so $E_\infty=\infty$ and $P_\infty=\frac{2N+1}{2N+1}=1$.

**(f)** $\cos^2\left(\tfrac\pi4n\right)=\tfrac12+\tfrac12\cos\left(\tfrac\pi2n\right)$. The second term runs through $1,0,-1,0,\dots$ and averages to zero, so $E_\infty=\infty$ and $P_\infty=\tfrac12$.

| signal | $E_\infty$ | $P_\infty$ |
|---|---|---|
| (a) $e^{-2t}u(t)$ | $1/4$ | $0$ |
| (b) $e^{j(2t+\pi/4)}$ | $\infty$ | $1$ |
| (c) $\cos t$ | $\infty$ | $1/2$ |
| (d) $(1/2)^nu[n]$ | $4/3$ | $0$ |
| (e) $e^{j(\pi n/2+\pi/8)}$ | $\infty$ | $1$ |
| (f) $\cos(\pi n/4)$ | $\infty$ | $1/2$ |`,
  },
  {
    id: "bk-opp-1.4",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.4",
    prompt: r`Let $x[n]$ be a signal with $x[n]=0$ for $n<-2$ and $n>4$. For each signal below, determine the values of $n$ for which it is guaranteed to be zero.

(a) $x[n-3]$  (b) $x[n+4]$  (c) $x[-n]$  (d) $x[-n+2]$  (e) $x[-n-2]$`,
    solution: r`$x[\cdot]$ can only be non-zero when its **argument** lies in $[-2,4]$. So for each part, solve "$-2\le\text{argument}\le4$" for $n$. Outside that range the signal is guaranteed to be zero.

**(a)** $-2\le n-3\le4\iff 1\le n\le7$. Zero for $n<1$ and $n>7$.

**(b)** $-2\le n+4\le4\iff -6\le n\le0$. Zero for $n<-6$ and $n>0$.

**(c)** $-2\le -n\le4\iff -4\le n\le2$. Zero for $n<-4$ and $n>2$.

**(d)** $-2\le -n+2\le4\iff -4\le -n\le2\iff -2\le n\le4$. Zero for $n<-2$ and $n>4$. This is the same range as $x[n]$ itself: reflection about $n=1$ maps $[-2,4]$ onto itself.
` + fig("bk-s-support") + r`
**(e)** $-2\le -n-2\le4\iff 0\le -n\le6\iff -6\le n\le0$. Zero for $n<-6$ and $n>0$.

Notice that (b) and (e) give the same range even though they are different signals. One is a shift of $x$; the other is a shift and a reversal.`,
  },
  {
    id: "bk-opp-1.5",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.5",
    prompt: r`Let $x(t)$ be a signal with $x(t)=0$ for $t<3$. For each signal below, determine the values of $t$ for which it is guaranteed to be zero.

(a) $x(1-t)$  (b) $x(1-t)+x(2-t)$  (c) $x(1-t)\,x(2-t)$  (d) $x(3t)$  (e) $x(t/3)$`,
    solution: r`$x(\cdot)$ is zero whenever its argument is less than 3. For each part, find where the argument is below 3.

**(a)** $1-t<3\iff t>-2$. So $x(1-t)=0$ for $t>-2$.

**(b)** A sum is guaranteed to be zero only where **both** terms are zero.
- $x(1-t)=0$ for $t>-2$.
- $x(2-t)=0$ for $2-t<3$, i.e. $t>-1$.

Both hold for $t>-1$.

**(c)** A product is zero where **either** factor is zero: $t>-2$ or $t>-1$. Together that is $t>-2$.

**(d)** $3t<3\iff t<1$. Compression keeps the edge at $t=3/3=1$.

**(e)** $t/3<3\iff t<9$. Stretching by 3 moves the edge out to $t=9$.

Comparing (b) and (c): for a sum, the zero region is the **intersection** of the two zero regions; for a product, it is their **union**.`,
  },
  {
    id: "bk-opp-1.21",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.21",
    prompt: r`A continuous-time signal $x(t)$ is shown below. Sketch and label carefully each of the following signals:

(a) $x(t-1)$  (b) $x(2-t)$  (c) $x(2t+1)$  (d) $x\left(4-\tfrac t2\right)$  (e) $[x(t)+x(-t)]u(t)$  (f) $x(t)\left[\delta\left(t+\tfrac32\right)-\delta\left(t-\tfrac32\right)\right]$
` + fig("bk-s-121"),
    solution: r`**A reliable method for $x(at+b)$.** Do not try to picture the operations in your head. Take each corner $\tau$ of $x$ (the points where it jumps or changes slope) and find the time $t$ at which $at+b=\tau$:

$$t=\frac{\tau-b}{a}.$$

The value at that corner is unchanged; only its position moves. The corners of $x$ are at $\tau=-2,-1,0,1,2$.

| part | rule $t=\dots$ | $\tau=-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|---|---|
| (a) $x(t-1)$ | $\tau+1$ | $-1$ | $0$ | $1$ | $2$ | $3$ |
| (b) $x(2-t)$ | $2-\tau$ | $4$ | $3$ | $2$ | $1$ | $0$ |
| (c) $x(2t+1)$ | $(\tau-1)/2$ | $-1.5$ | $-1$ | $-0.5$ | $0$ | $0.5$ |
| (d) $x(4-t/2)$ | $8-2\tau$ | $12$ | $10$ | $8$ | $6$ | $4$ |

- (a) is a shift right by 1.
- (b) is a reversal followed by a shift.
- (c) compresses $x$ by 2, so it lasts only 2 units.
- (d) reverses $x$ and stretches it by 2, so the piece that was on $(0,1)$ at height 2 now covers $6<t<8$.
` + fig("bk-s-121-sol") + r`
**(e)** For $t>0$ we need $x(t)$ and the mirror value $x(-t)$:

- $0<t<1$: $x(t)=2$ and $x(-t)=1$ (since $-t\in(-1,0)$). The sum is $3$.
- $1<t<2$: $x(t)=2-t$. Here $-t\in(-2,-1)$, where $x(\tau)=\tau+1$, so $x(-t)=1-t$. The sum is $3-2t$, falling from $1$ to $-1$.
- $t>2$: both terms are zero.

Multiplying by $u(t)$ erases everything for $t<0$.

**(f)** The sampling property $x(t)\delta(t-t_0)=x(t_0)\delta(t-t_0)$ gives

$$x\left(-\tfrac32\right)\delta\left(t+\tfrac32\right)-x\left(\tfrac32\right)\delta\left(t-\tfrac32\right).$$

Read the values off the graph: on the ramp $t+1$, $x(-\tfrac32)=-\tfrac12$; on the ramp $2-t$, $x(\tfrac32)=\tfrac12$. The result is

$$-\tfrac12\,\delta\left(t+\tfrac32\right)-\tfrac12\,\delta\left(t-\tfrac32\right).$$
` + fig("bk-s-121-ef"),
  },
  {
    id: "bk-opp-1.22",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.22",
    prompt: r`A discrete-time signal $x[n]$ is shown below. Sketch and label carefully each of the following signals:

(a) $x[n-4]$  (b) $x[3-n]$  (c) $x[3n]$  (d) $x[3n+1]$  (e) $x[n]u[3-n]$  (f) $x[n-2]\delta[n-2]$  (g) $\tfrac12x[n]+\tfrac12(-1)^nx[n]$  (h) $x[(n-1)^2]$
` + fig("bk-s-122"),
    solution: r`In discrete time the safest method is a **table**: for each output index $n$, compute the argument and read $x$ at that argument.

**(a)** $x[n-4]$ is $x$ shifted right by 4. The samples now run from $n=0$ (value $-1$) to $n=7$ (value $\tfrac12$).

**(b)** $y[n]=x[3-n]$:

| $n$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| $3-n$ | 3 | 2 | 1 | 0 | $-1$ | $-2$ | $-3$ | $-4$ |
| $y[n]$ | $\tfrac12$ | 1 | 1 | 1 | 1 | $\tfrac12$ | $-\tfrac12$ | $-1$ |

**(c)** $x[3n]$ keeps only $x[\dots,-6,-3,0,3,6,\dots]$:
- $n=-1$ gives $x[-3]=-\tfrac12$;
- $n=0$ gives $x[0]=1$;
- $n=1$ gives $x[3]=\tfrac12$;
- everything else is zero.

Samples in between are **lost**. Unlike in continuous time, discrete compression throws information away.

**(d)** $x[3n+1]$ reads $x[\dots,-5,-2,1,4,\dots]$:
- $n=-1$ gives $x[-2]=\tfrac12$;
- $n=0$ gives $x[1]=1$;
- $n=1$ gives $x[4]=0$.

So the result is $\tfrac12\delta[n+1]+\delta[n]$.

**(e)** $u[3-n]=1$ for $n\le3$. Since $x[n]=0$ for $n>3$ anyway, the product is just $x[n]$.

**(f)** $\delta[n-2]$ picks out a single sample. Evaluate $x[n-2]$ at $n=2$: $x[0]=1$. The result is $\delta[n-2]$.

**(g)** $\tfrac12\left(1+(-1)^n\right)$ is $1$ for even $n$ and $0$ for odd $n$. So the signal keeps the even-indexed samples: $x[-4]=-1$, $x[-2]=\tfrac12$, $x[0]=1$, $x[2]=1$.

**(h)** $(n-1)^2$ takes only the values $0,1,4,9,\dots$:
- $n=1$ gives $x[0]=1$;
- $n=0,2$ give $x[1]=1$;
- $n=-1,3$ give $x[4]=0$.

The result is $\delta[n]+\delta[n-1]+\delta[n-2]$.
` + fig("bk-s-122-sol"),
  },
  {
    id: "bk-tan-3.20",
    topic: "signals",
    book: "Tan",
    ref: "Problem 3.20",
    prompt: r`Given the sequence

$$h(k)=\begin{cases}2,& k=0,1,2\\1,& k=3,4\\0,&\text{elsewhere}\end{cases}$$

where $k$ is the time index:

(a) sketch the sequence $h(k)$ and the reversed sequence $h(-k)$;

(b) sketch the shifted sequences $h(-k+2)$ and $h(-k-3)$.`,
    solution: r`**(a)** $h(-k)$ takes the value $h$ has at the mirror index. So the 2's move to $k=0,-1,-2$ and the 1's to $k=-3,-4$.

**(b)** Write each argument as a reversal of a shifted index:

$$h(-k+2)=h\big(-(k-2)\big),\qquad h(-k-3)=h\big(-(k+3)\big).$$

So $h(-k+2)$ is $h(-k)$ moved **right** by 2: the 2's sit at $k=0,1,2$ and the 1's at $k=-1,-2$.

$h(-k-3)$ is $h(-k)$ moved **left** by 3: the 2's sit at $k=-3,-4,-5$ and the 1's at $k=-6,-7$.

Check one point directly. For $h(-k+2)$ at $k=-2$, the argument is $-(-2)+2=4$ and $h(4)=1$. ✓
` + fig("bk-s-tan320") + r`
This is exactly the sliding $h(n-k)$ used in the convolution sum: $h(-k+n)$ is the mirror image placed with its origin at $k=n$.`,
  },
  {
    id: "bk-opp-1.23",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.23",
    prompt: r`Determine and sketch the even and odd parts of the signals depicted below. Label your sketches carefully.
` + fig("bk-s-123"),
    solution: r`Use

$$x_e(t)=\frac{x(t)+x(-t)}2,\qquad x_o(t)=\frac{x(t)-x(-t)}2.$$

So you need $x(-t)$, the mirror image, then half the sum and half the difference. It is enough to work for $t>0$ and use symmetry: $x_e(-t)=x_e(t)$ and $x_o(-t)=-x_o(t)$.

**(a)** For $t>0$, $x(-t)=0$ because the mirror image lives at negative $t$. So for $t>0$, $x_e=x_o=\tfrac12x(t)$, a half-height triangle on $(0,2)$. For $t<0$, the even part copies it, and the odd part copies it with a minus sign.
` + fig("bk-s-123a") + r`
**(b)** Describe $x$ piece by piece:
- $x(\tau)=\tau+2$ on $(-2,-1)$;
- $x(\tau)=-\tau$ on $(-1,0)$;
- $x(\tau)=\tau$ on $(0,1)$;
- $x(\tau)=1$ for $\tau>1$.

| $t$ range | $x(t)$ | $x(-t)$ | $x_e(t)$ | $x_o(t)$ |
|---|---|---|---|---|
| $0<t<1$ | $t$ | $t$ | $t$ | $0$ |
| $1<t<2$ | $1$ | $2-t$ | $\frac{3-t}{2}$ | $\frac{t-1}{2}$ |
| $t>2$ | $1$ | $0$ | $\frac12$ | $\frac12$ |

Near the origin $x$ is already even, so the odd part is zero there.
` + fig("bk-s-123b") + r`
**(c)** For $t>0$: $x(t)=t$ and $x(-t)=-2(-t)=2t$. So

$$x_e(t)=\frac{t+2t}2=\frac32t,\qquad x_o(t)=\frac{t-2t}2=-\frac t2.$$

Extending by symmetry gives $x_e(t)=\tfrac32|t|$ and $x_o(t)=-\tfrac t2$ for all $t$. Check at $t=-1$: $x_e+x_o=\tfrac32+\tfrac12=2=x(-1)$. ✓
` + fig("bk-s-123c"),
  },
  {
    id: "bk-opp-1.24",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.24",
    prompt: r`Determine and sketch the even and odd parts of the signals depicted below. Label your sketches carefully.
` + fig("bk-s-124"),
    solution: r`In discrete time, use the same formulas sample by sample:

$$x_e[n]=\frac{x[n]+x[-n]}{2},\qquad x_o[n]=\frac{x[n]-x[-n]}{2}.$$

Two facts check every answer: $x_o[0]=0$ always, and $x_e[0]=x[0]$.

**(a)** For $n>0$: $x[n]=1$ and $x[-n]=-1$, so $x_e[n]=0$ and $x_o[n]=1$. At $n=0$: $x_e[0]=1$ and $x_o[0]=0$. So

$$x_e[n]=\delta[n],\qquad x_o[n]=\begin{cases}1,&n>0\\0,&n=0\\-1,&n<0.\end{cases}$$
` + fig("bk-s-124a") + r`
**(b)** Non-zero samples: $x[-2]=1$, $x[-1]=2$, $x[0]=3$, $x[7]=1$.

| $n$ | 0 | 1 | 2 | 7 |
|---|---|---|---|---|
| $x[n]$ | 3 | 0 | 0 | 1 |
| $x[-n]$ | 3 | 2 | 1 | 0 |
| $x_e[n]=x_e[-n]$ | 3 | 1 | $\tfrac12$ | $\tfrac12$ |
| $x_o[n]=-x_o[-n]$ | 0 | $-1$ | $-\tfrac12$ | $\tfrac12$ |
` + fig("bk-s-124b") + r`
**(c)** Non-zero samples, for $n=-4,\dots,3$: $-1,2,2,1,1,2,1,-1$.

| $n$ | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| $x[n]$ | 1 | 2 | 1 | $-1$ | 0 |
| $x[-n]$ | 1 | 1 | 2 | 2 | $-1$ |
| $x_e[n]$ | 1 | $\tfrac32$ | $\tfrac32$ | $\tfrac12$ | $-\tfrac12$ |
| $x_o[n]$ | 0 | $\tfrac12$ | $-\tfrac12$ | $-\tfrac32$ | $\tfrac12$ |

Fill in negative $n$ by symmetry. Check $n=-3$: $x_e[-3]+x_o[-3]=\tfrac12+\tfrac32=2=x[-3]$. ✓
` + fig("bk-s-124c"),
  },
  {
    id: "bk-opp-1.7",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.7",
    prompt: r`For each signal given below, determine all the values of the independent variable at which the even part of the signal is guaranteed to be zero.

(a) $x_1[n]=u[n]-u[n-4]$  (b) $x_2(t)=\sin\left(\tfrac12t\right)$  (c) $x_3[n]=\left(\tfrac12\right)^nu[n-3]$  (d) $x_4(t)=e^{-5t}u(t+2)$`,
    solution: r`$x_e$ at a point depends on the signal at that point **and** at its mirror image: $x_e(t)=\frac{x(t)+x(-t)}2$. It is guaranteed to be zero wherever **both** values are zero, or wherever they always cancel.

**(a)** $x_1[n]=1$ for $n=0,1,2,3$ and zero elsewhere. Then $x_1[-n]$ is non-zero for $n=-3,\dots,0$. The even part is non-zero for $|n|\le3$, and **zero for $|n|>3$**.

**(b)** $\sin(t/2)$ is odd, so $x(t)+x(-t)=0$ for every $t$. The even part is **zero for all $t$**.

**(c)** $x_3[n]$ is non-zero only for $n\ge3$, and $x_3[-n]$ only for $n\le-3$. Both are zero for $-2\le n\le2$. So the even part is zero for **$|n|<3$, i.e. $n=-2,-1,0,1,2$**.

**(d)** $x_4(t)>0$ for $t>-2$. For any $t$, at least one of $t$ and $-t$ is greater than $-2$, so at least one term is positive. Both terms are never negative, so they cannot cancel. The even part is **never** guaranteed to be zero; no such $t$ exists.`,
  },
  {
    id: "bk-opp-1.34",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.34",
    prompt: r`Several properties of even and odd signals:

(a) Show that if $x[n]$ is an odd signal, then $\sum_{n=-\infty}^{\infty}x[n]=0$.

(b) Show that if $x_1[n]$ is odd and $x_2[n]$ is even, then $x_1[n]x_2[n]$ is odd.

(c) Let $x_e[n]$ and $x_o[n]$ be the even and odd parts of $x[n]$. Show that $\sum_n x^2[n]=\sum_n x_e^2[n]+\sum_n x_o^2[n]$.

(d) Show the continuous-time version: $\int x^2(t)\,dt=\int x_e^2(t)\,dt+\int x_o^2(t)\,dt$.`,
    solution: r`**(a)** "Odd" means $x[-n]=-x[n]$. At $n=0$ this gives $x[0]=-x[0]$, so $x[0]=0$. Pair every $n>0$ with $-n$:

$$\sum_{n=-\infty}^{\infty}x[n]=x[0]+\sum_{n=1}^{\infty}\big(x[n]+x[-n]\big)=0+\sum_{n=1}^{\infty}\big(x[n]-x[n]\big)=0.$$

**(b)** Let $y[n]=x_1[n]x_2[n]$. Then

$$y[-n]=x_1[-n]\,x_2[-n]=\big(-x_1[n]\big)\big(x_2[n]\big)=-y[n],$$

so $y$ is odd. The rule is the same as for signs: odd × even = odd, even × even = even, odd × odd = even.

**(c)** Expand the square of $x=x_e+x_o$:

$$\sum_n x^2[n]=\sum_n x_e^2[n]+\sum_n x_o^2[n]+2\sum_n x_e[n]x_o[n].$$

By (b), $x_ex_o$ is odd, and by (a), its sum is zero. The cross term vanishes, which proves the result. In words, **the energy of a signal is the energy of its even part plus the energy of its odd part**.

**(d)** The same argument works with integrals. $x_e(t)x_o(t)$ is odd, and the integral of an odd function over a symmetric range is zero, because the area for $t<0$ cancels the area for $t>0$. So

$$\int_{-\infty}^{\infty}x^2(t)dt=\int_{-\infty}^{\infty}x_e^2(t)dt+\int_{-\infty}^{\infty}x_o^2(t)dt.$$

Quick check with Problem 1.24(b): $x$ has energy $1+4+9+1=15$. Its even part has $9+2(1+\tfrac14+\tfrac14)=12$ and its odd part $2(1+\tfrac14+\tfrac14)=3$, and $12+3=15$. ✓`,
  },
  {
    id: "bk-opp-1.32",
    topic: "signals",
    book: "Oppenheim",
    ref: "Problem 1.32",
    prompt: r`Let $x(t)$ be a continuous-time signal, and let $y_1(t)=x(2t)$ and $y_2(t)=x(t/2)$. $y_1$ is a sped-up version of $x$ and $y_2$ a slowed-down version. For each statement, decide whether it is true. If it is, give the relation between the fundamental periods; if not, give a counterexample.

(1) If $x(t)$ is periodic, then $y_1(t)$ is periodic.
(2) If $y_1(t)$ is periodic, then $x(t)$ is periodic.
(3) If $x(t)$ is periodic, then $y_2(t)$ is periodic.
(4) If $y_2(t)$ is periodic, then $x(t)$ is periodic.`,
    solution: r`In continuous time, time scaling can be **undone exactly**: $x(t)=y_1(t/2)=y_2(2t)$. So periodicity passes both ways, and only the period is scaled. Let $T$ be the fundamental period of $x$.

**(1) True.**

$$y_1\!\left(t+\tfrac T2\right)=x(2t+T)=x(2t)=y_1(t).$$

So $y_1$ has period $T/2$. Twice as fast means half the period.

**(2) True.** If $y_1$ has period $T_1$, then $x(t)=y_1(t/2)$ satisfies $x(t+2T_1)=y_1(t/2+T_1)=y_1(t/2)=x(t)$. So $x$ has period $2T_1$.

**(3) True.** $y_2(t+2T)=x(t/2+T)=x(t/2)=y_2(t)$, so $y_2$ has period $2T$.

**(4) True.** If $y_2$ has period $T_2$, then $x(t)=y_2(2t)$ has period $T_2/2$.

Each relation also holds for the **fundamental** periods, because scaling maps any smaller period of one signal to a smaller period of the other.

Compare with the discrete-time version (Problem 1.33 under the next topic). There $x[2n]$ throws away every odd sample, the operation cannot be undone, and statement (2) fails.`,
  },
]
