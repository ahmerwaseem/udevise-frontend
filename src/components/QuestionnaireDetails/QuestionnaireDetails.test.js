import React from 'react';
import ReactDOM from 'react-dom';
import QuestionnaireDetails from './QuestionnaireDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionnaireDetails />, div);
});
