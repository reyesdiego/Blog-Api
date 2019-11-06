const should = require("should");
const expect = require("chai").expect;
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const mongooseUp = require("../startups/mongooseUp");
const UserModel = require("../models/user");
const PostModel = require("../models/post");

const User = require("../services/user");
const Post = require("../services/post");

chai.use(chaiAsPromised);

describe("Containn Units Test", function() {
  let mongooseCn;

  before(function(done) {
    this.timeout(30000);

    mongooseUp(connection => {
      mongooseCn = connection;
      done();
    });
  });
  after(async function() {
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    mongooseCn.close();
  });

  it("Dummy Test", function(done) {
    done();
  });

  it("User - Adding a new User should return a User with _id", async () => {
    const user = await User.add({ email: "reyesdiego@hotmail.com" });
    user.should.have.property("_id");
  });

  it("User - Adding a new User Should Faild Duplicate email unique index", async function() {
    this.timeout(10000);
    await expect(
      User.add({ email: "reyesdiego@hotmail.com" })
    ).to.be.rejectedWith(Error);
  });

  it("Post - Adding a new Post should return a Post object with _id", async () => {
    const user = await User.add({ email: "reyesdiego3060@gmail.com" });

    const post = await Post.add({
      title: "Testing post Title",
      body: "Testing post Body",
      userId: user._id
    });
    post.should.have.property("_id");
  });

  it("Post - Updating a Post should return a Post object with properties changed", async () => {
    const user = await User.add({ email: "dreyes@gmail.com" });

    let post = await Post.add({
      title: "Testing post Title",
      body: "Testing post Body",
      userId: user._id
    });

    post = await Post.update({
      _id: post._id,
      title: "New Title",
      body: "New Body"
    });
    post.title.should.be.equal("New Title");
    post.body.should.be.equal("New Body");
  });

  it("Post - Deleting a Post should return the deleted Post object", async () => {
    const user = await User.add({ email: "reyes@gmail.com" });

    const post = await Post.add({
      title: "Testing post Delete",
      body: "Testing post Delete",
      userId: user._id
    });

    const deletedPost = await Post.delete(post._id);
    deletedPost._id.toString().should.be.equal(post._id.toString());
  });
});
