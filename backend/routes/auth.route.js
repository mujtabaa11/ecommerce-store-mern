import express from "express";
import {signup, login, logout, refreshAccessToken, getProfile} from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-access-token", refreshAccessToken);
router.get("/profile", protectedRoute, getProfile);


export default router;