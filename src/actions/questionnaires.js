
export const CREATE_QUESTIONNAIRE = "CREATE QUESTIONNAIRE";
export const CREATE_PENDING = "CREATE PENDING";
export const CREATE_SUCCESSFUL = "CREATE SUCCESSFUL";
export const CREATE_FAILURE = "CREATE FAILURE";
export const CLEAR_CREATE_STATUS = "CLEAR_CREATE_STATUS";

export const GET_QUESTIONNAIRE_TO_TAKE = "GET_QUESTIONNAIRE_TO_TAKE";
export const GET_QUESTIONNAIRE_TO_TAKE_PENDING = "GET_QUESTIONNAIRE_TO_TAKE_PENDING";
export const GET_QUESTIONNAIRE_TO_TAKE_FAILURE = "GET_QUESTIONNAIRE_TO_TAKE_FAILURE";
export const GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL = "GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL";

export const GET_ALL_QUESTIONNAIRES = "GET_ALL_QUESTIONNAIRES";
export const GET_ALL_QUESTIONNAIRES_PENDING = "GET_ALL_QUESTIONNAIRES_PENDING";
export const GET_ALL_QUESTIONNAIRES_FAILURE = "GET_ALL_QUESTIONNAIRES_FAILURE";
export const GET_ALL_QUESTIONNAIRES_SUCCESSFUL = "GET_ALL_QUESTIONNAIRES_SUCCESSFUL";

export const SUBMIT_RESPONSE = "SUBMIT_RESPONSE";
export const SUBMIT_RESPONSE_PENDING = "SUBMIT_RESPONSE_PENDING";
export const SUBMIT_RESPONSE_SUCCESSFUL = "SUBMIT_RESPONSE_SUCCESSFUL";
export const SUBMIT_RESPONSE_FAILURE = "SUBMIT_RESPONSE_FAILURE";
export const CLEAR_SUBMIT_RESPONSE = "CLEAR_SUBMIT_RESPONSE";


export const CLEAR_QUESTIONNAIRES = "CLEAR_QUESTIONNAIRES";

export const GET_DETAILS_BY_ID = "GET_DETAILS_BY_ID";
export const GET_DETAILS_BY_ID_SUCCESS = "GET_DETAILS_BY_ID_SUCCESS"


export const GET_RESPONSE_DETAIL = "GET_RESPONSE_DETAIL";
export const GET_RESPONSE_DETAIL_PENDING = "GET_RESPONSE_DETAIL_PENDING"
export const GET_RESPONSE_DETAIL_SUCCESS = "GET_RESPONSE_DETAIL_SUCCESS"
export const GET_RESPONSE_DETAIL_FAILURE = "GET_RESPONSE_DETAIL_FAILURE"
export const CLEAR_RESPONSE_DETAILS = "CLEAR_RESPONSE_DETAILS"


export const CLEAR_ERROR = "CLEAR_ERROR"

export const GRADE_QUIZ = "GRADE_QUIZ";
export const GRADE_QUIZ_PENDING = "GRADE_QUIZ_PENDING"
export const GRADE_QUIZ_SUCCESS = "GRADE_QUIZ_SUCCESS"
export const CLEAR_GRADE_QUIZ = "CLEAR_GRADE_QUIZ"

export const ERROR_OCCURRED = "ERROR_OCCURRED";

export const GET_REPORT = "GET_REPORT"
export const GET_REPORT_SUCCESS = "GET_REPORT_SUCCESS"
export const GET_REPORT_CLEAR = "GET_REPORT_CLEAR"



export const createQuestionnaire= (formValues) =>{
  return {
      type: CREATE_QUESTIONNAIRE,
      questionnaire: formValues
  }
}

export const createQuestionnairePending = () =>{
  return {
      type: CREATE_PENDING,
  }
}

export const createQuestionnaireSuccessful = (payload) =>{
  return {
      type: CREATE_SUCCESSFUL,
      payload: payload
  }
}

export const createQuestionnaireFailure = () =>{
  return {
      type: CREATE_FAILURE,
  }
}

export const getQuestionnaire= (id,type) =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE,
      payload: id,
      questionnaireType: type
  }
}

export const getQuestionnairePending = () =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE_PENDING,
  }
}

export const getQuestionnaireSuccessful = (form) =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL,
      payload: form
  }
}

export const getQuestionnaireFailure = (error) =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE_FAILURE,
      error: error
  }
}

export const submitResponse = (formValues) => {
  return {
      type: SUBMIT_RESPONSE,
      payload: formValues 
  }
}

export const submitResponsePending = () =>{
  return {
      type: SUBMIT_RESPONSE_PENDING,
  }
}

export const submitResponseSuccessful = (response) =>{
  return {
      type: SUBMIT_RESPONSE_SUCCESSFUL,
      payload: response
  }
}

export const submitResponseFailure = () =>{
  return {
      type: SUBMIT_RESPONSE_FAILURE,
  }
}

export const getAllQuestionnaires = () =>{
  return {
      type: GET_ALL_QUESTIONNAIRES,
  }
}


export const getAllQuestionnairesPending = () =>{
  return {
      type: GET_ALL_QUESTIONNAIRES_PENDING,
  }
}

export const getAllQuestionnairesSuccessful = (response) =>{
  return {
      type: GET_ALL_QUESTIONNAIRES_SUCCESSFUL,
      payload: response
  }
}

export const getAllQuestionnairesFailure = () =>{
  return {
      type: GET_ALL_QUESTIONNAIRES_FAILURE,
  }
}

export const clearQuestionnaires = () =>{
  return {
      type: CLEAR_QUESTIONNAIRES,
  }
}

export const getDetailsById = (id) =>{
  return {
    type: GET_DETAILS_BY_ID,
    payload: id
  }
}

export const getDetailsByIdSuccess = (details) =>{
  return {
    type: GET_DETAILS_BY_ID_SUCCESS,
    payload: details
  }
}


export const getResponseDetails = (id,responseId) =>{
  return {
    type: GET_RESPONSE_DETAIL,
    payload: id,
    responseId: responseId
  }
}  
export const getResponseDetailsSuccess = (details) =>{
  return {
    type: GET_RESPONSE_DETAIL_SUCCESS,
    payload: details
  }
} 

export const getResponseDetailsPending = () =>{
  return {
    type: GET_RESPONSE_DETAIL_PENDING,
  }
} 

export const getResponseDetailsFailure = () =>{
  return {
    type: GET_RESPONSE_DETAIL_FAILURE,
  }
} 


export const gradeQuiz = (formValues,questionnaireId,responseId) =>{
  return {
    type: GRADE_QUIZ,
    payload: formValues,
    questionnaireId: questionnaireId,
    responseId: responseId
  }
}

export const gradeQuizPending = () =>{
  return {
    type: GRADE_QUIZ_PENDING,
  }
} 

export const gradeQuizSuccess = () =>{
  return {
    type: GRADE_QUIZ_SUCCESS,
  }
} 

export const getReportSuccess = (data) =>{
  return {
    type: GET_REPORT_SUCCESS,
    payload: data
  }
} 



