import {useDispatch, useSelector} from "react-redux";
import {getAllJobs} from "../features/jobs/jobsThunk.js";
import React from 'react';
import styled from 'styled-components';
import {SearchBox, JobsList, PaginationBox} from "../components";

const AllJobs = () => {
    const dispatch = useDispatch();
    const {isLoading, jobs} = useSelector(store => store.jobs);
    React.useEffect(() => {
        dispatch(getAllJobs());
    }, []);
    if (isLoading) {
        return (
            <Wrapper>
                <h1>Loading...</h1>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h1>All Jobs</h1>
            <SearchBox/>
            <JobsList data={jobs}/>
            <PaginationBox/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    h1 {
        text-align: center;
        background-color: lightcoral;
        border-bottom: 1px solid black;
        margin-bottom: 1rem;
    }
`;

export default AllJobs;