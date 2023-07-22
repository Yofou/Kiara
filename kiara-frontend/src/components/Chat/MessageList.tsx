import { ChatHeader, ChatInputArea, DraggablePanel } from "@lobehub/ui";
import { styled } from "@stitches/react";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";

const NavContainer = styled("main", {
  display: "grid",
  position: 'relative',
  gridTemplateColumns: '1fr',
  gridTemplateRows: "1fr max-content",
  width: "100%",
  ["& .kiara-message-list"]: {
    width: '100%',
    height: "100%",
  },
});

export const MessageList: React.FC = () => {
  const { height } = useWindowSize()
  const [isFullScreen, setIsFullScreen] = useState(false)
  return (
    <NavContainer>
     <div>
        <ChatHeader />
      </div>
      <DraggablePanel
        expandable={false}
        className="kiara-message-list"
        placement="bottom"
        minHeight={192}
        maxHeight={height / 2}
        fullscreen={isFullScreen}
      >
        <ChatInputArea
          expand={isFullScreen}
          onExpandChange={setIsFullScreen}
        />
      </DraggablePanel>
    </NavContainer>
  );
};

export default MessageList;
