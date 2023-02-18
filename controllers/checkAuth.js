// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function checkAuth(req, res, next) {
  const { authorization } = req.headers;
  const secret = process.env.SECRET_JWT;

  //jika belum login
  if (!authorization) {
    return res.status(401).json({
      status: 401,
      message: "Anda belum melakukan Login",
    });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: 401,
        message: "Token tidak validdd",
        token: token,
      });
    }
    next();
  });
}
