import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import {updatePage} from "../features/jobs/jobsSlice.js";
import { getAllJobs } from "../features/jobs/jobsThunk.js";

const PaginationBox = () => {
    const dispatch = useDispatch();
    const {page, numberOfPages} = useSelector(store => store.jobs);
    return (
        <Wrapper>
            {Array.from({length: numberOfPages}, (_, index) => {
                return (
                    <button key={index} onClick={() => {
                        dispatch(updatePage(index + 1));
                        dispatch(getAllJobs());
                    }} style={{backgroundColor: page === (index + 1) && 'lightcoral'}}>{index + 1}</button>
                );
            })}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    text-align: center;
    button {
        padding: 0.5rem;
        margin-right: 0.5rem;
    }
`;

export default PaginationBox;