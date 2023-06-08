import P5 from 'p5'
const random = require('canvas-sketch-util/random')
const Tweakpane = require('tweakpane')

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  rotate: 0,
  animate: true,
  lineCap: 'SQUARE',
}

export function sharedDraw(p: P5) {
  // Draw a white background
  p.background(255)

  // Set CENTER mode
  p.ellipseMode(p.CENTER)
  p.rectMode(p.CENTER)

  const cols = params.cols
  const rows = params.rows
  const numCells = cols * rows

  const gridw = p.width * 0.8
  const gridh = p.height * 0.8
  const cellw = gridw / cols
  const cellh = gridh / rows
  const margx = (p.width - gridw) * 0.5
  const margy = (p.height - gridh) * 0.5

  for (let i = 0; i < numCells; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)

    const x = col * cellw
    const y = row * cellh
    const w = cellw * 0.8
    const h = cellh * 0.8

    const f = params.animate ? p.frameCount : params.frame
    const n = random.noise3D(x, y, f * 10, params.freq)

    const angle = n * p.PI * params.amp + p.radians(params.rotate)
    const scale = p.map(n, -1, 1, params.scaleMin, params.scaleMax)

    p.stroke(0)
    p.push()
    p.translate(x, y)
    p.translate(margx, margy)
    p.translate(cellw * 0.5, cellh * 0.5)
    p.rotate(angle)

    p.strokeWeight(scale)
    p.strokeCap(p.SQUARE)

    p.beginShape(p.LINES)
    p.vertex(w * -0.5, 0)
    p.vertex(w * 0.5, 0)
    p.endShape()

    p.pop()
  }
}

const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder

  folder = pane.addFolder({ title: 'Grid ' })
  folder.addInput(params, 'cols', { min: 1, max: 50, step: 1 })
  folder.addInput(params, 'rows', { min: 1, max: 50, step: 1 })
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 })
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 })

  folder = pane.addFolder({ title: 'Noise' })
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 })
  folder.addInput(params, 'amp', { min: 0, max: 1 })
  folder.addInput(params, 'animate')
  folder.addInput(params, 'frame', { min: 0, max: 999 })
  folder.addInput(params, 'rotate', { min: 0, max: 360, step: 15 })
}

createPane()
