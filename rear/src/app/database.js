const mysql = require("mysql2");

const config = require("./config.js");
// 1.创建连接池
const connectionPool = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
});

// 判断是否连接成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("获取连接失败", err);
    return;
  }
  connection.connect((err) => {
    if (err) {
      console.log("数据库交互失败" + err);
    } else {
      console.log("数据库连接成功！");
    }
  });
});

// connections有promise()方法,可以直接调用;
module.exports = connectionPool.promise();