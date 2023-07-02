import { styled } from "styled-components";

export const Flex = styled.div`
    display: flex;
`;
export const FlexColumn = styled(Flex)`
    flex-direction: column;
`;
export const Center = styled(Flex)`
    align-items: center;
    justify-content: center;
`;
export const Container = styled(FlexColumn)`
    margin: 0 auto;
    width: min(100% - 3rem, 1200px);
`;
export const FullWidth = styled(Container)`
    width: 100%;
`;