/*import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminRouter = express.Router();

// **Admin Registration**
adminRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ success: false, message: "Admin already exists!" });

    

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ success: true, message: "Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error!" });
  }
});
adminRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 🔍 Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found in database!");
      return res.status(400).json({ success: false, message: "Invalid email or password!" });
    }

    // 🔍 Compare passwords
    console.log("Stored Hash:", admin.password);
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password Match:", isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password!" });
    }

    // ✅ Generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, token });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

export default adminRouter;
*/



/*
import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminRouter = express.Router();

// **Admin Registration**
adminRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Ensure all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // ✅ Convert email to lowercase (case-insensitive search)
    const normalizedEmail = email.toLowerCase();

    let adminExists = await Admin.findOne({ email: normalizedEmail });
    if (adminExists) {
      return res.status(400).json({ success: false, message: "Admin already exists!" });
    }

    // ✅ Hash Password Before Storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ name, email: normalizedEmail, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ success: true, message: "Admin registered successfully!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

// **Admin Login**
adminRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Ensure all fields are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required!" });
    }

    // ✅ Convert email to lowercase (case-insensitive search)
    const normalizedEmail = email.toLowerCase();

    // 🔍 Check if admin exists
    const admin = await Admin.findOne({ email: normalizedEmail });
    if (!admin) {
      console.log("Admin not found in database!");
      return res.status(400).json({ success: false, message: "Invalid email or password!" });
    }

    // 🔍 Compare hashed passwords
    console.log("Stored Hash:", admin.password);
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password Match:", isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password!" });
    }

    // ✅ Generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, token });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

export default adminRouter;
*/


import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/Admin.js"; // Ensure this path is correct

dotenv.config(); // Load environment variables

const adminRouter = express.Router();

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }); // Token expires in 1 day
};

// Admin Registration Route
adminRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const normalizedEmail = email.toLowerCase();
        const existingAdmin = await Admin.findOne({ email: normalizedEmail });

        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({ name, email: normalizedEmail, password: hashedPassword });
        await newAdmin.save();

        const token = createToken(newAdmin._id);

        res.status(201).json({ success: true, token, message: "Admin registered successfully!" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

// Admin Login Route
adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required!" });
        }

        const normalizedEmail = email.toLowerCase();
        const admin = await Admin.findOne({ email: normalizedEmail });

        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found!" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials!" });
        }

        const token = createToken(admin._id);

        res.status(200).json({ success: true, token, message: "Login successful!" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

// Exporting adminRouter properly
export default adminRouter;
