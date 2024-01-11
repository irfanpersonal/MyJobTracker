import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Landing: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <header>
                <h1>MyJobTracker</h1>
                <p>Track and manage your job applications effortlessly</p>
            </header>
            <div className='container'>
                <div className='container-title'>
                    <h2>Your Job Search Made Easy</h2>
                    <p>MyJobTracker helps you organize and stay on top of your job applications, providing a seamless experience for managing your job search process.</p>
                </div>
                <div className='feature-section'>
                    <div className="single-feature">
                        <div className="feature-icon">🗃️</div>
                        <div className='single-feature-text'>Simple View</div>
                    </div>
                    <div className='single-feature'>
                        <div className="feature-icon">⚡</div>
                        <div className='single-feature-text'>Quick Search</div>
                    </div>
                    <div className="single-feature">
                        <div className="feature-icon">👌</div>
                        <div className='single-feature-text'>Easy to Use</div>
                    </div>
                </div>
                <Link to='/auth'>Get Started</Link>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    padding: 2.5rem;
    background-color: rgb(229, 225, 218);
    header {
        margin-bottom: 1.5rem;
    }
    h1 {
        font-size: 2.5em;
        color: rgb(50, 145, 207);
    }
    p {
        font-size: 1.25em;
    }
    .container {
        max-width: 80%;
        margin: 0 auto;
    }
    .container-title {
        margin-bottom: 2.5rem;
        h2 {
            font-size: 2em;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.25em;
        }
    }
    .feature-section {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2.5rem;
    }
    .single-feature {
        text-align: center;
        width: 33%;
        padding: 1rem;
        border: 1px solid white;
        border-radius: 0.5rem;
        background-color: white;
        &:not(:last-child) {
            margin-right: 1rem;
        }
    }
    .feature-icon {
        font-size: 2em;
        margin-bottom: 1rem;
    }
    .single-feature-text {
        font-size: 1em;
    }
    a {
        cursor: pointer;
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        font-size: 1.25em;
        background-color: rgb(50, 145, 207);
        border-radius: 0.25rem;
    }
`;

export default Landing;