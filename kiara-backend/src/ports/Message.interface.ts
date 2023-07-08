type MessageId = string & { _brand: "MessageId" };
type MessageContent = string & { _brand: "MessageContent" };
type MessageRole = ("user" | "assistant" | "system") & {
  _brand: "MessageRole";
};
type MessageCreatedAt = string & { _brand: "MessageCreatedAt" };
type MessageUpdatedAt = string & { _brand: "MessageUpdatedAt" };

export interface IMessage {
  id: MessageId;
  content: MessageContent;
  role: MessageRole;
  createdAt: MessageCreatedAt;
  updatedAt: MessageUpdatedAt;
}

export interface IMessageRepository {
  create(message: Pick<IMessage, "content" | "role">): Promise<IMessage>;
  update(
    id: MessageId,
    message: Pick<IMessage, "content" | "role">
  ): Promise<IMessage>;
  delete(id: MessageId): Promise<void>;
  findById(id: MessageId): Promise<IMessage>;
  findAll(): Promise<IMessage[]>;
}
