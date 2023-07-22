import { useChatNavModule } from "@/stores";
import { DraggablePanel, DraggablePanelHeader } from "@lobehub/ui";
import { styled } from "@stitches/react";
import { useWindowSize } from 'usehooks-ts'

const NavContainer = styled("nav", {
  position: "relative",
  display: "flex",
  width: "min-content",
  ["& .kiara-channel-nav"]: {
    height: "100%",
  },
  ['& .kiara-channel-nav-header']: {
    height: '4.57rem',
    ['div:nth-of-type(2)']: {
      visibility: 'hidden'
    }
  }
});

export const ChannelNav: React.FC = () => {
  const { width } = useWindowSize()
  const chatNav = useChatNavModule()

  return (
    <NavContainer>
      <DraggablePanel
        expandable={true}
        className="kiara-channel-nav"
        placement="left"
        minWidth={340}
        expand={chatNav.isChatNavOpen}
        onExpandChange={chatNav.toggleChatNavOpen}
        maxWidth={width - 768}
      >
        <DraggablePanelHeader
            className="kiara-channel-nav-header"
            pin={true}
            position="left"
            setExpand={chatNav.toggleChatNavOpen}
            setPin={() => null}
            title="My Chats"
          />
      </DraggablePanel>
    </NavContainer>
  );
};

export default ChannelNav;
