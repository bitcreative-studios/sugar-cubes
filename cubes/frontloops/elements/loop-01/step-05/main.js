import "./scss/styles.scss"

const textPrompt = document.querySelector(".text-prompt")
const services = ["design", "frontend", "backend", "testing"]

// The delay between displaying characters (ms)
const typingDelay = 200
const erasingDelay = 100

// (typing is slower then deleting)
const nextWordDelay = 2000

let currentService = 0
let currentCharacter = 0

/**
 * 1. Types a character every `typingDelay` milliseconds
 * 2. If last character in current `service`
 *  wait `nextWordDelay` milliseconds before calling a delete function
 */
const type = () => {
  // check that the character index is less than the length of currently displayed word
  if (currentCharacter < services[currentService].length) {
    textPrompt.textContent += services[currentService].charAt(currentCharacter)
    currentCharacter++
    setTimeout(type, typingDelay)
  } else {
    //  erase currently displayed word
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, nextWordDelay + 250)
})
