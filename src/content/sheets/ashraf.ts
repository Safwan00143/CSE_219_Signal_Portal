import type { SheetProblem } from "../types"

const r = String.raw
const fig = (...ids: string[]) => "\n```fig\n" + ids.join("\n") + "\n```\n"

const B = { sheet: "Ashraf Sir" } as const

export const sheetB: SheetProblem[] = [
  /* ─────────────── 1. Radix-2 DIT Cooley–Tukey FFT ─────────────── */
  {
    ...B,
    id: "sb-1.1",
    topic: "fft",
    ref: "Problem 1.1",
    title: "Radix-2 DIT derivation",
    prompt: r`Starting from $X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn}$, derive the radix-2 DIT split into even and odd subsequences and the butterfly relations for $0\le k<N/2$.`,
    solution: r`**Step 1: split into even and odd samples.** Put $n=2r$ (even) and $n=2r+1$ (odd):

$$
X[k]=\sum_{r=0}^{N/2-1}x[2r]\,W_N^{2rk}+\sum_{r=0}^{N/2-1}x[2r+1]\,W_N^{(2r+1)k}
$$

**Step 2: simplify the twiddles.** $W_N^{2rk}=W_{N/2}^{rk}$, and $W_N^{(2r+1)k}=W_N^k\,W_{N/2}^{rk}$:

$$
X[k]=\sum_{r=0}^{N/2-1}x[2r]\,W_{N/2}^{kr}+W_N^k\sum_{r=0}^{N/2-1}x[2r+1]\,W_{N/2}^{kr}=G[k]+W_N^kH[k]
$$

$G$ and $H$ are the $\frac N2$-point DFTs of the even and odd samples.

**Step 3: the other half of the outputs.** $G$ and $H$ repeat every $\frac N2$, and $W_N^{k+N/2}=-W_N^k$:

$$
X\!\left[k+\tfrac N2\right]=G[k]-W_N^kH[k],\qquad0\le k<\tfrac N2
$$

These two lines are the **DIT butterfly**: one twiddle multiplication gives two outputs.
` + fig("fft-butterfly"),
  },
  {
    ...B,
    id: "sb-1.2",
    topic: "fft",
    ref: "Problem 1.2",
    title: "4-point DIT FFT",
    prompt: r`Compute the 4-point DIT FFT of $x[n]=[2,\,1,\,-3,\,4]$ using radix-2 butterflies.`,
    solution: r`**Step 1: split.**

$$
x_e=[2,\,-3],\qquad x_o=[1,\,4]
$$

**Step 2: the two 2-point DFTs** (sum and difference):

$$
G=[-1,\ 5],\qquad H=[5,\ -3]
$$

**Step 3: combine**, for $k=0,1$:

$$
X[k]=G[k]+W_4^kH[k],\qquad X[k+2]=G[k]-W_4^kH[k]
$$

- $k=0$: $X[0]=-1+5=4$ and $X[2]=-1-5=-6$.
- $k=1$, with $W_4^1=-j$: $X[1]=5+(-j)(-3)=5+3j$ and $X[3]=5-(-j)(-3)=5-3j$.

$$
X[k]=[\,4,\ 5+3j,\ -6,\ 5-3j\,]
$$
` + fig("sb-12"),
  },
  {
    ...B,
    id: "sb-1.3",
    topic: "fft",
    ref: "Problem 1.3",
    title: "4-point DIT FFT",
    prompt: r`Compute the 4-point FFT of $x[n]=[1,\,2,\,3,\,4]$ using two 2-point butterflies.`,
    solution: r`**Step 1: split into even and odd samples.**

$$
x_e=[1,\,3],\qquad x_o=[2,\,4]
$$

**Step 2: their 2-point DFTs.**

$$
G=[4,\ -2],\qquad H=[6,\ -2]
$$

**Step 3: combine.**

- $X[0]=G[0]+H[0]=10$
- $X[1]=G[1]+W_4^1H[1]=-2+(-j)(-2)=-2+2j$
- $X[2]=G[0]-H[0]=-2$
- $X[3]=G[1]-W_4^1H[1]=-2-2j$
` + fig("sb-13"),
  },
  {
    ...B,
    id: "sb-1.4",
    topic: "fft",
    ref: "Problem 1.4",
    title: "8-point DIT FFT",
    prompt: r`Compute the 8-point FFT of $x[n]=[1,\,2,\,0,\,-1,\,3,\,0,\,2,\,1]$ using the full radix-2 DIT butterfly.`,
    solution: r`**Step 1: bit-reversed order.** For the iterative radix-2 DIT flow, place the data in bit-reversed order:

$$
[x[0],x[4],x[2],x[6],x[1],x[5],x[3],x[7]]=[1,\ 3,\ 0,\ 2,\ 2,\ 0,\ -1,\ 1]
$$
` + fig("fft-dit-8") + r`
**Step 2: after stage 1** (2-point butterflies):

$$
[\,4,\ -2,\ 2,\ -2,\ 2,\ 2,\ 0,\ -2\,]
$$

**Step 3: after stage 2** (twiddles $W_8^0$ and $W_8^2=-j$):

$$
[\,6,\ -2+2j,\ 2,\ -2-2j,\ 2,\ 2+2j,\ 2,\ 2-2j\,]
$$

**Step 4: stage 3** uses the twiddles $W_8^k$, $k=0,1,2,3$, between the top half $[6,\,-2+2j,\,2,\,-2-2j]$ and the bottom half $[2,\,2+2j,\,2,\,2-2j]$:

- $X[0]=6+W_8^0(2)=8$
- $X[1]=(-2+2j)+W_8^1(2+2j)=(-2+2j)+2\sqrt2=-2+2\sqrt2+2j$
- $X[2]=2+W_8^2(2)=2-2j$
- $X[3]=(-2-2j)+W_8^3(2-2j)=-2-2\sqrt2-2j$
- $X[4]=6-W_8^0(2)=4$
- $X[5]=(-2+2j)-W_8^1(2+2j)=-2-2\sqrt2+2j$
- $X[6]=2-W_8^2(2)=2+2j$
- $X[7]=(-2-2j)-W_8^3(2-2j)=-2+2\sqrt2-2j$

**Result.**

$$
X[k]=[\,8,\ -2+2\sqrt2+2j,\ 2-2j,\ -2-2\sqrt2-2j,\ 4,\ -2-2\sqrt2+2j,\ 2+2j,\ -2+2\sqrt2-2j\,]
$$`,
  },
  {
    ...B,
    id: "sb-1.5",
    topic: "fft",
    ref: "Problem 1.5",
    title: "8-point inverse FFT",
    prompt: r`Recover $x[n]$ from

$$
X[k]=[\,6,\ \sqrt2-j\sqrt2,\ 2+4j,\ -\sqrt2-j\sqrt2,\ -2,\ -\sqrt2+j\sqrt2,\ 2-4j,\ \sqrt2+j\sqrt2\,]
$$

using an 8-point inverse FFT.`,
    solution: r`**Method.** Use the same radix-2 DIT butterfly graph as the forward 8-point FFT, but replace each lower-branch twiddle by $W_8^{-k}$, and divide the final output by 8.

**Step 1: bit-reversed input.**

$$
[X[0],X[4],X[2],X[6],X[1],X[5],X[3],X[7]]=[\,6,\ -2,\ 2+4j,\ 2-4j,\ \sqrt2-j\sqrt2,\ -\sqrt2+j\sqrt2,\ -\sqrt2-j\sqrt2,\ \sqrt2+j\sqrt2\,]
$$

**Step 2: stage 1** uses only $W_8^0=1$:

$$
[\,4,\ 8,\ 4,\ 8j,\ 0,\ 2\sqrt2-2\sqrt2j,\ 0,\ -2\sqrt2-2\sqrt2j\,]
$$

**Step 3: stage 2.** The non-trivial lower-branch twiddle is $W_8^{-2}=j$:

$$
[\,8,\ 0,\ 0,\ 16,\ 0,\ 4\sqrt2-4\sqrt2j,\ 0,\ 0\,]
$$

**Step 4: stage 3**, with lower-branch twiddles $W_8^0,\ W_8^{-1},\ W_8^{-2},\ W_8^{-3}$:

$$
[\,8,\ 8,\ 0,\ 16,\ 8,\ -8,\ 0,\ 16\,]
$$

**Step 5: divide by 8.**

$$
x[n]=\tfrac18[\,8,\ 8,\ 0,\ 16,\ 8,\ -8,\ 0,\ 16\,]=[\,1,\ 1,\ 0,\ 2,\ 1,\ -1,\ 0,\ 2\,]
$$`,
  },

  /* ─────────────── 2. Bailey's 2D formulation ─────────────── */
  {
    ...B,
    id: "sb-2.1",
    topic: "fft",
    ref: "Problem 2.1",
    title: "4-point DFT as a 2 × 2 factorisation",
    prompt: r`Show how a 4-point DFT can be written as a $2\times2$ matrix factorisation using column-major input, row DFTs, twiddles and column DFTs.`,
    solution: r`**Step 1: column-major input.** Fill the samples column by column, so the first row holds the even-indexed samples and the second row the odd-indexed ones:

$$
\begin{bmatrix}x_0&x_2\\x_1&x_3\end{bmatrix}
$$

**Step 2: 2-point DFTs along the rows.**

$$
\begin{bmatrix}x_0+x_2&x_0-x_2\\x_1+x_3&x_1-x_3\end{bmatrix}
$$

**Step 3: twiddle the second row by $[1,\,W_4^1]$.** Only the lower-right entry changes, picking up $W_4^1=-j$:

$$
\begin{bmatrix}x_0+x_2&x_0-x_2\\x_1+x_3&-j(x_1-x_3)\end{bmatrix}
$$

**Step 4: 2-point DFTs down the columns.**

$$
\begin{bmatrix}(x_0+x_2)+(x_1+x_3)&(x_0-x_2)-j(x_1-x_3)\\(x_0+x_2)-(x_1+x_3)&(x_0-x_2)+j(x_1-x_3)\end{bmatrix}
$$

**Step 5: read out in row-major order.**

- $X[0]=x_0+x_1+x_2+x_3$
- $X[1]=(x_0-x_2)-j(x_1-x_3)$
- $X[2]=(x_0+x_2)-(x_1+x_3)$
- $X[3]=(x_0-x_2)+j(x_1-x_3)$

The pipeline: **column-major reshape → row DFTs → twiddle → column DFTs → row-major read-out.**`,
  },
  {
    ...B,
    id: "sb-2.2",
    topic: "fft",
    ref: "Problem 2.2",
    title: "8-point DFT with a 2 × 4 Bailey factorisation",
    prompt: r`Use a $2\times4$ Bailey factorisation to compute the 8-point DFT of $x[n]=[1,\,3,\,-1,\,2,\,0,\,4,\,2,\,1]$.`,
    solution: r`**Step 1: column-major input.** The top row is the even-indexed samples, the bottom row the odd-indexed ones:

$$
\mathbf X_{\text{in}}=\begin{bmatrix}1&-1&0&2\\3&2&4&1\end{bmatrix}
$$

**Step 2: a 4-point DFT of each row.**

$$
\mathbf R=\begin{bmatrix}2&1+3j&0&1-3j\\10&-1-j&4&-1+j\end{bmatrix}
$$

**Step 3: twiddle the second row by $[1,\,W_8^1,\,W_8^2,\,W_8^3]$.**

- $(-1-j)W_8^1=-\sqrt2$
- $4W_8^2=-4j$
- $(-1+j)W_8^3=\sqrt2$

$$
\mathbf T=\begin{bmatrix}2&1+3j&0&1-3j\\10&-\sqrt2&-4j&\sqrt2\end{bmatrix}
$$

**Step 4: 2-point DFTs down each column** (sum on top, difference below):

- $X[0]=2+10=12$, $\quad X[4]=2-10=-8$
- $X[1]=(1+3j)-\sqrt2=1-\sqrt2+3j$, $\quad X[5]=(1+3j)+\sqrt2=1+\sqrt2+3j$
- $X[2]=0-4j=-4j$, $\quad X[6]=0-(-4j)=4j$
- $X[3]=(1-3j)+\sqrt2=1+\sqrt2-3j$, $\quad X[7]=(1-3j)-\sqrt2=1-\sqrt2-3j$

**Result (read out row-major):**

$$
X=[\,12,\ 1-\sqrt2+3j,\ -4j,\ 1+\sqrt2-3j,\ -8,\ 1+\sqrt2+3j,\ 4j,\ 1-\sqrt2-3j\,]
$$`,
  },
  {
    ...B,
    id: "sb-2.3",
    topic: "fft",
    ref: "Problem 2.3",
    title: "16-point DFT with a 4 × 4 formulation",
    prompt: r`A 16-point sequence is $x[n]=[1,0,0,0,\,2,0,0,0,\,-1,0,0,0,\,3,0,0,0]$. Use the $4\times4$ formulation to reduce the work.`,
    solution: r`**Step 1: column-major form.** Row $r$ collects the samples with $n\equiv r\pmod4$:

$$
\begin{bmatrix}1&2&-1&3\\0&0&0&0\\0&0&0&0\\0&0&0&0\end{bmatrix}
$$

**Step 2: row DFTs.** Only the first row is non-zero, so we need just one 4-point DFT, of $[1,\,2,\,-1,\,3]$:

$$
[\,5,\ 2+j,\ -5,\ 2-j\,]
$$

$$
\mathbf R=\begin{bmatrix}5&2+j&-5&2-j\\0&0&0&0\\0&0&0&0\\0&0&0&0\end{bmatrix}
$$

**Step 3: twiddles.** They do nothing here: only row $r=0$ is non-zero, and $W_{16}^{0\cdot k}=1$.

**Step 4: column DFTs.** Each column has the form $[a,0,0,0]^T$, whose 4-point DFT is just $[a,a,a,a]^T$:

$$
\mathbf C=\begin{bmatrix}5&2+j&-5&2-j\\5&2+j&-5&2-j\\5&2+j&-5&2-j\\5&2+j&-5&2-j\end{bmatrix}
$$

**Step 5: read out row-major.**

$$
X[k]=[\,5,\ 2+j,\ -5,\ 2-j,\ 5,\ 2+j,\ -5,\ 2-j,\ 5,\ 2+j,\ -5,\ 2-j,\ 5,\ 2+j,\ -5,\ 2-j\,]
$$

The spectrum repeats every 4 bins, as expected for a signal that is non-zero only at multiples of 4.`,
  },

  /* ─────────────── 3. Bluestein's FFT ─────────────── */
  {
    ...B,
    id: "sb-3.1",
    topic: "fft",
    ref: "Problem 3.1",
    title: "Bluestein's chirp identity",
    prompt: r`Derive Bluestein's chirp identity

$$
W_N^{nk}=W_{2N}^{-(k-n)^2}\,W_{2N}^{k^2}\,W_{2N}^{n^2}.
$$`,
    solution: r`**Step 1: complete the square.** Since $(k-n)^2=k^2-2kn+n^2$,

$$
kn=-\frac{(k-n)^2}{2}+\frac{k^2}{2}+\frac{n^2}{2}
$$

**Step 2: substitute.** Because $W_N^{nk}=W_{2N}^{2nk}$, the halves disappear:

$$
W_N^{nk}=W_{2N}^{-(k-n)^2}\,W_{2N}^{k^2}\,W_{2N}^{n^2}
$$

**Step 3: the DFT becomes a convolution.**

$$
X[k]=\sum_{n=0}^{N-1}x[n]\,W_{2N}^{-(k-n)^2}W_{2N}^{k^2}W_{2N}^{n^2}=W_{2N}^{k^2}\sum_{n=0}^{N-1}a[n]\,b[k-n]
$$

with $a[n]=x[n]W_{2N}^{n^2}$ and $b[m]=W_{2N}^{-m^2}$. So the DFT is a **chirp-weighted linear convolution**.

**Step 4: how long the FFT must be.** For outputs $0\le k\le N-1$ and data $0\le n\le N-1$, the difference $m=k-n$ runs from $-(N-1)$ to $N-1$. So $b[m]$ is needed on $2N-1$ consecutive indices, and Bluestein needs an FFT length

$$
M\ge2N-1
$$

usually the next power of 2. In the FFT buffer, $a[n]$ sits in slots $0,\dots,N-1$, and $b$ is stored as

$$
[\,b[0],b[1],\dots,b[N-1],\,0,\dots,0,\,b[-(N-1)],\dots,b[-1]\,]
$$`,
  },
  {
    ...B,
    id: "sb-3.2",
    topic: "fft",
    ref: "Problem 3.2",
    title: "3-point DFT with Bluestein",
    prompt: r`Use Bluestein's construction to compute the 3-point DFT of $x[n]=[2,\,-1,\,3]$.`,
    solution: r`**Setup.** Let $W_6=e^{-j\pi/3}$. Bluestein writes

$$
X[k]=W_6^{k^2}c[k],\qquad c[k]=\sum_{n=0}^{2}a[n]\,b[k-n]
$$

**Step 1: the pre-chirped input.**

$$
a[n]=x[n]W_6^{n^2}=[\,2,\ -W_6,\ 3W_6^4\,]=\left[\,2,\ -\tfrac12+\tfrac{\sqrt3}2j,\ -\tfrac32+\tfrac{3\sqrt3}2j\,\right]
$$

**Step 2: the chirp,** $b[m]=W_6^{-m^2}$ for $m=-2,\dots,2$:

$$
[b[-2],b[-1],b[0],b[1],b[2]]=[\,W_6^{-4},\ W_6^{-1},\ 1,\ W_6^{-1},\ W_6^{-4}\,]
$$

Since $2N-1=5$, a radix-2 implementation uses $M=8$ and packs

$$
A=[\,2,\ -W_6,\ 3W_6^4,\ 0,0,0,0,0\,],\qquad B=[\,1,\ W_6^{-1},\ W_6^{-4},\ 0,0,0,\ W_6^{-4},\ W_6^{-1}\,]
$$

**Step 3: the convolution samples we need.**

$$
c[0]=2\cdot1+(-W_6)W_6^{-1}+3W_6^4W_6^{-4}=2-1+3=4
$$

$$
c[1]=2W_6^{-1}+(-W_6)\cdot1+3W_6^4W_6^{-1}=-\tfrac52+\tfrac{3\sqrt3}2j
$$

$$
c[2]=2W_6^{-4}+(-W_6)W_6^{-1}+3W_6^4\cdot1=-\tfrac72+\tfrac{\sqrt3}2j
$$

**Step 4: multiply by the output chirp $W_6^{k^2}$.**

$$
X[0]=W_6^0c[0]=4
$$

$$
X[1]=W_6\,c[1]=\left(\tfrac12-\tfrac{\sqrt3}2j\right)\left(-\tfrac52+\tfrac{3\sqrt3}2j\right)=1+2\sqrt3\,j
$$

$$
X[2]=W_6^4\,c[2]=\left(-\tfrac12+\tfrac{\sqrt3}2j\right)\left(-\tfrac72+\tfrac{\sqrt3}2j\right)=1-2\sqrt3\,j
$$

**Check with the ordinary DFT:** $X[0]=2-1+3=4$. ✓`,
  },
  {
    ...B,
    id: "sb-3.3",
    topic: "fft",
    ref: "Problem 3.3",
    title: "Bluestein on a 4-point sequence",
    prompt: r`Run the same method on the 4-point sequence $x[n]=[1,\,2,\,0,\,0]$ and compare with the ordinary 4-point DFT.`,
    solution: r`**Setup.** Let $W_8=e^{-j\pi/4}$. Then

$$
X[k]=W_8^{k^2}c[k],\qquad a[n]=x[n]W_8^{n^2}=[\,1,\ 2W_8,\ 0,\ 0\,]
$$

**Step 1: the chirp,** $b[m]=W_8^{-m^2}$ for $m=-3,\dots,3$:

$$
[\,W_8^{-1},\ -1,\ W_8^{-1},\ 1,\ W_8^{-1},\ -1,\ W_8^{-1}\,]
$$

Here $2N-1=7$, so $M=8$, with packed buffers

$$
A=[\,1,\ 2W_8,\ 0,0,0,0,0,0\,],\qquad B=[\,1,\ W_8^{-1},\ -1,\ W_8^{-1},\ 0,\ W_8^{-1},\ -1,\ W_8^{-1}\,]
$$

**Step 2: convolution.** Only $a[0]$ and $a[1]$ are non-zero, so $c[k]=a[0]b[k]+a[1]b[k-1]$:

- $c[0]=1\cdot1+2W_8\cdot W_8^{-1}=3$
- $c[1]=W_8^{-1}+2W_8=\frac{3\sqrt2}2-\frac{\sqrt2}2j$
- $c[2]=-1+2W_8W_8^{-1}=1$
- $c[3]=W_8^{-1}-2W_8=-\frac{\sqrt2}2+\frac{3\sqrt2}2j$

**Step 3: output chirp.**

- $X[0]=c[0]=3$
- $X[1]=W_8\,c[1]=1-2j$
- $X[2]=W_8^4\,c[2]=-1$
- $X[3]=W_8^9\,c[3]=W_8\,c[3]=1+2j$

**Step 4: compare with the ordinary 4-point DFT.**

- $X[0]=1+2=3$
- $X[1]=1+2W_4=1-2j$
- $X[2]=1+2W_4^2=-1$
- $X[3]=1+2W_4^3=1+2j$

They agree term by term. ✓`,
  },

  /* ─────────────── 4. Fast convolution ─────────────── */
  {
    ...B,
    id: "sb-4.1",
    topic: "fft",
    ref: "Problem 4.1",
    title: "Fast convolution with a 4-point FFT",
    prompt: r`Compute the linear convolution of $x[n]=[1,\,2]$ and $h[n]=[1,\,-1]$ using a 4-point FFT.`,
    solution: r`**Step 1: size.** The output length is $2+2-1=3$, so a 4-point FFT is enough. Zero-pad both:

$$
x_p=[1,\,2,\,0,\,0],\qquad h_p=[1,\,-1,\,0,\,0]
$$

**Step 2: FFT of $x_p$.** $G_x=\text{FFT}_2([1,0])=[1,1]$ and $H_x=\text{FFT}_2([2,0])=[2,2]$:

$$
X[k]=[\,3,\ 1-2j,\ -1,\ 1+2j\,]
$$

**Step 3: FFT of $h_p$.** $G_h=[1,1]$ and $H_h=\text{FFT}_2([-1,0])=[-1,-1]$:

$$
H[k]=[\,0,\ 1+j,\ 2,\ 1-j\,]
$$

**Step 4: multiply point by point.**

$$
Y[k]=X[k]H[k]=[\,0,\ 3-j,\ -2,\ 3+j\,]
$$

**Step 5: inverse FFT** (same butterflies with $W_4^{-k}$, then divide by 4). Bit-reversed input $[\,0,\ -2,\ 3-j,\ 3+j\,]$:

- stage 1: $[\,-2,\ 2,\ 6,\ -2j\,]$
- stage 2: $[\,4,\ 4,\ -8,\ 0\,]$

$$
y_p[n]=\tfrac14[\,4,\ 4,\ -8,\ 0\,]=[\,1,\ 1,\ -2,\ 0\,]
$$

**Step 6: drop the padding.**

$$
y[n]=[\,1,\ 1,\ -2\,]
$$`,
  },
  {
    ...B,
    id: "sb-4.2",
    topic: "fft",
    ref: "Problem 4.2",
    title: "Fast convolution with a 4-point FFT",
    prompt: r`Compute the linear convolution of $x[n]=[1,\,-1,\,2]$ and $h[n]=[2,\,1]$ using a 4-point radix-2 FFT.`,
    solution: r`**Step 1: size.** $L=3+2-1=4$, so $N=4$ is enough. Zero-pad:

$$
x_p=[1,\,-1,\,2,\,0],\qquad h_p=[2,\,1,\,0,\,0]
$$

**Step 2: FFT of $x_p$.** $G_x=\text{FFT}_2([1,2])=[3,-1]$ and $H_x=\text{FFT}_2([-1,0])=[-1,-1]$:

$$
X[k]=[\,2,\ -1+j,\ 4,\ -1-j\,]
$$

**Step 3: FFT of $h_p$.** $G_h=\text{FFT}_2([2,0])=[2,2]$ and $H_h=\text{FFT}_2([1,0])=[1,1]$:

$$
H[k]=[\,3,\ 2-j,\ 1,\ 2+j\,]
$$

**Step 4: multiply.**

$$
Y[k]=[\,6,\ -1+3j,\ 4,\ -1-3j\,]
$$

**Step 5: inverse FFT** with $W_4^{-1}=j$. Bit-reversed input $[\,6,\ 4,\ -1+3j,\ -1-3j\,]$:

- stage 1: $[\,10,\ 2,\ -2,\ 6j\,]$
- stage 2: $[\,8,\ -4,\ 12,\ 8\,]$

$$
y[n]=\tfrac14[\,8,\ -4,\ 12,\ 8\,]=[\,2,\ -1,\ 3,\ 2\,]
$$`,
  },
  {
    ...B,
    id: "sb-4.3",
    topic: "fft",
    ref: "Problem 4.3",
    title: "Fast convolution: the smallest FFT size",
    prompt: r`Compute the linear convolution of $x[n]=[1,\,0,\,1]$ and $h[n]=[1,\,-1,\,2]$. Use the smallest radix-2 FFT size and show the butterfly-based DFT steps.`,
    solution: r`**Step 1: size.** The output length is $3+3-1=5$, so the smallest radix-2 size is $N=8$. Zero-pad to length 8:

$$
x_p=[1,0,1,0,0,0,0,0],\qquad h_p=[1,-1,2,0,0,0,0,0]
$$

**Step 2: FFT of $x_p$.** Even part $[1,1,0,0]$, odd part all zero:

$$
G_x=[\,2,\ 1-j,\ 0,\ 1+j\,],\qquad H_x=[\,0,0,0,0\,]
$$

$$
X[k]=[\,2,\ 1-j,\ 0,\ 1+j,\ 2,\ 1-j,\ 0,\ 1+j\,]
$$

**Step 3: FFT of $h_p$.** Even part $[1,2,0,0]$, odd part $[-1,0,0,0]$:

$$
G_h=[\,3,\ 1-2j,\ -1,\ 1+2j\,],\qquad H_h=[\,-1,-1,-1,-1\,]
$$

Combining with $W_8^k$:

- $H[0]=2$, $\quad H[4]=4$
- $H[1]=(1-2j)-W_8=1-\frac1{\sqrt2}+\left(-2+\frac1{\sqrt2}\right)j$
- $H[2]=-1+j$, $\quad H[6]=-1-j$
- $H[3]=(1+2j)-W_8^3=1+\frac1{\sqrt2}+\left(2+\frac1{\sqrt2}\right)j$
- $H[5]=(1-2j)+W_8=1+\frac1{\sqrt2}+\left(-2-\frac1{\sqrt2}\right)j$
- $H[7]=(1+2j)+W_8^3=1-\frac1{\sqrt2}+\left(2-\frac1{\sqrt2}\right)j$

**Step 4: multiply.**

- $Y[0]=4$, $\ Y[2]=0$, $\ Y[4]=8$, $\ Y[6]=0$
- $Y[1]=-1+(-3+\sqrt2)j$, $\ Y[3]=-1+(3+\sqrt2)j$
- $Y[5]=-1-(3+\sqrt2)j$, $\ Y[7]=-1+(3-\sqrt2)j$

**Step 5: inverse 8-point FFT** (twiddles $W_8^{-k}$, bit-reversed input), stage by stage:

- stage 1: $[\,12,\ -4,\ 0,\ 0,\ -2-6j,\ 2\sqrt2j,\ -2+6j,\ 2\sqrt2j\,]$
- stage 2: $[\,12,\ -4,\ 12,\ -4,\ -4,\ -2\sqrt2+2\sqrt2j,\ -12j,\ 2\sqrt2+2\sqrt2j\,]$
- stage 3: $[\,8,\ -8,\ 24,\ -8,\ 16,\ 0,\ 0,\ 0\,]$

$$
y_p[n]=\tfrac18[\,8,\ -8,\ 24,\ -8,\ 16,\ 0,\ 0,\ 0\,]=[\,1,\ -1,\ 3,\ -1,\ 2,\ 0,\ 0,\ 0\,]
$$

**Result.**

$$
y[n]=[\,1,\ -1,\ 3,\ -1,\ 2\,]
$$`,
  },
  {
    ...B,
    id: "sb-4.4",
    topic: "fft",
    ref: "Problem 4.4",
    title: "What goes wrong with too small an FFT",
    prompt: r`Repeat Problem 4.3 incorrectly with a 4-point FFT and show the circular-convolution wrap-around.`,
    solution: r`**Step 1: pad to only 4.**

$$
x_p=[1,\,0,\,1,\,0],\qquad h_p=[1,\,-1,\,2,\,0]
$$

**Step 2: the two FFTs.**

$$
X[k]=[\,2,\ 0,\ 2,\ 0\,]
$$

For $h_p$: $G_h=\text{FFT}_2([1,2])=[3,-1]$ and $H_h=\text{FFT}_2([-1,0])=[-1,-1]$, so

$$
H[k]=[\,2,\ -1+j,\ 4,\ -1-j\,]
$$

**Step 3: multiply.**

$$
Y[k]=[\,4,\ 0,\ 8,\ 0\,]
$$

**Step 4: inverse FFT.**

$$
y_{\text{circ},4}[n]=[\,3,\ -1,\ 3,\ -1\,]
$$

**Step 5: compare with the correct linear result** $y=[1,-1,3,-1,2]$. The last sample, $2$, has **wrapped around** ($4\equiv0\pmod4$) and added onto the first sample $1$, giving $3$.
` + fig("sb-44") + r`
**Lesson:** the FFT length must be at least the full linear-convolution length, here 5, or the tail wraps around and corrupts the start.`,
  },

  /* ─────────────── 5. Nyquist–Shannon sampling theorem ─────────────── */
  {
    ...B,
    id: "sb-5.1",
    topic: "sampling",
    ref: "Problem 5.1",
    title: "The sampling theorem",
    prompt: r`State the Nyquist–Shannon sampling theorem in both angular-frequency and ordinary-frequency form.`,
    solution: r`**Statement.** If a continuous-time signal is band-limited to $|\omega|\le\omega_M$, it can be reconstructed exactly from uniform samples whenever

$$
\omega_s>2\omega_M
$$

In ordinary frequency:

$$
f_s>2f_M
$$

**Why.** The sampled spectrum is

$$
X_p(j\omega)=\frac1T\sum_{k=-\infty}^{\infty}X\big(j(\omega-k\omega_s)\big)
$$

so the theorem is really a **non-overlap condition** on these repeated copies.
` + fig("smp-copies"),
  },
  {
    ...B,
    id: "sb-5.2",
    topic: "sampling",
    ref: "Problem 5.2",
    title: "Deriving ωs > 2ωM",
    prompt: r`Derive the condition $\omega_s>2\omega_M$ by comparing adjacent spectral copies of a band-limited spectrum.`,
    solution: r`**Step 1:** the sampled spectrum holds copies centred at every multiple of $\omega_s$.

**Step 2:** the middle copy ends at $+\omega_M$. The next copy, centred at $\omega_s$, starts at $\omega_s-\omega_M$.

**Step 3:** no overlap requires the next copy to start after the middle one ends:

$$
\omega_s-\omega_M>\omega_M\ \Longrightarrow\ \omega_s>2\omega_M
$$
` + fig("smp-alias") + r`
If $\omega_s$ is too low, the copies overlap and aliasing occurs.`,
  },
  {
    ...B,
    id: "sb-5.3",
    topic: "sampling",
    ref: "Problem 5.3",
    title: "Safe or aliased?",
    prompt: r`A low-pass signal is band-limited to $|f|\le1.6$ kHz. Sketch the sampled spectrum for $f_s=4.5$ kHz and for $f_s=2.8$ kHz, and identify which case aliases.`,
    solution: r`**The Nyquist requirement:**

$$
f_s>2f_M=3.2\ \text{kHz}
$$

So $f_s=4.5$ kHz is safe, while $f_s=2.8$ kHz is too low.

**$f_s=4.5$ kHz.** The middle copy covers $[-1.6,\ 1.6]$ kHz. The nearest shifted copies start at

$$
\pm(4.5-1.6)=\pm2.9\ \text{kHz}
$$

leaving a clear gap.

**$f_s=2.8$ kHz.** The nearest copies start at

$$
\pm(2.8-1.6)=\pm1.2\ \text{kHz}
$$

which lies **inside** the middle band, so the copies overlap.
` + fig("sb-53") + r`
**Answer:** $f_s=2.8$ kHz aliases; $f_s=4.5$ kHz does not.`,
  },
  {
    ...B,
    id: "sb-5.4",
    topic: "sampling",
    ref: "Problem 5.4",
    title: "A safe and an unsafe rate",
    prompt: r`A signal contains tones at 1.2 kHz and 1.8 kHz. Give one safe sampling frequency and one unsafe sampling frequency.`,
    solution: r`The highest tone is $f_M=1.8$ kHz, so we need $f_s>3.6$ kHz.

**Safe: $f_s=4$ kHz.** The Nyquist frequency is $2$ kHz, so both tones stay where they are and remain distinct.

**Unsafe: $f_s=3$ kHz.** The Nyquist frequency is only $1.5$ kHz. The 1.8 kHz tone folds to

$$
f_{\text{alias}}=|1.8-3|=1.2\ \text{kHz}
$$

landing right on top of the real 1.2 kHz tone.
` + fig("sb-54"),
  },

  /* ─────────────── 6. Reconstruction ─────────────── */
  {
    ...B,
    id: "sb-6.1",
    topic: "sampling",
    ref: "Problem 6.1",
    title: "The ideal reconstruction filter",
    prompt: r`Write the impulse response and frequency response of the ideal reconstruction filter, and decide whether it is causal.`,
    solution: r`**Step 1: what the filter must do.** The sampled spectrum is

$$
X_p(j\omega)=\frac1T\sum_{r=-\infty}^{\infty}X\big(j(\omega-r\omega_s)\big)
$$

To get the original signal back, the filter must keep only the middle copy, $|\omega|<\frac{\omega_s}2$, and multiply by $T$ to cancel the $\frac1T$:

$$
H_{\text{ideal}}(j\omega)=\begin{cases}T,&|\omega|<\omega_s/2,\\0,&\text{otherwise.}\end{cases}
$$

**Step 2: impulse response** (inverse transform of this rectangle):

$$
h_{\text{ideal}}(t)=\frac1{2\pi}\int_{-\omega_s/2}^{\omega_s/2}T\,e^{j\omega t}\,d\omega=\frac{T}{2\pi}\left[\frac{e^{j\omega t}}{jt}\right]_{-\omega_s/2}^{\omega_s/2}
$$

$$
h_{\text{ideal}}(t)=\frac{T}{\pi t}\sin\!\left(\frac{\omega_st}2\right)=\frac{\sin(\pi t/T)}{\pi t/T}=\operatorname{sinc}\!\left(\frac tT\right)
$$

using $\omega_s=\frac{2\pi}T$ (here $\operatorname{sinc}x=\frac{\sin\pi x}{\pi x}$).
` + fig("sb-61") + r`
**Step 3: causal?** **No.** The sinc extends over both $t<0$ and $t>0$.`,
  },
  {
    ...B,
    id: "sb-6.2",
    topic: "sampling",
    ref: "Problem 6.2",
    title: "The zero-order hold",
    prompt: r`Derive the impulse response and frequency response of the zero-order hold (ZOH).`,
    solution: r`**Step 1: impulse response.** A zero-order hold keeps each sample at full height until the next one arrives. So the basic kernel is

$$
h_0(t)=\begin{cases}1,&0\le t<T,\\0,&\text{otherwise,}\end{cases}=u(t)-u(t-T)
$$
` + fig("sb-62") + r`
**Step 2: Fourier transform.**

$$
H_0(j\omega)=\int_0^Te^{-j\omega t}\,dt=\left[\frac{e^{-j\omega t}}{-j\omega}\right]_0^T=\frac{1-e^{-j\omega T}}{j\omega}
$$

**Step 3: factor out the midpoint delay $e^{-j\omega T/2}$.**

$$
H_0(j\omega)=\frac{e^{-j\omega T/2}\left(e^{j\omega T/2}-e^{-j\omega T/2}\right)}{j\omega}=e^{-j\omega T/2}\,\frac{2\sin(\omega T/2)}{\omega}
$$

$$
H_0(j\omega)=T\,e^{-j\omega T/2}\operatorname{sinc}\!\left(\frac{\omega T}{2\pi}\right)
$$

**Step 4: causal?** **Yes**, because $h_0(t)=0$ for $t<0$.`,
  },
  {
    ...B,
    id: "sb-6.3",
    topic: "sampling",
    ref: "Problem 6.3",
    title: "Linear interpolation",
    prompt: r`Derive the impulse response and frequency response of linear interpolation.`,
    solution: r`**Step 1: impulse response.** For linear interpolation, the weight of sample $y(nT)$ must rise linearly from 0 to 1 between $(n-1)T$ and $nT$, then fall linearly from 1 to 0 by $(n+1)T$. So the kernel is a triangle:

$$
h_1(t)=\begin{cases}1-\dfrac{|t|}T,&|t|<T,\\[6pt]0,&\text{otherwise.}\end{cases}
$$
` + fig("sb-63") + r`
**Step 2: write it as two rectangles convolved.** The triangle is the overlap of two centred ZOH rectangles:

$$
h_1(t)=\frac1T\big(h_0(t+T/2)*h_0(t+T/2)\big)
$$

**Step 3: transform.** Let $g(t)=h_0(t+T/2)$, a rectangle centred at the origin, so its transform has no phase term:

$$
G(j\omega)=T\operatorname{sinc}\!\left(\frac{\omega T}{2\pi}\right)
$$

By the convolution property:

$$
H_1(j\omega)=\frac1T\big(G(j\omega)\big)^2=\frac1T\left[T\operatorname{sinc}\!\left(\frac{\omega T}{2\pi}\right)\right]^2=T\operatorname{sinc}^2\!\left(\frac{\omega T}{2\pi}\right)
$$

**Step 4: causal?** This symmetric form is **not causal**, but a delayed version (by $T$) can be made causal.`,
  },
  {
    ...B,
    id: "sb-6.4",
    topic: "sampling",
    ref: "Problem 6.4",
    title: "Comparing the three at ωs/4",
    prompt: r`Compare the magnitude responses of ideal, ZOH and linear interpolation at $\omega=\omega_s/4$.`,
    solution: r`At $\omega=\frac{\omega_s}4=\frac{\pi}{2T}$, the argument of the sinc is $\frac{\omega T}{2\pi}=\frac14$.

**ZOH:**

$$
\frac{|H_0|}{T}=\operatorname{sinc}\!\left(\tfrac14\right)=\frac{2\sqrt2}{\pi}\approx0.900
$$

**Linear interpolation:**

$$
\frac{|H_1|}{T}=\operatorname{sinc}^2\!\left(\tfrac14\right)\approx0.811
$$

**Ideal:**

$$
\frac{|H_{\text{ideal}}|}{T}=1\qquad(\text{that is, }|H_{\text{ideal}}|=T)
$$
` + fig("sb-64") + r`
Both practical methods droop inside the band; linear interpolation droops more there, but it suppresses the image copies outside the band much better.`,
  },
  {
    ...B,
    id: "sb-6.5",
    topic: "sampling",
    ref: "Problem 6.5",
    title: "Pros and cons",
    prompt: r`State one main advantage and one main drawback of each of the three reconstruction methods.`,
    solution: r`| method | advantage | drawback |
|---|---|---|
| ideal | perfect reconstruction in theory | non-causal: cannot be built for real time |
| ZOH | extremely easy to implement in hardware | staircase distortion and sinc droop |
| linear interpolation | smoother than ZOH, better high-frequency behaviour | still only an approximation |`,
  },
  /* ─────────────── 7. Laplace transform: properties, ROC, poles and zeros ─────────────── */
  {
    ...B,
    id: "sb-7.1",
    topic: "laplace",
    ref: "Problem 7.1",
    title: "Delayed t·e^(−3t)",
    prompt: r`Find the Laplace transform and ROC of $x(t)=(t-2)e^{-3(t-2)}u(t-2)$.`,
    solution: r`**Step 1: the basic pair.**

$$
e^{-3t}u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{s+3},\qquad\text{ROC: }\mathrm{Re}\{s\}>-3
$$

**Step 2: multiply by $t$** (differentiate in $s$):

$$
te^{-3t}u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{(s+3)^2},\qquad\text{ROC: }\mathrm{Re}\{s\}>-3
$$

**Step 3: delay by 2.** The signal is $te^{-3t}u(t)$ moved right by 2, which multiplies by $e^{-2s}$:

$$
(t-2)e^{-3(t-2)}u(t-2)\ \xrightarrow{\ \mathcal L\ }\ e^{-2s}\frac1{(s+3)^2},\qquad\text{ROC: }\mathrm{Re}\{s\}>-3
$$
` + fig("sb-71"),
  },
  {
    ...B,
    id: "sb-7.2",
    topic: "laplace",
    ref: "Problem 7.2",
    title: "t²·e^(−3t)",
    prompt: r`Find the Laplace transform and ROC of $x(t)=t^2e^{-3t}u(t)$.`,
    solution: r`**Step 1: start from**

$$
e^{-3t}u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{s+3},\qquad\text{ROC: }\mathrm{Re}\{s\}>-3
$$

**Step 2: differentiate once in $s$** (multiplying by $t$ means $-\frac{d}{ds}$):

$$
te^{-3t}u(t)\ \xrightarrow{\ \mathcal L\ }\ -\frac{d}{ds}\left(\frac1{s+3}\right)=\frac1{(s+3)^2}
$$

**Step 3: differentiate once more.**

$$
t^2e^{-3t}u(t)\ \xrightarrow{\ \mathcal L\ }\ -\frac{d}{ds}\left(\frac1{(s+3)^2}\right)=\frac2{(s+3)^3},\qquad\text{ROC: }\mathrm{Re}\{s\}>-3
$$
` + fig("sb-72"),
  },
  {
    ...B,
    id: "sb-7.3",
    topic: "laplace",
    ref: "Problem 7.3",
    title: "A two-sided signal",
    prompt: r`Find the Laplace transform and ROC of $x(t)=te^{-t}u(t)+e^{2t}u(-t)$.`,
    solution: r`**Step 1: the right-sided term.**

$$
e^{-t}u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{s+1},\qquad\text{ROC: }\mathrm{Re}\{s\}>-1
$$

so

$$
te^{-t}u(t)\ \xrightarrow{\ \mathcal L\ }\ -\frac{d}{ds}\left(\frac1{s+1}\right)=\frac1{(s+1)^2},\qquad\text{ROC: }\mathrm{Re}\{s\}>-1
$$

**Step 2: the left-sided term.**

$$
e^{2t}u(-t)\ \xrightarrow{\ \mathcal L\ }\ -\frac1{s-2},\qquad\text{ROC: }\mathrm{Re}\{s\}<2
$$

**Step 3: add them.** The ROC is the overlap of the two:

$$
X(s)=\frac1{(s+1)^2}-\frac1{s-2},\qquad\text{ROC: }-1<\mathrm{Re}\{s\}<2
$$
` + fig("sb-73"),
  },
  {
    ...B,
    id: "sb-7.4",
    topic: "laplace",
    ref: "Problem 7.4",
    title: "Delayed damped cosine",
    prompt: r`Find the Laplace transform and ROC of $x(t)=e^{-4(t-1)}\cos\big(3(t-1)\big)u(t-1)$.`,
    solution: r`**Step 1: write the cosine as exponentials** (ignore the delay for now):

$$
e^{-4t}\cos(3t)u(t)=\tfrac12\left(e^{(-4+3j)t}+e^{(-4-3j)t}\right)u(t)
$$

**Step 2: transform each exponential.**

$$
e^{(-4+3j)t}u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{s+4-3j},\qquad e^{(-4-3j)t}u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{s+4+3j},\qquad\text{ROC: }\mathrm{Re}\{s\}>-4
$$

**Step 3: add.**

$$
e^{-4t}\cos(3t)u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac12\left(\frac1{s+4-3j}+\frac1{s+4+3j}\right)=\frac{s+4}{(s+4)^2+9}
$$

**Step 4: delay by 1.** This multiplies by $e^{-s}$ and does not change the ROC:

$$
e^{-4(t-1)}\cos\big(3(t-1)\big)u(t-1)\ \xrightarrow{\ \mathcal L\ }\ e^{-s}\frac{s+4}{(s+4)^2+9},\qquad\text{ROC: }\mathrm{Re}\{s\}>-4
$$
` + fig("sb-74"),
  },
  {
    ...B,
    id: "sb-7.5",
    topic: "laplace",
    ref: "Problem 7.5",
    title: "t·e^(−t)·sin 2t",
    prompt: r`Find the Laplace transform, ROC, poles and zeros of $x(t)=te^{-t}\sin(2t)u(t)$.`,
    solution: r`**Step 1: write the sine as exponentials.**

$$
e^{-t}\sin(2t)u(t)=\frac1{2j}\left(e^{(-1+2j)t}-e^{(-1-2j)t}\right)u(t)
$$

**Step 2: transform.** Each exponential gives $\frac1{s+1\mp2j}$, with ROC $\mathrm{Re}\{s\}>-1$:

$$
e^{-t}\sin(2t)u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{2j}\left(\frac1{s+1-2j}-\frac1{s+1+2j}\right)=\frac2{(s+1)^2+4}
$$

**Step 3: multiply by $t$** (differentiate in $s$):

$$
te^{-t}\sin(2t)u(t)\ \xrightarrow{\ \mathcal L\ }\ -\frac{d}{ds}\left(\frac2{(s+1)^2+4}\right)=\frac{4(s+1)}{\big((s+1)^2+4\big)^2},\qquad\text{ROC: }\mathrm{Re}\{s\}>-1
$$

**Poles and zeros:** double poles at $s=-1\pm2j$; one finite zero at $s=-1$.
` + fig("sb-75"),
  },
  {
    ...B,
    id: "sb-7.6",
    topic: "laplace",
    ref: "Problem 7.6",
    title: "Laplace transform of a convolution",
    prompt: r`Find the Laplace transform and ROC of $y(t)=\big(e^{-t}\sin(3t)u(t)\big)*\big(e^{-2t}u(t)\big)$.`,
    solution: r`**Step 1: the first signal.**

$$
e^{-t}\sin(3t)u(t)=\frac1{2j}\left(e^{(-1+3j)t}-e^{(-1-3j)t}\right)u(t)
$$

$$
e^{-t}\sin(3t)u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{2j}\left(\frac1{s+1-3j}-\frac1{s+1+3j}\right)=\frac3{(s+1)^2+9},\qquad\text{ROC: }\mathrm{Re}\{s\}>-1
$$

**Step 2: the second signal.**

$$
e^{-2t}u(t)\ \xrightarrow{\ \mathcal L\ }\ \frac1{s+2},\qquad\text{ROC: }\mathrm{Re}\{s\}>-2
$$

**Step 3: the convolution property.** Convolution in time is multiplication in $s$, and the ROC is (at least) the overlap of the two ROCs:

$$
Y(s)=\frac3{\big((s+1)^2+9\big)(s+2)},\qquad\text{ROC: }\mathrm{Re}\{s\}>-1
$$

**Poles:** $s=-1\pm3j$ and $s=-2$. No finite zeros.
` + fig("sb-76"),
  },

  /* ─────────────── 8. Inverse Laplace transform ─────────────── */
  {
    ...B,
    id: "sb-8.1",
    topic: "laplace",
    ref: "Problem 8.1",
    title: "Two real poles",
    prompt: r`Invert $X(s)=\dfrac{3s+7}{(s+1)(s+2)}$ with ROC $\mathrm{Re}\{s\}>-1$.`,
    solution: r`**The residue method for partial fractions.** For a rational $F(s)$:

- **simple pole** at $s=p$: the coefficient of $\frac1{s-p}$ is $A=\lim_{s\to p}(s-p)F(s)$;
- **double pole** at $s=p$: in $\frac{A_2}{(s-p)^2}+\frac{A_1}{s-p}$, use $A_2=\lim_{s\to p}(s-p)^2F(s)$ and $A_1=\frac{d}{ds}\big((s-p)^2F(s)\big)\Big|_{s=p}$.

The same formulas work for the z-transform with $z^{-1}$ in place of $s$.

**Step 1: partial fractions.**

$$
\frac{3s+7}{(s+1)(s+2)}=\frac A{s+1}+\frac B{s+2}
$$

**Step 2: residues at the simple poles.**

$$
A=\lim_{s\to-1}(s+1)\frac{3s+7}{(s+1)(s+2)}=4,\qquad B=\lim_{s\to-2}(s+2)\frac{3s+7}{(s+1)(s+2)}=-1
$$

**Step 3: invert.** The ROC is to the right of both poles, so both terms are right-sided:

$$
x(t)=\left(4e^{-t}-e^{-2t}\right)u(t)
$$
` + fig("sb-81"),
  },
  {
    ...B,
    id: "sb-8.2",
    topic: "laplace",
    ref: "Problem 8.2",
    title: "Complex poles",
    prompt: r`Invert $X(s)=\dfrac{2s+3}{s^2+2s+5}$ with ROC $\mathrm{Re}\{s\}>-1$.`,
    solution: r`(If you remember the pair for $e^{at}\sin(bt)$, this is quicker. Here it is derived from the complex poles directly.)

**Step 1: factor over the complex numbers.**

$$
s^2+2s+5=(s+1)^2+4=(s+1-2j)(s+1+2j)
$$

$$
X(s)=\frac A{s+1-2j}+\frac B{s+1+2j}
$$

**Step 2: residues.**

$$
A=\lim_{s\to-1+2j}(s+1-2j)X(s)=\frac{2(-1+2j)+3}{(-1+2j)+1+2j}=\frac{1+4j}{4j}=1-\frac j4
$$

$$
B=\lim_{s\to-1-2j}(s+1+2j)X(s)=\frac{1-4j}{-4j}=1+\frac j4
$$

**Step 3: invert.** The ROC is to the right of both poles, so both terms are right-sided:

$$
x(t)=\left(1-\frac j4\right)e^{(-1+2j)t}u(t)+\left(1+\frac j4\right)e^{(-1-2j)t}u(t)
$$

**Step 4: combine the conjugate terms.** Take out $e^{-t}u(t)$:

$$
\left(1-\frac j4\right)e^{j2t}+\left(1+\frac j4\right)e^{-j2t}=\left(e^{j2t}+e^{-j2t}\right)+\frac j4\left(e^{-j2t}-e^{j2t}\right)
$$

With $e^{j2t}+e^{-j2t}=2\cos2t$ and $e^{-j2t}-e^{j2t}=-2j\sin2t$:

$$
x(t)=\left(2e^{-t}\cos2t+\tfrac12e^{-t}\sin2t\right)u(t)
$$
` + fig("sb-82"),
  },
  {
    ...B,
    id: "sb-8.3",
    topic: "laplace",
    ref: "Problem 8.3",
    title: "A strip ROC",
    prompt: r`Invert $X(s)=\dfrac{-5}{(s+1)(s-4)}$ with ROC $-1<\mathrm{Re}\{s\}<4$.`,
    solution: r`**Step 1: partial fractions** (simple-pole residues):

$$
\lim_{s\to-1}(s+1)\frac{-5}{(s+1)(s-4)}=1,\qquad\lim_{s\to4}(s-4)\frac{-5}{(s+1)(s-4)}=-1
$$

$$
\frac{-5}{(s+1)(s-4)}=\frac1{s+1}-\frac1{s-4}
$$

**Step 2: each pole's side.** The ROC is a **strip** between the poles, so the signal is two-sided:

- Pole at $s=-1$, **left** of the strip: a right-sided term, $e^{-t}u(t)$.
- Pole at $s=4$, **right** of the strip: a left-sided term. Since $\frac1{s-4}\xrightarrow{\mathcal L^{-1}}-e^{4t}u(-t)$ for $\mathrm{Re}\{s\}<4$, the term $-\frac1{s-4}$ gives $e^{4t}u(-t)$.

$$
x(t)=e^{-t}u(t)+e^{4t}u(-t)
$$
` + fig("sb-83"),
  },
  {
    ...B,
    id: "sb-8.4",
    topic: "laplace",
    ref: "Problem 8.4",
    title: "Repeated imaginary poles",
    prompt: r`Invert $X(s)=\dfrac{s}{(s^2+4)^2}$ with ROC $\mathrm{Re}\{s\}>0$.`,
    solution: r`(Partial fractions over the repeated poles at $\pm2j$ works, but spotting the sine pair and differentiating is quicker.)

**Step 1: the sine pair.**

$$
\frac2{s^2+4}\ \xrightarrow{\ \mathcal L^{-1}\ }\ \sin(2t)u(t),\qquad\text{ROC: }\mathrm{Re}\{s\}>0
$$

**Step 2: differentiate in $s$.** Using $-\frac{dX}{ds}\xrightarrow{\mathcal L^{-1}}t\,x(t)$:

$$
-\frac{d}{ds}\left(\frac2{s^2+4}\right)=\frac{4s}{(s^2+4)^2}
$$

so

$$
\frac{4s}{(s^2+4)^2}\ \xrightarrow{\ \mathcal L^{-1}\ }\ t\sin(2t)u(t)
$$

**Step 3: scale by $\frac14$.**

$$
x(t)=\tfrac14t\sin(2t)\,u(t),\qquad\text{ROC: }\mathrm{Re}\{s\}>0
$$
` + fig("sb-84"),
  },
  {
    ...B,
    id: "sb-8.5",
    topic: "laplace",
    ref: "Problem 8.5",
    title: "A delay factor",
    prompt: r`Invert $X(s)=\dfrac{e^{-s}}{s(s+2)}$ with ROC $\mathrm{Re}\{s\}>0$.`,
    solution: r`**Step 1: ignore the delay first.** Let

$$
Y(s)=\frac1{s(s+2)},\qquad\text{ROC: }\mathrm{Re}\{s\}>0
$$

**Step 2: partial fractions.**

$$
A=\lim_{s\to0}sY(s)=\tfrac12,\qquad B=\lim_{s\to-2}(s+2)Y(s)=-\tfrac12
$$

$$
Y(s)=\frac{1/2}{s}-\frac{1/2}{s+2}
$$

**Step 3: invert term by term** (both right-sided, since the ROC is $\mathrm{Re}\{s\}>0$):

$$
y(t)=\tfrac12\left(1-e^{-2t}\right)u(t)
$$

**Step 4: the delay.** $e^{-s}$ delays by one unit and does not change the ROC:

$$
x(t)=y(t-1)=\tfrac12\left(1-e^{-2(t-1)}\right)u(t-1)
$$
` + fig("sb-85"),
  },
  {
    ...B,
    id: "sb-8.6",
    topic: "laplace",
    ref: "Problem 8.6",
    title: "Dividing by s means integrating",
    prompt: r`Invert $X(s)=\dfrac{2}{s(s^2+4)}$ with ROC $\mathrm{Re}\{s\}>0$.`,
    solution: r`**Step 1: write $X$ as something divided by $s$.**

$$
Y(s)=\frac2{s^2+4},\qquad X(s)=\frac{Y(s)}s
$$

**Step 2: the sine pair.**

$$
Y(s)\ \xrightarrow{\ \mathcal L^{-1}\ }\ \sin(2t)u(t)
$$

**Step 3: the integration property.** Dividing by $s$ means integrating in time:

$$
\frac{Y(s)}s\ \xrightarrow{\ \mathcal L^{-1}\ }\ \int_{-\infty}^ty(\tau)\,d\tau
$$

Since $y$ is right-sided:

$$
x(t)=\int_0^t\sin(2\tau)\,d\tau\;u(t)=\left[-\frac{\cos2\tau}2\right]_0^t u(t)=\tfrac12\big(1-\cos2t\big)u(t)
$$
` + fig("sb-86"),
  },
  {
    ...B,
    id: "sb-8.7",
    topic: "laplace",
    ref: "Problem 8.7",
    title: "An improper fraction",
    prompt: r`Invert $X(s)=\dfrac{s}{s+2}$ with ROC $\mathrm{Re}\{s\}>-2$.`,
    solution: r`**Step 1: divide first** (the fraction is improper):

$$
\frac s{s+2}=1-\frac2{s+2}
$$

**Step 2: invert each part.**

- The constant 1 is an impulse: $1\xrightarrow{\mathcal L^{-1}}\delta(t)$, whose ROC is the entire $s$-plane.
- $\dfrac2{s+2}\xrightarrow{\mathcal L^{-1}}2e^{-2t}u(t)$, ROC $\mathrm{Re}\{s\}>-2$.

$$
x(t)=\delta(t)-2e^{-2t}u(t)
$$

The impulse does not restrict the ROC, so it stays $\mathrm{Re}\{s\}>-2$.

**Check another way.** $\frac s{s+2}=s\cdot\frac1{s+2}$, and multiplying by $s$ means differentiating:

$$
\frac{d}{dt}\left[e^{-2t}u(t)\right]=\delta(t)-2e^{-2t}u(t)\ ✓
$$
` + fig("sb-87"),
  },

  /* ─────────────── 9. Applications of the Laplace transform ─────────────── */
  {
    ...B,
    id: "sb-9.1",
    topic: "laplace",
    ref: "Problem 9.1",
    title: "ROC choices after cancellation",
    prompt: r`For $H(s)=\dfrac{s+2}{(s+1)(s+2)}$, determine the admissible ROC choices and the corresponding causality and stability properties.`,
    solution: r`**Step 1: cancel.**

$$
H(s)=\frac1{s+1}
$$

**Step 2: the possible ROCs.** Only one pole is left, at $-1$:

$$
\mathrm{Re}\{s\}>-1\qquad\text{or}\qquad\mathrm{Re}\{s\}<-1
$$

**Step 3: what each one means.**

- $\mathrm{Re}\{s\}>-1$: $h(t)=e^{-t}u(t)$, **causal and stable**.
- $\mathrm{Re}\{s\}<-1$: $h(t)=-e^{-t}u(-t)$, **anti-causal and unstable**.
` + fig("sb-91"),
  },
  {
    ...B,
    id: "sb-9.2",
    topic: "laplace",
    ref: "Problem 9.2",
    title: "Three ROC choices",
    prompt: r`For $H(s)=\dfrac{1}{(s+1)^2(s+3)}$, determine the admissible ROC choices and the corresponding causality and stability properties.`,
    solution: r`The poles are at $s=-1$ (double) and $s=-3$, all in the left half-plane. Three ROCs are possible:

| ROC | type | stable? |
|---|---|---|
| $\mathrm{Re}\{s\}>-1$ | causal | yes ($j\omega$-axis included) |
| $-3<\mathrm{Re}\{s\}<-1$ | two-sided | no ($j\omega$-axis not included) |
| $\mathrm{Re}\{s\}<-3$ | anti-causal | no |
` + fig("sb-92") + r`
Because all the poles lie in the left half-plane, the causal choice is also stable.`,
  },
  {
    ...B,
    id: "sb-9.3",
    topic: "laplace",
    ref: "Problem 9.3",
    title: "Does the Fourier transform exist?",
    prompt: r`Decide whether the Fourier transform exists for $X(s)=\dfrac{1-e^{-3(s+2)}}{s+2}$. Interpret the result in the time domain.`,
    solution: r`**Step 1: make the delay visible.**

$$
X(s)=\frac1{s+2}-\frac{e^{-3(s+2)}}{s+2}=\frac1{s+2}-e^{-6}\frac{e^{-3s}}{s+2}
$$

**Step 2: invert each term.**

$$
\frac1{s+2}\ \xrightarrow{\ \mathcal L^{-1}\ }\ e^{-2t}u(t)
$$

With the delay of 3:

$$
e^{-6}\frac{e^{-3s}}{s+2}\ \xrightarrow{\ \mathcal L^{-1}\ }\ e^{-6}e^{-2(t-3)}u(t-3)=e^{-2t}u(t-3)
$$

**Step 3: the time signal.**

$$
x(t)=e^{-2t}u(t)-e^{-2t}u(t-3)=e^{-2t}\big(u(t)-u(t-3)\big)
$$

$$
x(t)=\begin{cases}0,&t<0,\\e^{-2t},&0\le t<3,\\0,&t\ge3.\end{cases}
$$
` + fig("sb-93") + r`
**Step 4: the ROC.** $x(t)$ lasts only from $0$ to $3$. For such a finite-duration signal the Laplace integral converges for every $s$, so the actual ROC is the **entire $s$-plane**. The apparent pole at $s=-2$ is removable:

$$
\lim_{s\to-2}\frac{1-e^{-3(s+2)}}{s+2}=\lim_{z\to0}\frac{1-e^{-3z}}{z}=3
$$

**Answer:** the ROC is the whole plane, which includes the $j\omega$-axis, so **the Fourier transform exists**.`,
  },
  {
    ...B,
    id: "sb-9.4",
    topic: "laplace",
    ref: "Problem 9.4",
    title: "First-order differential equation",
    prompt: r`Solve $y'(t)+y(t)=e^{-2(t-1)}u(t-1)$ with $y(0^-)=0$.`,
    solution: r`**Step 1: transform**, using $\mathcal L\{y'(t)\}=sY(s)$:

$$
sY(s)+Y(s)=\frac{e^{-s}}{s+2}
$$

$$
Y(s)=\frac{e^{-s}}{(s+1)(s+2)}
$$

**Step 2: partial fractions.**

$$
\frac1{(s+1)(s+2)}=\frac1{s+1}-\frac1{s+2}
$$

**Step 3: the three possible ROCs** (poles at $-1$ and $-2$), and the signal each gives:

- $\mathrm{Re}\{s\}>-1$: $\ y_1(t)=\left(e^{-(t-1)}-e^{-2(t-1)}\right)u(t-1)$
- $-2<\mathrm{Re}\{s\}<-1$: $\ y_2(t)=-e^{-(t-1)}u(1-t)-e^{-2(t-1)}u(t-1)$
- $\mathrm{Re}\{s\}<-2$: $\ y_3(t)=\left(e^{-2(t-1)}-e^{-(t-1)}\right)u(1-t)$

**Step 4: use the initial condition** $y(0^-)=0$. Only $y_1$ satisfies it, so the ROC is $\mathrm{Re}\{s\}>-1$:

$$
y(t)=\left(e^{-(t-1)}-e^{-2(t-1)}\right)u(t-1)
$$
` + fig("sb-94") + r`
**Check:** for $t>1$, $y'+y=\left(-e^{-(t-1)}+2e^{-2(t-1)}\right)+\left(e^{-(t-1)}-e^{-2(t-1)}\right)=e^{-2(t-1)}$. ✓`,
  },
  {
    ...B,
    id: "sb-9.5",
    topic: "laplace",
    ref: "Problem 9.5",
    title: "Second-order differential equation",
    prompt: r`Solve $y''(t)+3y'(t)+2y(t)=e^{-(t-1)}u(t-1)$ with zero initial conditions.`,
    solution: r`**Step 1: transform**, using $\mathcal L\{y'\}=sY$ and $\mathcal L\{y''\}=s^2Y$:

$$
s^2Y(s)+3sY(s)+2Y(s)=\frac{e^{-s}}{s+1}
$$

$$
Y(s)=\frac{e^{-s}}{(s+1)^2(s+2)}
$$

**Step 2: partial fractions of** $F(s)=\dfrac1{(s+1)^2(s+2)}=\dfrac A{s+1}+\dfrac B{(s+1)^2}+\dfrac C{s+2}$.

- $C=\lim_{s\to-2}(s+2)F(s)=1$
- $B=\lim_{s\to-1}(s+1)^2F(s)=1$
- $A=\dfrac{d}{ds}\Big((s+1)^2F(s)\Big)\Big|_{s=-1}=-1$

$$
\frac1{(s+1)^2(s+2)}=\frac1{s+2}-\frac1{s+1}+\frac1{(s+1)^2}
$$

**Step 3: the possible ROCs and signals.**

- $\mathrm{Re}\{s\}>-1$: $\ y_1(t)=\left(e^{-2(t-1)}-e^{-(t-1)}+(t-1)e^{-(t-1)}\right)u(t-1)$
- $-2<\mathrm{Re}\{s\}<-1$: $\ y_2(t)=e^{-2(t-1)}u(t-1)+(2-t)e^{-(t-1)}u(1-t)$
- $\mathrm{Re}\{s\}<-2$: $\ y_3(t)=\left(-e^{-2(t-1)}+(2-t)e^{-(t-1)}\right)u(1-t)$

**Step 4: initial conditions.** $y(0^-)=y'(0^-)=y''(0^-)=0$ allows only $\mathrm{Re}\{s\}>-1$; that signal is zero for $t<1$:

$$
y(t)=\left(e^{-2(t-1)}-e^{-(t-1)}+(t-1)e^{-(t-1)}\right)u(t-1)
$$
` + fig("sb-95"),
  },
  {
    ...B,
    id: "sb-9.6",
    topic: "laplace",
    ref: "Problem 9.6",
    title: "System function from an LCCDE",
    prompt: r`A causal LTI system is described by

$$
\frac{d^2y}{dt^2}+5\frac{dy}{dt}+6y(t)=\frac{dx}{dt}+3x(t).
$$

Find $H(s)$, sketch the pole–zero plot, determine whether the system is stable, and find the impulse response $h(t)$.`,
    solution: r`**Step 1: transform both sides.**

$$
s^2Y(s)+5sY(s)+6Y(s)=sX(s)+3X(s)
$$

**Step 2: $H(s)=\frac{Y(s)}{X(s)}$.**

$$
H(s)=\frac{s+3}{s^2+5s+6}=\frac{s+3}{(s+2)(s+3)}=\frac1{s+2}
$$

**Step 3: poles and zeros.** The pole and zero at $s=-3$ cancel. The remaining pole is at $s=-2$, with no finite zeros. $\frac1{s+2}$ allows two ROCs, $\mathrm{Re}\{s\}>-2$ or $\mathrm{Re}\{s\}<-2$.

**Step 4: causal, so take the right half.**

$$
\text{ROC: }\mathrm{Re}\{s\}>-2
$$
` + fig("sb-96") + r`
**Step 5: impulse response and stability.**

$$
h(t)=e^{-2t}u(t)
$$

The ROC contains the $j\omega$-axis, so the system is **stable**.`,
  },
  /* ─────────────── 10. z-transform: definition, properties, ROC, poles and zeros ─────────────── */
  {
    ...B,
    id: "sb-10.1",
    topic: "z-transform",
    ref: "Problem 10.1",
    title: "Damped cosine",
    prompt: r`Find the z-transform, poles, zeros, and ROC of $x[n]=\left(\tfrac34\right)^n\cos\!\left(\tfrac{\pi n}3\right)u[n]$.`,
    solution: r`**Step 1: write the cosine as exponentials** (Euler):

$$
x[n]=\frac12\left(\frac34e^{j\pi/3}\right)^nu[n]+\frac12\left(\frac34e^{-j\pi/3}\right)^nu[n]
$$

**Step 2: transform each part.** Both are right-sided geometric sequences of radius $\tfrac34$:

$$
\frac12\left(\frac34e^{\pm j\pi/3}\right)^nu[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac{\frac12}{1-\frac34e^{\pm j\pi/3}z^{-1}},\qquad\text{ROC: }|z|>\frac34
$$

**Step 3: combine over a common denominator.**

$$
X(z)=\frac{\frac12\left(1-\frac34e^{-j\pi/3}z^{-1}\right)+\frac12\left(1-\frac34e^{j\pi/3}z^{-1}\right)}{\left(1-\frac34e^{j\pi/3}z^{-1}\right)\left(1-\frac34e^{-j\pi/3}z^{-1}\right)}
$$

Use $e^{j\pi/3}+e^{-j\pi/3}=2\cos\frac\pi3=1$ and $e^{j\pi/3}e^{-j\pi/3}=1$:

$$
X(z)=\frac{1-\frac38z^{-1}}{1-\frac34z^{-1}+\frac9{16}z^{-2}},\qquad\text{ROC: }|z|>\frac34
$$

**Poles:** $z=\tfrac34e^{\pm j\pi/3}$. **Zeros:** $z=0$ and $z=\tfrac38$.
` + fig("sb-101"),
  },
  {
    ...B,
    id: "sb-10.2",
    topic: "z-transform",
    ref: "Problem 10.2",
    title: "Delayed n·(1/3)ⁿ",
    prompt: r`Find the z-transform and ROC of $x[n]=(n-2)\left(\tfrac13\right)^{n-2}u[n-2]$.`,
    solution: r`**Step 1: the geometric sequence.**

$$
g[n]=\left(\frac13\right)^nu[n]\ \xrightarrow{\ \mathcal Z\ }\ G(z)=\frac1{1-\frac13z^{-1}},\qquad\text{ROC: }|z|>\frac13
$$

**Step 2: multiply by $n$.** The differentiation property: $n\,g[n]\xrightarrow{\mathcal Z}-z\frac{dG}{dz}$.

$$
-z\frac{dG}{dz}=-z\frac{d}{dz}\left(1-\frac13z^{-1}\right)^{-1}=\frac{\frac13z^{-1}}{\left(1-\frac13z^{-1}\right)^2}
$$

So with $x_0[n]=n\left(\frac13\right)^nu[n]$:

$$
X_0(z)=\frac{\frac13z^{-1}}{\left(1-\frac13z^{-1}\right)^2},\qquad\text{ROC: }|z|>\frac13
$$

**Step 3: delay by 2.** $x[n]=x_0[n-2]$, which multiplies by $z^{-2}$:

$$
X(z)=z^{-2}\frac{\frac13z^{-1}}{\left(1-\frac13z^{-1}\right)^2},\qquad\text{ROC: }|z|>\frac13
$$

**Positive-power form:**

$$
X(z)=\frac1{3z\left(z-\frac13\right)^2}
$$

The two-sample delay adds a pole at $z=0$; the repeated factor gives a double pole at $z=\tfrac13$.
` + fig("sb-102"),
  },
  {
    ...B,
    id: "sb-10.3",
    topic: "z-transform",
    ref: "Problem 10.3",
    title: "A two-sided sequence",
    prompt: r`Find the z-transform, poles, zeros, and ROC of $x[n]=\left(\tfrac14\right)^nu[n]-2^nu[-n-1]$.`,
    solution: r`**Step 1: split it.**

$$
x_1[n]=\left(\frac14\right)^nu[n],\qquad x_2[n]=-2^nu[-n-1]
$$

**Step 2: the right-sided part.**

$$
x_1[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-\frac14z^{-1}},\qquad\text{ROC: }|z|>\frac14
$$

**Step 3: the left-sided part.**

$$
x_2[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-2z^{-1}},\qquad\text{ROC: }|z|<2
$$

**Step 4: add them.** The ROC is the overlap:

$$
X(z)=\frac1{1-\frac14z^{-1}}+\frac1{1-2z^{-1}},\qquad\text{ROC: }\frac14<|z|<2
$$

Over a common denominator:

$$
X(z)=\frac{\left(1-2z^{-1}\right)+\left(1-\frac14z^{-1}\right)}{\left(1-\frac14z^{-1}\right)\left(1-2z^{-1}\right)}=\frac{2\left(1-\frac98z^{-1}\right)}{\left(1-\frac14z^{-1}\right)\left(1-2z^{-1}\right)}
$$

**Poles:** $z=\tfrac14,\ 2$. **Zeros:** $z=0,\ \tfrac98$.
` + fig("sb-103"),
  },
  {
    ...B,
    id: "sb-10.4",
    topic: "z-transform",
    ref: "Problem 10.4",
    title: "A finite sequence",
    prompt: r`Find the z-transform and zero pattern of $x[n]=\delta[n]-2\delta[n-1]+2\delta[n-2]-\delta[n-3]$.`,
    solution: r`**Step 1: one term per sample.**

$$
X(z)=1-2z^{-1}+2z^{-2}-z^{-3}
$$

**Step 2: multiply by $z^3$ and factor.**

$$
z^3X(z)=z^3-2z^2+2z-1=(z-1)(z^2-z+1)
$$

$$
X(z)=\frac{(z-1)(z^2-z+1)}{z^3}
$$

**Step 3: zeros and poles.**

- Zeros: $z=1$, $z=e^{j\pi/3}$, $z=e^{-j\pi/3}$ (all on the unit circle).
- The $z^3$ in the denominator is a pole of order 3 at $z=0$.

**ROC.** The sequence is finite and right-sided, so

$$
\text{ROC: }\mathbb C\setminus\{0\}
$$
` + fig("sb-104"),
  },
  {
    ...B,
    id: "sb-10.5",
    topic: "z-transform",
    ref: "Problem 10.5",
    title: "Delayed damped cosine",
    prompt: r`Find the z-transform, poles, zeros, and ROC of $x[n]=\left(\tfrac12\right)^{n-1}\cos\!\left(\tfrac{\pi(n-1)}3\right)u[n-1]$.`,
    solution: r`**Step 1: the undelayed sequence.**

$$
x_0[n]=\left(\frac12\right)^n\cos\left(\frac{\pi n}3\right)u[n]=\frac12\left(\frac12e^{j\pi/3}\right)^nu[n]+\frac12\left(\frac12e^{-j\pi/3}\right)^nu[n]
$$

**Step 2: transform each part.**

$$
\frac12\left(\frac12e^{\pm j\pi/3}\right)^nu[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac{\frac12}{1-\frac12e^{\pm j\pi/3}z^{-1}},\qquad\text{ROC: }|z|>\frac12
$$

**Step 3: combine** (as in Problem 10.1, using $e^{j\pi/3}+e^{-j\pi/3}=1$):

$$
X_0(z)=\frac{1-\frac14z^{-1}}{1-\frac12z^{-1}+\frac14z^{-2}},\qquad\text{ROC: }|z|>\frac12
$$

**Step 4: the unit delay.**

$$
X(z)=z^{-1}X_0(z)=\frac{z^{-1}\left(1-\frac14z^{-1}\right)}{1-\frac12z^{-1}+\frac14z^{-2}},\qquad\text{ROC: }|z|>\frac12
$$

**Positive-power form:**

$$
X(z)=\frac{z-\frac14}{z^2-\frac12z+\frac14}
$$

**Poles:** $z=\tfrac12e^{\pm j\pi/3}$. **Zero:** only $z=\tfrac14$. The undelayed $X_0(z)$ also had a zero at $z=0$; the extra $z^{-1}$ from the delay removes it.
` + fig("sb-105"),
  },
  {
    ...B,
    id: "sb-10.6",
    topic: "z-transform",
    ref: "Problem 10.6",
    title: "z-transform of a convolution",
    prompt: r`Find the z-transform, poles, zeros, and ROC of $y[n]=\left(\left(\tfrac12\right)^nu[n]\right)*\left(\left(\tfrac13\right)^nu[n]\right)$.`,
    solution: r`**Step 1: transform each sequence.**

$$
\left(\frac12\right)^nu[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-\frac12z^{-1}},\qquad\text{ROC: }|z|>\frac12
$$

$$
\left(\frac13\right)^nu[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-\frac13z^{-1}},\qquad\text{ROC: }|z|>\frac13
$$

**Step 2: the convolution property.** Convolution in time is multiplication in $z$; the ROC is the intersection:

$$
Y(z)=\frac1{\left(1-\frac12z^{-1}\right)\left(1-\frac13z^{-1}\right)},\qquad\text{ROC: }|z|>\frac12
$$

**Positive-power form:**

$$
Y(z)=\frac{z^2}{\left(z-\frac12\right)\left(z-\frac13\right)}
$$

**Poles:** $z=\tfrac12,\ \tfrac13$. **Zeros:** a double zero at $z=0$.
` + fig("sb-106"),
  },
  {
    ...B,
    id: "sb-10.7",
    topic: "z-transform",
    ref: "Problem 10.7",
    title: "Running sum (accumulator)",
    prompt: r`Let $x[n]=\left(\tfrac12\right)^nu[n]$. Find the z-transform and ROC of the running sum $y[n]=\sum_{k=-\infty}^{n}x[k]$.`,
    solution: r`**Step 1: transform the input.**

$$
X(z)=\frac1{1-\frac12z^{-1}},\qquad\text{ROC: }|z|>\frac12
$$

**Step 2: the accumulation property.** A running sum is convolution with $u[n]$, and

$$
u[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-z^{-1}},\qquad\text{ROC: }|z|>1
$$

so

$$
Y(z)=\frac{X(z)}{1-z^{-1}}=\frac1{\left(1-z^{-1}\right)\left(1-\frac12z^{-1}\right)},\qquad\text{ROC: }|z|>1
$$

The accumulator's new pole at $z=1$ restricts the ROC to $|z|>1$.

**Positive-power form:**

$$
Y(z)=\frac{z^2}{(z-1)\left(z-\frac12\right)}
$$

so there is also a double zero at $z=0$.
` + fig("sb-107"),
  },

  /* ─────────────── 11. Inverse z-transform ─────────────── */
  {
    ...B,
    id: "sb-11.1",
    topic: "z-transform",
    ref: "Problem 11.1",
    title: "Two real poles, right-sided",
    prompt: r`Invert $X(z)=\dfrac{2-z^{-1}}{\left(1-\frac14z^{-1}\right)\left(1-\frac34z^{-1}\right)}$ for $|z|>\tfrac34$.`,
    solution: r`**Step 1: partial fractions** in powers of $z^{-1}$:

$$
X(z)=\frac A{1-\frac14z^{-1}}+\frac B{1-\frac34z^{-1}}
$$

**Step 2: residues.** Let $r=z^{-1}$; the poles are at $r=4$ and $r=\frac43$.

$$
A=\left.\left(1-\tfrac14r\right)\frac{2-r}{\left(1-\frac14r\right)\left(1-\frac34r\right)}\right|_{r=4}=\frac{2-4}{1-3}=1
$$

$$
B=\left.\left(1-\tfrac34r\right)\frac{2-r}{\left(1-\frac14r\right)\left(1-\frac34r\right)}\right|_{r=4/3}=\frac{2-\frac43}{1-\frac13}=1
$$

$$
X(z)=\frac1{1-\frac14z^{-1}}+\frac1{1-\frac34z^{-1}}
$$

**Step 3: invert.** $|z|>\frac34$ lies outside both poles, so both terms are right-sided:

$$
x[n]=\left(\frac14\right)^nu[n]+\left(\frac34\right)^nu[n]
$$

**Positive-power form:** $X(z)=\dfrac{z(2z-1)}{\left(z-\frac14\right)\left(z-\frac34\right)}$, so the zeros are at $z=0$ and $z=\tfrac12$.
` + fig("sb-111"),
  },
  {
    ...B,
    id: "sb-11.2",
    topic: "z-transform",
    ref: "Problem 11.2",
    title: "An annulus ROC",
    prompt: r`Invert $X(z)=\dfrac{1}{\left(1-2z^{-1}\right)\left(1-\frac13z^{-1}\right)}$ for $\tfrac13<|z|<2$.`,
    solution: r`**Step 1: partial fractions.**

$$
X(z)=\frac A{1-2z^{-1}}+\frac B{1-\frac13z^{-1}}
$$

**Step 2: residues** (with $r=z^{-1}$):

$$
A=\left.\frac1{1-\frac13r}\right|_{r=1/2}=\frac1{1-\frac16}=\frac65,\qquad B=\left.\frac1{1-2r}\right|_{r=3}=\frac1{1-6}=-\frac15
$$

$$
X(z)=\frac{6/5}{1-2z^{-1}}-\frac{1/5}{1-\frac13z^{-1}}
$$

**Step 3: each pole's side.** In $\frac13<|z|<2$:

- The pole at $z=2$ is **outside** the ROC, so it gives a left-sided term: $\frac{6/5}{1-2z^{-1}}\to-\frac65\,2^nu[-n-1]$.
- The pole at $z=\frac13$ is **inside**, so it gives a right-sided term: $-\frac{1/5}{1-\frac13z^{-1}}\to-\frac15\left(\frac13\right)^nu[n]$.

$$
x[n]=-\frac65\cdot2^nu[-n-1]-\frac15\left(\frac13\right)^nu[n]
$$

**Positive-power form:** $X(z)=\dfrac{z^2}{(z-2)\left(z-\frac13\right)}$, a double zero at $z=0$.
` + fig("sb-112"),
  },
  {
    ...B,
    id: "sb-11.3",
    topic: "z-transform",
    ref: "Problem 11.3",
    title: "A left-sided inverse",
    prompt: r`Invert $X(z)=\dfrac{1-\frac56z^{-1}}{\left(1-\frac12z^{-1}\right)\left(1-\frac13z^{-1}\right)}$ for $|z|<\tfrac13$.`,
    solution: r`**Step 1: partial fractions.**

$$
X(z)=\frac A{1-\frac12z^{-1}}+\frac B{1-\frac13z^{-1}}
$$

**Step 2: residues** (with $r=z^{-1}$):

$$
A=\left.\frac{1-\frac56r}{1-\frac13r}\right|_{r=2}=\frac{-\frac23}{\frac13}=-2,\qquad B=\left.\frac{1-\frac56r}{1-\frac12r}\right|_{r=3}=\frac{-\frac32}{-\frac12}=3
$$

$$
X(z)=\frac{-2}{1-\frac12z^{-1}}+\frac3{1-\frac13z^{-1}}
$$

**Step 3: invert.** $|z|<\frac13$ is inside both poles, so both terms are left-sided. Using $\frac1{1-az^{-1}}\to-a^nu[-n-1]$ for $|z|<|a|$:

$$
x[n]=2\left(\frac12\right)^nu[-n-1]-3\left(\frac13\right)^nu[-n-1]
$$

**Positive-power form:** $X(z)=\dfrac{z\left(z-\frac56\right)}{\left(z-\frac12\right)\left(z-\frac13\right)}$, zeros at $z=0$ and $z=\tfrac56$.
` + fig("sb-113"),
  },
  {
    ...B,
    id: "sb-11.4",
    topic: "z-transform",
    ref: "Problem 11.4",
    title: "A double pole",
    prompt: r`Invert $X(z)=\dfrac{1+\frac12z^{-1}}{\left(1-\frac12z^{-1}\right)^2}$ for $|z|>\tfrac12$.`,
    solution: r`**Step 1: split the numerator.** Write $1+\frac12z^{-1}=\left(1-\frac12z^{-1}\right)+z^{-1}$:

$$
\frac{1+\frac12z^{-1}}{\left(1-\frac12z^{-1}\right)^2}=\frac1{1-\frac12z^{-1}}+\frac{z^{-1}}{\left(1-\frac12z^{-1}\right)^2}
$$

**Step 2: the first term.**

$$
\frac1{1-\frac12z^{-1}}\ \xrightarrow{\ \mathcal Z^{-1}\ }\ \left(\frac12\right)^nu[n],\qquad\text{ROC: }|z|>\frac12
$$

**Step 3: the second term.** Start from the repeated-pole pair

$$
n\left(\frac12\right)^nu[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac{\frac12z^{-1}}{\left(1-\frac12z^{-1}\right)^2},\qquad\text{ROC: }|z|>\frac12
$$

and multiply by 2:

$$
\frac{z^{-1}}{\left(1-\frac12z^{-1}\right)^2}\ \xrightarrow{\ \mathcal Z^{-1}\ }\ 2n\left(\frac12\right)^nu[n]
$$

**Step 4: add.**

$$
x[n]=\left(\frac12\right)^nu[n]+2n\left(\frac12\right)^nu[n]=(2n+1)\left(\frac12\right)^nu[n]
$$

The sequence is right-sided, so the ROC stays outside the repeated pole: $|z|>\tfrac12$.

**Positive-power form:** $X(z)=\dfrac{z\left(z+\frac12\right)}{\left(z-\frac12\right)^2}$, zeros at $z=0$ and $z=-\tfrac12$.
` + fig("sb-114"),
  },
  {
    ...B,
    id: "sb-11.5",
    topic: "z-transform",
    ref: "Problem 11.5",
    title: "Complex poles and a delay",
    prompt: r`Invert $X(z)=z^{-1}\dfrac{1-\frac14z^{-1}}{1-\frac12z^{-1}+\frac14z^{-2}}$ for $|z|>\tfrac12$.`,
    solution: r`**Step 1: separate the delay.**

$$
X(z)=z^{-1}X_0(z),\qquad X_0(z)=\frac{1-\frac14z^{-1}}{1-\frac12z^{-1}+\frac14z^{-2}}
$$

**Step 2: factor the denominator.** It has the form $1-2a\cos\theta\,z^{-1}+a^2z^{-2}$ with $a=\frac12$ and $\theta=\frac\pi3$:

$$
1-\frac12z^{-1}+\frac14z^{-2}=\left(1-\frac12e^{j\pi/3}z^{-1}\right)\left(1-\frac12e^{-j\pi/3}z^{-1}\right)
$$

$$
X_0(z)=\frac A{1-\frac12e^{j\pi/3}z^{-1}}+\frac B{1-\frac12e^{-j\pi/3}z^{-1}}
$$

**Step 3: residues** (with $r=z^{-1}$):

$$
A=\left.\frac{1-\frac14r}{1-\frac12e^{-j\pi/3}r}\right|_{r=2e^{-j\pi/3}}=\frac{1-\frac12e^{-j\pi/3}}{1-e^{-j2\pi/3}}=\frac12
$$

$$
B=\left.\frac{1-\frac14r}{1-\frac12e^{j\pi/3}r}\right|_{r=2e^{j\pi/3}}=\frac{1-\frac12e^{j\pi/3}}{1-e^{j2\pi/3}}=\frac12
$$

**Step 4: invert.** $|z|>\frac12$ is outside both poles, so both terms are right-sided:

$$
x_0[n]=\frac12\left(\frac12e^{j\pi/3}\right)^nu[n]+\frac12\left(\frac12e^{-j\pi/3}\right)^nu[n]=\left(\frac12\right)^n\frac{e^{j\pi n/3}+e^{-j\pi n/3}}2u[n]
$$

By Euler's formula:

$$
x_0[n]=\left(\frac12\right)^n\cos\left(\frac{\pi n}3\right)u[n]
$$

**Step 5: the delay.** $z^{-1}$ shifts by one sample, and the ROC stays $|z|>\frac12$:

$$
x[n]=x_0[n-1]=\left(\frac12\right)^{n-1}\cos\left(\frac{\pi(n-1)}3\right)u[n-1]
$$

This is Problem 10.5 run backwards. Poles at $z=\tfrac12e^{\pm j\pi/3}$; the only finite zero is $z=\tfrac14$.
` + fig("sb-115"),
  },

  /* ─────────────── 12. Applications: causality and stability from the ROC ─────────────── */
  {
    ...B,
    id: "sb-12.1",
    topic: "z-transform",
    ref: "Problem 12.1",
    title: "ROC choices after cancellation",
    prompt: r`For $H(z)=\dfrac{1-2z^{-1}}{\left(1-\frac12z^{-1}\right)\left(1-2z^{-1}\right)}$, determine the valid ROC choices and the corresponding causality, stability, and DTFT conclusions.`,
    solution: r`**Step 1: cancel** the common factor $(1-2z^{-1})$:

$$
H(z)=\frac1{1-\frac12z^{-1}}=\frac z{z-\frac12}
$$

One pole at $z=\frac12$, one zero at $z=0$.

**Step 2: the possible ROCs and what they mean.**

- $|z|>\frac12$: **causal, stable**, and the DTFT exists (the unit circle is in the ROC).
- $|z|<\frac12$: **anti-causal, unstable**, no DTFT.
` + fig("sb-121"),
  },
  {
    ...B,
    id: "sb-12.2",
    topic: "z-transform",
    ref: "Problem 12.2",
    title: "Stable and causal at once?",
    prompt: r`For $H(z)=\dfrac{1}{\left(1-0.8z^{-1}\right)\left(1-1.25z^{-1}\right)}$, determine whether any realization can be both stable and causal.`,
    solution: r`**Positive-power form:**

$$
H(z)=\frac{z^2}{(z-0.8)(z-1.25)}
$$

A double zero at $z=0$; poles at radii $0.8$ and $1.25$. Three ROCs are possible:

| ROC | type | stable? |
|---|---|---|
| $\lvert z\rvert>1.25$ | causal | no (unit circle not included) |
| $0.8<\lvert z\rvert<1.25$ | two-sided | **yes** |
| $\lvert z\rvert<0.8$ | anti-causal | no |

**Answer:** a stable realization exists, but it cannot be causal. The pole at $1.25$ is outside the unit circle, so a causal realization would be unstable.
` + fig("sb-122"),
  },
  {
    ...B,
    id: "sb-12.3",
    topic: "z-transform",
    ref: "Problem 12.3",
    title: "Does the DTFT exist?",
    prompt: r`Determine whether the DTFT exists for $x[n]=\left(\tfrac12\right)^nu[n]-1.2^nu[-n-1]$.`,
    solution: r`**Step 1: split it.**

$$
x_1[n]=\left(\frac12\right)^nu[n],\qquad x_2[n]=-1.2^nu[-n-1]
$$

**Step 2: transform each part.**

$$
x_1[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-\frac12z^{-1}},\qquad\text{ROC: }|z|>\frac12
$$

$$
x_2[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-1.2z^{-1}},\qquad\text{ROC: }|z|<1.2
$$

**Step 3: add.**

$$
X(z)=\frac1{1-\frac12z^{-1}}+\frac1{1-1.2z^{-1}}=\frac{2-1.7z^{-1}}{\left(1-\frac12z^{-1}\right)\left(1-1.2z^{-1}\right)},\qquad\text{ROC: }\frac12<|z|<1.2
$$

**Positive-power form:** $X(z)=\dfrac{z(2z-1.7)}{\left(z-\frac12\right)(z-1.2)}$, zeros at $z=0$ and $z=0.85$.

**Answer:** the unit circle $|z|=1$ lies inside the annulus, so **the DTFT exists**. The sequence is two-sided, so it is not causal.
` + fig("sb-123"),
  },
  {
    ...B,
    id: "sb-12.4",
    topic: "z-transform",
    ref: "Problem 12.4",
    title: "Causal? Stable? From h[n]",
    prompt: r`Given $h[n]=\left(\tfrac23\right)^nu[n]-\left(\tfrac43\right)^nu[-n-1]$, find $H(z)$ and its ROC, and determine whether the system is causal, stable, and whether the DTFT of $h[n]$ exists.`,
    solution: r`**Step 1: split it.**

$$
h_1[n]=\left(\frac23\right)^nu[n],\qquad h_2[n]=-\left(\frac43\right)^nu[-n-1]
$$

**Step 2: transform each part.**

$$
h_1[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-\frac23z^{-1}},\qquad\text{ROC: }|z|>\frac23
$$

$$
h_2[n]\ \xrightarrow{\ \mathcal Z\ }\ \frac1{1-\frac43z^{-1}},\qquad\text{ROC: }|z|<\frac43
$$

**Step 3: add.**

$$
H(z)=\frac1{1-\frac23z^{-1}}+\frac1{1-\frac43z^{-1}}=\frac{2-2z^{-1}}{\left(1-\frac23z^{-1}\right)\left(1-\frac43z^{-1}\right)},\qquad\text{ROC: }\frac23<|z|<\frac43
$$

**Positive-power form:** $H(z)=\dfrac{2z(z-1)}{\left(z-\frac23\right)\left(z-\frac43\right)}$, zeros at $z=0$ and $z=1$.

**Conclusions.**

- The ROC does not include $z=\infty$, so the system is **not causal**.
- The unit circle lies inside the annulus ($\frac23<1<\frac43$), so the system is **stable** and the DTFT exists.
` + fig("sb-124"),
  },
  {
    ...B,
    id: "sb-12.5",
    topic: "z-transform",
    ref: "Problem 12.5",
    title: "Which realizations exist?",
    prompt: r`A system has poles at $0.95e^{\pm j\pi/4}$ and $1.1$. Determine whether there exists a stable realization, a causal realization, and a realization that is both.`,
    solution: r`The pole radii are $0.95$ and $1.1$, so the possible ROCs are $|z|>1.1$, $0.95<|z|<1.1$ and $|z|<0.95$.

- **Causal:** yes, with $|z|>1.1$. But that ROC misses the unit circle, so it is unstable.
- **Stable:** yes, with $0.95<|z|<1.1$, which contains the unit circle. But that ROC is an annulus, so the system is two-sided.
- **Both:** no. No single ROC is both outside every pole and contains the unit circle, because the pole at $1.1$ is outside the unit circle.
` + fig("sb-125"),
  },
]
