const routes = require("express").Router();
const db = require("../dao/db");
const bookDao = require("../dao/bookDao");

routes.get("/book", (req, res) => {
  bookDao.getAllBooks((error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });
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

routes.delete("/book/:id", (req, res) => {
  bookDao.removeBook(req.params.id, (err, result) => {
    if (err) {
      res.status(400);
      res.send("Delete Book Failed!");
    }
    res.send("Delete Book Successful!");
  });
});

module.exports = routes;
