import P5 from 'p5'

const colors: any[] = [
  [255, 200, 0, 6],
  [237, 70, 47, 1],
]
let index = 0
let angle = 0
let smallPoint = 30
let largePoint = 90

export function sharedDraw(p: P5) {
  let pointillize = p.random(smallPoint, largePoint)
  p.fill(colors[index])
  if (p.mouseX || p.mouseY) {
    p.ellipse(p.mouseX, p.mouseY, pointillize, pointillize)

    if (p.random(1) < 0.01) {
      index = (index + 1) % colors.length
    }
  }
  angle += 0.02
}
