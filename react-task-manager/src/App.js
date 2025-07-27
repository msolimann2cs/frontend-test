import React, { useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import './App.css';
import { useSelector } from 'react-redux';

// Main app component that manages tasks 
function App() {
  const tasks = useSelector(state => state.tasks.list);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <h1>Task Manager</h1>
        <TaskForm />      {/* Form for adding new tasks */}
        <FilterBar />    {/* Filter tasks by status */}
        <TaskList />     {/* Display list of tasks */}
      </div>
    </div>
  );
}

export default App;
