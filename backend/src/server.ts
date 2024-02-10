import express from "express";
import cors from "cors";

import { pool } from "./db/pool";
import { authMiddleware } from "./middleware/authMiddleware";
import { authController } from "./controllers/authController";
import { orderController } from "./controllers/orderController";
import { bookController } from "./controllers/bookController";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Example route with authentication middleware
app.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "This route is protected!" });
});

// Authentication routes
app.post("/register", authController.registerUser);
app.post("/login", authController.loginUser);

// Order routes
app.post("/order", authMiddleware, orderController.orderBook);
app.get("/orders", authMiddleware, orderController.getOrderList);
app.delete("/order/:orderId", authMiddleware, orderController.cancelOrder);


// Book routes
app.get("/books", bookController.getAllBooks);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
