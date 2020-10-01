const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const app = express();
const PORT = config.get("serverPort");

// Явно указываем, чтобы экспресс распарсил строку
app.use(express.json());
// Первым параметром указываем url, по которому этот роутер будет обрабатываться,
// а вторым параметром передаем сам роутер
app.use("/api/auth", authRouter);

// Подключается к базе данных и запускает сервер
// Подключение к базе данных - это асинхронный процесс
const start = async () => {
  try {
    // Подключаемся к базе данных
    // Первым параметром принимает url к базе данных
    await mongoose.connect(config.get("dbUrl"));

    //Первым параметром на каком порту будет запущен сервер, а вторым параметром принимает функцию, которая запускается сразу после запуска сервера
    app.listen(PORT, () => {
      console.log("Server start on port, ", PORT);
    });
  } catch (error) {}
};

start();
