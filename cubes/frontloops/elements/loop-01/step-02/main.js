import "./scss/styles.scss"

/**
 * Initially organized data as a `JSON` object
 * but using an array allows for a think a cleaner access model
 */
const data = ["Positive content", "Negative content", "Neutral content"]
const modifiers = {
  activeClass: "btn--ghost--active",
}
const attributes = {
  value: "data-value",
  index: "data-index",
}
const VALID_INDEX_RANGE = [1, 2, 3]
const form = document.querySelector(".widget__form")
const controls = [].slice.call(form.querySelectorAll(".btn"), 0)
const tabs = controls.filter(button => button.dataset.role === "tab")
const input = document.querySelector("[name='index']")
const content = document.querySelector(".widget__content")

function setActive(index) {
  console.log(
    "%c --- DEBUG INFO: [setActive] ---",
    "font-weight: bold; color: purple"
  )
  tabs.forEach(tab => tab.classList.remove(modifiers.activeClass))
  tabs
    .find(tab => tab.getAttribute(attributes.value) === index)
    .classList.add(modifiers.activeClass)
}

/**
 * This is not strictly necessary to achieve the design spec.
 *
 * I would still like to route the `tabs` click event through form submission,
 * however calling form.submit DOES NOT trigger the 'submit' event.
 * Thus we need to create a custom event and dispatch that along with
 * our other logic within those clickHandlers
 */
function triggerSubmit() {
  const event = new Event("submit", {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  const cancelled = !form.dispatchEvent(event)
  if (cancelled) {
    // alert("cancelled")
  } else {
    // alert("not cancelled")
  }
}

const handleFormSubmit = event => {
  event.preventDefault()
  console.log(
    "%c --- DEBUG INFO: [handleFormSubmit] ---",
    "font-weight: bold; color: purple"
  )
  // console.log(event.target)

  /**
   * There are (3) ways for the `submit` event to fire
   *  - triggered by `tab` button, ignore input value (if any)
   *  - triggered by `change tab` button, read+validate input
   *  - triggered by pressing enter in input field
   */

  const currentIndex = form.getAttribute(attributes.index) || input.value
  if (!VALID_INDEX_RANGE.includes(Number(currentIndex))) {
    alert("Index is invalid")
    input.value = ""
    return
  }
  setActive(currentIndex)
  content.innerText = data[currentIndex - 1]
  form.dataset.index = ""
  input.value = ""
}

tabs.forEach(tab =>
  tab.addEventListener("click", event => {
    event.preventDefault()
    console.log(
      `%c --- DEBUG INFO: [${event.target.innerText} clickHandler] ---`,
      "font-weight: bold; color: purple"
    )

    // set the data-index attribute of the form
    form.dataset.index = event.target.getAttribute(attributes.value)
    triggerSubmit()
  })
)

form.addEventListener("submit", handleFormSubmit)
