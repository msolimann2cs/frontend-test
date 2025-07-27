import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/taskSlice';
import './FilterBar.css';


function FilterBar() {
  const dispatch = useDispatch();
  const current = useSelector(state => state.tasks.filter);
  const filters = ['All', 'High', 'Medium', 'Low'];

  return (
    <div className='filter-bar'>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => dispatch(setFilter(f))}
          style={{ marginRight: '10px', fontWeight: current === f ? 'bold' : 'normal' }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
