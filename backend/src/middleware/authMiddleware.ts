import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface
interface AuthRequest extends Request {
  user?: any; // Add your custom properties here
}

declare global {
  namespace Express {
    interface Request {
      user?: any; // Update this type as per your UserEntity
    }
  }
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.header("Authorization");
  console.log(tokenHeader)
  if (!tokenHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = tokenHeader.split(" ")[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log("here")
  try {
    const secretKey = "your_secret_key"; // Replace with the same secret key used in authController
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};