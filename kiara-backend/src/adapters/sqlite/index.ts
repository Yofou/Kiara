import Database from "better-sqlite3";
import { UserRepo } from "./user";
import { ChatRoomRepo } from "./chat";

const db = new Database("db.sqlite");
const UserRepository = new UserRepo(db);
const ChatRoomRepository = new ChatRoomRepo(db);

export { UserRepository, ChatRoomRepository };
