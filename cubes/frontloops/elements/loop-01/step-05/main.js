import "./scss/styles.scss"

const services = ["design", "frontend", "backend", "testing"]
const textPrompt = document.querySelector(".text-prompt")
const classes = ["character"]
let current = 0

/**
 * 1. Split the word into an array of characters
 * 2. For each character create a span element with the character as the content
 * 3. Add these spans to the DOM
 *
 */

const spanCharacter = character => {
  const span = document.createElement("span")
  span.classList.add(...classes)
  span.innerText = character
  return span
}

setInterval(() => {
  if (current === services.length) current = 0
  // clear current content in text-prompt
  textPrompt.innerHTML = ""
  const characters = services[current].split("")
  characters.forEach(character => {
    textPrompt.appendChild(spanCharacter(character))
  })
  ++current
}, 1000)
