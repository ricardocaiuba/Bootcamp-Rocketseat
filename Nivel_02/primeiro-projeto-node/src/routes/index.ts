import { Router } from "express";
import appointmentsRouter from "./appointments.routes";

const recourse = "/appointments";

const routes = Router();

routes.use(recourse, appointmentsRouter);

export default routes;
