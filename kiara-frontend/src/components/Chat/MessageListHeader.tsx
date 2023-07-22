import { ICON_SIZE } from "@/utils/icons";
import { ActionIcon, ChatHeader } from "@lobehub/ui";
import { css, styled } from "@stitches/react";
import { LayoutList, MenuSquare } from "lucide-react";

const MessageListHeaderContainer = styled("div", {
  position: 'relative',
  height: "5.428rem",
  ["& .kiara-message-list-header"]: {
    height: "100%",
  },
});

type MessageListHeaderTitleProps = {
  title?: string;
  subtitle?: string;
};

const MessageListHeaderTitle: React.FC<MessageListHeaderTitleProps> = (
  props
) => {
  const containerClass = css({
    display: "flex",
    flexDirection: 'column',
    ['h2, p']: {
      margin: 0,
      padding: 0,
    },
    h2: {
      fontSize: '1.428rem',
      fontWeight: 700,
    },
    p: {
      fontSize: '0.857rem',
    }
  })

  return (
    <div
      className={containerClass()}
    >
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
    </div>
  );
};

export const MessageListHeader: React.FC = () => {
  return (
    <MessageListHeaderContainer>
      <ChatHeader
        className="kiara-message-list-header"
        left={
          <MessageListHeaderTitle
            title="Some chat with my AI"
            subtitle="Last Message: 3 days ago"
          />
        }
        right={
          <ActionIcon
            icon={LayoutList}
            size={ICON_SIZE}
          />
        }
      />
    </MessageListHeaderContainer>
  );
};
