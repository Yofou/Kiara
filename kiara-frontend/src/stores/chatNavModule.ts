import { create } from 'zustand'

type ChatNavModule = {
  isChatNavOpen: boolean;
  toggleChatNavOpen: () => void;
}

export const useChatNavModule = create<ChatNavModule>((set) => ({
  isChatNavOpen: true,
  toggleChatNavOpen: () => set(state => ({ isChatNavOpen: !state.isChatNavOpen }))
}))
