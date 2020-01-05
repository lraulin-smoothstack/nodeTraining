const routes = require("express").Router();
const db = require("../dao/db");
const bookDao = require("../dao/bookDao");

routes.get("/book", (request, response) => {
  bookDao
    .getAllBooks()
    .then(data => {
      response.setHeader("Content-Type", "application/json");
      response.send(data);
    })
    .catch(err => console.log(err));
});

routes.post("/book", (req, res) => {
  const book = req.body;
  bookDao.addBook(book, (err, result) => {
    if (err) {
      res.status(400);
      res.send("Add Book Failed!");
    }
    res.status(201);
    res.send("Add Book Successful!");
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
