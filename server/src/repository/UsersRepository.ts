import { IUserRepository } from "../@types/IUsersRepository";
import { User } from "../@types/UserSchema";
import { db } from "../db/db";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const { id, name, email, password } = user;

    const result = await db.query(
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, name, email, password]
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return result.rows[0] || null;
  }

  async findAll(): Promise<User[]> {
    const result = await db.query("SELECT * FROM users");

    return result.rows;
  }

  async findById(id: string): Promise<User | null> {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    return result.rows[0] || null;
  }

  async update(user: User): Promise<User> {
    const result = await db.query(
      `UPDATE users SET 
        name = COALESCE($1, name), 
        email = COALESCE($2, email), 
        password = COALESCE($3, password) 
      WHERE id = $4 
      RETURNING *`,
      [user.name, user.email, user.password, user.id]
    );

    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await db.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
  }
}
