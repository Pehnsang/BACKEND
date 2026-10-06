import { Router } from "express";
import { loginUser, logoutUser, regUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(regUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser)

export default router;