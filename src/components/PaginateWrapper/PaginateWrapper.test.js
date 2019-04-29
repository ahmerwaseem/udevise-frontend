import React from 'react';
import ReactDOM from 'react-dom';
import PaginateWrapper from './PaginateWrapper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PaginateWrapper />, div);
});
