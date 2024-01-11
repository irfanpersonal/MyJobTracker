import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';

const Navbar: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <Link to='/'><h1>MyJobTracker</h1></Link>
            <div>
                <NavLink style={{marginRight: '1rem'}} to='/'>Home</NavLink>
                <NavLink style={{marginRight: '1rem'}} to='/add-job'>Add Job</NavLink>
                <NavLink style={{marginRight: '1rem'}} to='/profile'>Profile</NavLink>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid black;
    background-color: lightgray;
    a {
        text-decoration: none;
        color: black;
    }
    .active {
        border-bottom: 1px solid black;
    }
`;

export default Navbar;