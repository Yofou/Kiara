import { styled } from "styled-components";

const ScreenContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    `;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
    width: min(100% - 3rem, 96ch);
    `;
const ProfilePicture = styled.img`
    width: clamp(12rem, 20vw, 24rem);
    height: auto;
    max-width: 20rem;
    border-radius: 50%;
    margin-bottom: 1rem;
    `;
const Button = styled.button`
    padding: 1rem 2rem;
    background: var(--clr-primary-button);
    color: var(--clr-button-text);
    border: none;
    border-radius: 0.5rem;
    font-size: min(var(--text-base), 20px) !important;
    font-weight: 600;
    font-size: var(--text-base);
    @media screen and (max-width: 768px) {
        width: 100%;
    }
    `;
const SecondaryButton = styled(Button)`
    background: var(--clr-secondary-button);
    color: var(--clr-text);
    `;
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: 100%;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
    `;

const Home = () => {
    return (
        <ScreenContainer>
            <Container className="flow">
                <ProfilePicture src="/pfp2.png" />
                <h1>Kiara</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis modi perspiciatis nam mollitia pariatur eligendi debitis numquam sequi, temporibus aspernatur, molestias corrupti voluptatem! Ipsa fugit iste aspernatur voluptatum adipisci!</p>
                <ButtonWrapper>
                    <Button>Try Kiara</Button>
                    <SecondaryButton>Learn More</SecondaryButton>
                </ButtonWrapper>
            </Container>
        </ScreenContainer>
    );
}

export default Home;