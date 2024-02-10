import { orderRepository } from "../repositories/orderRepository";
import { UserEntity } from "../entities/userEntity";
import { OrderEntity } from "../entities/orderEntity";

export const orderService = {
  orderBook: async (userId: number, bookId: number): Promise<OrderEntity> => {
    console.log("userId", userId)
    const user: UserEntity = await orderRepository.getUserById(userId);
    console.log(user)
    const bookPoints: number = await orderRepository.getBookPoints(bookId);
    console.log(bookPoints)
    if (user.points < bookPoints) {
      throw new Error("Insufficient points to order this book");
    }

    // Deduct points and create order
    const updatedUser = await orderRepository.deductPoints(userId, bookPoints);
    const order = await orderRepository.createOrder(updatedUser.id, bookId);
    return order;
  },

  cancelOrder: async (orderId: number) => {
    // Optional: Add business logic before calling repository method
    await orderRepository.cancelOrder(orderId);

    // Optional: Add additional logic after order cancellation
  },

  getOrderList: async (userId: number): Promise<OrderEntity[]> => {
    return orderRepository.getOrderList(userId);
  },
};
