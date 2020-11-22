import Express from "express";
import User from "./controllers/user";

const router = Express.Router();

router.use("/api/register", User);
// router.post("/api/login", user.login);
// router.get("/api/logout", user.logout);

export default router;
