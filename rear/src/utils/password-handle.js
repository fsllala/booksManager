// nodejs中自带了 ctypto库，使用这个进行加密

const crypto = require("crypto");

const md5Password = (password) => {
  // crypto.createHash('加密方式')
  const md5 = crypto.createHash("md5"); //返回是是一个对象
  // md5.update(加密的数据).digest()==>获取二进制加密的Buffer
  // 进postman测试,md5.update(加密的数据)这个数据必须是string,不能为number;
  
  const result = md5.update(JSON.stringify(password)).digest("hex"); //获取16进制加密的字符串
  return result;
};

module.exports = md5Password;