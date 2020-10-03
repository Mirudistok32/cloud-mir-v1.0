const { model, Schema, ObjectId } = require("mongoose");

const File = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  date: {type: Date, default: Date.now()},
  user: { type: ObjectId, ref: "User" }, // Ссылается на пользователя, который добавил файл
  parent: { type: ObjectId, ref: "File" }, // Ссылается на файл, в папку в которой он находится
  childs: [{ type: ObjectId, ref: "File" }], // Ссылается на все файлы, которые будут лежать внутри папки
});

module.exports = model("File", File);
