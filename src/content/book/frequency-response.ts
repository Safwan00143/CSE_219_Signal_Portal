import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const frequencyResponseBook: BookProblem[] = [
  {
    id: "bk-opp-3.17",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 3.17",
    prompt: r`Consider three continuous-time systems $S_1$, $S_2$ and $S_3$ whose responses to a complex exponential input $e^{j5t}$ are specified as

$$S_1:\ e^{j5t}\to te^{j5t},\qquad S_2:\ e^{j5t}\to e^{j5(t-1)},\qquad S_3:\ e^{j5t}\to\cos(5t).$$

For each system, determine whether the given information is sufficient to conclude that the system is definitely **not** LTI.`,
    solution: r`**The eigenfunction property:** for any LTI system, $e^{j\omega t}\to H(j\omega)e^{j\omega t}$. The output is the **same** exponential times a **constant** (possibly complex). Any other kind of output rules out LTI.

**$S_1$: definitely not LTI.** The output $te^{j5t}$ is the input times $t$, which is not a constant.

**$S_2$: cannot conclude.** $e^{j5(t-1)}=e^{-j5}\cdot e^{j5t}$, a constant times the input. That is consistent with an LTI system with $H(j5)=e^{-j5}$, such as a delay of 1. One input-output pair cannot prove a system is LTI, only rule it out.

**$S_3$: definitely not LTI.** $\cos5t=\tfrac12e^{j5t}+\tfrac12e^{-j5t}$ contains the frequency $-5$, which was not in the input. An LTI system can never create new frequencies.`,
  },
  {
    id: "bk-opp-6.1",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 6.1",
    prompt: r`Consider a continuous-time LTI system with frequency response $H(j\omega)=|H(j\omega)|e^{j\angle H(j\omega)}$ and real impulse response $h(t)$. Suppose that we apply an input $x(t)=\cos(\omega_0t+\phi_0)$ to this system. The resulting output can be shown to be of the form

$$y(t)=Ax(t-t_0),$$

where $A$ is a nonnegative real number representing an amplitude-scaling factor and $t_0$ is a time delay.

(a) Express $A$ in terms of $|H(j\omega_0)|$. (b) Express $t_0$ in terms of $\angle H(j\omega_0)$.`,
    solution: r`Split the cosine into two exponentials, and use the fact that for a real $h$, $H(-j\omega_0)=H^*(j\omega_0)$:

$$y(t)=\tfrac12H(j\omega_0)e^{j(\omega_0t+\phi_0)}+\tfrac12H^*(j\omega_0)e^{-j(\omega_0t+\phi_0)}=|H(j\omega_0)|\cos\big(\omega_0t+\phi_0+\angle H(j\omega_0)\big).$$

Now match this with $Ax(t-t_0)=A\cos\big(\omega_0(t-t_0)+\phi_0\big)$.

**(a)** $A=|H(j\omega_0)|$.

**(b)** $-\omega_0t_0=\angle H(j\omega_0)$, so

$$t_0=-\frac{\angle H(j\omega_0)}{\omega_0}.$$

(Any $t_0$ that differs from this by a multiple of $\frac{2\pi}{\omega_0}$ also works, since the cosine is periodic.)

This $t_0$ is the **phase delay** at $\omega_0$. When the phase is linear, $\angle H=-\omega t_d$, every frequency gets the same delay $t_d$, which is the condition for distortionless transmission.`,
  },
  {
    id: "bk-opp-6.3",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 6.3",
    prompt: r`Consider the following frequency response for a causal and stable LTI system:

$$H(j\omega)=\frac{1-j\omega}{1+j\omega}.$$

(a) Show that $|H(j\omega)|=A$, and determine the value of $A$.

(b) Determine which of the following statements is true about $\tau(\omega)$, the group delay of the system, where $\tau(\omega)=-\frac{d}{d\omega}\angle H(j\omega)$ with the phase written without discontinuities: 1. $\tau(\omega)=0$ for $\omega>0$; 2. $\tau(\omega)>0$ for $\omega>0$; 3. $\tau(\omega)<0$ for $\omega>0$.`,
    solution: r`**(a)** The numerator and denominator are complex conjugates, so they have equal magnitudes:

$$|H(j\omega)|=\frac{\sqrt{1+\omega^2}}{\sqrt{1+\omega^2}}=1,\qquad A=1.$$

This is an **all-pass** system: it changes no amplitudes, only phases.

**(b)** The phase of a conjugate pair doubles:

$$\angle H(j\omega)=\angle(1-j\omega)-\angle(1+j\omega)=-\arctan\omega-\arctan\omega=-2\arctan\omega.$$

So

$$\tau(\omega)=\frac{d}{d\omega}\big(2\arctan\omega\big)=\frac{2}{1+\omega^2}>0.$$

**Statement 2 is true.**
` + fig("bk-fr-63") + r`
An all-pass system is **not** distortionless, even though $|H|=1$. Its delay depends on frequency, about 2 s near $\omega=0$ and almost none at high frequency, so a pulse made of many frequencies comes out reshaped.`,
  },
  {
    id: "bk-opp-4.31",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 4.31",
    prompt: r`(a) Show that the three LTI systems with impulse responses

$$h_1(t)=u(t),\qquad h_2(t)=-2\delta(t)+5e^{-2t}u(t),\qquad h_3(t)=2te^{-t}u(t)$$

all have the same response to $x(t)=\cos t$.

(b) Find the impulse response of another LTI system with the same response to $\cos t$.`,
    solution: r`**(a)** By Problem 6.1, the response to $\cos t$ depends only on $H(j1)$: $y(t)=|H(j1)|\cos\big(t+\angle H(j1)\big)$. So evaluate each frequency response at $\omega=1$:

- $H_1(j\omega)=\frac{1}{j\omega}+\pi\delta(\omega)$. The impulse sits at $\omega=0$ and does not matter at $\omega=1$, so $H_1(j1)=\frac1j=-j$.
- $H_2(j\omega)=-2+\frac{5}{2+j\omega}$, so $H_2(j1)=-2+\frac{5(2-j)}{5}=-j$.
- $H_3(j\omega)=\frac{2}{(1+j\omega)^2}$, so $H_3(j1)=\frac{2}{(1+j)^2}=\frac{2}{2j}=-j$.

All three give $H(j1)=-j=e^{-j\pi/2}$, so

$$y(t)=\cos\left(t-\tfrac\pi2\right)=\sin t\quad\text{for all three}.$$
` + fig("bk-fr-431") + r`
**(b)** Any $H$ with $H(j1)=-j$ works. The simplest is a pure delay of $\frac\pi2$, since $e^{-j\omega\pi/2}$ at $\omega=1$ is $-j$:

$$h_4(t)=\delta\left(t-\tfrac\pi2\right).$$

The lesson: the response to a single sinusoid tells you $H$ at one frequency only, which is nowhere near enough to identify the system.`,
  },
  {
    id: "bk-opp-4.32",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 4.32",
    prompt: r`Consider an LTI system $S$ with impulse response

$$h(t)=\frac{\sin(4(t-1))}{\pi(t-1)}.$$

Determine the output of $S$ for each of the following inputs:

(a) $x_1(t)=\cos\left(6t+\frac\pi2\right)$  (b) $x_2(t)=\sum_{k=0}^{\infty}\left(\frac12\right)^k\sin(3kt)$  (c) $x_3(t)=\dfrac{\sin(4(t+1))}{\pi(t+1)}$  (d) $x_4(t)=\left(\dfrac{\sin2t}{\pi t}\right)^2$`,
    solution: r`First identify the filter. $\frac{\sin4t}{\pi t}\leftrightarrow$ a rectangle of height 1 on $|\omega|<4$, and the shift by 1 adds $e^{-j\omega}$:

$$H(j\omega)=\begin{cases}e^{-j\omega},&|\omega|<4\\0,&|\omega|>4.\end{cases}$$

This is an ideal low-pass filter with cutoff 4 and delay 1. Inside the band it is **distortionless**: it passes and delays by 1.
` + fig("bk-fr-432") + r`
**(a)** $\omega=6>4$, so the input is removed: $y_1(t)=0$.

**(b)** The terms are at $\omega=3k$:
- $k=0$ gives $\sin0=0$;
- $k=1$ ($\omega=3$) passes;
- $k\ge2$ ($\omega\ge6$) is blocked.

So $y_2(t)=\tfrac12\sin\big(3(t-1)\big)$.

**(c)** $X_3(j\omega)=e^{j\omega}$ on $|\omega|<4$, so

$$Y_3(j\omega)=e^{j\omega}e^{-j\omega}=1\ \text{ on }|\omega|<4,\qquad y_3(t)=\frac{\sin4t}{\pi t}.$$

The filter's delay exactly cancels the input's advance.

**(d)** $\frac{\sin2t}{\pi t}$ has a rectangular spectrum on $|\omega|<2$. Squaring in time convolves the spectra, giving a triangle on $|\omega|<4$. All of it lies in the pass band, so the signal is simply delayed:

$$y_4(t)=\left(\frac{\sin2(t-1)}{\pi(t-1)}\right)^2.$$`,
  },
  {
    id: "bk-opp-6.5",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 6.5",
    prompt: r`Consider a continuous-time ideal bandpass filter whose frequency response is

$$H(j\omega)=\begin{cases}1,&\omega_c\le|\omega|\le3\omega_c\\0,&\text{elsewhere.}\end{cases}$$

(a) If $h(t)$ is the impulse response of this filter, determine a function $g(t)$ such that $h(t)=\left(\dfrac{\sin\omega_ct}{\pi t}\right)g(t)$.

(b) As $\omega_c$ is increased, does the impulse response of the filter get more concentrated or less concentrated about the origin?`,
    solution: r`**(a)** $H$ is real and even, so

$$h(t)=\frac1{2\pi}\cdot2\int_{\omega_c}^{3\omega_c}\cos\omega t\,d\omega=\frac{\sin3\omega_ct-\sin\omega_ct}{\pi t}.$$

Apply $\sin A-\sin B=2\cos\frac{A+B}2\sin\frac{A-B}2$ with $A=3\omega_ct$ and $B=\omega_ct$:

$$h(t)=\frac{2\cos(2\omega_ct)\sin(\omega_ct)}{\pi t}=\left(\frac{\sin\omega_ct}{\pi t}\right)\cdot2\cos(2\omega_ct).$$

$$\boxed{g(t)=2\cos(2\omega_ct)}$$

The frequency-domain view gives this immediately. The pass band is a low-pass rectangle of half-width $\omega_c$, shifted to $\pm2\omega_c$. A shift by $\pm2\omega_c$ in frequency is multiplication by $2\cos2\omega_ct$ in time.
` + fig("bk-fr-65") + r`
**(b)** **More concentrated.** The envelope $\frac{\sin\omega_ct}{\pi t}$ has its first zeros at $t=\pm\frac\pi{\omega_c}$, so a larger $\omega_c$ (a wider band) gives a narrower main lobe. This is the time–bandwidth trade-off: wide in frequency means narrow in time.`,
  },
  {
    id: "bk-opp-3.19",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 3.19",
    prompt: r`Consider a causal LTI system implemented as an RL circuit: a current source produces the input current $x(t)$, which feeds a 1 H inductor and a 1 Ω resistor connected **in parallel**. The output $y(t)$ is the current flowing through the inductor.

(a) Find the differential equation relating $x(t)$ and $y(t)$.

(b) Determine the frequency response of this system by considering the output for inputs of the form $x(t)=e^{j\omega t}$.

(c) Determine the output $y(t)$ if $x(t)=\cos t$.`,
    solution: r`**(a)** The two parallel elements share the same voltage $v(t)$:
- inductor: $v=L\frac{dy}{dt}=\frac{dy}{dt}$;
- resistor: its current is $\frac{v}{R}=\frac{dy}{dt}$.

KCL says the source current splits between them:

$$x(t)=y(t)+\frac{dy(t)}{dt}\quad\Longrightarrow\quad\frac{dy}{dt}+y=x.$$

**(b)** For an LTI system, $x=e^{j\omega t}$ gives $y=H(j\omega)e^{j\omega t}$. Substituting:

$$j\omega H+H=1\ \Rightarrow\ H(j\omega)=\frac{1}{1+j\omega}.$$

This is a low-pass filter. At high frequency the inductor's impedance is large, so the current takes the resistor branch instead.

**(c)** At $\omega=1$:

$$H(j1)=\frac{1}{1+j}=\frac{1}{\sqrt2}e^{-j\pi/4}\ \Rightarrow\ y(t)=\frac1{\sqrt2}\cos\left(t-\frac\pi4\right).$$
` + fig("bk-fr-319"),
  },
  {
    id: "bk-opp-3.20",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 3.20",
    prompt: r`Consider a causal LTI system implemented as a series RLC circuit with $R=1\,\Omega$, $L=1$ H and $C=1$ F, driven by the input voltage $x(t)$. The voltage $y(t)$ across the capacitor is the system output.

(a) Find the differential equation relating $x(t)$ and $y(t)$.

(b) Determine the frequency response of this system by considering the output for inputs of the form $x(t)=e^{j\omega t}$.

(c) Determine the output $y(t)$ if $x(t)=\sin(t)$.`,
    solution: r`**(a)** One current $i$ flows through all three elements, and $i=C\frac{dy}{dt}=\frac{dy}{dt}$. KVL around the loop gives

$$x=Ri+L\frac{di}{dt}+y=\frac{dy}{dt}+\frac{d^2y}{dt^2}+y,$$

$$\frac{d^2y}{dt^2}+\frac{dy}{dt}+y=x(t).$$

**(b)** Substituting $y=He^{j\omega t}$:

$$\big((j\omega)^2+j\omega+1\big)H=1\ \Rightarrow\ H(j\omega)=\frac{1}{1-\omega^2+j\omega}.$$

**(c)** At $\omega=1$ the real part of the denominator vanishes, $1-1^2=0$. This is the **resonant frequency** $\frac1{\sqrt{LC}}=1$:

$$H(j1)=\frac1j=e^{-j\pi/2}.$$

The gain is 1 and the phase lag is $90^\circ$, so

$$y(t)=\sin\left(t-\frac\pi2\right)=-\cos t.$$`,
  },
  {
    id: "bk-opp-4.18",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 4.18",
    prompt: r`Find the impulse response of a system with the frequency response

$$H(j\omega)=\frac{\sin^2(3\omega)\cos\omega}{\omega^2}.$$`,
    solution: r`Build $H$ from known pieces, then translate each piece into the time domain.

1. $\dfrac{\sin3\omega}{\omega}$ is half the transform of a pulse on $|t|<3$, because $\text{rect}_{|t|<T_1}\leftrightarrow\frac{2\sin\omega T_1}{\omega}$. So $\frac{\sin3\omega}{\omega}\leftrightarrow\frac12\,\text{rect}_{|t|<3}$.

2. **Squaring** in frequency is convolving in time. A pulse of width 6 convolved with itself is a triangle of base $|t|<6$ and height 6. Scaling by $\frac12\cdot\frac12$ gives

$$p(t)=\tfrac14(6-|t|)\ \text{ for }|t|<6\qquad(\text{peak }\tfrac32).$$

3. $\cos\omega=\tfrac12(e^{j\omega}+e^{-j\omega})$ makes **two shifted copies**, one advanced by 1 and one delayed by 1:

$$\boxed{h(t)=\tfrac12\big[p(t+1)+p(t-1)\big]}$$

Explicitly:
- $h(t)=\tfrac54$ for $|t|\le1$;
- $h(t)=\frac{6-|t|}{4}$ for $1\le|t|\le5$;
- $h(t)=\frac{7-|t|}{8}$ for $5\le|t|\le7$;
- $h(t)=0$ beyond $|t|=7$.
` + fig("bk-fr-418") + r`
Check: $h(0)=\frac1{2\pi}\int H\,d\omega$ is hard to evaluate directly, but $H(0)=\int h\,dt$ is easy. $H(0)=\lim_{\omega\to0}\frac{\sin^23\omega}{\omega^2}=9$, and the area of $h$ is $\tfrac12(9+9)=9$, since each triangle has area $\tfrac12\cdot12\cdot\tfrac32=9$. ✓`,
  },
  {
    id: "bk-opp-4.19",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 4.19",
    prompt: r`Consider a causal LTI system with frequency response

$$H(j\omega)=\frac{1}{j\omega+3}.$$

For a particular input $x(t)$, this system is observed to produce the output $y(t)=e^{-3t}u(t)-e^{-4t}u(t)$. Determine $x(t)$.`,
    solution: r`Convolution in time is multiplication in frequency, $Y=HX$, so $X=Y/H$.

$$Y(j\omega)=\frac{1}{j\omega+3}-\frac{1}{j\omega+4}=\frac{1}{(j\omega+3)(j\omega+4)}.$$

$$X(j\omega)=\frac{Y(j\omega)}{H(j\omega)}=\frac{(j\omega+3)}{(j\omega+3)(j\omega+4)}=\frac{1}{j\omega+4}.$$

$$\boxed{x(t)=e^{-4t}u(t)}$$

Check: $\frac{1}{j\omega+3}\cdot\frac1{j\omega+4}$ split into partial fractions is $\frac1{j\omega+3}-\frac1{j\omega+4}$, which gives back $y$. ✓ The system's pole at $-3$ appears in the output, and the input contributes the other pole at $-4$.`,
  },
  {
    id: "bk-opp-4.33",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 4.33",
    prompt: r`The input and the output of a stable and causal LTI system are related by the differential equation

$$\frac{d^2y(t)}{dt^2}+6\frac{dy(t)}{dt}+8y(t)=2x(t).$$

(a) Find the impulse response of this system.

(b) What is the response of this system if $x(t)=te^{-2t}u(t)$?

(c) Repeat part (a) for the stable and causal LTI system described by

$$\frac{d^2y(t)}{dt^2}+\sqrt2\frac{dy(t)}{dt}+y(t)=2\frac{d^2x(t)}{dt^2}-2x(t).$$`,
    solution: r`**Method:** replace $\frac{d}{dt}$ by $j\omega$ to get $H$, factor, use partial fractions, and invert term by term with $\frac{1}{(j\omega+a)^{n}}\leftrightarrow\frac{t^{n-1}}{(n-1)!}e^{-at}u(t)$.

**(a)**

$$H(j\omega)=\frac{2}{(j\omega)^2+6j\omega+8}=\frac{2}{(j\omega+2)(j\omega+4)}=\frac{1}{j\omega+2}-\frac{1}{j\omega+4}.$$

$$h(t)=\left(e^{-2t}-e^{-4t}\right)u(t).$$

**(b)** $X(j\omega)=\frac{1}{(j\omega+2)^2}$, so

$$Y(j\omega)=\frac{2}{(j\omega+2)^3(j\omega+4)}=\frac{A}{j\omega+4}+\frac{B}{j\omega+2}+\frac{C}{(j\omega+2)^2}+\frac{D}{(j\omega+2)^3}.$$

Write $s=j\omega$. The cover-up rule gives:
- $A=\frac{2}{(-2)^3}=-\frac14$;
- $D=\frac{2}{-2+4}=1$;
- $C=\frac{d}{ds}\frac{2}{s+4}\Big|_{-2}=-\frac{2}{4}=-\frac12$;
- $B=\frac12\frac{d^2}{ds^2}\frac{2}{s+4}\Big|_{-2}=\frac{2}{8}=\frac14$.

$$y(t)=\left[\tfrac14e^{-2t}-\tfrac12te^{-2t}+\tfrac12t^2e^{-2t}-\tfrac14e^{-4t}\right]u(t).$$

Check: $y(0)=\frac14-\frac14=0$. ✓ The output of a causal system with a smooth input starts from rest.

**(c)**

$$H(j\omega)=\frac{2(j\omega)^2-2}{(j\omega)^2+\sqrt2\,j\omega+1}.$$

The degrees are equal, so first divide:

$$H=2-\frac{2\sqrt2\,j\omega+4}{(j\omega)^2+\sqrt2\,j\omega+1}.$$

Complete the square in the denominator: $(j\omega+a)^2+a^2$ with $a=\frac1{\sqrt2}$. The numerator becomes $2\sqrt2(j\omega+a)+2$, so

$$H=2-2\sqrt2\,\frac{j\omega+a}{(j\omega+a)^2+a^2}-\frac{2}{(j\omega+a)^2+a^2}.$$

Use the pairs $e^{-at}\cos(at)u(t)\leftrightarrow\frac{j\omega+a}{(j\omega+a)^2+a^2}$ and $e^{-at}\sin(at)u(t)\leftrightarrow\frac{a}{(j\omega+a)^2+a^2}$, with $\frac2a=2\sqrt2$:

$$h(t)=2\delta(t)-2\sqrt2\,e^{-t/\sqrt2}\left[\cos\frac{t}{\sqrt2}+\sin\frac{t}{\sqrt2}\right]u(t).$$`,
  },
  {
    id: "bk-opp-4.29",
    topic: "frequency-response",
    book: "Oppenheim",
    ref: "Problem 4.29",
    prompt: r`A real-valued continuous-time function $x(t)$ has a Fourier transform $X(j\omega)$ whose magnitude and phase are shown in panel (a) below. The functions $x_a(t)$, $x_b(t)$, $x_c(t)$ and $x_d(t)$ have Fourier transforms with magnitudes identical to $X(j\omega)$, but with the phase functions shown in (b)–(e).

- $\angle X_a$ and $\angle X_b$ are formed by adding a linear phase to $\angle X$.
- $\angle X_c$ is formed by reflecting $\angle X$ about $\omega=0$.
- $\angle X_d$ is formed by a combination of a reflection and an addition of a linear phase.

Using the properties of Fourier transforms, determine the expressions for $x_a(t)$, $x_b(t)$, $x_c(t)$ and $x_d(t)$ in terms of $x(t)$.
` + fig("bk-fr-429"),
    solution: r`Two facts do all the work:
- **Linear phase is a shift:** $e^{-j\omega t_0}X(j\omega)\leftrightarrow x(t-t_0)$.
- **Negated phase is a reversal:** for a real $x$, $|X|$ is even and $\angle X$ is odd, so $|X|e^{-j\angle X}=X^*(j\omega)=X(-j\omega)\leftrightarrow x(-t)$.

**(b)** $\angle X_a=\angle X-a\omega$, so $X_a=X\,e^{-ja\omega}$ and

$$x_a(t)=x(t-a).$$

This is a delay of $a$.

**(c)** $\angle X_b=\angle X+b\omega$, so $X_b=X\,e^{jb\omega}$ and

$$x_b(t)=x(t+b).$$

This is an advance of $b$.

**(d)** Reflecting about $\omega=0$ gives $\angle X_c(\omega)=\angle X(-\omega)=-\angle X(\omega)$, so $X_c=X(-j\omega)$ and

$$x_c(t)=x(-t).$$

**(e)** $\angle X_d=-\angle X+d\omega$, so $X_d=X(-j\omega)e^{jd\omega}$. The factor $e^{jd\omega}$ advances the reversed signal $x(-t)$ by $d$:

$$x_d(t)=x\big(-(t+d)\big)=x(-t-d).$$

All four signals share the **same magnitude spectrum**, yet they are different signals. The phase carries the timing information: where things happen and in which order.`,
  },
]
