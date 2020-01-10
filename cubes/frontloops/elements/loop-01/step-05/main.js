import "./scss/styles.scss"

const services = ["design", "frontend", "backend", "testing"]
const textPrompt = document.querySelector(".text-prompt")

const TypeWriter = function TypeWriter(textElement, words, delay = "3000") {
  console.log(this)
  this.textElement = textElement
  this.words = words
  this.txt = ""
  this.currentWord = 0
  this.delay = parseInt(delay, 10)
  this.type()
  this.isDeleting = false
}

function init() {
  const textPrompt = document.querySelector(".text-prompt")
  let { words, delay } = textPrompt.dataset
  words = JSON.parse(words)
  // FIXME: using new to create a context for `this` should rewrite as functions
  new TypeWriter(textPrompt, words, delay)
}

// Type Method
TypeWriter.prototype.type = function type() {
  // Current word
  const currentWord = this.currentWord % this.words.length
  // Get full word text
  const fullText = this.words[currentWord]
  // check if deleting
  if (this.isDeleting) {
    //  Remove character
    this.txt = fullText.substring(0, this.txt.length - 1)
  } else {
    this.txt = fullText.substring(0, this.txt.length + 1)
  }
  // Push this.txt into the DOM
  this.textElement.innerHTML = `<span class="txt cursor">${this.txt}</span>`

  // Initial type speed (when deleting we want the speed to increase)
  let typeSpeed = 300
  if (this.isDeleting) typeSpeed /= 2

  // Check if finished with word
  if (!this.isDeleting && this.txt === fullText) {
    // Make a pause at end
    typeSpeed = this.delay
    // set delete to true
    this.isDeleting = true
  } else if (this.isDeleting && !this.txt) {
    this.isDeleting = false
    this.currentWord++
    typeSpeed = 500
  }
  setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", init)
