import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {updateSearchInput} from '../features/jobs/jobsSlice.js';
import {getAllJobs} from '../features/jobs/jobsThunk.js';

const SearchBox = () => {
    const dispatch = useDispatch();
    const {search, status, sort} = useSelector(store => store.jobs);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getAllJobs());
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="search">Search</label>
                    <input id="search" type="text" name="search" value={search} onChange={(event) => dispatch(updateSearchInput({name: event.target.name, value: event.target.value}))}/>
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select id="status" value={status} name="status" onChange={(event) => dispatch(updateSearchInput({name: event.target.name, value: event.target.value}))}>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="interview">Interview</option>
                        <option value="rejected">Rejected</option>
                        <option value="accepted">Accepted</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort">Sort</label>
                    <select id="sort" value={sort} name="sort" onChange={(event) => dispatch(updateSearchInput({name: event.target.name, value: event.target.value}))}>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </div>
                <button>SUBMIT</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    border: 1px solid black;    
    label, input, select {
        display: block;
        margin: 0 auto;
    }
    input, select, button {
        width: 30%;
        padding: 0.25rem;
    }
    button {
        margin: 1rem 0;
        width: 30%;
    }
`;

export default SearchBox;