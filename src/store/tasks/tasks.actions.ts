import { TasksActionTypes, TaskAction, TaskType, UserType } from './tasks.types';

export const setSearchTerm = (term: string): TaskAction => ({
  type: TasksActionTypes.SetSearchTerm,
  payload: term
});

export const setAllTasks = (tasks: TaskType[]): TaskAction => ({
  type: TasksActionTypes.SetAllTasks,
  payload: tasks
});

export const setFilteredTasks = (tasks: TaskType[]): TaskAction => ({
  type: TasksActionTypes.SetFilteredTasks,
  payload: tasks
});

export const setAllUsers = (users: UserType[]): TaskAction => ({
  type: TasksActionTypes.SetAllUsers,
  payload: users
});

export const refreshTasks = (): TaskAction => ({
  type: TasksActionTypes.RefreshTasks,
});
