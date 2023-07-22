import { styled } from "@stitches/react"
import { MessageListChatInput } from "./MessageListChatInput"

const MessageListChatContainer = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateRows: '1fr max-content',
  height: '100%'
})

export const MessageListChat: React.FC = () => {
  return <MessageListChatContainer>
    <div>
      
    </div>
    <MessageListChatInput />
  </MessageListChatContainer>
}
