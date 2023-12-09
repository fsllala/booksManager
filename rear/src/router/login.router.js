const express = require("express");
const loginRouter = express.Router();  //express.Router()是个函数

const {login} =require("../controller/login.controller.js");
const {vertifyLogin,vertifyToken} = require("../middleware/login.middleware.js");

// 登录
loginRouter.post("/login",vertifyLogin,login);

module.exports=loginRouter;
