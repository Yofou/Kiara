import { styled } from "@stitches/react";
import { MessageListHeader } from "./MessageListHeader";
import { MessageListChat } from "./MessageListChat";

const NavContainer = styled("main", {
  display: "grid",
  position: "relative",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "min-content 1fr",
  width: "100%",
  height: '100%'
});

export const MessageList: React.FC = () => {
  return (
    <NavContainer>
      <MessageListHeader />
      <MessageListChat />
    </NavContainer>
  );
};

export default MessageList;
