import React from 'react';
import ReactDOM from 'react-dom';
import UserSubmissionTable from './UserSubmissionTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserSubmissionTable />, div);
});
