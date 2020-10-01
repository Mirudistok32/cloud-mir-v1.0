const Router = require("express"); // Роуты из экспресса
const User = require("../models/User.js"); // Модель пользователя, которую мы создали
const bcript = require("bcryptjs"); // Для хеширования
const { check, validationResult } = require("express-validator"); // Для валидации данных
const router = new Router(); // Объект роутера

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
      const hashPassword = await bcript.hash(password, 8);
      // Создаем нового пользователя
      const user = new User({ email, password: hashPassword });

      // Теперь, сохраняем пользователя в базе данных
      await user.save();

      // Если все хорошо, то возвращаем ответ от сервера
      return res.json({ message: `User was created` });
    } catch (error) {
      console.log(error);
      // отправляем пользователю ответ, где указываем, что пользователь был создан
      res.send({ messages: "Server error" });
    }
  }
);

module.exports = router;
