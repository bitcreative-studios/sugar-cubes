import "./scss/styles.scss"

// ========== variable declarations =========== //
const card = document.querySelector(".card__body")
let STARTED = false

/**
 * - inputRange
 *      = endValue -  startValue
 *
 * - relativeCurrentMousePosition
 *      = currentMousePosition - startValue
 *
 * - fractionValue
 *      = relativeCurrentMousePosition / inputRange
 *
 */
const horizontalBoundary = 0
const verticalBoundary = 0

const input = {
  mouseX: {
    start: window.innerWidth / 2,
    end: window.innerWidth - horizontalBoundary,
    current: 0,
  },
  mouseY: {
    start: window.innerHeight / 2,
    end: window.innerHeight - verticalBoundary,
    current: 0,
  },
}
input.mouseX.range = input.mouseX.end - input.mouseX.start
input.mouseY.range = input.mouseY.end - input.mouseY.start

const output = {
  x: {
    start: 0,
    end: 500,
    current: 0,
  },
  y: {
    start: 0,
    end: 500,
    current: 0,
  },
}
output.x.range = output.x.end - output.x.start
output.y.range = output.y.end - output.y.start

const handleMouseMove = e => {
  if (!STARTED) {
    card.style.boxShadow = `box-shadow: 0 2px 16px 3px #934549`
  }

  const { clientX, clientY } = e

  // for X
  input.mouseX.current = clientX
  input.mouseX.percentage =
    (input.mouseX.current - input.mouseX.start) / input.mouseX.range

  // for Y
  input.mouseY.current = clientY
  input.mouseY.percentage =
    (input.mouseY.current - input.mouseY.start) / input.mouseY.range

  const xDecimal =
    (output.x.start + input.mouseX.percentage * output.x.range) / 100
  output.x.current = (1 + Math.abs(xDecimal)) * Math.sign(xDecimal)

  const yDecimal =
    (output.y.start + input.mouseY.percentage * output.y.range) / 100
  output.y.current = (1 + Math.abs(yDecimal)) * Math.sign(yDecimal)

  card.style.transform = `rotate3d(${-output.y.current}, ${-output.x
    .current},0, 1deg)`
}

const handleResize = () => {
  input.mouseX.start = window.innerWidth / 2
  input.mouseX.end = window.innerWidth - horizontalBoundary
  // because the range makes use of the end value, update it as well
  input.mouseX.range = input.mouseX.end - input.mouseX.start
}

card.addEventListener("click", () => {
  if (!STARTED) {
    card.style.boxShadow = "5px 10px 12px #141429"
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    STARTED = true
  }
})
