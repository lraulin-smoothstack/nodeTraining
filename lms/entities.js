module.exports.makeBook = ({
  bookId = 0,
  title = "",
  authors = [""],
  publisher = "",
  genres = [""],
}) => ({
  bookId,
  title,
  authors,
  publisher,
  genres,
});
