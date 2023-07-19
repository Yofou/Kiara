export type ChatMessage = {
  id: string & { _brand: "ChatMessageId" };
  content: string & { _brand: "ChatMessageContent" };
  createdAt: string & { _brand: "ChatMessageCreatedAt" };
  updatedAt: string & { _brand: "ChatMessageUpdatedAt" };
  role: "assistant" | "system" | ("user" & { _brand: "ChatMessageRole" });
  chatRoomId: string & { _brand: "ChatMessageChatRoomId" };
};
type ChatRoomId = string & { _brand: "ChatRoomId" };
type ChatRoomMessages = ChatMessage[] & { _brand: "ChatRoomMessages" };
type ChatRoomCreatedAt = string & { _brand: "ChatRoomCreatedAt" };
type ChatRoomUpdatedAt = string & { _brand: "ChatRoomUpdatedAt" };
type ChatRoomName = string & { _brand: "ChatRoomName" };
type ChatRoomUserId = string & { _brand: "ChatRoomUserId" };

export interface IChatRoom {
  id: ChatRoomId;
  name: ChatRoomName;
  messages: ChatRoomMessages;
  createdAt: ChatRoomCreatedAt;
  updatedAt: ChatRoomUpdatedAt;
  userId: ChatRoomUserId;
}

export interface IChatRoomRepository {
  create(
    chatRoom: Omit<IChatRoom, "createdAt" | "updatedAt" | "id">
  ): Promise<IChatRoom>;
  update(
    id: ChatRoomId,
    chatRoom: Omit<IChatRoom, "createdAt" | "updatedAt">
  ): Promise<IChatRoom>;
  delete(id: ChatRoomId): Promise<void>;
  findById(id: ChatRoomId): Promise<IChatRoom>;
  findByUserId(userId: ChatRoomUserId): Promise<IChatRoom[]>;
  addMessage(id: ChatRoomId, message: ChatMessage): Promise<IChatRoom>;
  deleteMessage(
    id: ChatRoomId,
    messageId: ChatMessage["id"]
  ): Promise<IChatRoom>;
  updateMessage(
    id: ChatRoomId,
    messageId: ChatMessage["id"],
    message: Omit<ChatMessage, "id" | "createdAt" | "updatedAt">
  ): Promise<IChatRoom>;
}
