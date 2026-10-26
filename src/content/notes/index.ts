import type { TopicSlug } from "../types"
import { ltiNote } from "./lti"
import { causalityNote } from "./causality"
import { elementaryNote } from "./elementary"
import { signalsNote } from "./signals"
import { fourierSeriesNote } from "./fourier-series"
import { fourierTransformNote } from "./fourier-transform"
import { frequencyResponseNote } from "./frequency-response"
import { dftNote } from "./dft"
import { fftNote } from "./fft"
import { samplingNote } from "./sampling"
import { laplaceNote } from "./laplace"
import { zNote } from "./z-transform"

export const notes: Record<TopicSlug, string> = {
  signals: signalsNote,
  "elementary-signals": elementaryNote,
  "lti-convolution": ltiNote,
  "causality-stability": causalityNote,
  "fourier-series": fourierSeriesNote,
  "fourier-transform": fourierTransformNote,
  "frequency-response": frequencyResponseNote,
  "dtft-dft": dftNote,
  fft: fftNote,
  sampling: samplingNote,
  laplace: laplaceNote,
  "z-transform": zNote,
}

/** Level-2 headings, used for the "on this page" outline. */
export function outline(markdown: string) {
  return [...markdown.matchAll(/^## (.+)$/gm)].map((m) => ({
    title: m[1],
    id: slugify(m[1]),
  }))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}
