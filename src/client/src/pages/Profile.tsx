import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {type useDispatchType, type useSelectorType} from '../store';
import {FaDoorOpen} from "react-icons/fa";
import {Title, Loading, Modal} from '../components';
import {deleteAccount, logoutUser, updateUser, updateUserPassword} from '../features/user/userThunk';

interface IInput {
    name: string,
    email: string,
    oldPassword: string,
    newPassword: string
}

const Profile: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {user, logoutLoading, updateUserLoading, deleteAccountLoading} = useSelector((store: useSelectorType) => store.user);
    const [wantsToUpdatePassword, setWantsToUpdatePassword] = React.useState<boolean>(false);
    const [input, setInput] = React.useState<IInput>({
        name: user!.name,
        email: user!.email,
        oldPassword: '',
        newPassword: ''
    });
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const openModal = () => {
        setShowModal(currentState => {
            return true;
        });
    }
    const closeModal = () => {
        setShowModal(currentState => {
            return false;
        });
    }
    const handleModalSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const password = (target.elements.namedItem('password') as HTMLInputElement).value;
        dispatch(deleteAccount({password}));
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const toggleWantsToUpdatePassword = () => {
        setWantsToUpdatePassword(currentState => {
            return !currentState;
        });
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (wantsToUpdatePassword) {
            dispatch(updateUserPassword({oldPassword: input.oldPassword, newPassword: input.newPassword}));
            return;
        }
        dispatch(updateUser({name: input.name, email: input.email}));
    }
    return (
        <Wrapper>
            <div className="profile-menu">
                <Title text={`Welcome back, ${user!.name}`} borderBottom={false}/>
                {logoutLoading ? (
                    <Loading title='Logging Out' position='normal' marginTop='1rem'/>
                ) : (
                    <FaDoorOpen title="Logout" onClick={() => dispatch(logoutUser())} className="icon"/>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <h1>{wantsToUpdatePassword ? 'Update User Password' : 'Update User'}</h1>
                {wantsToUpdatePassword ? (
                    <>
                        <div>
                            <label htmlFor="oldPassword">Old Password</label>
                            <input id="oldPassword" type="password" name="oldPassword" value={input.oldPassword} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="newPassword">New Password</label>
                            <input id="newPassword" type="password" name="newPassword" value={input.newPassword} onChange={handleChange} required/>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" value={input.name} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" name="email" value={input.email} onChange={handleChange} required/>
                        </div>
                    </>
                )}
                <p onClick={toggleWantsToUpdatePassword}>{wantsToUpdatePassword ? 'Want to update user?' : 'Want to change password?'}</p>
                <button type="submit" disabled={updateUserLoading}>{updateUserLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
                <h6 onClick={openModal}>Delete Account</h6>
            </form>
            {showModal && (
                <Modal title='Account Delete' description='Please enter your password to complete the account deletion process.' closeModal={closeModal} handleSubmit={handleModalSubmit}/>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .profile-menu {
        text-align: center;
        border-bottom: 1px solid black;
    }
    .icon {
        cursor: pointer;
        font-size: 1.5rem;
    }
    .icon:hover, .icon:active {
        color: rgb(255, 0, 77);
    }
    h1 {
        text-align: center;
        font-size: 1.5em;
        margin-bottom: 1rem;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: 0 auto;
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
        }
    }
    p {
        cursor: pointer;
        margin-bottom: 1rem;
        text-align: center;
        color: black;
        text-decoration: underline;
        &:hover, &:active {
            color: gray;
        }
    }
    button {
        padding: 0.75rem;
        background-color: rgb(53, 89, 224);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s ease;
        &:hover, &:active {
            background-color: rgb(83, 119, 255);
        }
    }
    h6 {
        cursor: pointer;
        text-align: center;
        margin-top: 1rem;
        text-decoration: underline;
    }
`;

export default Profile;