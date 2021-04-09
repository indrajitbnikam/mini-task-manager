import React from 'react';
import './toolbar.styles.scss';
import { Button, Input } from 'antd';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <div className='left-section'>
        <Input
          placeholder='Search for task'
          style={{width: '300px'}} />
      </div>
      <div className='right-section'>
        <Button type='primary'>New Task 🚀</Button>
      </div>
    </div>
  )
}

export default Toolbar
