const { getUserByUsername } = require("../service/user.service.js");
const md5Password = require("../utils/password-handle.js");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config.js");
const vertifyLogin = async (req, res, next) => {
  // 1.获取用户名和密码
  const { username, password } = req.body;
  // 2.判断用户名或密码是否为空
  if (!username || !password) {
    next(-1001);
    return;
  }
  // 3.判断用户名是否存在
  const result = await getUserByUsername(username);
  let user = result[0];
  if (!user) {
    next(-1003);
    return;
  }
  // 4.验证密码是否和数据库中的密码一致(加密)
  if (md5Password(password) !== user.password) {
    next(-1004);
    return;
  }
  // 5.将user绑定在res对象上,用于controller获取用户数据
  req.user = user;
  next();
};

// 验证token是否有效
const vertifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log("authorization",authorization);
  // 验证是否携带TOKEN
  if (!authorization) {
    next(-401);
    return;
  }
  // 此时的token多一个"Bearer ",去掉;
  const token = authorization.replace("Bearer ", "");
  // 认证token 通过 jwt.verify(token,key); 使用公钥进行解密,并告诉其加密算法;
  try {
    // 获取到token中信息(id.name...)
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"], //这里algorithms是个复数,所以需要传入数组;
    });
    // 将token信息保留下来,以便后续使用
    req.userInfo = result;
    // 执行下一个中间件;
    next();
  } catch (error) {
    console.log("error",error)
    next(-401);
    return;
  }
};

module.exports = {
  vertifyLogin,
  vertifyToken,
};
