export type TopicSlug =
  | "signals"
  | "elementary-signals"
  | "lti-convolution"
  | "causality-stability"
  | "fourier-series"
  | "fourier-transform"
  | "frequency-response"
  | "dtft-dft"
  | "fft"
  | "sampling"
  | "laplace"
  | "z-transform"

/** A piecewise-linear curve. Separate segments are drawn unconnected, so jumps stay visible. */
export type PlotSpec = {
  title: string
  segments: [number, number][][]
  xRange: [number, number]
  yRange: [number, number]
  xTicks?: number[]
  yTicks?: number[]
  xLabel?: string
  /** Points drawn as filled dots, e.g. the value a signal takes at a jump. */
  dots?: [number, number][]
}

export type Question = {
  id: string
  topic: TopicSlug
  course: "CSE 219" | "CSE 311"
  /** Academic session printed on the paper, e.g. "2022-23". */
  session: string
  label: string
  marks?: number
  prompt: string
  solution: string
  promptPlots?: PlotSpec[]
  solutionPlots?: PlotSpec[]
  /** Ids from the figure registry, drawn after the prompt / at the end of the solution. */
  promptFigs?: string[]
  solutionFigs?: string[]
  /** Other papers where essentially the same question appeared. */
  alsoAsked?: string[]
  note?: string
}

/** A worked practice problem taken from a textbook. Kept apart from term-final questions. */
export type BookProblem = {
  /** Prefixed "bk-" so solved-progress never collides with term-final ids. */
  id: string
  topic: TopicSlug
  book: "Oppenheim" | "Tan"
  /** Where it comes from, e.g. "Problem 1.21" or "Example 4.3". */
  ref: string
  prompt: string
  solution: string
  promptFigs?: string[]
  solutionFigs?: string[]
}

export type Topic = {
  slug: TopicSlug
  title: string
  short: string
  part: "A" | "B"
  lectures: string
}
