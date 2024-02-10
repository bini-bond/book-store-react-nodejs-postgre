import { pool } from "../db/pool";
import { UserEntity } from "../entities/userEntity";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt hashing

export const authRepository = {
  createUser: async (username: string, password: string): Promise<UserEntity> => {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query(
      "INSERT INTO users (username, password, points) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, 100]
    );

    return result.rows[0];
  },

  authenticateUser: async (username: string, password: string): Promise<UserEntity> => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user: UserEntity = result.rows[0];

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  },
};
