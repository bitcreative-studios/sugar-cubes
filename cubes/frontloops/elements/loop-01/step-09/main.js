import "./scss/styles.scss"

const stickyContent = document.querySelector(".sticky-content")
const bitwhys = "author"

window.addEventListener("scroll", () => {
  console.log("WINDOW IS SCROLLING")
  const { position } = getComputedStyle(stickyContent, "position")
  console.log(position)
})
console.log(bitwhys)
