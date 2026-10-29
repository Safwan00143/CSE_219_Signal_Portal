import type { BookProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const fftBook: BookProblem[] = [
  {
    id: "bk-tan-4.21",
    topic: "fft",
    book: "Tan",
    ref: "Problem 4.21",
    prompt: r`Given a sequence $x(n)$ for $0\le n\le3$, where $x(0)=4$, $x(1)=3$, $x(2)=2$ and $x(3)=1$, evaluate its DFT $X(k)$ using the **decimation-in-frequency** FFT method, and determine the number of complex multiplications.`,
    solution: r`**Idea of DIF.** Split the **sum over $n$** into its first and second halves. For even and odd $k$ separately, the DFT becomes two $\frac N2$-point DFTs of:

$$a(n)=x(n)+x\left(n+\tfrac N2\right),\qquad b(n)=\left[x(n)-x\left(n+\tfrac N2\right)\right]W_N^n,\qquad n=0,\dots,\tfrac N2-1.$$

The DFT of $a$ gives the even bins $X(2m)$, and the DFT of $b$ gives the odd bins $X(2m+1)$.

For $N=4$: $W_4^0=1$ and $W_4^1=-j$.

**Stage 1**, combining samples 2 apart:

$$a(0)=4+2=6,\quad a(1)=3+1=4,\quad b(0)=(4-2)\cdot1=2,\quad b(1)=(3-1)(-j)=-j2.$$

**Stage 2**, two 2-point DFTs (sum and difference):

$$X(0)=a(0)+a(1)=10,\qquad X(2)=a(0)-a(1)=2,$$
$$X(1)=b(0)+b(1)=2-j2,\qquad X(3)=b(0)-b(1)=2+j2.$$
` + fig("bk-f-421") + r`
**Complex multiplications.** Each stage has $\frac N2$ butterflies with one twiddle each, and there are $\log_2N$ stages:

$$\frac N2\log_2N=2\times2=4.$$

That counts the trivial factors $W^0=1$. A direct DFT needs $N^2=16$. The saving grows quickly: for $N=1024$ it is about 5,120 against 1,048,576.`,
  },
  {
    id: "bk-tan-4.22",
    topic: "fft",
    book: "Tan",
    ref: "Problem 4.22",
    prompt: r`Given the DFT sequence $X(k)$ for $0\le k\le3$ obtained in Problem 4.21, namely $X=\{10,\ 2-j2,\ 2,\ 2+j2\}$, evaluate its inverse DFT $x(n)$ using the decimation-in-frequency FFT method.`,
    solution: r`The inverse DFT has exactly the same structure as the forward DFT:

$$x(n)=\frac1N\sum_kX(k)W_N^{-nk}.$$

So the same DIF flow graph works with two changes:
1. **conjugate every twiddle**, $W_N^n\to W_N^{-n}$ (here $W_4^{-1}=+j$);
2. **divide the outputs by $N$**.

**Stage 1**, on inputs 2 apart:
- $X(0)+X(2)=12$
- $X(1)+X(3)=4$
- $X(0)-X(2)=8$
- $\big[X(1)-X(3)\big]\cdot j=(-j4)(j)=4$

**Stage 2**, sums and differences: $16,\ 8,\ 12,\ 4$.

**Divide by 4.** These are $x(0)=4$, $x(2)=2$, $x(1)=3$, $x(3)=1$, in bit-reversed order.
` + fig("bk-f-422") + r`
So $x(n)=\{4,3,2,1\}$, the original sequence. ✓ No separate IFFT routine is needed. Many programs even compute it as $\frac1N\big(\text{FFT}\{X^*\}\big)^*$.`,
  },
  {
    id: "bk-tan-4.25",
    topic: "fft",
    book: "Tan",
    ref: "Problem 4.25",
    prompt: r`Given a sequence $x(n)$ for $0\le n\le3$, where $x(0)=4$, $x(1)=3$, $x(2)=2$ and $x(3)=1$, evaluate its DFT $X(k)$ using the **decimation-in-time** FFT method, and determine the number of complex multiplications.`,
    solution: r`**Idea of DIT.** Split the **input** into even- and odd-indexed samples:

$$X(k)=\underbrace{\sum_mx(2m)W_{N/2}^{mk}}_{G(k)}+W_N^k\underbrace{\sum_mx(2m+1)W_{N/2}^{mk}}_{H(k)}.$$

Then use the half-period symmetry: $G$ and $H$ repeat every $\frac N2$, and $W_N^{k+N/2}=-W_N^k$. So

$$X(k)=G(k)+W_N^kH(k),\qquad X\left(k+\tfrac N2\right)=G(k)-W_N^kH(k).$$

**Stage 1**, the 2-point DFTs of the even samples $\{4,2\}$ and the odd samples $\{3,1\}$:

$$G(0)=6,\quad G(1)=2,\qquad H(0)=4,\quad H(1)=2.$$

**Stage 2**, combining with the twiddles $W_4^0=1$ and $W_4^1=-j$:

$$X(0)=6+4=10,\qquad X(2)=6-4=2,$$
$$X(1)=2+(-j)(2)=2-j2,\qquad X(3)=2-(-j)(2)=2+j2.$$
` + fig("bk-f-425") + r`
The result is the same as with DIF (Problem 4.21), and again the cost is $\frac N2\log_2N=4$ complex multiplications.

**DIT and DIF compared.**
- DIT reorders the **inputs** (bit reversal), and DIF reorders the **outputs**.
- DIT multiplies by the twiddle **before** each butterfly's subtraction; DIF multiplies **after** it.`,
  },
  {
    id: "bk-tan-4.26",
    topic: "fft",
    book: "Tan",
    ref: "Problem 4.26",
    prompt: r`Given the DFT sequence $X(k)$ for $0\le k\le3$ computed in Problem 4.25, evaluate its inverse DFT $x(n)$ using the decimation-in-time FFT method.`,
    solution: r`Use the DIT graph with conjugated twiddles ($W_4^{-1}=j$), the inputs in bit-reversed order, and a final factor $\frac14$.

**Inputs in bit-reversed order:** $X(0)=10$, $X(2)=2$, $X(1)=2-j2$, $X(3)=2+j2$.

**Stage 1**, 2-point butterflies:
- $10+2=12$
- $10-2=8$
- $(2-j2)+(2+j2)=4$
- $(2-j2)-(2+j2)=-j4$

**Stage 2:**
- $x(0)=\frac14(12+4)=4$
- $x(2)=\frac14(12-4)=2$
- $x(1)=\frac14\big(8+j(-j4)\big)=\frac14(8+4)=3$
- $x(3)=\frac14(8-4)=1$
` + fig("bk-f-426") + r`
So $x(n)=\{4,3,2,1\}$. ✓`,
  },
  {
    id: "bk-tan-4.23",
    topic: "fft",
    book: "Tan",
    ref: "Problems 4.23–4.24",
    prompt: r`Given a sequence $x(n)$ for $0\le n\le3$, where $x(0)=0.8$, $x(1)=0.6$, $x(2)=0.4$ and $x(3)=0.2$:

(a) evaluate its DFT $X(k)$ using the decimation-in-frequency FFT method, and determine the number of complex multiplications;

(b) evaluate the inverse DFT of the result using the decimation-in-frequency FFT method.`,
    solution: r`**(a) Stage 1** (DIF, samples 2 apart):

$$a(0)=0.8+0.4=1.2,\quad a(1)=0.6+0.2=0.8,\quad b(0)=0.4,\quad b(1)=(0.6-0.2)(-j)=-j0.4.$$

**Stage 2:**

$$X(0)=2,\quad X(2)=0.4,\quad X(1)=0.4-j0.4,\quad X(3)=0.4+j0.4.$$

Again 4 complex multiplications.
` + fig("bk-f-423") + r`
**(b)** Inverse DIF, with $W_4^{-1}=j$ and $\times\frac14$:
- Stage 1: $X(0)+X(2)=2.4$, $X(1)+X(3)=0.8$, $X(0)-X(2)=1.6$, $\big[X(1)-X(3)\big]j=(-j0.8)(j)=0.8$.
- Stage 2: $3.2,\ 1.6,\ 2.4,\ 0.8$.
- Divide by 4: $x(0)=0.8$, $x(2)=0.4$, $x(1)=0.6$, $x(3)=0.2$. ✓

This sequence is exactly $0.2\times\{4,3,2,1\}$, the data of Problem 4.21. The FFT is linear, so every output is $0.2\times$ the earlier one: $10\to2$, $2-j2\to0.4-j0.4$, and so on. Spotting that saves the whole calculation.`,
  },
  {
    id: "bk-tan-4.27",
    topic: "fft",
    book: "Tan",
    ref: "Problems 4.27–4.28",
    prompt: r`Given a sequence $x(n)$ for $0\le n\le3$, where $x(0)=0.8$, $x(1)=0.4$, $x(2)=-0.4$ and $x(3)=-0.2$:

(a) evaluate its DFT $X(k)$ using the decimation-in-time FFT method;

(b) evaluate the inverse DFT of the result using the decimation-in-time FFT method.`,
    solution: r`**(a)** Bit-reversed inputs: $x(0)=0.8$, $x(2)=-0.4$, $x(1)=0.4$, $x(3)=-0.2$.

- **Stage 1:** $G(0)=0.4$, $G(1)=1.2$, $H(0)=0.2$, $H(1)=0.6$.
- **Stage 2:**

$$X(0)=0.4+0.2=0.6,\qquad X(2)=0.4-0.2=0.2,$$
$$X(1)=1.2+(-j)(0.6)=1.2-j0.6,\qquad X(3)=1.2+j0.6.$$
` + fig("bk-f-427") + r`
**(b)** Inverse DIT. Inputs in bit-reversed order: $0.6,\ 0.2,\ 1.2-j0.6,\ 1.2+j0.6$.

- **Stage 1:** $0.8,\ 0.4,\ 2.4,\ -j1.2$.
- **Stage 2**, with $W_4^{-1}=j$:
  - $x(0)=\frac14(0.8+2.4)=0.8$
  - $x(2)=\frac14(0.8-2.4)=-0.4$
  - $x(1)=\frac14\big(0.4+j(-j1.2)\big)=\frac14(1.6)=0.4$
  - $x(3)=\frac14(0.4-1.2)=-0.2$

So $x(n)=\{0.8,0.4,-0.4,-0.2\}$. ✓

Check (a) with two easy bins: $X(0)=\sum x=0.6$ and $X(2)=\sum(-1)^nx=0.8-0.4-0.4+0.2=0.2$. ✓`,
  },
  {
    id: "bk-tan-sec4.5",
    topic: "fft",
    book: "Tan",
    ref: "Section 4.5 (8-point FFT)",
    prompt: r`Tan's Section 4.5 builds the radix-2 FFT for $N=8$.

(a) In the eight-point decimation-in-time FFT, in what order must the input samples $x(0),\dots,x(7)$ be applied? Explain the rule.

(b) How many stages and butterflies does the eight-point FFT have, and how many complex multiplications does it need, compared with a direct DFT?

(c) Repeat the multiplication count for $N=1024$ and state the speed-up.`,
    solution: r`**(a) Bit-reversed order.** DIT splits the input into even and odd samples, then splits each half again, three times in all for $N=8=2^3$. Each split sorts by one more bit of the index, starting from the **least** significant bit. The net effect is that sample $n$ ends up in position "$n$ written backwards in binary":

| $n$ | binary | reversed | position |
|---|---|---|---|
| 0 | 000 | 000 | 0 |
| 1 | 001 | 100 | 4 |
| 2 | 010 | 010 | 2 |
| 3 | 011 | 110 | 6 |
| 4 | 100 | 001 | 1 |
| 5 | 101 | 101 | 5 |
| 6 | 110 | 011 | 3 |
| 7 | 111 | 111 | 7 |

So the input order is $x(0),x(4),x(2),x(6),x(1),x(5),x(3),x(7)$, and the outputs $X(0),\dots,X(7)$ come out in natural order. (DIF does the opposite: natural input order, bit-reversed outputs.)
` + fig("fft-dit-8") + r`
**(b)** There are $\log_2N=3$ stages, each with $\frac N2=4$ butterflies, so 12 butterflies in all. Each butterfly has one complex multiplication by a twiddle factor:

$$\frac N2\log_2N=4\times3=12\ \text{multiplications},\qquad\text{against }N^2=64\text{ for the direct DFT}.$$

Several of the 12 are trivial ($W^0=1$, $W^2=-j$), so a careful program does even fewer.

**(c)** For $N=1024=2^{10}$:

$$\frac{1024}{2}\times10=5120\quad\text{against}\quad1024^2=1{,}048{,}576,$$

a speed-up of about $\frac{N}{\frac12\log_2N}=\frac{2N}{\log_2N}\approx205$ times. The ratio keeps growing with $N$, which is why spectral analysis of long records is only practical with the FFT.`,
  },
  {
    id: "bk-tan-4.13",
    topic: "fft",
    book: "Tan",
    ref: "Problem 4.13",
    prompt: r`We use the DFT to compute the amplitude spectrum of a sampled data sequence with a sampling rate $f_s=2000$ Hz. It requires the frequency resolution to be less than 0.5 Hz. Determine the number of data points used by the FFT algorithm and the actual frequency resolution in Hz, assuming that the data samples are available for selecting the number of data points.`,
    solution: r`The resolution of an $N$-point DFT is $\Delta f=\frac{f_s}{N}$. We need

$$\frac{2000}{N}<0.5\ \Rightarrow\ N>4000.$$

A radix-2 FFT needs $N$ to be a **power of 2**. The smallest power of 2 above 4000 is

$$N=2^{12}=4096.$$

The actual resolution is

$$\Delta f=\frac{2000}{4096}=0.488\ \text{Hz}<0.5\ \text{Hz}.\ ✓$$

This corresponds to $\frac{4096}{2000}=2.048$ s of data. If only 4000 samples had been recorded, we would append 96 zeros to reach 4096. The FFT would run, but the true resolution is set by the 2-second record, not by the padding.`,
  },
  {
    id: "bk-tan-4.37",
    topic: "fft",
    book: "Tan",
    ref: "Problem 4.37",
    prompt: r`Consider a sequence $x(n)$ defined for $0\le n<N$, where $N$ is even:

$$x(n)=\begin{cases}1,&n\text{ even}\\0,&n\text{ odd.}\end{cases}$$

Show that

$$X(k)=\begin{cases}N/2,&k=0,\ k=N/2\\0,&\text{elsewhere.}\end{cases}$$`,
    solution: r`**Step 1: keep only the even samples.** The odd samples are zero, so only $n=2m$ (with $m=0,1,\dots,\frac N2-1$) contribute:

$$
X(k)=\sum_{m=0}^{N/2-1}1\cdot W_N^{2mk}
$$

**Step 2: simplify the twiddle factor.**

$$
W_N^{2mk}=e^{-j\frac{2\pi}{N}2mk}=e^{-j\frac{2\pi}{N/2}mk}=W_{N/2}^{mk}
$$

So

$$
X(k)=\sum_{m=0}^{N/2-1}W_{N/2}^{mk}
$$

**Step 3: recognise it.** This is the $\frac N2$-point DFT of a sequence of ones. By Problem 4.36:

- it equals $\frac N2$ when $k$ is a multiple of $\frac N2$;
- it equals $0$ otherwise.

**Step 4: list the bins.** Between $0$ and $N-1$, the multiples of $\frac N2$ are $k=0$ and $k=\frac N2$:

$$
X(k)=\begin{cases}N/2,&k=0\ \text{or}\ k=N/2\\0,&\text{otherwise}\end{cases}\qquad\blacksquare
$$
` + fig("bk-f-437") + r`
**Another way to see it.** Write the sequence as

$$
x(n)=\tfrac12\big(1+(-1)^n\big)
$$

- The constant $\frac12$ gives a spike at $k=0$.
- $(-1)^n=e^{j\pi n}$ gives a spike at $k=\frac N2$.

**FFT connection.** The even-sample sum repeats in $k$ every $\frac N2$, so it only needs computing for half the bins. That reuse is exactly what makes the FFT fast.`,
  },
  {
    id: "bk-tan-4.20",
    topic: "fft",
    book: "Tan",
    ref: "Problem 4.20",
    prompt: r`Given the sinusoid

$$x(n)=2\sin\left(2000\times2\pi\times\frac{n}{8000}\right)$$

obtained by using a sampling rate of $f_s=8000$ Hz, we apply the DFT to compute the amplitude spectrum.

(a) Determine the frequency resolution when the data length is 100 samples. Without using a window function, is there any spectral leakage in the computed spectrum? Explain.

(b) Determine the frequency resolution when the data length is 73 samples. Without using a window function, is there any spectral leakage in the computed spectrum? Explain.`,
    solution: r`The tone is at $f=2000$ Hz, i.e. $\frac{2000}{8000}=\frac14$ cycle per sample, or one cycle every 4 samples.

**When does leakage occur?** The DFT treats the $N$ samples as one period of a periodic signal. If the record holds a **whole number of cycles**, this periodic extension is a perfect sinusoid, and the tone falls exactly on a bin. Otherwise the extension has a jump, and energy spreads ("leaks") into every bin.

**(a)** $N=100$:
- $\Delta f=\frac{8000}{100}=80$ Hz.
- The tone sits at $\frac{2000}{80}=25$, exactly bin 25.
- The record holds $\frac{100}{4}=25$ whole cycles.
- **No leakage**: the amplitude spectrum shows a single clean line at 2000 Hz.

**(b)** $N=73$:
- $\Delta f=\frac{8000}{73}\approx109.6$ Hz.
- The tone sits at $\frac{2000}{109.6}\approx18.25$, between bins 18 and 19.
- The record holds $18.25$ cycles, not a whole number.
- **Leakage occurs**: the peak is spread over neighbouring bins and lowered, and small values appear everywhere.
` + fig("bk-f-420") + r`
In practice the signal frequency is unknown, so leakage is the normal case. That is why window functions (Hamming, Hann) are applied before the FFT.`,
  },
]
