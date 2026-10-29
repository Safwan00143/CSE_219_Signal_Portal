import { Graph, Panel, range, type Item, type Tick } from "./kit"

type Props = {
  title: string
  /** x(τ) or x[k], drawn on top. */
  top: (v: number) => number
  /** h(t − τ) or h[n − k] for the chosen t or n, drawn below on the same axis. */
  bottom: (v: number) => number
  x: [number, number]
  yTop: [number, number]
  yBot: [number, number]
  /** The overlap interval, shaded on both rows; null when the two do not overlap. */
  overlap: [number, number] | null
  /** Where the sliding signal's edge sits (τ = t or k = n). */
  edge?: { at: number; label: string }
  ticks?: Tick[]
  /** Discrete signals are drawn as stems over the integers in x. */
  discrete?: boolean
}

/**
 * One case of a graphical convolution, drawn the way it is done in class:
 * the fixed signal on top, the flipped-and-shifted one below, both on the same
 * τ (or k) axis, with the region where they overlap shaded. Reading the
 * overlap off the picture gives the limits of the integral or sum.
 */
export function Overlap({ title, top, bottom, x, yTop, yBot, overlap, edge, ticks, discrete }: Props) {
  const variable = discrete ? "k" : "τ"
  const pad = discrete ? 0.45 : 0
  const band: Item[] = overlap ? [{ kind: "band", from: Math.max(overlap[0] - pad, x[0]), to: Math.min(overlap[1] + pad, x[1]), label: "overlap" }] : []
  const bandQuiet: Item[] = overlap ? [{ kind: "band", from: Math.max(overlap[0] - pad, x[0]), to: Math.min(overlap[1] + pad, x[1]) }] : []
  const edgeLine: Item[] = edge ? [{ kind: "vline", x: edge.at, dashed: true, tone: "muted", label: edge.label }] : []
  const draw = (f: (v: number) => number, tone: "accent" | "second"): Item =>
    discrete
      ? { kind: "stems", pts: range(Math.ceil(x[0]), Math.floor(x[1])).map((k) => [k, f(k)] as [number, number]), tone }
      : { kind: "fn", f, n: 700, tone }

  return (
    <Panel title={title}>
      <Graph x={x} y={yTop} xLabel={variable} yLabel={discrete ? "x[k]" : "x(τ)"} items={[...band, draw(top, "accent")]} xTicks={ticks} height={112} width={440} />
      <Graph
        x={x}
        y={yBot}
        xLabel={variable}
        yLabel={discrete ? "h[n−k]" : "h(t−τ)"}
        items={[...bandQuiet, ...edgeLine, draw(bottom, "second"), ...(overlap ? [] : [{ kind: "text" as const, at: [(x[0] + x[1]) / 2, yBot[1] * 0.7] as [number, number], text: "no overlap → y = 0", tone: "muted" as const }])]}
        xTicks={ticks}
        height={112}
        width={440}
      />
    </Panel>
  )
}
