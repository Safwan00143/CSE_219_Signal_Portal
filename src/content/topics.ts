import type { Topic, TopicSlug } from "./types"

export const topics: Topic[] = [
  {
    slug: "signals",
    title: "Signals, energy and transformations",
    short: "Continuous vs discrete, energy and power, shifting, reversing and scaling time, and even–odd parts.",
    part: "A",
    lectures: "Anik Sir · Lecture 1",
  },
  {
    slug: "elementary-signals",
    title: "Step, impulse, exponentials and sinusoids",
    short: "The step and impulse and how each builds the other, exponentials, complex exponentials, and discrete periodicity.",
    part: "A",
    lectures: "Anik Sir · Lecture 2",
  },
  {
    slug: "lti-convolution",
    title: "LTI systems and convolution",
    short: "Linearity, time invariance, the impulse response, and convolution sums and integrals.",
    part: "A",
    lectures: "Anik Sir · Lectures 3–4",
  },
  {
    slug: "causality-stability",
    title: "Causality and stability",
    short: "Reading memory, causality and BIBO stability straight off the impulse response.",
    part: "A",
    lectures: "Anik Sir · Lecture 4",
  },
  {
    slug: "fourier-series",
    title: "Fourier series",
    short: "Periodic signals as sums of harmonics, the coefficient formula, symmetry, and the main properties.",
    part: "A",
    lectures: "Anik Sir · Lectures 5–6",
  },
  {
    slug: "fourier-transform",
    title: "Fourier transform",
    short: "Spectra of aperiodic signals, the standard pairs, properties, duality and bandwidth.",
    part: "A",
    lectures: "Anik Sir · Lecture 7",
  },
  {
    slug: "frequency-response",
    title: "Frequency response and distortionless systems",
    short: "Transfer functions, ideal filters, all-pass systems and the distortionless conditions.",
    part: "A",
    lectures: "Builds on Lecture 7 · asked in CSE 311",
  },
  {
    slug: "dtft-dft",
    title: "DTFT and DFT",
    short: "From the Fourier series to N-point DFTs, reading bins, and the DFT's properties.",
    part: "B",
    lectures: "Ashraf Sir · Lectures 1–2",
  },
  {
    slug: "fft",
    title: "Fast Fourier transform",
    short: "Radix-2 decimation in time and in frequency, butterflies, bit reversal and cost.",
    part: "B",
    lectures: "Ashraf Sir · Lectures 3–4",
  },
  {
    slug: "sampling",
    title: "Sampling and reconstruction",
    short: "Impulse-train sampling, spectral copies, the Nyquist rate, aliasing and interpolation.",
    part: "B",
    lectures: "Ashraf Sir · Lecture 5",
  },
  {
    slug: "laplace",
    title: "Laplace transform",
    short: "The s-plane, regions of convergence, partial fractions, properties and system analysis.",
    part: "B",
    lectures: "Ashraf Sir · Lectures 6–7",
  },
  {
    slug: "z-transform",
    title: "z-transform",
    short: "The discrete-time Laplace transform: ROCs as rings, inversion, properties and LTI systems.",
    part: "B",
    lectures: "Ashraf Sir · Lecture 8",
  },
]

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug)
}

export function topicIndex(slug: TopicSlug) {
  return topics.findIndex((t) => t.slug === slug)
}
