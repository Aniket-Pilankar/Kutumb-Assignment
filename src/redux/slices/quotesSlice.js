import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../axios/axiosInstance';

export const fetchQuotes = createAsyncThunk(
  'quotes/fetchQuotes',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
      );
      console.log('response:', response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    quotes: [],
  },
  reducers: {
    clearQuotes: (state) => {
      state.quotes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {})
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.quotes = [...state.quotes, ...action.payload];
      })
      .addCase(fetchQuotes.rejected, (state, action) => {});
  },
});

export default quotesSlice.reducer;
