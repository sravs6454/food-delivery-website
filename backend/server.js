/*import express from "express";
import cors from "cors";
import { connectDB } from "./config/ds.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";  // Make sure this is correct path
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);  
app.use("/images",express.static('uploads'));
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


// No need for "/register" here, "/api/user" is enough

// default route
app.get("/", (req, res) => {
    res.send("API Working");
});

// start the server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
*/

import express from "express";
import cors from "cors";
import { connectDB } from "./config/ds.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import recommendationRoute from './routes/recommendationRoute.js';



import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use('/api', recommendationRoute);






// Default route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
