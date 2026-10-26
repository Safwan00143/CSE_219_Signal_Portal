import type { FigureMap } from "./figure"
import { signalsFigures } from "./a1-signals"
import { elementaryFigures } from "./a2-elementary"
import { ltiFigures } from "./a3-lti"
import { fourierSeriesFigures } from "./a4-fourier-series"
import { fourierTransformFigures } from "./a5-fourier-transform"
import { frequencyResponseFigures } from "./a6-frequency-response"
import { dftFigures } from "./b1-dft"
import { fftFigures } from "./b2-fft"
import { samplingFigures } from "./b3-sampling"
import { laplaceFigures } from "./b4-laplace"
import { zFigures } from "./b5-z"
import { questionFigures } from "./questions"
import { interactiveFigures } from "./interactive-map"
import { bookFigures } from "./book"

export const figures: FigureMap = {
  ...signalsFigures,
  ...elementaryFigures,
  ...ltiFigures,
  ...fourierSeriesFigures,
  ...fourierTransformFigures,
  ...frequencyResponseFigures,
  ...dftFigures,
  ...fftFigures,
  ...samplingFigures,
  ...laplaceFigures,
  ...zFigures,
  ...questionFigures,
  ...interactiveFigures,
  ...bookFigures,
}
