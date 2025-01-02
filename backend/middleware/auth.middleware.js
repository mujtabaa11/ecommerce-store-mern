import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "unauthorized - access token not found"
            });
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized - user not found"
                });
            }
            req.user = user;

        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized - Invalid access token"
                });
            } 
            throw error;
        }
        next();
    } catch (error) {
        console.log("Error in protected route middleware", error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export const adminRoute = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "unauthorized - user is not admin"
            });
        }
        next();
    } catch (error) {
        console.log("Error in admin route middleware", error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}