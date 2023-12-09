const app = require("./app/index.js");
const config = require("./app/config.js");




// 开启监听
app.listen(config.APP_PORT,()=>{
    console.log(`server is running port is ${config.APP_PORT}`);
})