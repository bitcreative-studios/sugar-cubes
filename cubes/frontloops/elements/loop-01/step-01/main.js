import "./scss/styles.scss"

/* set up variable objects for cleaner semantic code */
const modifiers = {
  activeClass: "segmented-control__button--active",
}

const attributes = {
  value: "data-value",
}

const componentRoot = document.querySelector(".js-segmented-control")
const controls = document.querySelectorAll(".js-segmented-control__button")
const selectElement = componentRoot.querySelector(
  ".js-segmented-control__select"
)

/**
 * Set the clicked button as active
 * @param button {Element} the selected sort option
 */
const setActive = button => {
  console.log(
    `%c---DEBUG-INFO---\nSetting ${button.innerHTML} as current selection`,
    "color: red; font-weight: 500"
  )
  controls.forEach(el => el.classList.remove(modifiers.activeClass))
  button.classList.add(modifiers.activeClass)
}

/* set up click handlers */
controls.forEach(el => {
  console.log(
    `%c---DEBUG-INFO---\nSetting up click handlers as current selection`,
    "color: #ff0844; font-weight: 500"
  )
  el.addEventListener("click", event => {
    event.preventDefault()
    setActive(el)
    // sync buttons value with associate select element
    selectElement.value = el.getAttribute(attributes.value)
  })
})

// sync the select element's selected value back to the button controls
selectElement.addEventListener("change", event => {
  /**
   *  Use the Array slice method
   *  on the NodeList `controls` (querySelectorAll returns a NodeList),
   *  which accepts a 'start' and optional 'end' for the range of elements we want
   *  Here we pass along the value `0` to start from the first element
   *
   *  We're doing this so we can use the Array.prototype.find method
   */
  const buttons = [].slice.call(controls, 0)
  // find the button with the same `value`
  const targetButton = buttons.find(
    el => event.target.value === el.getAttribute(attributes.value)
  )
  setActive(targetButton)
})
