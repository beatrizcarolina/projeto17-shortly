import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";

const authRouter = Router();
authRouter.post("/signup", validateSchema(signupSchema), signup);
authRouter.post("/signin", validateSchema(signinSchema), signin);

export default authRouter;