"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Pause, Play, RotateCcw } from "lucide-react"
import { Graph, Panel, PI, Plane, Row, range } from "./kit"

type P = [number, number]

/* ───────────── shared controls ───────────── */

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format?: (v: number) => string }) {
  return (
    <label className="block min-w-0 flex-1 text-[13px] text-muted-foreground">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-medium tabular-nums text-foreground">{format ? format(value) : value}</span>
      </span>
      <input type="range" className="fig-range mt-1" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  )
}

/** Steps a value from min to max on a timer; stops at the end. */
function usePlayer(value: number, set: (v: number) => void, min: number, max: number, step: number, ms: number) {
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      if (value + step > max + 1e-9) setPlaying(false)
      else set(Number((value + step).toFixed(4)))
    }, ms)
    return () => clearInterval(t)
  }, [playing, value, set, max, step, ms])
  const toggle = () => {
    if (!playing && value >= max - 1e-9) set(min)
    setPlaying((p) => !p)
  }
  return { playing, toggle }
}

function PlayButton({ playing, onClick, onReset }: { playing: boolean; onClick: () => void; onReset?: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[12.5px] font-medium text-primary-foreground hover:bg-primary/90">
        {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        {playing ? "Pause" : "Play"}
      </button>
      {onReset && (
        <button type="button" onClick={onReset} aria-label="Reset" className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
          <RotateCcw className="size-3.5" />
        </button>
      )}
    </div>
  )
}

function Frame({ children, controls, readout }: { children: ReactNode; controls: ReactNode; readout?: ReactNode }) {
  return (
    <div className="rounded-xl border border-border/80 p-4 sm:p-5">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-primary">Interactive</p>
      {children}
      <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">{controls}</div>
      {readout && <div className="mt-3 text-[13px] leading-relaxed text-foreground/85">{readout}</div>}
    </div>
  )
}

/* ───────────── 1. time transformations ───────────── */

const xs = (t: number) => (t >= 0 && t < 1 ? 1 : t >= 1 && t <= 2 ? 2 - t : 0)

export function TransformExplorer() {
  const [a, setA] = useState(-2)
  const [b, setB] = useState(2)
  const aa = a === 0 ? 0.5 : a
  const fmt = (v: number) => (v < 0 ? `− ${-v}` : `+ ${v}`)
  return (
    <Frame
      controls={
        <>
          <Slider label="a (scale; negative = reverse)" value={a} min={-3} max={3} step={0.5} onChange={(v) => setA(v === 0 ? 0.5 : v)} />
          <Slider label="b (shift)" value={b} min={-3} max={3} step={0.5} onChange={setB} />
        </>
      }
      readout={
        <>
          <span className="font-medium">y(t) = x({aa}t {fmt(b)})</span>. Recipe: shift {b >= 0 ? "left" : "right"} by {Math.abs(b)}, {aa < 0 ? "reverse, " : ""}then {Math.abs(aa) > 1 ? `compress by ${Math.abs(aa)}` : Math.abs(aa) < 1 ? `stretch by ${1 / Math.abs(aa)}` : "keep the width"}. The corner at t = 1 lands at t = {((1 - b) / aa).toFixed(2)}.
        </>
      }
    >
      <Graph width={460} x={[-5, 5]} y={[-0.25, 1.35]} items={[{ kind: "fn", f: xs, tone: "muted", dashed: true, n: 800 }, { kind: "fn", f: (t) => xs(aa * t + b), n: 1200 }, { kind: "text", at: [1.6, 1.15], text: "x(t)", tone: "muted" }]} xTicks={[-4, -2, 0, 2, 4]} yTicks={[1]} />
    </Frame>
  )
}

/* ───────────── 2. discrete convolution, step by step ───────────── */

const cx = [1, 2, 1, 1]
const ch = [1, 1, -1, 2]
const cy = range(0, 6).map((n) => cx.reduce((s, v, k) => s + v * (ch[n - k] ?? 0), 0))

export function ConvolutionStepper() {
  const [n, setN] = useState(-1)
  const { playing, toggle } = usePlayer(n, setN, -1, 7, 1, 900)
  const terms = cx.map((v, k) => [k, v, ch[n - k]] as const).filter(([, , hv]) => hv !== undefined)
  return (
    <Frame
      controls={
        <>
          <Slider label="output index n" value={n} min={-1} max={7} step={1} onChange={setN} />
          <PlayButton playing={playing} onClick={toggle} onReset={() => setN(-1)} />
        </>
      }
      readout={
        terms.length ? (
          <>
            y[{n}] = {terms.map(([, v, hv]) => `${v}·(${hv})`).join(" + ")} = <span className="font-medium text-primary">{cy[n]}</span>
          </>
        ) : (
          <>y[{n}] = 0: no overlap between x[k] and h[n − k].</>
        )
      }
    >
      <Row>
        <Panel title={`x[k] (sage) and h[${n} − k] (ochre)`}>
          <Graph x={[-4.6, 7.6]} y={[-1.5, 2.6]} xLabel="k" items={[{ kind: "band", from: n - 3.4, to: n + 0.4, tone: "second" }, { kind: "stems", pts: cx.map((v, k) => [k, v] as P) }, { kind: "stems", pts: ch.map((v, i) => [n - i + 0.2, v] as P), tone: "second" }]} xTicks={[-3, 0, 3, 6]} />
        </Panel>
        <Panel title="y[n] built so far">
          <Graph x={[-1.6, 7.6]} y={[-0.5, 4.8]} xLabel="n" items={[{ kind: "stems", pts: cy.map((v, m) => [m, v] as P).filter(([m]) => m <= n), values: true }, ...(n >= 0 && n <= 6 ? [{ kind: "dots" as const, pts: [[n, cy[n]]] as P[], tone: "second" as const }] : [])]} xTicks={[0, 2, 4, 6]} />
        </Panel>
      </Row>
    </Frame>
  )
}

/* ───────────── 3. Fourier series build-up ───────────── */

const sq = (t: number) => (Math.abs((((t + PI) % (2 * PI)) + 2 * PI) % (2 * PI) - PI) < PI / 2 ? 1 : 0)
const ak = (k: number) => (k === 0 ? 0.5 : Math.sin((k * PI) / 2) / (k * PI))

export function FourierBuilder() {
  const [N, setN] = useState(1)
  const { playing, toggle } = usePlayer(N, setN, 1, 41, 2, 450)
  const partial = (t: number) => range(1, N).reduce((s, k) => s + 2 * ak(k) * Math.cos(k * t), 0.5)
  return (
    <Frame
      controls={
        <>
          <Slider label="highest harmonic N" value={N} min={1} max={41} step={2} onChange={setN} />
          <PlayButton playing={playing} onClick={toggle} onReset={() => setN(1)} />
        </>
      }
      readout={<>Adding harmonics sharpens the edges, but the overshoot next to each jump stays near 9% (≈ {(Math.max(...range(0, 400).map((i) => partial(PI / 2 - 0.6 + (i * 0.6) / 400))) - 1).toFixed(3)} above 1 here): the Gibbs phenomenon.</>}
    >
      <Row>
        <Panel title={`partial sum with harmonics up to ${N}`}>
          <Graph x={[-PI, PI]} y={[-0.3, 1.35]} items={[{ kind: "fn", f: sq, tone: "muted", width: 1, n: 800 }, { kind: "fn", f: partial, n: 900 }]} xTicks={[[-PI / 2, "−T₁"], [PI / 2, "T₁"]]} yTicks={[1]} />
        </Panel>
        <Panel title="coefficients used">
          <Graph x={[-42, 42]} y={[-0.25, 0.62]} xLabel="k" items={[{ kind: "stems", pts: range(-N, N).map((k) => [k, ak(k)] as P) }]} xTicks={[-40, -20, 0, 20, 40]} yTicks={[[0.5, "½"]]} />
        </Panel>
      </Row>
    </Frame>
  )
}

/* ───────────── 4. pulse width ↔ bandwidth ───────────── */

export function ScalingExplorer() {
  const [T, setT] = useState(1)
  return (
    <Frame
      controls={<Slider label="pulse width T" value={T} min={0.25} max={3} step={0.05} onChange={setT} format={(v) => v.toFixed(2)} />}
      readout={<>First spectral zero at ω = 2π/T = <span className="font-medium text-primary">{((2 * PI) / T).toFixed(2)}</span> rad/s; peak height = T = {T.toFixed(2)}. Width × bandwidth stays constant: narrow in time means wide in frequency.</>}
    >
      <Row>
        <Panel title="x(t): 1 for |t| < T/2">
          <Graph x={[-2, 2]} y={[-0.2, 1.3]} items={[{ kind: "fn", f: (t) => (Math.abs(t) < T / 2 ? 1 : 0), n: 800 }]} xTicks={[-1, 1]} yTicks={[1]} />
        </Panel>
        <Panel title="X(jω) = 2 sin(ωT/2)/ω">
          <Graph x={[-30, 30]} y={[-0.8, 3.2]} xLabel="ω" items={[{ kind: "fn", f: (w) => (Math.abs(w) < 1e-9 ? T : (2 * Math.sin((w * T) / 2)) / w), n: 700 }, { kind: "vline", x: (2 * PI) / T, tone: "second" }]} xTicks={[-20, 0, 20]} yTicks={[1, 3]} />
        </Panel>
      </Row>
    </Frame>
  )
}

/* ───────────── 5. sampling and aliasing ───────────── */

const tri = (w: number) => Math.max(0, 1 - Math.abs(w) / 2) // band-limited to ω_M = 2

export function AliasingExplorer() {
  const [ws, setWs] = useState(6)
  const { playing, toggle } = usePlayer(ws, setWs, 2, 7, 0.1, 120)
  const ok = ws > 4
  const f0 = 1.6 // a tone below ω_M, in rad/s
  const alias = Math.abs(((f0 + ws / 2) % ws) - ws / 2)
  const sum = (w: number) => range(-5, 5).reduce((s, k) => s + tri(w - k * ws), 0)
  return (
    <Frame
      controls={
        <>
          <Slider label="sampling frequency ωₛ (ω_M = 2)" value={ws} min={2} max={7} step={0.1} onChange={setWs} format={(v) => v.toFixed(1)} />
          <PlayButton playing={playing} onClick={toggle} />
        </>
      }
      readout={
        ok ? (
          <>ωₛ = {ws.toFixed(1)} &gt; 2ω_M = 4: the copies are separated by a guard band of {(ws - 4).toFixed(1)}. An ideal low-pass filter recovers x(t).</>
        ) : (
          <span className="text-figure-2">ωₛ = {ws.toFixed(1)} &lt; 4: copies overlap (aliasing). The tone at ω = {f0} reappears at ω = {alias.toFixed(2)} after reconstruction.</span>
        )
      }
    >
      <Row>
        <Panel title="copies of X(jω) every ωₛ">
          <Graph x={[-9, 9]} y={[-0.15, 2.1]} xLabel="ω" items={[...range(-4, 4).filter((k) => k !== 0).map((k) => ({ kind: "fn" as const, f: (w: number) => tri(w - k * ws), tone: "muted" as const, width: 1.2, n: 500 })), { kind: "fn", f: sum, area: true, tone: ok ? "accent" : "second", n: 800 }]} xTicks={[[-ws, "−ωₛ"], [-2, "−ω_M"], [2, "ω_M"], [ws, "ωₛ"]]} />
        </Panel>
        <Panel title={`tone at ω = ${f0} and the samples`}>
          <Graph x={[0, 12]} y={[-1.3, 1.3]} items={[{ kind: "fn", f: (t) => Math.cos(f0 * t), tone: "muted", width: 1.2 }, { kind: "fn", f: (t) => Math.cos(alias * t), tone: ok ? "accent" : "second", dashed: !ok }, { kind: "dots", pts: range(0, Math.floor((12 * ws) / (2 * PI))).map((n) => [(n * 2 * PI) / ws, Math.cos((f0 * n * 2 * PI) / ws)] as P) }]} />
        </Panel>
      </Row>
    </Frame>
  )
}

/* ───────────── 6. pole position ↔ stability (z-plane) ───────────── */

export function PoleExplorer() {
  const [rr, setR] = useState(0.85)
  const [th, setTh] = useState(0.6)
  const stable = rr < 1
  return (
    <Frame
      controls={
        <>
          <Slider label="pole radius r" value={rr} min={0.5} max={1.15} step={0.01} onChange={setR} format={(v) => v.toFixed(2)} />
          <Slider label="pole angle θ" value={th} min={0} max={3.1} step={0.05} onChange={setTh} format={(v) => `${(v / PI).toFixed(2)}π`} />
        </>
      }
      readout={
        <>
          Causal h[n] = rⁿ cos(θn) u[n]: poles at re^(±jθ).{" "}
          {stable ? <span className="text-primary">r &lt; 1: poles inside the unit circle, h[n] decays, the system is stable.</span> : rr === 1 ? <span>r = 1: on the circle, h[n] never decays (marginal).</span> : <span className="text-figure-2">r &gt; 1: poles outside the unit circle, h[n] grows, the system is unstable.</span>} θ sets how fast it oscillates.
        </>
      }
    >
      <Row>
        <Panel title="z-plane">
          <Plane kind="z" range={1.4} poles={[[rr * Math.cos(th), rr * Math.sin(th)], [rr * Math.cos(th), -rr * Math.sin(th)]]} ring={{ inner: rr }} ticks={[[1, "1"]]} />
        </Panel>
        <Panel title="h[n]">
          <Graph x={[-1, 25]} y={[-3.2, 3.2]} xLabel="n" items={[{ kind: "stems", pts: range(0, 24).map((n) => [n, Math.max(-3.1, Math.min(3.1, rr ** n * Math.cos(th * n)))] as P), tone: stable ? "accent" : "second" }]} xTicks={[0, 8, 16, 24]} yTicks={[1, -1]} />
        </Panel>
      </Row>
    </Frame>
  )
}
