import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import jobsReducer from './features/jobs/jobsSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobsReducer
    }
});

export default store;