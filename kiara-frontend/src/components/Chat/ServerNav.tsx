import { ICON_SIZE } from "@/utils/icons";
import { ActionIcon, SideNav } from "@lobehub/ui";
import { styled } from "@stitches/react";
import { MessageCircle, Settings } from "lucide-react";

const Avatar = styled("div", {
  width: "3.5rem",
  height: "3.5rem",
  borderRadius: "100%",
  background: "#6f6f6f",
});

const ActionList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem'
})

export const Actions: React.FC = () => {
  return <ActionList>
    <ActionIcon icon={MessageCircle} size={ICON_SIZE} />
  </ActionList>
}

const NavContainer = styled("nav", {
  display: "contents",
  [`& .kiara-side-nav`]: {
    width: "100%",
  },
});

export const ServerNav: React.FC = () => {
  return (
    <NavContainer>
      <SideNav
        className="kiara-side-nav"
        avatar={<Avatar />}
        topActions={<Actions />}
        bottomActions={
          <ActionIcon
            icon={Settings}
            size={ICON_SIZE}
          />
        }
      />
    </NavContainer>
  );
};

export default ServerNav;
