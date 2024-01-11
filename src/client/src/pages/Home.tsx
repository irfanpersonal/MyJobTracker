import React from 'react';
import styled from 'styled-components';
import {getAllJobs} from '../features/job/jobThunk';
import {useDispatch, useSelector} from 'react-redux';
import {useDispatchType, useSelectorType} from '../store';
import {SearchBox, Loading, JobList, Title, PaginationBox} from '../components';

const Home: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {jobLoading, jobs, totalJobs, numberOfPages} = useSelector((store: useSelectorType) => store.job);
    React.useEffect(() => {
        dispatch(getAllJobs());
    }, []);
    return (
        <Wrapper>
            <SearchBox/>
            {jobLoading ? (
                <Loading title='Getting All Jobs' position='normal' marginTop='1rem'/>
            ) : (
                <> 
                    {totalJobs === 0 ? (
                        <Title text='Nothing Found!' marginTop='1rem' borderBottom={false}/>
                    ) : (
                        <JobList data={jobs}/>
                    )}
                    {numberOfPages! > 1 && (
                        <PaginationBox/>
                    )}
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`

`;

export default Home;