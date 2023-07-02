import { Github } from "lucide-react";
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
const Content = styled(Container)`
height: auto;
margin: 0 auto;
width: min(100% - 3rem, 96ch);
padding: 1.5rem 0;
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
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        margin-right: 0.5rem;
    }
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

const Footer = styled.footer`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 2rem 0;
    border-top: 1px solid #aaa;
    margin-top: 1rem;

    p {
        font-size: var(--text-sm);
        color: var(--clr-text);
        margin-bottom: 0.5rem;
    }

    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        a {
            font-size: var(--text-sm);
            color: var(--clr-text);
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    `;


const Home = () => {
    return (
        <>
            <ScreenContainer>
                <Container className="flow">
                    <ProfilePicture src="/pfp2.png" />
                    <h1>Kiara</h1>
                    <p>Meet Kiara, your partner for seamless, captivating long-term interactions. Using a vector database, she effortlessly recalls essential details from your previous chats, adding a whole new dimension to your conversations. </p>
                    <ButtonWrapper>
                        <Button>Try Kiara</Button>
                        <SecondaryButton>Learn More</SecondaryButton>
                    </ButtonWrapper>
                </Container>
            </ScreenContainer>
            <Content className="flow">
                <h3>OpenAI API support</h3>
                <p>Kiara allows you to use the OpenAI API's like <a href="">ChatGPT</a> and <a href="">Whisper</a>, in order to let you interact with her with both text and voice messages. The vector database <a href="">ChromaDB</a> allows her to remember important information from previous conversations.</p>
                <ButtonWrapper>
                    <SecondaryButton>How does it work?</SecondaryButton>
                </ButtonWrapper>
            </Content>
            <Content className="flow">
                <h3>Bring your own AI</h3>
                <p>Kiara can also act as a front-end for your own locally running language models following the <a href="">KoboldAI</a> spec. Simply supply your API endpoint and get started.</p>
                <ButtonWrapper>
                    <SecondaryButton>Local AI Documentation</SecondaryButton>
                </ButtonWrapper>
            </Content>
            <Content className="flow">
                <h3>Fully open-source</h3>
                <p>Kiara is a fully open source project available on GitHub. We are actively looking for contributors and sponsors to keep this project up and running.</p>
                <ButtonWrapper>
                    <SecondaryButton><Github /> View on Github</SecondaryButton>
                </ButtonWrapper>
            </Content>
            <Footer>
                <p>© {new Date().getFullYear()} KiaraAI. All rights reserved.</p>
                <nav>
                    <a href="">Terms of Service</a>
                    <a href="">Privacy Policy</a>
                    <a href="">Contact</a>
                </nav>
            </Footer>

        </>
    );
}

export default Home;