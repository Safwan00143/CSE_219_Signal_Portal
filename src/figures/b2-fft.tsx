import { FlowGraph, Graph, Panel, Row, range } from "./kit"
import type { FigureMap } from "./figure"

type P = [number, number]

export const fftFigures: FigureMap = {
  "fft-cost": {
    caption: "Direct DFT cost N² (ochre) against radix-2 FFT cost (N/2)log₂N (sage), in complex multiplications. Already at N = 64 the FFT needs 192 instead of 4096.",
    node: <Graph width={460} x={[0, 70]} y={[-150, 4400]} xLabel="N" items={[{ kind: "fn", f: (n) => n * n, from: 1, to: 66, tone: "second" }, { kind: "fn", f: (n) => (n / 2) * Math.log2(Math.max(n, 1)), from: 1, to: 66 }, { kind: "dots", pts: [[64, 4096]], tone: "second" }, { kind: "dots", pts: [[64, 192]] }, { kind: "text", at: [60, 3900], text: "N²", tone: "second", anchor: "end" }, { kind: "text", at: [60, 500], text: "(N/2) log₂ N", tone: "accent", anchor: "end" }]} xTicks={[8, 16, 32, 64]} yTicks={[1024, 4096]} />,
  },
  "fft-butterfly": {
    caption: "The 2-point DFT is the basic butterfly: X[0] = x[0] + x[1], X[1] = x[0] − x[1]. Every larger radix-2 FFT is built from these crossings.",
    node: <FlowGraph n={2} variant="dit" />,
  },
  "fft-dit-4": {
    caption: "4-point DIT FFT: two 2-point DFTs (stage 1) give G[k] from the even samples and H[k] from the odd samples; stage 2 combines them with twiddle factors W₄ᵏ. Inputs enter in bit-reversed order.",
    node: <FlowGraph n={4} variant="dit" />,
  },
  "fft-dit-8": {
    wide: true,
    caption: "Complete 8-point decimation-in-time FFT: three stages of four butterflies. Twiddles (ochre) multiply the lower input of each butterfly; the lower output gets the −1. Inputs are in bit-reversed order, outputs in natural order.",
    node: <FlowGraph n={8} variant="dit" />,
  },
  "fft-dif-8": {
    wide: true,
    caption: "Complete 8-point decimation-in-frequency FFT: the mirror image. Each butterfly adds on top and subtracts below, then multiplies the difference by the twiddle. Inputs are in natural order, outputs in bit-reversed order.",
    node: <FlowGraph n={8} variant="dif" />,
  },
  "fft-bluestein": {
    wide: true,
    caption: String.raw`Bluestein padding for $N=4$, $M=8$. $a[n]=x[n]W_{2N}^{n^2}$ sits at the start followed by zeros. The chirp $b[n]$ is needed for $n=-3,\dots,3$: its positive indices go at the start and its negative indices wrap to the end of the array, with zeros between so the two never overlap ($M\ge2N-1$).`,
    node: (
      <Row>
        <Panel title="a[n]: data, then zero pad">
          <Graph x={[-0.6, 7.6]} y={[-0.2, 1.4]} xLabel="n" items={[{ kind: "stems", pts: range(0, 3).map((n) => [n, 1] as P) }, { kind: "stems", pts: range(4, 7).map((n) => [n, 0] as P), tone: "muted" }]} xTicks={[0, 3, 7]} />
        </Panel>
        <Panel title="b[((n))ₘ]: positive n first, negative n wrapped to the end">
          <Graph x={[-0.6, 7.6]} y={[-0.2, 1.4]} xLabel="n" items={[{ kind: "stems", pts: range(0, 3).map((n) => [n, 1] as P) }, { kind: "stems", pts: [[4, 0]], tone: "muted" }, { kind: "stems", pts: range(5, 7).map((n) => [n, 1] as P), tone: "second" }]} xTicks={[0, 3, 5, 7]} />
        </Panel>
      </Row>
    ),
  },
}
