import React from 'react';
import ReactDOM from 'react-dom';
import MenuAppBar from './MenuAppBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MenuAppBar />, div);
});
