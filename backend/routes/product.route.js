import express from "express";
import { 
    getAllProducts, 
    getFeaturedProducts, 
    getProductsByCategory, 
    getRecommendedProducts, 
    createProduct, 
    toggleFeatureProduct, 
    deleteProduct } from "../controllers/product.controller.js";
import { adminRoute, protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommended", getRecommendedProducts);

router.post("/", protectedRoute, adminRoute, createProduct);
router.patch("/:id", protectedRoute, adminRoute, toggleFeatureProduct);
router.delete("/:id", protectedRoute, adminRoute, deleteProduct);

export default router;