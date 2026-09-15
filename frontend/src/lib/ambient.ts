// WebAudio ambient drone for Explore Mode + UI chimes — synthesized, no audio assets.
let audio: AudioContext | null = null
let master: GainNode | null = null
let enabled = typeof localStorage !== 'undefined' && localStorage.getItem('sg-sound') !== 'off'

function ensureCtx(): AudioContext | null {
  if (!audio) {
    try {
      audio = new AudioContext()
    } catch {
      return null
    }
  }
  if (audio.state === 'suspended') void audio.resume()
  return audio
}

export function ambientEnabled() {
  return enabled
}

export function startAmbient() {
  if (!enabled) return
  const ctx = ensureCtx()
  if (!ctx) return
  if (!master) {
    master = ctx.createGain()
    master.gain.value = 0
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 420
    filter.connect(master)
    master.connect(ctx.destination)
    const voice = (freq: number, detune: number, gain: number) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = freq
      o.detune.value = detune
      g.gain.value = gain
      o.connect(g)
      g.connect(filter)
      o.start()
    }
    voice(110, 0, 0.5)
    voice(165, 4, 0.28)
    voice(220.5, -6, 0.14)
    const lfo = ctx.createOscillator()
    const lg = ctx.createGain()
    lfo.frequency.value = 0.07
    lg.gain.value = 0.014
    lfo.connect(lg)
    lg.connect(master.gain)
    lfo.start()
  }
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.5)
}

export function stopAmbient() {
  if (!audio || !master) return
  master.gain.cancelScheduledValues(audio.currentTime)
  master.gain.linearRampToValueAtTime(0, audio.currentTime + 0.8)
}

export function toggleAmbient() {
  enabled = !enabled
  localStorage.setItem('sg-sound', enabled ? 'on' : 'off')
  if (enabled) startAmbient()
  else if (audio && master) {
    master.gain.cancelScheduledValues(audio.currentTime)
    master.gain.linearRampToValueAtTime(0, audio.currentTime + 0.3)
  }
  return enabled
}

export function blip() {
  if (!enabled || !audio) return
  const o = audio.createOscillator()
  const g = audio.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(660, audio.currentTime)
  o.frequency.exponentialRampToValueAtTime(990, audio.currentTime + 0.12)
  g.gain.setValueAtTime(0.05, audio.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.28)
  o.connect(g)
  g.connect(audio.destination)
  o.start()
  o.stop(audio.currentTime + 0.3)
}

// soft two-note chime for UI moments (menu open)
export function chime() {
  if (!enabled) return
  const ctx = ensureCtx()
  if (!ctx) return
  ;[523.25, 783.99].forEach((freq, i) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = freq
    const t0 = ctx.currentTime + i * 0.09
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.exponentialRampToValueAtTime(0.07, t0 + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.55)
    o.connect(g)
    g.connect(ctx.destination)
    o.start(t0)
    o.stop(t0 + 0.6)
  })
}

// short wooden tick for the abacus beads
export function click() {
  if (!enabled) return
  const ctx = ensureCtx()
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'triangle'
  o.frequency.setValueAtTime(1500, ctx.currentTime)
  o.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.05)
  g.gain.setValueAtTime(0.06, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09)
  o.connect(g)
  g.connect(ctx.destination)
  o.start()
  o.stop(ctx.currentTime + 0.1)
}

// softer double clack for a whole stack of beads landing together
export function clack() {
  if (!enabled) return
  const ctx = ensureCtx()
  if (!ctx) return
  ;[0, 0.05].forEach((dt, i) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'triangle'
    const t0 = ctx.currentTime + dt
    o.frequency.setValueAtTime(i === 0 ? 1250 : 980, t0)
    o.frequency.exponentialRampToValueAtTime(520, t0 + 0.05)
    g.gain.setValueAtTime(0.035, t0)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.08)
    o.connect(g)
    g.connect(ctx.destination)
    o.start(t0)
    o.stop(t0 + 0.09)
  })
}
