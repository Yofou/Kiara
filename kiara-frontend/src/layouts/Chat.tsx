import { styled } from "@stitches/react";

export const ChatLayout = styled('main', {
	width: '100%',
  minHeight: '100vh',
	display: 'grid',
  gridTemplateColumns: '5.5rem minmax(0, max-content) minmax(0, 1fr)'
})

export default ChatLayout;
