import "./scss/styles.scss"

const stickyContent = document.querySelector(".sticky-content")
const STARTING_VERTICAL_OFFSET = "14rem"

window.addEventListener("scroll", () => {
  const { position } = getComputedStyle(stickyContent, "position")
  const { y } = stickyContent.getBoundingClientRect()
  // exit if we are already sticky
  if (position === "fixed" && window.scrollY >= 120) return
  if (position === "fixed" && window.scrollY <= 120) {
    stickyContent.style.marginTop = STARTING_VERTICAL_OFFSET
    stickyContent.style.position = "absolute"
  } else if (y <= 20) {
    stickyContent.style.marginTop = "2rem"
    stickyContent.style.position = "fixed"
  }
})
