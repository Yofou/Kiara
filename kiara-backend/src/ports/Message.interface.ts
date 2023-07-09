type MessageId = string & { _brand: "MessageId" };
type MessageContent = string & { _brand: "MessageContent" };
type MessageRole = ("user" | "assistant" | "system") & {
  _brand: "MessageRole";
};
type MessageCreatedAt = string & { _brand: "MessageCreatedAt" };
type MessageUpdatedAt = string & { _brand: "MessageUpdatedAt" };
type ConversationId = string & { _brand: "ConversationId" };

export interface IMessage {
  id: MessageId;
  content: MessageContent;
  role: MessageRole;
  createdAt: MessageCreatedAt;
  updatedAt: MessageUpdatedAt;
  conversationId: ConversationId;
}

export interface IMessageRepository {
  create(
    message: Pick<IMessage, "content" | "role" | "conversationId">
  ): Promise<IMessage>;
  update(
    id: MessageId,
    message: Pick<IMessage, "content" | "role">
  ): Promise<IMessage>;
  delete(id: MessageId): Promise<void>;
  findById(id: MessageId): Promise<IMessage>;
  findByConversationId(conversationId: ConversationId): Promise<IMessage[]>;
  findAll(): Promise<IMessage[]>;
}
