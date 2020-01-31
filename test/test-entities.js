const { createBook } = require("../src/entities");
const should = require("chai").should();

describe("createBook", function() {
  it("should return an empty book object", function() {
    const newBook = createBook();
    newBook.should.include({ id: 0 });
    newBook.should.include({ title: "" });
    newBook.should.include({ author: "" });
    newBook.should.include({ publisher: "" });
    newBook.should.include({ pages: 0 });
  });
});
