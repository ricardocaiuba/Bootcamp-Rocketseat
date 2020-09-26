import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function helloWorld(_: Request, res: Response) {
  const user = createUser({
    name: "Ricardo Rodrigues",
    email: "ricardo.caiuba@gmail.com",
    password: "123456",
    techs: [
      "Nodejs",
      "ReactJS",
      "React Native",
      {
        title: "Javascript",
        experience: 100,
      },
    ],
  });
  return res.json({
    message: "Hello world!!!!!",
  });
}
