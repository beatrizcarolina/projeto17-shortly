import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/url.schema.js";
import { deleteUrl, findUrl, getUrl, shortenedUrl } from "../controllers/url.controller.js";

const urlRouter = Router();
urlRouter.post("/urls/shorten", validateAuth, validateSchema(urlSchema), shortenedUrl);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", findUrl);
urlRouter.delete("/urls/:id", validateAuth, deleteUrl);

export default urlRouter;