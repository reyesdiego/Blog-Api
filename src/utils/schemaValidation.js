const Ajv = require("ajv");

module.exports = (schema, json) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(json);
  return !valid ? validate.errors : true;
};
