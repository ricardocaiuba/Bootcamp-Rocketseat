import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";

const recourse = ["/appointments", "/users"];

const routes = Router();

routes.use(recourse[0], appointmentsRouter);
routes.use(recourse[1], usersRouter);

export default routes;
