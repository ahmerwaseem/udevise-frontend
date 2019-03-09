import React from 'react';
import ReactDOM from 'react-dom';
import AnswerQuestionnaire from './AnswerQuestionnaire';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnswerQuestionnaire />, div);
});
