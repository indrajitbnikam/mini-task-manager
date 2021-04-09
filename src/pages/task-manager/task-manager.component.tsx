import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux';
import TasksContainer from '../../components/tasks-container/tasks-container.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import { getAllUsers } from '../../services/api.service';
import { AllActionType } from '../../store/store.types';
import { refreshTasks, setAllUsers } from '../../store/tasks/tasks.actions';
import { UserType } from '../../store/tasks/tasks.types';
import './task-manager.styles.scss';

const TaskManager: FC = ({ refreshAllTasks, setAllUsers }: any) => {
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUsers();
      if (result.status === 200) {
        const user = result.data.users as UserType[];
        setAllUsers(user);
      }
    };

    fetchUsers();
    refreshAllTasks();
  })

  return (
    <div className='task-manager'>
      <Toolbar />
      <TasksContainer />
    </div>
  )
}

const mapDispatchToProps = (dispatch: (state: AllActionType) => void) => ({
  refreshAllTasks: () => dispatch(refreshTasks()),
  setAllUsers: (users: UserType[]) => dispatch(setAllUsers(users))
});

export default connect(null, mapDispatchToProps)(TaskManager);

