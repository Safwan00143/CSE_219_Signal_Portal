import type { BookProblem, TopicSlug } from "../types"
import { signalsBook } from "./signals"
import { elementaryBook } from "./elementary"
import { ltiBook } from "./lti"
import { causalityBook } from "./causality"
import { fourierSeriesBook } from "./fourier-series"
import { fourierTransformBook } from "./fourier-transform"
import { frequencyResponseBook } from "./frequency-response"
import { dftBook } from "./dft"
import { fftBook } from "./fft"
import { samplingBook } from "./sampling"
import { laplaceBook } from "./laplace"
import { zBook } from "./z-transform"

export const bookProblems: BookProblem[] = [
  ...signalsBook,
  ...elementaryBook,
  ...ltiBook,
  ...causalityBook,
  ...fourierSeriesBook,
  ...fourierTransformBook,
  ...frequencyResponseBook,
  ...dftBook,
  ...fftBook,
  ...samplingBook,
  ...laplaceBook,
  ...zBook,
]

export const bookTitles: Record<BookProblem["book"], string> = {
  Oppenheim: "Oppenheim & Willsky, Signals and Systems (2nd ed.)",
  Tan: "Tan & Jiang, Digital Signal Processing (3rd ed.)",
}

/** Kept in the order written: each topic file runs from warm-up problems to harder ones. */
export function bookProblemsFor(topic: TopicSlug) {
  return bookProblems.filter((p) => p.topic === topic)
}
