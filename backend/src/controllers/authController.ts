import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authService } from "../services/authService";

export const authController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await authService.registerUser(username, password);
      const token = generateToken(user.id);
      res.status(201).json({ data: {user, token }});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await authService.loginUser(username, password);
      if (user) {
        const token = generateToken(user.id);
        res.status(200).json({data: { user, token}});
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

function generateToken(userId: number): string {
  const secretKey = "your_secret_key"; // Replace with a secure secret key
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
}
