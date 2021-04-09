import { createSelector } from 'reselect';
import { GlobalReduxState } from '../store.types';
import { TaskState } from './tasks.types';

const selectTasksState = (state: GlobalReduxState) => state.tasks;

export const selectSearchTerm = createSelector(
  [selectTasksState],
  (state: TaskState) => state.searchTerm
);

export const selectAllTasks = createSelector(
  [selectTasksState],
  (state: TaskState) => state.allTasks
);

export const selectFilteredTasks = createSelector(
  [selectTasksState],
  (state: TaskState) => state.filteredTasks
);

export const selectAllUsers = createSelector(
  [selectTasksState],
  (state: TaskState) => state.allUsers
);
