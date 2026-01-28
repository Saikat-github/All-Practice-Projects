import {configureStore} from "@reduxjs/toolkit";
import passwordReducer from '../features/password/passwordSlice'

export const store = configureStore({
    reducer: passwordReducer
})