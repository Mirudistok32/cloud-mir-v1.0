// Модель пользователя

const { Schema, model, ObjectId } = require("mongoose");

//Создаем схему, в которой будет храниться информация о полях сущности
const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 100 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  // Связываем сущность пользователя с сущностью файлов, каждый объект этого массива ссылается на сущность File
  files: [{ type: ObjectId, ref: "File" }],
});

module.exports = model("User", User);
