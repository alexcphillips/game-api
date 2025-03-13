import { Router } from "express";
import { greetUser } from "./test";

const router: Router = Router();

router.get("/test", greetUser);

export { router as routes };
