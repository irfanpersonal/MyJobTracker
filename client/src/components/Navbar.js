import styled from 'styled-components';
import {NavLink, useNavigate} from 'react-router-dom';
import {AiOutlineLogout} from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../features/user/userSlice.js';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Wrapper>
            <h1>MyJobTracker</h1>
            <div>
                <NavLink to='/'>Stats</NavLink>
                <NavLink to='/all-jobs'>All Jobs</NavLink>
                <NavLink to='/add-job'>Add Job</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                <button title="Logout" onClick={() => {
                    dispatch(logoutUser());
                    navigate('/landing');
                }}><AiOutlineLogout/></button>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: lightblue;
    border-bottom: 1px solid black;
    a {
        margin-left: 1rem;
        text-decoration: none;
        color: black;
        font-weight: bolder;
    }
    button {
        margin-left: 1rem;
    }
    .active {
        border-bottom: 1px solid black;
    }
`;

export default Navbar;