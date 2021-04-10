import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskType } from '../../store/tasks/tasks.types';
import TaskCardSmall from '../task-card-small/task-card-small.components';
import './task-list.styles.scss';

const TaskList = ({ taskPriority, tasks, users }: any) => {
  return (
    <div className='task-list'>
      <Droppable droppableId={taskPriority}>
        {
          (provided, snapshot) => (
            <div
              className={`task-cards-container ${snapshot.isDraggingOver ? ' isDraggingOver' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {
                tasks.length > 0 ? (
                  (tasks as TaskType[]).map((task, index) => (
                    <TaskCardSmall key={task.id as string} task={task} index={index} users={users}/>
                  ))
                ) : null
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}

export default TaskList
