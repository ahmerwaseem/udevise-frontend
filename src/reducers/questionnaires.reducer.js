import { 
  CREATE_PENDING, 
  CREATE_FAILURE, 
  CREATE_SUCCESSFUL, 
  CLEAR_CREATE_STATUS,
  GET_QUESTIONNAIRE_TO_TAKE_PENDING,
  GET_QUESTIONNAIRE_TO_TAKE_FAILURE,
  GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL,
  SUBMIT_RESPONSE_PENDING,
  SUBMIT_RESPONSE_FAILURE,
  SUBMIT_RESPONSE_SUCCESSFUL,
  GET_ALL_QUESTIONNAIRES_FAILURE,
  GET_ALL_QUESTIONNAIRES_PENDING,
  GET_ALL_QUESTIONNAIRES_SUCCESSFUL,
  CLEAR_QUESTIONNAIRES
 } from "../actions/questionnaires";

export default function (state = null, action){
  switch(action.type){
    // case GET_QUESTIONNAIRE_SUCCESSFUL: {
    //   return Object.assign({}, state, {
    //     questionnaire: action.payload
    //   })
    // }

    case GET_QUESTIONNAIRE_TO_TAKE_PENDING: {
      return Object.assign({}, state, {
        getQuestionnairePending: true,
      })
    }

    case GET_QUESTIONNAIRE_TO_TAKE_FAILURE: {
      return Object.assign({}, state, {
        getQuestionnaireFailed: true
      })
    }

    case GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL: {
      console.log(action.payload);
      return Object.assign({}, state, {
        getQuestionnaireSuccess: true,
        questionnaire: action.payload
      })
    }
  
    case CREATE_PENDING: {
      return Object.assign({}, state, {
        createPending: true,
        createFailed: false,
        createSuccess: false
      })
    }
    case CREATE_FAILURE: {
      return Object.assign({}, state, {
        createFailed: true,
        createPending: false,
        createSuccess: false
      })
    }
    case CREATE_SUCCESSFUL: {
      return Object.assign({}, state, {
        createFailed: false,
        createPending: false,
        createSuccess: true,
        id: action.payload
      })
    }
    case CLEAR_CREATE_STATUS: {
      return null;
    }

    case SUBMIT_RESPONSE_PENDING: {
      return Object.assign({}, state, {
        submitResponsePending: true,
        submitResponseFailure: false,
        submitResponseSuccess: false,
      })
    }
    case SUBMIT_RESPONSE_FAILURE: {
      return Object.assign({}, state, {
        submitResponseFailure: true,
        submitResponsePending: false,
        submitResponseSuccess: false,
      })
    }
    case SUBMIT_RESPONSE_SUCCESSFUL: {
      return Object.assign({}, state, {
        submitResponseSuccess: true,
        submitResponseFailure: false,
        submitResponsePending: false,
        response: action.payload
      })

      
    }

    case GET_ALL_QUESTIONNAIRES_FAILURE: {
      return Object.assign({}, state, {
        getAllQuestionnairesFailure: true,
        getAllQuestionniresPending: false,
        getAllQuestionniresSuccess: false,
      })
    }
    case GET_ALL_QUESTIONNAIRES_PENDING: {
      return Object.assign({}, state, {
        getAllQuestionnairesFailure: false,
        getAllQuestionniresPending: true,
        getAllQuestionniresSuccess: false,
      })
    }
    case GET_ALL_QUESTIONNAIRES_SUCCESSFUL: {
      return Object.assign({}, state, {
        getAllQuestionnairesFailure: false,
        getAllQuestionniresPending: false,
        getAllQuestionniresSuccess: true,
        allQuestionnaires: action.payload
      })
    }
    case CLEAR_QUESTIONNAIRES: {
      return null;
    }
  default: return state;
  }
}