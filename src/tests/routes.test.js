const server = require("../startups/expressUp");
var chai = require("chai");
const should = require("should");
const expect = require("chai").expect;
const assert = require("chai").assert;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const jwt = require("jsonwebtoken");
const { secret } = require("../../settings");

const UserModel = require("../models/user");
const PostModel = require("../models/post");

const User = require("../services/user");
const Post = require("../services/post");

let ser, token;

const HOST = "http://localhost:8080";
ser = server();

describe("Containn Routes Units Test", function() {
  before(async () => {
    await new Promise((resolve, reject) => {
      ser.on("app_started", async () => {
        await UserModel.deleteMany();
        await PostModel.deleteMany();

        User.add({ email: "reyesdiego@hotmail.com" }).then(() => {
          //Getting token for further tests
          chai
            .request(HOST)
            .post("/api-v1/auth/login")
            .send({ email: "reyesdiego@hotmail.com", password: "1234" })
            .end((err, data) => {
              token = data.res.text;
              resolve();
            });
        });
      });
    });
  });

  it("Dummy Test", function(done) {
    done();
  });

  it("User - Adding a new User should return a User with _id", done => {
    chai
      .request(HOST)
      .post("/api-v1/users")
      .send({
        email: "reyesdiego3060@hotmail.com",
        avatar: "http://avatar.com/photo1.jpg"
        // userId: user._id
      })
      .end((err, data) => {
        data.body.should.have.property("_id");
        done();
      });
  });

  it("Post - Adding a new Post should return a Post object with _id", async () => {
    const user = await User.add({ email: "dreyes@gmail.com" });

    chai
      .request(HOST)
      .post("/api-v1/posts")
      .set("authorization", token)
      .send({
        title: "Testing post Title ",
        body: "Testing post Body @Diego",
        userId: user._id
      })
      .end((err, data) => {
        data.body.should.have.property("_id");
        Promise.resolve();
      });
  });
  it("Post - Getting all Posts filtered by tag @Diego @Luis should return 1 object", function(done) {
    chai
      .request(HOST)
      .get("/api-v1/posts?tags=@Diego,@Luis")
      .set("authorization", token)
      .end((err, data) => {
        data.body.length.should.be.equal(1);
        done();
      });
  });

  it("Post - Updating a Post should return a Post object with properties changed", async () => {
    const user = await User.add({ email: "dreyes3060@gmail.com" });

    let post = await Post.add({
      title: "Testing post Title",
      body: "Testing post Body",
      userId: user._id
    });

    chai
      .request(HOST)
      .patch("/api-v1/posts")
      .set("authorization", token)
      .send({
        title: "Testing Update Title",
        body: "Testing Update post Body @Diego",
        _id: post._id
      })
      .end((err, data) => {
        data.body.title.should.be.equal("Testing Update Title");
        data.body.body.should.be.equal("Testing Update post Body @Diego");
        Promise.resolve();
      });
  });

  it("Post - Deleting a Post should return the deleted Post object", async () => {
    const user = await User.add({ email: "reyes@gmail.com" });

    const post = await Post.add({
      title: "Testing post Delete",
      body: "Testing post Delete",
      userId: user._id
    });

    chai
      .request(HOST)
      .delete("/api-v1/posts")
      .set("authorization", token)
      .send({ _id: post._id })
      .end((err, data) => {
        data.body._id.toString().should.be.equal(post._id.toString());
        Promise.resolve();
      });
  });

  it("Auth - Getting a token should return a valid GUID", function(done) {
    this.timeout(10000);
    chai
      .request(HOST)
      .post("/api-v1/auth/login")
      .send({ email: "reyesdiego@hotmail.com", password: "1234" })
      .then(data => {
        token = data.res.text;
        jwt.verify(token, secret, (err, p) => {
          assert.isNull(err);
          p.email.should.be.equal("reyesdiego@hotmail.com");
          done();
        });
      })
      .catch(err => {
        done();
      });

    // chai
    //   .request(HOST)
    //   .post("/api-v1/auth/login")
    //   .send({
    //     email: "reyesdiego@hotmail.com",
    //     password: "1234" //fake, not implemented internally
    //   })
    //   .end((err, data) => {
    //     console.log(data.res.text);
    //     jwt.verify(data.body, secret, (err, p) => {
    //       assert.isNull(err);
    //       p.email.should.be.equal("reyesdiego@hotmail.com");
    //       Promise.resolve();
    //     });
    //   });
  });
});
