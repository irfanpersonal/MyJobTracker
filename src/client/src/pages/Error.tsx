import styled from 'styled-components';
import {useRouteError, Link} from "react-router-dom";

interface IError {
    status: number
}

const Error: React.FunctionComponent = () => {
    const error = useRouteError() as IError;
    if (error.status === 404) {
        return (
            <Wrapper>
                <h1>404 Page Not Found</h1>
                <p>Oopsies! Looks like you don't know where your going. How about home?</p>
                <Link to='/'>Back Home</Link>
            </Wrapper>
        );
    }
    return (
        <Wrapper>Something went wrong, try again later!</Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-color: rgb(229, 225, 218);
    h1, p, a {
        margin-bottom: 1rem;
    }
    a {
        padding: 0.5rem 1rem;
        background-color: lightcoral;
        outline: 1px solid black;
        border-radius: 1rem;
        text-decoration: none;
        color: black;
    }
`;

export default Error;