const should = require("should");
const mongooseUp = require("../startups/mongooseUp");
const User = require("../services/user");

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
  
});
