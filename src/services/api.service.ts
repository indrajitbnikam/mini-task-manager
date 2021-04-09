import axios, { AxiosRequestConfig } from 'axios';

const requestConfig: AxiosRequestConfig = {
  headers: {
    'AuthToken': 'ecgTXdvOWuvLA4oUuBFLBVUY3b6ys2L2'
  }
}

export const getAllUsers = () => {
  return axios.get('https://devza.com/tests/tasks/listusers', requestConfig);
};

export const getAllTasks = () => {
  return axios.get('https://devza.com/tests/tasks/list', requestConfig);
};

export const createTask = (taskData: any) => {
  return axios.post('https://devza.com/tests/tasks/create', taskData, requestConfig);
};

export const updateTask = (taskData: any) => {
  return axios.post('https://devza.com/tests/tasks/list', taskData, requestConfig);
};

export const deleteTask = (taskid: number) => {
  return axios.post('https://devza.com/tests/tasks/list', { taskid }, requestConfig);
};
