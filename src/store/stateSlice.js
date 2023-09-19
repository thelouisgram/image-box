import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotos } from "./stateAction";

// Define actionArray with action creators and corresponding data names
export const actionArray = [
  { action: fetchPhotos, data: "photos" },
];

// Define initial state based on actionArray
const initialState = {};
actionArray.forEach(({ data }) => {
  initialState[data] = {
    loading: false,
    success: false,
    message: "",
    error: false,
    data: [],
  };
});

const stateSlice = createSlice({
  name: "app",
  initialState: {
    ...initialState, 
    searchedWord: '',
    refinedData: []
    },
    reducers: {
      setRefinedData: (state, action) =>{
        state.refinedData = action.payload
      }
    },
  extraReducers: (builder) => {
    actionArray.forEach(({ action, data }) => {
      builder
        .addCase(action.pending, (state) => {
          state[data].loading = true;
        })
        .addCase(action.fulfilled, (state, action) => {
          state[data].loading = false;
          state[data].data = action.payload;
          state[data].success = true;
        })
        .addCase(action.rejected, (state, action) => {
          state[data].loading = false;
          state[data].error = true;
          state[data].message = action.payload;
        });
    });
  },
});

export default stateSlice.reducer;
export const {setRefinedData} = stateSlice.actions