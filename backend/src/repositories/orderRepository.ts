import { pool } from "../db/pool";
import { OrderEntity } from "../entities/orderEntity";
import { UserEntity } from "../entities/userEntity";

export const orderRepository = {
  createOrder: async (userId: number, bookId: number): Promise<OrderEntity> => {
    const result = await pool.query(
      "INSERT INTO orders (user_id, book_id) VALUES ($1, $2) RETURNING *",
      [userId, bookId]
    );
    return result.rows[0];
  },

  getOrderList: async (userId: number): Promise<OrderEntity[]> => {
    const result = await pool.query("SELECT orders.id as order_id, * FROM orders left join books on orders.book_id = books.id WHERE user_id = $1", [userId]);
    return result.rows;
  },

  cancelOrder: async (orderId: number) => {
    const result = await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [orderId]);

    if (result.rows.length === 0) {
      throw new Error("Order not found");
    }
  },

  getUserById: async (userId: number): Promise<UserEntity> => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    return result.rows[0];
  },

  getBookPoints: async (bookId: number): Promise<number> => {
    console.log("bookId", bookId)
    const result = await pool.query("SELECT point FROM books WHERE id = $1", [bookId]);
    console.log("result", result)
    return result.rows[0].point || 0;
  },

  deductPoints: async (userId: number, pointsToDeduct: number): Promise<UserEntity> => {
    const result = await pool.query(
      "UPDATE users SET points = points - $1 WHERE id = $2 RETURNING *",
      [pointsToDeduct, userId]
    );
    return result.rows[0];
  },
};
