import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// generating tokens function
const generateTokens = (id) => {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    });

    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d" 
    })

    return { accessToken, refreshToken}
}

// storing refresh token in redis function
const storeUserRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token: ${userId}`, refreshToken, "EX" , 60 * 60 * 24 * 7);
}

// set cookies in response function
const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 15
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
}

// signup controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
    
        // if user doesn't exist, create user
        const user = await User.create({
            name,
            email,
            password
        });

        // generate tokens for user
        const {accessToken, refreshToken} = generateTokens(user._id);
       
        // store refresh token in redis
        await storeUserRefreshToken(user._id, refreshToken);

        //set cookies in response
        setCookies(res, accessToken, refreshToken);

        // send success response
        res.status(201).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                _id: user._id
            }, 
            message: "User created successfully"
        });
    } 
    // catch errors
    catch (error) {
        console.log("Error in signup controller",error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

} // end of signup controller.

// login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            const {accessToken, refreshToken} = generateTokens(user._id);
            await storeUserRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);
            res.status(200).json({
                success: true,
                user: {
                    name: user.name,
                    email: user.email,
                    _id: user._id
                }, 
                message: "logged in successfully"
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        console.log("Error in login controller",error);
        res.status(500).json({
            success: false,
            error: error.message
        });
        
    }
} // end of login controller.

// logout controller
export const logout = async (req, res) => {
    try {
        // get refresh token from cookies
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            // first delete refresh token from redis
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token: ${decoded.id}`);
        } else {
            // if refresh token not found
            return res.status(400).json({
                success: false,
                message: "Please login first"
            });
        }
        // secondly clear cookies from response
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({
            success: true,
            message: "logged out successfully"
        });
    } catch (error) {
        console.log("Error in logout controller",error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
} // end of logout controller.

export const refreshAccessToken = async (req, res) => {
    try {
        // get refresh token from cookies
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // verify refresh token and check if it is valid
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedRefreshToken = await redis.get(`refresh_token: ${decoded.id}`);
        if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 15
        });

        res.status(200).json({
            success: true,
            message: "Access token refreshed successfully"
        });

    } catch (error) {
        console.log("Error in refreshAccessToken controller",error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

