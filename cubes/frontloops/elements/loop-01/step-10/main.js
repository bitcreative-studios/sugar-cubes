import "./scss/styles.scss"

const draggable = document.querySelector(".draggable")

draggable.onmousedown = function(event) {
  // (1) start the process

  // (2) prepare to moving: make absolute and on top by z-index
  draggable.style.position = "absolute"
  draggable.style.zIndex = 1000
  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(draggable)
  // ...and put that absolutely positioned ball under the pointer

  moveAt(event.pageX, event.pageY)

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    draggable.style.left = `${pageX - draggable.offsetWidth / 2}px`
    draggable.style.top = `${pageY - draggable.offsetHeight / 2}px`
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY)
  }

  // (3) move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove)

  // (4) drop the ball, remove unneeded handlers
  draggable.onmouseup = function() {
    document.removeEventListener("mousemove", onMouseMove)
    draggable.onmouseup = null
  }
}
