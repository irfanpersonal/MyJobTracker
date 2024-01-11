import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface IUserData {
    name?: string,
    email: string,
    password: string
}

export const registerUser = createAsyncThunk('user/registerUser', async(userData: IUserData, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/auth/register', userData);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async(userData: IUserData, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/auth/login', userData);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const showCurrentUser = createAsyncThunk('user/showCurrentUser', async(_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/user/showCurrentUser');
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async(_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/auth/logout');
        const data = response.data;
        return data;
    }   
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async(userData: {name: string, email: string}, thunkAPI) => {
    try {
        const response = await axios.patch('/api/v1/user/updateUser', userData);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateUserPassword = createAsyncThunk('user/updateUserPassword', async(userData: {oldPassword: string, newPassword: string}, thunkAPI) => {
    try {
        const response = await axios.patch('/api/v1/user/updateUserPasssword', userData);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteAccount = createAsyncThunk('user/deleteAccount', async(input: {password: string}, thunkAPI) => {
    try {
        const response = await axios.delete('/api/v1/user/deleteAccount', {data: input});
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});