import {useSelector} from "react-redux";
import JobsListItem from "./JobsListItem.js";

const JobsList = ({data}) => {
    const {totalJobs} = useSelector(store => store.jobs);
    return (
        <section style={{margin: '1rem 0'}}>
            <h2>{totalJobs} Job{totalJobs > 1 && 's'} Found!</h2>
            {data.map(item => {
                return <JobsListItem key={item._id} data={item}/>
            })}
        </section>
    );
}

export default JobsList;