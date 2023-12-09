const dotenv = require("dotenv");
dotenv.config(); //将.env中的变量挂载到process.env中

const fs = require("fs");
const path = require("path");

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

module.exports = {
    APP_PORT
} = process.env;


module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;