import "./scss/styles.scss"

const sections = [...document.querySelectorAll(".content__area.hidden")]
const observer = new IntersectionObserver(
  changes => {
    const [changed] = changes
    console.log(changes)
    if (changed.isIntersecting) changed.target.classList.remove("hidden")
  },
  {
    rootMargin: "10px",
    threshold: 0.3,
  }
)

sections.forEach(section => observer.observe(section))
