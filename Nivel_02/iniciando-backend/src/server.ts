import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import cors from "cors";
import routes from "./routes";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";

import "./database";

const app = express();
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const port = 3333;

app.listen(port, () => {
  console.log(`✔ Server started on port ${port}`);
});
