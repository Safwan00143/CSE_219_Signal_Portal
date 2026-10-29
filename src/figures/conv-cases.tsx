import type { FigureMap } from "./figure"
import { Overlap } from "./overlap"

const r = String.raw
const step = (b: boolean) => (b ? 1 : 0)

/* Book 2.3: x[k] = (½)^(k−2) u[k−2], h[n−k] = u[n−k+2] (ones for k ≤ n+2). */
const x23 = (k: number) => (k >= 2 ? 0.5 ** (k - 2) : 0)
const h23 = (n: number) => (k: number) => step(k <= n + 2)

/* Book 2.4: x[k] = 1 on 3…8, h[n−k] = 1 for n−15 ≤ k ≤ n−4. */
const x24 = (k: number) => step(k >= 3 && k <= 8)
const h24 = (n: number) => (k: number) => step(k >= n - 15 && k <= n - 4)

/* Book 2.10 with α = 0.4: x(τ) = 1 on [0,1], h(t−τ) = 1 for t−α ≤ τ ≤ t. */
const A = 0.4
const x210 = (v: number) => step(v >= 0 && v <= 1)
const h210 = (t: number) => (v: number) => step(v >= t - A && v <= t)

/* Book 2.11: x(τ) = 1 on [3,5], h(t−τ) = e^(−3(t−τ)) for τ ≤ t. */
const x211 = (v: number) => step(v >= 3 && v <= 5)
const h211 = (t: number) => (v: number) => (v <= t ? Math.exp(-3 * (t - v)) : 0)

/* Term final 2022-23 Q8(a): x[k] = 3^k (k ≤ −1), (⅓)^k (k ≥ 0); h[n−k] = (¼)^(n−k) for k ≤ n+3, drawn ÷64. */
const x8a = (k: number) => (k <= -1 ? 3 ** k : (1 / 3) ** k)
const h8a = (n: number) => (k: number) => (k <= n + 3 ? 0.25 ** (n - k) / 64 : 0)

/* Lesson examples. */
const x23L = (k: number) => (k >= 0 ? 0.7 ** k : 0)
const hStep = (n: number) => (k: number) => step(k <= n)
const x25L = (k: number) => (k <= 0 ? 2 ** k : 0)
const x26L = (v: number) => (v >= 0 ? Math.exp(-v) : 0)
const xTwo = (v: number) => (v <= 0 ? Math.exp(v) : 0)
const hTwo = (t: number) => (v: number) => (v <= t ? Math.exp(-(t - v)) : 0)

export const convCaseFigures: FigureMap = {
  /* ───── Oppenheim 2.3 ───── */
  "cc-23-a": {
    caption: r`Case $n<0$ (drawn for $n=-3$): the ones of $h[n-k]$ end at $k=n+2<2$, before $x[k]$ starts. Nothing overlaps.`,
    node: <Overlap discrete title="Case 1: n < 0" top={x23} bottom={h23(-3)} x={[-6.5, 9.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={null} edge={{ at: -1, label: "k = n+2" }} ticks={[0, 2, 5, 8]} />,
  },
  "cc-23-b": {
    caption: r`Case $n\ge0$ (drawn for $n=3$): the overlap runs from $k=2$, where $x$ starts, to $k=n+2$, where $h[n-k]$ ends.`,
    node: <Overlap discrete title="Case 2: n ≥ 0" top={x23} bottom={h23(3)} x={[-6.5, 9.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[2, 5]} edge={{ at: 5, label: "k = n+2" }} ticks={[0, 2, 5, 8]} />,
  },
  /* ───── Oppenheim 2.4 ───── */
  "cc-24-a": {
    caption: r`$n<7$ (drawn for $n=5$): the window $h[n-k]$ covers $n-15\le k\le n-4$, which ends before $k=3$. No overlap.`,
    node: <Overlap discrete title="Case 1: n < 7" top={x24} bottom={h24(5)} x={[-4.5, 21.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={null} ticks={[0, 3, 8, 15, 20]} />,
  },
  "cc-24-b": {
    caption: r`$7\le n\le11$ (drawn for $n=9$): the window's right edge $k=n-4$ has entered $x$. Overlap $3\le k\le n-4$, which is $n-6$ samples.`,
    node: <Overlap discrete title="Case 2: 7 ≤ n ≤ 11 (entering)" top={x24} bottom={h24(9)} x={[-4.5, 21.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[3, 5]} edge={{ at: 5, label: "k = n−4" }} ticks={[0, 3, 8, 15, 20]} />,
  },
  "cc-24-c": {
    caption: r`$12\le n\le18$ (drawn for $n=15$): the whole of $x$ ($k=3\dots8$) lies inside the window. Overlap: all 6 samples.`,
    node: <Overlap discrete title="Case 3: 12 ≤ n ≤ 18 (fully inside)" top={x24} bottom={h24(15)} x={[-4.5, 21.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[3, 8]} ticks={[0, 3, 8, 15, 20]} />,
  },
  "cc-24-d": {
    caption: r`$19\le n\le23$ (drawn for $n=21$): the window's left edge $k=n-15$ is leaving $x$. Overlap $n-15\le k\le8$, which is $24-n$ samples.`,
    node: <Overlap discrete title="Case 4: 19 ≤ n ≤ 23 (leaving)" top={x24} bottom={h24(21)} x={[-4.5, 21.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[6, 8]} edge={{ at: 6, label: "k = n−15" }} ticks={[0, 3, 8, 15, 20]} />,
  },
  /* ───── Oppenheim 2.10 ───── */
  "cc-210-a": {
    caption: r`$0\le t\le\alpha$: the short pulse $h(t-\tau)$, which sits on $[t-\alpha,t]$, has only partly entered $x$. Overlap $[0,t]$.`,
    node: <Overlap title="Case 2: 0 ≤ t ≤ α (entering)" top={x210} bottom={h210(0.25)} x={[-0.8, 1.8]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[0, 0.25]} edge={{ at: 0.25, label: "τ = t" }} ticks={[0, [0.4, "α"], 1]} />,
  },
  "cc-210-b": {
    caption: r`$\alpha\le t\le1$: the whole short pulse lies inside $x$. Overlap $[t-\alpha,t]$, of length $\alpha$.`,
    node: <Overlap title="Case 3: α ≤ t ≤ 1 (fully inside)" top={x210} bottom={h210(0.75)} x={[-0.8, 1.8]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[0.35, 0.75]} edge={{ at: 0.75, label: "τ = t" }} ticks={[0, [0.4, "α"], 1]} />,
  },
  "cc-210-c": {
    caption: r`$1\le t\le1+\alpha$: the pulse is leaving. Overlap $[t-\alpha,1]$, of length $1+\alpha-t$.`,
    node: <Overlap title="Case 4: 1 ≤ t ≤ 1+α (leaving)" top={x210} bottom={h210(1.2)} x={[-0.8, 1.8]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[0.8, 1]} edge={{ at: 1.2, label: "τ = t" }} ticks={[0, [0.4, "α"], 1]} />,
  },
  /* ───── Oppenheim 2.11 ───── */
  "cc-211-a": {
    caption: r`$t<3$ (drawn for $t=2$): the flipped exponential $h(t-\tau)$ lives on $\tau\le t$, entirely left of the pulse. No overlap.`,
    node: <Overlap title="Case 1: t < 3" top={x211} bottom={h211(2)} x={[0, 8]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={null} edge={{ at: 2, label: "τ = t" }} ticks={[3, 5]} />,
  },
  "cc-211-b": {
    caption: r`$3\le t\le5$ (drawn for $t=4$): the edge $\tau=t$ is inside the pulse. Overlap $[3,t]$.`,
    node: <Overlap title="Case 2: 3 ≤ t ≤ 5" top={x211} bottom={h211(4)} x={[0, 8]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[3, 4]} edge={{ at: 4, label: "τ = t" }} ticks={[3, 5]} />,
  },
  "cc-211-c": {
    caption: r`$t>5$ (drawn for $t=6$): the edge has passed the pulse, so the overlap is the whole pulse $[3,5]$; only the tail of the exponential lies over it.`,
    node: <Overlap title="Case 3: t > 5" top={x211} bottom={h211(6)} x={[0, 8]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[3, 5]} edge={{ at: 6, label: "τ = t" }} ticks={[3, 5]} />,
  },
  /* ───── Term final 2022-23 Q8(a) ───── */
  "cc-8a-a": {
    caption: r`Case $n\le-4$ (drawn for $n=-6$): $h[n-k]$ is non-zero for $k\le n+3$, and here $n+3\le-1$. So it only meets the **left** part of $x$ ($3^k$). Overlap: $k\le n+3$. (The lower row is drawn $\div64$.)`,
    node: <Overlap discrete title="Case 1: n ≤ −4" top={x8a} bottom={h8a(-6)} x={[-8.5, 7.5]} yTop={[-0.15, 1.25]} yBot={[-0.15, 1.25]} overlap={[-8, -3]} edge={{ at: -3, label: "k = n+3" }} ticks={[-6, -3, 0, 3, 6]} />,
  },
  "cc-8a-b": {
    caption: r`Case $n\ge-3$ (drawn for $n=1$): the edge $k=n+3$ is now at or right of 0. So $h[n-k]$ covers **all** of the left part ($k\le-1$) and the right part from $k=0$ to $k=n+3$.`,
    node: <Overlap discrete title="Case 2: n ≥ −3" top={x8a} bottom={h8a(1)} x={[-8.5, 7.5]} yTop={[-0.15, 1.25]} yBot={[-0.15, 1.25]} overlap={[-8, 4]} edge={{ at: 4, label: "k = n+3" }} ticks={[-6, -3, 0, 3, 6]} />,
  },
  /* ───── Lesson: Example 2.3 ───── */
  "cc-L23-a": {
    caption: r`$n<0$: the reflected step $u[n-k]$ (ones for $k\le n$) ends before $x[k]=\alpha^k u[k]$ starts. No overlap.`,
    node: <Overlap discrete title="Case 1: n < 0" top={x23L} bottom={hStep(-2)} x={[-7.5, 8.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={null} edge={{ at: -2, label: "k = n" }} ticks={[0, 4, 8]} />,
  },
  "cc-L23-b": {
    caption: r`$n\ge0$ (drawn for $n=4$): the overlap is $0\le k\le n$, where the product is just $\alpha^k$.`,
    node: <Overlap discrete title="Case 2: n ≥ 0" top={x23L} bottom={hStep(4)} x={[-7.5, 8.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[0, 4]} edge={{ at: 4, label: "k = n" }} ticks={[0, 4, 8]} />,
  },
  /* ───── Lesson: Example 2.5 ───── */
  "cc-L25-a": {
    caption: r`$n<0$ (drawn for $n=-3$): the overlap stops at $k=n$, where $u[n-k]$ ends.`,
    node: <Overlap discrete title="Case 1: n < 0" top={x25L} bottom={hStep(-3)} x={[-8.5, 5.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[-8, -3]} edge={{ at: -3, label: "k = n" }} ticks={[-6, -3, 0, 3]} />,
  },
  "cc-L25-b": {
    caption: r`$n\ge0$ (drawn for $n=2$): $u[n-k]$ now reaches past $k=0$, so it covers every non-zero sample of $x$. Overlap $k\le0$.`,
    node: <Overlap discrete title="Case 2: n ≥ 0" top={x25L} bottom={hStep(2)} x={[-8.5, 5.5]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[-8, 0]} edge={{ at: 2, label: "k = n" }} ticks={[-6, -3, 0, 3]} />,
  },
  /* ───── Lesson: Example 2.6 ───── */
  "cc-L26-a": {
    caption: r`$t<0$: $u(t-\tau)$ is 1 only for $\tau<t<0$, where $x(\tau)=0$. No overlap.`,
    node: <Overlap title="Case 1: t < 0" top={x26L} bottom={(v) => step(v <= -1)} x={[-3, 4]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={null} edge={{ at: -1, label: "τ = t" }} ticks={[0, 2]} />,
  },
  "cc-L26-b": {
    caption: r`$t>0$ (drawn for $t=2$): the overlap is $0<\tau<t$. It grows with $t$, so the output keeps rising.`,
    node: <Overlap title="Case 2: t > 0" top={x26L} bottom={(v) => step(v <= 2)} x={[-3, 4]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[0, 2]} edge={{ at: 2, label: "τ = t" }} ticks={[0, 2]} />,
  },
  /* ───── Lesson: practice, two one-sided exponentials ───── */
  "cc-Ltwo-a": {
    caption: r`$t<0$ (drawn for $t=-1$): $h(t-\tau)$ lives on $\tau\le t$, so the overlap ends at $\tau=t$.`,
    node: <Overlap title="Case 1: t < 0" top={xTwo} bottom={hTwo(-1)} x={[-4, 3]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[-4, -1]} edge={{ at: -1, label: "τ = t" }} ticks={[-2, 0, 2]} />,
  },
  "cc-Ltwo-b": {
    caption: r`$t\ge0$ (drawn for $t=1.2$): $x(\tau)$ stops at $\tau=0$ before $h(t-\tau)$ does, so the overlap ends at $\tau=0$.`,
    node: <Overlap title="Case 2: t ≥ 0" top={xTwo} bottom={hTwo(1.2)} x={[-4, 3]} yTop={[-0.2, 1.3]} yBot={[-0.2, 1.4]} overlap={[-4, 0]} edge={{ at: 1.2, label: "τ = t" }} ticks={[-2, 0, 2]} />,
  },
}
