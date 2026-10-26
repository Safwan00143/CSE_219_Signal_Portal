import { Markdown } from "@/components/markdown"
import { PlotRow } from "@/components/signal-plot"
import type { PlotSpec } from "@/content/types"
import { figures } from "@/figures"
import { FigureFrame } from "@/figures/figure"

/** A question's prompt or solution: markdown, then any attached plots and figures. */
export function PracticeBody({ text, plots, figs, className }: { text: string; plots?: PlotSpec[]; figs?: string[]; className?: string }) {
  return (
    <>
      <Markdown className={className}>{text}</Markdown>
      {plots && (
        <div className="mt-6">
          <PlotRow plots={plots} />
        </div>
      )}
      {figs?.map((id) => (
        <FigureFrame key={id} id={id} entry={figures[id]} />
      ))}
    </>
  )
}
