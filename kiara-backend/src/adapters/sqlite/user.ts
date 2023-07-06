import { IUser, IUserRepository } from "../../ports/User.interface";
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";
export class UserRepo implements IUserRepository {
  private db: Database.Database;
  constructor(db: Database.Database) {
    this.db = db;

    this.db.transaction(() => {
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
    })();
  }

  async create(
    user: Pick<IUser, "name" | "email" | "avatar" | "passwordHash">
  ): Promise<IUser> {
    const userToCreate = {
      ...user,
      id: uuidv4() as IUser["id"],
      isVerified: false as IUser["isVerified"],
      createdAt: new Date().toISOString() as IUser["createdAt"],
      updatedAt: new Date().toISOString() as IUser["updatedAt"],
    } satisfies IUser;
    this.db.transaction(() => {
      this.db
        .prepare(
          `INSERT INTO users (id, name, avatar, email, passwordHash, createdAt, updatedAt) VALUES (@id, @name, @avatar, @email,
            @passwordHash, @createdAt, @updatedAt)`
        )
        .run(userToCreate);
    })();

    return userToCreate;
  }
  async findById(id: string): Promise<IUser> {
    const user = this.db
      .prepare(`SELECT * FROM users WHERE id = @id`)
      .get({ id }) as IUser;

    if (!user) throw new Error("User not found");

    return user as IUser;
  }
  async findByEmail(email: string): Promise<IUser> {
    const user = this.db
      .prepare(`SELECT * FROM users WHERE email = @email`)
      .get({ email }) as IUser;

    if (!user) throw new Error("User not found");

    return user as IUser;
  }
  async findByName(name: string): Promise<IUser> {
    const user = this.db
      .prepare(`SELECT * FROM users WHERE name = @name`)
      .get({ name }) as IUser;

    if (!user) throw new Error("User not found");

    return user as IUser;
  }
  async findAll(): Promise<IUser[]> {
    const users = this.db.prepare(`SELECT * FROM users`).all() as IUser[];

    return users;
  }
  async update(
    id: string,
    changes: Omit<Partial<IUser>, "id" | "createdAt" | "updatedAt">
  ): Promise<IUser> {
    const user = this.db
      .prepare(`SELECT * FROM users WHERE id = @id`)
      .get({ id }) as IUser;

    if (!user) throw new Error("User not found");

    const updatedUser = {
      ...user,
      ...changes,
      updatedAt: new Date().toISOString() as IUser["updatedAt"],
    } satisfies IUser;

    this.db.transaction(() => {
      this.db
        .prepare(
          `UPDATE users SET name = @name, avatar = @avatar, email = @email,
            passwordHash = @passwordHash, updatedAt = @updatedAt WHERE id = @id`
        )
        .run(updatedUser);
    })();

    return updatedUser;
  }
  async delete(id: string): Promise<void> {
    const user = this.db
      .prepare(`SELECT * FROM users WHERE id = @id`)
      .get({ id }) as IUser;

    if (!user) throw new Error("User not found");

    this.db.transaction(() => {
      this.db.prepare(`DELETE FROM users WHERE id = @id`).run({ id });
    })();
  }
}
