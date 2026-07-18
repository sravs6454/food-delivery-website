import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not authorized Login Again"});
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}


export default authMiddleware;



/*
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authAdmin = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        if (verified.role === "admin") {
            req.admin = verified;
            next();
        } else {
            res.status(403).json({ message: "Unauthorized" });
        }
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

export default authAdmin;
*/