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

/** A problem from the course teachers' own practice sheets, with their worked solution. */
export type SheetProblem = {
  /** Prefixed "sa-" (Anik Sir's sheet) or "sb-" (Ashraf Sir's sheet). */
  id: string
  topic: TopicSlug
  sheet: "Anik Sir" | "Ashraf Sir"
  /** Numbering as on the sheet, e.g. "Problem 4.3". */
  ref: string
  /** The sheet's short title for the problem, e.g. "Overlapping rectangles". */
  title?: string
  prompt: string
  solution: string
  promptFigs?: string[]
  solutionFigs?: string[]
}

/** One lettered part of a question on a full past paper. */
export type PaperPart = {
  /** "a", "b", … as printed. */
  part: string
  marks: number
  topic: TopicSlug
  /** The part's own text, without the question's shared stem. Figures go inline as ```fig blocks. */
  prompt: string
  solution: string
}

export type PaperQuestion = {
  no: number
  /** Text shared by every part, printed once above them. */
  stem?: string
  parts: PaperPart[]
}

/** A whole term-final paper, kept in its printed order. */
export type Paper = {
  slug: string
  /** Short name, e.g. "22 batch". */
  name: string
  course: "CSE 219"
  session: string
  /** Header lines as printed on the paper. */
  exam: string
  date: string
  fullMarks: number
  time: string
  sections: { name: string; instructions: string; questions: PaperQuestion[] }[]
}

export type Topic = {
  slug: TopicSlug
  title: string
  short: string
  part: "A" | "B"
  lectures: string
}
