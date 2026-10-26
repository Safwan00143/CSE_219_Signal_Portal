import type { Question } from "../types"

const r = String.raw

export const fourierQuestions: Question[] = [
  // ───────────────────────── Fourier series ─────────────────────────
  {
    id: "311-2223-1a",
    topic: "fourier-series",
    course: "CSE 311",
    session: "2022-23",
    label: "Q1(a)",
    marks: 17,
    prompt: r`Show that the coefficients $D_n$ of the exponential Fourier series of an even-symmetric periodic signal are real, and those of an odd-symmetric periodic signal are imaginary. Then justify the statement for the signal $\cos 2\pi f_0 t$.`,
    alsoAsked: ["CSE 311 · 2019-20 Q1(a)", "CSE 311 · 2018-19 Q2(b)"],
    solution: r`Let $g(t)$ be real and periodic with period $T_0$, $\omega_0=2\pi/T_0$. Then

$$
D_n=\frac1{T_0}\int_{-T_0/2}^{T_0/2}g(t)e^{-jn\omega_0t}dt
=\underbrace{\frac1{T_0}\int_{-T_0/2}^{T_0/2}g(t)\cos n\omega_0t\,dt}_{\text{real}}\;-\;j\,\underbrace{\frac1{T_0}\int_{-T_0/2}^{T_0/2}g(t)\sin n\omega_0t\,dt}_{\text{real}} .
$$

Over a symmetric interval, the integral of an **odd** integrand is $0$.

- **Even $g$:** $g(t)\sin n\omega_0t$ is odd, so the second integral vanishes:
$$D_n=\frac{2}{T_0}\int_0^{T_0/2}g(t)\cos n\omega_0t\,dt\in\mathbb R .$$
- **Odd $g$:** $g(t)\cos n\omega_0t$ is odd, so the first integral vanishes:
$$D_n=-\frac{2j}{T_0}\int_0^{T_0/2}g(t)\sin n\omega_0t\,dt ,$$
  which is purely imaginary.

In both cases we only need to integrate over **half a period** and double the result. This answers the "half cycle" part of the 2018-19 question.

**For $\cos2\pi f_0t$.** It is even. By Euler,

$$
\cos 2\pi f_0t=\tfrac12e^{j2\pi f_0t}+\tfrac12e^{-j2\pi f_0t}
\ \Rightarrow\ D_{\pm1}=\tfrac12,\ D_n=0\ (n\ne\pm1).
$$

These are real, as predicted. For comparison, $\sin2\pi f_0t$ is odd and $\sin 2\pi f_0 t=\frac1{2j}e^{j2\pi f_0t}-\frac1{2j}e^{-j2\pi f_0t}$, so $D_{1}=-\tfrac j2$ and $D_{-1}=\tfrac j2$, which are purely imaginary.

**Why a Fourier series exists here (2019-20 wording).** The signal is periodic and satisfies the Dirichlet conditions over one period: it is absolutely integrable over a period, has finitely many maxima and minima, and has no discontinuities. So the series exists and converges to the signal everywhere.`,
  },
  {
    id: "311-2021-2b",
    topic: "fourier-series",
    course: "CSE 311",
    session: "2020-21",
    label: "Q2(b)",
    marks: 17,
    prompt: r`Calculate the coefficients of the exponential Fourier series of $\sin 2\pi t$ and $\cos 2\pi t$. Comment on the characteristics of these signals and their coefficients. Do we need to integrate over complete cycles when calculating the coefficients? Justify.`,
    solution: r`Both signals have period $T_0=1$, so $\omega_0=2\pi$ and $D_n=\int_{-1/2}^{1/2}g(t)e^{-j2\pi nt}dt$.

**$\cos 2\pi t$.** Using orthogonality, $\int_{-1/2}^{1/2}e^{j2\pi(m-n)t}dt=\delta[m-n]$, so

$$
D_n=\tfrac12\int e^{j2\pi(1-n)t}dt+\tfrac12\int e^{-j2\pi(1+n)t}dt
\ \Rightarrow\ D_1=D_{-1}=\tfrac12,\ \text{all others } 0 .
$$

**$\sin 2\pi t$.** In the same way, $D_1=\dfrac1{2j}=-\dfrac j2$ and $D_{-1}=\dfrac j2$, with all others $0$.

**Comments.**

- $\cos$ is **even**, so its coefficients are **real** and even ($D_{-n}=D_n$).
- $\sin$ is **odd**, so its coefficients are **purely imaginary** and odd ($D_{-n}=-D_n$).
- Both are real signals, so $D_{-n}=D_n^*$ (conjugate symmetry): the magnitude spectra are identical lines of height $\tfrac12$ at $n=\pm1$.
- They differ only in phase: $0$ for cos, and $\mp\pi/2$ for sin. This is because $\sin$ is $\cos$ delayed by a quarter period.

**Do we need complete cycles?**

- *In general, yes:* the formula integrates over **one full period**. Any window of length $T_0$ works, since the integrand is periodic with period $T_0$. Integrating over less than a period breaks the orthogonality of the harmonics.
- *With symmetry, half a period is enough:* for even signals $D_n=\frac2{T_0}\int_0^{T_0/2}g\cos n\omega_0t\,dt$, and for odd signals $D_n=-\frac{2j}{T_0}\int_0^{T_0/2}g\sin n\omega_0t\,dt$. The other half-period is a mirror image (or negative mirror image), so it contributes the same amount again.
- For pure sinusoids, simply reading the coefficients off Euler's formula avoids integrating at all.`,
  },
  {
    id: "219-2223-5d",
    topic: "fourier-series",
    course: "CSE 219",
    session: "2022-23",
    label: "Q5(d)",
    marks: 5,
    prompt: r`Determine whether $x(t)$ is real-valued and even, where $x(t)$ is a continuous-time periodic signal given by its Fourier series

$$
x(t)=\sum_{k=0}^{100}\left(\tfrac12\right)^k e^{jk\frac{2\pi}{50}t}.
$$`,
    solution: r`Read the coefficients off the series: $a_k=(\tfrac12)^k$ for $0\le k\le100$, and $a_k=0$ otherwise (in particular for **every negative $k$**).

**Real?** A periodic signal is real iff $a_{-k}=a_k^*$ for all $k$. Take $k=1$: $a_1=\tfrac12$ but $a_{-1}=0\neq a_1^*$. So **$x(t)$ is not real**. A real signal needs each positive frequency $e^{jk\omega_0t}$ to be paired with a matching $e^{-jk\omega_0t}$, and here there is none.

**Even?** A periodic signal is even iff $a_{-k}=a_k$. Again $a_{-1}=0\ne a_1=\tfrac12$, so **$x(t)$ is not even**.

So $x(t)$ is **neither real nor even**. It is a complex signal whose spectrum sits only on the positive harmonics $k=0,\dots,100$.`,
  },

  // ───────────────────────── Fourier transform ─────────────────────────
  {
    id: "219-2223-5b",
    topic: "fourier-transform",
    course: "CSE 219",
    session: "2022-23",
    label: "Q5(b)",
    marks: 20,
    prompt: r`Let $X(j\omega)=\begin{cases}1,&|\omega|<3\pi\\0,&\text{otherwise}\end{cases}$.

A second spectrum $X_1(j\omega)$ has magnitude $|X_1(j\omega)|$ that grows linearly from $0$ at $\omega=0$ to $9\pi$ at $|\omega|=3\pi$ (a "V" shape, zero for $|\omega|>3\pi$), and phase $+\pi/2$ for $\omega>0$ and $-\pi/2$ for $\omega<0$.

1. Write down the definition of $X_1(j\omega)$. *(2)*
2. Determine the inverse Fourier transform $x(t)$ of $X(j\omega)$. *(8)*
3. Express $X_1(j\omega)$ in terms of $X(j\omega)$. *(2)*
4. Express $x_1(t)$ in terms of $x(t)$ using Fourier transform properties. *(3)*
5. Determine $x_1(t)$. *(5)*`,
    solution: r`**1.** The magnitude is the straight line $3|\omega|$ (it reaches $9\pi$ at $|\omega|=3\pi$). The phase is $\pm\pi/2$, so $X_1=3|\omega|e^{\pm j\pi/2}$:

- for $\omega>0$: $3\omega\cdot j$;
- for $\omega<0$: $3|\omega|(-j)=3\omega\cdot j$.

So both halves are the same expression:

$$
X_1(j\omega)=\begin{cases} j3\omega, & |\omega|<3\pi\\ 0, & |\omega|>3\pi\end{cases}
$$

**2.**

$$
x(t)=\frac1{2\pi}\int_{-3\pi}^{3\pi}e^{j\omega t}d\omega=\frac{1}{2\pi}\cdot\frac{e^{j3\pi t}-e^{-j3\pi t}}{jt}=\boxed{\frac{\sin 3\pi t}{\pi t}}
$$

**3.** $X_1(j\omega)=3\,(j\omega)\,X(j\omega)$.

**4.** By the **differentiation property**, $\dfrac{dx}{dt}\leftrightarrow j\omega X(j\omega)$, and by **linearity**:

$$
x_1(t)=3\,\frac{dx(t)}{dt}.
$$

**5.** Use the quotient rule:

$$
\frac{d}{dt}\left[\frac{\sin3\pi t}{\pi t}\right]=\frac{3\pi t\cos3\pi t-\sin3\pi t}{\pi t^2},
$$

so

$$
\boxed{x_1(t)=\frac{3\,(3\pi t\cos 3\pi t-\sin3\pi t)}{\pi t^2}=\frac{9\cos3\pi t}{t}-\frac{3\sin 3\pi t}{\pi t^2}}
$$

Sanity check: $X_1$ is odd and purely imaginary, so $x_1(t)$ must be real and odd. The expression above is.`,
  },
  {
    id: "219-2223-6",
    topic: "fourier-transform",
    course: "CSE 219",
    session: "2022-23",
    label: "Q6",
    marks: 30,
    prompt: r`Let $f(t)=\begin{cases}0,&t<0\\e^{-at},&t>0\end{cases}$ with $a>0$, and $\operatorname{sign}(t)=\begin{cases}-1,&t<0\\1,&t>0\end{cases}$.

(a) Define $f(-t)$. *(3)*
(b) Determine the Fourier transforms of $f(t)$ and $f(-t)$. *(12)*
(c) Define $\operatorname{sign}(t)$ in terms of $f(t)$ and/or $f(-t)$. *(5)*
(d) Determine the Fourier transform of $\operatorname{sign}(t)$ using Fourier transform properties and the results of (b). State the properties you use. *(10)*`,
    solution: r`**(a)** Replace $t$ with $-t$:

$$
f(-t)=\begin{cases} e^{at}, & t<0\\ 0, & t>0\end{cases}\ =\ e^{at}u(-t).
$$

**(b)** Directly from the definition:

$$
F(j\omega)=\int_0^\infty e^{-at}e^{-j\omega t}dt=\left[\frac{-e^{-(a+j\omega)t}}{a+j\omega}\right]_0^\infty=\boxed{\frac1{a+j\omega}}\qquad(a>0\text{ makes the upper limit vanish}).
$$

By the **time-reversal property**, $x(-t)\leftrightarrow X(-j\omega)$:

$$
f(-t)\ \leftrightarrow\ \boxed{\frac1{a-j\omega}}
$$

(or integrate directly: $\int_{-\infty}^0e^{(a-j\omega)t}dt=\frac1{a-j\omega}$).

**(c)** $f(t)-f(-t)$ equals $e^{-at}$ for $t>0$ and $-e^{at}$ for $t<0$. As $a\to0^+$ this becomes $+1$ and $-1$:

$$
\operatorname{sign}(t)=\lim_{a\to0^+}\big[f(t)-f(-t)\big].
$$

**(d)** By **linearity** and the results of (b),

$$
\mathcal F\{f(t)-f(-t)\}=\frac1{a+j\omega}-\frac1{a-j\omega}=\frac{(a-j\omega)-(a+j\omega)}{a^2+\omega^2}=\frac{-2j\omega}{a^2+\omega^2}.
$$

Take the limit $a\to0^+$:

$$
\mathcal F\{\operatorname{sign}(t)\}=\lim_{a\to0}\frac{-2j\omega}{a^2+\omega^2}=\frac{-2j}{\omega}=\boxed{\frac{2}{j\omega}}
$$

**Properties used:** time reversal, linearity, and taking a limit of transforms (a sign function is not absolutely integrable, so its transform is defined as this limit).

*Bonus:* since $u(t)=\tfrac12+\tfrac12\operatorname{sign}(t)$, this gives $U(j\omega)=\pi\delta(\omega)+\frac1{j\omega}$.`,
  },
  {
    id: "311-2223-1b",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2022-23",
    label: "Q1(b)",
    marks: 18,
    prompt: r`Derive and draw the Fourier spectrum of the standard rectangular signal $\Pi\!\left(\frac{t}{2B}\right)$. Comment on the nature of the frequency spectrum of practical signals. Analyse why and how sampling changes the frequency band of a practical signal.`,
    solution: r`**Spectrum.** $\Pi(t/2B)=1$ for $|t|<B$ (width $2B$).

$$
G(f)=\int_{-B}^{B}e^{-j2\pi ft}dt=\frac{e^{j2\pi fB}-e^{-j2\pi fB}}{j2\pi f}=\frac{\sin 2\pi fB}{\pi f}=2B\,\frac{\sin(2\pi fB)}{2\pi fB}.
$$

In Lathi's notation, $\operatorname{sinc}x=\frac{\sin x}{x}$, this is $\Pi(t/2B)\leftrightarrow 2B\,\operatorname{sinc}(2\pi fB)$.

*Drawing:* a real, even sinc with peak $2B$ (the area of the pulse) at $f=0$. It has zeros at $f=\pm\frac{1}{2B},\pm\frac{2}{2B},\dots$, and side-lobes decaying like $1/|f|$ with alternating sign. The phase is $0$ where $G>0$ and $\pi$ where $G<0$. The main lobe is $1/(2B)$ wide on each side, so the essential bandwidth is about $\frac{1}{2B}$ Hz. A wider pulse gives a narrower spectrum.

**Nature of practical spectra.** Every practical signal lasts a finite time. A **time-limited signal cannot be band-limited**: like the rect above, its spectrum extends to $|f|\to\infty$, even though it decays. So we speak of an *essential bandwidth*, which holds most (say 99%) of the energy. Practical spectra are also conjugate-symmetric ($|G|$ even, phase odd), because the signals are real.

**What sampling does.** Ideal sampling multiplies by an impulse train $\delta_{T_s}(t)$, whose transform is again an impulse train, $\frac1{T_s}\sum_n\delta(f-nf_s)$. Multiplication becomes convolution, so

$$
G_s(f)=\frac1{T_s}\sum_{n=-\infty}^{\infty}G(f-nf_s).
$$

The spectrum is **repeated periodically** every $f_s$: the band is no longer $[-B,B]$ but copies at $nf_s\pm B$. For a strictly band-limited signal the copies do not overlap if $f_s\ge 2B$. A practical signal has infinite bandwidth, so the tails of neighbouring copies always overlap (**aliasing**): high frequencies fold back as false low frequencies. That is why we low-pass (anti-alias) filter before sampling and sample faster than the Nyquist rate.`,
  },
  {
    id: "311-2122-1a",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2021-22",
    label: "Q1(a)",
    marks: 20,
    prompt: r`Derive the Fourier spectrum of a gate signal of width $B$. Also find the exponential Fourier series of a periodic gate signal of the same width and period $2B$. Draw all four time-domain and spectral representations. Comment on and correlate your findings.`,
    solution: r`**Single gate** $g(t)=\Pi(t/B)$, which is $1$ for $|t|<B/2$:

$$
G(f)=\int_{-B/2}^{B/2}e^{-j2\pi ft}dt=\frac{\sin\pi fB}{\pi f}=B\,\frac{\sin(\pi fB)}{\pi fB}.
$$

This is a **continuous** sinc spectrum with peak $B$ and zeros at $f=k/B$.

**Periodic gate** with period $T_0=2B$ (50% duty cycle), $f_0=\frac1{2B}$:

$$
D_n=\frac1{T_0}\int_{-B/2}^{B/2}e^{-j2\pi nf_0t}dt=\frac1{2B}\,G(nf_0)=\frac12\,\frac{\sin(n\pi/2)}{n\pi/2}.
$$

| $n$ | 0 | ±1 | ±2 | ±3 | ±4 | ±5 |
|---|---|---|---|---|---|---|
| $D_n$ | $\tfrac12$ | $\tfrac1\pi$ | 0 | $-\tfrac1{3\pi}$ | 0 | $\tfrac1{5\pi}$ |

So $g_{T_0}(t)=\tfrac12+\tfrac2\pi\left(\cos\omega_0t-\tfrac13\cos3\omega_0t+\tfrac15\cos5\omega_0t-\cdots\right)$, with $\omega_0=\pi/B$.

**The four pictures.**

1. The single pulse in time.
2. Its continuous sinc spectrum.
3. The pulse train in time.
4. A **line spectrum**: impulses at $f=n/(2B)$ whose heights follow the same sinc envelope, scaled by $1/T_0$.

**Correlation.**

- **Periodic in time ⇔ discrete in frequency.** The Fourier-series lines are *samples* of the single pulse's transform: $D_n=\frac1{T_0}G(nf_0)$.
- The **envelope**, and therefore the essential bandwidth (about $1/B$), depends only on the pulse width, **not** on whether the pulse repeats. Repetition only decides *where* we sample the envelope, at spacing $f_0=1/T_0$.
- Even harmonics vanish here because they land exactly on the sinc's zeros at multiples of $1/B$.
- As $T_0\to\infty$ the lines merge into the continuous spectrum. That is how the Fourier transform arises from the Fourier series.`,
  },
  {
    id: "311-2122-3a",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2021-22",
    label: "Q3(a)",
    marks: 20,
    prompt: r`With examples and derivations, establish the relationship between time compression and frequency expansion of a signal. Non-linear quantization uses logarithmic compression of a signal, yet it does not change the bandwidth of the signal. Why? Why is non-linear quantization necessary?`,
    solution: r`**Scaling property.** For real $a\neq 0$:

$$
\mathcal F\{g(at)\}=\int g(at)e^{-j2\pi ft}dt\overset{\tau=at}{=}\frac1{|a|}\int g(\tau)e^{-j2\pi (f/a)\tau}d\tau=\frac1{|a|}G\!\left(\frac fa\right).
$$

- $a>1$ compresses the signal in time and **expands** its spectrum by $a$ (and lowers its height by $1/a$).
- $0<a<1$ does the opposite.

*Example:* $\Pi(t/\tau)\leftrightarrow\tau\frac{\sin\pi f\tau}{\pi f\tau}$, whose first null is at $1/\tau$. Halve the pulse width and the first null moves to $2/\tau$, so the bandwidth doubles. *Audio example:* playing a tape at double speed compresses it in time, and every pitch goes up an octave. The product (duration × bandwidth) stays constant.

**Why log compression does not change bandwidth.** Time compression scales the **time axis**: $t\to at$. Logarithmic (μ-law or A-law) compression scales the **amplitude** of each sample: $m\to y=\frac{\ln(1+\mu|m|/m_p)}{\ln(1+\mu)}$. The samples are still taken at the same instants and rate $f_s$, and each still becomes $n$ bits, so the sample rate, bit rate and transmission bandwidth are unchanged. (The compressor is applied to sample values; the receiver's expander undoes it.)

**Why non-linear quantization is needed.**

- A uniform quantizer has fixed noise power $\Delta^2/12$, so its SNR is proportional to the signal power. Speech is mostly low amplitude with rare peaks, so quiet talkers and quiet passages get poor SNR.
- Compressing small amplitudes more finely and large amplitudes more coarsely gives roughly **constant SNR across a wide dynamic range**. For telephony, a log-compressed 8-bit quantizer is comparable to about 12–13 bits of uniform quantization.`,
  },
  {
    id: "311-2021-3b",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2020-21",
    label: "Q3(b)",
    marks: 11,
    prompt: r`State the Dirichlet conditions for the existence of the Fourier transform of a signal. Are they necessary conditions? Justify with an example.`,
    alsoAsked: ["CSE 311 · 2019-20 Q1(b)"],
    solution: r`**Dirichlet conditions.** $G(f)$ exists (and the inverse converges to $g$ at points of continuity, and to the mid-point at jumps) if:

1. $g(t)$ is **absolutely integrable**: $\int_{-\infty}^{\infty}|g(t)|\,dt<\infty$;
2. $g(t)$ has a **finite number of maxima and minima** in any finite interval;
3. $g(t)$ has a **finite number of discontinuities**, each finite, in any finite interval.

**They are sufficient, not necessary.** Many important signals break condition 1 but still have Fourier transforms, if we allow impulses (generalised functions):

| signal | absolutely integrable? | transform |
|---|---|---|
| $1$ | no | $\delta(f)$ |
| $u(t)$ | no | $\tfrac12\delta(f)+\tfrac1{j2\pi f}$ |
| $\cos2\pi f_0t$ | no | $\tfrac12[\delta(f-f_0)+\delta(f+f_0)]$ |
| $\sin2\pi f_0t$ | no | $\tfrac1{2j}[\delta(f-f_0)-\delta(f+f_0)]$ |
| $\dfrac{\sin 2\pi Bt}{\pi t}$ | no ($\int\lvert\cdot\rvert=\infty$) | $\Pi(f/2B)$, an ordinary function |

**For the 2019-20 version** ($\cos 2\pi f_0t$ or $\sin2\pi f_0t$): the signal is periodic and never decays, so $\int|g|\,dt=\infty$ and **the Dirichlet condition is not satisfied**. Yet its transform exists as the impulse pair above. This shows the condition is not necessary; it is only a convenient guarantee. All energy signals and all physically realisable (finite-duration, bounded) signals do satisfy it.`,
  },
  {
    id: "311-1920-2a",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2019-20",
    label: "Q2(a)",
    marks: 24,
    prompt: r`Show that a time delay in a signal causes a linear phase shift in its spectrum. Explain what would happen to a voice signal made of many frequency components if this linear-phase property did not hold.`,
    solution: r`**Proof.**

$$
\mathcal F\{g(t-t_0)\}=\int g(t-t_0)e^{-j2\pi ft}dt\overset{\tau=t-t_0}{=}e^{-j2\pi ft_0}\int g(\tau)e^{-j2\pi f\tau}d\tau=G(f)\,e^{-j2\pi ft_0}.
$$

The magnitude is unchanged, $|G(f)|$, and the phase gains $\theta(f)=-2\pi f t_0$, which is **linear in $f$** with slope $-2\pi t_0$, passing through the origin.

**Why linear phase means "same delay for everyone".** A component $\cos(2\pi ft)$ shifted in phase by $-2\pi ft_0$ becomes $\cos 2\pi f(t-t_0)$, a delay of $t_0$. The delay of each component is $t_d(f)=-\theta(f)/(2\pi f)$. This equals $t_0$ for **every** frequency only when $\theta$ is linear (through the origin). A higher frequency needs a proportionally larger phase shift to be delayed by the same time.

**If the phase were not linear.** Each frequency would be delayed by a different amount, $t_d(f)\neq$ const.

- A voice signal is a sum of a fundamental and its harmonics in a precise time alignment. Shifted by different amounts, they would no longer line up, so the **waveform shape changes** (phase or delay distortion, "dispersion"). Transients such as plosives ("p", "t") get smeared, and the voice sounds blurred or echoey.
- The ear is fairly tolerant of small phase errors in steady tones, but large delay spreads are clearly audible. In data or video transmission the same effect spreads each pulse into its neighbours (inter-symbol interference).

That is why a distortionless channel must have linear phase as well as a constant gain.`,
  },
  {
    id: "311-1718-1a",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2017-18",
    label: "Q1(a)",
    marks: 18,
    prompt: r`Why are we interested in frequency-domain representations of signals? How do we obtain the spectrum from the time-domain representation (formula)? What is the difference between the spectrum of a periodic and an aperiodic signal? Explain graphically with a rectangular pulse and a periodic rectangular pulse train. Does being periodic or aperiodic affect the bandwidth? Explain with the same examples (pulse duration $\tau$).`,
    solution: r`**Why frequency domain?**

- LTI systems act on each frequency independently: $Y(f)=H(f)G(f)$. Convolution becomes multiplication.
- Bandwidth, filtering, modulation and channel sharing (FDM) are all naturally described in frequency.
- It shows how much of the band a signal occupies, and which components a channel will pass or distort.

**Formula.** For an aperiodic signal, the Fourier transform

$$
G(f)=\int_{-\infty}^{\infty}g(t)e^{-j2\pi ft}dt .
$$

For a periodic signal (period $T_0$), the Fourier series coefficients

$$
D_n=\frac1{T_0}\int_{T_0}g(t)e^{-j2\pi nf_0t}dt .
$$

**Periodic vs aperiodic.**

- *Rectangular pulse* $A\Pi(t/\tau)$: a **continuous** spectrum, $A\tau\,\dfrac{\sin\pi f\tau}{\pi f\tau}$.
- *Pulse train* (same pulse, period $T_0$): a **discrete line spectrum** at multiples of $f_0=1/T_0$, with heights $D_n=\dfrac{A\tau}{T_0}\dfrac{\sin(\pi n f_0\tau)}{\pi n f_0 \tau}$. These are samples of the same sinc envelope, scaled by $1/T_0$.

So periodic signals have energy only at harmonics, while aperiodic signals spread energy over a continuum.

**Bandwidth.** **No.** The envelope of both spectra is the same sinc, set by the pulse width $\tau$: first null at $1/\tau$, so the essential bandwidth is about $1/\tau$ in both cases. The period only sets the *spacing* of the lines. Making $\tau$ smaller widens the bandwidth whether or not the pulse repeats.`,
  },
  {
    id: "311-1718-1b",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2017-18",
    label: "Q1(b)",
    marks: 10,
    prompt: r`Let $G(f)$ be the Fourier transform of the rectangular pulse $g(t)$ of height $A$ on $|t|<\tau/2$. Using Fourier-transform properties, express the transform of the triangular pulse $h(t)$ (peak $A\tau$ at $t=0$, base from $-\tau$ to $\tau$) in terms of $G(f)$.`,
    promptPlots: [
      {
        title: "g(t): height A, width τ (drawn with A = τ = 1)",
        segments: [[[-1.2, 0], [-0.5, 0]], [[-0.5, 1], [0.5, 1]], [[0.5, 0], [1.2, 0]]],
        xRange: [-1.2, 1.2],
        yRange: [-0.2, 1.3],
        xTicks: [-0.5, 0, 0.5],
        yTicks: [1],
      },
      {
        title: "h(t): peak Aτ, base 2τ",
        segments: [[[-1.4, 0], [-1, 0], [0, 1], [1, 0], [1.4, 0]]],
        xRange: [-1.4, 1.4],
        yRange: [-0.2, 1.3],
        xTicks: [-1, 0, 1],
        yTicks: [1],
      },
    ],
    solution: r`**Key observation.** Convolving a rectangle with itself gives a triangle. Slide $g$ over $g$: the overlap length is $\tau-|t|$ for $|t|<\tau$, so

$$
(g*g)(t)=A^2(\tau-|t|),\quad |t|<\tau .
$$

This is a triangle with base $[-\tau,\tau]$ and peak $A^2\tau$. Our $h(t)$ has the same base but peak $A\tau$, so

$$
h(t)=\frac1A\,\big(g*g\big)(t).
$$

**Convolution property** ($g_1*g_2\leftrightarrow G_1G_2$) and linearity:

$$
\boxed{H(f)=\frac{1}{A}\,G^2(f)}
$$

**Check.** With $G(f)=A\tau\,\dfrac{\sin\pi f\tau}{\pi f\tau}$:

$$
H(f)=A\tau^2\left(\frac{\sin\pi f\tau}{\pi f\tau}\right)^2 .
$$

At $f=0$ this is $A\tau^2$, which equals the area of the triangle ($\tfrac12\cdot2\tau\cdot A\tau$). ✓

*Alternative route:* $h'(t)$ is a pair of rectangles ($+A$ on $(-\tau,0)$ and $-A$ on $(0,\tau)$), which is $g$ shifted by $\mp\tau/2$. So $j2\pi f H(f)=G(f)\big(e^{j\pi f\tau}-e^{-j\pi f\tau}\big)$, which gives the same result.`,
  },
  {
    id: "311-1617-1abce",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2016-17",
    label: "Q1(a),(b),(c),(e)",
    marks: 27,
    prompt: r`(a) Define the bandwidth of a signal. Sketch two time-domain signals such that one has greater bandwidth than the other, and justify using the definition. *(9)*

(b) Prove that for a real signal the amplitude spectrum is even and the phase spectrum is odd. *(6)*

(c) A triangular pulse satisfies $\Delta\!\left(\frac t\tau\right)\Longleftrightarrow\frac\tau2\operatorname{sinc}^2\!\left(\frac{\pi f\tau}{2}\right)$. Using duality, find the Fourier transform of $\operatorname{sinc}^2(t)$ and draw the spectrum. *(6)*

(e) An LTI system acts as a differentiator, $y=\frac{d}{dt}g(t)$. Derive its transfer function. *(6)*`,
    solution: r`**(a) Bandwidth.** The width of the band of positive frequencies over which the spectrum is significant. For a band-limited signal it is the highest frequency $B$. Otherwise it is an essential bandwidth (a fixed energy fraction, or the first null).

*Two signals:* a wide rectangular pulse of width $\tau_1$ and a narrow one of width $\tau_2<\tau_1$. Their spectra $\tau\,\frac{\sin \pi f\tau}{\pi f\tau}$ have first nulls at $1/\tau_1<1/\tau_2$, so **the narrower pulse has the larger bandwidth**. (Equivalently: a slowly varying signal has less bandwidth than one with sharp, fast transitions.)

**(b) Real signals.** If $g$ is real, $g^*=g$, so

$$
G^*(f)=\left[\int g(t)e^{-j2\pi ft}dt\right]^*=\int g(t)e^{+j2\pi ft}dt=G(-f).
$$

Write $G(f)=|G(f)|e^{j\theta(f)}$. Then $|G(-f)|e^{j\theta(-f)}=|G(f)|e^{-j\theta(f)}$, so

$$
|G(-f)|=|G(f)|\ (\text{even}),\qquad \theta(-f)=-\theta(f)\ (\text{odd}).
$$

**(c) Duality.** If $g(t)\leftrightarrow G(f)$, then $G(t)\leftrightarrow g(-f)$. Here $\operatorname{sinc}x=\frac{\sin x}{x}$ (Lathi) and $\Delta(x)=1-2|x|$ for $|x|<\tfrac12$.

- From the given pair: $\dfrac\tau2\operatorname{sinc}^2\!\left(\dfrac{\pi t\tau}{2}\right)\ \leftrightarrow\ \Delta\!\left(-\dfrac f\tau\right)=\Delta\!\left(\dfrac f\tau\right)$, since $\Delta$ is even.
- To get $\operatorname{sinc}^2(t)$, choose $\frac{\pi\tau}2=1$, i.e. $\tau=\frac2\pi$. Then $\frac1\pi\operatorname{sinc}^2(t)\leftrightarrow\Delta\!\left(\frac{\pi f}{2}\right)$, so

$$
\boxed{\operatorname{sinc}^2(t)\ \leftrightarrow\ \pi\,\Delta\!\left(\frac{\pi f}{2}\right)}
$$

*Spectrum:* a triangle with peak $\pi$ at $f=0$, falling to $0$ at $f=\pm\frac1\pi$ Hz. It is band-limited to $1/\pi$ Hz. Check: $\int\operatorname{sinc}^2t\,dt=\pi$, which equals the spectrum at $f=0$. ✓

**(e) Differentiator.**

- Differentiate the inverse transform: $\frac{d}{dt}\int G(f)e^{j2\pi ft}df=\int (j2\pi f)G(f)e^{j2\pi ft}df$.
- So $\frac{dg}{dt}\leftrightarrow j2\pi f\,G(f)$, and $Y(f)=j2\pi f\,G(f)$, giving

$$
H(f)=\frac{Y(f)}{G(f)}=j2\pi f\quad(=j\omega).
$$

The gain $|H|=2\pi|f|$ grows with frequency, and the phase is $+\pi/2$ for $f>0$ and $-\pi/2$ for $f<0$. A differentiator emphasises high frequencies.`,
  },
  {
    id: "311-1415L4-5bcd",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2014-15",
    label: "Q5(b),(c),(d)",
    marks: 25,
    prompt: r`(b) State and prove the dilation (time-scaling) property of the Fourier transform. *(10)*

(c) If $g(t)\leftrightarrow G(f)$, find the Fourier transform of $\sin^2(2\pi f_c t)\,g(t)$. *(10)*

(d) Derive the Fourier transform of the Dirac delta function. *(5)*`,
    alsoAsked: ["CSE 311 · 2013-14 Q1(b)"],
    solution: r`**(b) Dilation (scaling).** If $g(t)\leftrightarrow G(f)$, then for real $a\ne0$

$$
g(at)\ \leftrightarrow\ \frac{1}{|a|}\,G\!\left(\frac fa\right).
$$

*Proof.* For $a>0$, let $\tau=at$:

$$
\int g(at)e^{-j2\pi ft}dt=\frac1a\int g(\tau)e^{-j2\pi (f/a)\tau}d\tau=\frac1a G(f/a).
$$

For $a<0$ the limits swap, which gives the $1/|a|$. *Meaning:* compressing in time ($|a|>1$) expands the spectrum by the same factor. So $g(at)$ with $a>1$ has $a$ times the bandwidth of $g(t)$: time–bandwidth reciprocity.

**(c)** Use $\sin^2\theta=\tfrac12(1-\cos2\theta)$:

$$
\sin^2(2\pi f_ct)\,g(t)=\tfrac12 g(t)-\tfrac12 g(t)\cos(4\pi f_ct).
$$

By the modulation property, $g(t)\cos2\pi f_0t\leftrightarrow\tfrac12[G(f-f_0)+G(f+f_0)]$, with $f_0=2f_c$:

$$
\boxed{\ \tfrac12G(f)-\tfrac14\big[G(f-2f_c)+G(f+2f_c)\big]\ }
$$

The spectrum is copied to baseband and to $\pm2f_c$.

**(d) Dirac delta.** By sifting,

$$
\mathcal F\{\delta(t)\}=\int_{-\infty}^{\infty}\delta(t)e^{-j2\pi ft}dt=e^{-j2\pi f\cdot0}=1 .
$$

The impulse contains all frequencies with equal weight and zero phase, so its bandwidth is infinite. By time shifting, $\delta(t-t_0)\leftrightarrow e^{-j2\pi ft_0}$. By duality, $1\leftrightarrow\delta(f)$.`,
  },
  {
    id: "311-1415L4-6a",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2014-15",
    label: "Q6(a)",
    marks: 10,
    prompt: r`Determine the bandwidth of the following two signals, given their frequency-domain plots: (i) a single triangle spanning $-W$ to $W$ centred at $f=0$; (ii) two triangles, each of total width $2W$, centred at $\pm f_c$. What would the bandwidth be if the plots were time-domain representations instead?`,
    solution: r`**As spectra.**

- **(i)** A baseband (low-pass) spectrum that is non-zero for $|f|<W$. Bandwidth counts positive frequencies only, so **$B=W$ Hz**.
- **(ii)** A band-pass spectrum occupying $f_c-W$ to $f_c+W$ (and its mirror image). Bandwidth is the width of the occupied positive band: **$B=2W$ Hz**. This is twice the baseband value, as for any DSB-modulated signal.

**As time signals.** Now the triangles are *pulses of finite duration*.

- **(i)** A triangle of half-width $W$ seconds has transform $\propto\left(\frac{\sin\pi fW}{\pi fW}\right)^2$. It is time-limited, so it is **not band-limited**: strictly the bandwidth is infinite. Its first null is at $f=1/W$, so the **essential bandwidth is about $1/W$ Hz**.
- **(ii)** Two such pulses at $\pm t_0$ give $G_{\text{ii}}(f)=G_{\text i}(f)\cdot2\cos(2\pi ft_0)$. The envelope is the same as (i), so the bandwidth is again **infinite strictly, about $1/W$ Hz essentially**. Shifting a pulse in time changes only the phase, not how wide the spectrum is.

Moral: in frequency, *width* means bandwidth directly. In time, bandwidth is inversely proportional to *pulse width*.`,
  },
  {
    id: "311-1415L4-6b",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2014-15",
    label: "Q6(b)",
    marks: 20,
    prompt: r`Fourier transform of periodic signals. Let $g_{T_0}(t)=\sum_n c_n e^{j2\pi nf_0t}$ with $c_n=\frac1{T_0}\int_{-T_0/2}^{T_0/2}g_{T_0}(t)e^{-j2\pi nf_0t}dt$, and define the single pulse $g(t)=g_{T_0}(t)$ for $|t|\le T_0/2$, $0$ elsewhere, with transform $G(f)$.

(i) Why introduce $g(t)$? (ii) Draw $g(t)$. (iii) How can $c_n=f_0G(nf_0)$? (iv) In $\mathcal F[g_{T_0}]=\sum f_0G(nf_0)\mathcal F[e^{j2\pi nf_0t}]$, why is the transform applied only to the exponential and not to $f_0G(nf_0)$? (v) Deduce $\mathcal F[g_{T_0}]=f_0\sum G(nf_0)\delta(f-nf_0)$.`,
    solution: r`**(i)** $g_{T_0}$ is periodic and not absolutely integrable, so we cannot plug it straight into the Fourier integral. Its single period $g(t)$ is an ordinary finite-duration (energy) signal with a well-defined transform $G(f)$. Introducing it lets us express the Fourier series coefficients through a transform we can compute.

**(ii)** $g(t)$ is **one period** of the train, the part between $-T_0/2$ and $T_0/2$. It is zero everywhere else: a single isolated pulse.

**(iii)** On $|t|\le T_0/2$, $g_{T_0}=g$, and outside it $g=0$. So the finite integral equals the infinite one:

$$
c_n=\frac1{T_0}\int_{-T_0/2}^{T_0/2}g(t)e^{-j2\pi nf_0t}dt=\frac1{T_0}\int_{-\infty}^{\infty}g(t)e^{-j2\pi (nf_0)t}dt=f_0\,G(nf_0).
$$

**(iv)** The Fourier transform is an integral over **$t$**. The number $f_0G(nf_0)$ does not depend on $t$; it is just a complex constant weighting the $n$-th term. By **linearity**, $\mathcal F\{\sum a_n x_n(t)\}=\sum a_n\mathcal F\{x_n(t)\}$, so only the time function $e^{j2\pi nf_0t}$ is transformed.

**(v)** Use $1\leftrightarrow\delta(f)$ (duality applied to $\delta(t)\leftrightarrow1$) and the frequency-shift property:

$$
e^{j2\pi nf_0t}\cdot1\ \leftrightarrow\ \delta(f-nf_0).
$$

Substitute into (6):

$$
\mathcal F[g_{T_0}(t)]=f_0\sum_{n=-\infty}^{\infty}G(nf_0)\,\delta(f-nf_0).
$$

A periodic signal's spectrum is a train of impulses at the harmonics. Their strengths are samples of the single pulse's spectrum, scaled by $f_0$.`,
  },
  {
    id: "311-1213-5bc6b",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2012-13",
    label: "Q5(b),(c), Q6(b)",
    marks: 37,
    prompt: r`5(b) Prove that convolution of two signals in time becomes multiplication in frequency, and vice versa. *(14)*

5(c) Find the Fourier transform of $g(t)=\Pi(t/\tau)$. *(13)*

6(b) State and prove the time-shifting and frequency-shifting properties. *(10)*`,
    solution: r`**5(b) Convolution theorem.**

$$
\mathcal F\{g*w\}=\int\!\!\int g(\tau)w(t-\tau)\,d\tau\,e^{-j2\pi ft}dt=\int g(\tau)e^{-j2\pi f\tau}\left[\int w(t-\tau)e^{-j2\pi f(t-\tau)}dt\right]d\tau .
$$

The inner bracket is $W(f)$ (substitute $x=t-\tau$), so $g*w\leftrightarrow G(f)W(f)$.

*Vice versa:* in the same way, from the inverse transform, $g(t)w(t)\leftrightarrow G(f)*W(f)$. (With $\omega$: $\frac1{2\pi}G(\omega)*W(\omega)$.)

**5(c) Rectangular pulse** ($1$ on $|t|<\tau/2$):

$$
G(f)=\int_{-\tau/2}^{\tau/2}e^{-j2\pi ft}dt=\frac{\sin\pi f\tau}{\pi f}=\tau\,\frac{\sin(\pi f\tau)}{\pi f\tau}=\tau\operatorname{sinc}(\pi f\tau).
$$

In $\omega$ (as in the 2011-12 paper, height $V$): $F(\omega)=V\tau\,\dfrac{\sin(\omega\tau/2)}{\omega\tau/2}$. The peak is the area $\tau$, with zeros at $f=k/\tau$.

**6(b) Time shift.**

$$
g(t-t_0)\leftrightarrow G(f)e^{-j2\pi ft_0}.
$$

*Proof:* substitute $\tau=t-t_0$ in the integral. A delay adds linear phase and leaves $|G|$ unchanged.

**Frequency shift.**

$$
g(t)e^{j2\pi f_0t}\leftrightarrow G(f-f_0).
$$

*Proof:* $\int g(t)e^{j2\pi f_0t}e^{-j2\pi ft}dt=\int g(t)e^{-j2\pi(f-f_0)t}dt=G(f-f_0)$.

*Corollary (modulation):* $g(t)\cos2\pi f_0t\leftrightarrow\tfrac12[G(f-f_0)+G(f+f_0)]$, the basis of amplitude modulation.`,
  },
  {
    id: "311-1011-5a",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2010-11",
    label: "Q5(a)",
    marks: 14,
    prompt: r`How is the bandwidth of a real signal calculated? Let $\dot f(t)$ be the derivative of a real signal $f(t)$. Which of $f(t)$ and $\dot f(t)$ has the higher bandwidth? Explain.`,
    solution: r`**Bandwidth** is the range of positive frequencies over which $|F(\omega)|$ is significant: the band edge for band-limited signals, or an essential bandwidth (energy fraction or first null) otherwise. Only positive frequencies count, because a real signal's amplitude spectrum is even.

**Derivative.** By the differentiation property,

$$
\dot f(t)\ \leftrightarrow\ j\omega F(\omega),\qquad |\,\mathcal F\{\dot f\}|=|\omega|\,|F(\omega)| .
$$

- Multiplying by $|\omega|$ **removes the DC component**, **suppresses low frequencies** and **amplifies high frequencies** in proportion to frequency.
- So the energy of $\dot f$ is shifted toward higher frequencies, and its **essential bandwidth is larger**: **$\dot f(t)$ has the higher bandwidth**.
- Intuitively, differentiation emphasises sharp changes, and fast changes mean high frequencies.

*Caveat:* if $f$ is strictly band-limited to $B$, then $\dot f$ is band-limited to the same $B$, because multiplying by $j\omega$ cannot create components where $F=0$. The *strict* band edge is the same, but the energy distribution within it moves upward.`,
  },
]
