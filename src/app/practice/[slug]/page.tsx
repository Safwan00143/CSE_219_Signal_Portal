import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"
import { PracticeList, type PracticeItem } from "@/components/practice-list"
import { PracticeTabs } from "@/components/practice-tabs"
import { PracticeBody } from "@/components/practice-body"
import { TopicNav } from "@/components/topic-nav"
import { SidebarShell } from "@/components/sidebar-shell"
import { questionsFor } from "@/content/questions"
import { bookProblemsFor, bookTitles } from "@/content/book"
import { sheetProblemsFor } from "@/content/sheets"
import { getTopic, topics } from "@/content/topics"
import { toHref } from "@/lib/static-path"

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const topic = getTopic((await params).slug)
  return { title: topic ? `Practice: ${topic.title}` : "Practice" }
}

export default async function PracticeTopic({ params }: { params: Promise<{ slug: string }> }) {
  const topic = getTopic((await params).slug)
  if (!topic) notFound()

  const i = topics.indexOf(topic)
  const prev = topics[i - 1]
  const next = topics[i + 1]

  const items: PracticeItem[] = questionsFor(topic.slug).map((q) => ({
    id: q.id,
    group: q.course,
    primary: q.course === "CSE 219",
    meta: [q.session.replace("-", "–"), q.label, ...(q.marks !== undefined ? [`${q.marks} marks`] : [])],
    alsoAsked: q.alsoAsked,
    note: q.note,
    prompt: <PracticeBody text={q.prompt} plots={q.promptPlots} figs={q.promptFigs} className="prose-prompt" />,
    solutionUrl: toHref(`/practice/${topic.slug}/solution/${q.id}`),
  }))

  const bookItems: PracticeItem[] = bookProblemsFor(topic.slug).map((p) => ({
    id: p.id,
    group: p.book,
    primary: p.book === "Oppenheim",
    meta: [p.ref],
    prompt: <PracticeBody text={p.prompt} figs={p.promptFigs} className="prose-prompt" />,
    solutionUrl: toHref(`/practice/${topic.slug}/solution/${p.id}`),
  }))
  const sheetItems: PracticeItem[] = sheetProblemsFor(topic.slug).map((p) => ({
    id: p.id,
    group: p.sheet,
    primary: true,
    meta: [p.ref, ...(p.title ? [p.title] : [])],
    prompt: <PracticeBody text={p.prompt} figs={p.promptFigs} className="prose-prompt" />,
    solutionUrl: toHref(`/practice/${topic.slug}/solution/${p.id}`),
  }))

  const booksUsed = [...new Set(bookProblemsFor(topic.slug).map((p) => p.book))]

  return (
    <SidebarShell left={<TopicNav base="/practice" />}>
        <div className="max-w-[50rem] lg:group-data-[left=closed]/shell:max-w-none">
          <header className="mb-10">
            <p className="text-[13px] text-muted-foreground">
              <span className="tabular-nums text-primary">Practice · Topic {String(i + 1).padStart(2, "0")}</span>
            </p>
            <h1 className="mt-3 text-4xl font-medium leading-tight sm:text-[2.75rem]">{topic.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Try each question before opening its solution.
            </p>
            <Link
              href={`/learn/${topic.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline hover:underline-offset-4"
            >
              <BookOpen className="size-4" />
              Read the notes first
            </Link>
          </header>

          <PracticeTabs
            tabs={[
              {
                id: "term-final",
                label: "Term-final questions",
                count: items.length,
                content:
                  items.length > 0 ? (
                    <PracticeList items={items} filterLabel="Filter by course" />
                  ) : (
                    <p className="border-t border-border py-10 text-muted-foreground">
                      No past term-final question targets this topic directly yet. Its ideas show up inside the
                      questions on neighbouring topics.
                    </p>
                  ),
              },
              {
                id: "class",
                label: "Class practice",
                count: sheetItems.length,
                content:
                  sheetItems.length > 0 ? (
                    <>
                      <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">
                        Practice problems from your teachers’ own sheets, with their worked solutions.
                      </p>
                      <PracticeList items={sheetItems} filterLabel="Filter by sheet" />
                    </>
                  ) : (
                    <p className="border-t border-border py-10 text-muted-foreground">
                      The practice sheets have no problems on this topic. Try the other tabs.
                    </p>
                  ),
              },
              {
                id: "book",
                label: "Book problems",
                count: bookItems.length,
                content: (
                  <>
                    <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">
                      Extra practice from {booksUsed.map((b) => bookTitles[b]).join(" and ")}, with worked solutions.
                      These are not past exam questions.
                    </p>
                    <PracticeList items={bookItems} filterLabel="Filter by book" />
                  </>
                ),
              },
            ]}
          />

          <nav className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 text-sm" aria-label="Practice pages">
            <div>
              {prev && (
                <Link href={`/practice/${prev.slug}`} className="group block">
                  <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                    <ArrowLeft className="size-3.5" /> Previous
                  </span>
                  <span className="mt-1 block font-heading font-medium group-hover:text-primary">{prev.title}</span>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={`/practice/${next.slug}`} className="group block">
                  <span className="flex items-center justify-end gap-1.5 text-[13px] text-muted-foreground">
                    Next <ArrowRight className="size-3.5" />
                  </span>
                  <span className="mt-1 block font-heading font-medium group-hover:text-primary">{next.title}</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
    </SidebarShell>
  )
}

