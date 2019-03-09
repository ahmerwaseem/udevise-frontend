
export const CREATE_QUESTIONNAIRE = "CREATE QUESTIONNAIRE";
export const CREATE_PENDING = "CREATE PENDING";
export const CREATE_SUCCESSFUL = "CREATE SUCCESSFUL";
export const CREATE_FAILURE = "CREATE FAILURE";
export const CLEAR_CREATE_STATUS = "CLEAR_CREATE_STATUS";

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