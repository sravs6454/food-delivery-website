import mongoose  from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sravyajyothi64:sravya6454@cluster0.llqmw.mongodb.net/food-delivery");
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};


