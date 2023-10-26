import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import React from 'react';
import {updateUser} from '../features/user/userThunk.js';

const Profile = () => {
    const dispatch = useDispatch();
    const {isLoading, user} = useSelector(store => store.user);
    const [input, setInput] = React.useState({
        name: user.name,
        email: user.email
    });
    const handleChange = (event) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser({name: input.name, email: input.email}));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1 style={{textAlign: 'center', backgroundColor: 'lightcoral', borderBottom: '1px solid black'}}>Profile</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={input.name} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" value={input.email} onChange={handleChange}/>
                </div>
                <button>SUBMIT</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        width: 50%;
        padding: 1rem;
        border: 1px solid black;
    }
    label, button {
        margin-top: 1rem;
    }
    label, input {
        display: block;
    }
    button, input {
        width: 100%;
        padding: 0.5rem;
    }
`;

export default Profile;