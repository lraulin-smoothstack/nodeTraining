var db = require("./db");

exports.getAllBooks = cb => {
  db.query("select * from lms.book", (err, result) => {
    cb(err, result);
  });
};

exports.addBook = (book, cb) => {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "insert into lms.book(title, author) values(?,?)",
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

exports.removeBook = (bookId, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query("delete from lms.book where book_id = ?", [bookId], function(
      err,
      res,
    ) {
      if (err) {
        db.rollback(function(err, res) {
          cb(err, res);
        });
      }
      db.commit(function(err, res) {
        cb(err, res);
      });
    });
  });
};
