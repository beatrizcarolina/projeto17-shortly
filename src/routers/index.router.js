import { Router } from "express";
import authRouter from "../routers/auth.router.js"
import urlRouter from "./url.router.js";
import userRouter from "./user.router.js";

const router = Router();
router.use(authRouter);
router.use(urlRouter);
router.use(userRouter);

export default router;