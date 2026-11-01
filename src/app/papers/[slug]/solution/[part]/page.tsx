import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PracticeBody } from "@/components/practice-body"
import { getPaper, paperParts, partKey, papers } from "@/content/papers"

/* One static page per part; the paper page fetches it when the part's solution is opened. */
export const dynamicParams = false

export function generateStaticParams() {
  return papers.flatMap((p) => paperParts(p).map(({ q, part }) => ({ slug: p.slug, part: partKey(q, part) })))
}

export const metadata: Metadata = { title: "Solution", robots: { index: false } }

export default async function PartSolution({ params }: { params: Promise<{ slug: string; part: string }> }) {
  const { slug, part } = await params
  const paper = getPaper(slug)
  const found = paper && paperParts(paper).find(({ q, part: p }) => partKey(q, p) === part)
  if (!found) notFound()
  return (
    <div id="solution" className="mx-auto max-w-3xl px-4 py-10">
      <PracticeBody text={found.part.solution} />
    </div>
  )
}
