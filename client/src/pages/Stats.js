import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {showStats} from "../features/jobs/jobsThunk";
import React from 'react';
import {BiBriefcase} from 'react-icons/bi';
import {FaNetworkWired} from 'react-icons/fa';
import {GiCancel} from 'react-icons/gi';
import {AiOutlineCheckCircle} from 'react-icons/ai';

const Stats = () => {
    const dispatch = useDispatch();
    const {isLoading, statValues} = useSelector(store => store.jobs);
    React.useEffect(() => {
        dispatch(showStats());
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
            <h1>Stats</h1>
            <div className="container" style={{backgroundColor: 'rgb(241, 247, 181)'}}>
                <div>Pending</div>
                <div><BiBriefcase/></div>
                <div>{statValues.pending}</div>
            </div>
            <div className="container" style={{backgroundColor: 'rgb(168, 209, 209)'}}>
                <div>Interview</div>
                <div><FaNetworkWired/></div>
                <div>{statValues.interview}</div>
            </div>
            <div className="container" style={{backgroundColor: 'rgb(253, 138, 138)'}}>
                <div>Rejected</div>
                <div><GiCancel/></div>
                <div>{statValues.rejected}</div>
            </div>
            <div className="container" style={{backgroundColor: 'rgb(167, 211, 151)'}}>
                <div>Accepted</div>
                <div><AiOutlineCheckCircle/></div>
                <div>{statValues.accepted}</div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    h1 {
        background-color: lightcoral;
        border-bottom: 1px solid black;
    }
    div {
        margin: 1rem 0;
        font-weight: bolder;
        font-size: 1.5rem;
    }
    .container {
        border: 1px solid black;
    }
    text-align: center;
`;

export default Stats;