import {
  IChatRoom,
  IChatRoomRepository,
  ChatMessage,
} from "../../ports/ChatRoom.interface";
import Database from "better-sqlite3";
import { v4 as uuid } from "uuid";

export class ChatRoomRepo implements IChatRoomRepository {
  private db: Database.Database;
  constructor(db: Database.Database) {
    this.db = db;

    this.db.transaction(() => {
      this.db
        .prepare(
          `
                CREATE TABLE IF NOT EXISTS chat_rooms (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    messages TEXT NOT NULL,
                    createdAt TEXT NOT NULL,
                    updatedAt TEXT NOT NULL,
                    userId TEXT NOT NULL
                )
            `
        )
        .run();
    })();

    this.db.transaction(() => {
      this.db
        .prepare(
          `
                CREATE TABLE IF NOT EXISTS chat_messages (
                    id TEXT PRIMARY KEY,
                    content TEXT NOT NULL,
                    createdAt TEXT NOT NULL,
                    updatedAt TEXT NOT NULL,
                    role TEXT NOT NULL,
                    chatRoomId TEXT NOT NULL
                )
            `
        )
        .run();
    })();
  }
  async create(
    chatRoom: Omit<IChatRoom, "createdAt" | "updatedAt" | "id">
  ): Promise<IChatRoom> {
    const id = uuid();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const messages = JSON.stringify([]);
    const { name, userId } = chatRoom;

    this.db.transaction(() => {
      this.db
        .prepare(
          `
                        INSERT INTO chat_rooms (id, name, messages, createdAt, updatedAt, userId)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `
        )
        .run(id, name, messages, createdAt, updatedAt, userId);
    })();
    return {
      id: id as IChatRoom["id"],
      name: name as IChatRoom["name"],
      messages: [] as unknown as IChatRoom["messages"],
      createdAt: createdAt as IChatRoom["createdAt"],
      updatedAt: updatedAt as IChatRoom["updatedAt"],
      userId: userId as IChatRoom["userId"],
    };
  }

  async findById(id: string & { _brand: "ChatRoomId" }): Promise<IChatRoom> {
    const chatRoom = this.db
      .prepare(
        `
                    SELECT * FROM chat_rooms WHERE id = ?
                `
      )
      .get(id) as IChatRoom | undefined;
    if (!chatRoom) {
      throw new Error("Chat room not found");
    }
    return {
      id: chatRoom.id as IChatRoom["id"],
      name: chatRoom.name as IChatRoom["name"],
      messages: JSON.parse(chatRoom.messages as any) as IChatRoom["messages"],
      createdAt: chatRoom.createdAt as IChatRoom["createdAt"],
      updatedAt: chatRoom.updatedAt as IChatRoom["updatedAt"],
      userId: chatRoom.userId as IChatRoom["userId"],
    };
  }

  async update(
    id: string & { _brand: "ChatRoomId" },
    changes: Omit<IChatRoom, "createdAt" | "updatedAt">
  ): Promise<IChatRoom> {
    const old = await this.findById(id);
    const updatedAt = new Date().toISOString();
    const { name, userId } = changes;
    this.db.transaction(() => {
      this.db
        .prepare(
          `
                        UPDATE chat_rooms SET name = ?, userId = ?, updatedAt = ? WHERE id = ?
                    `
        )
        .run(name, userId, updatedAt, id);
    })();
    return {
      ...old,
      ...changes,
      updatedAt: updatedAt as IChatRoom["updatedAt"],
    };
  }

  async delete(id: string & { _brand: "ChatRoomId" }): Promise<void> {
    this.db.transaction(() => {
      this.db
        .prepare(
          `
                        DELETE FROM chat_rooms WHERE id = ?
                    `
        )
        .run(id);
    })();
  }

  async findByName(
    name: string & { _brand: "ChatRoomName" }
  ): Promise<IChatRoom> {
    const chatRoom = this.db
      .prepare(
        `
                    SELECT * FROM chat_rooms WHERE name = ?
                `
      )
      .get(name) as IChatRoom | undefined;
    if (!chatRoom) {
      throw new Error("Chat room not found");
    }
    return {
      id: chatRoom.id as IChatRoom["id"],
      name: chatRoom.name as IChatRoom["name"],
      messages: JSON.parse(chatRoom.messages as any) as IChatRoom["messages"],
      createdAt: chatRoom.createdAt as IChatRoom["createdAt"],
      updatedAt: chatRoom.updatedAt as IChatRoom["updatedAt"],
      userId: chatRoom.userId as IChatRoom["userId"],
    };
  }

  async findByUserId(
    userId: string & { _brand: "ChatRoomUserId" }
  ): Promise<IChatRoom[]> {
    const chatrooms = this.db
      .prepare(
        `
                    SELECT * FROM chat_rooms WHERE userId = ?
                `
      )
      .all(userId) as IChatRoom[];
    return chatrooms.map((chatRoom) => ({
      id: chatRoom.id as IChatRoom["id"],
      name: chatRoom.name as IChatRoom["name"],
      messages: JSON.parse(chatRoom.messages as any) as IChatRoom["messages"],
      createdAt: chatRoom.createdAt as IChatRoom["createdAt"],
      updatedAt: chatRoom.updatedAt as IChatRoom["updatedAt"],
      userId: chatRoom.userId as IChatRoom["userId"],
    }));
  }

  async addMessage(
    id: string & { _brand: "ChatRoomId" },
    message: ChatMessage
  ): Promise<IChatRoom> {
    const chatRoom = await this.findById(id);
    const messages = [...chatRoom.messages, message];
    const updatedAt = new Date().toISOString();
    this.db.transaction(() => {
      this.db
        .prepare(
          `
                        UPDATE chat_rooms SET messages = ?, updatedAt = ? WHERE id = ?
                    `
        )
        .run(JSON.stringify(messages), updatedAt, id);
    })();
    return {
      ...chatRoom,
      messages: messages as IChatRoom["messages"],
      updatedAt: updatedAt as IChatRoom["updatedAt"],
    };
  }

  async deleteMessage(
    id: string & { _brand: "ChatRoomId" },
    messageId: string & { _brand: "ChatMessageId" }
  ): Promise<IChatRoom> {
    const chatRoom = await this.findById(id);
    const messages = chatRoom.messages.filter(
      (message) => message.id !== messageId
    );
    const updatedAt = new Date().toISOString();
    this.db.transaction(() => {
      this.db
        .prepare(
          `
                        UPDATE chat_rooms SET messages = ?, updatedAt = ? WHERE id = ?
                    `
        )
        .run(JSON.stringify(messages), updatedAt, id);
    })();
    return {
      ...chatRoom,
      messages: messages as IChatRoom["messages"],
      updatedAt: updatedAt as IChatRoom["updatedAt"],
    };
  }

  async updateMessage(
    id: string & { _brand: "ChatRoomId" },
    messageId: string & { _brand: "ChatMessageId" },
    changes: Omit<ChatMessage, "id" | "createdAt" | "updatedAt">
  ): Promise<IChatRoom> {
    const chatRoom = await this.findById(id);
    const messages = chatRoom.messages.map((message) => {
      if (message.id === messageId) {
        return {
          ...message,
          ...changes,
        };
      }
      return message;
    });
    const updatedAt = new Date().toISOString();
    this.db.transaction(() => {
      this.db
        .prepare(
          `
                        UPDATE chat_rooms SET messages = ?, updatedAt = ? WHERE id = ?
                    `
        )
        .run(JSON.stringify(messages), updatedAt, id);
    })();
    return {
      ...chatRoom,
      messages: messages as IChatRoom["messages"],
      updatedAt: updatedAt as IChatRoom["updatedAt"],
    };
  }
}
