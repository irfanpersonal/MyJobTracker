import {createAsyncThunk} from "@reduxjs/toolkit";
import customFetch from "../../utils";
import { logoutUser } from "../user/userSlice";

export const showStats = createAsyncThunk('jobs/showStats', async(_, thunkAPI) => {
    try {
        const response = await customFetch.get('/jobs/stats');
        const data = response.data;
        return data;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getAllJobs = createAsyncThunk('jobs/getAllJobs', async(_, thunkAPI) => {
    try {
        const {search, status, sort, page} = thunkAPI.getState().jobs;
        const response = await customFetch.get(`/jobs?search=${search}&status=${status}&sort=${sort}&page=${page}`);
        const data = response.data;
        return data;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteJob = createAsyncThunk('jobs/deleteJob', async(jobID, thunkAPI) => {
    try {
        const response = await customFetch.delete(`/jobs/${jobID}`);
        const data = response.data;
        thunkAPI.dispatch(getAllJobs());
        return data.job;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleJob = createAsyncThunk('jobs/getSingleJob', async(jobID, thunkAPI) => {
    try {
        const response = await customFetch.get(`/jobs/${jobID}`);
        const data = response.data;
        return data.job;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const editSingleJob = createAsyncThunk('jobs/editSingleJob', async({jobID, job}, thunkAPI) => {
    try {
        const response = await customFetch.patch(`/jobs/${jobID}`, job);
        const data = response.data;
        return data.job;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const createJob = createAsyncThunk('jobs/createJob', async(job, thunkAPI) => {
    try {
        const response = await customFetch.post('/jobs', job);
        const data = response.data;
        return data.job;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});