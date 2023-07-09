import { IMessageRepository, IMessage } from "../../ports/Message.interface";
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";

export class MessageRepo implements IMessageRepository {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;

    this.db.transaction(() => {
      this.db
        .prepare(
          `CREATE TABLE IF NOT EXISTS messages (
                        id TEXT PRIMARY KEY,
                        createdAt TEXT NOT NULL,
                        updatedAt TEXT NOT NULL,
                        content TEXT NOT NULL,
                        role TEXT NOT NULL,
                        conversationId TEXT NOT NULL
                    )`
        )
        .run();
    })();
  }

  async create(
    message: Pick<IMessage, "content" | "role" | "conversationId">
  ): Promise<IMessage> {
    const messageToCreate = {
      ...message,
      id: uuidv4() as IMessage["id"],
      createdAt: new Date().toISOString() as IMessage["createdAt"],
      updatedAt: new Date().toISOString() as IMessage["updatedAt"],
    } satisfies IMessage;
    this.db.transaction(() => {
      this.db
        .prepare(
          `INSERT INTO messages (id, createdAt, updatedAt, content, role, conversationId) VALUES (@id, @createdAt, @updatedAt, @content, @role, @conversationId)`
        )
        .run(messageToCreate);
    })();

    return messageToCreate;
  }

  async findById(id: string): Promise<IMessage> {
    const message = this.db
      .prepare(`SELECT * FROM messages WHERE id = @id`)
      .get({ id }) as IMessage;

    if (!message) throw new Error("Message not found");

    return message as IMessage;
  }

  async findAll(): Promise<IMessage[]> {
    const messages = this.db
      .prepare(`SELECT * FROM messages`)
      .all() as IMessage[];

    return messages;
  }
  async findByConversationId(
    conversationId: string & { _brand: "ConversationId" }
  ): Promise<IMessage[]> {
    const messages = this.db
      .prepare(`SELECT * FROM messages WHERE conversationId = @conversationId`)
      .all({ conversationId }) as IMessage[];

    return messages;
  }
  async update(
    id: string,
    changes: Pick<IMessage, "content" | "role">
  ): Promise<IMessage> {
    const originalMessage = this.db
      .prepare(`SELECT * FROM messages WHERE id = @id`)
      .get({ id }) as IMessage;
    const messageToUpdate = {
      ...originalMessage,
      ...changes,
      updatedAt: new Date().toISOString() as IMessage["updatedAt"],
    } satisfies IMessage;
    this.db.transaction(() => {
      this.db
        .prepare(
          `UPDATE messages SET content = @content, role = @role, updatedAt = @updatedAt WHERE id = @id`
        )
        .run(messageToUpdate);
    })();

    return messageToUpdate;
  }

  async delete(id: string): Promise<void> {
    this.db.transaction(() => {
      this.db.prepare(`DELETE FROM messages WHERE id = @id`).run({ id });
    })();
  }
}
