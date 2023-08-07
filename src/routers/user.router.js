import { Router } from "express";
import { getRanking, getUserData } from "../controllers/user.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const userRouter = Router();
userRouter.get("/users/me", validateAuth, getUserData);
userRouter.get("/ranking", getRanking);

export default userRouter;

