/*import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create a token for the user
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); // added expiration to the token for better security
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength (minimum 8 characters)
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user document
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save the user to the database
        const user = await newUser.save();

        // Create a token for the user
        const token = createToken(user._id);

        // Send the token back in the response
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred while registering the user" });
    }
}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });
        
        // If user does not exist
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create a token for the user
        const token = createToken(user._id);

        // Send the token back in the response
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred during login" });
    }
}

export { registerUser, loginUser };
*/




import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Create a token for the user
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); // Added expiration
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength (minimum 8 characters)
        if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters with uppercase, numbers, and symbols" });
        }
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user document
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const user = await newUser.save();

        // Create a token for the user
        const token = createToken(user._id);

        res.status(201).json({ success: true, token, message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error occurred while registering the user" });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Create a token for the user
        const token = createToken(user._id);

        res.status(200).json({ success: true, token, message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error occurred during login" });
    }
    
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Reset link sent to your email" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error sending email" });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid token or user not found" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
};

export { registerUser, loginUser, forgotPassword, resetPassword };
