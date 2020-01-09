import "./scss/styles.scss"

const services = ["design", "frontend", "backend", "testing"]

const textPrompt = document.querySelector(".text-prompt")

let index = 0
setInterval(function() {
  if (index === services.length) {
    index = 0
  }
  textPrompt.innerText = services[index]
  index++
}, 1000)
