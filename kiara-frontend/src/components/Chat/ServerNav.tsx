import { ActionIcon, SideNav } from "@lobehub/ui";
import { styled } from "@stitches/react";

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
        bottomActions={
          <ActionIcon
            size={{
              blockSize: 56,
              borderRadius: 8,
            }}
          />
        }
      />
    </NavContainer>
  );
};

export default ServerNav;
