module.exports.createBook = ({
  id = 0,
  title = "",
  author = "",
  publisher = "",
  pages = 0,
} = {}) => ({
  id,
  title,
  author,
  publisher,
  pages,
});
