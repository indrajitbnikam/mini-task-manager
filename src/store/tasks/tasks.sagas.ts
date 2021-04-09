import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'typed-redux-saga';
import { getAllTasks } from '../../services/api.service';
import { setAllTasks } from './tasks.actions';
import { TaskAction, TasksActionTypes, TaskType } from './tasks.types';


export function* onRefreshTasks() {
  yield* takeLatest(TasksActionTypes.RefreshTasks, fetchAndSetAllTasks);
}

function* fetchAndSetAllTasks(action: TaskAction): Generator {
  try {
    const response: AxiosResponse = yield* call<() => Promise<any>>(getAllTasks);
    if (response.status === 200) {
      const allTasks: TaskType[] = response.data.tasks;
      console.log(allTasks);
      const tasks: TaskType[] = [
        {
          message: 'First task',
          assigned_to: '1',
          priority: '1',
          taskid: '1'
        },
        {
          message: 'Second task',
          assigned_to: '2',
          priority: '2',
          taskid: '2'
        },
        {
          message: 'Third task',
          assigned_to: '3',
          priority: '3',
          taskid: '3'
        },
        {
          message: 'Fourth task',
          assigned_to: '4',
          priority: '1',
          taskid: '4'
        }
      ];

      yield* put(setAllTasks(tasks));
    }
  } catch (error) {
    console.error(error.message);
  }
}

export default function* tasksSagas() {
  yield* all([
    call(onRefreshTasks)
  ])
};