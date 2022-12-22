const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
//const connection = mongoose.connect("mongodb://127.0.0.1:27017/chatdbs");
const connection = mongoose.connect(
  "mongodb+srv://s:a@cluster0.p6axcnb.mongodb.net/chatdbs?retryWrites=true&w=majority"
);

module.exports = { connection };
