import React, { useState } from 'react'
import { Button, Form, Modal, notification, Spin } from 'antd';
import { AllActionType } from '../../store/store.types';
import { refreshTasks } from '../../store/tasks/tasks.actions';
import { connect } from 'react-redux';
import { createTask } from '../../services/api.service';
import { createStructuredSelector } from 'reselect';
import { selectAllUsers } from '../../store/tasks/tasks.selectors';
import TaskPopUp from '../task-pop-up/task-pop-up.component';

const CreateTaskButton = ({ refreshTasks, users }: any) => {

  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setPopupVisible(false);
  }

  const handleCreateTask = () => {
    setCreatingUser(true);
    form
      .validateFields()
      .then(async (values) => {
        const formData = new FormData();
        formData.append('message', values.message);
        if (values?.priority) formData.append('priority', values.priority);
        if (values?.due_date) formData.append('due_date', values.due_date.format('YYYY-MM-DD HH:mm:ss'));
        if (values?.assigned_to) formData.append('assigned_to', values.assigned_to);
        const result = await createTask(formData);
        if (result.status === 200) {
          refreshTasks();
          notification.success({
            message: `Success`,
            description: 'New task created!',
            placement: 'bottomRight'
          });
        }
        form.resetFields();
        setPopupVisible(false);
      })
      .catch(info => {
        console.log('Validate failed!, ', info);
      })
      .finally(() => {
        setCreatingUser(false);
      })
  }

  return (
    <>
    <Button type='primary' onClick={() => setPopupVisible(true)}>New Task 🚀</Button>
    <Modal
      title='Create new task'
      centered
      visible={popupVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="ok" type='primary' onClick={handleCreateTask}>
          Create
        </Button>
      ]}
    >
      <Spin spinning={creatingUser}>
        <TaskPopUp form={form} users={users}/>
      </Spin>
    </Modal>
    </>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  users: selectAllUsers
});

const mapDispatchToProps = (dispatch: (action: AllActionType) => void) => ({
  refreshTasks: () => dispatch(refreshTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskButton)
