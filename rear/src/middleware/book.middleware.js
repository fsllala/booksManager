const { getBookByName, getBookById } = require("../service/book.service");
const vertifyBook = async (req, res, next) => {
  const { bookname } = req.body;
  if (!bookname) {
    next(-2001);
    return;
  }
  const result = await getBookByName(bookname);
  let bookOnly = result[0];
  if (bookOnly) {
    next(-2002);
    return;
  }
  next();
};

const vertifyChangeBook = async (req, res, next) => {
  const { bookname } = req.body;
  if (!bookname) {
    next(-2001);
    return;
  }
  // console.log("req.params", req.params);
  const { id } = req.params;
  if (!id) {
    res.json({
      code: -1,
      message: "书籍id不能为空",
    });
    return;
  }

  const isHasBook = await getBookById(id);
  if (isHasBook.length == 0) {
    res.json({
      code: -1,
      message: "书籍不存在",
    });
    return;
  }

  const result = await getBookByName(bookname);
  let bookOnly = result[0];
  if (bookOnly) {
    if (id != bookOnly.id) {
      next(-2002);
      return;
    }
  }

  next();
};

module.exports = {
  vertifyBook,
  vertifyChangeBook,
};
