import express from "express";
import { getCartItems, addToCart, removeFromCart, updateCartItemQuantity } from "../controllers/cart.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, getCartItems);
router.post("/", protectedRoute, addToCart);
router.delete("/", protectedRoute, removeFromCart);
router.put("/:id", protectedRoute, updateCartItemQuantity);


export default router;