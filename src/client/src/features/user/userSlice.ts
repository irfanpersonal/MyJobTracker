import {createSlice} from "@reduxjs/toolkit";
import {registerUser, loginUser, showCurrentUser, logoutUser, updateUser, updateUserPassword, deleteAccount} from "./userThunk";
import {toast} from 'react-toastify';

interface IUserSliceInitialState {
    wantsToRegister: boolean,
    user: {userID: string, name: string, email: string} | null,
    globalLoading: boolean,
    authLoading: boolean,
    logoutLoading: boolean,
    updateUserLoading: boolean,
    deleteAccountLoading: boolean
}

const initialState: IUserSliceInitialState = {
    wantsToRegister: true,
    user: null,
    globalLoading: true,
    authLoading: false,
    logoutLoading: false,
    updateUserLoading: false,
    deleteAccountLoading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleAuthType: (state) => {
            state.wantsToRegister = !state.wantsToRegister;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.authLoading = false;
            state.user = action.payload;
            toast.success('Successfully Registered User!');
        }).addCase(registerUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(loginUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.authLoading = false;
            state.user = action.payload;
            toast.success('Successfully Logged In!');
        }).addCase(loginUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(showCurrentUser.pending, (state) => {
            state.globalLoading = true;
        }).addCase(showCurrentUser.fulfilled, (state, action) => {
            state.globalLoading = false;
            state.user = action.payload; 
        }).addCase(showCurrentUser.rejected, (state) => {
            state.globalLoading = false;
        }).addCase(logoutUser.pending, (state) => {
            state.logoutLoading = true;
        }).addCase(logoutUser.fulfilled, (state) => {
            state.logoutLoading = false;
            toast.success('Successfully Logged Out!');
        }).addCase(logoutUser.rejected, (state) => {
            state.logoutLoading = false;
        }).addCase(updateUser.pending, (state) => {
            state.updateUserLoading = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.updateUserLoading = false;
            state.user = action.payload; 
            toast.success('Updated User!');
        }).addCase(updateUser.rejected, (state) => {
            state.updateUserLoading = false;
        }).addCase(updateUserPassword.pending, (state) => {
            state.updateUserLoading = true;
        }).addCase(updateUserPassword.fulfilled, (state, action) => {
            state.updateUserLoading = false;
            state.user = action.payload;
            toast.success('Updated User Password!');
        }).addCase(updateUserPassword.rejected, (state, action) => {
            state.updateUserLoading = false;
            toast.error(action.payload as string);
        }).addCase(deleteAccount.pending, (state) => {
            state.deleteAccountLoading = true;
        }).addCase(deleteAccount.fulfilled, (state) => {
            state.deleteAccountLoading = false;
            state.user = null;
            toast.success('Logged Out!');
        }).addCase(deleteAccount.rejected, (state, action) => {
            state.deleteAccountLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {toggleAuthType} = userSlice.actions;

export default userSlice.reducer;