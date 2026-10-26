import type { Question, TopicSlug } from "../types"
import { basicsQuestions } from "./part-a-basics"
import { fourierQuestions } from "./part-a-fourier"
import { systemsQuestions } from "./part-a-systems"
import { partBQuestions } from "./part-b"
import { extraQuestions } from "./extra"
import { figureMap } from "./figure-map"

export const questions: Question[] = [
  ...basicsQuestions,
  ...fourierQuestions,
  ...systemsQuestions,
  ...partBQuestions,
  ...extraQuestions,
].map((q) => ({ ...q, ...figureMap[q.id] }))

/** CSE 219 first, then newest session first, then by question label. */
function compare(a: Question, b: Question) {
  if (a.course !== b.course) return a.course === "CSE 219" ? -1 : 1
  if (a.session !== b.session) return b.session.localeCompare(a.session)
  return a.label.localeCompare(b.label, undefined, { numeric: true })
}

export function questionsFor(topic: TopicSlug) {
  return questions.filter((q) => q.topic === topic).sort(compare)
}
