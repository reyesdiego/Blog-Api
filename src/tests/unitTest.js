const should = require("should");
const mongooseUp = require("../startups/mongooseUp");

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
});
