import {configureStore} from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice.js"
import connectionReducer from "../features/connections/connectionSlice.js"
import messageReducer from "../features/messges/messageSlice.js"

export const store = configureStore({
    reducer  :{
        user : userReducer,
        connections : connectionReducer, 
        message : messageReducer
    }, 
})


