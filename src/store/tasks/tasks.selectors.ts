import { createSelector } from 'reselect';
import { GlobalReduxState } from '../store.types';
import { TaskState, TaskType } from './tasks.types';

const selectTasksState = (state: GlobalReduxState) => state.tasks;

export const selectSearchTerm = createSelector(
  [selectTasksState],
  (state: TaskState) => state.searchTerm
);

export const selectAllTasks = createSelector(
  [selectTasksState],
  (state: TaskState) => state.allTasks
);

export const selectAllUsers = createSelector(
  [selectTasksState],
  (state: TaskState) => state.allUsers
  );

export const selectFilteredTasks = createSelector(
  [selectTasksState],
  (state: TaskState) => {
    if (!state.searchTerm) return state.allTasks;

    return state.allTasks.filter(tasks => {
      return tasks.message.toLowerCase().includes(state.searchTerm.toLowerCase())
    });
  }
);
