import React from 'react';
import { TaskPriority } from '../../store/tasks/tasks.types';
import TaskCardSmall from '../task-card-small/task-card-small.components';
import './task-list.styles.scss';

const TaskList = () => {

  const getListColor = (priority: TaskPriority = TaskPriority.High): string => {
    switch (priority) {
      case TaskPriority.Normal:
        return '#75d616';

      case TaskPriority.Mid:
        return '#d6ba16';

      case TaskPriority.High:
        return '#d6531f';

      default: return '#dadada';
    }
  }

  return (
    <div className='task-list'>
      <div className='header' style={{ backgroundColor: getListColor()}}>
        Header
      </div>
      <div className='task-cards-container'>
        <TaskCardSmall />
      </div>
    </div>
  )
}

export default TaskList
