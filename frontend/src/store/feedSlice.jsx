import {createSlice} from "@reduxjs/toolkit"

const feedSlice = createSlice({
    name : "feed",
    initialState : [],
    reducers : {
        addFeed: (state,action)=> action.payload,

        removeUserFromFeed(state,action){
            const feed = state.filter(user=>user._id!=action.payload)
            return feed;
        },
    }
})

export default feedSlice.reducer;
export const {addFeed , removeUserFromFeed} = feedSlice.actions;