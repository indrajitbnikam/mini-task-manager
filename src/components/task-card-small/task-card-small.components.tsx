import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ArrowsAltOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import './task-card-small.styles.scss';
import { Button, Form, Modal, notification, Spin } from 'antd';
import TaskPopUp from '../task-pop-up/task-pop-up.component';
import { deleteTask, updateTask } from '../../services/api.service';
import { AllActionType } from '../../store/store.types';
import { refreshTasks } from '../../store/tasks/tasks.actions';
import { connect } from 'react-redux';
import moment from 'moment';

const TaskCardSmall = ({ task, index, users, refreshTasks }: any) => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [apiInProgress, setApiInProgress] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOpenTask = (e: any) => {
    e.preventDefault();
    setPopupVisible(true);
  }

  const handleModifyTask = () => {
    setApiInProgress(true);
    form
      .validateFields()
      .then(async (values) => {
        const formData = new FormData();
        formData.append('taskid', task.id);
        formData.append('message', values.message);
        if (values?.priority) formData.append('priority', values.priority);
        if (values?.due_date) formData.append('due_date', values.due_date.format('YYYY-MM-DD HH:mm:ss'));
        if (values?.assigned_to) formData.append('assigned_to', values.assigned_to);
        const result = await updateTask(formData);
        if (result.status === 200) {
          refreshTasks();
          notification.success({
            message: `Success`,
            description: 'Task modified!',
            placement: 'bottomRight'
          });
        }
        form.resetFields();
        setPopupVisible(false);
      })
      .catch(error => {
        console.error('Validate failed!, ', error);
      })
      .finally(() => {
        setApiInProgress(false);
      })
  }

  const handleDeleteTask = async () => {
    setApiInProgress(true);
    try {
      const formData = new FormData();
      formData.append('taskid', task.id as string);
      const result = await deleteTask(formData);
      if (result.status === 200) {
        refreshTasks();
        notification.success({
          message: `Success`,
          description: 'Task deleted!',
          placement: 'bottomRight'
        });
      }
      form.resetFields();
      setPopupVisible(false);
    } catch (error) {
      console.error('Deleteing Task failed! ',error)
    }
    setApiInProgress(false)
  }

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {
          (provided, snapshot) => (
            <div className={`card-small ${snapshot.isDragging ? ' isDragging' :''}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className='card-content'>
                <h3>{task.message}</h3>
              </div>
              <div className='card-info'>
                <p className='due-date'>
                  <ClockCircleOutlined style={{ marginRight: '2px' }}/> {moment(task.due_date).calendar() || ''}
                </p>
                <p className='user'>
                  <UserOutlined style={{ marginRight: '2px' }} /> {task.assigned_name || ''}
                </p>
              </div>
              <div className='menu'>
                <Button shape="circle" icon={<ArrowsAltOutlined />} onClick={handleOpenTask} className='menu-button'></Button>
              </div>
            </div>
          )
        }
      </Draggable>

      <Modal
        title='Modify task'
        centered
        visible={popupVisible}
        onCancel={() => setPopupVisible(false)}
        footer={[
          <Button key="delete" type='primary' onClick={handleDeleteTask} danger>
            Delete
          </Button>,
          <Button key="modify" type='primary' onClick={handleModifyTask}>
            Modify
          </Button>
        ]}
      >
        <Spin spinning={apiInProgress}>
          <TaskPopUp form={form} users={users} initialData={task}/>
        </Spin>
      </Modal>
    </>
  )
}

const mapDispatchToProps = (dispatch: (action: AllActionType) => void) => ({
  refreshTasks: () => dispatch(refreshTasks()),

})

export default connect(null, mapDispatchToProps)(TaskCardSmall);
