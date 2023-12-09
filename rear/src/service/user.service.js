const connections = require("../app/database.js");
class UserService {
    // 创建用户
    async create(user) {
        const {username,name,password,sex,age} = user;
        const statement = `INSERT INTO users(username,name,password,sex,age) VALUES(?,?,?,?,?)`;
        const result = await connections.execute(statement,[username,name,password,sex,age]);
        return result;
    }
    // 查询单个用户
    async getUserByUsername(username){
        const statement = `SELECT * FROM users WHERE username=?`;
        const result = await connections.execute(statement,[username]);
        return result[0];  //返回result的话,又有很多其他信息,只有0才是想要的
    }
    // 查询所有用户
    async getUserList(){
        const statement = `SELECT * FROM users`;
        const result = await connections.execute(statement);
        return result[0];
    }
    // 查询单个用户
    async getUserById(id){
        const statement = `SELECT * FROM users WHERE id=?`;
        const result = await connections.execute(statement,[id]);
        return result[0];
    }
    // 编辑用户信息
    async editUser(user,id){
        const {username,name,password,sex,age} = user;
        const statement = `UPDATE users SET username=?, name=?,password=?,sex=?,age=? WHERE id=?`;
        const result = await connections.execute(statement,[username,name,password,sex,age,id]);
        return result;
    }
    // 删除用户
    async deleteUser(id){
        const statement = `DELETE FROM users WHERE id=?`;
        const result = await connections.execute(statement,[id]);
        return result;
    }
}

module.exports = new UserService();