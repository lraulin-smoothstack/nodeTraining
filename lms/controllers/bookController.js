const routes = require("express").Router();
const db = require("../dao/db");
const bookDao = require("../dao/bookDao");
const { createBook } = require("../entities");

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

routes.post("/book", (request, response) => {
  const book = createBook({
    author: request.query.author,
    title: request.query.title,
    publisher: request.query.publisher,
    pages: request.query.pages,
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

routes.put("/book", (request, response) => {
  const book = createBook({
    id: request.query.id,
    author: request.query.author,
    title: request.query.title,
    publisher: request.query.publisher,
    pages: request.query.pages,
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
});

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
