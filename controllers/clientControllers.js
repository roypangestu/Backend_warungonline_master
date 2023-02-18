import clientModels from "../models/clientModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

function responseClient(res, status, message, token) {
  return res.status(status).json({
    status: status,
    message: message,
    token: token,
  });
}

export const loginClient = async (req, res) => {
  try {
    dotenv.config();
    const secret = process.env.SECRET_JWT;
    const refreshToken = process.env.REFRESH_JWT;
    const { email, password } = req.body;
    let responSent = false;
    const client = await clientModels.findOne({
      where: {
        email,
      },
    });

    if (!client) {
      responseClient(res, 400, "email tidak ditemukan", null);
      responSent = true;
    } else if (client.password !== password) {
      responseClient(res, 400, "password salah", null);
      responSent = true;
    }

    const token = jwt.sign(
      {
        id: client.id,
      },
      secret,
      {
        expiresIn: 60 * 5,
      }
    );

    if (!responSent) {
      res.status(200).json({
        status: 200,
        token: token,
        message: "Login berhasil",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 500,
      token: null,
      message: error.message,
    });
  }
};

export const registerClient = async (req, res) => {
  const { namaLengkap, email, password, phoneNumber, alamat } = req.body;
  const hashPsw = bcrypt.hashSync(password, 10);
  console.log(hashPsw);
  try {
    await clientModels.create({
      namaLengkap,
      email,
      password,
      phoneNumber,
      alamat: {
        alamatSatu: alamat,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Register Berhasil",
      identitas: {
        namaLengkap,
        email,
        password,
        alamat: {
          alamatSatu: alamat,
        },
      },
    });
    console.log("Data berhasil");
  } catch (error) {
    console.log(req);
    res.status(500).json({
      status: 500,
      message: "Register gagal",
      identitas: null,
      error: error.message,
      body: [req.body],
    });
  }
};
