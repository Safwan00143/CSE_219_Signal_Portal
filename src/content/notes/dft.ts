const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const dftNote = r`
## Four transforms, one square

One structural rule generates every Fourier-type transform. We already know the left column; this topic derives the right one: what happens to Fourier's idea when time arrives in samples.

| | time is continuous | time is discrete |
|---|---|---|
| **periodic** | Fourier series (CTFS) | DFS / **DFT** |
| **aperiodic** | Fourier transform (CTFT) | **DTFT** |

> **Discrete in one domain ⇔ periodic in the other.** Sampling time makes the spectrum periodic; sampling frequency (keeping only $N$ bins) makes time periodic.

# Part I — from Fourier series to the DFT

## Recap: the CTFS

A periodic $x(t)$ with period $T_0$, $\omega_0=\frac{2\pi}{T_0}$:

$$
x(t)=\sum_{k=-\infty}^{\infty}c_k\,e^{jk\omega_0t},\qquad c_k=\frac1{T_0}\int_{T_0}x(t)\,e^{-jk\omega_0t}dt .
$$

**A picture of $c_k$.** Multiplying by $e^{-jk\omega_0t}$ winds the graph of $x(t)$ around the origin: each value becomes a radius and $k\omega_0t$ the angle, $k$ turns per period. $c_k$ is the **centre of mass** of the wound curve. Only the rates $k\omega_0$ close the loop after one period, which is why a periodic signal has a line spectrum. For $x(t)=1+0.8\cos\omega_0t+0.5\cos2\omega_0t$, winding at $k=1$ gives a centroid $c_1=0.4$; at $k=3$ the mass cancels and $c_3=0$.

## Uniform sampling of a periodic signal

Sample with period $T_s$ chosen so that one period holds exactly $N$ samples:

$$
T_0=NT_s\ (N\in\mathbb Z^+),\qquad x[n]\triangleq x(nT_s).
$$

Then $x[n]$ is itself $N$-periodic: $x[n+N]=x[n]$.
` + fig("dft-sample-periodic") + r`
### Sampling as an impulse train

Represent the samples with an impulse train (a Dirac comb), each impulse weighted by its sample:

$$
p(t)=\sum_{n=-\infty}^{\infty}\delta(t-nT_s),\qquad x_p(t)=x(t)p(t)=\sum_nx(nT_s)\,\delta(t-nT_s)=\sum_nx[n]\,\delta(t-nT_s).
$$
` + fig("dft-impulse-sampling") + r`
## The integral becomes a sum

$x_p(t)$ is still $T_0$-periodic, so it has a CTFS. Substitute and let the impulses sift the integral (choose $t_0=-T_s/2$ so exactly $n=0,\dots,N-1$ fall inside one period):

$$
c_k=\frac1{T_0}\int_{t_0}^{t_0+T_0}\sum_nx[n]\delta(t-nT_s)e^{-jk\omega_0t}dt=\frac1{T_0}\sum_{n=0}^{N-1}x[n]\,e^{-jk\omega_0nT_s}.
$$

Since $\omega_0T_s=\frac{2\pi}{T_0}T_s=\frac{2\pi}N$:

$$
\boxed{\,c_k=\frac1{T_0}\sum_{n=0}^{N-1}x[n]\,e^{-j\frac{2\pi}Nkn}\,}
$$

## Only $N$ distinct coefficients

$$
c_{k+N}=\frac1{T_0}\sum_{n=0}^{N-1}x[n]e^{-j\frac{2\pi}N(k+N)n}=c_k\,\underbrace{e^{-j2\pi n}}_{=1}=c_k .
$$

The coefficients are $N$-periodic. **Sampling in time made the spectrum periodic.** Only $N$ unique values exist; we keep the window $k=0,1,\dots,N-1$.
` + fig("dft-periodic-coeffs") + r`
## Reading the bins: where the negative frequencies went

The natural spectrum is centred at $k=0$, with negative $k$ on the left. Periodicity moves each negative-$k$ coefficient into the window: $c_{-k}=c_{N-k}$. The negative side is not lost; it **folds onto the upper bins**.
` + fig("dft-bins") + r`
> **How to read $N$ bins.** Bins $0\to\frac N2$: positive frequencies, low → high. Bins $\frac N2\to N-1$: negative frequencies, high → low. A real low-pass signal peaks at $k=0$ and near $k=N$, and dips at $k=\frac N2$.

## Getting $x[n]$ back

### The CTFS synthesis does not help

$\sum_kc_ke^{jk\omega_0t}=x_p(t)$ rebuilds the continuous impulse train, not the sequence $x[n]$, and it spends infinitely many terms repeating the same $N$ values. We need a discrete synthesis that uses only the $N$ unique coefficients.

### The inverse trick: orthogonality

From the analysis sum, $T_0c_k=\sum_{m=0}^{N-1}x[m]e^{-j\frac{2\pi}Nkm}$. Multiply by $e^{+j\frac{2\pi}Nkn}$ and sum over the $N$ unique $k$:

$$
\sum_{k=0}^{N-1}(T_0c_k)e^{j\frac{2\pi}Nkn}=\sum_{m=0}^{N-1}x[m]\sum_{k=0}^{N-1}e^{j\frac{2\pi}Nk(n-m)} .
$$

The inner geometric series is

$$
\sum_{k=0}^{N-1}e^{j\frac{2\pi}Nk(n-m)}=\begin{cases}\dfrac{1-e^{j2\pi(n-m)}}{1-e^{j\frac{2\pi}N(n-m)}}=\dfrac{1-1}{\cdots}=0,&n\neq m\\[8pt] \displaystyle\sum_{k=0}^{N-1}1=N,&n=m\end{cases}
$$

so only $m=n$ survives:

$$
x[n]=\frac1N\sum_{k=0}^{N-1}(T_0c_k)\,e^{j\frac{2\pi}Nkn}.
$$

A finite sum recovers the samples exactly: no impulses, no infinite series. Both directions only ever touch the $N$ numbers $T_0c_k$, so that combination deserves its own name.

## The Discrete Fourier Series (DFS)

For any $N$-periodic sequence $\tilde x[n]$:

$$
a_k=\frac1N\sum_{n=0}^{N-1}\tilde x[n]\,e^{-j\frac{2\pi}Nkn}\quad(\text{analysis}),\qquad
\tilde x[n]=\sum_{k=0}^{N-1}a_k\,e^{j\frac{2\pi}Nkn}\quad(\text{synthesis}).
$$

| | CTFS (period $T_0$) | DFS (period $N$) |
|---|---|---|
| analysis | $c_k=\frac1{T_0}\int_{T_0}x(t)e^{-jk\frac{2\pi}{T_0}t}dt$ | $a_k=\frac1N\sum_{n=0}^{N-1}\tilde x[n]e^{-jk\frac{2\pi}Nn}$ |
| synthesis | $x(t)=\sum_{k=-\infty}^{\infty}c_ke^{jk\frac{2\pi}{T_0}t}$ | $\tilde x[n]=\sum_{k=0}^{N-1}a_ke^{jk\frac{2\pi}Nn}$ |
| coefficients | infinitely many | $N$ unique ($a_{k+N}=a_k$) |

The same winding picture applies: place sample $n$ at radius $x[n]$ and angle $-\frac{2\pi}Nkn$; $a_k$ is the plain average (centre of mass) of the $N$ points. That is why the integral became a sum.

## The Discrete Fourier Transform (DFT)

For a length-$N$ sequence $\{x[n]\}_{n=0}^{N-1}$, define the transform as the bare analysis sum, written with the **twiddle factor**

$$
W_N\triangleq e^{-j\frac{2\pi}N},\qquad W_N^N=1\ (\text{an }N\text{-th root of unity; its powers cycle}).
$$

$$
\boxed{\,X[k]=\sum_{n=0}^{N-1}x[n]\,W_N^{kn},\quad k=0,\dots,N-1\qquad\qquad x[n]=\frac1N\sum_{k=0}^{N-1}X[k]\,W_N^{-kn},\quad n=0,\dots,N-1\,}
$$

**Three bridges:**

- $X[k]=N\,a_k$: the DFT is the DFS, rescaled;
- $c_k=\frac1{T_0}X[k]$: the CTFS coefficients of the sampled signal $x_p(t)$;
- $X[k]=X(e^{j\omega})\big|_{\omega=2\pi k/N}$: samples of the DTFT (Part III).

> **We never needed the continuous signal.** The DFT formula only consumes the $N$ numbers $x[0],\dots,x[N-1]$; nothing in it remembers $T_s$ or $x(t)$. Any list of numbers (an audio buffer, a pixel row, a sensor log) has a DFT. The sampling story was scaffolding.

**Part I in one picture:** $N$ points in time ⇄ $N$ points in frequency, with DFT one way and IDFT the other.

# Part II — the Discrete-Time Fourier Transform

## Now let the signal be aperiodic

Take an aperiodic $x(t)$ restricted to an interval of length $T_0$. Sampling gives a finite sequence, non-zero only for $0\le n\le N-1$:

$$
x_p(t)=\sum_nx[n]\,\delta(t-nT_s).
$$

An aperiodic signal calls for the Fourier **transform**. Take the CTFT of the impulse train; each impulse sifts:

$$
X_p(j\Omega)=\sum_{n=-\infty}^{\infty}x[n]e^{-j\Omega nT_s}.
$$

Now relabel the frequency axis by the sampling period, $\omega=\Omega T_s$. The same spectrum becomes the **DTFT**:

$$
\boxed{\,X(e^{j\omega})\triangleq X_p(j\Omega)\Big|_{\Omega T_s=\omega}=\sum_{n=-\infty}^{\infty}x[n]\,e^{-j\omega n}\,}
$$

$\omega$ is **digital frequency**, in radians per sample. For the length-$N$ capture the sum runs over $n=0,\dots,N-1$.

**Winding picture.** For a segment of $x(t)=1+\cos6t$ on $0\le t\le1.5$ s, nothing repeats outside it, so the winding runs over the whole segment and every rate $\omega$ gets its own value: a continuous spectrum. Sampled with $T_s=\frac1{24}$ s, the 3 Hz tone becomes $6\cdot\frac1{24}=\frac\pi4$ radians per sample: consecutive points are turned by the same angle $\omega$.

## The DTFT is $2\pi$-periodic

Each term repeats every $2\pi$, since $e^{-j2\pi n}=1$ for integer $n$:

$$
X(e^{j(\omega+2\pi)})=X(e^{j\omega}).
$$

- Any $2\pi$-wide window holds one full period; the usual principal interval is $[-\pi,\pi]$.
- $[\pi,2\pi)$ is the folded copy of $[-\pi,0)$.
- In physical units, $[-\pi,\pi]$ corresponds to $\left[-\frac{\Omega_s}2,\frac{\Omega_s}2\right]$ with $\Omega_s=\frac{2\pi}{T_s}$ (revisited in Sampling).
` + fig("dft-dtft-periodic") + r`
## The inverse DTFT

Same pattern as Part I, but the spectrum is a continuous function of $\omega$, so we integrate over one $2\pi$ period instead of summing $N$ bins. Substitute the analysis sum and swap sum and integral:

$$
\frac1{2\pi}\int_{2\pi}X(e^{j\omega})e^{j\omega n}d\omega=\sum_mx[m]\,\frac1{2\pi}\int_{-\pi}^{\pi}e^{j\omega(n-m)}d\omega=x[n],
$$

because complete cycles integrate to zero: $\frac1{2\pi}\int_{-\pi}^{\pi}e^{j\omega r}d\omega=1$ if $r=0$ and $0$ otherwise.

$$
\boxed{\,x[n]=\frac1{2\pi}\int_{2\pi}X(e^{j\omega})\,e^{j\omega n}\,d\omega\,}
$$

$x[n]$ is a continuum superposition of $e^{j\omega n}$ over one period, versus the DFS, a finite sum of $N$ of them.

# Part III — the DFT through the DTFT lens

## The DFT samples the DTFT

Look at the DFT definition: it is the DTFT evaluated at the discrete frequencies $\omega=\frac{2\pi}Nk$. Nothing to derive:

$$
X[k]=\sum_{n=0}^{N-1}x[n]e^{-j\frac{2\pi}Nkn}=X(e^{j\omega})\Big|_{\omega=\frac{2\pi}Nk}.
$$
` + fig("dft-samples-dtft") + r`
**One transform, two views.** Periodic view: Fourier-series coefficients. Aperiodic view: $N$ samples of the DTFT. Same $N$ numbers.

### Reading the bins once more ($N=8$)

| $k$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| $\omega_k$ | 0 | $\frac\pi4$ | $\frac\pi2$ | $\frac{3\pi}4$ | $\pi$ | $-\frac{3\pi}4$ | $-\frac\pi2$ | $-\frac\pi4$ |
| meaning | dc | rising positive | | | highest | negative, falling back toward dc | | |

## Zero-padding: same spectrum, finer samples

Append zeros to a length-$N$ sequence to reach length $M\ge N$. The zeros add nothing to the DTFT sum, so **the spectrum is unchanged**, but the $M$-point DFT samples it at spacing $\frac{2\pi}M$ instead of $\frac{2\pi}N$:

$$
X_M[k]=\sum_{n=0}^{M-1}x[n]e^{-j\frac{2\pi}Mkn}=X(e^{j\omega})\Big|_{\omega=\frac{2\pi}Mk}.
$$
` + fig("dft-zero-pad") + r`
> More pixels, not more information. Zero-padding interpolates the picture of the same DTFT; it cannot resolve what the $N$ real samples never captured.

## A complete numeric example ($N=4$)

$x[n]=\{1,2,3,4\}$. With $N=4$, $W_4=e^{-j\pi/2}=-j$, and $W_4^{kn}=(-j)^{kn}$ cycles through $1,-j,-1,j$:

| $W_4^{kn}$ | $n=0$ | $n=1$ | $n=2$ | $n=3$ |
|---|---|---|---|---|
| $k=0$ | 1 | 1 | 1 | 1 |
| $k=1$ | 1 | $-j$ | $-1$ | $j$ |
| $k=2$ | 1 | $-1$ | 1 | $-1$ |
| $k=3$ | 1 | $j$ | $-1$ | $-j$ |

$$
\begin{aligned}
X[0]&=1+2+3+4=10\\
X[1]&=1-2j-3+4j=-2+2j\\
X[2]&=1-2+3-4=-2\\
X[3]&=1+2j-3-4j=-2-2j
\end{aligned}
$$
` + fig("dft-example") + r`
Bin 3 sits at $\omega=\frac{3\pi}2\equiv-\frac\pi2$: it is bin 1's negative-frequency partner, and indeed $X[3]=X^*[1]$. For real signals $|X[k]|$ is symmetric about $\frac N2$.

## Back to physical frequency, and to hertz

The DTFT axis was normalised, $\omega=\Omega T_s$. Undo it for bin $k$:

$$
\Omega_k=\frac{\omega_k}{T_s}=\frac{2\pi k}{NT_s}=\frac kN\,\Omega_s,\qquad f_k=\frac kN\,f_s,\qquad \Delta f=\frac{f_s}N=\frac1{NT_s}=\frac1{T_0}.
$$

- Bins $0\dots\frac N2$ span $0\dots\frac{f_s}2$; bins $\frac N2\dots N-1$ span $-\frac{f_s}2\dots0$, i.e. $f_k=(k-N)\frac{f_s}N$.
- One $2\pi$ period of the DTFT is one $f_s$ of physical frequency.
- This is exactly the ordering numpy.fft.fftfreq reports, and why spectrum tools show $0$ to $\frac{f_s}2$.

**Example:** $N=8$ samples at $f_s=8$ kHz gives $\Delta f=1$ kHz per bin.
` + fig("dft-hz") + r`
**Frequency resolution is the reciprocal of the record length**, $\Delta f=1/T_0$: to resolve two tones 1 Hz apart you need at least one second of data.

### The same derivation in Lathi's notation (CSE 311)

Approximate $G(f)=\int_0^{T_0}g(t)e^{-j2\pi ft}dt$ by a Riemann sum with step $T_s$ and evaluate at $f=qf_0$:

$$
G_q=\sum_{k=0}^{N_0-1}g_k\,e^{-jq\Omega_0k},\qquad g_k=T_sg(kT_s),\quad\Omega_0=2\pi f_0T_s=\frac{2\pi}{N_0},\quad f_0=\frac1{T_0}.
$$

$f_0=1/T_0$ because sampling the spectrum at spacing $f_0$ makes the time signal periodic with period $1/f_0$, and that period must be the record length $T_0$ so that copies do not overlap.

# Part IV — DFT properties

## Everything lives on a clock

The DFT only ever sees $N$ numbers, and synthesis rebuilds them $N$-periodically. So indices live on a clock: define

$$
((n))_N\triangleq n\bmod N,\qquad\text{e.g. }((9))_8=1,\ ((-1))_8=7 .
$$
` + fig("dft-clock") + r`
Tiling the $N$ samples forever gives the **periodic extension** $\tilde x[n]=x[((n))_N]$. It matches $x[n]$ on $0,\dots,N-1$ and is the copy the DFT really works with. **Nothing falls off the end of $N$ points; it wraps.** Every shift becomes a rotation of the clock.

## Two properties for free

- **Linearity.** $a\,x[n]+b\,y[n]\leftrightarrow a\,X[k]+b\,Y[k]$ (both sequences of length $N$; pad the shorter with zeros first).
- **Periodicity.** $W_N^{(k+N)n}=W_N^{kn}$, so $X[k+N]=X[k]$: the bins live on the same clock as the samples.

**The one proof move:** substitute into the DFT sum, re-index, and let the clock absorb whatever spills past the edge. Since both $\tilde x[n]$ and $W_N^{kn}$ are $N$-periodic, any $N$ consecutive terms give the same sum.

## Circular time shift

Shift the periodic extension by $m$ and substitute $r=n-m$:

$$
\sum_{n=0}^{N-1}\tilde x[n-m]W_N^{kn}=W_N^{km}\sum_{r=-m}^{N-1-m}\tilde x[r]W_N^{kr}=W_N^{km}X[k].
$$

The window slid to $r=-m,\dots,N-1-m$, but any $N$ consecutive terms give the same total.

$$
x[((n-m))_N]\ \leftrightarrow\ W_N^{km}X[k]=e^{-j\frac{2\pi}Nkm}X[k].
$$

$|W_N^{km}|=1$: a shift changes no magnitude, only phase. Where a signal sits in time lives entirely in the phase of $X[k]$.

## Frequency shift (modulation)

Multiply by a complex tone in time and the spectrum rotates:

$$
W_N^{-k_0n}x[n]=e^{j\frac{2\pi}Nk_0n}x[n]\ \leftrightarrow\ X[((k-k_0))_N].
$$

Special case $k_0=\frac N2$: $e^{j\pi n}=(-1)^n$. Flipping every other sign slides the spectrum by half the clock, so low and high frequencies trade places.
` + fig("dft-modulation") + r`
## Time reversal and conjugation

Reversal plays the clock backwards ($0$ stays, $1\leftrightarrow N-1$, $2\leftrightarrow N-2$, …). Substitute $r=-n$ and slide the window:

$$
x[((-n))_N]\ \leftrightarrow\ X[((-k))_N]=X[N-k].
$$

Conjugating the sum flips the kernel, $(W_N^{kn})^*=W_N^{-kn}$:

$$
x^*[n]\ \leftrightarrow\ X^*[((-k))_N]=X^*[N-k].
$$

### Real signals: conjugate symmetry

If $x$ is real then $x^*=x$, so its DFT must equal the conjugation result:

$$
\boxed{\,X[N-k]=X^*[k]\,}\qquad\Longrightarrow\qquad |X[N-k]|=|X[k]|\ (\text{even}),\quad\angle X[N-k]=-\angle X[k]\ (\text{odd}).
$$

Two symmetries about $k=\frac N2$. Only bins $0,\dots,\frac N2$ are free; the upper half mirrors them. Check on $\{1,2,3,4\}$: $X[3]=-2-2j=X^*[1]$. Corollary: real **and** even $\tilde x$ gives a real $X[k]$.
` + fig("dft-symmetry") + r`
This is why the fold picture works: bin $N-k$ is bin $k$'s negative-frequency partner.

## Parseval's relation

$$
\sum_{n=0}^{N-1}|x[n]|^2=\frac1N\sum_{k=0}^{N-1}|X[k]|^2 .
$$

*Proof:* replace $x^*[n]$ by the conjugated IDFT and swap the sums:

$$
\sum_nx[n]x^*[n]=\sum_nx[n]\frac1N\sum_kX^*[k]W_N^{kn}=\frac1N\sum_kX^*[k]\underbrace{\sum_nx[n]W_N^{kn}}_{X[k]}=\frac1N\sum_k|X[k]|^2 .
$$

Check on $\{1,2,3,4\}$: time side $1+4+9+16=30$; bin side $\frac{100+8+4+8}{4}=30$. ✓ The $N$ tones $W_N^{-kn}$ are orthogonal, so the DFT is a change of basis: it re-books energy, never creates or destroys it.

## The property table

| property | time domain | DFT domain |
|---|---|---|
| linearity | $a\,x[n]+b\,y[n]$ | $a\,X[k]+b\,Y[k]$ |
| circular time shift | $x[((n-m))_N]$ | $W_N^{km}X[k]$ |
| modulation | $W_N^{-k_0n}x[n]$ | $X[((k-k_0))_N]$ |
| time reversal | $x[((-n))_N]$ | $X[((-k))_N]$ |
| conjugation | $x^*[n]$ | $X^*[((-k))_N]$ |
| real signal | $x[n]$ real | $X[N-k]=X^*[k]$ |
| duality | $X[n]$ (bins replayed as a signal) | $N\,x[((-k))_N]$ |
| circular convolution | $(x\circledast h)[n]$ | $X[k]H[k]$ |
| multiplication | $x[n]h[n]$ | $\frac1N(X\circledast H)[k]$ |
| Parseval | $\sum_n\lvert x[n]\rvert^2$ | $\frac1N\sum_k\lvert X[k]\rvert^2$ |

# Part V — filtering with the DFT

## Why convolution matters

An LTI system is completely described by $h[n]$, and its output is the **linear** convolution $y[n]=\sum_mx[m]h[n-m]$. Lengths add: $L$ input samples and $M$ taps give $L+M-1$ outputs, at a direct cost of about $L\cdot M$ multiplications.

**The dream:** in every Fourier world so far, convolution in time became multiplication of spectra. If that held for the DFT, filtering would be: transform, multiply $N$ numbers, transform back. Does it hold? *Almost.*

## What multiplying DFTs actually does

Take two length-$N$ sequences, multiply their DFTs bin by bin, and invert:

$$
y[n]=\frac1N\sum_kX[k]H[k]W_N^{-kn}=\sum_{m=0}^{N-1}x[m]\underbrace{\frac1N\sum_kH[k]W_N^{-k(n-m)}}_{\text{IDFT of }H\text{ at }n-m}.
$$

But $n-m$ can be negative, and the IDFT evaluated off the grid returns the periodic extension, $\tilde h[n-m]=h[((n-m))_N]$:

$$
\boxed{\,y[n]=\sum_{m=0}^{N-1}x[m]\,h[((n-m))_N]=(x\circledast h)[n]\ \leftrightarrow\ X[k]H[k]\,}
$$

This is almost convolution, but the index into $h$ wraps around the clock. **Multiplying DFTs convolves circularly.**

## Circular vs linear, step by step

Running pair: $x=\{2,4,5,6,5,3,2,1\}$ ($L=8$), $h=\{1,2,1\}$ ($M=3$).

**Linear at $n=0$:** flipping $h$ puts taps at $m=0,-1,-2$. $x$ only exists for $m=0,\dots,7$, so the off-edge taps multiply nothing:

$$
y[0]=1\cdot x[0]+2\cdot x[-1]+1\cdot x[-2]=2 .
$$

**Circular at $n=0$:** indices are read on the clock, $((-1))_8=7$ and $((-2))_8=6$. The off-edge taps are not dropped; they **wrap** to the right and multiply the other end of $x$:

$$
y[0]=1\cdot x[0]+2\cdot x[7]+1\cdot x[6]=2+2+2=6 .
$$

**Equivalently, extend $x$ to the left:** the wrapped values are exactly what the periodic extension puts at $m=-1,-2$. Going round the wheel is walking along the unrolled $\tilde x$; the sliding $h$ grabs the previous lap's tail.
` + fig("dft-unroll") + r`
**Worked comparison.**

- Linear (length $8+3-1=10$): $\{2,8,15,20,22,19,13,8,4,1\}$.
- Circular (length 8): $\{6,9,15,20,22,19,13,8\}$.

Six values agree; the first two are corrupted, one per off-edge tap. Circular convolution is the linear result **folded mod $N$**: $6=2+4$ and $9=8+1$. This is **time aliasing**.
` + fig("dft-circ-vs-linear") + r`
## Zero-padding makes it linear

If the linear result fits inside $N$ points, nothing folds:

> **The zero-padding rule.** Pad both sequences to length $N\ge L+M-1$; then circular convolution equals linear convolution.

Padded to $N=10$, the previous lap now ends in zeros, the wrapped taps point at padded zeros, and the circular result is the linear list $\{2,8,15,\dots,4,1\}$. The zeros are not data; they are room for the tail. (In Part III padding bought finer DTFT samples; here it buys correctness.)
` + fig("dft-padded") + r`
## The filtering recipe

**Fast filtering with the DFT** (input length $L$, filter length $M$):

1. Choose $N\ge L+M-1$ and zero-pad both $x$ and $h$ to length $N$.
2. Compute $X[k]$ and $H[k]$ ($N$-point DFTs).
3. Multiply bin by bin: $Y[k]=X[k]H[k]$.
4. Invert: $y[n]=\text{IDFT}\{Y\}$; its first $L+M-1$ samples are the linear convolution.

*Honest accounting:* each direct DFT costs about $N^2$ multiplications, so today this loses to the direct $L\cdot M$ sum. The transform is the bottleneck, and the FFT (next topic) removes it.

## Exam pointers

- Know all three bridges: $X[k]=Na_k$, $c_k=X[k]/T_0$, $X[k]=X(e^{j2\pi k/N})$.
- When computing a small DFT by hand, write the $W_N^{kn}$ table first.
- Bin $k$ in hertz: $f_k=kf_s/N$ for $k\le N/2$, $(k-N)f_s/N$ above; resolution $1/T_0$.
- Choosing $T_s$ and $T_0$: $T_s<\frac1{2B}$ against aliasing; $T_0$ long enough for the resolution you need and to cover the signal (avoid leakage); $N=T_0/T_s$ a power of 2 for the FFT, using zero-padding if necessary.
`
