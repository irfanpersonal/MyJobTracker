import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {deleteJob, getSingleJob} from '../features/jobs/jobsThunk';
import {isEditingTrue} from '../features/jobs/jobsSlice';
import {Link} from 'react-router-dom';

const JobsListItem = ({data}) => {
    const dispatch = useDispatch();
    const {name, company, status, _id: id} = data;
    return (
        <Wrapper>
            <h2>{name}</h2>
            <h2>{company}</h2>
            <h2>{status}</h2>
            <Link to='/add-job'><button onClick={() => {
                dispatch(isEditingTrue());
                dispatch(getSingleJob(id));
            }}>EDIT</button></Link>
            <button onClick={() => dispatch(deleteJob(id))}>DELETE</button>
        </Wrapper>
    );
}

const Wrapper = styled.article`
    border: 1px solid black;
    margin-bottom: 1rem;
    text-align: center;
    background-color: lightgray;
    h2 {
        margin: 1rem 0;
    }
    button {
        width: 50%;
        padding: 0.5rem;
    }
`;

export default JobsListItem;