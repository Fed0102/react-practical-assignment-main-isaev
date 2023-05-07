import {createSlice} from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        id: 100,
    },
    reducers: {
        addUser(state, action){
            state.login = action.payload;
        },
        deleteUser(state){
            state.login = '';
        }
    }})

export const {addUser, deleteUser} = LoginSlice.actions;
export default LoginSlice.reducer;