import { createSlice } from '@reduxjs/toolkit';

// Load initial tasks from localStorage or start with empty list
const initialState = {
  list: JSON.parse(localStorage.getItem('tasks')) || [],
  filter: 'All',
};

// Slice for managing tasks state
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add a new task to the list
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    // Toggle task completion status
    toggleComplete: (state, action) => {
      const task = state.list.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    // Remove a task from the list
    deleteTask: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
    // Update task title and priority
    editTask: (state, action) => {
      const { id, title, priority } = action.payload;
      const task = state.list.find(t => t.id === id);
      if (task) {
        task.title = title;
        task.priority = priority;
      }
    },
    // Update the current filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // Replace entire task list (used for loading saved tasks)
    setTasks: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {
  addTask,
  toggleComplete,
  deleteTask,
  editTask,
  setFilter,
  setTasks,
} = taskSlice.actions;

export default taskSlice.reducer; 
