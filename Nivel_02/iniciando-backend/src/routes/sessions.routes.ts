import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticaterUser = new AuthenticateUserService();

    const { user, token } = await authenticaterUser.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

export default sessionsRouter;