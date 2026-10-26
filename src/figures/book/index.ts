import type { FigureMap } from "../figure"
import { bookSignalsFigures } from "./signals"
import { bookElementaryFigures } from "./elementary"
import { bookLtiFigures } from "./lti"
import { bookCausalityFigures } from "./causality"
import { bookFourierSeriesFigures } from "./fourier-series"
import { bookFourierTransformFigures } from "./fourier-transform"
import { bookFrequencyResponseFigures } from "./frequency-response"
import { bookDftFigures } from "./dft"
import { bookFftFigures } from "./fft"
import { bookSamplingFigures } from "./sampling"
import { bookLaplaceFigures } from "./laplace"
import { bookZFigures } from "./z-transform"

export const bookFigures: FigureMap = {
  ...bookSignalsFigures,
  ...bookElementaryFigures,
  ...bookLtiFigures,
  ...bookCausalityFigures,
  ...bookFourierSeriesFigures,
  ...bookFourierTransformFigures,
  ...bookFrequencyResponseFigures,
  ...bookDftFigures,
  ...bookFftFigures,
  ...bookSamplingFigures,
  ...bookLaplaceFigures,
  ...bookZFigures,
}
