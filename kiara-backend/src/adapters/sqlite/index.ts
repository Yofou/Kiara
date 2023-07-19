import Database from "better-sqlite3";
import { UserRepo } from "./user";

const db = new Database("db.sqlite");
const UserRepository = new UserRepo(db);

export { UserRepository };
