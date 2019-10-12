const path = require("path")
require("dotenv").config({
  path: ".env.development",
})

module.exports = function(plop) {
  // entry file
  plop.setGenerator("entry", {
    description: "webpack entry file",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "module name...",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${path.resolve(
          __dirname,
          "..",
          process.env.CURRENT_STEP_ENTRY
        )}`,
        templateFile: "./main.js.hbs",
      },
      {
        type: "add",
        path: `${path.resolve(
          __dirname,
          "..",
          process.env.CURRENT_STEP_INDEX
        )}`,
        templateFile: "./index.html.hbs",
      },
      {
        type: "add",
        path: `${path.resolve(
          __dirname,
          "..",
          process.env.CURRENT_STEP_ROOT,
          "scss/styles.scss"
        )}/`,
        templateFile: "./styles.scss.hbs",
      },
    ],
  })
}
