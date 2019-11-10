/**
  This file is commited only in this case for the assessment reason. 
  Must be included in .gitignore and NOT pushed. 
 */

if (process.env.NODE_ENV === "production") {
  //PRODUCTION --------------------------------
  module.exports = {
    mongo: {
      host: "mongodb://mongo:27017/blog",
      options: {
        useNewUrlParser: true
      }
    },
    http: { port: 8080 },
    secret: "MySecretWord"
  };
} else {
  //DEVELOPEMENT -------------------------------
  module.exports = {
    mongo: {
      host: "mongodb://localhost:27017/blog",
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    },
    http: { port: 8080 },
    secret: "MySecretWord"
  };
}
