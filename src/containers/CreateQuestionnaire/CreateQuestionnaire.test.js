import React from 'react';
import ReactDOM from 'react-dom';
import CreateQuestionnaire from './CreateQuestionnaire';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateQuestionnaire />, div);
});
