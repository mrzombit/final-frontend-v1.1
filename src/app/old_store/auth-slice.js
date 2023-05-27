import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    // eslint-disable-next-line no-undef
    initialState: { isLoggedIn: false },
    reducer: {
        login(state) { 
            state.isLoggedIn = true;
        },
        logout(state) { 
            state.isLoggedIn = false;
        },
    }
})

export const authAction = authSlice.actions;

export default authSlice;