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
  CLEAR_QUESTIONNAIRES,
  CLEAR_SUBMIT_RESPONSE,
  GET_DETAILS_BY_ID,
  GET_DETAILS_BY_ID_SUCCESS,
  GET_RESPONSE_DETAIL_SUCCESS,
  GET_RESPONSE_DETAIL_PENDING,
  GET_RESPONSE_DETAIL_FAILURE,
  ERROR_OCCURRED,
  GRADE_QUIZ_PENDING,
  GRADE_QUIZ_SUCCESS,
  CLEAR_GRADE_QUIZ,
  CLEAR_ERROR,
  CLEAR_RESPONSE_DETAILS,
  GET_REPORT_SUCCESS
 } from "../actions/questionnaires";

export default function (state = null, action){
  switch(action.type){

    case GET_QUESTIONNAIRE_TO_TAKE_PENDING: {
      return Object.assign({}, state, {
        getQuestionnairePending: true,
        getQuestionnaireFailed: false,
        getQuestionnaireSuccess: false,

      })
    }

    case GET_QUESTIONNAIRE_TO_TAKE_FAILURE: {
      return Object.assign({}, state, {
        getQuestionnaireFailed: action.error,
        getQuestionnairePending: false,
        getQuestionnaireSuccess: false,


      })
    }

    case GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL: {
      return Object.assign({}, state, {
        getQuestionnairePending: false,
        getQuestionnaireFailed: false,
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
        ...state,
        createFailed: false,
        createPending: false,
        createSuccess: true,
        id: action.payload.id,
        allQuestionnaires: [action.payload, ...state.allQuestionnaires]
      })
    }
    case CLEAR_CREATE_STATUS: {
      return Object.assign({}, state, {
        ...state,
        createFailed: false,
        createPending: false,
        createSuccess: false,
      })
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
      case CLEAR_SUBMIT_RESPONSE: {
        return Object.assign({}, state, {
          ...state,
          submitResponseSuccess: true,
          submitResponseFailure: false,
          submitResponsePending: false,
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
    case GET_DETAILS_BY_ID_SUCCESS : {
      return Object.assign({}, state, {
        detail: action.payload,
      })
    }
    case GET_RESPONSE_DETAIL_SUCCESS : {
      return Object.assign({}, state, {
        responseDetail : action.payload,
        responseDetailSuccess: true,
        responseDetailPending: false,
        responseDetailFailure: false
      })
    }
    case GET_RESPONSE_DETAIL_PENDING : {
      return Object.assign({}, state, {
        responseDetailSuccess: false,
        responseDetailPending: true,
        responseDetailFailure: false

      })
    }
    case GET_RESPONSE_DETAIL_FAILURE : {
      return Object.assign({}, state, {
        responseDetailSuccess: false,
        responseDetailPending: false,
        responseDetailFailure: true
      })
    }
    case CLEAR_RESPONSE_DETAILS: {
      return Object.assign({}, state, {
      responseDetail : action.payload,
      responseDetailSuccess: true,
      responseDetailPending: false,
      responseDetailFailure: false
      })
    }
    case ERROR_OCCURRED: {
      return Object.assign({}, state, {
        hasError: true,
        errorMessage: action.payload
      })
    }
    case CLEAR_ERROR: {
      return Object.assign({}, state, {
        hasError: false
      })
    }
    case GRADE_QUIZ_PENDING: {
      return Object.assign({}, state, {
        gradeQuizPending: true,
        gradeQuizSuccess: false
      })
    }
    case GRADE_QUIZ_SUCCESS: {
      return Object.assign({}, state, {
        gradeQuizPending: false,
        gradeQuizSuccess: true
      })
    }
    case CLEAR_GRADE_QUIZ: {
      return Object.assign({}, state, {
        gradeQuizPending: false,
        gradeQuizSuccess: false
      })
    }

    // case GET_REPORT_SUCCESS: {
    //   return Object.assign({}, state, {
    //     reportData: action.payload
    //   })
    // }
    // case GET_REPORT_CLEAR: {
    //   return Object.assign({}, state, {
    //     reportData: null
    //   })
    // }

    
  default: return state;
  }
}