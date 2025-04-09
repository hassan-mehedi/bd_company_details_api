import { str, num, cleanEnv } from "envalid";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const env = cleanEnv(process.env, {
    // Server configuration
    NODE_ENV: str({ choices: ["development", "test", "production"], default: "development" }),
    PORT: num({ default: 5000 }),

    // MongoDB connection
    MONGODB_URI: str({ desc: "MongoDB connection string" }),

    // API token
    API_TOKEN: str({ desc: "API token" }),
});

export default env;
