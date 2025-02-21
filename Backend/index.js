import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

// Load environment variables at the top
dotenv.config();
console.log("Your JWT Secret is:", process.env.JWT_SECRET);

// Initialize Express
const app = express();

// Database Connection with Error Handling
dbConnection()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Server Port
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: "*", // Allows all domains
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);


// Middleware
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser()); // Handle cookies
app.use(morgan("dev")); // Logger

// API Routes
app.use("/api", routes);

// Handle Undefined Routes
app.use(routeNotFound);

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
