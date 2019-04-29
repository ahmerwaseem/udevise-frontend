import React from 'react';
import ReactDOM from 'react-dom';
import QuestionnaireTable from './QuestionnaireTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionnaireTable />, div);
});
