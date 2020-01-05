var db = require("./db");

exports.getAllBooks = () =>
  new Promise((resolve, reject) => {
    db.query("select * from books", (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });

exports.addBook = (book, cb) => {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "insert into book(title, author) values(?,?)",
      [book.title, book.author],
      (err, res) => {
        if (err) {
          db.rollback((err, res) => {
            cb(err, res);
          });
        }
        db.commit((err, res) => {
          cb(err, res);
        });
      },
    );
  });
};

exports.removeBook = bookId =>
  new Promise((resolve, reject) => {
    db.beginTransaction(err => {
      if (err) return reject(err);

      db.query("delete from books where id = ?", [bookId], (err, res) => {
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
