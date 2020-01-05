const routes = require("express").Router();
const db = require("../dao/db");
const bookDao = require("../dao/bookDao");
const { makeBook } = require("../entities");

routes.get("/book", (request, response) => {
  bookDao
    .getAllBooks()
    .then(data => {
      response.setHeader("Content-Type", "application/json");
      response.send(data);
    })
    .catch(err => console.log(err));
});

routes.get("/book/:id", (request, response) => {
  bookDao
    .getBook(request.params.id)
    .then(data => {
      response.setHeader("Content-Type", "application/json");
      response.send(data);
    })
    .catch(err => console.log(err));
});

routes.post("/book/:author/:title/:publisher/:pages", (request, response) => {
  const book = makeBook({
    author: request.params.author,
    title: request.params.title,
    publisher: request.params.publisher,
    pages: request.params.pages,
  });
  bookDao
    .addBook(book)
    .then(result => {
      response.status(201);
      response.send("Add Book Successful!");
    })
    .catch(err => {
      response.status(400);
      response.send("Add Book Failed!");
    });
});

routes.put(
  "/book/:id/:author/:title/:publisher/:pages",
  (request, response) => {
    const book = makeBook({
      id: request.params.id,
      author: request.params.author,
      title: request.params.title,
      publisher: request.params.publisher,
      pages: request.params.pages,
    });
    bookDao
      .updateBook(book)
      .then(result => {
        response.status(201);
        response.send("Update Book Successful!");
      })
      .catch(err => {
        response.status(400);
        response.send("Update Book Failed!");
      });
  },
);

routes.delete("/book/:id", (request, response) => {
  bookDao
    .removeBook(request.params.id)
    .then(result => response.send("Delete Book Successful!"))
    .catch(err => {
      response.status(400);
      response.send("Delete Book Failed!");
    });
});

module.exports = routes;
