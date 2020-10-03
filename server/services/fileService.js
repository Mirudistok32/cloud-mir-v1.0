const { rejects } = require("assert");
const fs = require("fs"); // Предназначен для работы с файловой системой
const { resolve } = require("path");
const file = require("../models/File");
const config = require("config");

class FileService {
  // Создает папки
  createDir(File) {
    const filePath = `${config.get("filePath")}\\${file.user}\\${file.path}`;
    return new Promise((resolve, rejects) => {
      try {
        // Если файл по такому пути существует, то тогда мы будем создавать папку
        if (!fs.existsSync(file)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return rejects({ message: "File already exist" });
        }
      } catch (error) {
        return rejects({ message: "File error" });
      }
    });
  }
}

module.exports = new FileService();
