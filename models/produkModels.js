import db from "../config/database.js";
import { DataTypes } from "sequelize";

const produkModels = db.define(
  "products",
  {
    kodeProduk: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    namaProduk: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    hargaProduk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deskripsiProduk: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    diskonProduk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 100,
      },
    },
    subtotalProduk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gambarProduk: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    jumlahPembeliProduk: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    kategoriProduk: {
      type: DataTypes.STRING,
    },
    stokProduk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    pembuatProduk: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    sync: { force: true },
  }
);
produkModels.sync();

export default produkModels;
