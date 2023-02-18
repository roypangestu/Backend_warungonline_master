import Sequelize, { Model } from "sequelize";
//import clientModels from "../models/clientModels";

const db = new Sequelize("warung_online", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

db.authenticate()
  .then(() => console.log("koneksi ke database berhasil"))
  .catch((e) => console.log("gagal"));

export default db;
