const jwt = require("jsonwebtoken");
const config = require("config"); // для получения секретного ключа
// Чтобы каждый раз, когда мы открывали приложение в браузере,
// мы получали данные о пользователе.
// По token получает пользователя и возвращает его обратна

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Auth error, no token" });
    }
    // Раскодируем token
    const decoded = jwt.verify(token, config.get("secretKey"));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth error" });
  }
};
