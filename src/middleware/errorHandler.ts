import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
    statusCode?: number;
    status?: string;
    isOperational?: boolean;
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    // Default values
    err.statusCode = err.statusCode ?? 500;
    err.status = err.status ?? "error";

    // Different response for development and production environment
    if (process.env.NODE_ENV === "development") {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    // Production error response
    if (err.isOperational) {
        // Operational, trusted error: send message to client
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // Programming or other unknown error: don't leak error details
    console.error("ERROR 💥", err);
    return res.status(500).json({
        status: "error",
        message: "Something went wrong",
    });
};

export default errorHandler;
