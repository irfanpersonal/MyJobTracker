import React from 'react';
import styled from 'styled-components';
import {useDispatchType, useSelectorType} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import {toggleAuthType} from '../features/user/userSlice';
import {loginUser, registerUser} from '../features/user/userThunk';
import {useNavigate} from 'react-router-dom';

interface IInput {
    name: string,
    email: string,
    password: string
}

const Auth: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<useDispatchType>();
    const {wantsToRegister, authLoading, user} = useSelector((store: useSelectorType) => store.user);
    const [input, setInput] = React.useState<IInput>({
        name: '',
        email: '',
        password: ''
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (wantsToRegister) {
            dispatch(registerUser(input));
            return;
        }
        dispatch(loginUser({email: input.email, password: input.password}));
    }
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{wantsToRegister ? 'Register' : 'Login'}</h1>
                {wantsToRegister && (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={input.name} onChange={handleChange} required/>
                    </div>
                )}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" value={input.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={input.password} onChange={handleChange} required/>
                </div>
                <p onClick={() => dispatch(toggleAuthType())}>{wantsToRegister ? 'Already have an account' : `Don't have an account`}</p>
                <button disabled={authLoading}>{authLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
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
    background-color: rgb(251, 249, 241);
    form {
        background-color: white;
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 50%;
        h1 {
            font-size: 1.5em;
            text-align: center;
            margin-bottom: 1rem;
            border-bottom: 1px solid black;
            padding-bottom: 1rem;
        }
        div {
            margin-bottom: 1rem;
            label {
                display: block;
                margin-bottom: 0.25rem;
            }
            input {
                width: 100%;
                padding: 0.5rem;
                font-size: 1em;
                border: 1px solid black;
                border-radius: 0.25rem;
                box-sizing: border-box;
            }
        }
        p {
            cursor: pointer;
            text-align: center;
            margin-bottom: 1rem;
        }
        p:hover, p:active {
            color: gray;
        }
        button {
            cursor: pointer;
            width: 100%;
            padding: 0.5rem;
            background-color: rgb(69, 160, 73);
            color: white;
            border: none;
            border-radius: 0.25rem; 
            font-size: 1em;
            transition: background-color 0.3s ease;
            &:hover {
                background-color: rgb(79, 111, 82);
            }
        }
    }
`;

export default Auth;