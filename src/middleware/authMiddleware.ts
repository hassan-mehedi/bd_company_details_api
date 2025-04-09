import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../types";
import dotenv from "dotenv";

dotenv.config();

const API_TOKEN = process.env.API_TOKEN || "your_secret_api_token_here";

const authenticateToken = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Authentication token is required",
        });
    }

    if (token !== API_TOKEN) {
        return res.status(403).json({
            status: "error",
            message: "Invalid authentication token",
        });
    }

    req.isAuthenticated = true;
    next();
};

export default authenticateToken;
