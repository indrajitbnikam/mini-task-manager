export enum TasksActionTypes {
  SetSearchTerm = '[Tasks] Set Search Term',
  SetAllTasks = '[Tasks] Set All Tasks',
  SetFilteredTasks = '[Tasks] Set Filtered Tasks',
  SetAllUsers = '[Tasks] Set All Users',
  RefreshTasks = '[Tasks] Refresh Tasks'
};

export enum TaskPriority {
  High = '3',
  Mid = '2',
  Normal = '1'
}

export type TaskType = {
  message: string;
  taskid?: string;
  due_date?: string;
  priority?: '1' | '2' | '3',
  assigned_to?: string
}

export type TaskAction = {
  type: TasksActionTypes,
  payload?: string | TaskType[] | UserType[]
}

export type UserType = {
  id: string;
  name: string;
  picture: string;
}


export interface TaskState {
  searchTerm: string;
  allUsers: UserType[];
  allTasks: TaskType[];
  filteredTasks: TaskType[];
}