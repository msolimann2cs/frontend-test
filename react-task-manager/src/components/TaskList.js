import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import './TaskList.css';    

// Component that displays filtered list of tasks
function TaskList() {
  const { list, filter } = useSelector(state => state.tasks);

  // Filter tasks based on selected priority filter
  const filteredTasks = list.filter(task => {
    if (filter === 'All') return true;
    return task.priority === filter;
  });

  return (
    <ul className='task-list'>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
