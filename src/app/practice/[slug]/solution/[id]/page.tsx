import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PracticeBody } from "@/components/practice-body"
import { bookProblems } from "@/content/book"
import { questions } from "@/content/questions"

/*
  Each solution is pre-rendered as its own static page. The practice list fetches
  it the first time a student opens the solution and shows only the #solution
  block. Shipping every hidden solution inside the practice page made each page
  several megabytes.
*/
export const dynamicParams = false

export function generateStaticParams() {
  return [...questions, ...bookProblems].map((q) => ({ slug: q.topic, id: q.id }))
}

export const metadata: Metadata = { title: "Solution", robots: { index: false } }

export default async function Solution({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { id } = await params
  const q = questions.find((x) => x.id === id)
  const b = bookProblems.find((x) => x.id === id)
  if (!q && !b) notFound()
  return (
    <div id="solution" className="mx-auto max-w-3xl px-4 py-10">
      {q ? <PracticeBody text={q.solution} plots={q.solutionPlots} figs={q.solutionFigs} /> : <PracticeBody text={b!.solution} figs={b!.solutionFigs} />}
    </div>
  )
}
