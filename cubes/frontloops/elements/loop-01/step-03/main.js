import "./scss/styles.scss"

const operationModes = ["sync", "exclude"]
const ids = ["switch-1", "switch-2", "switch-3", "switch-4", "switch-5"]

Array.prototype.searchArray = (...args) => {
  let found
  for (let item in args) {
    found = this.includes(item)
  }
  return found
}

const attributes = {
  sync: "data-sync",
  exclude: "data-exclude",
}

const switches = [].slice.call(
  document.querySelectorAll(".switches__switch__checkbox"),
  0
)
let status

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
status = updateStatus(switches)
/**
 * we need :
 *  - number of elements to effect [0,3]
 *  - a random exclusive-or pairing
 *
 * process:
 *  1. randomly pair n items with clicked switch
 */

const handleToggle = toggle => {}

switches.forEach(item =>
  item.addEventListener("click", event => {
    // handle synced switches
    status[event.target.id].sync.forEach(id => {
      let elmnt = document.getElementById(id)
      elmnt.checked = event.target.checked
    })

    // handle excluded switches
    status[event.target.id].exclude.forEach(id => {
      let elmnt = document.getElementById(id)
      elmnt.checked = !event.target.checked
    })
    const operation = operationModes[randomInt(10 ** 10) % 2]
    const mode = ["append", "clear"][randomInt(10 ** 10 % 2)]
    let numberOperations = randomInt(4)
    if (mode === "clear") event.dataset[operation] = ""
    for (let i = 0; i < numberOperations; i++) {
      event.dataset[operation] += ""
    }
    console.log(...ids.searchArray(event.dataset[operation].split(" ")))
    // status = updateStatus(switches)
  })
)

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
