/**
  This file is commited only in this case for the assessment reason. 
  Must be included in .gitignore and NOT pushed. 
 */

module.exports = {
  mongo: {
    host: "mongodb://localhost:27017/containn",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  http: { port: 8080 }
};
