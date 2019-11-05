const should = require("should");
var expect = require("chai").expect;
var chai = require("chai");

const chaiAsPromised = require("chai-as-promised");
const mongooseUp = require("../startups/mongooseUp");
const User = require("../services/user");

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
  after(function(done) {
    mongooseCn.close();
    done();
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
});
