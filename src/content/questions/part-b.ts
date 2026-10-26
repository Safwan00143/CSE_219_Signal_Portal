import type { Question } from "../types"

const r = String.raw

export const partBQuestions: Question[] = [
  // ───────────────────────── Sampling ─────────────────────────
  {
    id: "219-2223-1c",
    topic: "sampling",
    course: "CSE 219",
    session: "2022-23",
    label: "Q1(c)",
    marks: 15,
    prompt: r`Let $x(t)$ be band-limited with $X(j\omega)=0$ for $|\omega|>\omega_M$. Analyse how $x(t)$ is uniquely determined by its samples $x(nT)$, $n=0,\pm1,\pm2,\dots$, if $\omega_s>2\omega_M$, where $\omega_s=\dfrac{2\pi}{T}$.`,
    solution: r`**1. Sampling as multiplication.** Let $p(t)=\sum_n\delta(t-nT)$. Then

$$
x_p(t)=x(t)p(t)=\sum_{n}x(nT)\,\delta(t-nT).
$$

$x_p$ contains exactly the information in the samples.

**2. Spectrum of the impulse train.** $p(t)$ is periodic, and all its Fourier-series coefficients equal $\frac1T$. So

$$
P(j\omega)=\frac{2\pi}{T}\sum_k\delta(\omega-k\omega_s).
$$

**3. Multiplication becomes convolution.**

$$
X_p(j\omega)=\frac1{2\pi}X(j\omega)*P(j\omega)=\frac1T\sum_{k=-\infty}^{\infty}X\big(j(\omega-k\omega_s)\big).
$$

Convolving with an impulse simply copies $X$, so the sampled spectrum is $X$ **replicated every $\omega_s$**, scaled by $1/T$.

**4. No overlap.** The copy at $k=0$ occupies $[-\omega_M,\omega_M]$ and the copy at $k=1$ starts at $\omega_s-\omega_M$. They do not overlap iff

$$
\omega_s-\omega_M>\omega_M\iff\omega_s>2\omega_M .
$$

**5. Recovery.** Pass $x_p(t)$ through an ideal low-pass filter with gain $T$ and cutoff $\omega_c$, where $\omega_M<\omega_c<\omega_s-\omega_M$. It keeps only the $k=0$ copy, $T\cdot\frac1TX(j\omega)=X(j\omega)$, so the output is exactly $x(t)$. In the time domain this is the **band-limited interpolation**

$$
x(t)=\sum_{n=-\infty}^{\infty}x(nT)\,\frac{\omega_cT}{\pi}\,\frac{\sin\omega_c(t-nT)}{\omega_c(t-nT)} .
$$

**Uniqueness.** Two band-limited signals with the same samples have the same $X_p$. With non-overlapping copies, filtering recovers the same $X$, so they are the same signal. If $\omega_s<2\omega_M$ the copies overlap (**aliasing**) and different signals can share the same samples. The minimum rate $2\omega_M$ is the **Nyquist rate**.`,
  },
  {
    id: "219-2223-4b",
    topic: "sampling",
    course: "CSE 219",
    session: "2022-23",
    label: "Q4(b)",
    marks: 10,
    prompt: r`A sequence $x[n]$ has Fourier transform $X(e^{j\omega})=0$ for $\dfrac{2\pi}{9}\le|\omega|\le\pi$. Determine the lowest rate at which $x[n]$ may be sampled for perfect reconstruction.`,
    solution: r`This is **sampling of a discrete-time signal**: keep every $N$-th sample, $x_p[n]=x[n]\sum_k\delta[n-kN]$.

**Spectrum of the sampled sequence.** The sampling frequency is $\omega_s=2\pi/N$, and

$$
X_p(e^{j\omega})=\frac1N\sum_{k=0}^{N-1}X\!\left(e^{j(\omega-k\omega_s)}\right),
$$

which consists of $N$ shifted copies of $X$ inside each $2\pi$ interval.

**Condition.** $x[n]$ is band-limited to $\omega_M=\frac{2\pi}9$. The copies do not overlap iff

$$
\omega_s>2\omega_M\iff\frac{2\pi}{N}>\frac{4\pi}{9}\iff N<\frac92=4.5 .
$$

So the largest integer is $N_{\max}=4$.

**Answer.** Keep **every 4th sample**. The lowest usable sampling rate is $\tfrac14$ of the original rate, i.e. $\omega_s=\frac{2\pi}{4}=\frac\pi2$ rad/sample. With $N=5$, $\omega_s=0.4\pi<2\omega_M\approx0.444\pi$ and aliasing occurs. Reconstruction: low-pass filter $x_p[n]$ with gain $N=4$ and cutoff between $2\pi/9$ and $\pi/2-2\pi/9$.`,
  },
  {
    id: "311-1920-3",
    topic: "sampling",
    course: "CSE 311",
    session: "2019-20",
    label: "Q3",
    marks: 35,
    prompt: r`Find and draw the Fourier transform of (odd rolls) $2B\operatorname{sinc}(2Bt)$, or (even rolls) $B\operatorname{sinc}^2(Bt)$. If the signal is sampled at $1.5\times$ the Nyquist rate, draw and write the spectrum of the sampled signal. Then derive the general spectrum of a signal $g(t)$ sampled at rate $f_s$.`,
    note: "Here sinc(x) = sin(πx)/(πx) (normalised), which makes these the standard band-limited pairs.",
    solution: r`**Transforms.** With $\operatorname{sinc}x=\frac{\sin\pi x}{\pi x}$:

- $2B\operatorname{sinc}(2Bt)\ \leftrightarrow\ \Pi\!\left(\dfrac f{2B}\right)$: **flat**, height $1$, for $|f|<B$. *(Dual of the rect pair, $\Pi(t/\tau)\leftrightarrow\tau\operatorname{sinc}(f\tau)$ with $\tau=2B$.)*
- $B\operatorname{sinc}^2(Bt)\ \leftrightarrow\ \Lambda\!\left(\dfrac fB\right)=1-\dfrac{|f|}B$ for $|f|<B$: a **triangle** of height $1$. *(Square in time means self-convolution in frequency: rect ∗ rect = triangle.)*

Both are band-limited to $B$ Hz, so the **Nyquist rate is $2B$**.

**Sampled at $f_s=1.5\times2B=3B$.**

$$
G_s(f)=\frac1{T_s}\sum_n G(f-nf_s)=3B\sum_{n=-\infty}^{\infty}G(f-3nB).
$$

- *Odd roll:* rectangles of height $3B$ on $[3nB-B,\,3nB+B]$.
- *Even roll:* triangles of height $3B$ centred at $0,\pm3B,\pm6B,\dots$, each $2B$ wide.

Consecutive copies are separated by a **guard band of width $B$** (from $B$ to $2B$, etc.). That gap lets a practical, non-ideal low-pass filter with cutoff between $B$ and $2B$ recover $g(t)$. This is the benefit of over-sampling.

**General derivation.** Let $\delta_{T_s}(t)=\sum_n\delta(t-nT_s)$ and $\bar g(t)=g(t)\delta_{T_s}(t)$. The impulse train is periodic, so expand it in a Fourier series:

$$
\delta_{T_s}(t)=\frac1{T_s}\sum_{n}e^{j2\pi nf_st}\quad\Big(\text{each coefficient}=\tfrac1{T_s}\textstyle\int_{T_s}\delta(t)e^{-j2\pi nf_st}dt=\tfrac1{T_s}\Big).
$$

Then $\bar g(t)=\frac1{T_s}\sum_n g(t)e^{j2\pi nf_st}$. By the frequency-shift property, $g(t)e^{j2\pi nf_st}\leftrightarrow G(f-nf_s)$:

$$
\boxed{\bar G(f)=\frac1{T_s}\sum_{n=-\infty}^{\infty}G(f-nf_s)}
$$`,
  },
  {
    id: "311-1819-1a",
    topic: "sampling",
    course: "CSE 311",
    session: "2018-19",
    label: "Q1(a)",
    marks: 21,
    prompt: r`A signal $g(t)$ band-limited to 50 Hz is uniformly sampled every 0.01 s, giving $g(0)=1$ and $g(\pm0.01)=g(\pm0.02)=\cdots=0$. Find and draw $g(t)$ and its Fourier transform. State the characteristics of $g(t)$. Can you justify the Fourier transform of a Dirac delta from $g(t)$ and its transform?`,
    alsoAsked: ["CSE 311 · 2021-22 Q3(b)"],
    solution: r`**Rate.** $f_s=1/0.01=100$ Hz $=2\times50$ Hz, exactly the Nyquist rate, so the samples determine $g$ through the interpolation formula with an ideal LPF of bandwidth $B=50$ Hz:

$$
g(t)=\sum_n g(nT_s)\,\frac{\sin 2\pi B(t-nT_s)}{2\pi B(t-nT_s)}.
$$

**Only $n=0$ survives:**

$$
\boxed{g(t)=\frac{\sin100\pi t}{100\pi t}}\qquad(\text{Lathi: }\operatorname{sinc}(100\pi t)).
$$

**Transform.** Using $\Pi(f/2B)\leftrightarrow2B\,\frac{\sin 2\pi Bt}{2\pi Bt}$:

$$
G(f)=\frac1{100}\,\Pi\!\left(\frac{f}{100}\right).
$$

This is flat at $0.01$ for $|f|<50$ Hz and $0$ outside.

**2021-22 version** (amplitude $A$ at $t=0$, band $B$): $g(t)=A\,\dfrac{\sin2\pi Bt}{2\pi Bt}$. The zero crossings at $t=n/2B$ fall exactly on the sample instants, which is why every other sample is $0$.

**Characteristics of $g(t)$.**

- Real, even, peak $1$ at $t=0$.
- Zero crossings at every multiple of $0.01$ s.
- Oscillating tails decaying like $1/t$, of infinite duration, hence **non-causal**.
- Strictly band-limited to 50 Hz, with finite energy $\int g^2dt=\int|G|^2df=10^{-2}$.

**Dirac delta.** Scale by $2B$: $2B\,\frac{\sin2\pi Bt}{2\pi Bt}\leftrightarrow\Pi(f/2B)$, which has unit area for every $B$. As $B\to\infty$:

- in time, the pulse gets taller and narrower while its area stays $1$, so it tends to $\delta(t)$;
- in frequency, the rectangle widens to cover all $f$ with height $1$, so it tends to $1$.

Hence $\delta(t)\leftrightarrow1$: a flat spectrum is what an infinitely narrow pulse needs.`,
  },
  {
    id: "311-1819-3b",
    topic: "sampling",
    course: "CSE 311",
    session: "2018-19",
    label: "Q3(b)",
    marks: 20,
    prompt: r`Explain the main cause of aliasing in sampling. What problems does aliasing introduce into a sampled signal? How are they compensated?`,
    alsoAsked: ["CSE 311 · 2014-15 Q2(c)"],
    solution: r`**Cause.** Sampling replicates the spectrum every $f_s$:

$$
\bar G(f)=\frac1{T_s}\sum_nG(f-nf_s).
$$

If $G(f)$ extends beyond $f_s/2$, which happens when the signal is not band-limited or $f_s<2B$, neighbouring copies **overlap**. This is aliasing. Its main cause is that practical signals are time-limited and therefore **not strictly band-limited**, combined with sampling below twice the highest significant frequency.

**Problems.**

1. **Loss of high-frequency content.** The tail of $G(f)$ beyond $f_s/2$ is cut off by the reconstruction filter.
2. **Spectral folding.** The tails of neighbouring copies fall *inside* the baseband. A component at $f_s/2+\Delta f$ reappears at $f_s/2-\Delta f$, as a false low frequency ("frequency in disguise"). *Example:* sampling a 7 kHz tone at 10 kHz produces a 3 kHz tone after reconstruction. Wagon wheels appearing to spin backwards in films is the same effect.
3. **It cannot be undone.** Once components overlap, no filter can separate the true from the aliased content.

**Compensation.**

- **Anti-aliasing filter.** Low-pass filter the signal to $B<f_s/2$ **before** sampling. We lose the components above $B$ deliberately, but nothing folds back into the band.
- **Over-sample.** Use $f_s>2B$, typically 10–25% higher. This creates guard bands so that realisable filters with finite roll-off can be used for both anti-aliasing and reconstruction.
- *Example:* telephone speech is band-limited to 3.4 kHz and sampled at 8 kHz rather than 6.8 kHz.`,
  },
  {
    id: "311-2021-3a",
    topic: "sampling",
    course: "CSE 311",
    session: "2020-21",
    label: "Q3(a)",
    marks: 24,
    prompt: r`"A practical signal cannot be fully recovered from its sampled values no matter how much we increase the sampling frequency." Justify. Which phenomenon causes this, how does it distort the signal, and what do we do to minimise the distortion?`,
    solution: r`**Justification.**

- A practical signal exists for a **finite time**. A time-limited signal cannot be band-limited: its spectrum has tails extending to infinite frequency. The rect pulse, for example, has a sinc spectrum.
- The sampling theorem guarantees perfect recovery only for band-limited signals with $f_s\ge2B$. Here $B=\infty$, so **no finite $f_s$ meets the condition**.
- Increasing $f_s$ pushes the spectral copies further apart and makes the overlap smaller, but it never reaches exactly zero.

**Phenomenon: aliasing.** In $\bar G(f)=\frac1{T_s}\sum G(f-nf_s)$, the tails of the copies at $\pm f_s$ spill into $|f|<f_s/2$.

**How it distorts.**

- The reconstruction low-pass filter (cutoff $f_s/2$) passes the baseband **plus** the folded tails of the neighbouring copies.
- Components above $f_s/2$ are lost, and they reappear mirrored about $f_s/2$ as false lower frequencies.
- The recovered waveform is therefore wrong in its high-frequency detail, and the error cannot be filtered out afterwards.

**Minimising it.**

1. **Anti-aliasing low-pass filter** before the sampler, cutting off at the essential bandwidth $B$ (e.g. 3.4 kHz for speech). The truncated tail is lost, but nothing folds back.
2. **Sample above the Nyquist rate** ($f_s>2B$) to leave guard bands, so realisable filters work.
3. Choose $B$ so the discarded energy is negligible, e.g. 99% essential bandwidth.

What remains is a small, controlled error instead of uncontrolled aliasing.`,
  },
  {
    id: "311-1415L4-8a",
    topic: "sampling",
    course: "CSE 311",
    session: "2014-15",
    label: "Q8(a)",
    marks: 15,
    prompt: r`A signal $g(t)\leftrightarrow G(f)$ is sampled by an impulse train: $g_\delta(t)=g(t)\sum_n\delta(t-nT_s)=\sum_n g(nT_s)\delta(t-nT_s)$. Find the Fourier transform of $g_\delta(t)$, draw $G_\delta(f)$, and explain the sampling theorem from the diagram.`,
    alsoAsked: ["CSE 311 · 2010-11 Q6(c)"],
    solution: r`**Derivation.**

$$
\sum_n\delta(t-nT_s)=\frac1{T_s}\sum_ne^{j2\pi nf_st}\ \Rightarrow\ g_\delta(t)=\frac1{T_s}\sum_ng(t)e^{j2\pi nf_st}\ \Rightarrow\ G_\delta(f)=\frac1{T_s}\sum_{n=-\infty}^{\infty}G(f-nf_s).
$$

**Diagram.** Copies of $G(f)$, each scaled by $1/T_s$, centred at $0,\pm f_s,\pm2f_s,\dots$

**Sampling theorem from the picture.**

- Suppose $G(f)$ is band-limited to $B$. The central copy spans $[-B,B]$ and the next starts at $f_s-B$.
- If $f_s\ge2B$ they **do not overlap**. An ideal low-pass filter of bandwidth $B$ then passes only the central copy $\frac1{T_s}G(f)$, so the output is $\frac1{T_s}g(t)$: **$g$ is recovered exactly**.
- If $f_s<2B$ the copies overlap and $G$ cannot be isolated (aliasing).

**Statement:** a signal band-limited to $B$ Hz is uniquely determined by samples taken at least $2B$ times per second.

**2010-11 Q6(c)** (sampled at exactly $2B$, through an ideal LPF of bandwidth $B$): the filter keeps only the $n=0$ term, $\frac1{T_s}F(\omega)=2B\,F(\omega)$. So the output is $2B\,f(t)$, **proportional to $f(t)$**.`,
  },

  // ───────────────────────── DTFT / DFT ─────────────────────────
  {
    id: "311-1617-3a",
    topic: "dtft-dft",
    course: "CSE 311",
    session: "2016-17",
    label: "Q3(a)",
    marks: 20,
    prompt: r`Let $G(f)$ be the Fourier transform of a real signal $g(t)$. In the DFT we compute $G(f)$ at a finite set of frequencies from samples of $g(t)$. Let $g(t)$ be sampled over $0\le t\le T_0$ at uniform intervals $T_s$, giving $N_0$ samples. The DFT is

$$
G_q=\sum_{k=0}^{N_0-1}g_k\,e^{-jq\Omega_0k},\quad g_k=T_s\,g(kT_s),\ G_q=G(qf_0),\ \Omega_0=2\pi f_0T_s .
$$

(i) Derive this formula from the expression for $G(f)$. *(4)*

(ii) Prove $f_0=\dfrac1{T_0}$. *(5)*

(iii) Compute the DFT for the following sample values of $g(t)$. Write down the sample frequencies $f$ and the computed values of $G(f)$. *(5)*

| $t$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $g(t)$ | 1 | 2 | 3 | 4 |

(iv) What considerations should guide the choice of $T_s$ and $T_0$? *(6)*`,
    solution: r`**(i) Derivation.** For $g(t)$ that is zero outside $[0,T_0]$:

$$
G(f)=\int_0^{T_0}g(t)e^{-j2\pi ft}dt\approx\sum_{k=0}^{N_0-1}g(kT_s)e^{-j2\pi fkT_s}\,T_s ,
$$

replacing the integral by a Riemann sum with step $T_s$ ($N_0T_s=T_0$). Evaluate it only at the discrete frequencies $f=qf_0$:

$$
G(qf_0)\approx\sum_{k=0}^{N_0-1}\underbrace{T_sg(kT_s)}_{g_k}\,e^{-jq\,(2\pi f_0T_s)\,k}=\sum_{k=0}^{N_0-1}g_ke^{-jq\Omega_0k}=G_q .
$$

**(ii) Why $f_0=1/T_0$.**

- *Sampling in frequency.* Taking only the values $G(qf_0)$ multiplies the spectrum by an impulse train with spacing $f_0$. By duality this makes the time signal **periodic** with period $1/f_0$.
- *No overlap in time.* The time signal has duration $T_0$, so for its periodic copies not to overlap (no time-aliasing) we need $1/f_0\ge T_0$. The DFT uses exactly one period, $1/f_0=T_0$.
- *Self-consistency.* $G_q$ must also be periodic in $q$ with period $N_0$ (sampling in time), so $\Omega_0N_0=2\pi$. That gives $2\pi f_0T_sN_0=2\pi$, so $f_0=\dfrac1{N_0T_s}=\dfrac1{T_0}$.

So the **frequency resolution is the reciprocal of the record length.**

**(iii) The numbers.** The samples are 1 s apart, so $T_s=1$ s and $N_0=4$, giving $T_0=N_0T_s=4$ s. Then

$$
f_0=\frac1{T_0}=0.25\ \text{Hz},\qquad\Omega_0=2\pi f_0T_s=\frac\pi2,\qquad e^{-j\Omega_0}=-j,\qquad g_k=T_sg(kT_s)=\{1,2,3,4\}.
$$

$$
G_q=\sum_{k=0}^{3}g_k(-j)^{qk}:
\qquad\begin{aligned}
G_0&=1+2+3+4=10\\
G_1&=1-2j-3+4j=-2+2j\\
G_2&=1-2+3-4=-2\\
G_3&=1+2j-3-4j=-2-2j
\end{aligned}
$$

| $q$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $f=qf_0$ | 0 Hz | 0.25 Hz | 0.5 Hz | 0.75 Hz (≡ −0.25 Hz) |
| $G(f)\approx G_q$ | 10 | $-2+2j$ | $-2$ | $-2-2j$ |
| $\lvert G_q\rvert$ | 10 | $2\sqrt2$ | 2 | $2\sqrt2$ |

Because $g$ is real, $G_3=G_1^*$: bin 3 is the negative-frequency partner of bin 1. The highest frequency represented is $\frac1{2T_s}=0.5$ Hz.

**(iv) Choosing $T_s$ and $T_0$.**

- **$T_s\le\frac1{2B}$** (sampling above the Nyquist rate) to avoid aliasing. For non-band-limited signals choose $T_s$ small enough that $G(f)$ is negligible beyond $\frac1{2T_s}$, and use an anti-aliasing filter.
- **$T_0$ long enough** to (a) cover the whole signal, so truncation does not cause leakage, and (b) give the required **frequency resolution** $f_0=1/T_0$. For long signals, windowing reduces leakage from truncation.
- **$N_0=T_0/T_s$** should be a power of 2 for the radix-2 FFT. If needed, **zero-pad**: this increases $T_0$ and gives finer spectral samples without changing the underlying spectrum.`,
  },

  // ───────────────────────── FFT ─────────────────────────
  {
    id: "219-2223-4c",
    topic: "fft",
    course: "CSE 219",
    session: "2022-23",
    label: "Q4(c)",
    marks: 15,
    prompt: r`Compare the computational complexities of the discrete Fourier transform and the radix-2 fast Fourier transform.`,
    solution: r`**Direct DFT.**

$$
X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn},\quad W_N=e^{-j2\pi/N}.
$$

Each of the $N$ outputs needs $N$ complex multiplications and $N-1$ complex additions, so

$$
\text{DFT: } N^2\ \text{complex mults},\quad N(N-1)\ \text{complex adds}\ \Rightarrow\ O(N^2).
$$

**Radix-2 FFT** ($N=2^m$). Split $x[n]$ into even- and odd-indexed halves:

$$
X[k]=G[k]+W_N^kH[k],\qquad X[k+\tfrac N2]=G[k]-W_N^kH[k],\quad 0\le k<\tfrac N2 ,
$$

where $G$ and $H$ are $\frac N2$-point DFTs. Each level of splitting costs $\frac N2$ multiplications (one twiddle $W_N^k$ per butterfly, shared by the $\pm$ pair) and $N$ additions. So

$$
M(N)=2M\!\left(\tfrac N2\right)+\tfrac N2\ \Rightarrow\ M(N)=\tfrac N2\log_2N,\qquad A(N)=N\log_2N .
$$

That is $\log_2N$ stages of $N/2$ butterflies each: $O(N\log N)$.

| $N$ | DFT mults $N^2$ | FFT mults $\frac N2\log_2N$ | speed-up |
|---|---|---|---|
| 8 | 64 | 12 | 5× |
| 1024 | 1 048 576 | 5 120 | ≈205× |
| 65 536 ($2^{16}$) | ≈4.3×10⁹ | 524 288 | ≈8200× |

**Where the saving comes from:** symmetry, $W_N^{k+N/2}=-W_N^k$, and periodicity, $W_N^{k+N}=W_N^k$, of the twiddle factors, so the same products are reused instead of recomputed. Memory is $O(N)$ with in-place computation; the cost is a bit-reversed ordering of the input (DIT) or output (DIF). The FFT computes **exactly** the same values as the DFT; it is not an approximation.`,
  },
  {
    id: "311-1718-3b",
    topic: "fft",
    course: "CSE 311",
    session: "2017-18",
    label: "Q3(b)",
    marks: 24,
    prompt: r`Given samples $\{g_0,\dots,g_{N-1}\}$, the DFT is $G_k=\sum_{n=0}^{N-1}g_ne^{-j\frac{2\pi}{N}kn}$. Formulate a **decimation-in-frequency** FFT, draw the complete signal-flow graph for an 8-point DFT, and explain using it what *bit-reversed order* means when in-place computation is used.`,
    solution: r`**Formulation (DIF).** Split the **time** sequence into first and second halves, then separate **even and odd outputs**:

$$
G_k=\sum_{n=0}^{N/2-1}\Big[g_n+(-1)^k\,g_{n+N/2}\Big]W_N^{kn},\qquad (W_N^{kN/2}=(-1)^k).
$$

- **Even outputs** $k=2r$: $W_N^{2rn}=W_{N/2}^{rn}$, so
$$G_{2r}=\sum_{n=0}^{N/2-1}a_n\,W_{N/2}^{rn},\qquad a_n=g_n+g_{n+N/2}.$$
- **Odd outputs** $k=2r+1$:
$$G_{2r+1}=\sum_{n=0}^{N/2-1}b_n\,W_{N/2}^{rn},\qquad b_n=\big(g_n-g_{n+N/2}\big)W_N^{\,n}.$$

So one $N$-point DFT becomes two $\frac N2$-point DFTs, after $\frac N2$ **DIF butterflies**:

$$
a_n=g_n+g_{n+N/2},\qquad b_n=(g_n-g_{n+N/2})\,W_N^{n}.
$$

Here the twiddle multiplies **after** the subtraction; in DIT it comes before. Repeat on each half until 2-point DFTs remain: $\log_2N$ stages.

**8-point flow graph (3 stages, 4 butterflies each).**

| Stage | butterfly pairs (indices into the working array) | twiddles on the "−" branch |
|---|---|---|
| 1 | (0,4) (1,5) (2,6) (3,7) | $W_8^0,W_8^1,W_8^2,W_8^3$ |
| 2 | (0,2) (1,3) and (4,6) (5,7) | $W_8^0,W_8^2$ in each half (i.e. $W_4^0,W_4^1$) |
| 3 | (0,1) (2,3) (4,5) (6,7) | $W_8^0=1$ |

Inputs $g_0\dots g_7$ enter in natural order on the left. Each butterfly takes two nodes $p,q$ and produces $p+q$ (top) and $(p-q)W$ (bottom).

**Output order and bit reversal.** The outputs leave in the order

$$
G_0,\ G_4,\ G_2,\ G_6,\ G_1,\ G_5,\ G_3,\ G_7 .
$$

With **in-place computation**, each butterfly overwrites the two memory cells it read, so no extra array is needed and results stay at the positions where the flow graph produces them. Write the memory position in binary and reverse its bits to get the index of the $G_k$ stored there:

| position | binary | reversed | stored |
|---|---|---|---|
| 0 | 000 | 000 | $G_0$ |
| 1 | 001 | 100 | $G_4$ |
| 2 | 010 | 010 | $G_2$ |
| 3 | 011 | 110 | $G_6$ |
| 4 | 100 | 001 | $G_1$ |
| 5 | 101 | 101 | $G_5$ |
| 6 | 110 | 011 | $G_3$ |
| 7 | 111 | 111 | $G_7$ |

**Why:** the first stage separates even from odd $k$ (the last bit of $k$ decides the top or bottom half), the next stage separates by the second-to-last bit, and so on. The least significant bit of $k$ ends up deciding the *most* significant bit of the position. A final bit-reversal permutation restores natural order. DIT is the mirror image: bit-reversed input, natural-order output.`,
  },
  {
    id: "311-1415L4-7c",
    topic: "fft",
    course: "CSE 311",
    session: "2014-15",
    label: "Q7(c)",
    marks: 15,
    prompt: r`Deduce the recurrence relationship for the fast Fourier transform.`,
    solution: r`Start from $X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn}$, with $W_N=e^{-j2\pi/N}$ and $N=2^m$.

**Step 1 — split by index parity (decimation in time).**

$$
X[k]=\sum_{r=0}^{N/2-1}x[2r]W_N^{2rk}+\sum_{r=0}^{N/2-1}x[2r+1]W_N^{(2r+1)k}.
$$

**Step 2 — halve the twiddle.** $W_N^{2rk}=e^{-j2\pi(2rk)/N}=W_{N/2}^{rk}$, so

$$
X[k]=\underbrace{\sum_rx[2r]W_{N/2}^{rk}}_{G[k]}+W_N^k\underbrace{\sum_rx[2r+1]W_{N/2}^{rk}}_{H[k]} .
$$

$G$ and $H$ are $\frac N2$-point DFTs of the even and odd samples.

**Step 3 — use periodicity and symmetry.**

- $G[k+\frac N2]=G[k]$ and $H[k+\frac N2]=H[k]$, since they are $\frac N2$-periodic.
- $W_N^{k+N/2}=W_N^ke^{-j\pi}=-W_N^k$.

This gives the **butterfly recurrence**:

$$
\boxed{\;X[k]=G[k]+W_N^kH[k],\qquad X[k+\tfrac N2]=G[k]-W_N^kH[k],\qquad 0\le k<\tfrac N2\;}
$$

Apply it recursively to $G$ and $H$ until 2-point DFTs remain ($X[0]=x_0+x_1$, $X[1]=x_0-x_1$).

**Cost recurrence.** $C(N)=2C(N/2)+\frac N2$ multiplications with $C(1)=0$, which gives $C(N)=\frac N2\log_2N$, compared with $N^2$ for the direct DFT.`,
  },

  // ───────────────────────── Laplace ─────────────────────────
  {
    id: "219-2223-1b",
    topic: "laplace",
    course: "CSE 219",
    session: "2022-23",
    label: "Q1(b)",
    marks: 10,
    prompt: r`Determine whether the $s$-domain point $(-a,0)$, i.e. $s=-a$, is included in the region of convergence of the Laplace transform of

$$
x(t)=\begin{cases}e^{-at}, & 0<t<T\\ 0, & \text{otherwise.}\end{cases}
$$`,
    solution: r`**Transform.**

$$
X(s)=\int_0^Te^{-at}e^{-st}dt=\frac{1-e^{-(s+a)T}}{s+a}.
$$

**ROC.** $x(t)$ has **finite duration** and is absolutely integrable. For any $s=\sigma+j\omega$, the integrand $|e^{-(s+a)t}|=e^{-(\sigma+a)t}$ is bounded on the finite interval $[0,T]$, so the integral converges. The ROC is the **entire $s$-plane**.

**The point $s=-a$.** The expression *looks* like it has a pole there, but the numerator also vanishes at $s=-a$ ($1-e^0=0$). The singularity is removable:

$$
X(-a)=\lim_{s\to-a}\frac{1-e^{-(s+a)T}}{s+a}=\lim_{s\to-a}\frac{T\,e^{-(s+a)T}}{1}=T ,
$$

by L'Hôpital, or directly: $\int_0^Te^{-at}e^{at}dt=\int_0^T1\,dt=T$.

So **yes, $(-a,0)$ is in the ROC**, with $X(-a)=T$, a finite value. In general, finite-duration absolutely integrable signals have no poles: the zeros of $1-e^{-(s+a)T}$ at $s=-a+j\frac{2\pi k}T$ include $k=0$, which cancels the apparent pole.`,
  },
  {
    id: "219-2223-2a",
    topic: "laplace",
    course: "CSE 219",
    session: "2022-23",
    label: "Q2(a)",
    marks: 10,
    prompt: r`State and prove the time-domain and $s$-domain differentiation properties of the Laplace transform.`,
    solution: r`Let $x(t)\leftrightarrow X(s)$ with ROC $R$.

**Time differentiation.**

$$
\frac{dx(t)}{dt}\ \xleftrightarrow{\ \mathcal L\ }\ sX(s),\qquad\text{ROC contains } R .
$$

*Proof.* From the inverse transform $x(t)=\frac1{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty}X(s)e^{st}ds$, differentiate under the integral; only $e^{st}$ depends on $t$:

$$
\frac{dx}{dt}=\frac1{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty}sX(s)\,e^{st}ds=\mathcal L^{-1}\{sX(s)\}.
$$

The ROC can be *larger* than $R$ if the factor $s$ cancels a pole at $s=0$. *Example:* $u(t)\leftrightarrow1/s$ with $\operatorname{Re}\{s\}>0$, but $\frac{d}{dt}u=\delta\leftrightarrow1$ for all $s$.

*(Unilateral form, used for initial-value problems: $\mathcal L\{\dot x\}=sX(s)-x(0^-)$, obtained by integrating by parts.)*

**$s$-domain differentiation.**

$$
-t\,x(t)\ \xleftrightarrow{\ \mathcal L\ }\ \frac{dX(s)}{ds},\qquad\text{ROC}=R .
$$

*Proof.* Differentiate the definition with respect to $s$, which is allowed inside $R$:

$$
\frac{dX}{ds}=\frac{d}{ds}\int_{-\infty}^{\infty}x(t)e^{-st}dt=\int_{-\infty}^{\infty}\big(-t\,x(t)\big)e^{-st}dt=\mathcal L\{-t\,x(t)\}.
$$

*Example:* $e^{-at}u(t)\leftrightarrow\frac1{s+a}$, so $t\,e^{-at}u(t)\leftrightarrow-\frac{d}{ds}\frac{1}{s+a}=\frac1{(s+a)^2}$, with $\operatorname{Re}\{s\}>-a$.`,
  },
  {
    id: "219-2223-2b",
    topic: "laplace",
    course: "CSE 219",
    session: "2022-23",
    label: "Q2(b)",
    marks: 10,
    prompt: r`Determine the time-domain signal for

$$
X(s)=\frac{s+2}{s^2+7s+12},\qquad -4<\operatorname{Re}\{s\}<-3 .
$$`,
    solution: r`**Partial fractions.** $s^2+7s+12=(s+3)(s+4)$:

$$
X(s)=\frac{A}{s+3}+\frac{B}{s+4},\quad A=\left.\frac{s+2}{s+4}\right|_{s=-3}=\frac{-1}{1}=-1,\quad B=\left.\frac{s+2}{s+3}\right|_{s=-4}=\frac{-2}{-1}=2 .
$$

So $X(s)=\dfrac{-1}{s+3}+\dfrac{2}{s+4}$.

**Use the ROC to pick each term's direction.** The ROC is the strip $-4<\sigma<-3$.

- The pole at $s=-4$ lies to the **left** of the ROC, so its term is **right-sided**:
$$\frac{2}{s+4},\ \operatorname{Re}\{s\}>-4\ \leftrightarrow\ 2e^{-4t}u(t).$$
- The pole at $s=-3$ lies to the **right** of the ROC, so its term is **left-sided**. Using $-e^{-at}u(-t)\leftrightarrow\frac1{s+a}$ with $\operatorname{Re}\{s\}<-a$:
$$\frac{-1}{s+3},\ \operatorname{Re}\{s\}<-3\ \leftrightarrow\ e^{-3t}u(-t).$$

$$
\boxed{x(t)=2e^{-4t}u(t)+e^{-3t}u(-t)}
$$

A strip ROC always means a **two-sided** signal. Neither term is integrable on its own, but each has a transform in the region of the strip. This $x(t)$ has no Fourier transform, since the $j\omega$ axis is not in the ROC.`,
  },
  {
    id: "219-2223-2c",
    topic: "laplace",
    course: "CSE 219",
    session: "2022-23",
    label: "Q2(c)",
    marks: 15,
    prompt: r`Determine the Laplace transform and its region of convergence for $x(t)=e^{-b|t-2|}$.`,
    solution: r`**Step 1 — the unshifted signal** $x_0(t)=e^{-b|t|}=e^{-bt}u(t)+e^{bt}u(-t)$.

- Right-sided part: $e^{-bt}u(t)\leftrightarrow\dfrac1{s+b}$, with $\operatorname{Re}\{s\}>-b$.
- Left-sided part: from $-e^{-at}u(-t)\leftrightarrow\frac1{s+a}$ ($\operatorname{Re}\{s\}<-a$) with $a=-b$: $e^{bt}u(-t)\leftrightarrow\dfrac{-1}{s-b}$, with $\operatorname{Re}\{s\}<b$.

Add them, valid on the overlap of the two ROCs:

$$
X_0(s)=\frac1{s+b}-\frac1{s-b}=\frac{-2b}{s^2-b^2}=\frac{2b}{b^2-s^2},\qquad -b<\operatorname{Re}\{s\}<b .
$$

**Step 2 — time shift by 2.** $x(t)=x_0(t-2)\ \leftrightarrow\ e^{-2s}X_0(s)$. A shift never changes the ROC:

$$
\boxed{X(s)=\frac{2b\,e^{-2s}}{b^2-s^2},\qquad -b<\operatorname{Re}\{s\}<b}
$$

**Existence.** The strip is non-empty only if $b>0$. For $b\le0$ the signal grows (or stays constant) in both directions, the two ROCs do not overlap, and **no Laplace transform exists**. For $b>0$ the strip contains the $j\omega$ axis, so the Fourier transform also exists: $X(j\omega)=\dfrac{2b\,e^{-j2\omega}}{b^2+\omega^2}$.`,
  },
  {
    id: "219-2223-4a",
    topic: "laplace",
    course: "CSE 219",
    session: "2022-23",
    label: "Q4(a)",
    marks: 10,
    prompt: r`For a general continuous-time signal $x(t)$, establish a relation between its Laplace and Fourier transforms.`,
    solution: r`**Definitions.**

$$
X(s)=\int_{-\infty}^{\infty}x(t)e^{-st}dt,\qquad X(j\omega)=\int_{-\infty}^{\infty}x(t)e^{-j\omega t}dt .
$$

**Relation 1 — on the $j\omega$ axis.** Put $s=j\omega$ ($\sigma=0$):

$$
X(s)\big|_{s=j\omega}=X(j\omega),
$$

valid **when the ROC contains the $j\omega$ axis**. The Fourier transform is the Laplace transform evaluated along the imaginary axis.

**Relation 2 — off the axis.** For $s=\sigma+j\omega$:

$$
X(\sigma+j\omega)=\int_{-\infty}^{\infty}\big[x(t)e^{-\sigma t}\big]e^{-j\omega t}dt=\mathcal F\big\{x(t)e^{-\sigma t}\big\}.
$$

The Laplace transform is the **Fourier transform of $x(t)$ weighted by a real exponential $e^{-\sigma t}$**. The ROC is the set of $\sigma$ for which this weighted signal is absolutely integrable.

**Consequences.**

- Signals with no Fourier transform can still have a Laplace transform. *Example:* $e^{2t}u(t)$ has $X(s)=\frac1{s-2}$ for $\operatorname{Re}\{s\}>2$, because the weight $e^{-\sigma t}$ with $\sigma>2$ tames the growth.
- If the ROC excludes the $j\omega$ axis, the Fourier transform does not exist, even though the formula $X(j\omega)$ can still be written down.
- For an LTI system, $H(j\omega)=H(s)|_{s=j\omega}$ is the frequency response; this exists iff the system is stable.
- Inverse: $x(t)=\frac1{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty}X(s)e^{st}ds$ follows by inverting $\mathcal F\{x e^{-\sigma t}\}$ and multiplying by $e^{\sigma t}$.`,
  },

  // ───────────────────────── z-transform ─────────────────────────
  {
    id: "219-2223-1a",
    topic: "z-transform",
    course: "CSE 219",
    session: "2022-23",
    label: "Q1(a)",
    marks: 10,
    prompt: r`Find the z-transform and the associated region of convergence of $x[n]=a^nu[n]$, where $u[n]$ is the discrete-time unit step.`,
    solution: r`$$
X(z)=\sum_{n=-\infty}^{\infty}a^nu[n]z^{-n}=\sum_{n=0}^{\infty}\left(az^{-1}\right)^n .
$$

This geometric series converges iff $|az^{-1}|<1$, i.e. $|z|>|a|$:

$$
\boxed{X(z)=\frac{1}{1-az^{-1}}=\frac{z}{z-a},\qquad |z|>|a|}
$$

- **Pole** at $z=a$, **zero** at $z=0$.
- The ROC is the **exterior of a circle** through the outermost pole, as for every right-sided sequence.
- If $|a|<1$ the ROC includes the unit circle, so the DTFT exists: $\frac1{1-ae^{-j\omega}}$.
- Contrast: $-a^nu[-n-1]$ has the *same* algebraic $X(z)$ but ROC $|z|<|a|$. The ROC is part of the answer.`,
  },
  {
    id: "219-2223-3a",
    topic: "z-transform",
    course: "CSE 219",
    session: "2022-23",
    label: "Q3(a)",
    marks: 10,
    prompt: r`A discrete-time signal is $x[n]=a^n$ for $0\le n\le N-1$ and $0$ otherwise. Show that the region of convergence of its z-transform does not include the origin.`,
    solution: r`$$
X(z)=\sum_{n=0}^{N-1}a^nz^{-n}=\frac{1-a^Nz^{-N}}{1-az^{-1}}=\frac{1}{z^{N-1}}\,\frac{z^N-a^N}{z-a}.
$$

**Convergence.** It is a *finite* sum, so it converges wherever each term is finite. Each term $a^nz^{-n}$ is finite for every $z\neq0$, but for $n\ge1$ the term $a^n/z^n\to\infty$ as $z\to0$. So the **ROC is the entire z-plane except $z=0$**.

**Poles and zeros confirm it.**

- The zeros of $z^N-a^N$ are $z_k=a\,e^{j2\pi k/N}$, $k=0,\dots,N-1$.
- The $k=0$ zero, at $z=a$, **cancels** the apparent pole at $z=a$. So there is no pole at $z=a$.
- What remains is the factor $z^{-(N-1)}$: a **pole of order $N-1$ at $z=0$**.

A pole cannot lie inside an ROC, so **the origin is excluded** (for $N\ge2$, $a\neq0$).

**General rule.** A finite-length sequence that is non-zero for some $n>0$ (right of the origin) has a pole at $z=0$, so its ROC excludes $z=0$. If it is non-zero for some $n<0$, it excludes $z=\infty$.`,
  },
  {
    id: "219-2223-3b",
    topic: "z-transform",
    course: "CSE 219",
    session: "2022-23",
    label: "Q3(b)",
    marks: 10,
    prompt: r`Derive the contour-integral formula for the inverse z-transform.`,
    solution: r`**1. z-transform as a DTFT.** Write $z=re^{j\omega}$, with $r$ chosen so the circle $|z|=r$ lies in the ROC:

$$
X(re^{j\omega})=\sum_nx[n]\big(re^{j\omega}\big)^{-n}=\sum_n\big(x[n]r^{-n}\big)e^{-j\omega n}=\mathcal F\{x[n]r^{-n}\}.
$$

**2. Invert the DTFT.**

$$
x[n]r^{-n}=\frac1{2\pi}\int_{2\pi}X(re^{j\omega})e^{j\omega n}d\omega\ \Rightarrow\ x[n]=\frac1{2\pi}\int_{2\pi}X(re^{j\omega})\big(re^{j\omega}\big)^nd\omega .
$$

**3. Change variables to $z$.** With $z=re^{j\omega}$ ($r$ fixed), $dz=jre^{j\omega}d\omega=jz\,d\omega$, so $d\omega=\frac{dz}{jz}$. As $\omega$ runs over $2\pi$, $z$ goes once round the circle $|z|=r$ counter-clockwise:

$$
\boxed{x[n]=\frac{1}{2\pi j}\oint_C X(z)\,z^{\,n-1}\,dz}
$$

Here $C$ is any counter-clockwise closed contour **inside the ROC** encircling the origin. In practice the integral is evaluated by the residue theorem: $x[n]=\sum$ residues of $X(z)z^{n-1}$ at the poles inside $C$. (This is the discrete counterpart of the Bromwich integral for the inverse Laplace transform.)`,
  },
  {
    id: "219-2223-3c",
    topic: "z-transform",
    course: "CSE 219",
    session: "2022-23",
    label: "Q3(c)",
    marks: 15,
    prompt: r`Determine the discrete-time signal from $X(z)=\log\!\left(1+az^{-1}\right)$, $|z|>|a|$.`,
    solution: r`**Method 1 — power series.** For $|v|<1$, $\log(1+v)=\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}v^n$. Here $v=az^{-1}$, and $|v|<1\iff|z|>|a|$, which is exactly the ROC:

$$
X(z)=\sum_{n=1}^{\infty}\frac{(-1)^{n+1}a^n}{n}\,z^{-n}.
$$

The coefficient of $z^{-n}$ is $x[n]$:

$$
\boxed{x[n]=\frac{(-1)^{n+1}\,a^n}{n}\,u[n-1]=-\frac{(-a)^n}{n}\,u[n-1]}
$$

**Method 2 — differentiation property** ($n\,x[n]\leftrightarrow-z\frac{dX}{dz}$):

$$
-z\frac{dX}{dz}=-z\cdot\frac{-az^{-2}}{1+az^{-1}}=\frac{az^{-1}}{1+az^{-1}}=a z^{-1}\cdot\frac{1}{1-(-a)z^{-1}} .
$$

Since $\frac1{1-(-a)z^{-1}}\leftrightarrow(-a)^nu[n]$ and $z^{-1}$ is a one-sample delay,

$$
n\,x[n]=a(-a)^{n-1}u[n-1]\ \Rightarrow\ x[n]=\frac{a(-a)^{n-1}}{n}u[n-1],
$$

which is the same as Method 1. Note $x[0]=0$, consistent with $X(\infty)=\log1=0$.`,
  },
]
