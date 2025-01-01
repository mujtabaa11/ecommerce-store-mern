import express from "express";
import {signup, login, logout, refreshAccessToken} from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-access-token", refreshAccessToken);
//router.get("/profile",getProfile);


export default router;