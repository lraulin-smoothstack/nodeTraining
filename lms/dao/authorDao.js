const db = require("./db");

exports.getAllAuthors = (callback = (err, res) => {}) => {
  db.query("select * from library.tbl_author", (err, res) => {
    callback(err, res);
  });
};

exports.addAuthor = (authorName = "", callback = (err, res) => {}) => {
  db.beginTransaction(err => {
    if (err) callback(err, null);

    db.query(
      "insert ignore into library.tbl_author(authorName) values(?)",
      authorName,
      (err, res) => {
        if (err) {
          db.rollback((err, res) => {
            callback(err, res);
          });
        }
        db.commit((err, res) => {
          callback(err, res);
        });
      },
    );
  });
};

exports.addAuthor("Bradford");
exports.addAuthor("Bradford");
exports.addAuthor("Bradford");
