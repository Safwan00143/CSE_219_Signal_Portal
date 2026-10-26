import type { Question } from "../types"

const r = String.raw

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
    solution: r`**Distortionless system.** The output is a scaled, delayed replica of the input:

$$
y(t)=k\,g(t-t_d)\ \Longrightarrow\ H(f)=k\,e^{-j2\pi ft_d}.
$$

So it has **both**:

1. a **constant magnitude** $|H(f)|=k$, so every frequency gets the same gain;
2. a **linear phase through the origin**, $\theta(f)=-2\pi ft_d$, so every frequency gets the same delay $t_d$.

**All-pass system.** Only $|H(f)|=$ constant is required. The phase can be anything, e.g. $H(s)=\frac{s-a}{s+a}$, which has $|H(j\omega)|=1$ but phase $\pi-2\tan^{-1}(\omega/a)$, which is not linear.

| | distortionless | all-pass |
|---|---|---|
| magnitude | constant | constant |
| phase | linear, $-2\pi f t_d$ | arbitrary |
| output shape | preserved | can change (phase distortion) |

So **every distortionless system is all-pass, but an all-pass system is distortionless only if its phase is also linear**. An all-pass system with non-linear phase delays different frequencies by different amounts, which reshapes the waveform even though no frequency is attenuated.

**How to check.**

- Measure, or compute, $H(f)$ over the signal's band, e.g. by applying sinusoids of many frequencies and recording the gain and phase shift.
- Confirm (i) $|H(f)|$ is flat, and (ii) $\theta(f)$ is a straight line through the origin. Equivalently, the **group delay** $t_g(f)=-\frac1{2\pi}\frac{d\theta}{df}$ is constant and $\theta(0)=0$, or a multiple of $\pi$.
- In time: the impulse response is a single scaled, delayed impulse, $k\,\delta(t-t_d)$.
- In practice it only needs to hold **over the band occupied by the signal**.`,
  },
  {
    id: "311-2122-2a",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2021-22",
    label: "Q2(a)",
    marks: 20,
    prompt: r`Differentiate between all-pass and distortionless transmission systems. Draw the frequency response of a distortionless transmission system. Justify from its time-domain representation why it is unrealizable.`,
    solution: r`*Differences:* see the previous answer. All-pass = flat magnitude only. Distortionless = flat magnitude **and** linear phase.

**Frequency response.** For $H(f)=k\,e^{-j2\pi ft_d}$:

- $|H(f)|$ is a horizontal line at height $k$ for **all** $f$.
- $\theta(f)$ is a straight line through the origin with slope $-2\pi t_d$, going from positive values for $f<0$ to negative values for $f>0$.

**Time-domain view.** The inverse transform is

$$
h(t)=k\,\delta(t-t_d).
$$

A system that is distortionless for *every* signal must have this impulse response. It is unrealisable because:

- an ideal impulse needs a flat spectrum over an **infinite bandwidth**, i.e. infinitely fast response with zero rise time;
- every physical channel (wires, cables, amplifiers, air) has inductance, capacitance and finite bandwidth, so its gain must eventually fall off at high frequency, and $|H|$ cannot stay at $k$ for all $f$.

**In practice** we only need distortionless behaviour **over the signal's band**: $|H|\approx k$ and $\theta\approx-2\pi ft_d$ for $|f|<B$. That is achievable, for example an RC low-pass filter with $B\ll\frac1{2\pi RC}$, or equalisers.`,
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
    solution: r`**Derivation (2012-13 version).**

$$
y(t)=k\,g(t-t_d)\ \xrightarrow{\ \mathcal F\ }\ Y(f)=k\,G(f)e^{-j2\pi ft_d}\ \Rightarrow\ H(f)=k\,e^{-j2\pi ft_d}.
$$

**Characteristics.**

1. **Amplitude response constant:** $|H(f)|=k$.
2. **Phase response linear in $f$, passing through the origin:** $\theta_h(f)=-2\pi f t_d$. The time delay $t_d=-\theta_h(f)/(2\pi f)$ is then the same for every frequency.

**Physical interpretation.**

- *Equal gain:* a signal is a recipe of frequency components in fixed proportions. Scaling all of them by the same $k$ keeps the recipe. *Example:* music through an amplifier that boosts bass more than treble sounds different. That is **amplitude distortion**.
- *Equal delay:* the components must arrive *together*. A square wave is a sum of odd harmonics with precise alignment. Delay the 3rd harmonic more than the fundamental and the corners round off and overshoot shifts, even though no harmonic was weakened. That is **phase (delay) distortion**. Linear phase is exactly the condition for "equal delay", because a higher frequency needs proportionally more phase shift for the same time shift.

**If not satisfied.**

- *Amplitude distortion:* some bands are attenuated or emphasised, so speech sounds muffled or tinny, and pulses widen.
- *Phase or delay distortion:* components arrive at different times (dispersion). Pulses spread into neighbouring time slots, causing **inter-symbol interference** in digital links; video shows smearing and ghosting. The ear is less sensitive to phase than the eye or a data receiver.

Both are *linear* distortions, so they can in principle be undone by an equaliser $H_{eq}(f)=1/H(f)$ over the band.`,
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
    solution: r`**Transfer function** (bandwidth $B$ Hz, linear phase with delay $t_d$):

$$
H(f)=\Pi\!\left(\frac{f}{2B}\right)e^{-j2\pi ft_d}=\begin{cases}e^{-j2\pi ft_d}, & |f|<B\\ 0, & |f|>B\end{cases}
$$

**Impulse response.**

$$
h(t)=\int_{-B}^{B}e^{j2\pi f(t-t_d)}df=\frac{\sin 2\pi B(t-t_d)}{\pi(t-t_d)}=2B\,\frac{\sin2\pi B(t-t_d)}{2\pi B(t-t_d)} .
$$

In $\omega$ with cutoff $W$ rad/s (2010-11 wording): $h(t)=\dfrac{W}{\pi}\dfrac{\sin W(t-t_d)}{W(t-t_d)}$.

*Sketch:* a sinc centred at $t=t_d$, with peak $2B$ and zero crossings every $\frac1{2B}$ s, extending to $\pm\infty$.

**Why it is physically unrealisable (2016-17 Q1(d), 2010-11 Q6(a)).**

- $h(t)$ is the response to $\delta(t)$, applied at $t=0$. But $h(t)\neq0$ for $t<0$: the filter would respond **before the input arrives**. It is **non-causal**.
- Making $t_d$ larger delays the sinc but never removes its infinite tail to the left.
- More generally, a causal filter cannot have $|H(f)|=0$ over a whole band (Paley–Wiener criterion: $\int\frac{|\ln|H(f)||}{1+f^2}df<\infty$ fails).

**In practice:** truncate the tail and add enough delay, for example $h(t)u(t)$ with large $t_d$, to get a good, realisable approximation (Butterworth or Chebyshev filters).`,
  },
  {
    id: "311-1415L4-7b",
    topic: "frequency-response",
    course: "CSE 311",
    session: "2014-15",
    label: "Q7(b)",
    marks: 10,
    prompt: r`Draw the response of an ideal low-pass filter when the rectangular pulse of height $A$ on $|t|<T/2$ is applied. From the two diagrams, explain why the filter is called "ideal" rather than "real".`,
    solution: r`**Output.** Use $y=x*h$ with $h(t)=2B\,\frac{\sin 2\pi B(t-t_d)}{2\pi B(t-t_d)}$. Integrating a sinc gives the sine integral $\operatorname{Si}(x)=\int_0^x\frac{\sin u}{u}du$:

$$
y(t)=\frac{A}{\pi}\Big[\operatorname{Si}\big(2\pi B(t-t_d+\tfrac T2)\big)-\operatorname{Si}\big(2\pi B(t-t_d-\tfrac T2)\big)\Big].
$$

**What the drawing shows.**

- The output is a **rounded pulse centred at $t_d$**. It has finite rise and fall times, about $\frac{1}{2B}$, instead of vertical edges, because the high-frequency content of the sharp edges has been removed.
- It has **ripples (overshoot of about 9%, the Gibbs phenomenon)** near the edges.
- Its leading ripples start **before $t=-T/2$**, i.e. before the input pulse has begun (and with $t_d=0$, before $t=0$ in response to an input at $t=0$).

**Why "ideal".** The output appearing before the input means the filter is **non-causal**: its impulse response, a sinc, exists for $t<0$. No physical device can respond to an input it has not yet received. The brick-wall response, perfect flat passband, zero transition band and infinite stop-band attenuation, is a mathematical idealisation used for analysis. Real filters only approximate it with finite roll-off and some phase non-linearity.`,
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
    solution: r`Since $G(f)=0$ for $|f|>B$, the cut-off of $H$ does not matter. For all $f$,

$$
Y(f)=G(f)H(f)=G(f)\big(1+k\cos2\pi fT\big)e^{-j2\pi ft_d}.
$$

Expand the cosine with Euler, $\cos2\pi fT=\tfrac12\big(e^{j2\pi fT}+e^{-j2\pi fT}\big)$:

$$
Y(f)=G(f)e^{-j2\pi ft_d}+\frac k2G(f)e^{-j2\pi f(t_d-T)}+\frac k2G(f)e^{-j2\pi f(t_d+T)} .
$$

Each term is $G(f)$ times a linear-phase factor, i.e. a **time shift**: $G(f)e^{-j2\pi f\tau}\leftrightarrow g(t-\tau)$. So

$$
\boxed{y(t)=g(t-t_d)+\frac k2\Big[g(t-t_d+T)+g(t-t_d-T)\Big]}
$$

**Interpretation — "paired echoes".** The phase is perfectly linear, but the amplitude response has a cosine **ripple**. A ripple in $|H(f)|$ produces a main output $g(t-t_d)$ plus two small echoes of strength $k/2$, one $T$ seconds before and one $T$ seconds after. This shows how amplitude distortion spreads a pulse in time, which causes inter-symbol interference in digital links.`,
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
    solution: r`**(i) Measuring $H(f)$.**

- **Sinusoidal sweep** (the standard method). Since $e^{j2\pi ft}$ is an eigenfunction, the input $A\cos2\pi f_1t$ produces $A|H(f_1)|\cos(2\pi f_1t+\theta(f_1))$. Apply sinusoids at many frequencies $f_1$ and measure the output-to-input amplitude ratio, which gives $|H(f_1)|$, and the phase shift, which gives $\theta(f_1)$. Plot both against $f$.
- **Impulse method.** Apply a very narrow, tall pulse (an approximate $\delta$), record the output $\approx h(t)$, and compute $H(f)=\mathcal F\{h\}$ (in practice with an FFT).
- **Broadband method.** Apply a known wide-band input $x(t)$ (white noise, a chirp, a step) and compute $H(f)=Y(f)/X(f)$ from the measured spectra.

**(ii) RC low-pass.** The output across $C$ gives

$$
H(f)=\frac{1/(j2\pi fC)}{R+1/(j2\pi fC)}=\frac{1}{1+j2\pi fRC},\quad |H(f)|=\frac{1}{\sqrt{1+(2\pi fRC)^2}},\quad \theta(f)=-\tan^{-1}(2\pi fRC).
$$

If $2\pi fRC\ll1$:

- $|H(f)|\approx1$, which is constant;
- $\theta(f)\approx-2\pi fRC$, which is linear through the origin, with delay $t_d=RC$.

So the circuit is approximately distortionless **for signals whose bandwidth satisfies**

$$
B\ll\frac{1}{2\pi RC}\qquad(\text{equivalently } \omega\ll 1/RC),
$$

and over that band it simply delays the input by $RC$ seconds. *(2011-12, part b)* Derivation of $H$ for a distortionless system: $g(t)=k\,f(t-t_d)\Rightarrow G(\omega)=kF(\omega)e^{-j\omega t_d}\Rightarrow H(\omega)=k\,e^{-j\omega t_d}$.`,
  },
]
