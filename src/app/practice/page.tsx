import type { Metadata } from "next"
import { CourseMap } from "@/components/course-map"
import { questions } from "@/content/questions"

export const metadata: Metadata = { title: "Practice" }

export default function PracticeIndex() {
  const own = questions.filter((q) => q.course === "CSE 219").length

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
      <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div>
          <p className="text-[13px] font-medium text-primary">Practice</p>
          <h1 className="mt-3 text-4xl font-medium leading-tight">Past questions by topic</h1>
          <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              {questions.length} questions with full worked solutions. {own} come from the CSE 219 term final; the
              rest are the signals parts of CSE 311 papers, which cover the same material.
            </p>
            <p>Pick a topic, try each question on paper, then reveal the solution.</p>
          </div>
        </div>
        <CourseMap mode="practice" />
      </div>
    </div>
  )
}
