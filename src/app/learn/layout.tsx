import { TopicNav } from "@/components/topic-nav"

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:pt-14">
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <aside>
          <TopicNav base="/learn" />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
