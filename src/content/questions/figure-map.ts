/**
 * Which figures go with which question. Prompt figures reproduce (or redraw) the
 * paper's own figure; solution figures show the answer's graphs and spectra.
 * Ids come from src/figures — lesson figures are reused where they fit exactly.
 */
export const figureMap: Record<string, { promptFigs?: string[]; solutionFigs?: string[] }> = {
  // signals and elementary signals
  "219-2223-5c": { solutionFigs: ["q-219-5c"] },
  "311-1920-2b": { solutionFigs: ["el-smoothed", "el-narrowing", "el-first-diff"] },
  "311-1213-5a": { solutionFigs: ["fs-sift"] },
  "311-1415-1a": { solutionFigs: ["ft-delta"] },

  // LTI, causality
  "311-2223-2a": { solutionFigs: ["lti-decompose"] },
  "311-1415L4-7a": { solutionFigs: ["lti-linear", "lti-ti"] },
  "219-2223-8b": { solutionFigs: ["cs-h1h2"] },

  // Fourier series
  "311-2223-1a": { solutionFigs: ["q-sin-lines"] },
  "219-2223-5d": { solutionFigs: ["q-219-5d"] },

  // Fourier transform
  "219-2223-5b": { promptFigs: ["q-219-5b-prompt"], solutionFigs: ["q-219-5b-sol"] },
  "219-2223-6": { solutionFigs: ["ft-sgn"] },
  "311-1718-1b": { solutionFigs: ["ft-triangle"] },
  "311-1617-1abce": { solutionFigs: ["ft-wide-narrow", "q-sinc2", "fr-differentiator"] },
  "311-1415L4-5bcd": { solutionFigs: ["ft-scaling", "q-sin2-spectrum", "ft-delta"] },
  "311-1415L4-6a": { promptFigs: ["q-l4-6a"] },
  "311-1415L4-6b": { promptFigs: ["q-periodic-pulse"], solutionFigs: ["ft-periodic-spectrum"] },
  "311-1213-5bc6b": { solutionFigs: ["ft-rect", "ft-freq-shift"] },
  "311-1112-5abc": { promptFigs: ["q-1112-5"] },
  "311-1011-5b": { promptFigs: ["q-1011-5b"] },
  "311-1011-6b": { promptFigs: ["q-1011-5b"], solutionFigs: ["q-1011-6b"] },

  // frequency response
  "311-1415L4-7b": { promptFigs: ["q-rect-pulse"] },
  "311-1415-1c": { promptFigs: ["q-lpf-ripple"] },
  "311-1314-1c": { promptFigs: ["fr-rc-circuit"] },

  // sampling
  "311-1920-3": { solutionFigs: ["q-1920-3"] },
  "311-1819-1a": { solutionFigs: ["q-1819-1a"] },
  "311-1415L4-8a": { promptFigs: ["q-l4-8a"] },

  // DFT, FFT
  "311-1415L4-7c": { solutionFigs: ["fft-butterfly", "fft-dit-8"] },

  // Laplace
  "219-2223-1b": { solutionFigs: ["lap-finite"] },
  "219-2223-2b": { solutionFigs: ["q-219-2b"] },
  "219-2223-2c": { solutionFigs: ["q-219-2c"] },

  // z-transform
  "219-2223-1a": { solutionFigs: ["z-ex101"] },
  "219-2223-3c": { solutionFigs: ["q-219-3c"] },
}
