/*
  Figure toolkit. Every figure on the site is drawn from these server-rendered
  SVG pieces so they share one visual language:
  - ink at low opacity for axes and guides,
  - the accent (sage) for the main signal,
  - "second" (ochre) only when two signals must be told apart,
  - shaded regions in the accent at low opacity.
*/
import { useId, type ReactNode } from "react"

export type Tone = "accent" | "second" | "ink" | "muted"
type Pt = [number, number]

const stroke: Record<Tone, string> = {
  accent: "stroke-primary",
  second: "stroke-figure-2",
  ink: "stroke-foreground/80",
  muted: "stroke-foreground/35",
}
const fill: Record<Tone, string> = {
  accent: "fill-primary",
  second: "fill-figure-2",
  ink: "fill-foreground/80",
  muted: "fill-foreground/45",
}
const softFill: Record<Tone, string> = {
  accent: "fill-primary/15",
  second: "fill-figure-2/20",
  ink: "fill-foreground/10",
  muted: "fill-foreground/[0.06]",
}

export type Item =
  | { kind: "fn"; f: (x: number) => number; from?: number; to?: number; tone?: Tone; dashed?: boolean; n?: number; area?: boolean; width?: number }
  | { kind: "path"; pts: Pt[]; tone?: Tone; dashed?: boolean; area?: boolean; width?: number }
  | { kind: "stems"; pts: Pt[]; tone?: Tone; values?: boolean }
  | { kind: "impulses"; pts: (Pt | [number, number, string])[]; tone?: Tone }
  | { kind: "dots"; pts: Pt[]; tone?: Tone; hollow?: boolean }
  | { kind: "text"; at: Pt; text: string; tone?: Tone; anchor?: "start" | "middle" | "end"; dx?: number; dy?: number; size?: number; italic?: boolean }
  | { kind: "vline"; x: number; tone?: Tone; dashed?: boolean; label?: string; from?: number; to?: number }
  | { kind: "hline"; y: number; tone?: Tone; dashed?: boolean; label?: string; from?: number; to?: number }
  | { kind: "band"; from: number; to: number; tone?: Tone; label?: string }
  | { kind: "arrow"; from: Pt; to: Pt; tone?: Tone; label?: string; double?: boolean }

export type Tick = number | [number, string]

export type GraphProps = {
  x: [number, number]
  y: [number, number]
  items: Item[]
  xTicks?: Tick[]
  yTicks?: Tick[]
  xLabel?: string
  yLabel?: string
  width?: number
  height?: number
  /** Hide the vertical axis, e.g. for spectra drawn around a carrier. */
  noYAxis?: boolean
  grid?: boolean
}

const PAD = { l: 30, r: 26, t: 22, b: 26 }

function fmt(v: number) {
  if (Number.isInteger(v)) return v < 0 ? `−${-v}` : String(v)
  const s = String(Number(v.toFixed(2)))
  return s.startsWith("-") ? `−${s.slice(1)}` : s
}

// Coordinates are rounded to 0.1 px: invisible on screen, and it keeps the serialized pages small.
const q = (v: number) => Math.round(v * 10) / 10

// SVG ids must match between server and client renders, so they come from useId.
const useSvgId = (p: string) => p + useId().replace(/[^a-zA-Z0-9]/g, "")

export function Graph({ x, y, items, xTicks, yTicks, xLabel = "t", yLabel, width = 340, height = 170, noYAxis, grid }: GraphProps) {
  const id = useSvgId("g")
  const W = width
  const H = height
  const sx = (v: number) => q(PAD.l + ((v - x[0]) / (x[1] - x[0])) * (W - PAD.l - PAD.r))
  const sy = (v: number) => q(PAD.t + ((y[1] - v) / (y[1] - y[0])) * (H - PAD.t - PAD.b))
  const ax = sy(Math.min(Math.max(0, y[0]), y[1]))
  const ay = sx(Math.min(Math.max(0, x[0]), x[1]))
  const line = (pts: Pt[]) => pts.map(([a, b]) => `${sx(a).toFixed(1)},${sy(b).toFixed(1)}`).join(" ")

  const ticks = (t: Tick): [number, string] => (Array.isArray(t) ? t : [t, fmt(t)])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" style={{ fontFamily: "var(--font-inter)" }}>
      <defs>
        <marker id={`${id}-ax`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,1 L9,5 L0,9" fill="none" className="stroke-foreground/45" strokeWidth="1.4" />
        </marker>
        {(["accent", "second", "ink", "muted"] as Tone[]).map((t) => (
          <marker key={t} id={`${id}-${t}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0.5 L10,5 L0,9.5 Z" className={fill[t]} />
          </marker>
        ))}
      </defs>

      {grid &&
        yTicks?.map((t) => {
          const [v] = ticks(t)
          return <line key={`gy${v}`} x1={PAD.l} x2={W - PAD.r} y1={sy(v)} y2={sy(v)} className="stroke-foreground/[0.07]" strokeDasharray="2 4" />
        })}

      {/* shaded bands sit under everything */}
      {items.map((it, i) =>
        it.kind === "band" ? (
          <g key={i}>
            <rect x={sx(it.from)} y={PAD.t - 6} width={sx(it.to) - sx(it.from)} height={H - PAD.t - PAD.b + 6} className={softFill[it.tone ?? "accent"]} />
            {it.label && (
              <text x={(sx(it.from) + sx(it.to)) / 2} y={PAD.t + 4} textAnchor="middle" className={`${fill[it.tone ?? "accent"]} text-[11px]`}>
                {it.label}
              </text>
            )}
          </g>
        ) : null,
      )}

      <line x1={PAD.l - 8} x2={W - PAD.r + 12} y1={ax} y2={ax} className="stroke-foreground/45" strokeWidth={1} markerEnd={`url(#${id}-ax)`} />
      {!noYAxis && (
        <line x1={ay} x2={ay} y1={H - PAD.b + 6} y2={PAD.t - 14} className="stroke-foreground/45" strokeWidth={1} markerEnd={`url(#${id}-ax)`} />
      )}
      <text x={W - PAD.r + 10} y={ax + 16} textAnchor="end" className="fill-muted-foreground text-[12px] italic">
        {xLabel}
      </text>
      {yLabel && !noYAxis && (
        <text x={ay + 7} y={PAD.t - 6} className="fill-muted-foreground text-[12px] italic">
          {yLabel}
        </text>
      )}

      {xTicks?.map((t) => {
        const [v, label] = ticks(t)
        return (
          <g key={`x${v}`}>
            <line x1={sx(v)} x2={sx(v)} y1={ax - 3} y2={ax + 3} className="stroke-foreground/45" />
            <text x={sx(v)} y={ax + 15} textAnchor="middle" className="fill-muted-foreground text-[11px] tabular-nums">
              {label}
            </text>
          </g>
        )
      })}
      {!noYAxis &&
        yTicks?.map((t) => {
          const [v, label] = ticks(t)
          return (
            <g key={`y${v}`}>
              <line x1={ay - 3} x2={ay + 3} y1={sy(v)} y2={sy(v)} className="stroke-foreground/45" />
              <text x={ay - 6} y={sy(v) + 4} textAnchor="end" className="fill-muted-foreground text-[11px] tabular-nums">
                {label}
              </text>
            </g>
          )
        })}

      {items.map((it, i) => {
        const tone = ("tone" in it && it.tone) || "accent"
        switch (it.kind) {
          case "fn": {
            const a = it.from ?? x[0]
            const b = it.to ?? x[1]
            const n = it.n ?? 240
            const pts: Pt[] = []
            for (let k = 0; k <= n; k++) {
              const t = a + ((b - a) * k) / n
              const v = it.f(t)
              pts.push([t, Math.max(y[0] - (y[1] - y[0]), Math.min(y[1] + (y[1] - y[0]), v))])
            }
            return (
              <g key={i}>
                {it.area && <polygon points={line([[a, 0], ...pts, [b, 0]])} className={softFill[tone]} />}
                <polyline points={line(pts)} fill="none" className={stroke[tone]} strokeWidth={it.width ?? 2} strokeDasharray={it.dashed ? "5 4" : undefined} strokeLinejoin="round" strokeLinecap="round" />
              </g>
            )
          }
          case "path":
            return (
              <g key={i}>
                {it.area && <polygon points={line([[it.pts[0][0], 0], ...it.pts, [it.pts[it.pts.length - 1][0], 0]])} className={softFill[tone]} />}
                <polyline points={line(it.pts)} fill="none" className={stroke[tone]} strokeWidth={it.width ?? 2} strokeDasharray={it.dashed ? "5 4" : undefined} strokeLinejoin="round" strokeLinecap="round" />
              </g>
            )
          case "stems":
            return (
              <g key={i}>
                {it.pts.map(([n, v]) => (
                  <g key={n}>
                    <line x1={sx(n)} x2={sx(n)} y1={ax} y2={sy(v)} className={stroke[tone]} strokeWidth={1.6} />
                    <circle cx={sx(n)} cy={sy(v)} r={3.4} className={fill[tone]} />
                    {it.values && (
                      <text x={sx(n)} y={sy(v) + (v >= 0 ? -8 : 16)} textAnchor="middle" className={`${fill[tone]} text-[10.5px] tabular-nums`}>
                        {fmt(v)}
                      </text>
                    )}
                  </g>
                ))}
              </g>
            )
          case "impulses":
            return (
              <g key={i}>
                {it.pts.map((p) => {
                  const [t, v, label] = p as [number, number, string?]
                  return (
                    <g key={t}>
                      <line x1={sx(t)} x2={sx(t)} y1={ax} y2={sy(v) + (v >= 0 ? 4 : -4)} className={stroke[tone]} strokeWidth={1.8} markerEnd={`url(#${id}-${tone})`} />
                      {label !== undefined && (
                        <text x={sx(t) + 5} y={sy(v) + (v >= 0 ? 2 : 10)} className={`${fill[tone]} text-[11px]`}>
                          {label}
                        </text>
                      )}
                    </g>
                  )
                })}
              </g>
            )
          case "dots":
            return (
              <g key={i}>
                {it.pts.map(([a, b]) => (
                  <circle key={`${a},${b}`} cx={sx(a)} cy={sy(b)} r={3.4} className={it.hollow ? `fill-background ${stroke[tone]}` : fill[tone]} strokeWidth={1.5} />
                ))}
              </g>
            )
          case "text":
            return (
              <text
                key={i}
                x={sx(it.at[0]) + (it.dx ?? 0)}
                y={sy(it.at[1]) + (it.dy ?? 0)}
                textAnchor={it.anchor ?? "middle"}
                className={`${it.tone ? fill[it.tone] : "fill-foreground/75"} ${it.italic ? "italic" : ""}`}
                style={{ fontSize: it.size ?? 12 }}
              >
                {it.text}
              </text>
            )
          case "vline":
            return (
              <g key={i}>
                <line x1={sx(it.x)} x2={sx(it.x)} y1={it.to !== undefined ? sy(it.to) : PAD.t - 4} y2={it.from !== undefined ? sy(it.from) : H - PAD.b} className={stroke[it.tone ?? "muted"]} strokeWidth={1} strokeDasharray={it.dashed === false ? undefined : "3 4"} />
                {it.label && (
                  <text x={sx(it.x)} y={PAD.t - 8} textAnchor="middle" className={`${fill[it.tone ?? "muted"]} text-[11px]`}>
                    {it.label}
                  </text>
                )}
              </g>
            )
          case "hline":
            return (
              <g key={i}>
                <line x1={it.from !== undefined ? sx(it.from) : PAD.l} x2={it.to !== undefined ? sx(it.to) : W - PAD.r} y1={sy(it.y)} y2={sy(it.y)} className={stroke[it.tone ?? "muted"]} strokeWidth={1} strokeDasharray={it.dashed === false ? undefined : "3 4"} />
                {it.label && (
                  <text x={(it.to !== undefined ? sx(it.to) : W - PAD.r) + 2} y={sy(it.y) - 4} textAnchor="end" className={`${fill[it.tone ?? "muted"]} text-[11px]`}>
                    {it.label}
                  </text>
                )}
              </g>
            )
          case "arrow":
            return (
              <g key={i}>
                <line x1={sx(it.from[0])} y1={sy(it.from[1])} x2={sx(it.to[0])} y2={sy(it.to[1])} className={stroke[tone]} strokeWidth={1.3} markerEnd={`url(#${id}-${tone})`} markerStart={it.double ? `url(#${id}-${tone})` : undefined} />
                {it.label && (
                  <text x={(sx(it.from[0]) + sx(it.to[0])) / 2} y={(sy(it.from[1]) + sy(it.to[1])) / 2 - 6} textAnchor="middle" className={`${fill[tone]} text-[11px]`}>
                    {it.label}
                  </text>
                )}
              </g>
            )
          default:
            return null
        }
      })}
    </svg>
  )
}

/* ───────────────────────── s-plane / z-plane ───────────────────────── */

export type PlaneProps = {
  kind: "s" | "z"
  range?: number
  poles?: Pt[]
  zeros?: Pt[]
  /** s-plane ROC: Re{s} between left and right (use ±Infinity). */
  roc?: { left?: number; right?: number }
  /** z-plane ROC: inner < |z| < outer (outer may be Infinity). */
  ring?: { inner?: number; outer?: number }
  ticks?: Tick[]
  labels?: { at: Pt; text: string }[]
  poleOrder?: { at: Pt; text: string }[]
  size?: number
  showUnitCircle?: boolean
}

export function Plane({ kind, range = 3, poles = [], zeros = [], roc, ring, ticks, labels, poleOrder, size = 240, showUnitCircle = kind === "z" }: PlaneProps) {
  const id = useSvgId("p")
  const S = size
  const pad = 18
  const sc = (v: number) => q(pad + ((v + range) / (2 * range)) * (S - 2 * pad))
  const sy = (v: number) => q(pad + ((range - v) / (2 * range)) * (S - 2 * pad))
  const r = (v: number) => q((v / (2 * range)) * (S - 2 * pad))
  const o = sc(0)
  const oy = sy(0)

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="h-auto w-full max-w-[260px]" role="img" style={{ fontFamily: "var(--font-inter)" }}>
      <defs>
        <marker id={`${id}-ax`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,1 L9,5 L0,9" fill="none" className="stroke-foreground/45" strokeWidth="1.4" />
        </marker>
        <clipPath id={`${id}-clip`}>
          <rect x={pad - 6} y={pad - 6} width={S - 2 * pad + 12} height={S - 2 * pad + 12} />
        </clipPath>
        <mask id={`${id}-ring`}>
          <rect x="0" y="0" width={S} height={S} fill="white" />
          {ring?.inner !== undefined && ring.inner > 0 && <circle cx={o} cy={oy} r={r(ring.inner)} fill="black" />}
        </mask>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        {roc && (
          <rect
            x={roc.left === undefined || roc.left === -Infinity ? 0 : sc(roc.left)}
            y={0}
            width={(roc.right === undefined || roc.right === Infinity ? S : sc(roc.right)) - (roc.left === undefined || roc.left === -Infinity ? 0 : sc(roc.left))}
            height={S}
            className="fill-primary/15"
          />
        )}
        {ring &&
          (ring.outer === undefined || ring.outer === Infinity ? (
            <rect x="0" y="0" width={S} height={S} className="fill-primary/15" mask={`url(#${id}-ring)`} />
          ) : (
            <circle cx={o} cy={oy} r={r(ring.outer)} className="fill-primary/15" mask={`url(#${id}-ring)`} />
          ))}
        {roc?.left !== undefined && Number.isFinite(roc.left) && <line x1={sc(roc.left)} x2={sc(roc.left)} y1={0} y2={S} className="stroke-primary/60" strokeDasharray="4 3" />}
        {roc?.right !== undefined && Number.isFinite(roc.right) && <line x1={sc(roc.right)} x2={sc(roc.right)} y1={0} y2={S} className="stroke-primary/60" strokeDasharray="4 3" />}
        {ring?.inner !== undefined && ring.inner > 0 && <circle cx={o} cy={oy} r={r(ring.inner)} fill="none" className="stroke-primary/60" strokeDasharray="4 3" />}
        {ring?.outer !== undefined && Number.isFinite(ring.outer) && <circle cx={o} cy={oy} r={r(ring.outer)} fill="none" className="stroke-primary/60" strokeDasharray="4 3" />}
      </g>

      {showUnitCircle && <circle cx={o} cy={oy} r={r(1)} fill="none" className="stroke-foreground/40" strokeWidth={1} />}

      <line x1={pad - 6} x2={S - pad + 8} y1={oy} y2={oy} className="stroke-foreground/45" markerEnd={`url(#${id}-ax)`} />
      <line x1={o} x2={o} y1={S - pad + 6} y2={pad - 10} className="stroke-foreground/45" markerEnd={`url(#${id}-ax)`} />
      <text x={S - pad + 6} y={oy + 15} textAnchor="end" className="fill-muted-foreground text-[11px] italic">
        {kind === "s" ? "σ" : "Re"}
      </text>
      <text x={o + 6} y={pad - 2} className="fill-muted-foreground text-[11px] italic">
        {kind === "s" ? "jω" : "Im"}
      </text>

      {ticks?.map((t) => {
        const [v, label] = Array.isArray(t) ? t : [t, fmt(t)]
        return (
          <g key={v}>
            <line x1={sc(v)} x2={sc(v)} y1={oy - 3} y2={oy + 3} className="stroke-foreground/45" />
            <text x={sc(v)} y={oy + 15} textAnchor="middle" className="fill-muted-foreground text-[10.5px] tabular-nums">
              {label}
            </text>
          </g>
        )
      })}

      {zeros.map(([a, b]) => (
        <circle key={`z${a},${b}`} cx={sc(a)} cy={sy(b)} r={5} className="fill-background stroke-foreground/85" strokeWidth={1.6} />
      ))}
      {poles.map(([a, b]) => (
        <g key={`p${a},${b}`} className="stroke-figure-2" strokeWidth={2} strokeLinecap="round">
          <line x1={sc(a) - 5} x2={sc(a) + 5} y1={sy(b) - 5} y2={sy(b) + 5} />
          <line x1={sc(a) - 5} x2={sc(a) + 5} y1={sy(b) + 5} y2={sy(b) - 5} />
        </g>
      ))}
      {poleOrder?.map((p) => (
        <text key={p.text} x={sc(p.at[0]) + 8} y={sy(p.at[1]) - 7} className="fill-figure-2 text-[10.5px]">
          {p.text}
        </text>
      ))}
      {labels?.map((l) => (
        <text key={l.text} x={sc(l.at[0])} y={sy(l.at[1])} textAnchor="middle" className="fill-primary text-[11px]">
          {l.text}
        </text>
      ))}
    </svg>
  )
}

/* ───────────────────────── Block diagrams ───────────────────────── */

export type BlockNode = {
  id: string
  x: number
  y: number
  label?: string
  shape?: "box" | "sum" | "mult" | "dot" | "text"
  w?: number
  h?: number
  sub?: string
}
export type Wire = { pts: Pt[]; label?: string; labelAt?: number; labelDy?: number; arrow?: boolean; tone?: Tone }

export function Blocks({ width, height, nodes, wires }: { width: number; height: number; nodes: BlockNode[]; wires: Wire[] }) {
  const id = useSvgId("b")
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" style={{ fontFamily: "var(--font-inter)" }}>
      <defs>
        <marker id={`${id}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0.5 L10,5 L0,9.5 Z" className="fill-foreground/70" />
        </marker>
      </defs>
      {wires.map((w, i) => {
        const pts = w.pts.map(([a, b]) => `${a},${b}`).join(" ")
        const k = Math.min(w.labelAt ?? 0, w.pts.length - 2)
        const [a, b] = w.pts[k]
        const [c, d] = w.pts[k + 1]
        return (
          <g key={i}>
            <polyline points={pts} fill="none" className={w.tone ? stroke[w.tone] : "stroke-foreground/70"} strokeWidth={1.3} markerEnd={w.arrow === false ? undefined : `url(#${id}-a)`} />
            {w.label && (
              <text x={(a + c) / 2} y={(b + d) / 2 + (w.labelDy ?? -7)} textAnchor="middle" className="fill-foreground/80 text-[12px] italic">
                {w.label}
              </text>
            )}
          </g>
        )
      })}
      {nodes.map((n) => {
        const w = n.w ?? 84
        const h = n.h ?? 38
        switch (n.shape ?? "box") {
          case "box":
            return (
              <g key={n.id}>
                <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx={7} className="fill-background stroke-foreground/60" strokeWidth={1.2} />
                <text x={n.x} y={n.y + (n.sub ? -1 : 4.5)} textAnchor="middle" className="fill-foreground text-[12.5px]">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={n.x} y={n.y + 13} textAnchor="middle" className="fill-muted-foreground text-[10.5px]">
                    {n.sub}
                  </text>
                )}
              </g>
            )
          case "sum":
          case "mult":
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={12} className="fill-background stroke-foreground/60" strokeWidth={1.2} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" className="fill-foreground text-[15px]">
                  {n.shape === "sum" ? "+" : "×"}
                </text>
                {n.label && (
                  <text x={n.x + 16} y={n.y - 12} className="fill-muted-foreground text-[11px]">
                    {n.label}
                  </text>
                )}
              </g>
            )
          case "dot":
            return <circle key={n.id} cx={n.x} cy={n.y} r={3} className="fill-foreground/70" />
          default:
            return (
              <text key={n.id} x={n.x} y={n.y + 4} textAnchor="middle" className="fill-foreground/85 text-[12.5px] italic">
                {n.label}
              </text>
            )
        }
      })}
    </svg>
  )
}

/* ───────────────────────── FFT flow graphs ───────────────────────── */

const SUB = "₀₁₂₃₄₅₆₇₈₉"
const sub = (n: number) => String(n).split("").map((d) => SUB[+d]).join("")
const rev = (k: number, bits: number) => {
  let r = 0
  for (let i = 0; i < bits; i++) r = (r << 1) | ((k >> i) & 1)
  return r
}

/** Radix-2 flow graph for N = 2, 4 or 8, decimation in time or in frequency. */
export function FlowGraph({ n, variant }: { n: 2 | 4 | 8; variant: "dit" | "dif" }) {
  const id = useSvgId("f")
  const bits = Math.log2(n)
  const rowH = 34
  const colW = 128
  const left = 64
  const top = 22
  const W = left + bits * colW + 64
  const H = top + (n - 1) * rowH + 26
  const X = (c: number) => left + c * colW
  const Y = (r: number) => top + r * rowH

  const inLabel = (r: number) => `x[${variant === "dit" ? rev(r, bits) : r}]`
  const outLabel = (r: number) => `X[${variant === "dit" ? r : rev(r, bits)}]`

  const edges: ReactNode[] = []
  for (let s = 0; s < bits; s++) {
    // DIT: span grows 2,4,8 ; DIF: span shrinks N, N/2, ..., 2
    const m = variant === "dit" ? 2 << s : n >> s
    for (let blk = 0; blk < n; blk += m) {
      for (let k = 0; k < m / 2; k++) {
        const a = blk + k
        const b = a + m / 2
        const tw = (k * n) / m // exponent of W_N
        const twLabel = `W${sub(n)}${tw === 0 ? "⁰" : superscript(tw)}`
        const x0 = X(s)
        const x1 = X(s + 1)
        edges.push(
          <g key={`${s}-${a}`}>
            <line x1={x0} y1={Y(a)} x2={x1} y2={Y(a)} className="stroke-foreground/55" strokeWidth={1.1} />
            <line x1={x0} y1={Y(b)} x2={x1} y2={Y(a)} className="stroke-foreground/55" strokeWidth={1.1} />
            <line x1={x0} y1={Y(a)} x2={x1} y2={Y(b)} className="stroke-foreground/55" strokeWidth={1.1} />
            <line x1={x0} y1={Y(b)} x2={x1} y2={Y(b)} className="stroke-foreground/55" strokeWidth={1.1} markerEnd={`url(#${id}-a)`} />
            <text
              x={variant === "dit" ? x0 + 6 : x1 - 46}
              y={Y(b) - 5}
              className="fill-figure-2 text-[10.5px]"
            >
              {twLabel}
            </text>
            <text x={x1 - 14} y={Y(b) + 13} className="fill-muted-foreground text-[10px]">
              −1
            </text>
          </g>,
        )
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" style={{ fontFamily: "var(--font-inter)" }}>
      <defs>
        <marker id={`${id}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0.5 L10,5 L0,9.5 Z" className="fill-foreground/50" />
        </marker>
      </defs>
      {edges}
      {Array.from({ length: bits + 1 }, (_, c) =>
        Array.from({ length: n }, (_, r) => <circle key={`${c}-${r}`} cx={X(c)} cy={Y(r)} r={3} className={c === 0 || c === bits ? "fill-primary" : "fill-foreground/60"} />),
      )}
      {Array.from({ length: n }, (_, r) => (
        <g key={`l${r}`}>
          <text x={X(0) - 10} y={Y(r) + 4} textAnchor="end" className="fill-foreground text-[12px]">
            {inLabel(r)}
          </text>
          <text x={X(bits) + 10} y={Y(r) + 4} className="fill-foreground text-[12px]">
            {outLabel(r)}
          </text>
        </g>
      ))}
      {Array.from({ length: bits }, (_, s) => (
        <text key={`s${s}`} x={(X(s) + X(s + 1)) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[10.5px]">
          stage {s + 1}
        </text>
      ))}
    </svg>
  )
}

function superscript(n: number) {
  const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹"
  return String(n)
    .split("")
    .map((d) => SUP[+d])
    .join("")
}

/* ───────────────────────── Layout ───────────────────────── */

export function Row({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  // Three-panel rows still use two columns: at 44rem a third column would shrink axis labels below reading size.
  const c = cols === 1 ? "" : "sm:grid-cols-2"
  return <div className={`grid items-end gap-x-8 gap-y-6 ${c}`}>{children}</div>
}

export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      {children}
      {title && <p className="mt-1 text-center text-[12.5px] text-muted-foreground">{title}</p>}
    </div>
  )
}

/* ───────────────────────── Helpers for common signals ───────────────────────── */

export const rect = (t: number, a: number, b: number, h = 1) => (t > a && t < b ? h : 0)
export const tri = (t: number, w = 1, h = 1) => (Math.abs(t) < w ? h * (1 - Math.abs(t) / w) : 0)
export const sinc = (x: number) => (Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x)
export const u = (t: number) => (t >= 0 ? 1 : 0)
export const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)
export const PI = Math.PI
