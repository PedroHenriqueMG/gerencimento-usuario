import { IUserRepository } from "../@types/IUsersRepository";
import { User } from "../@types/UserSchema";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === u.id);

    const updatedUser = { ...this.users[index], ...user };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);

    this.users.splice(index, 1);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
