
export const CREATE_QUESTIONNAIRE = "CREATE QUESTIONNAIRE";
export const CREATE_PENDING = "CREATE PENDING";
export const CREATE_SUCCESSFUL = "CREATE SUCCESSFUL";
export const CREATE_FAILURE = "CREATE FAILURE";
export const CLEAR_CREATE_STATUS = "CLEAR_CREATE_STATUS";
export const GET_QUESTIONNAIRE_TO_TAKE = "GET_QUESTIONNAIRE_TO_TAKE";
export const GET_QUESTIONNAIRE_TO_TAKE_PENDING = "GET_QUESTIONNAIRE_TO_TAKE_PENDING";
export const GET_QUESTIONNAIRE_TO_TAKE_FAILURE = "GET_QUESTIONNAIRE_TO_TAKE_FAILURE";
export const GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL = "GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL";


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

export const createQuestionnaireSuccessful = (id) =>{
  return {
      type: CREATE_SUCCESSFUL,
      payload: id
  }
}

export const createQuestionnaireFailure = () =>{
  return {
      type: CREATE_FAILURE,
  }
}

export const getQuestionnaireToTake= (id) =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE,
      payload: id 
  }
}

export const getQuestionnaireToTakePending = () =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE_PENDING,
  }
}

export const getQuestionnaireToTakeSuccessful = (form) =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE_SUCCESSFUL,
      payload: form
  }
}

export const getQuestionnaireToTakeFailure = () =>{
  return {
      type: GET_QUESTIONNAIRE_TO_TAKE_FAILURE,
  }
}