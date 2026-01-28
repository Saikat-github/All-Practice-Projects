import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    passwords: JSON.parse(localStorage.getItem("passwords")) || []
}

export const passwordSlice = createSlice({
    name: "passwords",
    initialState,
    reducers: {
        addPassword: (state, action) => {
            state.passwords.push(action.payload);
            localStorage.setItem("passwords", JSON.stringify(state.passwords))
        },
        deletePassword: (state, action) => {
            state.passwords = state.passwords.filter((e) => e.website != action.payload);
            localStorage.setItem("passwords", JSON.stringify(state.passwords))
        }
    }
});

export const {addPassword, deletePassword} = passwordSlice.actions;
export default passwordSlice.reducer;