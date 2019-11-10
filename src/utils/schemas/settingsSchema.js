module.exports = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  title: "Settings",
  required: ["http", "mongo"],
  properties: {
    mongo: {
      $id: "#/properties/mongo",
      description: "The mongodb config",
      type: "object",
      required: ["host", "options"],
      properties: {
        host: { type: "string" },
        options: {
          type: "object",
          required: ["useNewUrlParser"],
          properties: {
            useNewUrlParser: { type: "boolean" }
          }
        }
      }
    },
    http: {
      $id: "#/properties/http",
      description: "The http config",
      type: "object",
      required: ["port"],
      properties: {
        port: {
          $id: "#/properties/http/properties/port",
          type: "integer"
        }
      }
    }
  }
};
