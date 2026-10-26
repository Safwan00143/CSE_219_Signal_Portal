import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const dftBook: BookProblem[] = [
  {
    id: "bk-opp-5.1",
    topic: "dtft-dft",
    book: "Oppenheim",
    ref: "Problem 5.1",
    prompt: r`Use the Fourier transform analysis equation to calculate the Fourier transforms of:

(a) $\left(\tfrac12\right)^{n-1}u[n-1]$  (b) $\left(\tfrac12\right)^{|n-1|}$

Sketch and label one period of the magnitude of each Fourier transform.`,
    solution: r`Use $X(e^{j\omega})=\sum_nx[n]e^{-j\omega n}$ and the geometric series $\sum_{m\ge0}r^m=\frac{1}{1-r}$ for $|r|<1$.

**(a)** Substitute $m=n-1$:

$$X(e^{j\omega})=\sum_{n=1}^{\infty}\left(\tfrac12\right)^{n-1}e^{-j\omega n}=e^{-j\omega}\sum_{m=0}^{\infty}\left(\tfrac12e^{-j\omega}\right)^m=\frac{e^{-j\omega}}{1-\frac12e^{-j\omega}}.$$

For the magnitude, use $|1-\tfrac12e^{-j\omega}|^2=1-\cos\omega+\tfrac14$:

$$|X(e^{j\omega})|=\frac{1}{\sqrt{\frac54-\cos\omega}}.$$

This is $2$ at $\omega=0$ and $\tfrac23$ at $\omega=\pm\pi$.

**(b)** Again let $m=n-1$. The two-sided sum splits at $m=0$:

$$\sum_m\left(\tfrac12\right)^{|m|}e^{-j\omega m}=\frac{1}{1-\frac12e^{-j\omega}}+\frac{\frac12e^{j\omega}}{1-\frac12e^{j\omega}}=\frac{1-\frac14}{\frac54-\cos\omega}.$$

So

$$X(e^{j\omega})=e^{-j\omega}\frac{3/4}{\frac54-\cos\omega},\qquad|X|=\frac{3/4}{\frac54-\cos\omega}.$$

This is $3$ at $\omega=0$ and $\tfrac13$ at $\omega=\pm\pi$.
` + fig("bk-d-51") + r`
Like every DTFT, both are periodic in $\omega$ with period $2\pi$. The sketch of one period, $-\pi<\omega\le\pi$, says everything.`,
  },
  {
    id: "bk-opp-5.3",
    topic: "dtft-dft",
    book: "Oppenheim",
    ref: "Problem 5.3",
    prompt: r`Determine the Fourier transform for $-\pi\le\omega<\pi$ in the case of each of the following periodic signals:

(a) $\sin\left(\frac\pi3n+\frac\pi4\right)$  (b) $2+\cos\left(\frac\pi6n+\frac\pi8\right)$`,
    solution: r`As in continuous time, $e^{j\omega_0n}\leftrightarrow2\pi\delta(\omega-\omega_0)$, but in discrete time this pattern **repeats every $2\pi$**. Within $-\pi\le\omega<\pi$ we only list the copies that land there.

**(a)**

$$\sin\left(\tfrac\pi3n+\tfrac\pi4\right)=\frac{e^{j\pi/4}e^{j\frac\pi3n}-e^{-j\pi/4}e^{-j\frac\pi3n}}{2j}.$$

$$X(e^{j\omega})=\frac{\pi}{j}\left[e^{j\pi/4}\delta\left(\omega-\tfrac\pi3\right)-e^{-j\pi/4}\delta\left(\omega+\tfrac\pi3\right)\right],\quad-\pi\le\omega<\pi.$$

**(b)** The constant 2 gives $2\cdot2\pi\delta(\omega)$:

$$X(e^{j\omega})=4\pi\delta(\omega)+\pi e^{j\pi/8}\delta\left(\omega-\tfrac\pi6\right)+\pi e^{-j\pi/8}\delta\left(\omega+\tfrac\pi6\right),\quad-\pi\le\omega<\pi.$$
` + fig("bk-d-53"),
  },
  {
    id: "bk-opp-5.5",
    topic: "dtft-dft",
    book: "Oppenheim",
    ref: "Problem 5.5",
    prompt: r`Use the Fourier transform synthesis equation to determine the inverse Fourier transform of $X(e^{j\omega})=|X(e^{j\omega})|e^{j\angle X(e^{j\omega})}$, where

$$|X(e^{j\omega})|=\begin{cases}1,&0\le|\omega|<\frac\pi4\\0,&\frac\pi4\le|\omega|\le\pi\end{cases}\qquad\angle X(e^{j\omega})=-\frac{3\omega}{2}.$$

Use your answer to determine the values of $n$ for which $x[n]=0$.`,
    solution: r`The synthesis equation integrates over one period:

$$x[n]=\frac1{2\pi}\int_{-\pi/4}^{\pi/4}e^{-j\frac32\omega}e^{j\omega n}d\omega=\frac1{2\pi}\int_{-\pi/4}^{\pi/4}e^{j\omega(n-\frac32)}d\omega=\frac{\sin\left(\frac\pi4\left(n-\frac32\right)\right)}{\pi\left(n-\frac32\right)}.$$

This is an ideal low-pass impulse response (cutoff $\frac\pi4$), delayed by $\frac32$ samples. In continuous time that would be an ordinary delay. In discrete time a **non-integer** delay means the sinc is centred *between* samples.

**When is $x[n]=0$?** We would need $\frac\pi4\left(n-\frac32\right)=k\pi$ with $k\ne0$, i.e. $n=\frac32+4k$. But $\frac32+4k$ is never an integer. The denominator is never zero either, so

$$x[n]\ne0\quad\text{for every integer }n.$$
` + fig("bk-d-55") + r`
Compare with the continuous-time version (Problem 4.5), where the zeros are real points in time. Sampling misses them all here.`,
  },
  {
    id: "bk-opp-5.10",
    topic: "dtft-dft",
    book: "Oppenheim",
    ref: "Problem 5.10",
    prompt: r`Use the tables of DTFT properties and pairs, in conjunction with the fact that

$$X(e^{j0})=\sum_{n=-\infty}^{\infty}x[n],$$

to determine the numerical value of $A=\displaystyle\sum_{n=0}^{\infty}n\left(\tfrac12\right)^n$.`,
    solution: r`Recognise $A$ as a DTFT evaluated at $\omega=0$. Let $x[n]=\left(\frac12\right)^nu[n]$, so

$$X(e^{j\omega})=\frac{1}{1-\frac12e^{-j\omega}}.$$

**Differentiation in frequency:** $nx[n]\leftrightarrow j\frac{dX}{d\omega}$. So

$$A=\sum_nnx[n]=j\frac{dX(e^{j\omega})}{d\omega}\Big|_{\omega=0}.$$

Differentiate:

$$\frac{dX}{d\omega}=-\frac{\frac12je^{-j\omega}}{\left(1-\frac12e^{-j\omega}\right)^2}\ \Rightarrow\ \frac{dX}{d\omega}\Big|_{0}=-\frac{j/2}{(1/2)^2}=-2j.$$

$$A=j(-2j)=\boxed{2}$$

Check with the direct formula $\sum nr^n=\frac{r}{(1-r)^2}=\frac{1/2}{1/4}=2$. ✓`,
  },
  {
    id: "bk-tan-4.1",
    topic: "dtft-dft",
    book: "Tan",
    ref: "Problem 4.1",
    prompt: r`Given a sequence $x(n)$ for $0\le n\le3$, where $x(0)=1$, $x(1)=1$, $x(2)=-1$ and $x(3)=0$, compute its DFT $X(k)$.`,
    solution: r`For $N=4$, $W_4=e^{-j2\pi/4}=-j$, so the powers cycle through $1,-j,-1,j$:

$$X(k)=\sum_{n=0}^{3}x(n)W_4^{nk}=x(0)+x(1)(-j)^k+x(2)(-1)^k+x(3)(j)^k.$$

| $k$ | calculation | $X(k)$ |
|---|---|---|
| 0 | $1+1-1+0$ | $1$ |
| 1 | $1+1(-j)-1(-1)+0$ | $2-j$ |
| 2 | $1+1(-1)-1(1)+0$ | $-1$ |
| 3 | $1+1(j)-1(-1)+0$ | $2+j$ |

Checks:
- $X(0)=\sum x(n)=1$. ✓
- $x$ is real, so $X(3)=X^*(1)$. ✓
- $X(2)=\sum(-1)^nx(n)$, the alternating sum, equals $-1$. ✓
` + fig("bk-d-41"),
  },
  {
    id: "bk-tan-4.5",
    topic: "dtft-dft",
    book: "Tan",
    ref: "Problems 4.2 & 4.5",
    prompt: r`For the sequence $x(0)=4$, $x(1)=3$, $x(2)=2$, $x(3)=1$, the 4-point DFT is

$$X(0)=10,\quad X(1)=2-j2,\quad X(2)=2,\quad X(3)=2+j2.$$

Evaluate the inverse DFT of these coefficients and confirm that it returns $x(n)$.`,
    solution: r`The inverse DFT uses the conjugate twiddle factor $W_4^{-1}=j$ and the factor $\frac1N$:

$$x(n)=\frac14\sum_{k=0}^{3}X(k)\,j^{nk}.$$

| $n$ | $\frac14\big[X(0)+X(1)j^n+X(2)(-1)^n+X(3)(-j)^n\big]$ | $x(n)$ |
|---|---|---|
| 0 | $\frac14\big[10+(2-2j)+2+(2+2j)\big]=\frac{16}4$ | $4$ |
| 1 | $\frac14\big[10+(2-2j)j-2+(2+2j)(-j)\big]=\frac14\big[10+(2j+2)-2+(-2j+2)\big]$ | $3$ |
| 2 | $\frac14\big[10-(2-2j)+2-(2+2j)\big]$ | $2$ |
| 3 | $\frac14\big[10+(2-2j)(-j)-2+(2+2j)(j)\big]=\frac14\big[10+(-2j-2)-2+(2j-2)\big]$ | $1$ |

So $x(n)=\{4,3,2,1\}$. ✓

The imaginary parts cancel at every $n$, as they must for a real sequence. The conjugate pair $X(1)$, $X(3)$ always combines into a real term.`,
  },
  {
    id: "bk-tan-4.6",
    topic: "dtft-dft",
    book: "Tan",
    ref: "Problem 4.6",
    prompt: r`Given a sequence $x(n)$, where $x(0)=4$, $x(1)=3$, $x(2)=2$ and $x(3)=1$, with the last two data zero padded as $x(4)=0$ and $x(5)=0$, evaluate its DFT $X(k)$.`,
    solution: r`Now $N=6$ and $W_6=e^{-j\pi/3}$. The padded zeros add nothing to the sum:

$$X(k)=\sum_{n=0}^{3}x(n)e^{-j\pi nk/3}=4+3e^{-j\pi k/3}+2e^{-j2\pi k/3}+e^{-j\pi k}.$$

Use $e^{-j\pi/3}=\frac12-j\frac{\sqrt3}2$ and $e^{-j2\pi/3}=-\frac12-j\frac{\sqrt3}2$. For $k=1$:

$$X(1)=4+3\left(\tfrac12-j\tfrac{\sqrt3}2\right)+2\left(-\tfrac12-j\tfrac{\sqrt3}2\right)-1=3.5-j4.330.$$

| $k$ | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| $X(k)$ | $10$ | $3.5-j4.330$ | $2.5-j0.866$ | $2$ | $2.5+j0.866$ | $3.5+j4.330$ |
| $\vert X(k)\vert $ | 10 | 5.568 | 2.646 | 2 | 2.646 | 5.568 |

**Compare with the 4-point DFT** $\{10,\,2-j2,\,2,\,2+j2\}$:
- $X(0)=10$ and the value at $\Omega=\pi$ (bin 2 of 4, bin 3 of 6) agree.
- The other bins differ only because they sample **different frequencies** of the same DTFT.
` + fig("bk-d-46") + r`
Zero padding makes the frequency grid finer ($\frac{2\pi}6$ instead of $\frac{2\pi}4$). It does not add resolution, because the underlying data are the same 4 samples.`,
  },
  {
    id: "bk-tan-4.10",
    topic: "dtft-dft",
    book: "Tan",
    ref: "Problems 4.10 & 4.12",
    prompt: r`(a) A digital sequence is sampled at 20,000 Hz. If we use the 8000-point DFT to compute the spectrum, determine the frequency resolution and the folding frequency.

(b) Repeat for a sequence sampled at 16,000 Hz and analysed with a 4000-point DFT.`,
    solution: r`Bin $k$ of an $N$-point DFT corresponds to the frequency $f_k=\frac{kf_s}{N}$. So:
- the **frequency resolution**, the spacing between bins, is $\Delta f=\frac{f_s}{N}$;
- the **folding frequency** (the Nyquist limit), above which the bins mirror the lower half, is $\frac{f_s}2$.

**(a)**

$$\Delta f=\frac{20000}{8000}=2.5\ \text{Hz},\qquad f_{\text{fold}}=\frac{20000}{2}=10000\ \text{Hz}.$$

Only bins $k=0,\dots,4000$ carry independent information about $0$–$10$ kHz.

**(b)**

$$\Delta f=\frac{16000}{4000}=4\ \text{Hz},\qquad f_{\text{fold}}=8000\ \text{Hz}.$$

Note that $\Delta f=\frac1{NT}$ is the reciprocal of the **record length**, $0.4$ s in (a) and $0.25$ s in (b). To resolve finer detail you must observe the signal for longer. Raising $f_s$ with $N$ fixed makes the resolution worse.`,
  },
  {
    id: "bk-tan-4.14",
    topic: "dtft-dft",
    book: "Tan",
    ref: "Problem 4.14",
    prompt: r`Given the sequence below and assuming $f_s=100$ Hz, compute the amplitude spectrum, phase spectrum and power spectrum.
` + fig("bk-d-414"),
    solution: r`One period holds $N=4$ samples: $x=\{4,-1,2,1\}$. With $W_4=-j$:

| $k$ | $X(k)$ | $\vert X(k)\vert $ | $\phi_k$ |
|---|---|---|---|
| 0 | $4-1+2+1=6$ | 6 | $0^\circ$ |
| 1 | $4-1(-j)+2(-1)+1(j)=2+j2$ | $2\sqrt2$ | $45^\circ$ |
| 2 | $4-1(-1)+2(1)+1(-1)=6$ | 6 | $0^\circ$ |
| 3 | $2-j2$ | $2\sqrt2$ | $-45^\circ$ |

Tan's definitions: amplitude $A_k=\frac1N|X(k)|$, phase $\phi_k=\angle X(k)$, power $P_k=\frac1{N^2}|X(k)|^2$. The bin spacing is $\Delta f=\frac{100}4=25$ Hz.

| $k$ | $f$ (Hz) | $A_k$ | $\phi_k$ | $P_k$ |
|---|---|---|---|---|
| 0 | 0 | 1.5 | $0^\circ$ | 2.25 |
| 1 | 25 | 0.7071 | $45^\circ$ | 0.5 |
| 2 | 50 | 1.5 | $0^\circ$ | 2.25 |
| 3 | 75 | 0.7071 | $-45^\circ$ | 0.5 |
` + fig("bk-d-414-sol") + r`
Checks:
- $A_0=1.5$ is the mean of the samples, $\frac{6}{4}$.
- By Parseval, $\sum P_k=5.5=\frac14(16+1+4+1)$, the average power. ✓`,
  },
  {
    id: "bk-tan-4.34",
    topic: "dtft-dft",
    book: "Tan",
    ref: "Problems 4.33–4.34",
    prompt: r`(a) Show that $W_N^N=1$, $W_N^{N/2}=-1$, $W_N^{N/4}=-j$, and $W_N^{-m}=W_N^{N-m}$, where $W_N=e^{-j2\pi/N}$.

(b) For a real sequence $x(n)$ defined for $0\le n<N$, show that $X(N-k)=X^*(k)$.`,
    solution: r`**(a)** Each identity is a point on the unit circle:

- $W_N^N=e^{-j2\pi}=1$: a full turn.
- $W_N^{N/2}=e^{-j\pi}=-1$: half a turn.
- $W_N^{N/4}=e^{-j\pi/2}=-j$: a quarter turn, clockwise.
- $W_N^{N-m}=W_N^N\,W_N^{-m}=W_N^{-m}$: exponents only matter modulo $N$.

**(b)** Write out $X(N-k)$ and use $W_N^{nN}=1$:

$$X(N-k)=\sum_{n=0}^{N-1}x(n)W_N^{n(N-k)}=\sum_{n=0}^{N-1}x(n)W_N^{-nk}.$$

For real $x(n)$, conjugating $X(k)=\sum x(n)W_N^{nk}$ changes only the twiddle factor, since $\left(W_N^{nk}\right)^*=W_N^{-nk}$:

$$X^*(k)=\sum_{n=0}^{N-1}x(n)W_N^{-nk}=X(N-k).\ \blacksquare$$

**Why it matters:**
- For real data only bins $0$ to $N/2$ are independent; the rest are mirror images. Hence the "one-sided spectrum".
- It also halves the work when computing a real FFT.
- Check it in Problem 4.1: $X(3)=2+j=(2-j)^*=X^*(1)$.`,
  },
  {
    id: "bk-tan-4.36",
    topic: "dtft-dft",
    book: "Tan",
    ref: "Problems 4.35–4.36",
    prompt: r`(a) For $x(n)=\delta(n-m)$ defined for $0\le n,m<N$, show that $X(k)=W_N^{km}$.

(b) For $x(n)=1$ defined for $0\le n<N$, show that

$$X(k)=\begin{cases}N,&k=0\\0,&\text{elsewhere.}\end{cases}$$`,
    solution: r`**(a)** Only the term $n=m$ survives the sum:

$$X(k)=\sum_{n=0}^{N-1}\delta(n-m)W_N^{nk}=W_N^{mk}=e^{-j2\pi km/N}.$$

Its magnitude is 1 at every bin: a single spike has a flat spectrum. The delay $m$ shows up only as a linear phase, $-\frac{2\pi km}{N}$.

**(b)** $X(k)=\sum_{n=0}^{N-1}\left(W_N^k\right)^n$ is a geometric series with ratio $W_N^k$.

- $k=0$: the ratio is 1, so $X(0)=\sum1=N$.
- $k=1,\dots,N-1$: the ratio is $\ne1$, so
$$X(k)=\frac{1-W_N^{kN}}{1-W_N^k}=\frac{1-1}{1-W_N^k}=0.$$

These two results are duals of each other: a spike in time is flat in frequency, and a constant in time is a spike in frequency. The $N$ twiddle factors $W_N^{nk}$ for $k\ne0$ are equally spaced around the unit circle, so they add to zero.`,
  },
  {
    id: "bk-tan-4.38",
    topic: "dtft-dft",
    book: "Tan",
    ref: "Problem 4.38",
    prompt: r`A sequence is given by

$$x(n)=\frac12\left(1-\cos\frac{2\pi n}{N}\right)\quad\text{for }0\le n<N.$$

Show that its DFT is

$$X(k)=\begin{cases}N/2,&k=0\\-N/4,&k=1,\ k=N-1\\0,&\text{elsewhere.}\end{cases}$$`,
    solution: r`Write the cosine as exponentials. Each term is then a DFT we already know:

$$x(n)=\frac12-\frac14e^{j2\pi n/N}-\frac14e^{-j2\pi n/N}.$$

**Building block:** $e^{j2\pi mn/N}=W_N^{-mn}$ transforms to

$$\sum_nW_N^{n(k-m)}=N\delta\big((k-m)\bmod N\big).$$

This follows from Problem 4.36 with the bins shifted by $m$: modulation in time is a circular shift in frequency.

Apply it term by term:
- $\frac12\to\frac N2$ at $k=0$;
- $-\frac14e^{j2\pi n/N}$ ($m=1$) $\to-\frac N4$ at $k=1$;
- $-\frac14e^{-j2\pi n/N}$ ($m=-1\equiv N-1$) $\to-\frac N4$ at $k=N-1$.

$$X(k)=\begin{cases}N/2,&k=0\\-N/4,&k=1,\ N-1\\0,&\text{otherwise.}\ \blacksquare\end{cases}$$
` + fig("bk-d-438") + r`
This is the **Hann window**. Multiplying data by it in time convolves their DFT with the three-tap kernel $\{-\tfrac14,\tfrac12,-\tfrac14\}$, scaled by $N$. Each spectral line gets slightly smeared, but leakage from far-away bins is strongly reduced.`,
  },
]
