const express = require("express");
const userRouter = express.Router(); //express.Router()是个函数

const { create, getUserList,getUser,editUser,deleteUser } = require("../controller/user.controller.js");
const {verifyUser,handlePassword} = require("../middleware/user.middleware.js");
const {vertifyToken} = require("../middleware/login.middleware.js");

// 注册用户
userRouter.post("/register",vertifyToken, handlePassword,create);
// 查询所有用户
userRouter.get("/userList",vertifyToken,getUserList);
// 查询单个用户
userRouter.post("/user/getUserInfo",vertifyToken,getUser);
// 编辑用户
userRouter.put("/user/:id",vertifyToken, editUser);
// 删除用户
userRouter.delete("/user/:id",vertifyToken, deleteUser);

module.exports = userRouter;


