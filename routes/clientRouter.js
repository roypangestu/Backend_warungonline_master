import express from "express";
import {
  loginClient,
  registerClient,
} from "../controllers/clientControllers.js";

const clientRouter = express.Router();

clientRouter.post("/login", loginClient);
clientRouter.post("/register", registerClient);

export default clientRouter;
