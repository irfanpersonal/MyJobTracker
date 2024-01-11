import {createSlice} from "@reduxjs/toolkit";
import {getCurrentPageLocation} from '../../utils';
import {createJob, deleteSingleJob, getSingleJob, updateSingleJob} from "../job/jobThunk";
import {logoutUser} from "../user/userThunk";

interface INavigationSliceInitialState {
    location: string
}

const initialState: INavigationSliceInitialState = {
    location: getCurrentPageLocation()
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState, 
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createJob.fulfilled, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        }).addCase(getSingleJob.rejected, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        }).addCase(deleteSingleJob.fulfilled, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        }).addCase(updateSingleJob.fulfilled, (state, action) => {
            state.location = state.location === `/job/${action.payload.job._id}` ? `/job/${action.payload.job._id}#` : `/job/${action.payload.job._id}`;
        }).addCase(logoutUser.fulfilled, (state) => {
            state.location = state.location === '/landing' ? '/landing#' : '/landing';
        });
    }
});

export const {} = navigationSlice.actions;

export default navigationSlice.reducer;