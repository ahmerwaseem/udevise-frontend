import { 
  CREATE_PENDING, 
  CREATE_FAILURE, 
  CREATE_SUCCESSFUL, 
  CLEAR_CREATE_STATUS,
  GET_QUESTIONNAIRE_TO_TAKE_PENDING,
  GET_QUESTIONNAIRE_TO_TAKE_FAILURE,
  GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL
 } from "../actions/questionnaires";

export default function (state = null, action){
  switch(action.type){
    // case GET_QUESTIONNAIRE_SUCCESSFUL: {
    //   return Object.assign({}, state, {
    //     questionnaireToTake: action.payload
    //   })
    // }

    case GET_QUESTIONNAIRE_TO_TAKE_PENDING: {
      return Object.assign({}, state, {
        getQuestionnaireToTakePending: true,
      })
    }

    case GET_QUESTIONNAIRE_TO_TAKE_FAILURE: {
      return Object.assign({}, state, {
        getQuestionnaireToTakeFailed: true
      })
    }

    case GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL: {
      return Object.assign({}, state, {
        getQuestionnaireToTakeSuccess: true,
        questionnaireToTake: action.form
      })
    }
  
    case CREATE_PENDING: {
      return Object.assign({}, state, {
        createPending: true,
      })
    }
    case CREATE_FAILURE: {
      return Object.assign({}, state, {
        createFailed: true
      })
    }
    case CREATE_SUCCESSFUL: {
      return Object.assign({}, state, {
        createSuccess: true,
        id: action.payload
      })
    }
    case CLEAR_CREATE_STATUS: {
      return null;
  }
  default: return null;
  }
}