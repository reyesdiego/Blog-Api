FROM node:10.13-alpine
WORKDIR /blog-api
COPY package.json /blog-api
RUN npm install
COPY . /blog-api
EXPOSE 8080:8080
CMD node index.js