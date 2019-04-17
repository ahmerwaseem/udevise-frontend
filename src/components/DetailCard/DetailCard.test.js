import React from 'react';
import ReactDOM from 'react-dom';
import DetailCard from './DetailCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DetailCard />, div);
});
