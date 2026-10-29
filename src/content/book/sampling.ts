import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const samplingBook: BookProblem[] = [
  {
    id: "bk-opp-7.1",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problems 7.1–7.2",
    prompt: r`(a) A real-valued signal $x(t)$ is known to be uniquely determined by its samples when the sampling frequency is $\omega_s=10{,}000\pi$. For what values of $\omega$ is $X(j\omega)$ guaranteed to be zero?

(b) A continuous-time signal $x(t)$ is obtained at the output of an ideal lowpass filter with cutoff frequency $\omega_c=1{,}000\pi$. If impulse-train sampling is performed on $x(t)$, which of the following sampling periods would guarantee that $x(t)$ can be recovered from its sampled version using an appropriate lowpass filter? (i) $T=0.5\times10^{-3}$ (ii) $T=2\times10^{-3}$ (iii) $T=10^{-4}$`,
    solution: r`**Sampling theorem:** if $X(j\omega)=0$ for $|\omega|>\omega_M$, then $x(t)$ is determined by its samples whenever $\omega_s>2\omega_M$.

**(a)** Read the theorem backwards. A guarantee at $\omega_s=10000\pi$ requires $\omega_M<\frac{\omega_s}2=5000\pi$. So

$$X(j\omega)=0\quad\text{for }|\omega|>5000\pi.$$

**(b)** The filter output is band-limited: $\omega_M=1000\pi$. We need

$$\omega_s=\frac{2\pi}T>2000\pi\iff T<10^{-3}\text{ s}.$$

| $T$ | $\omega_s$ | recoverable? |
|---|---|---|
| (i) $0.5\times10^{-3}$ | $4000\pi$ | **yes** |
| (ii) $2\times10^{-3}$ | $1000\pi$ | **no**: aliasing |
| (iii) $10^{-4}$ | $20000\pi$ | **yes** |`,
  },
  {
    id: "bk-opp-7.3",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problem 7.3",
    prompt: r`The frequency which, under the sampling theorem, must be exceeded by the sampling frequency is called the **Nyquist rate**. Determine the Nyquist rate corresponding to each of the following signals:

(a) $x(t)=1+\cos(2000\pi t)+\sin(4000\pi t)$  (b) $x(t)=\dfrac{\sin(4000\pi t)}{\pi t}$  (c) $x(t)=\left(\dfrac{\sin(4000\pi t)}{\pi t}\right)^2$`,
    solution: r`The Nyquist rate is $2\omega_M$, where $\omega_M$ is the highest frequency present.

**(a)** The components are at $0$, $2000\pi$ and $4000\pi$, so $\omega_M=4000\pi$ and the Nyquist rate is $8000\pi$ rad/s (4 kHz).

**(b)** $\frac{\sin Wt}{\pi t}$ is the inverse transform of a rectangle on $|\omega|<W$. Here $W=4000\pi$, so the Nyquist rate is $8000\pi$.

**(c)** Squaring in time means convolving the spectrum with itself, which **doubles** the bandwidth: the rectangle becomes a triangle on $|\omega|<8000\pi$. The Nyquist rate is $16000\pi$.
` + fig("bk-sm-73"),
  },
  {
    id: "bk-opp-7.4",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problem 7.4",
    prompt: r`Let $x(t)$ be a signal with Nyquist rate $\omega_0$. Determine the Nyquist rate for each of the following signals:

(a) $x(t)+x(t-1)$  (b) $\dfrac{dx(t)}{dt}$  (c) $x^2(t)$  (d) $x(t)\cos\omega_0t$`,
    solution: r`A Nyquist rate of $\omega_0$ means $X(j\omega)=0$ for $|\omega|>\frac{\omega_0}2$. For each signal, ask how far out its spectrum reaches.

**(a)** $X(j\omega)(1+e^{-j\omega})$. Multiplying by a factor cannot create new frequencies. It could at most remove some, which does not happen at the band edge in general. Nyquist rate: $\omega_0$.

**(b)** $j\omega X(j\omega)$: same support, so the Nyquist rate is $\omega_0$.

**(c)** $\frac1{2\pi}X*X$ reaches $\frac{\omega_0}2+\frac{\omega_0}2=\omega_0$. Nyquist rate: $2\omega_0$.

**(d)** $\frac12\big[X(j(\omega-\omega_0))+X(j(\omega+\omega_0))\big]$ moves the band out to $\omega_0+\frac{\omega_0}{2}=\frac32\omega_0$. Nyquist rate: $3\omega_0$.

**Rule of thumb:**
- Linear time-invariant operations (filtering, delays, derivatives) never raise the Nyquist rate.
- Products (squaring, modulation) add bandwidths.`,
  },
  {
    id: "bk-opp-7.6",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problem 7.6",
    prompt: r`In the system shown below, two functions of time, $x_1(t)$ and $x_2(t)$, are multiplied together, and the product $w(t)$ is sampled by a periodic impulse train. $x_1(t)$ is band limited to $\omega_1$, and $x_2(t)$ is band limited to $\omega_2$; that is, $X_1(j\omega)=0$ for $|\omega|\ge\omega_1$ and $X_2(j\omega)=0$ for $|\omega|\ge\omega_2$.

Determine the **maximum** sampling interval $T$ such that $w(t)$ is recoverable from $w_p(t)$ through the use of an ideal lowpass filter.
` + fig("bk-sm-76"),
    solution: r`**Bandwidth of the product.** $w=x_1x_2$, so

$$W(j\omega)=\frac1{2\pi}X_1(j\omega)*X_2(j\omega).$$

Convolving a spectrum on $(-\omega_1,\omega_1)$ with one on $(-\omega_2,\omega_2)$ gives a spectrum on $(-(\omega_1+\omega_2),\ \omega_1+\omega_2)$. So $w$ is band-limited to $\omega_M=\omega_1+\omega_2$.

**Sampling condition.** We need $\omega_s=\frac{2\pi}T>2(\omega_1+\omega_2)$:

$$T\le\frac{\pi}{\omega_1+\omega_2}\qquad\Rightarrow\qquad T_{\max}=\frac{\pi}{\omega_1+\omega_2}.$$

Equality is allowed here because both spectra vanish at their edges ($|\omega|\ge\omega_i$). So $W$ is zero at $\pm(\omega_1+\omega_2)$ too, and neighbouring copies just touch without overlapping.`,
  },
  {
    id: "bk-opp-7.8",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problem 7.8",
    prompt: r`Consider a real, odd and periodic signal $x(t)$ whose Fourier series representation may be expressed as

$$x(t)=\sum_{k=0}^{5}\left(\tfrac12\right)^k\sin(k\pi t).$$

Let $\hat x(t)$ represent the signal obtained by performing impulse-train sampling on $x(t)$ using a sampling period of $T=0.2$.

(a) Does aliasing occur when this impulse-train sampling is performed on $x(t)$?

(b) If $\hat x(t)$ is passed through an ideal lowpass filter with cutoff frequency $\pi/T$ and passband gain $T$, determine the Fourier series representation of the output signal $g(t)$.`,
    solution: r`**(a)** The highest harmonic is $k=5$, at $\omega=5\pi$. The sampling frequency is $\omega_s=\frac{2\pi}{0.2}=10\pi$. The theorem needs $\omega_s>2\cdot5\pi=10\pi$, which fails because of the equality. **Aliasing occurs** for that term.

Look at what the samples of the $k=5$ term are:

$$\sin(5\pi\cdot0.2n)=\sin(\pi n)=0\quad\text{for every }n.$$

The samples of the top harmonic are all zero, so it disappears completely. In the spectrum, its line at $5\pi$ and its image from $-5\pi+10\pi$ have opposite signs and cancel.
` + fig("bk-sm-78") + r`
**(b)** The filter (cutoff $5\pi$, gain $T$) passes the unaliased harmonics $k=1,\dots,4$ unchanged. The $k=0$ term is $\sin0=0$ anyway, and $k=5$ was lost:

$$g(t)=\sum_{k=1}^{4}\left(\tfrac12\right)^k\sin(k\pi t).$$

The lesson: a sinusoid at **exactly** half the sampling rate is not safely sampled. Depending on its phase, the samples can even be identically zero. That is why the theorem has a strict inequality.`,
  },
  {
    id: "bk-opp-7.9",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problem 7.9",
    prompt: r`Consider the signal

$$x(t)=\left(\frac{\sin50\pi t}{\pi t}\right)^2,$$

which we wish to sample with a sampling frequency of $\omega_s=150\pi$ to obtain a signal $g(t)$ with Fourier transform $G(j\omega)$. Determine the maximum value of $\omega_0$ for which it is guaranteed that

$$G(j\omega)=75X(j\omega)\quad\text{for }|\omega|\le\omega_0.$$`,
    solution: r`**Spectrum of $x$.** $\frac{\sin50\pi t}{\pi t}$ is a rectangle on $|\omega|<50\pi$. Squaring gives a triangle on $|\omega|<100\pi$, so $\omega_M=100\pi$.

**Sampling.** $T=\frac{2\pi}{150\pi}=\frac1{75}$, so

$$G(j\omega)=\frac1T\sum_kX\big(j(\omega-k\omega_s)\big)=75\sum_kX\big(j(\omega-150\pi k)\big).$$

$\omega_s=150\pi$ is less than the Nyquist rate $200\pi$, so the copies overlap. The copy centred at $150\pi$ starts at $150\pi-100\pi=50\pi$. Below that, only the $k=0$ term is present:

$$G(j\omega)=75X(j\omega)\quad\text{for }|\omega|\le50\pi.$$

$$\boxed{\omega_0=50\pi}$$
` + fig("bk-sm-79") + r`
Even though sampling is below the Nyquist rate, the **low** part of the spectrum is untouched. Aliasing only corrupts frequencies above $\omega_s-\omega_M$.`,
  },
  {
    id: "bk-opp-7.10",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problem 7.10",
    prompt: r`Determine whether each of the following statements is true or false:

(a) The signal $x(t)=u(t+T_0)-u(t-T_0)$ can undergo impulse-train sampling without aliasing, provided that the sampling period $T<2T_0$.

(b) The signal $x(t)$ with Fourier transform $X(j\omega)=u(\omega+\omega_0)-u(\omega-\omega_0)$ can undergo impulse-train sampling without aliasing, provided that the sampling period $T<\pi/\omega_0$.

(c) The signal $x(t)$ with Fourier transform $X(j\omega)=u(\omega)-u(\omega-\omega_0)$ can undergo impulse-train sampling without aliasing, provided that the sampling period $T<2\pi/\omega_0$.`,
    solution: r`**The test for every part:** sampling makes copies of the spectrum every $\omega_s=\frac{2\pi}{T}$. There is no aliasing exactly when the copies don't overlap.

**(a) False.**

1. $x(t)$ is a pulse that lasts only from $-T_0$ to $T_0$.
2. Its spectrum is $\dfrac{2\sin\omega T_0}{\omega}$, which never becomes zero for good: it reaches to infinite frequency.
3. So the copies always overlap, whatever $T$ is.

**No sampling rate avoids aliasing for a time-limited signal.**

**(b) True.**

1. $X(j\omega)$ is a rectangle on $-\omega_0<\omega<\omega_0$, so the highest frequency is $\omega_M=\omega_0$.
2. No aliasing needs $\omega_s>2\omega_M$:

$$
\frac{2\pi}{T}>2\omega_0
$$

3. That is

$$
T<\frac{\pi}{\omega_0}
$$

**(c) True.**

1. $X(j\omega)$ is non-zero only for $0<\omega<\omega_0$: a band of total width $\omega_0$, on one side only. (So $x(t)$ is complex.)
2. Copies of a band of width $\omega_0$, spaced by $\omega_s$, don't overlap when $\omega_s>\omega_0$:

$$
\frac{2\pi}{T}>\omega_0
$$

3. That is

$$
T<\frac{2\pi}{\omega_0}
$$

**Lesson:** the usual "$\omega_s>2\omega_M$" rule assumes a band that is symmetric about zero. What really matters is the **total width** of the occupied band.`,
  },
  {
    id: "bk-opp-7.21",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problem 7.21",
    prompt: r`A signal $x(t)$ with Fourier transform $X(j\omega)$ undergoes impulse-train sampling with $T=10^{-4}$ to generate $x_p(t)=\sum_nx(nT)\delta(t-nT)$. For each of the following sets of constraints on $x(t)$ and/or $X(j\omega)$, does the sampling theorem guarantee that $x(t)$ can be recovered exactly from $x_p(t)$?

(a) $X(j\omega)=0$ for $|\omega|>5000\pi$ (b) $X(j\omega)=0$ for $|\omega|>15000\pi$ (c) $\mathrm{Re}\{X(j\omega)\}=0$ for $|\omega|>5000\pi$ (d) $x(t)$ real and $X(j\omega)=0$ for $\omega>5000\pi$ (e) $x(t)$ real and $X(j\omega)=0$ for $\omega<-15000\pi$ (f) $X(j\omega)*X(j\omega)=0$ for $|\omega|>15000\pi$ (g) $|X(j\omega)|=0$ for $\omega>5000\pi$`,
    solution: r`$\omega_s=\frac{2\pi}{10^{-4}}=20000\pi$, so recovery is guaranteed when $X(j\omega)=0$ for $|\omega|>10000\pi$.

| | reasoning | guaranteed? |
|---|---|---|
| (a) | band-limited to $5000\pi<10000\pi$ | **yes** |
| (b) | band-limit $15000\pi$ is too wide | **no** |
| (c) | only the real part is limited; $\mathrm{Im}\,X$ may extend anywhere | **no** |
| (d) | real $\Rightarrow\vert X(-j\omega)\vert =\vert X(j\omega)\vert $, so zero for $\omega<-5000\pi$ too | **yes** |
| (e) | real gives zero for $\vert \omega\vert >15000\pi$, still too wide | **no** |
| (f) | $X*X$ has twice the band of $X$, so $X$ is limited to $7500\pi$ | **yes** |
| (g) | says nothing about $\omega<-5000\pi$ (no realness given) | **no** |

Parts (d) and (g) look alike. The difference is that knowing $x$ is **real** gives you the negative half of the spectrum for free.`,
  },
  {
    id: "bk-opp-7.7",
    topic: "sampling",
    book: "Oppenheim",
    ref: "Problem 7.7",
    prompt: r`A signal $x(t)$ undergoes a zero-order hold operation with an effective sampling period $T$ to produce a signal $x_0(t)$. Let $x_1(t)$ denote the result of a first-order hold operation on the samples of $x(t)$, i.e.

$$x_1(t)=\sum_{n=-\infty}^{\infty}x(nT)h_1(t-nT),$$

where $h_1(t)$ is the triangle of height 1 on $-T<t<T$. Specify the frequency response of a filter that produces $x_1(t)$ as its output when $x_0(t)$ is the input.`,
    solution: r`**Step 1: both holds start from the same impulse samples.** Let

$$
x_p(t)=\sum_nx(nT)\,\delta(t-nT)
$$

- The zero-order hold is $x_p$ passed through $h_0$: $\ X_0(j\omega)=X_p(j\omega)\,H_0(j\omega)$.
- The first-order hold is $x_p$ passed through $h_1$: $\ X_1(j\omega)=X_p(j\omega)\,H_1(j\omega)$.

So the filter that turns $x_0$ into $x_1$ is

$$
H(j\omega)=\frac{H_1(j\omega)}{H_0(j\omega)}
$$

**Step 2: the zero-order hold.** $h_0(t)=1$ on $0\le t<T$, a pulse of width $T$ centred at $\frac T2$:

$$
H_0(j\omega)=e^{-j\omega T/2}\,\frac{2\sin(\omega T/2)}{\omega}
$$

**Step 3: the first-order hold.** The triangle of width $2T$ equals two width-$T$ pulses convolved, divided by $T$:

$$
H_1(j\omega)=\frac1T\left[\frac{2\sin(\omega T/2)}{\omega}\right]^2
$$

**Step 4: divide.** One factor of $\frac{2\sin(\omega T/2)}{\omega}$ cancels:

$$
\boxed{H(j\omega)=\frac{2\sin(\omega T/2)}{\omega T}\,e^{j\omega T/2}}
$$
` + fig("bk-sm-77") + r`
**Reading the result.**

- **Magnitude:** one more $\frac{\sin}{\cdot}$ low-pass factor. It smooths the staircase into straight lines.
- **Phase:** $e^{+j\omega T/2}$ is an **advance** of $\frac T2$. The first-order hold is centred on each sample, while the zero-order hold lags by half a sample. So this filter is non-causal; in practice an extra delay of $T$ is accepted.`,
  },
  {
    id: "bk-tan-2.1",
    topic: "sampling",
    book: "Tan",
    ref: "Problem 2.1",
    prompt: r`Given an analog signal

$$x(t)=5\cos(2\pi\times1500t),\quad t\ge0,$$

sampled at a rate of 8000 Hz:

(a) sketch the spectrum of the original signal;

(b) sketch the spectrum of the sampled signal from 0 up to 20 kHz.`,
    solution: r`**(a)** $5\cos(2\pi f_0t)=2.5e^{j2\pi f_0t}+2.5e^{-j2\pi f_0t}$, so the two-sided spectrum has two lines of amplitude 2.5, at $\pm1500$ Hz.

**(b)** Sampling repeats the spectrum around every multiple of $f_s$, scaled by $\frac1T=f_s$:

$$X_s(f)=\frac1T\sum_nX(f-nf_s).$$

Every copy contributes lines at $nf_s\pm1500$ Hz:

| copy | lines (Hz) |
|---|---|
| $n=0$ | 1500 |
| $n=1$ | $8000-1500=6500$, $\ 8000+1500=9500$ |
| $n=2$ | 14500, 17500 |

Up to 20 kHz, the lines sit at 1.5, 6.5, 9.5, 14.5 and 17.5 kHz, each of height $2.5f_s$.
` + fig("bk-sm-tan21") + r`
$1500<\frac{f_s}{2}=4000$, so the baseband line stays alone below the folding frequency. An ideal 4 kHz low-pass filter would recover $x(t)$ exactly.`,
  },
  {
    id: "bk-tan-2.5",
    topic: "sampling",
    book: "Tan",
    ref: "Problem 2.5",
    prompt: r`Given an analog signal

$$x(t)=5\cos(2\pi\times2500t)+2\cos(2\pi\times4500t),\quad t\ge0,$$

sampled at a rate of 8000 Hz:

(a) sketch the spectrum of the sampled signal up to 20 kHz;

(b) sketch the recovered analog signal spectrum if an ideal lowpass filter with a cutoff frequency of 4 kHz is used to filter the sampled signal in order to recover the original signal;

(c) determine the frequency/frequencies of aliasing noise.`,
    solution: r`**(a)** Each tone $f_0$ produces lines at $nf_s\pm f_0$:

- 2500 Hz (amplitude 2.5): 2.5, 5.5, 10.5, 13.5, 18.5 kHz.
- 4500 Hz (amplitude 1): 3.5, 4.5, 11.5, 12.5, 19.5 kHz.
` + fig("bk-sm-tan25") + r`
**(b)** The 4 kHz low-pass filter keeps only the lines below 4 kHz: **2500 Hz** (true) and **3500 Hz** (an image of 4500 Hz). The recovered signal is

$$\hat x(t)=5\cos(2\pi\times2500t)+2\cos(2\pi\times3500t).$$

**(c)** The 4500 Hz component exceeds the folding frequency $\frac{f_s}{2}=4000$ Hz. It "folds" back to

$$f_{\text{alias}}=f_s-4500=3500\ \text{Hz}.$$

So the **aliasing noise** is at 3500 Hz. It cannot be removed after sampling, because it sits inside the signal band. It must be prevented by an anti-aliasing filter before the sampler.`,
  },
]
