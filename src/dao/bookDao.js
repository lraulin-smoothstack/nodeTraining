const db = require("./db");
const { createBook } = require("../entities");

exports.getBook = id =>
  new Promise((resolve, reject) => {
    db.query("select * from book where id = ?", [id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });

exports.getAllBooks = () =>
  new Promise((resolve, reject) => {
    db.query("select * from book", (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });

exports.addBook = (book = createBook()) =>
  new Promise((resolve, reject) =>
    db.beginTransaction(err => {
      if (err) reject(err);

      db.query(
        "insert into book(title, author, publisher, pages) values(?,?,?,?)",
        [book.title, book.author, book.publisher, book.pages],
        (error, result) =>
          error
            ? db.rollback(err => reject(err))
            : db.commit(err => resolve(result)),
      );
    }),
  );

exports.updateBook = (book = createBook()) =>
  new Promise((resolve, reject) =>
    db.beginTransaction(err => {
      if (err) reject(err);

      db.query(
        "update book set title = ?, author = ?, publisher = ?, pages = ? where id = ?",
        [book.title, book.author, book.publisher, book.pages, book.id],
        (error, result) =>
          error
            ? db.rollback(err => reject(err))
            : db.commit(err => {
                if (err) reject(err);
                resolve(result);
              }),
      );
    }),
  );

exports.removeBook = bookId =>
  new Promise((resolve, reject) => {
    db.beginTransaction(err => {
      if (err) return reject(err);

      db.query("delete from book where id = ?", [bookId], (err, res) => {
        if (err) {
          db.rollback((err, res) => {
            reject(err);
          });
        }
        db.commit((err, res) => {
          resolve(res);
        });
      });
    });
  });
