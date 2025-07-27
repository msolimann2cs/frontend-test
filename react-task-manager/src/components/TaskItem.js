import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTask, editTask } from '../redux/taskSlice';  
import './TaskItem.css';
import { motion } from 'framer-motion';

// Component for displaying and managing individual tasks
function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  // Save edited task details
  const handleSave = () => {
    dispatch(editTask({ id: task.id, title, priority }));
    setIsEditing(false);
  };

  return (
    // Animated list item with fade and slide effects
    <motion.li className='task-item'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}>
      {/* Task completion toggle */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleComplete(task.id))}
      />
      {isEditing ? (
        // Edit mode
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <div className="task-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        // Display mode 
        <>
          <span className={`task-text ${task.completed ? 'completed' : ''}`}>
            {task.title} ({task.priority})
          </span>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </div>
        </>
      )}
    </motion.li>
  );
}

export default TaskItem;
