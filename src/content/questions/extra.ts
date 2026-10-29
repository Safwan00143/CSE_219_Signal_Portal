import type { Question } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

/** Questions that depend on the paper's own figures (redrawn in src/figures/questions.tsx). */
export const extraQuestions: Question[] = [
  {
    id: "311-1112-5abc",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2011-12",
    label: "Q5(a),(b),(c)",
    marks: 35,
    prompt: r`The Fourier integral of a non-periodic $f(t)$ is $F(\omega)=\int_{-\infty}^{\infty}f(t)e^{-j\omega t}dt$.

(a) Find the Fourier integral of $f(t)$ shown in Figure 5(a). *(8)*

(b) Find the Fourier integral of $g(t)$ (Figure 5(b)) from that of $f(t)$, and then the Fourier integral of $h(t)$ (Figure 5(c)) from that of $g(t)$, using suitable properties. *(8+6)*

(c) How is the bandwidth of a real signal calculated? Which of $f(t)$, $g(t)$ and $h(t)$ has the lowest bandwidth? Explain. *(5+8)*`,
    solution: r`**(a) The rectangle $f(t)$.**

$f(t)=V$ for $|t|<\frac\tau2$, and $0$ elsewhere. Put it into the integral:

$$
F(\omega)=\int_{-\tau/2}^{\tau/2}V\,e^{-j\omega t}\,dt
$$

Integrate:

$$
F(\omega)=V\,\frac{e^{j\omega\tau/2}-e^{-j\omega\tau/2}}{j\omega}=\frac{2V\sin(\omega\tau/2)}{\omega}
$$

In sinc form:

$$
F(\omega)=V\tau\,\frac{\sin(\omega\tau/2)}{\omega\tau/2}
$$

**(b) Step 1: build $g$ from $f$ (time shifting).**

$g(t)$ is $+V$ on $(-\tau,0)$ and $-V$ on $(0,\tau)$. That is:

- the rectangle moved **left** by $\frac\tau2$ (positive),
- minus the rectangle moved **right** by $\frac\tau2$.

$$
g(t)=f\!\left(t+\tfrac\tau2\right)-f\!\left(t-\tfrac\tau2\right)
$$

**Step 2: use the time-shift rule**, $f(t-t_0)\leftrightarrow e^{-j\omega t_0}F(\omega)$:

$$
G(\omega)=F(\omega)\left(e^{j\omega\tau/2}-e^{-j\omega\tau/2}\right)=2j\sin\!\left(\tfrac{\omega\tau}2\right)F(\omega)
$$

**Step 3: substitute $F(\omega)$.**

$$
G(\omega)=\frac{4jV}{\omega}\sin^2\!\left(\frac{\omega\tau}2\right)
$$

Check: $g$ is real and odd, so $G$ should be purely imaginary and odd. ✓

**Step 4: build $h$ from $g$ (integration).** Integrate $g$ from the far left:

- from $t=-\tau$ to $0$ the area grows steadily, up to $V\tau$;
- from $0$ to $\tau$ it falls back to $0$.

That is a triangle of peak $V\tau$. Divide by $\tau$ to get the triangle of peak $V$:

$$
h(t)=\frac1\tau\int_{-\infty}^{t}g(\lambda)\,d\lambda
$$

**Step 5: use the integration rule**, $\int_{-\infty}^tg\,d\lambda\leftrightarrow\frac{G(\omega)}{j\omega}+\pi G(0)\delta(\omega)$. Here $G(0)=0$ (the two halves of $g$ cancel), so:

$$
H(\omega)=\frac{1}{\tau}\cdot\frac{G(\omega)}{j\omega}=\frac{4V}{\omega^2\tau}\sin^2\!\left(\frac{\omega\tau}2\right)
$$

In sinc form:

$$
H(\omega)=V\tau\left[\frac{\sin(\omega\tau/2)}{\omega\tau/2}\right]^2
$$

Check: $H(0)=V\tau$, the area of the triangle, $\tfrac12\cdot2\tau\cdot V$. ✓
` + fig("q-1112-5-sol") + r`
**(c) How bandwidth is measured.** The bandwidth of a real signal is the width of the band of **positive** frequencies where $|F(\omega)|$ is significant:

- for a band-limited signal, simply its band edge;
- otherwise an **essential bandwidth**: the first zero of the spectrum, or the band holding a fixed share (say 90–99%) of the energy.

**Which has the lowest bandwidth? Compare how fast each spectrum dies away.**

| signal | spectrum falls like | notes |
|---|---|---|
| $f$ (rectangle) | $\frac1{\lvert\omega\rvert}$ | about 90% of the energy inside the first zero, $\frac{2\pi}{\tau}$ |
| $g$ (two halves) | $\frac1{\lvert\omega\rvert}$ | **zero at DC**; energy pushed outwards: highest |
| $h$ (triangle) | $\frac1{\omega^2}$ | about 99.7% of the energy inside the first zero: **lowest** |

**Answer: $h(t)$ has the lowest bandwidth.**

- $h$ has **no jumps**, only corners, so its spectrum dies fast ($\frac1{\omega^2}$).
- $f$ has two jumps of size $V$.
- $g$ has three jumps (one of size $2V$) and no DC part, so it has the most high-frequency content.

Rule: **the smoother the signal, the faster its spectrum falls, and the smaller its bandwidth.**`,
  },
  {
    id: "311-1011-5b",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2010-11",
    label: "Q5(b)",
    marks: 21,
    prompt: r`The Fourier transform of the triangular pulse $f(t)$ in Figure 5(a) is

$$
F(\omega)=\frac1{\omega^2}\left(e^{j\omega}-j\omega e^{j\omega}-1\right).
$$

Using this, and the time-shifting and time-scaling properties, find the Fourier transform of $g(t)$ in Figure 5(b). Does the inverse time–bandwidth relation hold for this signal? *(15+6)*`,
    note: "Figure 5(a): f(t) = −t on −1 ≤ t ≤ 0 (it jumps to 1 at t = −1 and falls to 0 at t = 0). Figure 5(b): g(t) is the triangle of peak 1 on −1 ≤ t ≤ 1. Both are redrawn above.",
    solution: r`**Step 1: check the given transform.**

$f(t)=-t$ on $[-1,0]$. Substitute $u=-t$:

$$
F(\omega)=\int_{-1}^{0}(-t)\,e^{-j\omega t}\,dt=\int_0^1u\,e^{j\omega u}\,du
$$

Integrating by parts gives $\frac{1}{\omega^2}\left(e^{j\omega}-j\omega e^{j\omega}-1\right)$, as given. ✓

**Step 2: build $g$ from two copies of $f$.**

- **Right half** of the triangle, $1-t$ on $[0,1]$: this is $f(t-1)$, i.e. $f$ moved right by 1, because $-(t-1)=1-t$.
- **Left half**, $1+t$ on $[-1,0]$: this is $f(-(t+1))$, i.e. $f$ flipped, then moved left by 1, because $-(-(t+1))=1+t$.

$$
g(t)=f(t-1)+f\big(-(t+1)\big)
$$

**Step 3: transform the right half (time shift).** $f(t-1)\leftrightarrow e^{-j\omega}F(\omega)$:

$$
e^{-j\omega}F(\omega)=\frac{1}{\omega^2}\left(1-j\omega-e^{-j\omega}\right)
$$

**Step 4: transform the left half (flip, then shift).**

- Flipping: $f(-t)\leftrightarrow F(-\omega)$, where

$$
F(-\omega)=\frac1{\omega^2}\left(e^{-j\omega}+j\omega e^{-j\omega}-1\right)
$$

- Shifting left by 1 multiplies by $e^{j\omega}$:

$$
e^{j\omega}F(-\omega)=\frac1{\omega^2}\left(1+j\omega-e^{j\omega}\right)
$$

**Step 5: add the two halves.** The $\pm j\omega$ terms cancel:

$$
G(\omega)=\frac{2-e^{j\omega}-e^{-j\omega}}{\omega^2}=\frac{2(1-\cos\omega)}{\omega^2}=\frac{4\sin^2(\omega/2)}{\omega^2}
$$

So

$$
\boxed{G(\omega)=\left[\frac{\sin(\omega/2)}{\omega/2}\right]^2}
$$

Checks:
- $G$ is real, even and never negative, as it should be for a real, even triangle. ✓
- $G(0)=1$, the area of the triangle. ✓
` + fig("q-1011-5b-sol") + r`
**Step 6: does the inverse time–bandwidth relation hold?**

- $g$ lasts **2 s**.
- Its spectrum has its first zero at $\omega=2\pi$ rad/s, i.e. **1 Hz**, and nearly all the energy is inside that main lobe.
- So duration × bandwidth is a constant of about 1.

Check with scaling, $g(at)\leftrightarrow\frac1{|a|}G\!\left(\frac\omega a\right)$:

- squeeze the triangle by $a$, so it lasts $\frac2a$;
- the first zero moves to $2\pi a$, so the bandwidth is multiplied by $a$.

**Yes, the inverse relation holds:** shorter in time means wider in frequency. (Strictly, $g$ is time-limited, so it is not band-limited; its spectrum only dies away like $\frac1{\omega^2}$.)`,
  },
  {
    id: "311-1011-6b",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2010-11",
    label: "Q6(b)",
    marks: 8,
    prompt: r`Let $g(t)$ of Figure 5(b) (the triangle of peak 1 on $-1\le t\le1$) be the input to an LTI system with transfer function $H(\omega)=j\omega$. Find and sketch the output in the time domain.`,
    solution: r`$H(\omega)=j\omega$ is a **differentiator**: by the differentiation property $\frac{dg}{dt}\leftrightarrow j\omega G(\omega)$, so

$$
Y(\omega)=j\omega\,G(\omega)\quad\Longrightarrow\quad y(t)=\frac{dg(t)}{dt}.
$$

The triangle rises with slope $+1$ on $(-1,0)$ and falls with slope $-1$ on $(0,1)$:

$$
y(t)=\begin{cases}+1,&-1<t<0\\-1,&0<t<1\\0,&\text{otherwise}\end{cases}
$$

The corners of the triangle at $t=-1,0,1$ become jumps of $+1$, $-2$ and $+1$. The output is an odd "doublet" of two rectangles.

**Check in frequency.** With $G(\omega)=\frac{4\sin^2(\omega/2)}{\omega^2}$:

$$
Y(\omega)=j\omega G(\omega)=\frac{4j\sin^2(\omega/2)}{\omega}.
$$

Directly, $y$ is a unit rectangle on $(-1,0)$ minus one on $(0,1)$, i.e. a width-1 rectangle shifted by $\mp\frac12$:

$$
Y(\omega)=\frac{2\sin(\omega/2)}{\omega}\left(e^{j\omega/2}-e^{-j\omega/2}\right)=\frac{2\sin(\omega/2)}{\omega}\cdot2j\sin(\omega/2),
$$

which is the same. ✓`,
  },
  {
    id: "311-1819-4a",
    topic: "fourier-transform",
    course: "CSE 311",
    session: "2018-19",
    label: "Q4(a)",
    marks: 18,
    prompt: r`Establish the equation that shifts the spectrum of a signal $g(t)$ to a different frequency band. Explain how it is used to transmit multiple signals simultaneously over a shared channel. Also briefly introduce a dual technique that does the same job.`,
    solution: r`**Part 1: the frequency-shift equation.**

**Step 1: multiply by a complex exponential.**

$$
\mathcal F\{g(t)\,e^{j2\pi f_ct}\}=\int g(t)\,e^{j2\pi f_ct}\,e^{-j2\pi ft}\,dt
$$

**Step 2: combine the exponentials.**

$$
\mathcal F\{g(t)\,e^{j2\pi f_ct}\}=\int g(t)\,e^{-j2\pi(f-f_c)t}\,dt=G(f-f_c)
$$

So multiplying by $e^{j2\pi f_ct}$ **moves the spectrum to $f_c$**.

**Step 3: a real carrier.** A cosine is two exponentials:

$$
\cos2\pi f_ct=\tfrac12\left(e^{j2\pi f_ct}+e^{-j2\pi f_ct}\right)
$$

So

$$
\boxed{\,g(t)\cos2\pi f_ct\ \longleftrightarrow\ \tfrac12\big[G(f-f_c)+G(f+f_c)\big]\,}
$$
` + fig("q-freq-shift") + r`
A baseband signal on $|f|<B$ is copied, same shape and half height, to the bands around $\pm f_c$ (from $f_c-B$ to $f_c+B$).

**Part 2: sharing one channel (frequency-division multiplexing, FDM).**

1. **Give each signal its own carrier.** Signal $g_i(t)$ goes on carrier $f_i$. Space the carriers so the bands $f_i\pm B$ don't overlap, and leave **guard bands** between them.
2. **Add and send.** Add all the modulated signals and send the sum over the one channel. Each sits in its own slot of the spectrum.
3. **Separate at the receiver.**
   - A **band-pass filter** around $f_i$ picks out one signal.
   - Multiply by $\cos2\pi f_it$ again. This shifts it back to baseband (plus an unwanted copy at $2f_i$).
   - A **low-pass filter** removes that copy and gives back $g_i(t)$.

*Examples:* AM and FM radio, cable TV, the old analogue telephone network.

**Part 3: the dual technique (time-division multiplexing, TDM).**

- FDM gives each signal its own slice of **frequency**, for all time.
- TDM, the dual, gives each signal its own slice of **time**, using the whole band.

How TDM works:

1. Sample each signal, at least at its Nyquist rate.
2. Interleave the samples of the different signals in turn, in time slots.
3. At the receiver, a synchronised switch separates the slots.
4. Low-pass filter each signal's samples to rebuild it.

*Examples:* the T1 digital telephone line, GSM time slots.`,
  },
  {
    id: "311-1617-2b",
    topic: "sampling",
    course: "CSE 311",
    session: "2016-17",
    label: "Q2(b)",
    marks: 16,
    prompt: r`State and prove Nyquist's sampling theorem. In the light of the proof, explain why in practice (i) a signal is passed through a band-limiting filter before sampling, and (ii) the sampling rate is chosen higher than the Nyquist rate.`,
    alsoAsked: ["CSE 311 · 2013-14 Q2(a),(b)", "CSE 311 · 2012-13 Q8(a)"],
    solution: r`**Statement.**

A real signal $g(t)$ that is band-limited to $B$ Hz, meaning

$$
G(f)=0\quad\text{for }|f|>B,
$$

is completely determined by its samples, provided they are taken at a rate

$$
f_s\ge2B\quad\left(\text{that is, }T_s\le\tfrac{1}{2B}\right).
$$

The minimum rate $2B$ is called the **Nyquist rate**.

**Proof, step 1: sampling is multiplication.** Ideal sampling multiplies $g(t)$ by an impulse train:

$$
\bar g(t)=g(t)\sum_n\delta(t-nT_s)=\sum_ng(nT_s)\,\delta(t-nT_s)
$$

**Step 2: write the impulse train as a Fourier series.** It is periodic with period $T_s$, and every coefficient equals $\frac1{T_s}$:

$$
\sum_n\delta(t-nT_s)=\frac1{T_s}\sum_{n}e^{j2\pi nf_st}
$$

So

$$
\bar g(t)=\frac1{T_s}\sum_ng(t)\,e^{j2\pi nf_st}
$$

**Step 3: take the Fourier transform.** Multiplying by $e^{j2\pi nf_st}$ shifts the spectrum by $nf_s$:

$$
\bar G(f)=\frac1{T_s}\sum_{n=-\infty}^{\infty}G(f-nf_s)
$$

So the sampled spectrum is **copies of $G(f)$, repeated every $f_s$**.
` + fig("smp-copies") + r`
**Step 4: when can we get $g(t)$ back?**

- The copy centred at $f_s$ starts at $f_s-B$.
- It stays clear of the original copy on $[-B,B]$ when $f_s-B\ge B$, that is when $f_s\ge2B$.
- Then an ideal low-pass filter (bandwidth $B$, gain $T_s$) keeps only $G(f)$, and we recover $g(t)$ exactly.

In time, that filter gives the interpolation formula (with $\operatorname{sinc}x=\frac{\sin x}{x}$, at $f_s=2B$):

$$
g(t)=\sum_ng(nT_s)\,\operatorname{sinc}\big(2\pi B(t-nT_s)\big)
$$

**Step 5: what if $f_s<2B$?** The copies overlap. This is **aliasing**, and $G(f)$ can no longer be separated. ∎
` + fig("smp-alias") + r`
**(i) Why filter before sampling (anti-aliasing filter).**

1. The proof needs $G(f)=0$ above $B$.
2. Real signals last a finite time, so they are **never perfectly band-limited**. Their spectra have tails that go on forever.
3. Without a filter, the tail above $f_s/2$ folds back into the band as false low frequencies. Nothing after sampling can remove them.
4. So we low-pass filter first, cutting at $B<f_s/2$. We lose a weak high-frequency tail, which is far less harmful than aliasing.

**(ii) Why sample faster than the Nyquist rate.**

1. At exactly $f_s=2B$ the copies **touch** at $\pm B$, with no gap.
2. Separating them would need a perfect "brick-wall" filter. That filter is not realisable.
3. Real filters need some room to roll off from pass to stop.
4. Sampling a bit faster (typically 10–25%) opens a **guard band** between $B$ and $f_s-B$ for that roll-off.
` + fig("smp-filters") + r`
*Example:* telephone speech has $B=3.4$ kHz but is sampled at $8$ kHz, not $6.8$ kHz.

**Practical reconstruction (2013-14 Q2(b)).**

- The ideal reconstruction filter cannot be built, so a **zero-order hold** plus a smoothing filter is used.
- The hold's response droops slightly inside the band (this can be equalised).
- It also leaks image copies outside the band, which the smoothing filter removes.
- Oversampling makes both jobs easier.`,
  },
]
