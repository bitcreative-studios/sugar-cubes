import "./scss/styles.scss"

const searchContent = `<h2 class="menu__message">Whoa! You found me!</h2>
<button id="menu-hide" class="btn">Hide back</button>`
const runContent = `<h2 class="menu__message">Please don't run!</h2>
<button id="menu-close" class="btn">Close</button>`
const searchButton = document.querySelector('[data-context="search"]')
const runButton = document.querySelector('[data-context="run"]')
const menu = document.querySelector(".off-canvas-menu")
const menuContent = menu.querySelector(".content")

const toggleDisable = () => {
  searchButton.disabled = !searchButton.disabled
  runButton.disabled = !runButton.disabled
}

const handleHideMenu = event => {
  menu.classList.remove("show")
  toggleDisable()
}

const handleShowMenu = event => {
  const {
    target: {
      dataset: { context },
    },
  } = event
  switch (context) {
    case "search":
      menuContent.innerHTML = searchContent
      menuContent
        .querySelector("#menu-hide")
        .addEventListener("click", handleHideMenu)
      break
    case "run":
      menuContent.innerHTML = runContent
      menuContent
        .querySelector("#menu-close")
        .addEventListener("click", handleHideMenu)
      break
    default:
      throw new Error("Don't know what's the issue!!")
  }
  menu.classList.add("show")
  toggleDisable()
}

searchButton.addEventListener("click", handleShowMenu)
runButton.addEventListener("click", handleShowMenu)
