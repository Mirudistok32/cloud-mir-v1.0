const Router = require("express"); // Роуты из экспресса
const User = require("../models/User"); // Модель пользователя, которую мы создали
const bcrypt = require("bcryptjs"); // Для хеширования
const config = require("config");
const jwt = require("jsonwebtoken"); // Для создания токена
const { check, validationResult } = require("express-validator"); // Для валидации данных
const router = new Router(); // Объект роутера
const authMiddleware = require("../middleware/auth.middleware");

const filesService = require("../services/fileService");
const File = require("../models/File");
// Под-запрос
// Вторым параметром, передаем массив, здесь будет происходить валидация
router.post(
  "/registration",
  [
    // Первым параметром, названия поля, которое валидируем, вторым параметром сообщение об ошибки, а после вызова параметры валидации
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      //Получаем результат валидации
      const errors = await validationResult(req);
      //Проверяем, если результат валидации содержит какие-либо ошибки
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request ", errors });
      }

      // Получаем данные из тела запроса
      const { email, password } = req.body;

      // Проверяем, существует ли пользователь с таким email в базе
      // Проверяем в базе данных
      const candidate = await User.findOne({ email });
      // Если пользователь не пустой, то мы вернем ответ, что пользователь с таким email уже существует
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      //Если в условие выше не попали, то создаем нового пользователя

      //В целях безопастности, хешируем пароль
      const hashPassword = await bcrypt.hash(password, 8);
      // Создаем нового пользователя
      const user = new User({ email, password: hashPassword });

      // Теперь, сохраняем пользователя в базе данных
      await user.save();
      // Создаем для пользователя отдельную папку
      await filesService.createDir(new File({ user: user.id, name: "" }));
      // Если все хорошо, то возвращаем ответ от сервера
      return res.json({ message: `User was created` });
    } catch (error) {
      console.log(error);
      // отправляем пользователю ответ, где указываем, что пользователь был создан
      res.send({ messages: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Uset not found" });
    }
    // Если пользователь найден, сравниваем пароль полученный в запросе, с паролем, который хранится в базе данных
    // Функция compareSync сравниваем незашифрованный пароль, с зашифрованным
    const isPassValid = bcrypt.compareSync(password, user.password);
    // Если пароли совпадают, то функция вернет true, а иначе отправляем ошибку
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // Создаем token
    // Первым параметром передаем объект с данными, которые мы хотим поместить в токен
    // Вторым параметром передаем секретный ключ, по-которому будет происходить шифрование
    // Третим параметром, передаем объект, в котором указываем, сколько времени токен будет существовать
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    // После создания токена, нам необходимо вернуть его обратно на клиент
    // также возвращаем дополнительные данные.
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.log(error);
    // отправляем пользователю ответ, где указываем, что пользователь был создан
    res.send({ messages: "Server error" });
  }
});

// Вторым параметром передаем Middleware
router.get("/auth", authMiddleware, async (req, res) => {
  try {
    // Ищем польователя по id, который мы достали из token
    const user = await User.findOne({ _id: req.user.id });
    // Перезапишем token
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.log(error);
    // отправляем пользователю ответ, где указываем, что пользователь был создан
    res.send({ messages: "Server error" });
  }
});

module.exports = router;
