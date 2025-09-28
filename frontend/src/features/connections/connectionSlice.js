import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";


const initialState = {
    connections :[],
    pendingConnection : [],
    followers :[],
    following : []


}



 export const  fetchConnections = createAsyncThunk('connections/fetchConnections', async (token) => {
    const { data } = await api.get('/api/user/connections', {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log('API response for connections:', data);
    return data.success ? data : null;
})

export const connectionSlice = createSlice({
    name : "connections", 
    initialState, 
    reducer :{

    },
    extraReducers :(builder)=>{
        builder.addCase(fetchConnections.fulfilled, (state , action)=>{
            if(action.payload){
                state.connections = action.payload.connections;
                state.pendingConnections = action.payload.pendingConnections;
                state.followers = action.payload.followers;
                state.following = action.payload.following;
            }
        })
    }
})

export default connectionSlice.reducer