import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {useDispatchType, useSelectorType} from '../store';
import {Loading, ViewPDF} from '../components';
import {deleteSingleJob, getSingleJob, getSingleJobForEdit} from '../features/job/jobThunk';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {FaArrowAltCircleLeft, FaEdit, FaRegTrashAlt, FaBuilding, FaMoneyBillWave, FaMapMarkerAlt, FaEnvelope, FaClipboardList, FaRegCalendarAlt} from "react-icons/fa";
import {setIsEditingTrue} from '../features/job/jobSlice';

const Job: React.FunctionComponent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<useDispatchType>();
    const {getSingleJobLoading, singleJob} = useSelector((store: useSelectorType) => store.job);
    React.useEffect(() => {
        dispatch(getSingleJob(id as string));
    }, []);
    return (
        <Wrapper>
            {getSingleJobLoading ? (
                <Loading position='normal' title='Getting Single Job'/>
            ) : (
                <>
                    <div className="menu-bar">
                        <Link to='/'>
                            <FaArrowAltCircleLeft className="icon" />
                        </Link>
                        <div>
                            <h1>Viewing Single Job</h1>
                        </div>
                        <div>
                            <FaEdit onClick={() => {
                                navigate('/add-job');
                                dispatch(setIsEditingTrue());
                                dispatch(getSingleJobForEdit(id as string));
                                // Add Code Here ...
                            }} className="icon"/>
                            <FaRegTrashAlt onClick={() => {
                                dispatch(deleteSingleJob(singleJob!._id as string));
                            }} style={{marginLeft: '1rem'}} className="icon"/>
                        </div>
                    </div>
                    <div className="container">
                        <h1 className="company-name">{singleJob!.company}</h1>
                        <div className="job-details">
                            <div className="detail">
                                <FaBuilding className="detail-icon"/>
                                <span>Name: {singleJob!.name}</span>
                            </div>
                            <div className="detail">
                                <FaMoneyBillWave className="detail-icon"/>
                                <span>Salary: {singleJob!.salary}</span>
                            </div>
                            <div className="detail">
                                <FaMapMarkerAlt className="detail-icon"/>
                                <span>Location: {singleJob!.location}</span>
                            </div>
                            <div style={{cursor: 'pointer'}} className="detail" onClick={() => window.location.href = `mailto:${singleJob!.email}`}>
                                <FaEnvelope className="detail-icon"/>
                                <span>Email: {singleJob!.email}</span>
                            </div>
                            <div className="detail">
                                <FaClipboardList className="detail-icon"/>
                                <span>Status: {singleJob!.status.toUpperCase()}</span>
                            </div>
                            <div className="detail">
                                <FaRegCalendarAlt className="detail-icon"/>
                                <span>Created At: {moment(singleJob!.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                            </div>
                        </div>
                    </div>
                    <ViewPDF location={singleJob!.resume}/>
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    a {
        color: black;
        text-decoration: none;
    }
    .menu-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(229, 225, 218);
        padding: 1rem;
    }
    .icon {
        font-size: 1.5rem;
        cursor: pointer;
    }
    .container {
        margin-top: 1rem;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }
    .company-name {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid black;
    }
    .job-details {
        display: flex;
        flex-direction: column;
        .detail {
            display: flex;
            align-items: center;
            margin: 1rem 0;
            .detail-icon {
                margin-right: 0.5rem;
                font-size: 1.5rem;
            }
        }
    }
`;

export default Job;
