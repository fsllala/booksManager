const { getUserByUsername } = require("../service/user.service");
const md5Password = require("../utils/password-handle.js");
const verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  // 判断用户名密码不能为空
  if (!username || !password) {
    next(-1001);
  }
  // 验证用户是否已经存在
  const result = await getUserByUsername(username);
  if (result.length > 0) {
    next(-1002);
  }
  next();
};

  // 密码加密
  const handlePassword = async (req, res, next) => {
    let { password } = req.body; 
    req.body.password = md5Password(password); //req.body上的密码进行加密
    next();
  };

module.exports = {
  verifyUser,
  handlePassword
};
