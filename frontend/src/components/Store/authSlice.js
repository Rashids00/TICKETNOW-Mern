import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            window.localStorage.setItem('user',JSON.stringify(action.payload))
        },
        removeUser: (state)=>{
            state.user = null;
            window.localStorage.removeItem('user')
        },
        setUserFromLocalStorage: (state)=>{
            var user = window.localStorage.getItem('user');
            if(user){
                user = JSON.parse(user);
                state.user = user;
            }else{
                state.user = null;
            }
        }
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: null
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
            window.localStorage.setItem('admin',JSON.stringify(action.payload))
        },
        removeAdmin: (state)=>{
            state.admin = null;
            window.localStorage.removeItem('admin')
        },
        setAdminFromLocalStorage: (state)=>{
            var admin = window.localStorage.getItem('admin');
            if(admin){
                admin = JSON.parse(admin);
                state.admin = admin;
            }else{
                state.admin = null;
            }
        }
    }
});

export const {setUser, removeUser, setUserFromLocalStorage} = userSlice.actions
export const {setAdmin, removeAdmin, setAdminFromLocalStorage} = adminSlice.actions

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin: adminSlice.reducer
    }
});
