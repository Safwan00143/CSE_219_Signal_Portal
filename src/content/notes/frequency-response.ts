const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const frequencyResponseNote = r`
## Why this topic

This topic joins LTI systems (topic 3) with the Fourier transform (topic 6). It is not a separate lecture in the slides, but the CSE 311 term finals ask about it almost every year: distortionless transmission, all-pass systems, ideal filters, and why ideal filters cannot be built. Everything here follows from one equation.

## Frequency response

For an LTI system with impulse response $h(t)$, the **frequency response** (transfer function) is

$$
H(j\omega)=\int_{-\infty}^{\infty}h(t)e^{-j\omega t}dt,
$$

and the convolution theorem turns $y=x*h$ into

$$
\boxed{\,Y(j\omega)=H(j\omega)\,X(j\omega)\,}
$$

**Why.** A complex exponential is an eigenfunction of every LTI system:

$$
e^{j\omega t}*h(t)=\int h(\tau)e^{j\omega(t-\tau)}d\tau=H(j\omega)\,e^{j\omega t}.
$$

Write the input as a superposition of exponentials, $x(t)=\frac1{2\pi}\int X(j\omega)e^{j\omega t}d\omega$. By linearity each component comes out multiplied by $H(j\omega)$, so $y(t)=\frac1{2\pi}\int H(j\omega)X(j\omega)e^{j\omega t}d\omega$.

### Gain and phase

Write $H(j\omega)=|H(j\omega)|\,e^{j\theta(\omega)}$. A real sinusoid comes out at the **same frequency**, scaled and shifted:

$$
\cos\omega_1t\ \longrightarrow\ |H(j\omega_1)|\cos\big(\omega_1t+\theta(\omega_1)\big).
$$
` + fig("fr-sinusoid") + r`
This also tells us **how to measure** $H$ experimentally:

- **Sinusoidal sweep.** Apply sinusoids at many frequencies; record the amplitude ratio (gives $|H|$) and the phase shift (gives $\theta$).
- **Impulse method.** Apply a very narrow, tall pulse (an approximate $\delta$), record the output $\approx h(t)$, and Fourier transform it.
- **Broadband method.** Apply a known wide-band input (noise, a chirp, a step) and compute $H=Y/X$ from the measured spectra.

## Distortionless transmission

We want the output to keep the **shape** of the input. Changing the size and arriving later is allowed:

$$
y(t)=k\,x(t-t_d).
$$

Take the Fourier transform (time-shift property):

$$
Y(j\omega)=k\,e^{-j\omega t_d}X(j\omega)\qquad\Longrightarrow\qquad\boxed{\,H(j\omega)=k\,e^{-j\omega t_d},\qquad h(t)=k\,\delta(t-t_d)\,}
$$

So a distortionless system has **two** properties:

1. **Constant magnitude:** $|H(j\omega)|=k$. Every frequency gets the same gain.
2. **Linear phase through the origin:** $\theta(\omega)=-\omega t_d$. Every frequency gets the same delay.
` + fig("fr-distortionless") + r`
### Why linear phase means "equal delay"

A component $\cos\omega t$ shifted in phase by $\theta(\omega)$ is the same as a delay of

$$
t_d(\omega)=-\frac{\theta(\omega)}{\omega}.
$$

This is the same for every $\omega$ only if $\theta$ is a straight line through the origin. A higher frequency needs proportionally more phase to be delayed by the same amount of time. (Equivalently, the **group delay** $-\frac{d\theta}{d\omega}$ must be constant, and $\theta(0)=0$.)

### What happens if the conditions fail

- **Amplitude distortion** ($|H|$ not constant): some bands are boosted or cut. Speech sounds muffled or tinny; pulses widen.
- **Phase (delay) distortion** ($\theta$ not linear): components arrive at different times. The amplitudes are fine, but the waveform is reshaped.
` + fig("fr-phase-distortion") + r`
In data links, either distortion spreads each pulse into its neighbours' time slots: **inter-symbol interference**. The ear is fairly tolerant of phase errors; video and data receivers are not. Both distortions are linear, so an equaliser $H_{eq}=1/H$ over the band can undo them.

### Distortionless only over the band that matters

$h(t)=k\delta(t-t_d)$ for all frequencies would need **infinite bandwidth**: an ideal impulse response, zero rise time. Every real channel has capacitance, inductance and finite bandwidth, so this is physically unrealisable. In practice we only need

$$
|H(j\omega)|\approx k\quad\text{and}\quad\theta(\omega)\approx-\omega t_d\qquad\text{for } |\omega|<2\pi B,
$$

the band actually occupied by the signal.

## All-pass systems

An **all-pass** system has $|H(j\omega)|=$ constant, with **no condition on the phase**. Example:

$$
H(s)=\frac{s-a}{s+a},\qquad |H(j\omega)|=1,\qquad \theta(\omega)=\pi-2\tan^{-1}\frac\omega a .
$$
` + fig("fr-allpass") + r`
| | distortionless | all-pass |
|---|---|---|
| magnitude | constant | constant |
| phase | linear, $-\omega t_d$ | anything |
| output shape | preserved (scaled, delayed) | may change (phase distortion) |
| example | $k\,e^{-j\omega t_d}$ | $\frac{s-a}{s+a}$ |

**Every distortionless system is all-pass, but an all-pass system is distortionless only if its phase is also linear.** No frequency is attenuated by an all-pass system, yet its non-linear phase can still reshape the waveform.

**How to decide whether a system is distortionless:** over the signal's band, check that $|H|$ is flat **and** $\theta$ is a straight line through the origin (constant group delay). In time, $h(t)$ must be a single scaled, delayed impulse.

## Paired echoes: ripple in the gain spreads pulses

Consider a low-pass filter with a cosine ripple on its gain:

$$
H(j\omega)=\begin{cases}(1+k\cos\omega T)\,e^{-j\omega t_d},&|\omega|<2\pi B\\0,&\text{otherwise.}\end{cases}
$$

For an input band-limited to $B$, the cut-off does not matter. Expand the cosine with Euler:

$$
Y=Xe^{-j\omega t_d}+\tfrac k2Xe^{-j\omega(t_d-T)}+\tfrac k2Xe^{-j\omega(t_d+T)},
$$

and each linear-phase factor is a time shift:

$$
y(t)=x(t-t_d)+\frac k2\Big[x(t-t_d+T)+x(t-t_d-T)\Big].
$$
` + fig("fr-echo") + r`
The phase is perfectly linear, yet the ripple in $|H|$ produces two small **echoes**, one before and one after the main pulse. This is a clean picture of how amplitude distortion spreads energy in time.

## Ideal filters
` + fig("fr-ideal-filters") + r`
### The ideal low-pass filter

$$
H(j\omega)=\begin{cases}e^{-j\omega t_d},&|\omega|<W\\0,&|\omega|>W\end{cases}
\qquad\text{(in hertz: } H(f)=\Pi\!\left(\tfrac f{2B}\right)e^{-j2\pi ft_d},\ W=2\pi B)
$$

Its impulse response:

$$
h(t)=\frac1{2\pi}\int_{-W}^{W}e^{j\omega(t-t_d)}d\omega=\frac{\sin W(t-t_d)}{\pi(t-t_d)}=\frac W\pi\cdot\frac{\sin W(t-t_d)}{W(t-t_d)} .
$$
` + fig("fr-lpf-impulse") + r`
### Why an ideal filter is physically unrealisable

- $h(t)$ is the response to $\delta(t)$, applied at $t=0$. But the sinc is non-zero for $t<0$: the filter responds **before the input arrives**. It is **non-causal**.
- A larger delay $t_d$ moves the sinc right but never removes its infinite tail to the left.
- More generally, the **Paley–Wiener criterion** says a causal filter cannot have $|H|=0$ over a whole band of frequencies.

Real filters (Butterworth, Chebyshev, elliptic) approximate the brick wall with a finite transition band and a delay.

### What an ideal LPF does to a rectangular pulse

With a pulse of height $A$ on $|t|<T/2$ and $t_d=0$, integrating the sinc gives the sine integral $\operatorname{Si}(x)=\int_0^x\frac{\sin u}u\,du$:

$$
y(t)=\frac A\pi\Big[\operatorname{Si}\big(W(t+\tfrac T2)\big)-\operatorname{Si}\big(W(t-\tfrac T2)\big)\Big].
$$
` + fig("fr-lpf-pulse") + r`
The edges become finite ramps (rise time about $\pi/W$), there is ringing with about 9% overshoot (the Gibbs phenomenon), and the output begins before the input does. The last point is why the filter is "ideal" rather than "real".

## The RC low-pass circuit as a nearly distortionless system
` + fig("fr-rc-circuit") + r`
By voltage division with impedances $R$ and $\frac1{j\omega C}$:

$$
H(j\omega)=\frac{1/(j\omega C)}{R+1/(j\omega C)}=\frac{1}{1+j\omega RC},\qquad |H|=\frac1{\sqrt{1+(\omega RC)^2}},\qquad\theta=-\tan^{-1}(\omega RC).
$$

For $\omega RC\ll1$: $|H|\approx1$ and $\theta\approx-\omega RC$, which is linear through the origin with delay $t_d=RC$.
` + fig("fr-rc-response") + r`
> **Condition:** the RC circuit is approximately distortionless for signals whose bandwidth satisfies $B\ll\dfrac{1}{2\pi RC}$ (equivalently $\omega\ll1/RC$). Over that band it simply delays the input by $RC$ seconds.

## Differentiator and integrator

- **Differentiator:** $y=\frac{dx}{dt}\Rightarrow H(j\omega)=j\omega$. Gain $|\omega|$ grows with frequency; phase $\pm\frac\pi2$.
- **Integrator:** $H(j\omega)=\frac1{j\omega}$ (plus $\pi\delta(\omega)$). Gain falls with frequency; phase $\mp\frac\pi2$.
` + fig("fr-differentiator") + r`
## Exam pointers

- "Distortionless" answers need the derivation from $y=kx(t-t_d)$, **both** conditions, and the physical meaning of each (equal gain, equal delay).
- "All-pass vs distortionless": constant magnitude only, versus constant magnitude **and** linear phase.
- "Why unrealisable?" Point to the impulse response: non-zero for $t<0$ (non-causal), and/or infinite bandwidth for $k\delta(t-t_d)$.
- RC questions: derive $H$, take $\omega RC\ll1$, and state the condition on bandwidth and the delay $RC$.
`
