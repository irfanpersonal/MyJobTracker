import styled from 'styled-components';
import JobListItem from "./JobListItem";
import {type JobsType} from '../features/job/jobSlice';
import {useSelector} from 'react-redux';
import {type useSelectorType} from '../store';

interface JobListProps {
    data: JobsType[]
}

const JobList: React.FunctionComponent<JobListProps> = ({data}) => {
    const {totalJobs} = useSelector((store: useSelectorType) => store.job);
    return (
        <Wrapper>
            <h1 style={{marginBottom: '1rem'}}>{totalJobs} Job{totalJobs! > 1 && 's'} Found...</h1>
            {data.map(item => {
                return (
                    <JobListItem key={item._id} data={item}/>
                );
            })}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    padding: 1rem;
    background-color: rgb(229, 225, 218);
    border-radius: 0.5rem;
    margin-top: 1rem;
`;

export default JobList;