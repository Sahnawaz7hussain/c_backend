const mongoose = require("mongoose");
require("dotenv").config();
let mongo_url = process.env.mongo_url;

mongoose.set("strictQuery", true);
//const connection = mongoose.connect("mongodb://127.0.0.1:27017/chatdbs");
const connection = mongoose.connect(mongo_url);

module.exports = { connection };
