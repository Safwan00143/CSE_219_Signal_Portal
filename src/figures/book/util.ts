import { range } from "../kit"

export type P = [number, number]
export const r = String.raw

/** Samples f(n) for n = a…b as stem points. */
export const stems = (a: number, b: number, f: (n: number) => number): P[] => range(a, b).map((n) => [n, f(n)] as P)

/** Stem points from a {n: value} table; indices not listed are zero over a…b. */
export const table = (t: Record<number, number>, a: number, b: number): P[] => stems(a, b, (n) => t[n] ?? 0)

/** Looks a value up in a {n: value} table, zero elsewhere. */
export const at = (t: Record<number, number>) => (n: number) => t[n] ?? 0

/**
 * Corner points of y(t) = x(a·t + b) from the corner points of x.
 * Each corner τ moves to t = (τ − b)/a; a reversal (a < 0) also flips the order.
 */
export function xform(pts: P[], a: number, b: number): P[] {
  const out = pts.map(([t, v]) => [(t - b) / a, v] as P)
  return a < 0 ? out.reverse() : out
}

/** Linear interpolation through corner points, for evaluating a drawn signal. */
export function evalPath(pts: P[], t: number) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, v0] = pts[i]
    const [t1, v1] = pts[i + 1]
    if (t >= t0 && t <= t1 && t1 > t0) return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0)
  }
  return 0
}
