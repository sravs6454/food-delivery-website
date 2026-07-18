/*import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Register and login routes
userRouter.post('/register', registerUser);  // Changed to "/register" since "/api/user" is handled in server.js
userRouter.post('/login', loginUser);

export default userRouter;
*/


import express from "express";
import { loginUser, registerUser, forgotPassword, resetPassword } from "../controllers/userController.js";

const userRouter = express.Router();

// Register and login routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Forgot and reset password routes
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter;
