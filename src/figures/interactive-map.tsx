import type { FigureMap } from "./figure"
import { AliasingExplorer, ConvolutionStepper, FourierBuilder, PoleExplorer, ScalingExplorer, TransformExplorer } from "./interactive"

export const interactiveFigures: FigureMap = {
  "sig-interactive-transform": {
    wide: true,
    caption: "Try it: choose a and b and watch x(at + b) (sage) move away from x(t) (dashed). Negative a reverses the signal; |a| > 1 compresses it.",
    node: <TransformExplorer />,
  },
  "lti-interactive-conv": {
    wide: true,
    caption: "Press play, or drag n: the reflected h[n − k] slides across x[k], the overlapping products are added, and one more output sample appears each step.",
    node: <ConvolutionStepper />,
  },
  "fs-interactive-gibbs": {
    wide: true,
    caption: "Press play to add harmonics one pair at a time and watch the series converge to the square wave, everywhere except right next to the jumps.",
    node: <FourierBuilder />,
  },
  "ft-interactive-scaling": {
    wide: true,
    caption: "Drag the width: a shorter pulse gives a wider, lower spectrum, and a longer pulse a narrower, taller one.",
    node: <ScalingExplorer />,
  },
  "smp-interactive-alias": {
    wide: true,
    caption: "Lower the sampling rate below 2ω_M and watch the spectral copies collide (left), while the samples of the tone start to fit a slower, false tone (right).",
    node: <AliasingExplorer />,
  },
  "z-interactive-poles": {
    wide: true,
    caption: "Move the pole pair: inside the unit circle the impulse response dies out, on it the response never decays, outside it the response blows up.",
    node: <PoleExplorer />,
  },
}
