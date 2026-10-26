import type { PlotSpec } from "@/content/types"

const W = 320
const H = 168
const PAD = { left: 30, right: 14, top: 22, bottom: 26 }

function fmt(v: number) {
  return Number.isInteger(v) ? String(v) : String(Number(v.toFixed(2)))
}

/** Small, quiet plot of a piecewise-linear signal. Axes in ink, the signal in the accent colour. */
export function SignalPlot({ spec }: { spec: PlotSpec }) {
  const [x0, x1] = spec.xRange
  const [y0, y1] = spec.yRange
  const sx = (x: number) => PAD.left + ((x - x0) / (x1 - x0)) * (W - PAD.left - PAD.right)
  const sy = (y: number) => PAD.top + ((y1 - y) / (y1 - y0)) * (H - PAD.top - PAD.bottom)
  const axisY = sy(Math.min(Math.max(0, y0), y1))
  const axisX = sx(Math.min(Math.max(0, x0), x1))

  return (
    <figure className="min-w-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full max-w-[340px]"
        role="img"
        aria-label={spec.title}
      >
        <line x1={PAD.left} x2={W - PAD.right} y1={axisY} y2={axisY} className="stroke-foreground/25" strokeWidth={1} />
        <line x1={axisX} x2={axisX} y1={PAD.top - 6} y2={H - PAD.bottom} className="stroke-foreground/25" strokeWidth={1} />

        {spec.xTicks?.map((t) => (
          <g key={`x${t}`}>
            <line x1={sx(t)} x2={sx(t)} y1={axisY - 3} y2={axisY + 3} className="stroke-foreground/30" />
            <text x={sx(t)} y={H - 8} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {fmt(t)}
            </text>
          </g>
        ))}
        {spec.yTicks?.map((t) => (
          <g key={`y${t}`}>
            <line x1={PAD.left} x2={W - PAD.right} y1={sy(t)} y2={sy(t)} className="stroke-foreground/[0.07]" strokeDasharray="2 3" />
            <text x={axisX - 5} y={sy(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {fmt(t)}
            </text>
          </g>
        ))}

        {spec.segments.map((seg, i) => (
          <polyline
            key={i}
            points={seg.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ")}
            fill="none"
            className="stroke-primary"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {spec.dots?.map(([x, y], i) => (
          <circle key={i} cx={sx(x)} cy={sy(y)} r={3} className="fill-primary" />
        ))}

        <text x={W - PAD.right} y={axisY - 6} textAnchor="end" className="fill-muted-foreground text-[10px] italic">
          {spec.xLabel ?? "t"}
        </text>
      </svg>
      <figcaption className="mt-1 text-[13px] text-muted-foreground">{spec.title}</figcaption>
    </figure>
  )
}

export function PlotRow({ plots }: { plots: PlotSpec[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {plots.map((p) => (
        <SignalPlot key={p.title} spec={p} />
      ))}
    </div>
  )
}
