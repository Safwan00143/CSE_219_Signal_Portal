import type { Question } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const systemsQuestions: Question[] = [
  {
    id: "311-2223-2b",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2022-23",
    label: "Q2(b)",
    marks: 15,
    prompt: r`Explain the differences between a distortionless system and an all-pass system. How will you determine that a system is distortionless?`,
    alsoAsked: ["CSE 311 · 2018-19 Q1(b)"],
    solution: r`**1. Distortionless system.**

The output is a scaled, delayed copy of the input:

$$
y(t)=k\,g(t-t_d)
$$

Taking Fourier transforms gives

$$
H(f)=k\,e^{-j2\pi ft_d}
$$

So it needs **both**:

- **constant gain**, $|H(f)|=k$: every frequency is scaled the same;
- **linear phase through the origin**, $\theta(f)=-2\pi ft_d$: every frequency is delayed the same.
` + fig("fr-distortionless") + r`
**2. All-pass system.**

It needs **only** constant gain, $|H(f)|=$ constant. The phase can be anything.

*Example:*

$$
H(s)=\frac{s-a}{s+a}
$$

- Its gain is $|H(j\omega)|=1$ at every frequency.
- Its phase is $\pi-2\tan^{-1}(\omega/a)$, which is **not** a straight line.
` + fig("fr-allpass") + r`
**3. The difference, side by side.**

| | distortionless | all-pass |
|---|---|---|
| gain | constant | constant |
| phase | straight line, $-2\pi f t_d$ | anything |
| output shape | kept | may change |

- **Every distortionless system is all-pass.**
- An all-pass system is distortionless **only if its phase is also linear**.
- With non-linear phase, different frequencies are delayed by different amounts. The waveform changes shape, even though no frequency is weakened.

**4. How to check whether a system is distortionless.**

1. Measure $H(f)$ over the signal's band: apply sinusoids of many frequencies and record the gain and the phase shift.
2. Check that the **gain is flat**: $|H(f)|$ is constant.
3. Check that the **phase is a straight line through the origin**. Equivalently, the group delay $t_g(f)=-\frac1{2\pi}\frac{d\theta}{df}$ is constant, and $\theta(0)=0$ (or a multiple of $\pi$).
4. In time, the impulse response is a single scaled, delayed impulse, $k\,\delta(t-t_d)$.

In practice this only has to hold **over the band the signal occupies**.`,
  },
  {
    id: "311-2122-2a",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2021-22",
    label: "Q2(a)",
    marks: 20,
    prompt: r`Differentiate between all-pass and distortionless transmission systems. Draw the frequency response of a distortionless transmission system. Justify from its time-domain representation why it is unrealizable.`,
    solution: r`**1. All-pass vs distortionless.**

| | all-pass | distortionless |
|---|---|---|
| gain $\lvert H(f)\rvert$ | constant | constant |
| phase $\theta(f)$ | anything | straight line, $-2\pi ft_d$ |
| output shape | may change | kept |

- **All-pass:** only the gain has to be flat.
- **Distortionless:** the gain must be flat **and** the phase linear.

**2. Frequency response of a distortionless system.**

$$
H(f)=k\,e^{-j2\pi ft_d}
$$

- $|H(f)|=k$: a horizontal line at height $k$, for **all** $f$.
- $\theta(f)=-2\pi ft_d$: a straight line through the origin with slope $-2\pi t_d$ (positive for $f<0$, negative for $f>0$).
` + fig("fr-distortionless") + r`
**3. Why it cannot be built: look at the time domain.**

The inverse transform of $k\,e^{-j2\pi ft_d}$ is a single delayed impulse:

$$
h(t)=k\,\delta(t-t_d)
$$

So a system that is distortionless for **every** signal must respond to an impulse with a perfect, scaled impulse.

- A perfect impulse has a flat spectrum over an **infinite bandwidth**. The system would need to respond infinitely fast, with zero rise time.
- Every real channel (wires, cables, amplifiers, air) has some inductance, capacitance and limited bandwidth. Its gain must fall off at high frequencies, so $|H|$ cannot stay at $k$ for **all** $f$.

**4. In practice.** We only need distortionless behaviour **over the signal's band**:

$$
|H(f)|\approx k\quad\text{and}\quad\theta(f)\approx-2\pi ft_d\qquad\text{for }|f|<B
$$

That is achievable. Examples: an RC low-pass filter with $B\ll\frac1{2\pi RC}$, or an equaliser.`,
  },
  {
    id: "311-2021-4a",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2020-21",
    label: "Q4(a)",
    marks: 20,
    prompt: r`State the characteristics of distortionless transmission. With examples, give a physical interpretation of these characteristics. What happens if they are not satisfied?`,
    alsoAsked: ["CSE 311 · 2012-13 Q7(a)"],
    solution: r`**Step 1: what "distortionless" means.** The output is the input, only scaled and delayed:

$$
y(t)=k\,g(t-t_d)
$$

**Step 2: take the Fourier transform.**

$$
Y(f)=k\,G(f)\,e^{-j2\pi ft_d}
$$

**Step 3: read off $H(f)=\frac{Y(f)}{G(f)}$.**

$$
H(f)=k\,e^{-j2\pi ft_d}
$$

**The two characteristics.**

1. **Constant gain:** $|H(f)|=k$ at every frequency in the band.
2. **Linear phase through the origin:**

$$
\theta_h(f)=-2\pi f\,t_d
$$

   Then every frequency is delayed by the same time, $t_d=-\dfrac{\theta_h(f)}{2\pi f}$.
` + fig("fr-distortionless") + r`
**Physical meaning, with examples.**

- **Equal gain.** A signal is a mix of frequencies in fixed proportions. Scaling every one by the same $k$ keeps the mix.
  *Example:* an amplifier that boosts the bass more than the treble makes music sound different. That is **amplitude distortion**.
- **Equal delay.** The components must arrive **together**.
  *Example:* a square wave is a sum of odd harmonics lined up precisely. Delay the 3rd harmonic more than the fundamental and the corners change shape, even though no harmonic was weakened. That is **phase (delay) distortion**.
- **Why the phase must be linear.** A higher frequency needs a proportionally bigger phase shift to be delayed by the same time. "Phase proportional to $f$" is exactly "same delay for all".
` + fig("fr-phase-distortion") + r`
**If they are not satisfied.**

- **Amplitude distortion:** some bands are weakened or boosted. Speech sounds muffled or tinny, and pulses get wider.
- **Phase (delay) distortion:** frequencies arrive at different times (dispersion). Pulses spread into their neighbours, causing **inter-symbol interference** in digital links; video smears and shows ghosts. The ear notices this less than the eye or a data receiver does.

Both are linear distortions, so in principle an equaliser $H_{eq}(f)=\frac1{H(f)}$ over the band can undo them.`,
  },
  {
    id: "311-1718-1c",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2017-18",
    label: "Q1(c)",
    marks: 7,
    prompt: r`Write the transfer function of an ideal low-pass filter. From it, derive the impulse response in the time domain.`,
    alsoAsked: ["CSE 311 · 2010-11 Q6(a)", "CSE 311 · 2016-17 Q1(d)"],
    solution: r`**Step 1: the transfer function.** An ideal low-pass filter with bandwidth $B$ Hz passes everything below $B$ unchanged (apart from a delay $t_d$) and blocks everything above:

$$
H(f)=\begin{cases}e^{-j2\pi ft_d}, & |f|<B\\[4pt] 0, & |f|>B\end{cases}
$$

In compact form:

$$
H(f)=\Pi\!\left(\frac{f}{2B}\right)e^{-j2\pi ft_d}
$$

**Step 2: inverse transform.** Only $|f|<B$ contributes:

$$
h(t)=\int_{-B}^{B}e^{-j2\pi ft_d}\,e^{j2\pi ft}\,df=\int_{-B}^{B}e^{j2\pi f(t-t_d)}\,df
$$

**Step 3: integrate.**

$$
h(t)=\frac{e^{j2\pi B(t-t_d)}-e^{-j2\pi B(t-t_d)}}{j2\pi(t-t_d)}=\frac{\sin 2\pi B(t-t_d)}{\pi(t-t_d)}
$$

In sinc form:

$$
h(t)=2B\,\frac{\sin2\pi B(t-t_d)}{2\pi B(t-t_d)}
$$

(With cutoff $W$ rad/s, as in the 2010-11 wording: $h(t)=\dfrac{W}{\pi}\cdot\dfrac{\sin W(t-t_d)}{W(t-t_d)}$.)
` + fig("fr-lpf-impulse") + r`
**Sketch:** a sinc centred at $t=t_d$, peak $2B$, crossing zero every $\frac1{2B}$ s, and going on forever in both directions.

**Why it cannot be built (2016-17 Q1(d), 2010-11 Q6(a)).**

1. $h(t)$ is the response to $\delta(t)$, which arrives at $t=0$.
2. But $h(t)\ne0$ for $t<0$: the filter would respond **before the input arrives**. It is **non-causal**.
3. A bigger delay $t_d$ moves the sinc to the right, but its tail still stretches to $t=-\infty$.
4. More generally, no causal filter can be exactly zero over a whole band (the Paley–Wiener criterion).

**In practice:** cut off the left tail and add enough delay, for example use $h(t)\,u(t)$ with a large $t_d$. That gives a good, buildable approximation, as Butterworth and Chebyshev filters do.`,
  },
  {
    id: "311-1415L4-7b",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2014-15",
    label: "Q7(b)",
    marks: 10,
    prompt: r`Draw the response of an ideal low-pass filter when the rectangular pulse of height $A$ on $|t|<T/2$ is applied. From the two diagrams, explain why the filter is called "ideal" rather than "real".`,
    solution: r`**Step 1: the filter.** An ideal low-pass filter (bandwidth $B$, delay $t_d$) has a sinc impulse response:

$$
h(t)=2B\,\frac{\sin 2\pi B(t-t_d)}{2\pi B(t-t_d)}
$$

**Step 2: the output.** $y=x*h$. Integrating a sinc gives the sine integral, $\operatorname{Si}(x)=\int_0^x\frac{\sin u}{u}\,du$:

$$
y(t)=\frac{A}{\pi}\Big[\operatorname{Si}\big(2\pi B(t-t_d+\tfrac T2)\big)-\operatorname{Si}\big(2\pi B(t-t_d-\tfrac T2)\big)\Big]
$$
` + fig("fr-lpf-pulse") + r`
**Step 3: what the drawing shows.**

1. **Rounded edges.** The output is a smooth pulse centred at $t_d$. Its edges take about $\frac{1}{2B}$ to rise and fall, instead of jumping, because the filter removed the high frequencies that made the edges sharp.
2. **Ripples.** Near each edge there is an overshoot of about 9% (the Gibbs phenomenon).
3. **Output before input.** The first ripples start **before $t=-\frac T2$**, that is, before the input pulse has even begun.

**Step 4: why it is called "ideal", not "real".**

- An output that starts before its input means the filter is **non-causal**. Its impulse response (a sinc) is non-zero for $t<0$.
- No physical device can react to an input it has not received yet.
- The "brick-wall" response (perfectly flat pass band, zero transition, infinite stop-band attenuation) is a mathematical idealisation, used for analysis.
- Real filters only approximate it, with a gradual roll-off and some non-linear phase.`,
  },
  {
    id: "311-1415-1c",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2014-15",
    label: "Q1(c)",
    marks: 13,
    prompt: r`A low-pass filter has transfer function

$$
H(f)=\begin{cases}(1+k\cos2\pi fT)\,e^{-j2\pi ft_d}, & |f|<B\\ 0, & |f|>B .\end{cases}
$$

A pulse $g(t)$ band-limited to $B$ Hz is applied at the input. Show that the output is $y(t)=g(t-t_d)+\frac k2\big[g(t-t_d-T)+g(t-t_d+T)\big]$.`,
    alsoAsked: ["CSE 311 · 2012-13 Q7(c)"],
    solution: r`**Step 1: the cutoff doesn't matter here.** $g(t)$ has nothing above $B$, so $H$ being zero above $B$ changes nothing. For all $f$:

$$
Y(f)=G(f)\,H(f)=G(f)\big(1+k\cos2\pi fT\big)\,e^{-j2\pi ft_d}
$$

**Step 2: write the cosine as two exponentials.**

$$
\cos2\pi fT=\tfrac12\big(e^{j2\pi fT}+e^{-j2\pi fT}\big)
$$

**Step 3: multiply out.** Three terms appear:

$$
Y(f)=G(f)\,e^{-j2\pi ft_d}+\frac k2\,G(f)\,e^{-j2\pi f(t_d-T)}+\frac k2\,G(f)\,e^{-j2\pi f(t_d+T)}
$$

**Step 4: each term is a time shift.** By the time-shift rule:

$$
G(f)\,e^{-j2\pi f\tau}\ \longleftrightarrow\ g(t-\tau)
$$

- the first term is $g$ delayed by $t_d$;
- the second is $g$ delayed by $t_d-T$, times $\frac k2$;
- the third is $g$ delayed by $t_d+T$, times $\frac k2$.

$$
\boxed{y(t)=g(t-t_d)+\frac k2\Big[g(t-t_d+T)+g(t-t_d-T)\Big]}
$$
` + fig("fr-echo") + r`
**What it means: "paired echoes".**

- The phase is perfectly linear, so that part causes no distortion.
- But the gain has a cosine **ripple**.
- That ripple produces the main pulse $g(t-t_d)$ **plus two small echoes** of size $\frac k2$: one $T$ seconds early and one $T$ seconds late.
- So amplitude distortion spreads a pulse out in time. In digital links this causes inter-symbol interference.`,
  },
  {
    id: "311-1314-1c",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2013-14",
    label: "Q1(c)",
    marks: 18,
    prompt: r`(i) For an LTI system, $Y(f)=H(f)X(f)$. Given an LTI system, how would you empirically find its transfer function?

(ii) For a distortionless LTI system, $|H(f)|$ must be constant and $\theta(f)$ linear through the origin. Under what conditions can the RC circuit (series $R$, output taken across the shunt $C$) be approximated as distortionless?`,
    alsoAsked: ["CSE 311 · 2011-12 Q6(b)"],
    solution: r`**(i) Measuring $H(f)$ in practice.** Three ways:

**Method 1: sinusoidal sweep (the standard way).**

1. Apply $A\cos2\pi f_1t$.
2. An LTI system outputs a sinusoid of the same frequency:

$$
A\,|H(f_1)|\cos\big(2\pi f_1t+\theta(f_1)\big)
$$

3. The ratio of output to input amplitude gives $|H(f_1)|$.
4. The phase shift between them gives $\theta(f_1)$.
5. Repeat for many frequencies and plot both against $f$.

**Method 2: impulse.** Apply a very short, tall pulse (close to $\delta(t)$). The output is close to $h(t)$. Then compute $H(f)=\mathcal F\{h\}$, usually with an FFT.

**Method 3: broadband input.** Apply a known wide-band input (white noise, a chirp or a step), measure both spectra, and compute

$$
H(f)=\frac{Y(f)}{X(f)}
$$

**(ii) When is the RC circuit nearly distortionless?**

**Step 1: find $H(f)$.** With the output across $C$, the circuit is a voltage divider:

$$
H(f)=\frac{1/(j2\pi fC)}{R+1/(j2\pi fC)}=\frac{1}{1+j2\pi fRC}
$$
` + fig("fr-rc-circuit") + r`
**Step 2: gain and phase.**

$$
|H(f)|=\frac{1}{\sqrt{1+(2\pi fRC)^2}}
$$

$$
\theta(f)=-\tan^{-1}(2\pi fRC)
$$

**Step 3: make $2\pi fRC$ small.** If $2\pi fRC\ll1$:

- $|H(f)|\approx1$, which is **constant**;
- $\tan^{-1}x\approx x$ for small $x$, so $\theta(f)\approx-2\pi f\,RC$, which is a **straight line through the origin**, with delay $t_d=RC$.
` + fig("fr-rc-response") + r`
**Answer.** The RC circuit is approximately distortionless for signals whose bandwidth is small enough:

$$
B\ll\frac{1}{2\pi RC}\qquad\left(\text{equivalently }\omega\ll\frac1{RC}\right)
$$

Over that band it simply delays the signal by $RC$ seconds.

**(2011-12, part b): $H$ of a distortionless system.**

$$
g(t)=k\,f(t-t_d)\ \Rightarrow\ G(\omega)=k\,F(\omega)\,e^{-j\omega t_d}\ \Rightarrow\ H(\omega)=k\,e^{-j\omega t_d}
$$`,
  },
]
