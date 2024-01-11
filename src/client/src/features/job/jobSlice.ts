import {createSlice} from "@reduxjs/toolkit";
import {createJob, deleteSingleJob, getAllJobs, getSingleJob, getSingleJobForEdit, updateSingleJob} from "./jobThunk";
import {toast} from 'react-toastify';

export type JobsType = {_id: string, name: string, company: string, status: string, email: string, resume: string, location: string, salary: number, createdAt: string, updatedAt: string}

interface IJobSliceInitialState {   
    jobLoading: boolean,
    createJobLoading: boolean,
    getSingleJobLoading: boolean,
    getSingleJobForEditingLoading: boolean,
    updateSingleJobLoading: boolean,
    jobs: JobsType[],
    singleJob: JobsType | null,
    totalJobs: number | null
    numberOfPages: number | null,
    isEditing: boolean,
    searchBoxValues: {
        search: string,
        status: string,
        sort: string
    },
    jobValues: Partial<JobsType>,
    page: number
}

const initialState: IJobSliceInitialState = {
    jobLoading: true,
    createJobLoading: false,
    getSingleJobLoading: true,
    getSingleJobForEditingLoading: false,
    updateSingleJobLoading: false,
    jobs: [],
    singleJob: null,
    totalJobs: null,
    numberOfPages: null,
    isEditing: false,
    searchBoxValues: {
        search: '',
        status: '',
        sort: ''
    },
    jobValues: {
        _id: '',
        name: '',
        company: '',
        email: '',
        location: '',
        status: 'pending',
        salary: 0,
        createdAt: '',
        updatedAt: ''
    },
    page: 1
};

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        updateSearchBoxValues: (state, action) => {
            state.searchBoxValues[action.payload.name as keyof typeof state.searchBoxValues] = action.payload.value;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setIsEditingTrue: (state) => {
            state.isEditing = true;
        },
        setIsEditingFalse: (state) => {
            state.isEditing = false;
            state.jobValues = {
                _id: '',
                name: '',
                company: '',
                email: '',
                location: '',
                status: 'pending',
                salary: 0,
                createdAt: '',
                updatedAt: ''
            };
        },
        updateJobValues: (state, action) => {
            state.jobValues[action.payload.name as keyof typeof state.jobValues] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllJobs.pending, (state) => {
            state.jobLoading = true;
        }).addCase(getAllJobs.fulfilled, (state, action) => {
            state.jobLoading = false;
            state.jobs = action.payload.jobs;   
            state.totalJobs = action.payload.totalJobs;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllJobs.rejected, (state) => {
            state.jobLoading = false;
        }).addCase(createJob.pending, (state) => {
            state.createJobLoading = true;
        }).addCase(createJob.fulfilled, (state) => {
            state.createJobLoading = false;
            state.jobValues = {
                _id: '',
                name: '',
                company: '',
                email: '',
                location: '',
                status: 'pending',
                salary: 0,
                createdAt: '',
                updatedAt: ''
            };
            toast.success('Created Job!');
        }).addCase(createJob.rejected, (state, action) => {
            state.createJobLoading = false;
            toast.error(action.payload as string);
        }).addCase(getSingleJob.pending, (state) => {
            state.getSingleJobLoading = true;
        }).addCase(getSingleJob.fulfilled, (state, action) => {
            state.getSingleJobLoading = false;
            state.singleJob = action.payload;
        }).addCase(getSingleJob.rejected, (state) => {
            state.getSingleJobLoading = true; // We set it to true, so that the navigation slice can redirect us. If we set to false like it usually is then we would get an error with how our front end works. 
        }).addCase(deleteSingleJob.fulfilled, (state) => {
            toast.success('Deleted Job!');
        }).addCase(deleteSingleJob.rejected, (state, action) => {
            toast.error(action.payload as string);
        }).addCase(getSingleJobForEdit.pending, (state) => {
            state.getSingleJobForEditingLoading = true;
        }).addCase(getSingleJobForEdit.fulfilled, (state, action) => {
            state.getSingleJobForEditingLoading = false;
            state.jobValues = action.payload;
        }).addCase(getSingleJobForEdit.rejected, (state) => {
            state.getSingleJobForEditingLoading = false;
        }).addCase(updateSingleJob.pending, (state) => {
            state.updateSingleJobLoading = true;
        }).addCase(updateSingleJob.fulfilled, (state) => {
            state.updateSingleJobLoading = false;
            toast.success('Edited Job!');
        }).addCase(updateSingleJob.rejected, (state, action) => {
            state.updateSingleJobLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {updateSearchBoxValues, setPage, setIsEditingTrue, setIsEditingFalse, updateJobValues} = jobSlice.actions;

export default jobSlice.reducer;