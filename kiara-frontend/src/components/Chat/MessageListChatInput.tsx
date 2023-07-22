import {
  ChatInputArea,
  DraggablePanel,
} from "@lobehub/ui";
import {useState } from "react";
import { useWindowSize } from "usehooks-ts";

export const MessageListChatInput: React.FC = () => {
  const { height } = useWindowSize();
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
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
  );
};
