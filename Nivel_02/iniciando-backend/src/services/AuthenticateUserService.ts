import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("Credentials invalid!");
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error("Credentials invalid!");
    }

    const token = sign({}, "d1e002f83c01d806ce0b0c757bb587a2", {
      subject: user.id,
      expiresIn: "1d",
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
