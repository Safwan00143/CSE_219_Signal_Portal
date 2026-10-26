const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const fourierTransformNote = r`
## Beyond periodic signals

The Fourier series decomposes **periodic** signals: it needs $x(t+T)=x(t)$. But many real signals never repeat. A clap, a single data pulse, a heartbeat recorded once: one-time events with no fixed period.

Can we still describe a non-repeating signal using frequencies? Yes. The Fourier transform does for aperiodic signals what the Fourier series does for periodic ones.

## From series to transform: let the period go to infinity

### Cheat first: repeat one lonely pulse

Start with one finite-duration signal $x(t)$ and repeat it every $T$:

$$
x_T(t)=\sum_{m=-\infty}^{\infty}x(t-mT).
$$

Now it is periodic, so the Fourier series works. As $T$ grows the copies move away from each other, and as $T\to\infty$ the repeated signal looks like one isolated pulse.
` + fig("ft-repeat") + r`
### What happens in frequency?

The allowed frequencies are $k\omega_0$ with $\omega_0=\frac{2\pi}T$. Small $T$ means large spacing and few lines; large $T$ means tiny spacing and many lines. **Increasing $T$ packs the allowed frequencies closer and closer together.**

### A smooth spectrum is hiding behind the stems

The series coefficients of $x_T$ are

$$
a_k=\frac1T\int_{-T/2}^{T/2}x_T(t)e^{-jk\omega_0t}dt=\frac1T\int_{-\infty}^{\infty}x(t)e^{-jk\omega_0t}dt,
$$

because inside one period $x_T$ is just the isolated pulse $x(t)$, and the pulse is zero outside. The integral depends on $k$ only through $k\omega_0$. Give it a name:

$$
X(j\omega)=\int_{-\infty}^{\infty}x(t)e^{-j\omega t}dt\qquad\Longrightarrow\qquad T\,a_k=X(jk\omega_0).
$$

**The stems are samples of one smooth curve.** As $T$ increases, the sample points $k\omega_0$ crowd together until they trace out the whole curve.
` + fig("ft-envelope") + r`
### Why do the raw coefficients shrink?

$a_k=\frac1TX(jk\omega_0)$, and since $\Delta\omega=\omega_0=\frac{2\pi}T$, we have $\frac1T=\frac{\Delta\omega}{2\pi}$. Think of it as a **frequency density**: each stem's amount is spread over a bin of width $\Delta\omega$. As $\Delta\omega\to0$ the bins get thinner and the discrete spectrum becomes continuous.

### The sum becomes an integral

Start from the series and substitute $a_k=\frac{\Delta\omega}{2\pi}X(jk\omega_0)$:

$$
x_T(t)=\sum_ka_ke^{jk\omega_0t}=\frac1{2\pi}\sum_kX(jk\omega_0)\,e^{jk\omega_0t}\,\Delta\omega .
$$

Let $T\to\infty$: $\Delta\omega\to d\omega$, $k\omega_0\to\omega$ becomes a continuous variable, $x_T\to x$, and the sum becomes an integral.

## The Fourier transform pair

$$
\boxed{\,X(j\omega)=\int_{-\infty}^{\infty}x(t)\,e^{-j\omega t}\,dt\,}\qquad\text{(analysis)}
$$

$$
\boxed{\,x(t)=\frac1{2\pi}\int_{-\infty}^{\infty}X(j\omega)\,e^{j\omega t}\,d\omega\,}\qquad\text{(synthesis)}
$$

We write $x(t)\leftrightarrow X(j\omega)$.

> The Fourier transform is not a new idea. It is the Fourier series after the frequency lines become continuous. Periodic signals have **discrete** spectra; aperiodic signals have **continuous** spectra; and the series coefficients of a periodic extension are samples of the single pulse's transform.

**In hertz.** With $\omega=2\pi f$ the pair becomes $G(f)=\int g(t)e^{-j2\pi ft}dt$, $g(t)=\int G(f)e^{j2\pi ft}df$ with no $\frac1{2\pi}$. The CSE 311 papers use this form; everything below carries over with $\omega\to2\pi f$.

## Injecting oscillation: the frequency-shift property

What happens to the spectrum if we put an oscillation inside a signal, $x(t)\to x(t)\cos\omega_0t$? The shape of $x(t)$ becomes an envelope, with the cosine oscillating inside. A damped pendulum, a vibrating string with loss, a ringing circuit and a fading echo all look like this.
` + fig("ft-modulation-time") + r`
Solve the cleaner version first: $x(t)e^{j\omega_0t}$. A frequency component of $x$ looks like $e^{j\omega t}$; after multiplying,

$$
e^{j\omega t}\cdot e^{j\omega_0t}=e^{j(\omega+\omega_0)t},
$$

so every component at $\omega$ moves to $\omega+\omega_0$. The spectrum slides to the right:

$$
\boxed{\,x(t)e^{j\omega_0t}\ \leftrightarrow\ X\big(j(\omega-\omega_0)\big)\,}
$$
` + fig("ft-freq-shift") + r`
(To move a spectrum right by $\omega_0$ we write $X(j(\omega-\omega_0))$: the same "minus means right" rule as time shifting.)

### Cosine modulation

A cosine is two rotating exponentials, $\cos\omega_0t=\frac12(e^{j\omega_0t}+e^{-j\omega_0t})$, so

$$
x(t)\cos\omega_0t=\tfrac12x(t)e^{j\omega_0t}+\tfrac12x(t)e^{-j\omega_0t}\ \leftrightarrow\ \tfrac12X\big(j(\omega-\omega_0)\big)+\tfrac12X\big(j(\omega+\omega_0)\big).
$$
` + fig("ft-cos-mod") + r`
**In time** we injected an oscillation. **In frequency** the spectrum moved to $\pm\omega_0$ as two half-height copies. This is how AM radio and every frequency-division system work.

## The rectangle: a transform to keep in your toolbox

$$
x(t)=\begin{cases}1,&-\frac T2<t<\frac T2\\0,&\text{otherwise}\end{cases}
$$

$$
X(j\omega)=\int_{-T/2}^{T/2}e^{-j\omega t}dt=\left[\frac{e^{-j\omega t}}{-j\omega}\right]_{-T/2}^{T/2}=\frac{e^{j\omega T/2}-e^{-j\omega T/2}}{j\omega}=\boxed{\frac{2\sin(\omega T/2)}{\omega}}
$$
` + fig("ft-rect") + r`
- The peak at $\omega=0$ is $T$, the area of the rectangle.
- Zeros at $\omega=\frac{2\pi k}T$, $k=\pm1,\pm2,\dots$; the main lobe is $\frac{4\pi}{T}$ wide.
- The side lobes decay like $1/|\omega|$: the sharp edges need high frequencies.

**Wider rectangle, narrower spectrum.** Large $T$ squeezes the main lobe.

### Practice: two centred rectangles

$x_1(t)=1$ on $-1<t<1$ (width 2) and $x_2(t)=1$ on $-3<t<3$ (width 6). Just plug in the width:

$$
X_1(j\omega)=\frac{2\sin\omega}{\omega},\qquad X_2(j\omega)=\frac{2\sin3\omega}{\omega}.
$$
` + fig("ft-wide-narrow") + r`
### What if the rectangle is shifted?

$x(t)=1$ on $4<t<10$: a width-6 rectangle centred at 7, i.e. $x(t)=r(t-7)$ with $r$ centred at zero. By time shifting, $r(t-t_0)\leftrightarrow e^{-j\omega t_0}R(j\omega)$:

$$
X(j\omega)=e^{-j7\omega}\,\frac{2\sin3\omega}{\omega}.
$$

### A Lego-block signal

$$
x(t)=\begin{cases}1,&1<t<2\\1.5,&2<t<3\\1,&3<t<4\\0,&\text{otherwise}\end{cases}
$$

Decompose: a height-1 block of width 3 centred at 2.5, plus a height-0.5 block of width 1 centred at 2.5.
` + fig("ft-lego") + r`
$$
X(j\omega)=e^{-j2.5\omega}\,\frac{2\sin1.5\omega}{\omega}+0.5\,e^{-j2.5\omega}\,\frac{2\sin0.5\omega}{\omega}=e^{-j2.5\omega}\,\frac{2\sin1.5\omega+\sin0.5\omega}{\omega}.
$$

### Lock a cosine inside the rectangle

$x(t)=r(t)\cos\omega_0t$, a windowed cosine, is just modulation of a rectangle:

$$
X(j\omega)=\frac{\sin\big((\omega-\omega_0)T/2\big)}{\omega-\omega_0}+\frac{\sin\big((\omega+\omega_0)T/2\big)}{\omega+\omega_0}.
$$
` + fig("ft-windowed-cos") + r`
A cosine inside a rectangle has a spectrum centred at $\pm\omega_0$, not at zero. The longer the window, the narrower each copy: a pure tone of infinite length would give two impulses.

## The transform of a spike

$x(t)=\delta(t)$. By the sifting property, the impulse samples $e^{-j\omega t}$ at $t=0$:

$$
X(j\omega)=\int_{-\infty}^{\infty}\delta(t)e^{-j\omega t}dt=e^{-j\omega\cdot0}=1 .
$$
` + fig("ft-delta") + r`
**A very narrow spike in time needs all frequencies equally.** Bonus: a shifted spike $\delta(t-t_0)$ samples the exponential at $t_0$, so $\delta(t-t_0)\leftrightarrow e^{-j\omega t_0}$: flat magnitude, linear phase.

## Standard transform pairs

| $x(t)$ | $X(j\omega)$ |
|---|---|
| $\delta(t)$ | $1$ |
| $\delta(t-t_0)$ | $e^{-j\omega t_0}$ |
| $1$ | $2\pi\delta(\omega)$ |
| $e^{j\omega_0t}$ | $2\pi\delta(\omega-\omega_0)$ |
| $\cos\omega_0t$ | $\pi[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)]$ |
| $\sin\omega_0t$ | $\frac\pi j[\delta(\omega-\omega_0)-\delta(\omega+\omega_0)]$ |
| $e^{-at}u(t)$, $a>0$ | $\dfrac1{a+j\omega}$ |
| $e^{at}u(-t)$, $a>0$ | $\dfrac1{a-j\omega}$ |
| $e^{-a\lvert t\rvert}$, $a>0$ | $\dfrac{2a}{a^2+\omega^2}$ |
| $t\,e^{-at}u(t)$ | $\dfrac1{(a+j\omega)^2}$ |
| $\operatorname{sgn}(t)$ | $\dfrac2{j\omega}$ |
| $u(t)$ | $\pi\delta(\omega)+\dfrac1{j\omega}$ |
| rectangle, 1 for $\lvert t\rvert<T/2$ | $\dfrac{2\sin(\omega T/2)}{\omega}$ |
| $\dfrac{\sin Wt}{\pi t}$ | $1$ for $\lvert\omega\rvert<W$, else 0 |
| triangle, peak 1, half-width $T_1$ | $T_1\left(\dfrac{\sin(\omega T_1/2)}{\omega T_1/2}\right)^2$ |
| $\sum_n\delta(t-nT)$ | $\dfrac{2\pi}T\sum_k\delta\!\left(\omega-\dfrac{2\pi k}T\right)$ |

**Sinc conventions.** Lathi (used in CSE 311) defines $\operatorname{sinc}x=\frac{\sin x}{x}$; many other texts use $\frac{\sin\pi x}{\pi x}$. When in doubt, write the explicit sine ratio.
` + fig("ft-exp") + r`
## Properties of the Fourier transform

| property | time domain | frequency domain |
|---|---|---|
| linearity | $ax(t)+by(t)$ | $aX(j\omega)+bY(j\omega)$ |
| time shift | $x(t-t_0)$ | $e^{-j\omega t_0}X(j\omega)$ |
| frequency shift | $e^{j\omega_0t}x(t)$ | $X(j(\omega-\omega_0))$ |
| modulation | $x(t)\cos\omega_0t$ | $\frac12[X(j(\omega-\omega_0))+X(j(\omega+\omega_0))]$ |
| scaling | $x(at)$ | $\frac1{\lvert a\rvert}X\!\left(\frac{j\omega}a\right)$ |
| reversal | $x(-t)$ | $X(-j\omega)$ |
| conjugation | $x^*(t)$ | $X^*(-j\omega)$ |
| differentiation | $\frac{dx}{dt}$ | $j\omega X(j\omega)$ |
| integration | $\int_{-\infty}^tx(\tau)d\tau$ | $\frac{X(j\omega)}{j\omega}+\pi X(0)\delta(\omega)$ |
| frequency differentiation | $t\,x(t)$ | $j\frac{dX}{d\omega}$ |
| convolution | $x(t)*h(t)$ | $X(j\omega)H(j\omega)$ |
| multiplication | $x(t)y(t)$ | $\frac1{2\pi}X(j\omega)*Y(j\omega)$ |
| duality | $X(jt)$ | $2\pi x(-\omega)$ |
| Parseval | $\int\lvert x\rvert^2dt$ | $\frac1{2\pi}\int\lvert X\rvert^2d\omega$ |

### Time shift: delay means linear phase

$$
\int x(t-t_0)e^{-j\omega t}dt\ \overset{\tau=t-t_0}{=}\ e^{-j\omega t_0}\int x(\tau)e^{-j\omega\tau}d\tau=e^{-j\omega t_0}X(j\omega).
$$

The magnitude is untouched; the phase gains $-\omega t_0$, a straight line through the origin. Each frequency component is delayed by the same $t_0$ because higher frequencies get proportionally more phase.

### Scaling: compress in time, expand in frequency

$$
x(at)\leftrightarrow\frac1{|a|}X\!\left(\frac{j\omega}{a}\right).
$$

For $a>0$ substitute $\tau=at$: $\int x(at)e^{-j\omega t}dt=\frac1a\int x(\tau)e^{-j(\omega/a)\tau}d\tau$. For $a<0$ the limits swap, giving $|a|$.
` + fig("ft-scaling", "ft-interactive-scaling") + r`
> **Time–bandwidth reciprocity.** A signal that is narrow in time is wide in frequency, and vice versa. Playing a tape at double speed halves its duration and doubles every pitch. A signal cannot be both time-limited and band-limited.

### Differentiation

Differentiate the synthesis integral; only $e^{j\omega t}$ depends on $t$:

$$
\frac{dx}{dt}=\frac1{2\pi}\int(j\omega)X(j\omega)e^{j\omega t}d\omega\qquad\Longrightarrow\qquad\frac{dx}{dt}\leftrightarrow j\omega X(j\omega).
$$

So a **differentiator** is an LTI system with $H(j\omega)=j\omega$. It boosts high frequencies in proportion to $|\omega|$, so a derivative has its energy shifted to higher frequencies.

### Convolution theorem

$$
\mathcal F\{x*h\}=\int\!\!\int x(\tau)h(t-\tau)d\tau\,e^{-j\omega t}dt=\int x(\tau)e^{-j\omega\tau}\left[\int h(t-\tau)e^{-j\omega(t-\tau)}dt\right]d\tau=X(j\omega)H(j\omega).
$$

**Convolution in time is multiplication in frequency.** By duality, multiplication in time is convolution in frequency (with $\frac1{2\pi}$).

### Duality

The analysis and synthesis integrals have the same shape. From the synthesis equation, $2\pi x(-t)=\int X(j\omega)e^{-j\omega t}d\omega$; swapping the names $t$ and $\omega$:

$$
x(t)\leftrightarrow X(j\omega)\quad\Longrightarrow\quad X(jt)\leftrightarrow2\pi\,x(-\omega).
$$

Every pair comes with a free twin: rectangle ↔ sinc gives sinc ↔ rectangle, $\delta(t)\leftrightarrow1$ gives $1\leftrightarrow2\pi\delta(\omega)$, triangle ↔ sinc² gives sinc² ↔ triangle.
` + fig("ft-sinc-rect", "ft-triangle") + r`
### Symmetry of real signals

If $x$ is real, $X^*(j\omega)=\int x(t)e^{+j\omega t}dt=X(-j\omega)$. In polar form:

$$
|X(-j\omega)|=|X(j\omega)|\ \ (\text{magnitude even}),\qquad\angle X(-j\omega)=-\angle X(j\omega)\ \ (\text{phase odd}).
$$

Real and even signals have real, even spectra; real and odd signals have imaginary, odd spectra.

## The sign function: a transform defined as a limit

$\operatorname{sgn}(t)=-1$ for $t<0$ and $+1$ for $t>0$. It is not absolutely integrable, so integrate a family that tends to it. With $f(t)=e^{-at}u(t)$ ($a>0$):

$$
f(t)\leftrightarrow\frac1{a+j\omega},\qquad f(-t)=e^{at}u(-t)\leftrightarrow\frac1{a-j\omega}\quad(\text{time reversal}),
$$

$$
\operatorname{sgn}(t)=\lim_{a\to0^+}[f(t)-f(-t)]\ \leftrightarrow\ \lim_{a\to0}\left(\frac1{a+j\omega}-\frac1{a-j\omega}\right)=\lim_{a\to0}\frac{-2j\omega}{a^2+\omega^2}=\frac2{j\omega}.
$$
` + fig("ft-sgn") + r`
Then $u(t)=\frac12+\frac12\operatorname{sgn}(t)\leftrightarrow\pi\delta(\omega)+\frac1{j\omega}$.

## Periodic signals have impulse spectra

A periodic signal $x(t)=\sum_ka_ke^{jk\omega_0t}$ is not absolutely integrable, but each exponential transforms to an impulse, $e^{jk\omega_0t}\leftrightarrow2\pi\delta(\omega-k\omega_0)$. So

$$
X(j\omega)=2\pi\sum_{k=-\infty}^{\infty}a_k\,\delta(\omega-k\omega_0).
$$

If one period is the pulse $g(t)$, then $a_k=\frac1TG(jk\omega_0)$: the impulse strengths follow the single pulse's spectrum.
` + fig("ft-periodic-spectrum") + r`
## When does the transform exist? Dirichlet conditions

$X(j\omega)$ exists, and the inverse converges to $x(t)$ (to the midpoint at jumps), if:

1. $x$ is absolutely integrable: $\int_{-\infty}^\infty|x(t)|\,dt<\infty$;
2. $x$ has finitely many maxima and minima in any finite interval;
3. $x$ has finitely many finite discontinuities in any finite interval.

These conditions are **sufficient, not necessary**. Constants, steps, sinusoids and periodic signals fail condition 1, yet have transforms if we allow impulses. Even $\frac{\sin Wt}{\pi t}$ is not absolutely integrable but has the ordinary transform "rectangle".

## Bandwidth

The **bandwidth** of a real signal is the width of the band of positive frequencies over which $|X(j\omega)|$ is significant.

- Strictly band-limited ($X=0$ for $|\omega|>W$): the bandwidth is $W$.
- Otherwise: an **essential bandwidth**, e.g. the first null, or the band holding 90–99% of the energy.

Narrower pulses, sharper edges and faster changes all mean larger bandwidth. $\delta(t)$ has infinite bandwidth.

## Applications: where the Fourier transform quietly appears

- **Audio denoising:** voice sits at low and mid frequencies, hiss at high frequencies. Keep the useful band, reduce the rest.
- **Image denoising:** noise hides in high spatial frequencies; a slightly blurry but clean image often beats a sharp noisy one.
- **JPEG compression:** small high-frequency coefficients of each image block are rounded away; the eye barely notices.
- **MRI:** the scanner measures frequency-domain data ("k-space") first; the image is reconstructed by an inverse transform.
- **Music recognition:** a song is identified from the pattern of its strongest frequency peaks over time, a frequency fingerprint.
- **Vibration diagnosis:** a cracked bearing or loose part changes a machine's spectrum before it is visible in time.
- **ECG filtering:** remove 50 Hz power-line hum without destroying the heartbeat.
` + fig("ft-denoise") + r`
## Exam pointers

- Build unknown transforms from known pairs with properties, and **name each property** you use.
- A spectrum given as magnitude and phase plots: write $X=|X|e^{j\angle X}$ piece by piece. A phase of $\pm\pi/2$ that flips sign at $\omega=0$ usually signals a factor $j\omega$ (a derivative).
- Shifted rectangles: transform the centred one, then multiply by $e^{-j\omega t_0}$.
- Watch the convention: $\omega$ (with $\frac1{2\pi}$ in the inverse) or $f$ (no $\frac1{2\pi}$).
`
