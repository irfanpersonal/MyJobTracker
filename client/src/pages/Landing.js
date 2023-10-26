import styled from 'styled-components';
import {Link} from 'react-router-dom';
import jobHunt from '../images/job_hunt.png';

const Landing = () => {
    return (
        <Wrapper>
            <h1>MyJobTracker</h1>
            <Link to='/auth'>Register/Login</Link>
            <img src={jobHunt} alt="An individual viewing potential jobs"/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 50%;
    margin: 0 auto;
    text-align: center;
    h1 {
        border: 1px solid black;
    }
    a {
        display: block;
        background-color: black;
        padding: 0.5rem;
        text-decoration: none;
        font-weight: bolder;
        color: white;
    }
    a:hover {
        background-color: lightblue;
        color: black;
    }
    img {
        width: 50%;
        height: 50%;
    }
    h1, a, img {
        margin: 1rem 0;
    }
`;

export default Landing;