import React from 'react';
import { TaskPriority } from '../../store/tasks/tasks.types';
import TaskList from '../task-list/task-list.component';
import './task-category.styles.scss';

const TaskCategory = ({ taskPriority, tasks, users }: any) => {

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

  const getCategoryName = (priority: TaskPriority = TaskPriority.Normal): string => {
    switch (priority) {
      case TaskPriority.Normal:
        return 'Normal';

      case TaskPriority.Mid:
        return 'Medium';

      case TaskPriority.High:
        return 'High';

      default: return 'Normal';
    }
  }

  return (
    <div className='task-category-container'>
      <div className='task-category'>
        <div className='header' style={{ backgroundColor: getListColor(taskPriority as TaskPriority) }}>
          { getCategoryName(taskPriority) }
        </div>
        <div className='task-list-container'>
          <TaskList taskPriority={taskPriority} tasks={tasks} users={users} />
        </div>
      </div>
    </div>
  )
}

export default TaskCategory;
