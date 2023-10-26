import styled from 'styled-components';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser, loginUser} from '../features/user/userThunk.js';
import {useNavigate} from 'react-router-dom';

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, user} = useSelector(store => store.user);
    const [input, setInput] = React.useState({
        name: '',
        email: '',
        password: '',
        wantsToRegister: true
    });
    const toggleAuth = () => {
        setInput(currentState => {
            return {...currentState, wantsToRegister: !input.wantsToRegister};
        });
    }
    const handleChange = (event) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.wantsToRegister) {
            dispatch(registerUser(input));
            return;
        }
        dispatch(loginUser(input));
    }
    React.useEffect(() => {
        if (user) {
            return navigate('/');
        }
    }, [user]);
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{input.wantsToRegister ? 'Register' : 'Login'}</h1>
                {input.wantsToRegister && (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={input.name} onChange={handleChange}/>
                    </div>
                )}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" value={input.email} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={input.password} onChange={handleChange}/>
                </div>
                <p>{input.wantsToRegister ? 'Already a User?' : 'New User?'}<span onClick={toggleAuth}>{input.wantsToRegister ? 'LOGIN' : 'REGISTER'}</span></p>
                <button disabled={isLoading}>{isLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    h1 {
        text-align: center;
    }
    form {
        width: 50%;
        border: 1px solid black;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: lightblue;
    }
    p {
        text-align: center;
    }
    span {
        display: inline-block;
        padding: 0.1rem 0.5rem;
        background-color: lightgray;
        color: black;
        border: 1px solid black;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-left: 0.5rem;
    }
    label, input, p {
        margin-bottom: 1rem;
    }
    label, input, button {
        display: block;
        width: 100%;
    }
    input, button {
        padding: 0.5rem;
    }
`;

export default Auth;