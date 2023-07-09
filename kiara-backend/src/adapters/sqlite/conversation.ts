import {
  IConversation,
  IConversationRepository,
} from "../../ports/Conversation.interface";
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";

export class ConversationRepo implements IConversationRepository {
  private db: Database.Database;
  constructor(db: Database.Database) {
    this.db = db;

    this.db.transaction(() => {
      this.db
        .prepare(
          `CREATE TABLE IF NOT EXISTS conversations (
            id TEXT PRIMARY KEY,
            ownerId TEXT,
            createdAt TEXT,
            updatedAt TEXT,
            isArchived BOOLEAN
          )`
        )
        .run();
    })();
  }

  async create(
    conversation: Pick<IConversation, "ownerId">
  ): Promise<IConversation> {
    const conversationToCreate = {
      ...conversation,
      id: uuidv4() as IConversation["id"],
      createdAt: new Date().toISOString() as IConversation["createdAt"],
      updatedAt: new Date().toISOString() as IConversation["updatedAt"],
      isArchived: false as IConversation["isArchived"],
    } satisfies IConversation;
    this.db.transaction(() => {
      this.db
        .prepare(
          `INSERT INTO conversations (id, ownerId, createdAt, updatedAt, isArchived) VALUES (@id, @ownerId, @createdAt, @updatedAt, @isArchived)`
        )
        .run(conversationToCreate);
    })();

    return conversationToCreate;
  }

  async update(
    id: string,
    changes: Pick<IConversation, "isArchived">
  ): Promise<IConversation> {
    const conversation = this.db
      .prepare(`SELECT * FROM conversations WHERE id = @id`)
      .get({ id }) as IConversation;

    if (!conversation) throw new Error("Conversation not found");

    const conversationToUpdate = {
      ...conversation,
      ...changes,
      updatedAt: new Date().toISOString() as IConversation["updatedAt"],
    } satisfies IConversation;

    this.db.transaction(() => {
      this.db
        .prepare(
          `UPDATE conversations SET isArchived = @isArchived, updatedAt = @updatedAt WHERE id = @id`
        )
        .run(conversationToUpdate);
    })();

    return conversationToUpdate;
  }

  async delete(id: string): Promise<void> {
    this.db.transaction(() => {
      this.db.prepare(`DELETE FROM conversations WHERE id = @id`).run({ id });
    })();
  }

  async findById(id: string): Promise<IConversation> {
    const conversation = this.db
      .prepare(`SELECT * FROM conversations WHERE id = @id`)
      .get({ id }) as IConversation;

    if (!conversation) throw new Error("Conversation not found");

    return conversation as IConversation;
  }

  async findAll(): Promise<IConversation[]> {
    const conversations = this.db
      .prepare(`SELECT * FROM conversations`)
      .all() as IConversation[];

    return conversations;
  }
}
