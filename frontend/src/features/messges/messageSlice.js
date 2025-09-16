import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value : []
}

export const messageSlice = createSlice({
    name :"message", 
    initialState , 
    reducers :{

    }

})

export default messageSlice.reducer;
