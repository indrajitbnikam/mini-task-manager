import React from 'react'
import TaskCategory from '../task-category/task-category.component'
import './tasks-container.styles.scss'

const TasksContainer = () => {
  return (
    <div className='tasks-container'>
      <div className='task-categories-container'>
        <TaskCategory />
        <TaskCategory />
        <TaskCategory />
        <TaskCategory />
      </div>
    </div>
  )
}

export default TasksContainer
