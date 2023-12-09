const express = require("express");
const bookRouter = express.Router(); 

const { addBook,getBookList,getBookByName,editBook,deleteBook} = require("../controller/book.controller.js");
const { vertifyToken } = require("../middleware/login.middleware.js");
const { vertifyBook,vertifyChangeBook } = require("../middleware/book.middleware.js");

// 新增书籍
bookRouter.post("/book/add", vertifyToken, vertifyBook, addBook);
// 查询所有书籍
bookRouter.get("/book/bookList", vertifyToken, getBookList);
// 查询单个书籍
bookRouter.post("/book/getBookInfo", vertifyToken,  getBookByName); 
// 编辑书籍
bookRouter.put("/book/edit/:id", vertifyToken, vertifyChangeBook, editBook);
// 删除书籍
bookRouter.delete("/book/delete/:id", vertifyToken, deleteBook);

module.exports = bookRouter;
