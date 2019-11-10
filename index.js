const expressUp = require("./src/startups/expressUp");
const { log } = require("./src/utils");

const settings = require("./settings");
const schemaValidation = require("./src/utils/schemaValidation");
const settingsSchema = require("./src/utils/schemas/settingsSchema");
const { NODE_ENV } = require("./src/constants");

const validateSettingsSchema = schemaValidation(settingsSchema, settings);
if (validateSettingsSchema.length) {
  log.red("setting.js has failed due the following errors:");
  validateSettingsSchema.map(err => console.error(JSON.stringify(err)));
  log.red("There is an error in Settings.js. The process will not start.");
  if (process.env.NODE_ENV === NODE_ENV.PRODUCTION) {
    process.exit(1);
  }
}

expressUp();
