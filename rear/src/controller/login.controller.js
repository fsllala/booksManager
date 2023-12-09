const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config.js");
class LoginController {
  async login(req, res, next) {
    const { id, username } = req.user;

    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    res.json({
      code: 0,
      message: "登录成功",
      username,
      token,
    });
  }
}

module.exports = new LoginController();
