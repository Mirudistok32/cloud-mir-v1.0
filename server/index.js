const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get("serverPort");
// Подключается к базе данных и запускает сервер
const start = () => {
  try {
    //Первым параметром на каком порту будет запущен сервер, а вторым параметром принимает функцию, которая запускается сразу после запуска сервера
    app.listen(PORT, () => {
      console.log("Server start on port, ", PORT);
    });
  } catch (error) {}
};

start();
