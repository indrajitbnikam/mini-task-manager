import { TaskAction, TasksActionTypes, TaskState, TaskType, UserType } from "./tasks.types";

const INITIAL_STATE: TaskState = {
  searchTerm: '',
  allTasks: [],
  allUsers: []
}

const tasksReducer = (state: TaskState = INITIAL_STATE, action: TaskAction): TaskState => {
  switch (action.type) {
    case TasksActionTypes.SetSearchTerm:
      return {
        ...state,
        searchTerm: action.payload as string
      };

    case TasksActionTypes.SetAllTasks:
      return {
        ...state,
        allTasks: action.payload as TaskType[]
      }

    case TasksActionTypes.SetAllUsers:
      return {
        ...state,
        allUsers: action.payload as UserType[]
      }

    default: return state;
  }
}

export default tasksReducer;