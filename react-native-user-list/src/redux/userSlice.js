import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async action to fetch users from API and handle caching
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    // Try to fetch data from API
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    // Cache the response 
    await AsyncStorage.setItem('cachedUsers', JSON.stringify(data));
    return data;
  } catch (err) {
    // If API call fails, load cached data
    const cached = await AsyncStorage.getItem('cachedUsers');
    if (cached) return JSON.parse(cached);
    return thunkAPI.rejectWithValue('Failed to fetch users');
  }
});

// Redux slice for managing user data
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  extraReducers: builder => {
    builder
      // Handle the loading state
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      // Handle successful API response
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the formatted address to each user
        state.users = action.payload.map(user => ({
          ...user,
          fullAddress: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
        }));
      })
      // Handle API errors
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default userSlice.reducer;
