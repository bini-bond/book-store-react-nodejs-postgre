import { Pool } from "pg";

export const pool = new Pool({
  user: "qejzxziz",
  connectionString: "postgres://qejzxziz:fGw_9pHQ0dgK0oT9lKOlgQ44z8MBxpU0@bubble.db.elephantsql.com/qejzxziz",
  ssl: {
    rejectUnauthorized: false, // Only use this line for development. In production, configure SSL properly.
  },
  password: "fGw_9pHQ0dgK0oT9lKOlgQ44z8MBxpU0",
  port: 5432,
});
