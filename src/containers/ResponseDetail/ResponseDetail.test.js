import React from 'react';
import ReactDOM from 'react-dom';
import ResponseDetail from './ResponseDetail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResponseDetail />, div);
});
