const fs = require("fs");
const path = require("path");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

function loadAllTasks(dir) {
  const tasks = {};

  const files = fs.readdirSync(dir).filter(file => file.endsWith(".js"));

  for (const file of files) {
    const taskModule = require(path.join(dir, file));
    Object.assign(tasks, taskModule);
  }

  return tasks;
}

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/*.feature",
    supportFile: "cypress/support/e2e.js",
    env: {
      allure: true,
      allureResultsPath: "allure-results",
      TAGS: "not @ignore",
    },

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);

      const actionsPath = path.resolve(__dirname, "cypress/support/actions");
      const tasks = loadAllTasks(actionsPath);
      on("task", tasks);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
