import React from 'react';
import ReactDOM from 'react-dom';
import AccordianItem from './AccordianItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccordianItem />, div);
});
