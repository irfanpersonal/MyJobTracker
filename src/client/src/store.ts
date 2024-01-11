import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import navigationReducer from './features/navigation/navigationSlice';
import jobReducer from './features/job/jobSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        navigation: navigationReducer,
        job: jobReducer
    }
});

export type useSelectorType = ReturnType<typeof store.getState>;

export type useDispatchType = typeof store.dispatch;

export default store;