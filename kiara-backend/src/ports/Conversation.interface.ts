import type { IMessage } from "./Message.interface";

type ConversationId = string & { _brand: "ConversationId" };
type ConversationCreatedAt = string & { _brand: "ConversationCreatedAt" };
type ConversationUpdatedAt = string & { _brand: "ConversationUpdatedAt" };
type isArchived = boolean & { _brand: "isArchived" };
type ConversationMessages = IMessage[] & { _brand: "ConversationMessages" };

export interface IConversation {
  id: ConversationId;
  createdAt: ConversationCreatedAt;
  updatedAt: ConversationUpdatedAt;
  isArchived: isArchived;
  messages: ConversationMessages;
}

export interface IConversationRepository {
  create(conversation: Pick<IConversation, "messages">): Promise<IConversation>;
  update(
    id: ConversationId,
    conversation: Pick<IConversation, "isArchived" | "messages">
  ): Promise<IConversation>;
  delete(id: ConversationId): Promise<void>;
  findById(id: ConversationId): Promise<IConversation>;
  findAll(): Promise<IConversation[]>;
}
