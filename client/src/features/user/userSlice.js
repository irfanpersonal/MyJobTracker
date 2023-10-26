import {createSlice} from '@reduxjs/toolkit';
import {addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage} from '../../utils';
import {registerUser, loginUser, updateUser} from './userThunk.js';
import {toast} from 'react-toastify';

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage()
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            state.user = null;
            removeUserFromLocalStorage();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            addUserToLocalStorage(action.payload);
            toast.success('Successfully Created Account!');
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            addUserToLocalStorage(action.payload);
            toast.success('Successfully Logged In!');
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(updateUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            addUserToLocalStorage(action.payload);
            toast.success('Updated Account!');
        }).addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        });
    }
});

export const {logoutUser} = userSlice.actions;

export default userSlice.reducer;