// packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

// import routes
import testRoutes from "./routes/testRoute.js";
import authRoutes from "./routes/authRoutes.js";

// Files imports
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddleWare.js";

// Dot ENV config
dotenv.config()

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

// custom middlewares
app.use(errorMiddleware);

// port 
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}..`.bgWhite.red);
});