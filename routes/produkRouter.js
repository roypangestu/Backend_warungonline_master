import express from "express";
import {
  getAllData,
  getDataById,
  insertData,
  editData,
  deleteData,
} from "../controllers/produkControllers.js";
// import checkAuth from "../controllers/checkAuth.js";

const produkRouter = express.Router();

produkRouter.get("/", getAllData);
produkRouter.get("/:id", getDataById);
produkRouter.post("/", insertData);
produkRouter.patch("/:id", editData);
produkRouter.delete("/:id", deleteData);

export default produkRouter;
