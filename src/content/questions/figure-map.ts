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
  "219-2223-8a": { solutionFigs: ["q-219-8a"] },
  "311-2223-2a": { solutionFigs: ["lti-decompose"] },
  "311-1415L4-7a": { solutionFigs: ["lti-linear", "lti-ti"] },
  "219-2223-8b": { solutionFigs: ["cs-h1h2"] },

  // Fourier series
  "311-2223-1a": { solutionFigs: ["q-sin-lines"] },
  "311-2021-2b": { solutionFigs: ["q-sin-lines"] },
  "219-2223-5d": { solutionFigs: ["q-219-5d"] },

  // Fourier transform
  "219-2223-5b": { promptFigs: ["q-219-5b-prompt"], solutionFigs: ["q-219-5b-sol"] },
  "219-2223-6": { solutionFigs: ["ft-sgn"] },
  "311-2223-1b": { solutionFigs: ["ft-rect", "smp-copies", "smp-time-limited"] },
  "311-2122-1a": { solutionFigs: ["q-gate"] },
  "311-2122-3a": { solutionFigs: ["ft-scaling"] },
  "311-1920-2a": { solutionFigs: ["fr-phase-distortion"] },
  "311-1718-1a": { solutionFigs: ["q-gate", "ft-envelope"] },
  "311-1718-1b": { solutionFigs: ["ft-triangle"] },
  "311-1617-1abce": { solutionFigs: ["ft-wide-narrow", "q-sinc2", "fr-differentiator"] },
  "311-1415L4-5bcd": { solutionFigs: ["ft-scaling", "q-sin2-spectrum", "ft-delta"] },
  "311-1415L4-6a": { promptFigs: ["q-l4-6a"], solutionFigs: ["ft-triangle"] },
  "311-1415L4-6b": { promptFigs: ["q-periodic-pulse"], solutionFigs: ["ft-periodic-spectrum"] },
  "311-1213-5bc6b": { solutionFigs: ["ft-rect", "ft-freq-shift"] },
  "311-1011-5a": { solutionFigs: ["fr-differentiator"] },
  "311-1112-5abc": { promptFigs: ["q-1112-5"], solutionFigs: ["q-1112-5-sol"] },
  "311-1011-5b": { promptFigs: ["q-1011-5b"], solutionFigs: ["q-1011-5b-sol"] },
  "311-1011-6b": { promptFigs: ["q-1011-5b"], solutionFigs: ["q-1011-6b"] },
  "311-1819-4a": { solutionFigs: ["q-freq-shift"] },

  // frequency response
  "311-2223-2b": { solutionFigs: ["fr-distortionless", "fr-allpass"] },
  "311-2122-2a": { solutionFigs: ["fr-distortionless"] },
  "311-2021-4a": { solutionFigs: ["fr-phase-distortion"] },
  "311-1718-1c": { solutionFigs: ["fr-ideal-filters", "fr-lpf-impulse"] },
  "311-1415L4-7b": { promptFigs: ["q-rect-pulse"], solutionFigs: ["fr-lpf-pulse"] },
  "311-1415-1c": { promptFigs: ["q-lpf-ripple"], solutionFigs: ["fr-echo"] },
  "311-1314-1c": { promptFigs: ["fr-rc-circuit"], solutionFigs: ["fr-rc-response"] },

  // sampling
  "219-2223-1c": { solutionFigs: ["smp-multiply", "smp-copies", "smp-alias", "smp-interp"] },
  "219-2223-4b": { solutionFigs: ["smp-dt-sampling"] },
  "311-1920-3": { solutionFigs: ["q-1920-3"] },
  "311-1819-1a": { solutionFigs: ["q-1819-1a"] },
  "311-1819-3b": { solutionFigs: ["smp-alias", "smp-alias-tone"] },
  "311-2021-3a": { solutionFigs: ["smp-time-limited"] },
  "311-1415L4-8a": { promptFigs: ["q-l4-8a"], solutionFigs: ["smp-copies", "smp-alias"] },
  "311-1617-2b": { solutionFigs: ["smp-copies", "smp-alias", "smp-filters"] },

  // DFT, FFT
  "311-1617-3a": { solutionFigs: ["dft-example", "dft-samples-dtft"] },
  "219-2223-4c": { solutionFigs: ["fft-cost", "fft-dit-8"] },
  "311-1718-3b": { solutionFigs: ["fft-dif-8"] },
  "311-1415L4-7c": { solutionFigs: ["fft-butterfly", "fft-dit-8"] },

  // Laplace
  "219-2223-1b": { solutionFigs: ["lap-finite"] },
  "219-2223-2b": { solutionFigs: ["q-219-2b"] },
  "219-2223-2c": { solutionFigs: ["q-219-2c"] },
  "219-2223-4a": { solutionFigs: ["lap-splane"] },

  // z-transform
  "219-2223-1a": { solutionFigs: ["z-ex101"] },
  "219-2223-3a": { solutionFigs: ["z-finite"] },
  "219-2223-3b": { solutionFigs: ["q-contour"] },
  "219-2223-3c": { solutionFigs: ["q-219-3c"] },
}
