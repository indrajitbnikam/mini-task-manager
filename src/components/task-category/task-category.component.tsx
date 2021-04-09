import React from 'react';
import TaskList from '../task-list/task-list.component';
import './task-category.styles.scss';

const TaskCategory = () => {
  return (
    <div className='task-category'>
      <TaskList />
    </div>
  )
}

export default TaskCategory
