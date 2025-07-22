import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/songs/';

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async ({ page = 1, search = '', ordering = '' } = {}, { rejectWithValue }) => {
    try {
        const params = new URLSearchParams();
        if (page) params.append('page', page);
        if (search) params.append('search', search);
        if (ordering) params.append('ordering', ordering);
        const response = await axios.get(`${API_URL}?${params.toString()}`);
        return response.data; // Expect { results: [], count, next, previous }
    } catch (error) {
        console.error('Fetch songs error:', error.message, error.response?.data);
        return rejectWithValue(error.message);
    }
});

export const addSong = createAsyncThunk('songs/addSong', async (songData, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, songData);
        return response.data;
    } catch (error) {
        console.error('Add song error:', error.message, error.response?.data);
        return rejectWithValue(error.message);
    }
});

export const updateSong = createAsyncThunk('songs/updateSong', async ({ id, updatedSong }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}${id}/`, updatedSong);
        return response.data;
    } catch (error) {
        console.error('Update song error:', error.message, error.response?.data);
        return rejectWithValue(error.message);
    }
});

export const deleteSong = createAsyncThunk('songs/deleteSong', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}${id}/`);
        return id;
    } catch (error) {
        console.error('Delete song error:', error.message, error.response?.data);
        return rejectWithValue(error.message);
    }
});

const songSlice = createSlice({
    name: 'songs',
    initialState: {
        list: [],
        count: 0,
        next: null,
        previous: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addSong.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateSong.fulfilled, (state, action) => {
                const index = state.list.findIndex((song) => song.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteSong.fulfilled, (state, action) => {
                state.list = state.list.filter((song) => song.id !== action.payload);
            });
    },
});

export default songSlice.reducer;