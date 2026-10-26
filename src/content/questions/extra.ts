import type { Question } from "../types"

const r = String.raw

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
    solution: r`**(a) The rectangle.** $f(t)=V$ for $|t|<\tau/2$:

$$
F(\omega)=\int_{-\tau/2}^{\tau/2}Ve^{-j\omega t}dt=V\,\frac{e^{j\omega\tau/2}-e^{-j\omega\tau/2}}{j\omega}=\frac{2V\sin(\omega\tau/2)}{\omega}=V\tau\,\frac{\sin(\omega\tau/2)}{\omega\tau/2}.
$$

**(b) From $f$ to $g$: time shifting.** $g(t)$ is $+V$ on $(-\tau,0)$ and $-V$ on $(0,\tau)$. That is the rectangle moved left by $\tau/2$ minus the rectangle moved right by $\tau/2$:

$$
g(t)=f\!\left(t+\tfrac\tau2\right)-f\!\left(t-\tfrac\tau2\right).
$$

By the time-shift property, $f(t-t_0)\leftrightarrow e^{-j\omega t_0}F(\omega)$:

$$
G(\omega)=F(\omega)\left(e^{j\omega\tau/2}-e^{-j\omega\tau/2}\right)=2j\sin\!\left(\tfrac{\omega\tau}2\right)F(\omega)=\boxed{\frac{4jV}{\omega}\sin^2\!\left(\frac{\omega\tau}2\right)}
$$

Check: $g$ is real and odd, so $G$ must be purely imaginary and odd. It is.

**From $g$ to $h$: integration.** Integrating $g$ from $-\infty$ gives a ramp rising from 0 at $t=-\tau$ to $V\tau$ at $t=0$, then falling back to 0 at $t=\tau$. Dividing by $\tau$ gives exactly the triangle of peak $V$:

$$
h(t)=\frac1\tau\int_{-\infty}^{t}g(\lambda)\,d\lambda .
$$

By the integration property, $\int_{-\infty}^tg\,d\lambda\leftrightarrow\frac{G(\omega)}{j\omega}+\pi G(0)\delta(\omega)$, and here $G(0)=0$ (the areas of $g$ cancel):

$$
H(\omega)=\frac{1}{\tau}\cdot\frac{G(\omega)}{j\omega}=\frac{4V}{\omega^2\tau}\sin^2\!\left(\frac{\omega\tau}2\right)=\boxed{V\tau\left[\frac{\sin(\omega\tau/2)}{\omega\tau/2}\right]^2}
$$

Check: $H(0)=V\tau$, the area of the triangle ($\tfrac12\cdot2\tau\cdot V$). ✓ (Equivalently, $h=\frac1{V\tau}\,f*f$, so $H=\frac{F^2}{V\tau}$.)

**(c) Bandwidth.** The bandwidth of a real signal is the width of the band of **positive** frequencies over which its amplitude spectrum $|F(\omega)|$ is significant: the band edge for a band-limited signal, otherwise an essential bandwidth (first null, or the band holding a fixed fraction, say 90–99%, of the energy).

| signal | spectrum | behaviour | |
|---|---|---|---|
| $f$ (rectangle) | $\lvert F\rvert\propto\left\lvert\frac{\sin(\omega\tau/2)}{\omega}\right\rvert$ | decays like $1/\lvert\omega\rvert$; about 90% of the energy inside the first null $2\pi/\tau$ | |
| $g$ (doublet) | $\lvert G\rvert=\frac{4V}{\lvert\omega\rvert}\sin^2(\omega\tau/2)$ | **zero at DC**, peaks away from zero, decays like $1/\lvert\omega\rvert$ | highest |
| $h$ (triangle) | $\lvert H\rvert\propto\frac{\sin^2(\omega\tau/2)}{\omega^2}$ | decays like $1/\omega^2$; about 99.7% of the energy inside the first null | **lowest** |

**$h(t)$ has the lowest bandwidth.** It is continuous, with no jumps (only corners), so it needs far less high-frequency content: its spectrum falls off as $1/\omega^2$. $f$ has two jumps of size $V$, and $g$ has three jumps (including one of size $2V$) and no DC component, so $g$ has its energy pushed to the highest frequencies. In general: **the smoother the signal, the faster its spectrum decays and the smaller its bandwidth.**`,
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
    solution: r`**Check the given transform.** With $u=-t$, $F(\omega)=\int_{-1}^{0}(-t)e^{-j\omega t}dt=\int_0^1u\,e^{j\omega u}du$. Integrating by parts gives $\frac{1}{\omega^2}\left(e^{j\omega}-j\omega e^{j\omega}-1\right)$, which matches.

**Build $g$ from $f$.**

- The right half of the triangle, $1-t$ on $[0,1]$, is $f(t-1)$: $f$ shifted right by 1, since $-(t-1)=1-t$.
- The left half, $1+t$ on $[-1,0]$, is $f(-t-1)$: $f$ reversed and then shifted, since $-(-t-1)=1+t$.

$$
g(t)=f(t-1)+f\big(-(t+1)\big).
$$

**Transform each piece.**

- *Time shifting:* $f(t-1)\leftrightarrow e^{-j\omega}F(\omega)$.
- *Time scaling with $a=-1$ (reversal):* $f(-t)\leftrightarrow F(-\omega)$. Then *time shifting* (left by 1): $f(-(t+1))\leftrightarrow e^{j\omega}F(-\omega)$.

Now compute:

$$
e^{-j\omega}F(\omega)=\frac{1}{\omega^2}\left(1-j\omega-e^{-j\omega}\right),
$$

$$
F(-\omega)=\frac1{\omega^2}\left(e^{-j\omega}+j\omega e^{-j\omega}-1\right)\ \Rightarrow\ e^{j\omega}F(-\omega)=\frac1{\omega^2}\left(1+j\omega-e^{j\omega}\right).
$$

Add them; the $\pm j\omega$ terms cancel:

$$
G(\omega)=\frac{2-e^{j\omega}-e^{-j\omega}}{\omega^2}=\frac{2(1-\cos\omega)}{\omega^2}=\frac{4\sin^2(\omega/2)}{\omega^2}=\boxed{\left[\frac{\sin(\omega/2)}{\omega/2}\right]^2}
$$

Checks: $G$ is real, even and non-negative, as it must be for a real, even triangle; $G(0)=1$, the area of the triangle. ✓

**Inverse time–bandwidth relation.** $g$ lasts 2 s (half-width 1 s). Its spectrum has its first zero at $\omega=2\pi$ rad/s ($f=1$ Hz), and almost all its energy lies inside the main lobe, so the essential bandwidth is about 1 Hz. Duration × bandwidth is a constant of order 1.

Scaling confirms the reciprocity: $g(at)\leftrightarrow\frac1{|a|}G(\omega/a)$. Compressing the triangle by $a$ (duration $2/a$) moves the first zero to $2\pi a$, multiplying the bandwidth by $a$. **So yes, the inverse time–bandwidth relation holds.** Note also that $g$ is time-limited, so strictly it is not band-limited; the spectrum only decays like $1/\omega^2$.`,
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
    solution: r`**The frequency-shift (modulation) equation.** Multiply by a complex exponential:

$$
\mathcal F\{g(t)e^{j2\pi f_ct}\}=\int g(t)e^{-j2\pi(f-f_c)t}dt=G(f-f_c).
$$

A real carrier is two exponentials, $\cos2\pi f_ct=\frac12\left(e^{j2\pi f_ct}+e^{-j2\pi f_ct}\right)$, so

$$
\boxed{\,g(t)\cos2\pi f_ct\ \leftrightarrow\ \tfrac12\big[G(f-f_c)+G(f+f_c)\big]\,}
$$

A baseband signal occupying $|f|<B$ is moved, unchanged in shape and at half height, to the bands $f_c-B<|f|<f_c+B$.

**Sharing one channel: frequency-division multiplexing (FDM).**

1. Give each signal $g_i(t)$ its own carrier $f_i$, far enough apart that the shifted bands $f_i\pm B$ do not overlap. Leave **guard bands** between them.
2. Add the modulated signals and send the sum over the one channel. Each occupies its own slot of the spectrum.
3. At the receiver, a **band-pass filter** around $f_i$ picks out one signal. Multiplying again by $\cos2\pi f_it$ shifts it back to baseband (plus a copy at $2f_i$), and a low-pass filter recovers $g_i(t)$.

Examples: AM/FM radio, cable TV, the analogue telephone FDM hierarchy (groups and supergroups).

**The dual technique: time-division multiplexing (TDM).** FDM gives each signal its own slice of **frequency** for all time. By duality, TDM gives each signal its own slice of **time** using the whole band. Each signal is sampled (at least at its Nyquist rate, by the sampling theorem), and the samples of the different signals are interleaved in turn in time slots. A synchronised commutator at the receiver separates them, and each is reconstructed by low-pass filtering. Examples: the T1/DS1 digital telephone carrier, GSM time slots.`,
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
    solution: r`**Statement.** A real signal $g(t)$ band-limited to $B$ Hz ($G(f)=0$ for $|f|>B$) is uniquely determined by its samples taken uniformly at a rate $f_s\ge2B$ samples per second (interval $T_s\le\frac1{2B}$). The minimum rate $2B$ is the **Nyquist rate**.

**Proof.** Ideal sampling multiplies $g$ by the impulse train $\delta_{T_s}(t)=\sum_n\delta(t-nT_s)$:

$$
\bar g(t)=g(t)\delta_{T_s}(t)=\sum_ng(nT_s)\delta(t-nT_s).
$$

$\delta_{T_s}$ is periodic, so expand it in a Fourier series; every coefficient is $\frac1{T_s}$:

$$
\delta_{T_s}(t)=\frac1{T_s}\sum_{n=-\infty}^{\infty}e^{j2\pi nf_st}\quad\Rightarrow\quad\bar g(t)=\frac1{T_s}\sum_ng(t)e^{j2\pi nf_st}.
$$

By the frequency-shift property:

$$
\bar G(f)=\frac1{T_s}\sum_{n=-\infty}^{\infty}G(f-nf_s).
$$

The sampled spectrum consists of copies of $G(f)$ centred at $nf_s$. The copy at $f_s$ starts at $f_s-B$. If $f_s\ge2B$, it does not overlap the baseband copy on $[-B,B]$. An ideal low-pass filter of bandwidth $B$ and gain $T_s$ then passes $G(f)$ alone, giving back $g(t)$ exactly. In time this is the interpolation formula (Lathi's $\operatorname{sinc}x=\frac{\sin x}x$, at $f_s=2B$):

$$
g(t)=\sum_ng(nT_s)\,\operatorname{sinc}\big(2\pi B(t-nT_s)\big).
$$

If $f_s<2B$ the copies overlap (aliasing) and $G(f)$ cannot be separated. ∎

**(i) Why band-limit before sampling (anti-aliasing filter).** The proof assumes $G(f)=0$ for $|f|>B$. Real signals are time-limited, so they are **never strictly band-limited**: their spectra have tails extending to infinity. Without a filter, the tails above $f_s/2$ fold back into the baseband as false low frequencies (aliasing), and nothing after sampling can remove them. A low-pass filter cutting off at the essential bandwidth $B<f_s/2$ before the sampler discards those components deliberately, so nothing folds back. The loss of the weak high-frequency tail is far less harmful than the aliasing it prevents.

**(ii) Why sample faster than Nyquist.** At exactly $f_s=2B$ the spectral copies touch at $f=\pm B$, with no gap between them. Separating them would need an **ideal brick-wall low-pass filter**, which has a sinc impulse response and is non-causal and unrealisable. Real filters (and the anti-aliasing filter in (i)) have a finite transition band. Sampling faster, typically 10–25% above Nyquist, opens a **guard band** between $B$ and $f_s-B$ in which a practical filter can roll off. *Example:* telephone speech has $B=3.4$ kHz but is sampled at $8$ kHz, not $6.8$ kHz.

**Practical issues in reconstruction (2013-14 Q2(b)).** The ideal reconstruction filter is unrealisable, so a zero-order hold followed by a smoothing filter is used. The ZOH's $\operatorname{sinc}$ response droops inside the passband (often compensated by equalisation) and leaks image copies outside it, which the smoothing filter must suppress. Oversampling makes both tasks easier.`,
  },
]
