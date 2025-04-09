import app from "./app";
import connectDB from "./config/db";
import env from "./config/env";

// Get port from validated environment
const PORT = env.PORT;

// Connect to MongoDB
connectDB()
    .then(() => {
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to start server:", error);
        process.exit(1);
    });
