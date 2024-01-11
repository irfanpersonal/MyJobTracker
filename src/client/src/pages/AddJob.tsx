import styled from 'styled-components';
import {useDispatchType, useSelectorType} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import {createJob, updateSingleJob} from '../features/job/jobThunk';
import {Loading, Title} from '../components';
import {setIsEditingFalse, updateJobValues} from '../features/job/jobSlice';

const AddJob: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {createJobLoading, isEditing, getSingleJobForEditingLoading, jobValues, updateSingleJobLoading} = useSelector((store: useSelectorType) => store.job);
    const handleChange = (event: React.ChangeEvent) => {
        const inputElement = event.target as HTMLInputElement;
        dispatch(updateJobValues({name: inputElement.name, value: inputElement.value}));
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData();
        formData.append('name', jobValues.name!);
        formData.append('company', jobValues.company!);
        formData.append('status', jobValues.status!);
        formData.append('email', jobValues.email!);
        formData.append('salary', String(jobValues.salary!));
        formData.append('location', jobValues.location!);
        formData.append('resume', formElement.resume.files[0]);
        if (isEditing) {
            dispatch(updateSingleJob({id: jobValues._id!, jobValues: formData}));
            return;
        }
        dispatch(createJob(formData));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Title text={isEditing ? 'Edit Job' : 'Add Job'} borderBottom={true}/>
                {getSingleJobForEditingLoading ? (
                    <Loading title="Getting Single Job for Editing" position='normal'/>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" value={jobValues.name} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="company">Company</label>
                            <input id="company" type="text" name="company" value={jobValues.company} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" value={jobValues.status} onChange={handleChange} required>
                                <option value="pending">Pending</option>
                                <option value="interview">Interview</option>
                                <option value="rejected">Rejected</option>
                                <option value="accepted">Accepted</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="recruiterEmail">Recruiter Email</label>
                            <input id="recruiterEmail" type="email" name="email" value={jobValues.email} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="salary">Salary</label>
                            <input id="salary" type="number" name="salary" min="0" value={jobValues.salary} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="location">Location</label>
                            <input id="location" type="text" name="location" value={jobValues.location} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="resume">Resume</label>
                            <input id="resume" type="file" name="resume"/>
                        </div>
                        {isEditing && (
                            <p>Current Input for Resume: {(jobValues.resume!).slice(jobValues.resume!.lastIndexOf('_') + 1)}</p>
                        )}
                        {isEditing && (
                            <button type="button" onClick={() => {
                                dispatch(setIsEditingFalse());
                            }}>CANCEL</button>
                        )}
                        <button disabled={createJobLoading || updateSingleJobLoading}>{isEditing ? 'EDIT JOB' : 'CREATE JOB'}</button>
                    </>
                )}
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    form {
        display: grid;
        gap: 1rem;
        div {
            display: flex;
            flex-direction: column;
            label {
                margin-bottom: 0.25rem;
            }
            input, select, button {
                margin-top: 0.25rem;
                padding: 0.5rem;
                border: 1px solid black;
                border-radius: 0.25rem;
            }
            input[type="file"] {
                padding: 0;
            }
        }
    }
    button {
        border: none;
        padding: 0.5rem;
        background-color: rgb(217, 237, 191);
        cursor: pointer;
    }
    button:hover, button:active {
        outline: 1px solid black;
        background-color: rgb(253, 255, 171);
    }
`;


export default AddJob;