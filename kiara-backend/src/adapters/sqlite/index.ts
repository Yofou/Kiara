import Database from "better-sqlite3";
import { UserRepo } from "./user";
import { MessageRepo } from "./message";
import { ConversationRepo } from "./conversation";

const db = new Database("db.sqlite");
const UserRepository = new UserRepo(db);
const MessageRepository = new MessageRepo(db);
const ConversationRepository = new ConversationRepo(db);

export { UserRepository, MessageRepository, ConversationRepository };
