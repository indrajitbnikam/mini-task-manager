import React from 'react';
import './toolbar.styles.scss';
import { Input } from 'antd';
import CreateTaskButton from '../create-task-button/create-task-button.component';
import { createStructuredSelector } from 'reselect';
import { selectSearchTerm } from '../../store/tasks/tasks.selectors';
import { AllActionType } from '../../store/store.types';
import { setSearchTerm } from '../../store/tasks/tasks.actions';
import { connect } from 'react-redux';

const Toolbar = ({ searchTerm, setSearchTerm }: any) => {

  return (
    <div className='toolbar'>
      <div className='left-section'>
        <Input
          placeholder='Search for task'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{width: '300px'}} />
      </div>
      <div className='right-section'>
        <CreateTaskButton />
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  searchTerm: selectSearchTerm
});

const mapDispatchToProps = (dispatch: (action: AllActionType) => void) => ({
  setSearchTerm: (searchTerm: string) => dispatch(setSearchTerm(searchTerm))
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
