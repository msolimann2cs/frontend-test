import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice'; // make sure this path is correct

const store = configureStore({
  reducer: {
    tasks: taskReducer, // this must be a valid reducer
  },
});

export default store;
