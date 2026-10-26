const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const samplingNote = r`
## The question

Earlier we turned a continuous signal into a sequence by reading it at uniform intervals, $x[n]=x(nT)$, and never looked back. Now the real question:

> Under what conditions is $x(t)$ **uniquely determined by**, and **exactly recoverable from**, its samples?

### Ambiguity

In general, never: infinitely many continuous signals produce exactly the same samples.
` + fig("smp-ambiguity") + r`
Exact recovery is possible if the signal is **band-limited** (its Fourier transform is zero outside a finite band) and the samples are taken **sufficiently close together**. This is the Nyquist–Shannon sampling theorem. Its derivation is one picture.

## Sampling as multiplication: the time-domain row

Represent sampling as multiplying $x(t)$ by a periodic impulse train:

$$
p(t)=\sum_{n=-\infty}^{\infty}\delta(t-nT),\qquad x_p(t)=x(t)\,p(t)=\sum_{n=-\infty}^{\infty}x(nT)\,\delta(t-nT).
$$

Each impulse picks up the value of $x$ where it stands, so the weights $x(nT)$ are exactly the samples $x[n]$.
` + fig("smp-multiply") + r`
## The map, and two roads to $X_p(j\omega)$

We know $x(t)$, so we know $X(j\omega)$. Sampling hands us $x_p(t)$. What is its spectrum $X_p(j\omega)$, and how is it related to $X(j\omega)$? Picture a map: the top row is "$x(t)\times p(t)=x_p(t)$", the bottom row their transforms. From the top-left corner to the bottom-right corner there are two roads.

### Road 1: multiply first, then transform

The product is already in hand, so transform it; the impulses sift the integral:

$$
X_p(j\omega)=\int\sum_nx(nT)\delta(t-nT)e^{-j\omega t}dt=\sum_{n=-\infty}^{\infty}x(nT)\,e^{-j\omega nT}.
$$

Correct (relabel $\omega T\to\omega$ and it is the DTFT), but it is a formula, not a picture. $X(j\omega)$, the one thing we were given, appears nowhere. Park it.

### Road 2: transform first, then convolve

Go down first: $X(j\omega)$ we have, and $P(j\omega)$ we can look for. A product in time should become a convolution in frequency:

$$
X_p(j\omega)=\frac1{2\pi}X(j\omega)*P(j\omega).
$$

If so, $X_p$ is built out of $X$, and we may be able to read off how they are related. We need two tools first.

## Tool 1: duality

From the inverse transform, $x(t)=\frac1{2\pi}\int X(j\omega)e^{j\omega t}d\omega$, so $2\pi x(-t)=\int X(j\omega)e^{-j\omega t}d\omega$. Swap the names $t$ and $\omega$:

$$
2\pi x(-\omega)=\int X(jt)e^{-j\omega t}dt=\mathcal F\{X(jt)\}\qquad\Longrightarrow\qquad x(t)\leftrightarrow X(j\omega)\ \Rightarrow\ X(jt)\leftrightarrow2\pi\,x(-\omega).
$$

Every transform pair comes with a free twin: swap time and frequency, flip, scale by $2\pi$.

## Tool 2: multiplication is convolution in frequency

From the convolution property, $x_1*x_2\leftrightarrow X_1X_2$. Apply duality to both sides, then rename $X_1(jt)=u(t)$ and $X_2(jt)=v(t)$ (so $U(j\omega)=2\pi x_1(-\omega)$ and $V(j\omega)=2\pi x_2(-\omega)$):

$$
u(t)\,v(t)\ \leftrightarrow\ \frac1{2\pi}\,U(j\omega)*V(j\omega).
$$

So the bottom row of the map really is a convolution: $X_p=\frac1{2\pi}X*P$. One unknown is left: $P(j\omega)$.

## Tool 3: the spectrum of the impulse train

**First attempt, straight from the definition.** Transform the train term by term; each impulse sifts: $P(j\omega)=\sum_ne^{-j\omega nT}$. True, but what does it look like? Same problem as Road 1, and we would have to convolve $X$ with it. Dead end.

**Second attempt: Fourier series first.** $p(t)$ is periodic with period $T$; with $\omega_s=\frac{2\pi}T$,

$$
p(t)=\sum_kc_ke^{jk\omega_st},\qquad c_k=\frac1T\int_{-T/2}^{T/2}\delta(t)e^{-jk\omega_st}dt=\frac1T\ \ \text{for every }k .
$$

Every harmonic has equal weight. Now we have a sum of **pure tones** $e^{jk\omega_st}$, and the transform of a pure tone is the one spectrum everybody can draw:

- sifting gives $\delta(t)\leftrightarrow1$; duality then gives $1\leftrightarrow2\pi\delta(\omega)$;
- frequency shift gives $e^{j\omega_0t}\leftrightarrow2\pi\delta(\omega-\omega_0)$.

Transforming term by term:

$$
\boxed{\,P(j\omega)=\frac1T\sum_k2\pi\,\delta(\omega-k\omega_s)=\frac{2\pi}T\sum_{k=-\infty}^{\infty}\delta(\omega-k\omega_s)\,}
$$
` + fig("smp-train-spectrum") + r`
Good news: an impulse train in time is an impulse train in frequency, spaced $\omega_s=2\pi/T$ apart (closer samples, sparser spectrum). And impulses are the easiest thing in the world to convolve with.

## Why impulses are good news

Recall where convolution came from: an LTI system fed $\delta(t-t_0)$ outputs $h(t-t_0)$. So $\delta(t-t_0)*h(t)=h(t-t_0)$: convolving with a shifted impulse just **copies** $h$ to $t_0$, scaled by the impulse's weight. By linearity, convolving with a train of impulses puts **one copy at every impulse**. The same holds in frequency, by sifting:

$$
X(j\omega)*\delta(\omega-\omega_0)=\int X(j\theta)\delta(\omega-\theta-\omega_0)d\theta=X\big(j(\omega-\omega_0)\big).
$$
` + fig("smp-conv-impulse") + r`
## Back to the map: every impulse becomes a copy

$$
X_p(j\omega)=\frac1{2\pi}X(j\omega)*\frac{2\pi}T\sum_k\delta(\omega-k\omega_s)=\boxed{\,\frac1T\sum_{k=-\infty}^{\infty}X\big(j(\omega-k\omega_s)\big)\,}
$$

**Spectrum of the sampled signal:** copies of $X(j\omega)$, one at every impulse of $P(j\omega)$, spaced $\omega_s$ apart and each scaled by $1/T$. The copies sit $\omega_s$ apart and each is $2\omega_M$ wide. Do they overlap?
` + fig("smp-copies") + r`
## The sampling theorem

Suppose $x$ is band-limited: $X(j\omega)=0$ for $|\omega|>\omega_M$. The copy at $k\omega_s$ occupies $[k\omega_s-\omega_M,\ k\omega_s+\omega_M]$. Neighbouring copies stay apart exactly when the right edge of one comes before the left edge of the next:

$$
\omega_M<\omega_s-\omega_M\iff\omega_s>2\omega_M .
$$

- If they stay apart, the copy at the origin is an untouched $X(j\omega)/T$, and a low-pass filter can cut it out: $x(t)$ is recoverable.
- If they overlap, the copies add where they meet, and no filter can un-mix them.

> **Nyquist–Shannon sampling theorem.** Let $x(t)$ be band-limited with $X(j\omega)=0$ for $|\omega|>\omega_M$. Then $x(t)$ is uniquely determined by its samples $x(nT)$, $n=0,\pm1,\pm2,\dots$, if
> $$\omega_s>2\omega_M,\qquad\omega_s=\frac{2\pi}T .$$
> The minimum sampling frequency $2\omega_M$ is called the **Nyquist rate**. (In hertz: $f_s>2B$.)

### Oversampling and undersampling

- **Oversampling** ($\omega_s>2\omega_M$): exact copies of the spectrum, perfectly separated by a **guard band**. Isolate the baseband copy with a low-pass filter.
- **Undersampling** ($\omega_s<2\omega_M$): the shifted copies overlap the baseband. High frequencies **fold over** into the low band, distorting the signal. This is **aliasing**, and $x(t)$ can no longer be recovered by low-pass filtering.
` + fig("smp-alias") + r`
A frequency just above $\omega_s/2$ masquerades as one just below it. *Example:* a 7 kHz tone sampled at 10 kHz produces exactly the same samples as a 3 kHz tone; after reconstruction you hear 3 kHz.
` + fig("smp-alias-tone", "smp-interactive-alias") + r`
## Signal reconstruction

### Ideal reconstruction

If $\omega_s>2\omega_M$, the baseband copy of $X_p$ is an exact replica of $X(j\omega)$ scaled by $1/T$. Recover $x(t)$ with an ideal low-pass filter:
` + fig("smp-reconstruct-block") + r`
$$
H(j\omega)=\begin{cases}T,&|\omega|<\omega_c\\0,&|\omega|>\omega_c\end{cases}\qquad\omega_M<\omega_c<\omega_s-\omega_M .
$$

The usual choice is the middle, $\omega_c=\omega_s/2=\pi/T$, which follows from the assumption $\omega_M<\omega_s/2$.

### The ideal interpolation filter

$$
h(t)=\frac1{2\pi}\int_{-\pi/T}^{\pi/T}T\,e^{j\omega t}d\omega=\frac T{2\pi}\cdot\frac{e^{j\pi t/T}-e^{-j\pi t/T}}{jt}=\frac{\sin(\pi t/T)}{\pi t/T}=\operatorname{sinc}\!\left(\frac{\pi t}T\right)
$$

(with $\operatorname{sinc}x=\frac{\sin x}x$). A perfect frequency cutoff corresponds to an infinitely wide sinc in time.
` + fig("smp-ideal-lpf") + r`
### Interpolation with the ideal LPF

$$
x_r(t)=x_p(t)*h(t)=\sum_{n=-\infty}^{\infty}x(nT)\,\operatorname{sinc}\!\left(\frac{\pi(t-nT)}{T}\right).
$$

The reconstruction is a **superposition of shifted sincs**, one per sample. Each sinc equals 1 at its own sample instant and 0 at every other one, so the sum passes exactly through the samples.
` + fig("smp-interp") + r`
For a general cutoff $\omega_c$: $x(t)=\sum_nx(nT)\frac{\omega_cT}{\pi}\frac{\sin\omega_c(t-nT)}{\omega_c(t-nT)}$.

**But** $h(t)$ is non-causal and decays very slowly, so it is unrealisable in practice. We need approximations.

### Zero-order hold (ZOH)

The simplest practical method: hold each sample value constant until the next sample arrives, a "staircase" approximation $x_0(t)$. It is what most digital-to-analogue converters do.

**Why $h_0(t)$ is a rectangle.** In the output, sample $y(nT)$ contributes through $y(nT)\,h(t-nT)$. For ZOH we want that weight to jump to 1 at $t=nT$ and drop back to 0 at $t=(n+1)T$, so $h_0(t)$ must be a rectangle of height 1 on $[0,T]$.
` + fig("smp-zoh") + r`
$$
H_0(j\omega)=\int_0^Te^{-j\omega t}dt=\frac{1-e^{-j\omega T}}{j\omega}=e^{-j\omega T/2}\,\frac{2\sin(\omega T/2)}{\omega}=T\,e^{-j\omega T/2}\operatorname{sinc}\!\left(\frac{\omega T}2\right).
$$

- In the passband $|\omega|\le\omega_s/2$ the gain is not constant: it attenuates high frequencies slightly.
- Outside the passband the gain is non-zero, so high-frequency image copies leak through.

### Linear interpolation (first-order hold)

Connect adjacent samples with straight lines: a continuous, much smoother approximation $x_1(t)$.

**Why $h_1(t)$ is a triangle.** Between $(n-1)T$ and $nT$ the output is $(1-\alpha)y((n-1)T)+\alpha\,y(nT)$ with $\alpha$ rising from 0 to 1. So the weight of $y(nT)$ rises linearly from 0 to 1 on $[(n-1)T,nT]$, falls back to 0 on $[nT,(n+1)T]$, and is 0 elsewhere: a symmetric triangle on $[-T,T]$ with peak 1.
` + fig("smp-foh") + r`
**Convolution intuition.** The triangle is two centred ZOH rectangles convolved: $h_1(t)=\frac1T\,h_0(t+\frac T2)*h_0(t+\frac T2)$. The overlap area grows linearly to a peak of $T$ and falls linearly, hence the factor $\frac1T$. Using $\mathcal F\{x*x\}=(\mathcal Fx)^2$:

$$
H_1(j\omega)=\frac1T\left[T\operatorname{sinc}\!\left(\frac{\omega T}2\right)\right]^2=T\operatorname{sinc}^2\!\left(\frac{\omega T}2\right).
$$

It is proportional to the square of the ZOH response, without the phase delay.

### Comparing reconstruction filters
` + fig("smp-filters") + r`
Linear interpolation has a much faster high-frequency roll-off (less image leakage) than ZOH, so it is a better approximation of the ideal low-pass filter.

## Practical limits: time-limited signals always alias

> **Uncertainty principle.** A signal cannot be both time-limited and strictly band-limited.

Every real capture has finite duration, so its spectrum extends to infinite frequency. After sampling, the infinite tails of the neighbouring copies **always** overlap and leak into the baseband. Sampling any real-world signal causes some aliasing, no matter how high the sampling rate.
` + fig("smp-time-limited") + r`
**What we do about it:**

1. **Anti-aliasing filter.** Low-pass filter the signal to its essential bandwidth $B$ *before* sampling. The discarded high frequencies are lost, but nothing folds back.
2. **Sample faster than Nyquist.** Use $f_s>2B$ to create guard bands so that realisable filters with finite roll-off work, both for anti-aliasing and for reconstruction. *Example:* telephone speech is band-limited to 3.4 kHz and sampled at 8 kHz rather than 6.8 kHz.

## Connection to the DTFT and the DFT

### The DTFT revisited

Road 1 gave $X_p(j\omega)=\sum_nx[n]e^{-j\omega nT}$. It repeats every $\omega_s$:

$$
X_p(j(\omega+\omega_s))=\sum_nx[n]e^{-j\omega nT}e^{-j2\pi n}=X_p(j\omega).
$$

Road 2 says this same function is the train of copies $\frac1T\sum_kX(j(\omega-k\omega_s))$. Under the relabelling $\omega T\to\omega$, the same expression becomes the DTFT $X(e^{j\omega})=\sum_nx[n]e^{-j\omega n}$, and one $\omega_s$-wide period becomes one $2\pi$-wide period.

### The baseband copy and the inverse DTFT

The central band $[-\omega_s/2,\omega_s/2]$ contains the original copy; every other band of width $\omega_s$ is a shifted copy. Ideal reconstruction keeps exactly that band:

$$
x(t)=\frac1{2\pi}\int_{-\omega_s/2}^{\omega_s/2}T\,X_p(j\omega)e^{j\omega t}d\omega .
$$

Evaluate at $t=nT$ and change variables $\omega T\to\omega$ (so $T\,d\omega\to d\omega$ and $[-\omega_s/2,\omega_s/2]\to[-\pi,\pi]$):

$$
x[n]=x(nT)=\frac1{2\pi}\int_{-\pi}^{\pi}X(e^{j\omega})e^{j\omega n}d\omega,
$$

which is the inverse DTFT. (The area is the same whichever $2\pi$ period we choose.)

### The DFT as uniform samples of one period

$$
X[k]=X(e^{j\omega})\Big|_{\omega=2\pi k/N}=X_p\!\left(j\frac{k\omega_s}N\right).
$$

A normalised DTFT point $\omega$ sits at the physical frequency $\omega/T$. So an $N$-point DFT takes $N$ uniformly spaced samples across one physical period of width $\omega_s$. For even $N$, bins $0,\dots,N/2$ run from dc to the highest positive frequency; bins $N/2+1,\dots,N-1$ are the wrapped negative frequencies, large negative first, then back toward dc.
` + fig("smp-dft-period") + r`
### Periodic signals give harmonic line spectra

If $x(t)$ has period $T_0$, $\omega_0=2\pi/T_0$, then $X(j\omega)=2\pi\sum_ka_k\delta(\omega-k\omega_0)$. Sampling exactly $N$ times per period gives $T_0=NT$ and $\omega_s=N\omega_0$. The sampled spectrum copies every harmonic line to every passband:

$$
X_p(j\omega)=\frac{2\pi}T\sum_r\sum_ka_k\,\delta(\omega-k\omega_0-r\omega_s).
$$

**Nyquist condition for the periodic case.** If every non-zero harmonic satisfies $|k\omega_0|<\omega_s/2$ (i.e. $a_k=0$ for $|k|\ge N/2$), one passband holds one clean, non-overlapping copy of the line spectrum.
` + fig("smp-lines") + r`
From the DFT topic, the sampled periodic signal has Fourier coefficients $c_\ell=\frac1{T_0}X[\ell]$ with $c_{\ell+N}=c_\ell$. Writing its spectrum the same way and matching coefficient by coefficient:

$$
c_k=\frac{a_k}T,\qquad X[k]=T_0c_k=\frac{T_0}{T}a_k=N\,a_k .
$$

If the periodic signal is band-limited to the Nyquist band, **the DFT bins are scaled versions of the original Fourier-series coefficients.** Reconstruction then gives

$$
x(t)=\sum_{|k|<N/2}a_ke^{jk\omega_0t}\quad\Longrightarrow\quad x[n]=x(nT)=\frac1N\sum_{|k|<N/2}X[k]e^{j\frac{2\pi}Nkn}=\frac1N\sum_{k=0}^{N-1}X[k]e^{j\frac{2\pi}Nkn},
$$

the inverse DFT, after using the periodicity of $X[k]$ to shift the index set to $0,\dots,N-1$.

## Sampling a discrete-time signal

The same idea works on sequences: keep every $N$-th sample, $x_p[n]=x[n]\sum_k\delta[n-kN]$. The sampling frequency is $\omega_s=2\pi/N$ and

$$
X_p(e^{j\omega})=\frac1N\sum_{k=0}^{N-1}X\!\left(e^{j(\omega-k\omega_s)}\right).
$$

There is no aliasing if $\omega_s>2\omega_M$, i.e. $N<\pi/\omega_M$. **Example:** $X(e^{j\omega})=0$ for $\frac{2\pi}9\le|\omega|\le\pi$ allows $N<4.5$, so we can keep every 4th sample.
` + fig("smp-dt-sampling") + r`
## Exam pointers

- Derive $X_p$ via the Fourier series of the impulse train (Road 2), and state that convolving with impulses copies the spectrum.
- Always state the band-limited assumption, $\omega_s>2\omega_M$, and the reconstruction filter's gain ($T$) and cutoff.
- A single non-zero sample at the Nyquist rate reconstructs to a single sinc.
- "Why can't a practical signal be fully recovered?" Time-limited ⇒ not band-limited ⇒ tails always alias. Cure: anti-aliasing filter plus oversampling.
- Over-sampling at $1.5\times$ Nyquist leaves a guard band of width $B$ between copies: sketch it.
`
