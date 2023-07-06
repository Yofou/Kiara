import Database from "better-sqlite3";
import { UserRepo } from "./user";

const UserRepository = new UserRepo(new Database("db.sqlite"));

export { UserRepository };
