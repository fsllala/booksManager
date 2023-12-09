const service = require("../service/user.service.js");
class UserController {
  // 创建用户
  async create(req, res, next) {
    // 获取用户请求传递的参数
    const user = req.body;
    // 查询数据
    const result = await service.create(user);
    // 返回数据
    if (result.length > 0) {
      res.json({
        code: 0,
        message: "创建用户成功",
      });
    }
  }
  // 查询所有用户
  async getUserList(req, res, next) {
    // 查询数据
    const result = await service.getUserList();
    // 返回数据
    if (result.length > 0) {
      res.json({
        code: 0,
        message: "查询用户成功",
        data: result,
      });
    }else{
      res.json({
        code: -1,
        message: "查询用户不存在",
        data: [],
      });
    }
  }
  // 查询单个用户
  async getUser(req, res, next) {
    const { username } = req.body;
    if (!username) {
      // 查询所有用户
      const result = await service.getUserList();
      res.json({
        code: 0,
        message: "查询用户成功",
        data: result,
      });
      return;
    }
    // 查询数据
    const result = await service.getUserByUsername(username);
    // 返回数据
    if (result.length > 0) {
      res.json({
        code: 0,
        message: "查询用户成功",
        data: result,
      });
    } else {
      res.json({
        code: -1,
        message: "查询用户不存在",
        data: [],
      });
    }
  }
  // 编辑用户
  async editUser(req, res, next) {
    // 获取用户请求传递的参数
    const user = req.body;
    const id = req.params.id;

    // 查询输入的id是否存在
    const isHasUserById = await service.getUserById(id);
    if (isHasUserById.length == 0) {
      res.json({
        code: -1,
        message: "用户不存在",
      });
      return;
    }

    // 修改的用户名是否已经存在
    const isHasUserByUsername = await service.getUserByUsername(user.username);
    if (isHasUserByUsername.length > 0) {
      if (isHasUserByUsername[0].id != id) {
        res.json({
          code: -1,
          message: "用户名已存在",
        });
        return;
      }
    }

    // 查询数据
    const result = await service.editUser(user, id);
    // 返回数据
    if (result.length > 0) {
      res.json({
        code: 0,
        message: "修改用户成功",
      });
    } else {
      res.json({
        code: -1,
        message: "修改用户失败",
      });
    }
  }

  // 删除用户
  async deleteUser(req, res, next) {
    // 获取用户请求传递的参数
    const id = req.params.id;

    // 查询输入的id是否存在
    const isHasUserById = await service.getUserById(id);
    if (isHasUserById.length == 0) {
      res.json({
        code: -1,
        message: "用户不存在",
      });
      return;
    }

    const result = await service.deleteUser(id);
    // 返回数据
    console.log(result.length);
    if (result.length > 0) {
      res.json({
        code: 0,
        message: "删除用户成功",
      });
    } else {
      res.json({
        code: -1,
        message: "删除用户失败",
      });
    }
  }
}

module.exports = new UserController();
