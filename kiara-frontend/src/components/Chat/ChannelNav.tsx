import { useChatNavModule } from "@/stores";
import { DraggablePanel, DraggablePanelHeader } from "@lobehub/ui";
import { styled } from "@stitches/react";
import { useWindowSize } from 'usehooks-ts'

const NavContainer = styled("nav", {
  position: "relative",
  display: "flex",
  width: "min-content",
  ["& .kiara-channel-nav"]: {
    fontSize: '1.42857rem',
    height: "100%",
  },
  ['& .kiara-channel-nav-header']: {
    height: '5.428rem',
    ['div:nth-of-type(1)']: {
      width: '56px !important',
      height: '56px !important',
      ['svg']: {
        width: '24px',
        height: '24px'
      }
    },
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
