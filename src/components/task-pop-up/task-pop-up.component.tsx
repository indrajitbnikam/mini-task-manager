import React from 'react'
import { Avatar, DatePicker, Form, Input, Radio, Select } from 'antd';
import moment from 'moment';
import './task-pop-up.styles.scss';
import { TaskPriority } from '../../store/tasks/tasks.types';

const TaskPopUp = ({ form, users, initialData }: any) => {

  const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 1 }}
        layout="horizontal"
        initialValues={ initialData ? {
          'message': initialData.message,
          'priority': initialData.priority,
          'assigned_to': initialData.assigned_to,
          'due_date': moment(initialData.due_date, dateTimeFormat)
        }: {
          'priority': TaskPriority.Normal
        }}
      >
        <Form.Item
          label="Message"
          name='message'
          rules={[{ required: true, message: 'Please enter message!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Radio.Group>
            <Radio.Button value="1" defaultChecked>Normal</Radio.Button>
            <Radio.Button value="2">Medium</Radio.Button>
            <Radio.Button value="3">High</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Assign to" name='assigned_to'>
          <Select size='large'>
            {
              users.map((user: any) => (
                <Select.Option key={user.id} value={user.id}>
                  <div className='select-option'>
                    <span className='user-image'>
                      <Avatar src={user.picture} style={{ height: '30px', width: '30px' }}/>
                    </span>
                    <span className='user-name'>
                      {user.name}
                    </span>
                  </div>
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label="Due date" name='due_date'>
          <DatePicker showTime format={dateTimeFormat} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default TaskPopUp;
