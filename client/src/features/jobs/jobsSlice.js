import {createSlice} from '@reduxjs/toolkit';
import {showStats, getAllJobs, deleteJob, getSingleJob, editSingleJob, createJob} from './jobsThunk.js';
import {toast} from 'react-toastify';

const initialState = {
    isLoading: false,
    jobs: [],
    statValues: {},
    search: '',
    status: '',
    sort: '',
    page: 1,
    totalJobs: '',
    numberOfPages: '',
    isEditing: false,
    editJobValues: {
        name: '',
        company: '',
        status: '',
        id: ''
    }
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        updateSearchInput: (state, action) => {
            state.page = 1;
            state[action.payload.name] = action.payload.value;
        },
        updatePage: (state, action) => {
            state.page = action.payload;
        },
        isEditingTrue: (state, action) => {
            state.isEditing = true;
        },
        isEditingFalse: (state, action) => {
            state.isEditing = false;
        },
        updateJobValues: (state, action) => {
            state.editJobValues[action.payload.name] = action.payload.value;
        },
        resetJobValues: (state, action) => {
            state.editJobValues = {
                name: '',
                company: '',
                status: '',
                id: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(showStats.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(showStats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.statValues = action.payload;
        }).addCase(showStats.rejected, (state, action) => {
            state.isLoading = false;
        }).addCase(getAllJobs.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllJobs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.jobs = action.payload.jobs;
            state.totalJobs = action.payload.totalJobs;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllJobs.rejected, (state, action) => {
            state.isLoading = false;
        }).addCase(deleteJob.fulfilled, (state, action) => {
            toast.success('Deleted Job!');
        }).addCase(deleteJob.rejected, (state, action) => {
            toast.error(action.payload);
        }).addCase(getSingleJob.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getSingleJob.fulfilled, (state, action) => {
            state.isLoading = false;
            state.editJobValues.name = action.payload.name;
            state.editJobValues.company = action.payload.company;
            state.editJobValues.status = action.payload.status;
            state.editJobValues.id = action.payload._id;
        }).addCase(getSingleJob.rejected, (state, action) => {
            state.isLoading = false;
        }).addCase(editSingleJob.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(editSingleJob.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Edited Job!');
        }).addCase(editSingleJob.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(createJob.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createJob.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Created Job!');
        }).addCase(createJob.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
    }
});

export const {updateSearchInput, updatePage, isEditingTrue, isEditingFalse, updateJobValues, resetJobValues} = jobsSlice.actions;

export default jobsSlice.reducer;