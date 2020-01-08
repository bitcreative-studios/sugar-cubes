import "./scss/styles.scss"

const operationModes = ["sync", "exclude"]
const ids = ["switch-1", "switch-2", "switch-3", "switch-4", "switch-5"]

const randomInt = max => Math.floor(Math.random() * Math.floor(max))
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // random index from 0 - i

    // swap elements array[i] and array[j] using array destructuring
    // eslint-disable-next-line
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

/**
 * Wrapper around Array.prototype.includes that permits
 * variable number of arguments (e.g., spread an array of search terms)
 *
 * @param {string} args Any number of search terms
 * @return {boolean}
 */
// eslint-disable-next-line no-extend-native, func-names
Array.prototype.searchArray = function(...args) {
  let found = false
  // eslint-disable-next-line
  for (const item of args) {
    found = this.includes(item)
    if (found) break
  }
  return found
}

const attributes = {
  sync: "data-sync",
  exclude: "data-exclude",
}

const switches = Array.from(
  document.querySelectorAll(".switches__switch__checkbox")
)

const updateStatus = switchArray =>
  switchArray.reduce((acc, checkbox) => {
    const sync = checkbox.getAttribute(attributes.sync).length
      ? checkbox
          .getAttribute(attributes.sync)
          .trim()
          .split(" ")
      : []

    const exclude = checkbox.getAttribute(attributes.exclude).length
      ? checkbox
          .getAttribute(attributes.exclude)
          .trim()
          .split(" ")
      : []

    acc[checkbox.id] = {
      sync,
      exclude,
    }
    return acc
  }, {})

let statuses = updateStatus(switches)
/**
 * we need :
 *  - number of elements to effect [0,3]
 *  - a random exclusive-or pairing
 *
 * process:
 *  1. randomly pair n items with clicked switch
 */

const handleToggle = event => {
  /** handle synced switches */
  statuses[event.target.id].sync.forEach(id => {
    const elmnt = document.getElementById(id)
    elmnt.checked = event.target.checked
  })

  /** handle excluded switches */
  statuses[event.target.id].exclude.forEach(id => {
    const elmnt = document.getElementById(id)
    elmnt.checked = !event.target.checked
  })
  const numberOperations = randomInt(4) || 1
  const shuffledIds = [...ids]
  shuffle(shuffledIds)
  event.target.dataset.sync = ""
  event.target.dataset.exclude = ""
  for (let i = 0; i < numberOperations; i++) {
    const operation = operationModes[randomInt(10 ** 10) % 2]
    const id = shuffledIds.shift()
    event.target.dataset[operation] += ` ${id}`
  }
  // always toggle the clicked switches checked state
  // event.target.checked = !event.target.checked
  statuses = updateStatus(switches)
}
switches.forEach(item => item.addEventListener("click", handleToggle))
