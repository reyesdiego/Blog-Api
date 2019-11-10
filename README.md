#Blog

[![Build Status](https://travis-ci.org/reyesdiego/Blog-Api.svg?branch=master)](https://travis-ci.org/reyesdiego/Blog-Api)

Nodejs (express), MongoDB (mongoose)

###Installation

1. Create a folder: `mkdir blog`.
2. Expand the zip file into the new blog folder.
3. In the blog folder run `npm install` to install dependencies.
4. Run application: `npm start`
5. Visit [http://127.0.0.1:8080/api-v1](http://127.0.0.1:8080/api-v1) in your browser

Notes: Open settings.js file to set up mongodb connection string.

###Docker

1. Enter the root folder of the blog application
2. Change `settings.json` - `{mongo:{ host: "mongodb://mongo:27017/blog" ...`
3. Run: `docker-compose up --build`
4. Visit [http://127.0.0.1:8080/api-v1](http://127.0.0.1:8080/api-v1) in your browser

###API Overview
The API is based on Nodejs with Express and MongoDB with mongoose ODM. It has http, controller and service layer (database layer in next version). With these layers the API is capable of replacing any of then with minor changes, for instance to migrate from express to hapi the only file to change will be expressUp.js and their routes.
The service layer allows a better unit testing because it does not depends on the http but only depends on the core of bussiness rules.
