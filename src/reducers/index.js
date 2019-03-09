import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import questionnairesReducer from './questionnaires.reducer';
import userReducer from './user.reducer';


const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  questionnaire: questionnairesReducer
})

export default rootReducer;