import type { ReactNode } from "react"
import katex from "katex"

export type FigureEntry = { node: ReactNode; caption?: string; wide?: boolean }
export type FigureMap = Record<string, FigureEntry>

/** Captions are plain text with optional `$…$` inline math. */
function Caption({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("$") && p.endsWith("$") ? (
          <span key={i} dangerouslySetInnerHTML={{ __html: katex.renderToString(p.slice(1, -1), { throwOnError: false }) }} />
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export function FigureFrame({ entry, id }: { entry?: FigureEntry; id: string }) {
  if (!entry) {
    return <p className="text-sm text-destructive">Missing figure: {id}</p>
  }
  return (
    <figure className={entry.wide ? "my-8" : "my-8 max-w-[30rem]"}>
      <div className="text-foreground">{entry.node}</div>
      {entry.caption && (
        <figcaption className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          <Caption text={entry.caption} />
        </figcaption>
      )}
    </figure>
  )
}
