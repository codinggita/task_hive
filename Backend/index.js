import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";


dotenv.config();
console.log("Your JWT Secret is:", process.env.JWT_SECRET);

const app = express();


dbConnection()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  });


const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: ["http://localhost:5174","http://localhost:5173",
    "http://localhost:5175",
    "http://localhost:5176","http://localhost:5177"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);



app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(morgan("dev")); 

app.use("/api", routes);


app.use(routeNotFound);


app.use(errorHandler);


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
