import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/Counter/CounterSlice';
import UserReducer from '../features/Auth/UserSlice';

const rootReducer = {
    counter: counterReducer,
    user: UserReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store