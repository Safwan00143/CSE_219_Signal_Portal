import type { Question } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

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
    solution: r`**Step 1: sampling is multiplication by an impulse train.** Let

$$
p(t)=\sum_n\delta(t-nT)
$$

Then

$$
x_p(t)=x(t)\,p(t)=\sum_{n}x(nT)\,\delta(t-nT)
$$

$x_p$ holds exactly the information in the samples, nothing more.

**Step 2: the spectrum of the impulse train.** $p(t)$ repeats every $T$, and all its Fourier-series coefficients are $\frac1T$. So its spectrum is also an impulse train:

$$
P(j\omega)=\frac{2\pi}{T}\sum_k\delta(\omega-k\omega_s)
$$

**Step 3: multiplication in time is convolution in frequency.**

$$
X_p(j\omega)=\frac1{2\pi}\,X(j\omega)*P(j\omega)
$$

Convolving with an impulse just places a copy, so:

$$
X_p(j\omega)=\frac1T\sum_{k=-\infty}^{\infty}X\big(j(\omega-k\omega_s)\big)
$$

The sampled spectrum is **$X$ copied every $\omega_s$**, scaled by $\frac1T$.
` + fig("smp-copies") + r`
**Step 4: when do the copies not overlap?**

- The middle copy ($k=0$) covers $[-\omega_M,\ \omega_M]$.
- The next copy ($k=1$) starts at $\omega_s-\omega_M$.
- They stay apart when

$$
\omega_s-\omega_M>\omega_M
$$

that is,

$$
\omega_s>2\omega_M
$$

**Step 5: get $x(t)$ back.** Use an ideal low-pass filter with:

- gain $T$;
- cutoff $\omega_c$ anywhere between $\omega_M$ and $\omega_s-\omega_M$.

It keeps only the middle copy: $T\cdot\frac1T\,X(j\omega)=X(j\omega)$. So the output is exactly $x(t)$.
` + fig("smp-ideal-lpf") + r`
In the time domain, this filtering is the **interpolation formula**:

$$
x(t)=\sum_{n=-\infty}^{\infty}x(nT)\,\frac{\omega_cT}{\pi}\cdot\frac{\sin\omega_c(t-nT)}{\omega_c(t-nT)}
$$

**Step 6: why the samples determine $x(t)$ uniquely.**

1. Two band-limited signals with the same samples have the same $x_p$, so the same $X_p$.
2. The copies don't overlap, so filtering gives back the same $X$ from both.
3. So the two signals are the same.

If $\omega_s<2\omega_M$, the copies overlap (**aliasing**), and different signals can share the same samples. The minimum rate $2\omega_M$ is the **Nyquist rate**.`,
  },
  {
    id: "219-2223-4b",
    topic: "sampling",
    course: "CSE 219",
    session: "2022-23",
    label: "Q4(b)",
    marks: 10,
    prompt: r`A sequence $x[n]$ has Fourier transform $X(e^{j\omega})=0$ for $\dfrac{2\pi}{9}\le|\omega|\le\pi$. Determine the lowest rate at which $x[n]$ may be sampled for perfect reconstruction.`,
    solution: r`**What "sampling a sequence" means.** Keep every $N$-th sample and set the rest to zero:

$$
x_p[n]=x[n]\sum_k\delta[n-kN]
$$

The question asks for the **largest** $N$, that is, the lowest sampling rate.

**Step 1: the sampled spectrum.** The sampling frequency is $\omega_s=\frac{2\pi}N$, and

$$
X_p(e^{j\omega})=\frac1N\sum_{k=0}^{N-1}X\!\left(e^{j(\omega-k\omega_s)}\right)
$$

So inside each $2\pi$ interval there are $N$ shifted copies of $X$.
` + fig("smp-dt-sampling") + r`
**Step 2: the no-overlap condition.** $x[n]$ is band-limited to $\omega_M=\frac{2\pi}9$. The copies don't overlap when

$$
\omega_s>2\omega_M
$$

Put in the numbers:

$$
\frac{2\pi}{N}>\frac{4\pi}{9}
$$

$$
N<\frac92=4.5
$$

**Step 3: pick the largest whole number.**

$$
N_{\max}=4
$$

**Answer.** Keep **every 4th sample**. The lowest usable rate is $\frac14$ of the original, that is, $\omega_s=\frac{2\pi}4=\frac\pi2$ rad/sample.

**Check:**

- $N=4$: $\omega_s=0.5\pi>2\omega_M\approx0.444\pi$. No aliasing. ✓
- $N=5$: $\omega_s=0.4\pi<0.444\pi$. Aliasing. ✗

**To reconstruct:** low-pass filter $x_p[n]$ with gain $N=4$ and a cutoff between $\frac{2\pi}9$ and $\frac\pi2-\frac{2\pi}9$.`,
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
    solution: r`**1. The cause of aliasing.**

Sampling repeats the spectrum every $f_s$:

$$
\bar G(f)=\frac1{T_s}\sum_nG(f-nf_s)
$$

If $G(f)$ reaches beyond $f_s/2$, neighbouring copies **overlap**. That overlap is aliasing.
` + fig("smp-alias") + r`
It happens for two reasons:

- practical signals are time-limited, so they are **never strictly band-limited**;
- the sampling rate is below twice the highest important frequency.

**2. The problems it causes.**

1. **Lost high frequencies.** The part of $G(f)$ above $f_s/2$ is cut off by the reconstruction filter.
2. **False low frequencies (folding).** A component at $\frac{f_s}{2}+\Delta f$ comes back at $\frac{f_s}{2}-\Delta f$.
` + fig("smp-alias-tone") + r`
   *Example:* sample a 7 kHz tone at 10 kHz and you hear a 3 kHz tone. Wagon wheels spinning backwards in films are the same effect.
3. **It cannot be undone.** Once the copies overlap, no filter can tell the true part from the folded part.

**3. How it is compensated.**

- **Anti-aliasing filter.** Low-pass filter the signal to $B<\frac{f_s}{2}$ **before** sampling. We lose what lies above $B$ on purpose, but nothing folds back.
- **Oversampling.** Sample faster than $2B$, typically 10–25% more. This leaves guard bands, so real filters with a gradual roll-off can be used.

*Example:* telephone speech is filtered to 3.4 kHz and sampled at 8 kHz, not 6.8 kHz.`,
  },
  {
    id: "311-2021-3a",
    topic: "sampling",
    course: "CSE 311",
    session: "2020-21",
    label: "Q3(a)",
    marks: 24,
    prompt: r`"A practical signal cannot be fully recovered from its sampled values no matter how much we increase the sampling frequency." Justify. Which phenomenon causes this, how does it distort the signal, and what do we do to minimise the distortion?`,
    solution: r`**1. Why the statement is true.**

1. A practical signal lasts a **finite time**.
2. A time-limited signal **cannot be band-limited**: its spectrum has tails that go on to infinite frequency. (A rectangular pulse, for example, has a sinc spectrum.)
3. The sampling theorem promises perfect recovery only when the signal is band-limited to $B$ and $f_s\ge2B$.
4. Here $B=\infty$, so **no finite $f_s$ can satisfy the condition**.
5. Raising $f_s$ moves the spectral copies further apart, so the overlap shrinks, but it never becomes exactly zero.
` + fig("smp-time-limited") + r`
**2. The phenomenon: aliasing.**

Sampling repeats the spectrum:

$$
\bar G(f)=\frac1{T_s}\sum_nG(f-nf_s)
$$

The tails of the copies at $\pm f_s$ spill into the band $|f|<\frac{f_s}{2}$.

**3. How it distorts the signal.**

- The reconstruction filter (cutoff $\frac{f_s}{2}$) lets through the wanted band **plus** the spilled tails of the neighbouring copies.
- Components above $\frac{f_s}{2}$ are lost from where they belong.
- They reappear mirrored about $\frac{f_s}{2}$, as **false lower frequencies**.
- So the fine (high-frequency) detail of the recovered waveform is wrong, and this error cannot be filtered out afterwards.

**4. How to minimise it.**

1. **Anti-aliasing filter.** Low-pass filter the signal before sampling, at its essential bandwidth $B$ (e.g. 3.4 kHz for speech). The cut-off tail is lost, but nothing folds back.
2. **Sample above the Nyquist rate**, $f_s>2B$, to leave guard bands for real filters.
3. **Choose $B$ sensibly**, e.g. the 99% energy bandwidth, so the discarded energy is negligible.

The result is a small, controlled error instead of uncontrolled aliasing.`,
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
    solution: r`**Step 1: write the impulse train as a Fourier series.** It repeats every $T_s$, and every coefficient is $\frac1{T_s}$ ($f_s=\frac1{T_s}$):

$$
\sum_n\delta(t-nT_s)=\frac1{T_s}\sum_ne^{j2\pi nf_st}
$$

**Step 2: multiply by $g(t)$.**

$$
g_\delta(t)=\frac1{T_s}\sum_ng(t)\,e^{j2\pi nf_st}
$$

**Step 3: take the Fourier transform.** Each $e^{j2\pi nf_st}$ shifts the spectrum by $nf_s$:

$$
G_\delta(f)=\frac1{T_s}\sum_{n=-\infty}^{\infty}G(f-nf_s)
$$

**Step 4: the diagram.** Copies of $G(f)$, each scaled by $\frac1{T_s}$, centred at $0,\ \pm f_s,\ \pm2f_s,\ \dots$
` + fig("smp-copies") + r`
**Step 5: the sampling theorem from the picture.**

1. Let $G(f)$ be band-limited to $B$. The middle copy covers $[-B,B]$.
2. The next copy starts at $f_s-B$.
3. If $f_s\ge2B$, the copies **do not overlap**.
4. Then an ideal low-pass filter of bandwidth $B$ keeps only the middle copy, $\frac1{T_s}G(f)$. The output is $\frac1{T_s}g(t)$: **$g$ is recovered exactly**.
5. If $f_s<2B$, the copies overlap (aliasing), and $G$ cannot be separated.
` + fig("smp-alias") + r`
**Statement:** a signal band-limited to $B$ Hz is completely fixed by samples taken at least $2B$ times per second.

**2010-11 Q6(c).** Sample at exactly $2B$ and pass through an ideal low-pass filter of bandwidth $B$:

- the filter keeps only the $n=0$ copy, $\frac1{T_s}F(\omega)$;
- with $T_s=\frac1{2B}$ that is $2B\,F(\omega)$;
- so the output is $2B\,f(t)$, **proportional to $f(t)$**.`,
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
    solution: r`**(i) Derivation.**

$g(t)$ is zero outside $[0,T_0]$, so

$$
G(f)=\int_0^{T_0}g(t)\,e^{-j2\pi ft}\,dt
$$

Replace the integral by a sum of rectangles of width $T_s$, using the samples at $t=kT_s$ ($N_0T_s=T_0$):

$$
G(f)\approx\sum_{k=0}^{N_0-1}g(kT_s)\,e^{-j2\pi fkT_s}\,T_s
$$

Now evaluate only at the frequencies $f=qf_0$, and name $g_k=T_s\,g(kT_s)$:

$$
G(qf_0)\approx\sum_{k=0}^{N_0-1}g_k\,e^{-jq(2\pi f_0T_s)k}
$$

With $\Omega_0=2\pi f_0T_s$ this is exactly the given formula:

$$
G_q=\sum_{k=0}^{N_0-1}g_k\,e^{-jq\Omega_0k}
$$

**(ii) Why $f_0=\frac1{T_0}$.**

1. We know $G$ only at $f=0,f_0,2f_0,\dots$. Sampling in frequency makes the time signal **repeat** with period $\frac1{f_0}$.
2. Our signal lasts $T_0$. For the repeated copies not to overlap, we need $\frac1{f_0}\ge T_0$. The DFT uses exactly one period: $\frac1{f_0}=T_0$.
3. The same comes out of the formula. $G_q$ must repeat after $N_0$ values of $q$, so

$$
\Omega_0N_0=2\pi\ \Rightarrow\ 2\pi f_0T_sN_0=2\pi\ \Rightarrow\ f_0=\frac1{N_0T_s}=\frac1{T_0}
$$

So the **frequency spacing is one over the record length.**

**(iii) The numbers.**

The samples are 1 s apart, so $T_s=1$ s, $N_0=4$ and $T_0=4$ s. Then:

- $f_0=\frac1{T_0}=0.25$ Hz
- $\Omega_0=2\pi f_0T_s=\frac\pi2$, so $e^{-j\Omega_0}=-j$
- $g_k=T_s\,g(kT_s)=\{1,2,3,4\}$

So $G_q=\sum_{k=0}^{3}g_k(-j)^{qk}$. Work out each value:

$$
G_0=1+2+3+4=10
$$

$$
G_1=1+2(-j)+3(-1)+4(j)=-2+2j
$$

$$
G_2=1-2+3-4=-2
$$

$$
G_3=1+2(j)+3(-1)+4(-j)=-2-2j
$$
` + fig("dft-example") + r`
| $q$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $f=qf_0$ | 0 Hz | 0.25 Hz | 0.5 Hz | 0.75 Hz (same as −0.25 Hz) |
| $G(f)\approx G_q$ | 10 | $-2+2j$ | $-2$ | $-2-2j$ |
| $\lvert G_q\rvert$ | 10 | $2\sqrt2$ | 2 | $2\sqrt2$ |

- $g$ is real, so $G_3=G_1^*$: bin 3 is the negative-frequency partner of bin 1.
- The highest frequency shown is $\frac1{2T_s}=0.5$ Hz.

**(iv) Choosing $T_s$ and $T_0$.**

- **$T_s$ small enough:** $T_s\le\frac1{2B}$, to avoid aliasing. If the signal is not band-limited, make $T_s$ small enough that $G(f)$ is negligible beyond $\frac1{2T_s}$, and use an anti-aliasing filter.
- **$T_0$ long enough:**
  - to cover the whole signal, so cutting it off does not cause leakage;
  - to give the needed frequency spacing, $f_0=\frac1{T_0}$.
- **$N_0=\frac{T_0}{T_s}$ a power of 2**, for the radix-2 FFT. If needed, **zero-pad**: this lengthens $T_0$ and gives finer spectral samples without changing the spectrum itself.
` + fig("dft-samples-dtft"),
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
    solution: r`**1. Cost of the direct DFT.**

$$
X[k]=\sum_{n=0}^{N-1}x[n]\,W_N^{kn},\qquad W_N=e^{-j2\pi/N}
$$

- Each output $X[k]$ needs $N$ multiplications and $N-1$ additions.
- There are $N$ outputs.

$$
\text{DFT: } N^2\ \text{complex multiplications}
$$

$$
\text{and } N(N-1)\ \text{complex additions, so } O(N^2)
$$

**2. Cost of the radix-2 FFT** ($N=2^m$).

Split $x[n]$ into its even and odd samples. If $G$ and $H$ are their $\frac N2$-point DFTs, then for $0\le k<\frac N2$:

$$
X[k]=G[k]+W_N^k\,H[k]
$$

$$
X\!\left[k+\tfrac N2\right]=G[k]-W_N^k\,H[k]
$$

- One multiplication $W_N^kH[k]$ serves **both** outputs (this pair is one "butterfly").
- So one level of splitting costs $\frac N2$ multiplications and $N$ additions.
- Keep splitting: $\log_2N$ levels in all.

$$
\text{FFT: }\ \tfrac N2\log_2N\ \text{multiplications}
$$

$$
\text{and } N\log_2N\ \text{additions, so } O(N\log N)
$$
` + fig("fft-cost") + r`
**3. Comparison.**

| $N$ | DFT ($N^2$) | FFT ($\frac N2\log_2N$) | speed-up |
|---|---|---|---|
| 8 | 64 | 12 | 5× |
| 1024 | 1 048 576 | 5 120 | about 205× |
| 65 536 | about $4.3\times10^9$ | 524 288 | about 8200× |

**4. Where the saving comes from.**

- **Symmetry:** $W_N^{k+N/2}=-W_N^k$. So one product gives two outputs.
- **Periodicity:** $W_N^{k+N}=W_N^k$. So the same products are reused, not recomputed.

**5. Other points.**

- Memory is $O(N)$, because the butterflies can work in place.
- The price is reordering: bit-reversed input (DIT) or bit-reversed output (DIF).
- The FFT gives **exactly** the same numbers as the DFT. It is not an approximation, just a faster way to compute it.`,
  },
  {
    id: "311-1718-3b",
    topic: "fft",
    course: "CSE 311",
    session: "2017-18",
    label: "Q3(b)",
    marks: 24,
    prompt: r`Given samples $\{g_0,\dots,g_{N-1}\}$, the DFT is $G_k=\sum_{n=0}^{N-1}g_ne^{-j\frac{2\pi}{N}kn}$. Formulate a **decimation-in-frequency** FFT, draw the complete signal-flow graph for an 8-point DFT, and explain using it what *bit-reversed order* means when in-place computation is used.`,
    solution: r`**Step 1: split the time samples into a first half and a second half.**

With $W_N=e^{-j2\pi/N}$, and using $W_N^{kN/2}=(-1)^k$:

$$
G_k=\sum_{n=0}^{N/2-1}\Big[g_n+(-1)^k\,g_{n+N/2}\Big]W_N^{kn}
$$

**Step 2: separate even and odd outputs.**

- **Even outputs**, $k=2r$. Then $(-1)^k=1$ and $W_N^{2rn}=W_{N/2}^{rn}$:

$$
G_{2r}=\sum_{n=0}^{N/2-1}a_n\,W_{N/2}^{rn},\qquad a_n=g_n+g_{n+N/2}
$$

- **Odd outputs**, $k=2r+1$. Then $(-1)^k=-1$:

$$
G_{2r+1}=\sum_{n=0}^{N/2-1}b_n\,W_{N/2}^{rn},\qquad b_n=\big(g_n-g_{n+N/2}\big)W_N^{\,n}
$$

**Step 3: the DIF butterfly.** So one $N$-point DFT becomes **two $\frac N2$-point DFTs**. Each pair of inputs goes through one butterfly:

$$
a_n=g_n+g_{n+N/2}
$$

$$
b_n=\big(g_n-g_{n+N/2}\big)W_N^{n}
$$

The twiddle multiplies **after** the subtraction (in DIT it comes before). Repeat on each half until only 2-point DFTs are left. That takes $\log_2N$ stages.

**Step 4: the 8-point flow graph.** There are 3 stages, each with 4 butterflies.
` + fig("fft-dif-8") + r`
| stage | pairs that meet | twiddles on the "−" branch |
|---|---|---|
| 1 | (0,4) (1,5) (2,6) (3,7) | $W_8^0,\ W_8^1,\ W_8^2,\ W_8^3$ |
| 2 | (0,2) (1,3), and (4,6) (5,7) | $W_8^0,\ W_8^2$ in each half |
| 3 | (0,1) (2,3) (4,5) (6,7) | $W_8^0=1$ |

The inputs $g_0,\dots,g_7$ go in on the left in natural order. Each butterfly takes two values $p,q$ and gives $p+q$ on top and $(p-q)W$ below.

**Step 5: the output order.** The outputs come out as

$$
G_0,\ G_4,\ G_2,\ G_6,\ G_1,\ G_5,\ G_3,\ G_7
$$

**Step 6: what "in-place" and "bit-reversed" mean.**

- **In-place:** each butterfly writes its two results back into the same two memory cells it read from. No extra array is needed.
- So each result stays where the flow graph produces it.
- Write the memory position in binary and reverse the bits. That gives the index $k$ of the $G_k$ stored there:

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

**Why the bits get reversed.**

1. Stage 1 sends even $k$ to the top half and odd $k$ to the bottom half. So the **last** bit of $k$ decides the **first** bit of the position.
2. Stage 2 does the same with the second-to-last bit, and so on.
3. So the bits of $k$ appear in the position in reverse order.

A final reordering puts the outputs back in natural order. DIT is the mirror image: bit-reversed input, natural-order output.`,
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
    solution: r`**Step 1: write both definitions side by side.**

$$
X(s)=\int_{-\infty}^{\infty}x(t)\,e^{-st}\,dt
$$

$$
X(j\omega)=\int_{-\infty}^{\infty}x(t)\,e^{-j\omega t}\,dt
$$

The only difference is $s$ versus $j\omega$.

**Step 2, relation 1: on the $j\omega$-axis.** Put $s=j\omega$ (that is, $\sigma=0$):

$$
X(s)\Big|_{s=j\omega}=X(j\omega)
$$

This is valid **when the ROC contains the $j\omega$-axis**. The Fourier transform is the Laplace transform read along the imaginary axis.
` + fig("lap-splane") + r`
**Step 3, relation 2: off the axis.** Write $s=\sigma+j\omega$ and split the exponential, $e^{-st}=e^{-\sigma t}e^{-j\omega t}$:

$$
X(\sigma+j\omega)=\int_{-\infty}^{\infty}\big[x(t)\,e^{-\sigma t}\big]\,e^{-j\omega t}\,dt
$$

The bracket is just a new signal, so this is a Fourier transform:

$$
X(\sigma+j\omega)=\mathcal F\big\{x(t)\,e^{-\sigma t}\big\}
$$

**In words:** the Laplace transform is the **Fourier transform of $x(t)$ after multiplying it by $e^{-\sigma t}$**. The ROC is the set of $\sigma$ for which $x(t)e^{-\sigma t}$ is absolutely integrable.

**Step 4: what follows.**

1. **Some signals have a Laplace transform but no Fourier transform.** *Example:* $e^{2t}u(t)$ grows, so it has no Fourier transform. But with $\sigma>2$, the factor $e^{-\sigma t}$ tames the growth:

$$
X(s)=\frac{1}{s-2},\qquad\operatorname{Re}\{s\}>2
$$

2. **If the ROC misses the $j\omega$-axis, there is no Fourier transform**, even though you can still write the formula $X(j\omega)$.
3. **For an LTI system**, $H(j\omega)=H(s)\big|_{s=j\omega}$ is the frequency response. It exists exactly when the system is stable.
4. **The inverse.** Invert $\mathcal F\{x\,e^{-\sigma t}\}$, then multiply by $e^{\sigma t}$:

$$
x(t)=\frac1{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty}X(s)\,e^{st}\,ds
$$`,
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
    solution: r`**Step 1: write the z-transform.** The sequence has only $N$ non-zero samples, so the sum is finite:

$$
X(z)=\sum_{n=0}^{N-1}a^n\,z^{-n}
$$

As a geometric series:

$$
X(z)=\frac{1-a^Nz^{-N}}{1-az^{-1}}=\frac{1}{z^{N-1}}\cdot\frac{z^N-a^N}{z-a}
$$

**Step 2: where does it converge?**

- It is a **finite** sum, so it converges wherever every term is finite.
- Each term $a^nz^{-n}=\dfrac{a^n}{z^n}$ is finite for every $z\ne0$.
- But for $n\ge1$, $\dfrac{a^n}{z^n}\to\infty$ as $z\to0$.

So the **ROC is the whole z-plane except $z=0$**.

**Step 3: confirm with poles and zeros.**

1. The zeros of $z^N-a^N$ are $z_k=a\,e^{j2\pi k/N}$, for $k=0,\dots,N-1$: $N$ points equally spaced on the circle $|z|=|a|$.
2. The $k=0$ zero sits at $z=a$ and **cancels** the apparent pole there. So there is no pole at $z=a$.
3. What remains is the factor $\frac1{z^{N-1}}$: a **pole of order $N-1$ at $z=0$**.
` + fig("z-finite") + r`
A pole can never be inside an ROC, so **the origin is excluded** (for $N\ge2$ and $a\ne0$).

**General rule.**

- A finite sequence with any non-zero sample at $n>0$ has a pole at $z=0$, so its ROC excludes $z=0$.
- A finite sequence with any non-zero sample at $n<0$ has a pole at infinity, so its ROC excludes $z=\infty$.`,
  },
  {
    id: "219-2223-3b",
    topic: "z-transform",
    course: "CSE 219",
    session: "2022-23",
    label: "Q3(b)",
    marks: 10,
    prompt: r`Derive the contour-integral formula for the inverse z-transform.`,
    solution: r`**Step 1: see the z-transform as a DTFT.** Write $z=re^{j\omega}$, with the circle $|z|=r$ inside the ROC:

$$
X(re^{j\omega})=\sum_nx[n]\,\big(re^{j\omega}\big)^{-n}=\sum_n\big(x[n]\,r^{-n}\big)\,e^{-j\omega n}
$$

That is the DTFT of the signal $x[n]\,r^{-n}$:

$$
X(re^{j\omega})=\mathcal F\big\{x[n]\,r^{-n}\big\}
$$

**Step 2: invert the DTFT.**

$$
x[n]\,r^{-n}=\frac1{2\pi}\int_{2\pi}X(re^{j\omega})\,e^{j\omega n}\,d\omega
$$

Multiply both sides by $r^n$:

$$
x[n]=\frac1{2\pi}\int_{2\pi}X(re^{j\omega})\,\big(re^{j\omega}\big)^n\,d\omega
$$

**Step 3: change the variable to $z$.** Keep $r$ fixed and let $z=re^{j\omega}$:

$$
dz=jre^{j\omega}\,d\omega=jz\,d\omega
$$

So

$$
d\omega=\frac{dz}{jz}
$$

As $\omega$ goes once around $2\pi$, $z$ goes once around the circle $|z|=r$, anticlockwise.
` + fig("q-contour") + r`
**Step 4: substitute.** $\big(re^{j\omega}\big)^n=z^n$, and $\frac{z^n}{jz}=\frac{z^{n-1}}{j}$:

$$
\boxed{x[n]=\frac{1}{2\pi j}\oint_C X(z)\,z^{\,n-1}\,dz}
$$

- $C$ is any anticlockwise closed path **inside the ROC** that goes around the origin.
- In practice the integral is worked out with residues: $x[n]=$ the sum of the residues of $X(z)\,z^{n-1}$ at the poles inside $C$.
- This is the discrete-time partner of the Bromwich integral for the inverse Laplace transform.`,
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
