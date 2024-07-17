import { Router } from "express";
import { UsersController } from "./controller/UsersController";
import { validate } from "./middleware/zod-validation";
import { usersBody } from "./@types/UserSchema";
import swaggerUi from "swagger-ui-express";
import { document } from "./swagger/swagger";

export const router = Router();

//swagger
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(document));

router.post("/tasks", validate(usersBody), new UsersController().post);
router.get("/tasks", new UsersController().get);
router.put("/tasks/:id", validate(usersBody), new UsersController().put);
router.delete("/tasks/:id", new UsersController().delete);
