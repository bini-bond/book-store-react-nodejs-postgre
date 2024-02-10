import { pool } from "../db/pool";
import { BookEntity } from "../entities/bookEntity";

export const bookRepository = {
  getAllBooks: async (page: number = 1, pageSize: number = 10): Promise<BookEntity[]> => {
    const offset = (page - 1) * pageSize;
    const result = await pool.query("SELECT * FROM books ORDER BY id OFFSET $1 LIMIT $2", [offset, pageSize]);
    return result.rows;
  },
  // Add other book-related queries here
};
