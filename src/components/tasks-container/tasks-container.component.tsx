import { message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateTask } from '../../services/api.service';
import { AllActionType } from '../../store/store.types';
import { refreshTasks } from '../../store/tasks/tasks.actions';
import { selectAllUsers, selectFilteredTasks } from '../../store/tasks/tasks.selectors';
import { TaskPriority, TaskType } from '../../store/tasks/tasks.types';
import TaskCategory from '../task-category/task-category.component'
import './tasks-container.styles.scss'

const TasksContainer = ({ allTasks, allUsers, refreshTasks }: any) => {
  const [normalTasks, setNormalTasks] = useState<TaskType[]>([]);
  const [mediumTasks, setMediumTasks] = useState<TaskType[]>([]);
  const [highTasks, setHighTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const tempNormalTasks: TaskType[] = [];
    const tempMediumTasks: TaskType[] = [];
    const tempHighTasks: TaskType[] = [];

    (allTasks as TaskType[])?.forEach(task => {
      switch (task.priority) {
        case TaskPriority.Normal:
          tempNormalTasks.push(task);
          break;

        case TaskPriority.Mid:
          tempMediumTasks.push(task);
          break;

        case TaskPriority.High:
          tempHighTasks.push(task);
          break;

        default:
          break;
      }
    });

    setNormalTasks(sortTasksSortedByDate([...tempNormalTasks]));
    setMediumTasks(sortTasksSortedByDate([...tempMediumTasks]));
    setHighTasks(sortTasksSortedByDate([...tempHighTasks]));
  }, [allTasks]);

  const sortTasksSortedByDate = (tasks: TaskType[]) => {
    tasks.sort((task1: TaskType, task2: TaskType) => {
      return moment(moment(task1.due_date)).diff(moment(task2.due_date))
    })

    return tasks;
  }

  const handleDragEnd = async (dndData: DropResult, provided: ResponderProvided) => {
    if (dndData.destination && dndData.destination.droppableId !== dndData.source.droppableId) {
      message.loading({ content: 'moving to new category...', key: 1 });
      const draggedTask = (allTasks as TaskType[]).find(task => task.id === dndData.draggableId);
      if (draggedTask) {
        const formData = new FormData();
        formData.append('taskid', draggedTask.id as string);
        formData.append('priority', dndData.destination.droppableId);
        const result = await updateTask(formData);
        if (result.status === 200) {
          refreshTasks();
        }
      }
      message.success({ content: 'moved!', key: 1, duration: 1 })
    }
  }

  return (
    <div className='tasks-container'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='task-categories-container'>
          <TaskCategory taskPriority={TaskPriority.Normal} tasks={normalTasks} users={allUsers} />
          <TaskCategory taskPriority={TaskPriority.Mid} tasks={mediumTasks} users={allUsers} />
          <TaskCategory taskPriority={TaskPriority.High} tasks={highTasks} users={allUsers} />
        </div>
      </DragDropContext>
    </div>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  allTasks: selectFilteredTasks,
  allUsers: selectAllUsers
})

const mapDispatchToProps = (dispatch: (action: AllActionType) => void) => ({
  refreshTasks: () => dispatch(refreshTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
