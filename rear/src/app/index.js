const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); //解析 JSON数据
app.use(express.urlencoded({ extended: true })); //解析 x-www-form-urlencoded 数据

// 允许全部不跨域
app.use(cors({ origin: "*" }));

// 路由
const userRouter = require("../router/user.router");
app.use(userRouter); //注册
const loginRouter = require("../router/login.router");
app.use(loginRouter); //登录
const bookRouter = require("../router/book.router");
app.use(bookRouter); //书籍

// 处理错误的中间件 (err接收next传递的错误信息)
app.use((err, req, res, next) => {
  // console.log("err",err);
  const code = err;
  let message = "未知错误";
  switch (err) {
    case -1001:
      message = "用户名或密码不能为空";
      break;
    case -1002:
      message = "用户名已存在";
      break;
    case -1003:
      message = "用户名不存在";
      break;
    case -1004:
      message = "用户名或密码错误";
      break;
    case -401:
      message = "无效的token";
      break;
    case -2001:
      message = "书籍名不能为空";
      break;
    case -2002:
      message = "书籍名已存在";
      break;
  }
  res.json({ code, message });
});

module.exports = app;
