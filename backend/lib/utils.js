import jwt from "jsonwebtoken"
import { isProduction, jwtSecret } from "./config.js";


export const generateToken = (userId, res) =>{
    if (!jwtSecret) throw new Error("Missing JWT secret (JWT_SECRET/JWT_SECERET)");

    const token =jwt.sign({userId},jwtSecret,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // Frontend (Vercel) + backend (Render) are cross-site => requires SameSite=None + Secure in production
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    });
    return token;


}
