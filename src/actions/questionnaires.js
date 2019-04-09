
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

export const getQuestionnaire= (id) =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE,
      payload: id 
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

export const getQuestionnaireFailure = () =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE_FAILURE,
  }
}

export const submitResponse = (formValues) => {
  console.log("here");
  console.log(formValues);
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
