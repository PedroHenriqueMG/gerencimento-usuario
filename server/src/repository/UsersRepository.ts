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
}
