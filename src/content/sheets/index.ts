import type { SheetProblem, TopicSlug } from "../types"
import { sheetA } from "./anik"
import { sheetB } from "./ashraf"

/** The teachers' practice sheets, in sheet order. */
export const sheetProblems: SheetProblem[] = [...sheetA, ...sheetB]

export const sheetTitles: Record<SheetProblem["sheet"], string> = {
  "Anik Sir": "Anik Sir's practice sheet (Lectures 1–7)",
  "Ashraf Sir": "Ashraf Sir's practice sheet (FFT, sampling, Laplace, z-transform)",
}

export function sheetProblemsFor(topic: TopicSlug) {
  return sheetProblems.filter((p) => p.topic === topic)
}
