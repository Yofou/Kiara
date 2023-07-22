import { create } from "zustand";

export type ChatMessage = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  chatRoomId: string;
};

export type IChatRoom = {
  id: string;
  name: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

type ChatMessagesModule = {
  channels: {
    [key: string]: IChatRoom;
  };
};

export const useChatMessagesModule = create<ChatMessagesModule>((set) => ({
  channels: {},

  createRoom: (body: Omit<IChatRoom, 'id' | 'createdAt' | 'updatedAt'>) => Error("TO IMPLEMENTS"),
  updateRoom: (roomId: string, body: Omit<IChatRoom, 'id' | 'createdAt' | 'updatedAt'>) => Error("TO IMPLEMENTS"),
  delRoom: (roomId: string) => Error("TO IMPLEMENT"),
  postMessage: (roomId: string, body: Pick<ChatMessage, 'content'>) => Error("TO IMPLEMENT"),
  updateMessage: (messageId: string, body: Pick<ChatMessage, 'content'>) => Error("TO IMPLEMENT"),
  delMessage: (messageId: string) => Error("TO IMPLEMENT"),
}));
