import { User, UserRepository } from "../../ports/User.interface";
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";
export class UserRepo implements UserRepository {
  private db: Database.Database;
  constructor(db: Database.Database) {
    this.db = db;

    // Create table if not exists
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        avatar TEXT NOT NULL,
        email TEXT NOT NULL,
        passwordHash TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
        )`
      )
      .run();
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.db
      .prepare(
        `INSERT INTO users (id, name, avatar, email, passwordHash, createdAt, updatedAt)
            VALUES ($id, $name, $avatar, $email, $passwordHash, $createdAt, $updatedAt)`
      )
      .run({
        ...user,
        id: uuidv4(),
        avatar: "https://i.pravatar.cc/300",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    return newUser as unknown as User;
  }
  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = this.db
      .prepare(
        `UPDATE users SET name = $name, avatar = $avatar, email = $email, passwordHash = $passwordHash, updatedAt = $updatedAt WHERE id = $id`
      )
      .run({
        ...user,
        id,
        updatedAt: new Date().toISOString(),
      });
    return updatedUser as unknown as User;
  }
  async delete(id: string): Promise<void> {
    this.db.prepare(`DELETE FROM users WHERE id = $id`).run({ id });
  }
  async findById(id: string): Promise<User | null> {
    const foundUser = this.db
      .prepare(`SELECT * FROM users WHERE id = $id`)
      .get({ id });
    return foundUser as unknown as User;
  }
  async findByEmail(email: string): Promise<User | null> {
    const foundUser = this.db
      .prepare(`SELECT * FROM users WHERE email = $email`)
      .get({ email });
    return foundUser as unknown as User;
  }
  async findByName(name: string): Promise<User | null> {
    const foundUser = this.db
      .prepare(`SELECT * FROM users WHERE name = $name`)
      .get({ name });
    return foundUser as unknown as User;
  }
  async findAll(): Promise<User[]> {
    const foundUsers = this.db.prepare(`SELECT * FROM users`).all();
    return foundUsers as unknown as User[];
  }
}
