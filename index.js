import express from "express";
import cors from "cors";
import produkRouter from "./routes/produkRouter.js";
import clientRouter from "./routes/clientRouter.js";
import FileUpload from "express-fileupload";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(FileUpload());

app.use("/produk", produkRouter);
app.use("/client", clientRouter);

app.listen(port, () => {
  console.log(`Server running in localhost:${port}`);
});
