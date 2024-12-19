import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../axios/axiosInstance';

export const fetchQuotes = createAsyncThunk(
  'quotes/fetchQuotes',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const uploadFileGetMediaURL = createAsyncThunk(
  'quotes/uploadFileGetMediaURL',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post(
        `https://crafto.app/crafto/v1.0/media/assignment/upload`,
        formData,
      );
      return response.data[0].url;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  },
);

export const postQuote = createAsyncThunk(
  'quotes/postQuote',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`https://assignment.stage.crafto.app/postQuote`, {
        text: payload.newQuote,
        mediaUrl: payload.fileURL,
      });

      return response;
    } catch (error) {
      rejectWithValue(error);
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
