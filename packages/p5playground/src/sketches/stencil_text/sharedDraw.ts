import P5 from 'p5'
const random = require('canvas-sketch-util/random')

let img
let manager
let text = 'A'
let fontSize = 1200
let fontFamily = 'serif'

const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')

export function sharedDraw(p: P5) {
  if (!typeContext) return

  const cell = 40
  const cols = Math.floor(p.width / cell)
  const rows = Math.floor(p.height / cell)
  const numCells = cols * rows

  typeCanvas.width = cols
  typeCanvas.height = rows

  typeContext.fillStyle = 'black'
  typeContext.fillRect(0, 0, cols, rows)

  fontSize = cols

  typeContext.fillStyle = 'white'
  typeContext.font = `${fontSize}px ${fontFamily}`
  typeContext.textBaseline = 'top'

  const metrics = typeContext.measureText(text)
  const mx = metrics.actualBoundingBoxLeft * -1
  const my = metrics.actualBoundingBoxAscent * -1
  const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
  const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

  const tx = (cols - mw) * 0.5 - mx
  const ty = (rows - mh) * 0.5 - my

  typeContext.save()
  typeContext.translate(tx, ty)

  typeContext.beginPath()
  typeContext.stroke()
  typeContext.rect(mx, my, mw, mh)

  typeContext.fillText(text, 0, 0)
  typeContext.restore()

  const typeData = typeContext.getImageData(0, 0, cols, rows).data

  /** Create an image */
  img = p.createImage(cols, rows)
  img.loadPixels()
  for (let x = 0; x < typeData.length; x += 4) {
    const y = Math.floor(x / 4 / cols)
    const index = (x / 4) % cols
    const r = typeData[x]
    const g = typeData[x + 1]
    const b = typeData[x + 2]
    const a = typeData[x + 3]
    const pixelColor = p.color(r, g, b, a)
    img.set(index, y, pixelColor)
  }
  img.updatePixels()

  p.fill(0)
  p.rect(0, 0, p.width, p.height)

  for (let i = 0; i < numCells; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)

    const x = col * cell
    const y = row * cell

    const r = typeData[i * 4 + 0]
    const g = typeData[i * 4 + 1]
    const b = typeData[i * 4 + 2]
    const a = typeData[i * 4 + 3]

    const glyph = getGlyph(r)
    p.textFont(fontFamily)
    p.textSize(cell * 0.5)

    p.fill(r, g, b)
    p.stroke('white')
    p.push()
    p.translate(x, y)
    p.rect(0, 0, cell, cell)
    // p.ellipse(0, 0, cell, cell)
    p.translate(cell * 0.5, cell * 0.5)
    p.text(glyph, 0, 0)

    p.pop()
  }
  p.image(img, 0, 0)

  // fontSize = 800
  // p.drawingContext.font = `${fontSize}px ${fontFamily}`
  // p.drawingContext.textBaseline = 'top'
  // const pmetrics = p.drawingContext.measureText(text)
  // const bounds = {
  //   x: pmetrics.actualBoundingBoxLeft * -1,
  //   y: pmetrics.actualBoundingBoxAscent * -1,
  //   w: pmetrics.actualBoundingBoxLeft + pmetrics.actualBoundingBoxRight,
  //   h: pmetrics.actualBoundingBoxAscent + pmetrics.actualBoundingBoxDescent,
  // }
  // const x = (p.width - bounds.w) * 0.5 - bounds.x
  // const y = (p.height - bounds.h) * 0.5 - bounds.y
  // p.fill(255, 0, 0)

  // p.push()
  // p.translate(x, y)
  // p.rect(bounds.x, bounds.y, bounds.w, bounds.h)

  // p.stroke(255, 0, 0)
  // p.fill(255, 255, 255)
  // p.text(text, 0, 0)
  // p.pop()
}

function getGlyph(v: number) {
  if (v < 50) return ''
  if (v < 100) return '.'
  if (v < 150) return '-'
  if (v < 200) return '+'

  const glyphs = '_= /'.split('')

  return random.pick(glyphs)
}
