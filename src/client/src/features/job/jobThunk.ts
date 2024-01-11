import {createAsyncThunk} from "@reduxjs/toolkit";
import {type useSelectorType} from "../../store";
import axios from "axios";

export const getAllJobs = createAsyncThunk('job/getAllJobs', async(_, thunkAPI) => {
    try {
        const {searchBoxValues, page} = (thunkAPI.getState() as useSelectorType).job;
        const response = await axios.get(`/api/v1/job?search=${searchBoxValues.search}&status=${searchBoxValues.status}&sort=${searchBoxValues.sort}&page=${page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const createJob = createAsyncThunk('job/createJob', async(jobData: FormData, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/job', jobData);
        const data = response.data;
        return data.job;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleJob = createAsyncThunk('job/getSingleJob', async(jobID: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/job/${jobID}`);
        const data = response.data;
        return data.job;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteSingleJob = createAsyncThunk('job/deleteSingleJob', async(jobID: string, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/v1/job/${jobID}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleJobForEdit = createAsyncThunk('job/getSingleJobForEdit', async(jobID: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/job/${jobID}`);
        const data = response.data;
        return data.job;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateSingleJob = createAsyncThunk('job/updateSingleJob', async(jobData: {id: string, jobValues: FormData}, thunkAPI) => {
    try {
        const response = await axios.patch(`/api/v1/job/${jobData.id}`, jobData.jobValues);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});