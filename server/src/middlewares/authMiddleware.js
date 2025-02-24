const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <TOKEN>"에서 토큰만 추출

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // 요청 객체에 사용자 정보 추가
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
