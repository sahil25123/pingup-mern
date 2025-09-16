import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    connections :[],
    pendingConnection : [],
    followers :[],
    following : []
}

export const connectionSlice = createSlice({
    name : "connection", 
    initialState, 
    reducer :{

    }
})

export default connectionSlice.reducer