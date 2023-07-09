type ConversationId = string & { _brand: "ConversationId" };
type UserId = string & { _brand: "UserId" };
type ConversationCreatedAt = string & { _brand: "ConversationCreatedAt" };
type ConversationUpdatedAt = string & { _brand: "ConversationUpdatedAt" };
type isArchived = boolean & { _brand: "isArchived" };

export interface IConversation {
  id: ConversationId;
  ownerId: UserId;
  createdAt: ConversationCreatedAt;
  updatedAt: ConversationUpdatedAt;
  isArchived: isArchived;
}

export interface IConversationRepository {
  create(conversation: Pick<IConversation, "ownerId">): Promise<IConversation>;
  update(
    id: ConversationId,
    conversation: Pick<IConversation, "isArchived">
  ): Promise<IConversation>;
  delete(id: ConversationId): Promise<void>;
  findById(id: ConversationId): Promise<IConversation>;
  findAll(): Promise<IConversation[]>;
}
