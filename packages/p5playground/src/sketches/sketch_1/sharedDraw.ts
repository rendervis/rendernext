import P5 from 'p5'

export function sharedDraw(p: P5) {
  // Draw a white background
  p.background('gray')

  // Set CENTER mode
  p.ellipseMode(p.CENTER)
  p.rectMode(p.CENTER)

  // Body
  p.stroke(0)
  p.fill(150)
  p.rect(240, 145, 20, 100)

  // Head
  p.fill(225)
  p.ellipse(240, 115, 60, 60)

  // Eyes
  p.fill(10, 120, 0)
  p.ellipse(221, 115, 16, 32)
  p.ellipse(259, 115, 16, 32)

  // Legs
  p.stroke(0)
  p.line(230, 195, 220, 205)
  p.line(250, 195, 260, 205)
}
