import { set } from "mongoose";
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
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX" , 60 * 60 * 24 * 7);
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
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

} // end of signup controller.

// login controller
export const login = async (req, res) => {
    res.send("login route called");
} // end of login controller.

// logout controller
export const logout = async (req, res) => {

    res.send("logout route called");
} // end of logout controller.