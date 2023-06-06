import P5 from 'p5'

export function sharedDraw(p: P5) {
  // Draw a white background
  p.background('white')

  // Set CENTER mode
  p.ellipseMode(p.CENTER)
  p.rectMode(p.CENTER)

  const cx = p.width * 0.5
  const cy = p.height * 0.5

  const w = p.width * 0.01
  const h = p.height * 0.1
  let x, y

  const num = 40
  const radius = p.width * 0.3

  for (let i = 0; i < num; i++) {
    const slice = p.radians(360 / num)
    const angle = slice * i

    x = cx + radius * p.sin(angle)
    y = cy + radius * p.cos(angle)

    p.push()
    p.translate(x, y)
    p.rotate(-angle)
    p.scale(p.random(0.1, 1.2), p.random(0.2, 0.5))

    p.fill(0)
    p.rect(0, 0, w, h)
    p.pop()

    p.push()
    p.translate(cx, cy)
    p.rotate(-angle)

    p.stroke(0)
    p.strokeWeight(p.random(2, 10))

    p.strokeCap(p.SQUARE)
    p.noFill()
    const arcRadius = radius * p.random(0.8, 3)
    const arcStart = slice * p.random(1, -8)
    const arcEnd = slice * p.random(1, 5)
    p.arc(0, 0, arcRadius, arcRadius, arcStart, arcEnd, p.OPEN)
    p.pop()
  }
}
