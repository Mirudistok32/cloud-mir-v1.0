const Router = require("express"); // Роуты из экспресса
const User = require("../models/User.js"); // Модель пользователя, которую мы создали
const bcript = require("bcryptjs"); // Для хеширования
const router = new Router(); // Объект роутера

// Под-запрос
router.post("/registration", async (req, res) => {
  try {
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
});
