import { Pool } from "pg";

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "testdb",
  password: "123456",
  port: 5432,
});
