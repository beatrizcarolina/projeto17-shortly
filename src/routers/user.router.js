import { Router } from "express";
import { getUser, getVisits } from "../repositories/user.repository.js";

const userRouter = Router();
userRouter.get("/users/me", getUser);
userRouter.get("/ranking", getVisits);

export default userRouter;

