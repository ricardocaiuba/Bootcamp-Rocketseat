import "reflect-metadata";

import express from "express";
import cors from "cors";
import routes from "./routes";
import uploadConfig from "./config/upload";

import "./database";

const app = express();
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(cors());
app.use(routes);

const port = 3333;

app.listen(port, () => {
  console.log(`✔ Server started on port ${port}`);
});
