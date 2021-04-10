import { message } from 'antd';
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
    message.loading({content: 'Updating tasks...', key: 2});
    const response: AxiosResponse = yield* call<() => Promise<any>>(getAllTasks);
    if (response.status === 200) {
      const allTasks: TaskType[] = response.data.tasks;
      yield* put(setAllTasks(allTasks));
    }
    message.success({ content: 'up-to date!', key: 2, duration: 1 });
  } catch (error) {
    console.error(error.message);
  }
}

export default function* tasksSagas() {
  yield* all([
    call(onRefreshTasks)
  ])
};