import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {type useDispatchType, type useSelectorType} from '../store';
import {setPage, updateSearchBoxValues} from '../features/job/jobSlice';
import {getAllJobs} from '../features/job/jobThunk';

const SearchBox: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {searchBoxValues, jobLoading} = useSelector((store: useSelectorType) => store.job);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch(updateSearchBoxValues({name: event.target.name, value: event.target.value}));
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(setPage(1));
        dispatch(getAllJobs());
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="search">Search</label>
                    <input id="search" type="text" name="search" value={searchBoxValues.search} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" value={searchBoxValues.status} onChange={handleChange}>
                        <option value=""></option>
                        <option value="pending">Pending</option>
                        <option value="interview">Interview</option>
                        <option value="rejected">Rejected</option>
                        <option value="accepted">Accepted</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort">Sort</label>
                    <select id="sort" name="sort" value={searchBoxValues.sort} onChange={handleChange}>
                        <option value=""></option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </div>
                <button disabled={jobLoading}>{jobLoading ? 'SEARCHING' : 'SEARCH'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    form {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        max-width: 600px;
        margin: 0 auto;
        background-color: rgb(229, 225, 218);
        padding: 1rem;
        border-radius: 0.5rem;
    }
    div {
        display: flex;
        flex-direction: column;
    }
    label {
        margin-bottom: 0.25rem;
    }
    input, button, select {
        padding: 0.5rem;
    }
    button {
        grid-column: 3 / 4;
    }
`;

export default SearchBox;