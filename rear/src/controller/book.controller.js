const service = require("../service/book.service");
class BookController {
  async addBook(req, res, next) {
    const result = await service.addBook(req.body);
    if (result) {
      res.json({
        code: 0,
        message: "添加书籍成功",
      });
    } else {
      res.json({
        code: -1,
        message: "添加书籍失败",
      });
    }
  }
  // 获取所有书籍列表
  async getBookList(req, res, next) {
    const result = await service.getBookList();
    if (result) {
      res.json({
        code: 0,
        message: "获取书籍列表成功",
        data: result,
      });
    }
  }

  // 查询单个书籍
  async getBookByName(req, res, next) {
    if (!req.body.bookname) {
      // 查询所有书籍
      const result = await service.getBookList();
      res.json({
        code: 0,
        message: "查询书籍成功",
        data: result,
      });
      return;
    }
    const result = await service.getBookByName(req.body.bookname);
    if (result[0]) {
      res.json({
        code: 0,
        message: "查询书籍成功",
        data: result,
      });
    } else {
      res.json({
        code: -1,
        message: "查询书籍不存在",
        data: [],
      });
    }
  }
  // 编辑书籍
  async editBook(req, res, next) {
    const id = req.params.id;
    const result = await service.editBook(req.body, id);

    if (result[0].affectedRows > 0) {
      res.json({
        code: 0,
        message: "编辑书籍成功",
      });
    } else {
      res.json({
        code: -1,
        message: "编辑书籍失败",
      });
    }
  }
  // 删除书籍
  async deleteBook(req, res, next) {
    const id = req.params.id;
    const isHasBook = await service.getBookById(id);
    if (isHasBook.length == 0) {
      res.json({
        code: -1,
        message: "书籍不存在",
      });
      return;
    }
    const result = await service.deleteBook(id);
    if (result[0].affectedRows > 0) {
      res.json({
        code: 0,
        message: "删除书籍成功",
      });
    } else {
      res.json({
        code: -1,
        message: "删除书籍失败",
      });
    }
  }
}

module.exports = new BookController();
