import "./scss/styles.scss"

// Store binding to DOM element that will display the text
const textPrompt = document.querySelector(".text-prompt")
const cursor = document.querySelector(".cursor")
// list of words we want the element to display
const services = ["design", "frontend", "backend", "testing"]

// The delay between displaying characters (ms)
const typingDelay = 200
const erasingDelay = 100

// (typing is slower then deleting)
const nextWordDelay = 2000

let currentService = 0
let currentCharacter = 0

function erase() {
  // check that we haven't deleted the entire word
  if (currentCharacter > 0) {
    !cursor.classList.contains("typing") && cursor.classList.add("typing")
    textPrompt.textContent = services[currentService].substring(
      0,
      currentCharacter - 1
    )
    currentCharacter--
    setTimeout(erase, erasingDelay)
  } else {
    cursor.classList.remove("typing")
    currentService++
    if (currentService >= services.length) currentService = 0
    // eslint-disable-next-line no-use-before-define
    setTimeout(type, typingDelay + 1100)
  }
}
/**
 * 1. Types a character every `typingDelay` milliseconds
 * 2. If last character in current `service`
 *  wait `nextWordDelay` milliseconds before calling a delete function
 */
function type() {
  // check that the character index is less than the length of currently displayed word
  if (currentCharacter < services[currentService].length) {
    !cursor.classList.contains("typing") && cursor.classList.add("typing")
    textPrompt.textContent += services[currentService].charAt(currentCharacter)
    currentCharacter++
    setTimeout(type, typingDelay)
  } else {
    //  erase currently displayed word
    cursor.classList.remove("typing")
    setTimeout(erase, nextWordDelay)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, nextWordDelay + 250)
})
