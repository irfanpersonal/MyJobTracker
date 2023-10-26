import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {isEditingFalse, resetJobValues, updateJobValues} from '../features/jobs/jobsSlice';
import {createJob, editSingleJob} from '../features/jobs/jobsThunk.js';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const AddJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isEditing, editJobValues} = useSelector(store => store.jobs);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            if (!editJobValues.name || !editJobValues.company || !editJobValues.status) {
                toast.error('Please fill out all fields!');
                return;
            }
            dispatch(editSingleJob({jobID: editJobValues.id, job: editJobValues}));
            dispatch(resetJobValues());
            return;
        }
        if (!editJobValues.name || !editJobValues.company) {
            toast.error('Please fill out all fields!');
            return;
        }
        dispatch(createJob({name: editJobValues.name, company: editJobValues.company}));
        dispatch(resetJobValues());
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1 style={{textAlign: 'center', backgroundColor: 'lightcoral', borderBottom: '1px solid black'}}>{isEditing ? 'Edit Job' : 'Add Job'}</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={editJobValues.name} onChange={(event) => dispatch(updateJobValues({name: event.target.name, value: event.target.value}))}/>
                </div>
                <div>
                    <label htmlFor="company">Company</label>
                    <input id="company" type="text" name="company" value={editJobValues.company} onChange={(event) => dispatch(updateJobValues({name: event.target.name, value: event.target.value}))}/>
                </div>
                {isEditing && (
                    <div>
                        <label htmlFor="status">Status</label>
                        <input id="status" type="text" name="status" value={editJobValues.status} onChange={(event) => dispatch(updateJobValues({name: event.target.name, value: event.target.value}))}/>
                    </div>
                )}
                <button type="button" onClick={() => {
                    dispatch(resetJobValues());
                    dispatch(isEditingFalse());
                }}>CLEAR</button>
                <button>SUBMIT</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        width: 50%;
        padding: 1rem;
        border: 1px solid black;
    }
    label, button {
        margin-top: 1rem;
    }
    label, input {
        display: block;
    }
    button, input {
        width: 100%;
        padding: 0.5rem;
    }
`;

export default AddJob;