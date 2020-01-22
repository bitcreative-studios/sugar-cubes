import "./scss/styles.scss"

// ========== Variable Declarations ================== //
const toolTip = document.querySelector(".step-tooltip")
let toolTipText = toolTip.innerText
const confirmTooltipText = "Are you happy now?"
const confirmBackButtonText = "No, go back"
const confirmSubmitText = "Yes, go ahead"
const successMessage = "Ok, we're done. Thanks for sending us your data!"
const buttonGroup = document.querySelector(".btn__group")
const submitButton = document.querySelector("[type='submit']")
let backButtonText = "Back"
let submitButtonText = submitButton.innerText
const completed = []
// in theory we could just write the markup and add a class to hide instead of
// needing to create it here
const backButton = document.createElement("button")
backButton.classList.add("btn", "text")
let ACTIVE_STEP
let FORM_COMPLETED = false


// collection of available steps
const steps = Array.from(document.querySelectorAll(".steps__step")).reduce(
  // eslint-disable-next-line no-shadow
  (steps, step) => {
    // eslint-disable-next-line no-param-reassign
    steps[step.dataset.step] = step
    return steps
  },
  {}
)

/**
 * helper object to prevent having to traverse the DOM when looking for
 * a clicked step's previous sibling
 */
const idToName = Object.keys(steps).reduce((map, name) => {
  // eslint-disable-next-line no-param-reassign
  map[steps[name].id] = name
  return map
}, {})




// push the initial step into the completed array
function initControls() {
  buttonGroup.removeChild(backButton)
  buttonGroup.insertAdjacentElement("afterbegin", submitButton)
}
function updateUI(name) {
  // construct  messages
  if (name === "confirm") {
    toolTipText = confirmTooltipText
    backButtonText = confirmBackButtonText
    submitButtonText = confirmSubmitText
  } else if (name === "success") {
    toolTipText = successMessage
    toolTip.innerText = toolTipText
    buttonGroup.removeChild(backButton)
    buttonGroup.removeChild(submitButton)
    return
  } else {
    toolTipText = `Choose ${name} content`
    backButtonText = "Back"
    submitButtonText = `Submit ${name}`
  }
  if (name === "title") {
    initControls()
  } else {
    backButton.innerText = backButtonText
    buttonGroup.insertAdjacentElement("afterbegin", backButton)
  }
  submitButton.innerText = submitButtonText
  toolTip.innerText = toolTipText
}

function handleStepChange(name, goBack = false) {
  if(FORM_COMPLETED) return
  //  determine if UI should be updated
  //  get step number

  let [, currentStep] = steps[name].id.split("-")
  currentStep = Number(currentStep)
  const previousStep = idToName[`step-${currentStep - 1}`]

  // case: moving forward (previous step is 'active')
  if (previousStep && steps[previousStep].classList.contains("active")) {
    steps[previousStep].classList.add("completed")
    completed.push(previousStep)
    steps[previousStep].classList.remove("active")
    steps[name].classList.add("active")
    ACTIVE_STEP = name
    updateUI(name)
  } else if (completed.includes(name)) {
    // case: moving backward
    const numberOfPops = completed.length - 1 - completed.indexOf(name)
    steps[ACTIVE_STEP].classList.remove("active")
    // document.querySelector(".active").classList.remove("active")
    for (let i = 0; i < numberOfPops + 1; i++) {
      // eslint-disable-next-line no-shadow
      const name = completed.pop()
      steps[name].classList.remove("completed")
    }
    steps[name].classList.add("active")
    ACTIVE_STEP = name
    updateUI(name)
  } else if (goBack) {
    if(name === "title") return
    steps[name].classList.remove("active")
    ACTIVE_STEP = completed[completed.length -1]
    handleStepChange(ACTIVE_STEP)
  }
}
function handleSubmit() {
  // get active step
  const activeStep = document.querySelector(".active").dataset.step
  if (activeStep === "confirm") {
    steps[ACTIVE_STEP].classList.add("completed")
    FORM_COMPLETED = true
    updateUI("success")
  } else {
    let [, currentStep] = document.querySelector(".active").id.split("-")
    currentStep = Number(currentStep)
    const nextStep = idToName[`step-${currentStep + 1}`]
    handleStepChange(nextStep)
  }
}
function handleBackClick() {
  const active = document.querySelector(".active")
  const {step} = active.dataset
  handleStepChange(step,true)
}

submitButton.addEventListener("click", handleSubmit)
backButton.addEventListener("click",handleBackClick)
const checkboxes = Array.from(document.querySelectorAll("[type='checkbox']"))
checkboxes.forEach(checkbox =>
  checkbox.addEventListener("change", e => handleStepChange(e.target.name))
)
