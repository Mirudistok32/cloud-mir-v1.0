const fileService = require("../services/fileService");
const User = require("../models/User");
const File = require("../models/File");

class FileController {
  async createDir(req, res) {
    try {
      // Из тела запроса
      const { name, type, parent } = req.body;
      // Создаем новый файл и передадим в него все эти данные
      // id пользователя мы получаем из поля user, которое мы добавляем, когда распарсиваем token
      const file = new File({ name, type, parent, user: req.user.id });
      // по id полученному из запроса, найдем родительский файл
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        // Если родительский файл не был надет, то это означает, что файл будет добавлен в корневую директорию.
        // Поэтому в поле path добавляем только имя файла
        // И сразу же создаем директорию
        file.path = name;
        await fileService.createDir(file);
      } else {
        // Если родительский файл был найден, то сначала мы добавляем родительский путь и к нему приплюсовываем имя файла
        //
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(file);
        // Создаем директорию и в массив родительского файла childs пушим id только что нового созданного файла,
        // так как он будет являться по отношению к родительскому файлу дочерним
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  // Получение файлов
  async getFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      });
      return res.json({
        files,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Can not get file" });
    }
  }
}

module.exports = new FileController();
