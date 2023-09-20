import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Your Unsplash API key
const api_key = 'jUKLzEKV55AQcMZESporYIjUg_DbiMZTwllqjJZ1tU4';

/**
 * Thunk to fetch the images from Unsplash.
 */
export const fetchPhotos = createAsyncThunk('photos', async (_, thunkAPI) => {
  try {
    const perPage = 28;
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=nature&per_page=${perPage}&client_id=${api_key}`);
    return response.data.results;
  } catch (err) {
    const message = (err.response && err.response.data) || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

