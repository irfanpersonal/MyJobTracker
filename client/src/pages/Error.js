import {useRouteError, Link} from "react-router-dom";
import styled from 'styled-components';

const Error = () => {
    const error = useRouteError();
    if (error.status === 404) {
        return (
            <Wrapper>
                <h1>404 Page Not Found</h1>
                <p>Oopsies! Looks like you don't know where you're going. How about home?</p>
                <StyledLink>HOME</StyledLink>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h1>Something went wrong, try again later!</h1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: lightcoral;
    h1, p {
        margin-top: 1rem;
    } 
`;

const StyledLink = styled(Link)`
    display: block;
    border: 1px solid black;
    padding: 0.5rem 2rem;
    border-radius: 1rem;
    margin-top: 1rem;
    background-color: black;
    text-decoration: none;
    color: white;
    &:hover {   
        color: black;
        background-color: lightblue;
    }
`;

export default Error;