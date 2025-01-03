import express from "express";
import { getCartItems, addToCart, removeFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, getCartItems);
router.post("/", protectedRoute, addToCart);
router.delete("/", protectedRoute, removeFromCart);
router.put("/:id", protectedRoute, updateQuantity);


export default router;