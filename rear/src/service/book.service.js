const connections = require("../app/database");
class BookService {
  // 新增书籍
  async addBook(bookInfo) {
    const {
      bookname,
      author = "",
      price = 99999,
      type = "",
      inventory = 0,
    } = bookInfo;
    const statement = `INSERT INTO book (bookname,author,price,type,inventory) VALUES(?,?,?,?,?)`;
    const result = await connections.execute(statement, [
      bookname,
      author,
      price,
      type,
      inventory,
    ]);
    return result;
  }
  // 查询是否存在
  async getBookByName(bookname) {
    const statement = `SELECT * FROM book WHERE bookname = ?`;
    const result = await connections.execute(statement, [bookname]);
    return result[0];
  }
  async getBookList() {
    const statement = `SELECT * FROM book`; //查询数据
    const result = await connections.execute(statement);
    return result[0];
  }
  // 差肚腩是否存在通过id
  async getBookById(id) {
    const statement = `SELECT * FROM book WHERE id = ?`;
    const result = await connections.execute(statement, [id]);
    return result[0];
  }

  // 编辑书籍
  async editBook(bookInfo,id) {
    const {
      bookname,
      author = "",
      price = 99999,
      type = "",
      inventory = 0,
    } = bookInfo;
    const statement = `UPDATE book SET bookname=?,author=?,price=?,type=?,inventory=? WHERE id=?`;
    const result = await connections.execute(statement, [
      bookname,
      author,
      price,
      type,
      inventory,
      id,
    ]);
    return result;
  }
  // 删除书籍
  async deleteBook(id) {
    const statement = `DELETE FROM book WHERE id = ?`;
    const result = await connections.execute(statement, [id]);
    return result;
  }
}

module.exports = new BookService();
