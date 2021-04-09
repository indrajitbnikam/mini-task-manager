import { TaskState, TaskAction } from './tasks/tasks.types';

// Necessary for selectors
export interface GlobalReduxState {
  tasks: TaskState
}

// Necessary for dispatch calls
export type AllActionType = TaskAction;