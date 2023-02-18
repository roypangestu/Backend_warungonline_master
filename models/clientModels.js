import { DataTypes } from "sequelize";
import db from "../config/database.js";

const clientModels = db.define(
  "client",
  {
    namaLengkap: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    alamat: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 15],
      },
    },
  },
  {
    freezeTableName: true,
    sync: { force: true },
  }
);
clientModels.sync();

export default clientModels;
