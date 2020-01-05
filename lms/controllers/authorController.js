const routes = require("express").Router();
const db = require("../dao/db");
const authorDao = require("../dao/authorDao");

routes.get("/author", (req, res) => {
  authorDao.getAllAuthors((error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });
});

module.exports = routes;
