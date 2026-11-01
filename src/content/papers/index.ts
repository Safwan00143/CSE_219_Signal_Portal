import type { Paper, PaperPart, PaperQuestion, Question } from "../types"
import { paper22 } from "./cse219-22"

export const papers: Paper[] = [paper22]

export function getPaper(slug: string) {
  return papers.find((p) => p.slug === slug)
}

/** "2023-24" → "2324", used in question ids. */
const sessionCode = (p: Paper) => p.session.replace(/^\d\d(\d\d)-(\d\d)$/, "$1$2")

/** Id of one part's own solution page, e.g. "1a". */
export const partKey = (q: PaperQuestion, part: PaperPart) => `${q.no}${part.part}`

/** Every part of a paper with its question, in printed order. */
export function paperParts(p: Paper) {
  return p.sections.flatMap((s) => s.questions.flatMap((q) => q.parts.map((part) => ({ q, part }))))
}

function label(no: number, letters: string[]) {
  if (letters.length === 1) return `Q${no}(${letters[0]})`
  const run = letters.every((l, i) => i === 0 || l.charCodeAt(0) === letters[i - 1].charCodeAt(0) + 1)
  return run && letters.length > 2 ? `Q${no}(${letters[0]})–(${letters.at(-1)})` : `Q${no}` + letters.map((l) => `(${l})`).join(",")
}

/**
 * The same parts as topic-wise practice questions. Neighbouring parts of one
 * question on the same topic become one entry, like the older papers on the site.
 */
function toQuestions(p: Paper): Question[] {
  const out: Question[] = []
  for (const section of p.sections) {
    for (const q of section.questions) {
      const groups: PaperPart[][] = []
      for (const part of q.parts) {
        const last = groups.at(-1)
        if (last && last[0].topic === part.topic) last.push(part)
        else groups.push([part])
      }
      for (const g of groups) {
        const letters = g.map((x) => x.part)
        const single = g.length === 1
        const parts = single
          ? g[0].prompt
          : g
              // Marks may not follow a closing $$ on the same line, or the display math breaks.
              .map((x) => `**(${x.part})** ${x.prompt}${x.prompt.trimEnd().endsWith("$$") ? "\n\n" : " "}*(${x.marks})*`)
              .join("\n\n")
        out.push({
          id: `219-${sessionCode(p)}-${q.no}${letters.join("")}`,
          topic: g[0].topic,
          course: p.course,
          session: p.session,
          label: label(q.no, letters),
          marks: g.reduce((s, x) => s + x.marks, 0),
          prompt: q.stem ? `${q.stem}\n\n${parts}` : parts,
          solution: single ? g[0].solution : g.map((x) => `### (${x.part})\n\n${x.solution}`).join("\n\n"),
          note: `From the ${p.name} paper. The whole paper is on the Papers page.`,
        })
      }
    }
  }
  return out
}

export const paperQuestions: Question[] = papers.flatMap(toQuestions)
