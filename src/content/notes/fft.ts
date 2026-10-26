const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

export const fftNote = r`
## Recap: four views of the DFT

- **Periodic, view 1:** the DFT evaluates the Fourier series coefficients of a sampled periodic signal.
- **Periodic, view 2:** it gives the $N$ unique values of the Fourier series of a discrete-time periodic signal.
- **Aperiodic, view 1:** it gives samples of the continuous-time Fourier transform of a sampled aperiodic signal.
- **Aperiodic, view 2:** it gives samples of the DTFT of a finite-length sequence.

(And, as we will see in Sampling, if the original continuous signal is band-limited we can recover it from the DFT.)

# Part I — the need for speed

## Naive evaluation of the DFT

$$
X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn},\qquad W_N=e^{-j\frac{2\pi}N}.
$$

For **each** of the $N$ values of $k$ we need $N$ complex multiplications and $N-1$ complex additions. All $N$ outputs therefore cost

$$
N^2\ \text{multiplications},\qquad N(N-1)\ \text{additions}\qquad\Rightarrow\qquad O(N^2).
$$

**Why that is a problem.** One second of audio sampled at 44.1 kHz has $N=44\,100$. The naive DFT needs about $N^2\approx2\times10^9$ operations, which makes spectral analysis impossibly slow.

## A brief history

- **1805, Carl Friedrich Gauss** developed the radix-2 algorithm to interpolate asteroid orbits, more than a decade before Fourier's work on harmonic analysis. He left it as an unpublished note.
- **1965, James Cooley and John Tukey** independently rediscovered it at IBM and Princeton. Their landmark paper launched modern digital signal processing.

Many variants exist; we study the **Cooley–Tukey** FFT.

## The idea

The Cooley–Tukey FFT is an $O(N\log N)$ algorithm that exploits two facts about the twiddle factor:

$$
W_N^{k+N}=W_N^k\ \ (\text{periodicity}),\qquad W_N^{k+N/2}=W_N^ke^{-j\pi}=-W_N^k\ \ (\text{symmetry}),\qquad W_N^2=W_{N/2}.
$$

The **radix-2** algorithm successively splits an $N$-point DFT into two $\frac N2$-point DFTs. It assumes $N$ is a power of 2 (otherwise zero-pad). There are two variants: **decimation in time** (DIT) and **decimation in frequency** (DIF).

# Part II — radix-2 decimation in time

## Split the input into even and odd samples

$$
X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn}=\sum_{r=0}^{N/2-1}x[2r]W_N^{2rk}+\sum_{r=0}^{N/2-1}x[2r+1]W_N^{(2r+1)k}.
$$

Since $W_N^{2rk}=e^{-j\frac{2\pi}N2rk}=e^{-j\frac{2\pi}{N/2}rk}=W_{N/2}^{rk}$:

$$
X[k]=\underbrace{\sum_{r=0}^{N/2-1}x[2r]W_{N/2}^{rk}}_{\frac N2\text{-point DFT of evens}}+W_N^k\underbrace{\sum_{r=0}^{N/2-1}x[2r+1]W_{N/2}^{rk}}_{\frac N2\text{-point DFT of odds}} .
$$

So an $N$-point DFT can be computed from two $\frac N2$-point DFTs. Define

$$
G[k]=\text{DFT}_{N/2}\{x[2r]\},\qquad H[k]=\text{DFT}_{N/2}\{x[2r+1]\}.
$$

## From $\frac N2$ points back to $N$ points

$G$ and $H$ are defined for $0\le k<\frac N2$, but as $\frac N2$-point DFTs they are $\frac N2$-periodic: $G[k+\frac N2]=G[k]$, $H[k+\frac N2]=H[k]$. Copying the first half to the second, $X[k]=G[k]+W_N^kH[k]$ for all $k$.

We can do better. For the second half use the symmetry $W_N^{k+N/2}=-W_N^k$:

$$
X[k+\tfrac N2]=G[k]+W_N^{k+N/2}H[k]=G[k]-W_N^kH[k].
$$

> **Radix-2 DIT butterfly.** For $0\le k<\frac N2$:
> $$X[k]=G[k]+W_N^kH[k],\qquad X[k+\tfrac N2]=G[k]-W_N^kH[k].$$

We compute each half-size DFT **once**, then combine with one addition, one subtraction and a **single** complex multiplication (the twiddle) per pair of outputs.

## Butterflies by size

**$N=2$.** The fundamental 2-point DFT, with $W_2^0=1$:

$$
X[0]=x[0]+x[1],\qquad X[1]=x[0]-x[1].
$$
` + fig("fft-butterfly") + r`
**$N=4$.** Two 2-point DFTs, $G$ from $\{x[0],x[2]\}$ and $H$ from $\{x[1],x[3]\}$, combined with $W_4^k$:

$$
X[0]=G[0]+W_4^0H[0],\quad X[1]=G[1]+W_4^1H[1],\quad X[2]=G[0]-W_4^0H[0],\quad X[3]=G[1]-W_4^1H[1].
$$
` + fig("fft-dit-4") + r`
**$N=8$.** First split into two 4-point DFTs of the evens and odds and combine with $X[k]=G[k]+W_8^kH[k]$, $X[k+4]=G[k]-W_8^kH[k]$ for $k=0,\dots,3$. Expanding every 4- and 2-point DFT gives the complete structure:
` + fig("fft-dit-8") + r`
## Understanding bit-reversed order

In DIT the **inputs** appear in bit-reversed order, because the sequence is divided again and again into even- and odd-indexed halves. For $N=8$:

1. Stage 1: even $(0,2,4,6)$, odd $(1,3,5,7)$.
2. Stage 2: even-even $(0,4)$, odd-even $(2,6)$, even-odd $(1,5)$, odd-odd $(3,7)$.
3. Stage 3: single elements $x[0],x[4],x[2],x[6],x[1],x[5],x[3],x[7]$.

| original index | binary | bit-reversed | new position |
|---|---|---|---|
| 0 | 000 | 000 | 0 |
| 1 | 001 | 100 | 4 |
| 2 | 010 | 010 | 2 |
| 3 | 011 | 110 | 6 |
| 4 | 100 | 001 | 1 |
| 5 | 101 | 101 | 5 |
| 6 | 110 | 011 | 3 |
| 7 | 111 | 111 | 7 |

Putting evens before odds sorts by the **rightmost** bit; putting even-even before odd-even sorts by the second rightmost bit, and so on. That is the same as sorting by the bit-reversed index.

## Pseudocode and complexity

**Iterative radix-2 DIT FFT** (array $x$ of length $N=2^v$):

1. Bit-reverse the array: swap $x[k]$ with $x[\text{rev}(k)]$.
2. For each stage $s=1,\dots,\log_2N$: let $M=2^s$ and $W_M=e^{-j2\pi/M}$.
3. For each block start $l=0,M,2M,\dots,N-M$: set $W=1$, then for $k=0,\dots,\frac M2-1$:
   - $g=x[l+k]$ (this is $G[k]$) and $h=W\cdot x[l+k+\frac M2]$ (this is $W_M^kH[k]$);
   - $x[l+k]=g+h$ and $x[l+k+\frac M2]=g-h$;
   - $W=W\cdot W_M$.

**Cost:**

- bit reversal: $O(N)$;
- the outer loop runs $\log_2N$ times (stages);
- the inner loops together touch all $N$ elements, i.e. $\frac N2$ butterflies per stage.

$$
M(N)=2M\!\left(\tfrac N2\right)+\tfrac N2\ \Rightarrow\ M(N)=\tfrac N2\log_2N\ \text{multiplications},\qquad A(N)=N\log_2N\ \text{additions}.
$$
` + fig("fft-cost") + r`
| $N$ | DFT $N^2$ | FFT $\frac N2\log_2N$ | speed-up |
|---|---|---|---|
| 8 | 64 | 12 | ≈5× |
| 1024 | 1 048 576 | 5 120 | ≈205× |
| 65 536 | ≈4.3×10⁹ | 524 288 | ≈8 200× |

**In-place computation.** Each butterfly reads two cells and writes its two results back into the same cells, so only $N$ memory locations are needed. The price is the bit-reversed ordering at one end.

The FFT computes **exactly** the same numbers as the DFT; it is not an approximation.

# Part III — radix-2 decimation in frequency

## Split the sum into first and second halves

Instead of separating even and odd time indices, DIF splits $n=0,\dots,N-1$ into the first and second halves:

$$
X[k]=\sum_{n=0}^{N/2-1}x[n]W_N^{kn}+\sum_{n=0}^{N/2-1}x[n+\tfrac N2]W_N^{k(n+N/2)} .
$$

Since $W_N^{kN/2}=e^{-j\pi k}=(-1)^k$:

$$
X[k]=\sum_{n=0}^{N/2-1}\Big(x[n]+(-1)^kx[n+\tfrac N2]\Big)W_N^{kn}.
$$

Now **decimate in frequency**, evaluating even and odd $k$ separately.

- **Even $k=2m$:** $(-1)^{2m}=1$ and $W_N^{2mn}=W_{N/2}^{mn}$:
$$X[2m]=\sum_{n=0}^{N/2-1}\underbrace{\big(x[n]+x[n+\tfrac N2]\big)}_{a(n)}W_{N/2}^{mn}=\text{DFT}_{N/2}\{a(n)\}.$$
- **Odd $k=2m+1$:** $(-1)^{2m+1}=-1$ and $W_N^{(2m+1)n}=W_N^nW_{N/2}^{mn}$:
$$X[2m+1]=\sum_{n=0}^{N/2-1}\underbrace{\big(x[n]-x[n+\tfrac N2]\big)W_N^n}_{b(n)}W_{N/2}^{mn}=\text{DFT}_{N/2}\{b(n)\}.$$

> **DIF butterfly:** $a(n)=x[n]+x[n+\frac N2]$ and $b(n)=\big(x[n]-x[n+\frac N2]\big)W_N^n$. The addition and subtraction come **before** the twiddle multiplication; in DIT the twiddle comes first.

Repeat on each half until 2-point DFTs remain. The full 8-point DIF structure has **natural-order inputs and bit-reversed outputs**: $X[0],X[4],X[2],X[6],X[1],X[5],X[3],X[7]$.
` + fig("fft-dif-8") + r`
**DIT vs DIF at a glance:**

| | DIT | DIF |
|---|---|---|
| splits | input by even / odd index | input into first / second half |
| decimates | time | frequency (even / odd outputs) |
| twiddle | before the add/subtract | after the subtract |
| input order | bit-reversed | natural |
| output order | natural | bit-reversed |
| cost | $\frac N2\log_2N$ mults | $\frac N2\log_2N$ mults |

## Why zero-pad?

Radix-2 FFTs need $N=2^m$ exactly. Real data often has $M$ samples with $M$ not a power of 2; stuck at $M$ samples we would be back to the slow $O(M^2)$ DFT.

**Solution:** append zeros up to the next power of two, $N=2^{\lceil\log_2M\rceil}$.

- Bonus: zero-padding interpolates the spectrum, giving a smoother picture without altering the true frequency content $X(e^{j\omega})$.
- Caution: for a periodic $x[n]$, zero-padding changes the period and shape of the periodic signal.

Can we avoid padding? Yes, next.

# Part IV — advanced FFT algorithms

## Radix-2 as a matrix

Reshape the 1-D input into a 2-D array and do DFTs along rows and columns.

1. Arrange $x[n]$ in a $2\times\frac N2$ matrix in **column-major** order, $n=2n_2+n_1$: row $n_1=0$ holds the even samples $x[0],x[2],x[4],\dots$; row $n_1=1$ holds the odd samples $x[1],x[3],x[5],\dots$
2. **First DFTs:** an $\frac N2$-point DFT along each row gives $G[k]$ (row 0) and $H[k]$ (row 1).
3. **Twiddles:** multiply row $n_1$ by $W_N^{n_1k}$, so row 1 becomes $H[0]W_N^0,\ H[1]W_N^1,\ H[2]W_N^2,\dots$
4. **Second DFTs:** a 2-point DFT down each column. This is exactly the butterfly.
5. Row 0 now holds $X[0\dots\frac N2-1]$ and row 1 holds $X[\frac N2\dots N-1]$: read the output in **row-major** order, $k=\frac N2k_1+k_2$:
$$X\big[\tfrac N2k_1+k_2\big]=G[k_2]+W_2^{k_1}W_N^{k_2}H[k_2].$$

> The Cooley–Tukey algorithm is: arrange numbers on a matrix, perform DFTs on the rows and columns.

## Radix 3

For $N=3N_2$, split by index modulo 3:

$$
X[k]=\sum_rx[3r]W_{N/3}^{rk}+W_N^k\sum_rx[3r+1]W_{N/3}^{rk}+W_N^{2k}\sum_rx[3r+2]W_{N/3}^{rk}.
$$

With $G_m[k]=\sum_rx[3r+m]W_{N/3}^{rk}$ for $m=0,1,2$:

$$
\begin{aligned}
X[k]&=G_0[k]+(W_N^kG_1[k])+(W_N^{2k}G_2[k])\\
X[k+\tfrac N3]&=G_0[k]+W_3^1(W_N^kG_1[k])+W_3^2(W_N^{2k}G_2[k])\\
X[k+\tfrac{2N}3]&=G_0[k]+W_3^2(W_N^kG_1[k])+W_3^4(W_N^{2k}G_2[k])
\end{aligned}
$$

These three equations are themselves a 3-point DFT. In matrix form: load $x$ into a $3\times\frac N3$ array column-major ($n=3n_2+n_1$), take $\frac N3$-point DFTs along rows, multiply by $W_N^{n_1k_2}$, take 3-point DFTs down columns, read row-major ($k=\frac N3k_1+k_2$).

## General Cooley–Tukey: $N=N_1N_2$

Index the input as an $N_1\times N_2$ matrix column-major, $n=N_1n_2+n_1$, and the output row-major, $k=N_2k_1+k_2$. Expand the exponent:

$$
(N_1n_2+n_1)(N_2k_1+k_2)=Nn_2k_1+N_1n_2k_2+N_2n_1k_1+n_1k_2 .
$$

- $W_N^{Nn_2k_1}=1$: a full turn, so this term vanishes.
- $W_N^{N_1n_2k_2}=W_{N_2}^{n_2k_2}$ and $W_N^{N_2n_1k_1}=W_{N_1}^{n_1k_1}$ (since $W_N^{N_1m}=e^{-j2\pi m/N_2}$).
- $W_N^{n_1k_2}$ stays as it is.

$$
\boxed{\,X[N_2k_1+k_2]=\sum_{n_1=0}^{N_1-1}\left[W_N^{n_1k_2}\left(\sum_{n_2=0}^{N_2-1}x[N_1n_2+n_1]W_{N_2}^{n_2k_2}\right)\right]W_{N_1}^{n_1k_1}\,}
$$

The inner sum is an $N_2$-point DFT along each row; $W_N^{n_1k_2}$ is the twiddle; the outer sum is an $N_1$-point DFT down each column.

### Bailey's (four-step) FFT

1. Arrange $x[n]$ in an $N_1\times N_2$ matrix (column-major).
2. Compute the $N_2$-point DFT of each row.
3. Multiply entry $(n_1,k_2)$ by $W_N^{n_1k_2}$.
4. Compute the $N_1$-point DFT of each column, and read row-major.

Apply the same algorithm recursively to the smaller DFTs. If $N=p_1^{a_1}p_2^{a_2}\cdots$, factor until only small primes remain: $O(N\log N)$ for any composite $N$ (powers of 2, powers of 3, mixed radices).

# Part V — fast convolution

## The filtering recipe, now with the FFT

From the DFT topic: LTI filtering is linear convolution ($L\cdot M$ multiplications directly); multiplying DFTs gives circular convolution; padding to $N\ge L+M-1$ makes circular equal linear. The transform was the bottleneck. Replace every DFT by an FFT.

**Fast convolution** (input length $L$, filter length $M$):

1. Choose $N\ge L+M-1$, the next power of 2.
2. Zero-pad $x$ and $h$ to length $N$.
3. $X[k]=\text{FFT}\{x\}$ and $H[k]=\text{FFT}\{h\}$.
4. Multiply bin by bin: $Y[k]=X[k]H[k]$.
5. $y[n]=\text{IFFT}\{Y\}$; keep the first $L+M-1$ samples.

Padding beyond $L+M-1$ is harmless: it only appends trailing zeros to $y$.

## How much faster?

- Direct linear convolution: $O(L\cdot M)$; with $L\approx M\approx N/2$, roughly $O(N^2)$.
- Fast convolution: two forward FFTs, one element-wise product $O(N)$, one inverse FFT: $O(N\log N)$ in total.

**Real-world magnitude.** A one-second reverb ($M=44\,100$) on one second of audio ($L=44\,100$):

- naive: $L\times M\approx1.94\times10^9$ operations;
- fast: pad to $N=131\,072=2^{17}$; $3\times N\log_2N\approx6.7\times10^6$ operations.

About a **300× speed-up**, of purely algorithmic origin. This is what makes real-time, high-fidelity audio processing possible.

# Part VI — FFT for prime lengths: Bluestein's algorithm

## The problem

Cooley–Tukey gives $O(N\log N)$ for any composite $N$. But if $N$ is a large prime (say $N=1\,000\,003$), then $N_1=1$ and Cooley–Tukey falls back to $O(N^2)$.

## The chirp-z identity

$$
(k-n)^2=k^2-2kn+n^2\qquad\Rightarrow\qquad kn=\frac{k^2+n^2-(k-n)^2}{2},
$$

so

$$
W_N^{kn}=W_{2N}^{2kn}=W_{2N}^{k^2}\,W_{2N}^{n^2}\,W_{2N}^{-(k-n)^2}.
$$

## The DFT is a convolution

$$
X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn}=W_{2N}^{k^2}\sum_{n=0}^{N-1}\underbrace{x[n]W_{2N}^{n^2}}_{a[n]}\ \underbrace{W_{2N}^{-(k-n)^2}}_{b[k-n]}=W_{2N}^{k^2}\,(a*b)[k],
$$

with $a[n]=x[n]W_{2N}^{n^2}$ for $n\in[0,N-1]$ and the **chirp** $b[n]=W_{2N}^{-n^2}$ for $n\in[-(N-1),N-1]$. The sum is exactly a **linear convolution**, which we can compute fast.

## Padding the chirp without breaking the wrap

The convolution evaluates $b[k-n]$ with $k-n$ running from $k-(N-1)$ to $k$, which can be negative. In a length-$M$ circular buffer a negative index $n$ lands at $((n))_M=M+n$: the DFT topic's wrap, now used **on purpose**.

- Positive indices of $b$ go at the start of the size-$M$ array, negative indices at the end, with zeros between so they never overlap: $M\ge2N-1$.
- Choose $M$ a power of 2, so radix-2 FFTs apply. The prime $N$ never touches the transform length.
` + fig("fft-bluestein") + r`
**Bluestein's FFT:**

1. Form $a[n]=x[n]W_{2N}^{n^2}$ and the wrapped chirp $b[((n))_M]$, both of size $M=2^{\lceil\log_2(2N-1)\rceil}$.
2. Compute $A=\text{FFT}(a,M)$ and $B=\text{FFT}(b,M)$.
3. Multiply: $Y[k]=A[k]B[k]$.
4. Invert: $y[n]=\text{IFFT}(Y,M)$.
5. Multiply by the chirp: $X[k]=y[k]\,W_{2N}^{k^2}$ for $k=0,\dots,N-1$.

> **Summary.** Every $N$ has an $O(N\log N)$ transform: factor it if you can (Cooley–Tukey), chirp it if you cannot (Bluestein). And with it comes the fastest known way to filter: fast convolution.

## Exam pointers

- Derive the DIT butterfly in three lines: split by parity, use $W_N^2=W_{N/2}$, then $W_N^{k+N/2}=-W_N^k$.
- Derive the DIF split: first/second half, $W_N^{kN/2}=(-1)^k$, then even/odd $k$.
- Draw flow graphs with every twiddle labelled and the bit-reversed end marked; know the bit-reversal table.
- Complexity: give both counts, $N^2$ against $\frac N2\log_2N$, the recurrence $M(N)=2M(N/2)+N/2$, and a numeric example.
`
