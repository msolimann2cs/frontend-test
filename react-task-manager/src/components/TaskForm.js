import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import './TaskForm.css';

// Form component for creating new tasks
function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Handle form submission and create new task
  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim() === '') return;

    // Dispatch new task with unique ID
    dispatch(addTask({
      id: uuidv4(),
      title,
      priority,
      completed: false,
    }));

    // Reset form after submission
    setTitle('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
