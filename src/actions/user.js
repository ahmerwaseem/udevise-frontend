export const STORE_PREAUTH_PAGE = "STORE_PREAUTH_PAGE";
export const SET_USER_SESSION = "SET_USER_SESSION";

export const GET_USER_SUBMITTED =  "GET_USER_SUBMITTED"
export const GET_USER_SUBMITTED_PENDING =  "GET_USER_SUBMITTED_PENDING"
export const GET_USER_SUBMITTED_FAILURE =  "GET_USER_SUBMITTED_FAILURE"
export const GET_USER_SUBMITTED_SUCCESS=  "GET_USER_SUBMITTED_SUCCESS"



export const storePageHistory = (pageUrl) => {
  return {
    type: STORE_PREAUTH_PAGE,
    payload: pageUrl
  }
}

export const setUserSession = (userInfo) => {
  return {
    type: SET_USER_SESSION,
    payload: userInfo
  }
}

export const getUserSubmitted = () => {
  return {
    type: GET_USER_SUBMITTED,
  }
}
export const getUserSubmittedPending = () => {
  return {
    type: GET_USER_SUBMITTED_PENDING,
  }
}
export const getUserSubmittedFailure = () => {
  return {
    type: GET_USER_SUBMITTED_FAILURE,
  }
}
export const getUserSubmittedSuccess = (data) => {
  return {
    type: GET_USER_SUBMITTED_SUCCESS,
    payload: data
  }
}