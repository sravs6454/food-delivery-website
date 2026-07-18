import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads", // Folder where the images will be stored
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`); // Corrected template string
    }
});

// Multer Middleware for Single File Upload
const upload = multer({ storage: storage });

// POST Route to Add Food
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)


export default foodRouter;
