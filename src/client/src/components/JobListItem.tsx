import styled from 'styled-components';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {type JobsType} from '../features/job/jobSlice';

interface JobListItemProps {
    data: JobsType
}

const JobListItem: React.FunctionComponent<JobListItemProps> = ({data}) => {
    return (
        <Wrapper to={`/job/${data._id}`}>
            <div className="container">
                <div className="circle" style={{backgroundColor: data.status === 'pending' ? 'rgb(253, 255, 171)' : data.status === 'interview' ? 'rgb(128, 188, 189)' : data.status === 'rejected' ? 'rgb(255, 185, 150)' : data.status === 'accepted' ? 'rgb(217, 237, 191)' : 'black'}}></div>
                <h1>{data.name} at {data.company}</h1>
            </div>
            <h1>{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h1>
        </Wrapper>
    );
}

const Wrapper = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: black;
    border: 1px solid black;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .circle {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: black;
        margin-right: 1rem;
        border: 1px solid black;
    }
    &:hover {
        background-color: white;
    }
`;

export default JobListItem;