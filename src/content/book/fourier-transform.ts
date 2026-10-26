import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const fourierTransformBook: BookProblem[] = [
  {
    id: "bk-opp-4.1",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.1",
    prompt: r`Use the Fourier transform analysis equation to calculate the Fourier transforms of:

(a) $e^{-2(t-1)}u(t-1)$  (b) $e^{-2|t-1|}$

Sketch and label the magnitude of each Fourier transform.`,
    solution: r`Use $X(j\omega)=\int_{-\infty}^{\infty}x(t)e^{-j\omega t}dt$.

**(a)** The signal is zero for $t<1$:

$$X(j\omega)=\int_1^\infty e^{-2(t-1)}e^{-j\omega t}dt.$$

Substitute $\tau=t-1$, so $e^{-j\omega t}=e^{-j\omega}e^{-j\omega\tau}$:

$$X(j\omega)=e^{-j\omega}\int_0^\infty e^{-(2+j\omega)\tau}d\tau=\frac{e^{-j\omega}}{2+j\omega},\qquad|X(j\omega)|=\frac{1}{\sqrt{4+\omega^2}}.$$

**(b)** The same substitution gives $e^{-j\omega}$ times the transform of $e^{-2|\tau|}$. Split that at $\tau=0$:

$$\int_{-\infty}^0e^{(2-j\omega)\tau}d\tau+\int_0^\infty e^{-(2+j\omega)\tau}d\tau=\frac1{2-j\omega}+\frac1{2+j\omega}=\frac{4}{4+\omega^2}.$$

$$X(j\omega)=\frac{4e^{-j\omega}}{4+\omega^2},\qquad|X(j\omega)|=\frac{4}{4+\omega^2}.$$
` + fig("bk-ft-41") + r`
The substitution $\tau=t-1$ is the **time-shift property** at work: a delay never changes $|X|$, only the phase, by $-\omega t_0$.`,
  },
  {
    id: "bk-opp-4.3",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.3",
    prompt: r`Determine the Fourier transform of each of the following periodic signals:

(a) $\sin\left(2\pi t+\frac\pi4\right)$  (b) $1+\cos\left(6\pi t+\frac\pi8\right)$`,
    solution: r`The key pair is $e^{j\omega_0t}\longleftrightarrow2\pi\delta(\omega-\omega_0)$. Expand each signal into complex exponentials and replace each one by an impulse.

**(a)**

$$\sin\left(2\pi t+\tfrac\pi4\right)=\frac{e^{j\pi/4}e^{j2\pi t}-e^{-j\pi/4}e^{-j2\pi t}}{2j}.$$

So

$$X(j\omega)=\frac{\pi}{j}\Big[e^{j\pi/4}\delta(\omega-2\pi)-e^{-j\pi/4}\delta(\omega+2\pi)\Big].$$

**(b)**

$$1+\cos\left(6\pi t+\tfrac\pi8\right)=1+\tfrac12e^{j\pi/8}e^{j6\pi t}+\tfrac12e^{-j\pi/8}e^{-j6\pi t}.$$

So

$$X(j\omega)=2\pi\delta(\omega)+\pi e^{j\pi/8}\delta(\omega-6\pi)+\pi e^{-j\pi/8}\delta(\omega+6\pi).$$
` + fig("bk-ft-43") + r`
Notice the factor $2\pi$. A Fourier series coefficient $a_k$ becomes an impulse of area $2\pi a_k$ at $k\omega_0$.`,
  },
  {
    id: "bk-opp-4.4",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.4",
    prompt: r`Use the Fourier transform synthesis equation to determine the inverse Fourier transforms of:

(a) $X_1(j\omega)=2\pi\delta(\omega)+\pi\delta(\omega-4\pi)+\pi\delta(\omega+4\pi)$

(b) $X_2(j\omega)=\begin{cases}2,&0\le\omega\le2\\-2,&-2\le\omega<0\\0,&|\omega|>2\end{cases}$`,
    solution: r`Use $x(t)=\frac1{2\pi}\int X(j\omega)e^{j\omega t}d\omega$.

**(a)** Each impulse is picked out by the integral:

$$x_1(t)=\frac1{2\pi}\left[2\pi+\pi e^{j4\pi t}+\pi e^{-j4\pi t}\right]=1+\cos(4\pi t).$$

**(b)** Integrate the two halves:

$$x_2(t)=\frac1{2\pi}\left[\int_0^22e^{j\omega t}d\omega-\int_{-2}^02e^{j\omega t}d\omega\right]=\frac1{\pi}\left[\frac{e^{j2t}-1}{jt}-\frac{1-e^{-j2t}}{jt}\right].$$

The bracket is $\frac{2\cos2t-2}{jt}$, so

$$x_2(t)=\frac{2(\cos2t-1)}{j\pi t}=\frac{2j(1-\cos2t)}{\pi t}=\frac{4j\sin^2t}{\pi t}.$$

Check with symmetry: $X_2$ is real and odd, so $x_2$ must be purely imaginary and odd, and it is.`,
  },
  {
    id: "bk-opp-4.5",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.5",
    prompt: r`Use the Fourier transform synthesis equation to determine the inverse Fourier transform of $X(j\omega)=|X(j\omega)|e^{j\angle X(j\omega)}$, where

$$|X(j\omega)|=2\{u(\omega+3)-u(\omega-3)\},\qquad\angle X(j\omega)=-\tfrac32\omega+\pi.$$

Use your answer to determine the values of $t$ for which $x(t)=0$.`,
    solution: r`Inside the band, $X(j\omega)=2e^{j\pi}e^{-j\frac32\omega}=-2e^{-j\frac32\omega}$ for $|\omega|<3$. Then

$$x(t)=\frac1{2\pi}\int_{-3}^{3}-2e^{j\omega(t-\frac32)}d\omega=-\frac1\pi\cdot\frac{2\sin\left(3\left(t-\frac32\right)\right)}{t-\frac32}.$$

$$\boxed{x(t)=-\frac{2\sin\left(3\left(t-\frac32\right)\right)}{\pi\left(t-\frac32\right)}}$$

Read the phase term by term:
- $-\frac32\omega$ is a **delay** of $\frac32$;
- $+\pi$ is a factor $e^{j\pi}=-1$.

So $x(t)$ is the familiar sinc of a band-limited rectangle, flipped and moved to $t=\frac32$.

**Zeros:** $\sin\left(3(t-\frac32)\right)=0$ but $t\ne\frac32$, because at $t=\frac32$ the limit is $-\frac6\pi\ne0$:

$$t=\frac32+\frac{k\pi}3,\qquad k=\pm1,\pm2,\dots$$
` + fig("bk-ft-45"),
  },
  {
    id: "bk-opp-4.6",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.6",
    prompt: r`Given that $x(t)$ has the Fourier transform $X(j\omega)$, express the Fourier transforms of the signals listed below in terms of $X(j\omega)$:

(a) $x_1(t)=x(1-t)+x(-1-t)$  (b) $x_2(t)=x(3t-6)$  (c) $x_3(t)=\dfrac{d^2}{dt^2}x(t-1)$`,
    solution: r`Rewrite each signal so that the operations are applied in a clear order, then use the properties one at a time:
- reversal: $x(-t)\leftrightarrow X(-j\omega)$;
- shift: $x(t-t_0)\leftrightarrow e^{-j\omega t_0}X(j\omega)$;
- scaling: $x(at)\leftrightarrow\frac1{|a|}X\left(\frac{j\omega}a\right)$;
- differentiation: $\frac{d}{dt}\leftrightarrow j\omega$.

**(a)** $x(1-t)=x\big(-(t-1)\big)$ is the reversed signal delayed by 1, and $x(-1-t)=x\big(-(t+1)\big)$ is the reversed signal advanced by 1:

$$X_1(j\omega)=X(-j\omega)e^{-j\omega}+X(-j\omega)e^{j\omega}=2X(-j\omega)\cos\omega.$$

**(b)** $x(3t-6)=x\big(3(t-2)\big)$: scale by 3, then delay by 2:

$$X_2(j\omega)=\frac13X\left(\frac{j\omega}{3}\right)e^{-j2\omega}.$$

Watch the delay. It is 2, not 6, because the shift is applied after the scaling.

**(c)** Delay by 1, then differentiate twice:

$$X_3(j\omega)=(j\omega)^2e^{-j\omega}X(j\omega)=-\omega^2e^{-j\omega}X(j\omega).$$`,
  },
  {
    id: "bk-opp-4.8",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.8",
    prompt: r`Consider the signal

$$x(t)=\begin{cases}0,&t<-\frac12\\t+\frac12,&-\frac12\le t\le\frac12\\1,&t>\frac12.\end{cases}$$

(a) Use the differentiation and integration properties and the Fourier transform pair for the rectangular pulse to find a closed-form expression for $X(j\omega)$.

(b) What is the Fourier transform of $g(t)=x(t)-\frac12$?`,
    solution: r`**(a)** Differentiate first. $\frac{dx}{dt}$ is 1 on $|t|<\frac12$ and 0 elsewhere: the unit rectangle of width 1.

$$\frac{dx}{dt}\longleftrightarrow R(j\omega)=\frac{2\sin(\omega/2)}{\omega}.$$

Now integrate back, since $x(t)=\int_{-\infty}^t\frac{dx}{d\tau}d\tau$. The integration property is

$$\int_{-\infty}^{t}v(\tau)d\tau\longleftrightarrow\frac{V(j\omega)}{j\omega}+\pi V(0)\delta(\omega).$$

Here $V=R$ and $R(0)=1$, the area of the rectangle:

$$\boxed{X(j\omega)=\frac{2\sin(\omega/2)}{j\omega^2}+\pi\delta(\omega)}$$

The impulse is essential. $x$ tends to 1, not 0, as $t\to\infty$, so it has a "DC level" of $\frac12$ on average, and that becomes $\pi\delta(\omega)=2\pi\cdot\frac12\delta(\omega)$.
` + fig("bk-ft-48") + r`
**(b)** Subtracting the constant $\frac12$ removes $2\pi\cdot\frac12\delta(\omega)=\pi\delta(\omega)$:

$$G(j\omega)=\frac{2\sin(\omega/2)}{j\omega^2}.$$

Check: $g$ goes from $-\frac12$ to $+\frac12$ and is odd, so $G$ should be purely imaginary and odd, with no impulse. It is.`,
  },
  {
    id: "bk-opp-4.9",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.9",
    prompt: r`Consider the signal

$$x(t)=\begin{cases}0,&|t|>1\\(t+1)/2,&-1\le t\le1.\end{cases}$$

(a) Determine the closed-form expression for $X(j\omega)$. (b) Take the real part of your answer to part (a), and verify that it is the Fourier transform of the even part of $x(t)$. (c) What is the Fourier transform of the odd part of $x(t)$?`,
    solution: r`**(a)** Write $x(t)=\frac12p(t)+\frac12t\,p(t)$, where $p(t)$ is the rectangle on $|t|<1$, with $P(j\omega)=\frac{2\sin\omega}{\omega}$. Multiplying by $t$ in time is differentiating in frequency:

$$t\,p(t)\longleftrightarrow j\frac{dP}{d\omega}=j\cdot\frac{2(\omega\cos\omega-\sin\omega)}{\omega^2}.$$

So

$$X(j\omega)=\frac{\sin\omega}{\omega}+j\,\frac{\omega\cos\omega-\sin\omega}{\omega^2}.$$

**(b)** $\mathrm{Re}\{X\}=\frac{\sin\omega}{\omega}$. The even part of $x$ is

$$x_e(t)=\frac{x(t)+x(-t)}2=\frac12\cdot\frac{(t+1)+(1-t)}{2}=\frac12\quad(|t|<1).$$

That is half the rectangle, with transform $\frac12\cdot\frac{2\sin\omega}\omega=\frac{\sin\omega}\omega$. ✓

**(c)** The odd part is $x_o(t)=\frac t2$ for $|t|<1$. For a real signal, the odd part transforms to $j\,\mathrm{Im}\{X\}$:

$$\mathcal{F}\{x_o\}=j\,\frac{\omega\cos\omega-\sin\omega}{\omega^2}.$$
` + fig("bk-ft-49") + r`
This illustrates a general rule for **real** signals: even part $\leftrightarrow$ real part of $X$, odd part $\leftrightarrow$ $j\times$ imaginary part.`,
  },
  {
    id: "bk-opp-4.11",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.11",
    prompt: r`Given the relationships $y(t)=x(t)*h(t)$ and $g(t)=x(3t)*h(3t)$, and given that $x(t)$ has Fourier transform $X(j\omega)$ and $h(t)$ has Fourier transform $H(j\omega)$, use Fourier transform properties to show that $g(t)$ has the form $g(t)=Ay(Bt)$. Determine the values of $A$ and $B$.`,
    solution: r`Work in the frequency domain, where convolution becomes multiplication.

$$x(3t)\leftrightarrow\tfrac13X\left(\tfrac{j\omega}3\right),\qquad h(3t)\leftrightarrow\tfrac13H\left(\tfrac{j\omega}3\right).$$

So

$$G(j\omega)=\tfrac19X\left(\tfrac{j\omega}3\right)H\left(\tfrac{j\omega}3\right)=\tfrac19Y\left(\tfrac{j\omega}3\right).$$

Compare with the transform of $y(3t)$, which is $\frac13Y\left(\frac{j\omega}3\right)$. Then

$$G(j\omega)=\tfrac13\cdot\left[\tfrac13Y\left(\tfrac{j\omega}3\right)\right]\ \Rightarrow\ g(t)=\tfrac13\,y(3t).$$

$$\boxed{A=\tfrac13,\quad B=3}$$

**Intuition:** compressing both signals by 3 compresses their convolution by 3. The convolution integral also runs over a variable that has been compressed, which scales its area by $\frac13$. A quick check: two unit pulses of width 1 convolve to a triangle of height 1. Pulses of width $\frac13$ give a triangle of height $\frac13$.`,
  },
  {
    id: "bk-opp-4.12",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.12",
    prompt: r`Consider the Fourier transform pair

$$e^{-|t|}\longleftrightarrow\frac{2}{1+\omega^2}.$$

(a) Use the appropriate Fourier transform properties to find the Fourier transform of $te^{-|t|}$.

(b) Use the result from part (a), along with the duality property, to determine the Fourier transform of $\dfrac{4t}{(1+t^2)^2}$.`,
    solution: r`**(a)** Multiplication by $t$ means differentiation in frequency: $t\,x(t)\leftrightarrow j\frac{dX}{d\omega}$.

$$te^{-|t|}\longleftrightarrow j\frac{d}{d\omega}\left(\frac{2}{1+\omega^2}\right)=j\cdot\frac{-4\omega}{(1+\omega^2)^2}=\frac{-4j\omega}{(1+\omega^2)^2}.$$

**(b)** **Duality:** if $x(t)\leftrightarrow X(j\omega)$, then the function $X$, used as a signal in time, has transform $2\pi x(-\omega)$.

Apply it to the pair from (a), with $x(t)=te^{-|t|}$ and $X(j\omega)=\frac{-4j\omega}{(1+\omega^2)^2}$:

$$\frac{-4jt}{(1+t^2)^2}\longleftrightarrow2\pi(-\omega)e^{-|\omega|}.$$

Multiply both sides by $j$ (linearity), using $j\cdot(-4jt)=4t$:

$$\boxed{\frac{4t}{(1+t^2)^2}\longleftrightarrow-2\pi j\,\omega\,e^{-|\omega|}}$$

Check: the signal is real and odd, so its transform must be purely imaginary and odd. It is.`,
  },
  {
    id: "bk-opp-4.21g",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.21(g)",
    prompt: r`Compute the Fourier transform of the signal $x(t)$ shown below.
` + fig("bk-ft-421a"),
    solution: r`Integrating piece by piece works, but **differentiating first** is faster: $x$ is built from straight lines, so its derivative is made of rectangles and impulses.

$$\frac{dx}{dt}=\underbrace{-\delta(t+2)}_{\text{jump }0\to-1}+\underbrace{\mathrm{rect}_{|t|<1}}_{\text{slope 1 on }(-1,1)}\ \underbrace{-\,\delta(t-2)}_{\text{jump }1\to0}.$$

There are no jumps at $t=\pm1$, where the ramp meets the flat parts continuously. Transform each term:

$$\mathcal F\left\{\frac{dx}{dt}\right\}=-e^{j2\omega}+\frac{2\sin\omega}{\omega}-e^{-j2\omega}=\frac{2\sin\omega}{\omega}-2\cos2\omega.$$

At $\omega=0$ this is $2-2=0$, because $x$ starts and ends at 0. So dividing by $j\omega$ needs no extra impulse:

$$\boxed{X(j\omega)=\frac{1}{j\omega}\left(\frac{2\sin\omega}{\omega}-2\cos2\omega\right)=\frac{2j}{\omega}\left(\cos2\omega-\frac{\sin\omega}{\omega}\right)}$$
` + fig("bk-ft-421a-sol") + r`
Checks:
- $x$ is real and odd, so $X$ is purely imaginary and odd. ✓
- $X(0)=\int x\,dt=0$: near $\omega=0$, $\cos2\omega-\frac{\sin\omega}{\omega}\approx-\frac{11}{6}\omega^2$, so $X\to0$. ✓`,
  },
  {
    id: "bk-opp-4.22c",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.22(c)",
    prompt: r`Determine the continuous-time signal whose Fourier transform has the magnitude and phase plots shown below.
` + fig("bk-ft-422a"),
    solution: r`Assemble $X$ from its magnitude and phase:

$$X(j\omega)=|\omega|\,e^{-j3\omega},\qquad|\omega|<1.$$

The phase $-3\omega$ is linear, so it is just a **delay of 3**: $x(t)=v(t-3)$, where $v$ has the real, even spectrum $V(j\omega)=|\omega|$ on $|\omega|<1$.

Compute $v$ using evenness:

$$v(t)=\frac1{2\pi}\int_{-1}^1|\omega|e^{j\omega t}d\omega=\frac1\pi\int_0^1\omega\cos(\omega t)\,d\omega.$$

Integration by parts gives $\int_0^1\omega\cos\omega t\,d\omega=\frac{\sin t}{t}+\frac{\cos t-1}{t^2}$. So

$$\boxed{x(t)=\frac1\pi\left[\frac{\sin(t-3)}{t-3}+\frac{\cos(t-3)-1}{(t-3)^2}\right]}$$
` + fig("bk-ft-422a-sol") + r`
Check at the centre: $x(3)=\frac1{2\pi}\int|X|d\omega=\frac1{2\pi}$. The bracket tends to $1-\frac12=\frac12$, giving $\frac1{2\pi}$. ✓`,
  },
  {
    id: "bk-opp-4.23",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.23",
    prompt: r`Consider the signal

$$x_0(t)=\begin{cases}e^{-t},&0\le t\le1\\0,&\text{elsewhere.}\end{cases}$$

Determine the Fourier transform of each of the signals shown below. Evaluate explicitly **only** the transform of $x_0(t)$, then use properties.
` + fig("bk-ft-423"),
    solution: r`**The only integral:**

$$X_0(j\omega)=\int_0^1e^{-(1+j\omega)t}dt=\frac{1-e^{-(1+j\omega)}}{1+j\omega}.$$

Now read each signal as an operation on $x_0$.

**(a)** $x_1(t)=x_0(t)+x_0(-t)$. Reversal gives $X_0(-j\omega)$, and for real $x_0$ that equals $X_0^*(j\omega)$:

$$X_1(j\omega)=X_0(j\omega)+X_0(-j\omega)=2\,\mathrm{Re}\{X_0(j\omega)\}.$$

**(b)** $x_2(t)=x_0(t)-x_0(-t)$:

$$X_2(j\omega)=X_0(j\omega)-X_0(-j\omega)=2j\,\mathrm{Im}\{X_0(j\omega)\}.$$

**(c)** $x_3(t)=x_0(t)+x_0(t+1)$. An advance by 1 multiplies by $e^{j\omega}$:

$$X_3(j\omega)=X_0(j\omega)\left(1+e^{j\omega}\right).$$

**(d)** $x_4(t)=t\,x_0(t)$. Multiplying by $t$ means $j\frac{d}{d\omega}$:

$$X_4(j\omega)=j\frac{dX_0}{d\omega}=\frac{1-(2+j\omega)e^{-(1+j\omega)}}{(1+j\omega)^2}.$$

Check (d) at $\omega=0$: $\int_0^1te^{-t}dt=1-\frac2e$, and the formula gives $\frac{1-2e^{-1}}{1}$. ✓`,
  },
  {
    id: "bk-opp-4.25",
    topic: "fourier-transform",
    book: "Oppenheim",
    ref: "Problem 4.25",
    prompt: r`Let $X(j\omega)$ denote the Fourier transform of the signal $x(t)$ shown below.

(a) Find $\angle X(j\omega)$. (b) Find $X(j0)$. (c) Find $\int_{-\infty}^{\infty}X(j\omega)d\omega$. (d) Evaluate $\int_{-\infty}^{\infty}X(j\omega)\frac{2\sin\omega}{\omega}e^{j2\omega}d\omega$. (e) Evaluate $\int_{-\infty}^{\infty}|X(j\omega)|^2d\omega$. (f) Sketch the inverse Fourier transform of $\mathrm{Re}\{X(j\omega)\}$.

Do all of this **without** explicitly evaluating $X(j\omega)$.
` + fig("bk-ft-425"),
    solution: r`**(a)** $x$ is symmetric about $t=1$, so $x(t+1)$ is real and even, and its transform $R(\omega)$ is real. The shift back by 1 multiplies by $e^{-j\omega}$:

$$X(j\omega)=e^{-j\omega}R(\omega)\ \Rightarrow\ \angle X(j\omega)=-\omega.$$

(Add $\pi$ wherever $R(\omega)<0$; the phase is linear apart from these sign flips.)

**(b)** $X(j0)=\int x(t)dt$, the area:
- $2$ on $(-1,0)$ gives 2;
- the V on $(0,2)$ is a trapezoid of average height $1.5$, giving 3;
- $2$ on $(2,3)$ gives 2.

So $X(j0)=7$.

**(c)** The synthesis equation at $t=0$ gives $\int X(j\omega)d\omega=2\pi x(0)=2\pi\cdot2=4\pi$.

**(d)** $\frac{2\sin\omega}{\omega}$ is the transform of $p(t)$, a unit pulse on $|t|<1$. So $X\cdot\frac{2\sin\omega}{\omega}$ is the transform of $y=x*p$, and the integral is $2\pi y(2)$ by the synthesis equation at $t=2$. Since

$$y(2)=\int_{1}^{3}x(\tau)d\tau=1.5+2=3.5,$$

the result is $2\pi\cdot3.5=7\pi$.

**(e)** Parseval: $\int|X|^2d\omega=2\pi\int|x|^2dt$. Here

$$\int x^2dt=4+\tfrac73+\tfrac73+4=\tfrac{38}3,$$

so the integral is $\frac{76\pi}{3}$.

**(f)** For a real signal, $\mathrm{Re}\{X\}$ is the transform of the even part $x_e(t)=\frac{x(t)+x(-t)}2$. For $t>0$:
- on $(0,1)$: $\frac{(2-t)+2}{2}=2-\frac t2$;
- on $(1,2)$: $\frac{t+0}{2}=\frac t2$;
- on $(2,3)$: $1$;
- beyond 3: 0.

Mirror this for $t<0$.
` + fig("bk-ft-425-sol"),
  },
]
