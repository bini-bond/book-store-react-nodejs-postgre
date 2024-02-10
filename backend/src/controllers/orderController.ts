import { Request, Response } from "express";
import { orderService } from "../services/orderService";
import { UserEntity } from "../entities/userEntity"; // Add this import

// Extend the Request interface
interface UserRequest extends Request {
  userId: number; // Add the points field
}

export const orderController = {
  orderBook: async (req: Request, res: Response) => {
    try {
      console.log("reqbod", req.body);
      const { bookId } = req.body;
      console.log("decoded ", req.user);
      if (req.user && req.user.userId) {
        req.body.userId = req.user.userId;
      }
      const result = await orderService.orderBook(req.body.userId, bookId);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cancelOrder: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      console.log("oid", orderId)
      await orderService.cancelOrder(orderId);

      res.status(200).json({ data: {message: "Order canceled successfully" }});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderList: async (req: Request, res: Response) => {
    try {
      const user: UserRequest = req.user; // Update this line
      const result = await orderService.getOrderList(user.userId);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
