export const STORE_PREAUTH_PAGE = "STORE_PREAUTH_PAGE";
export const SET_USER_SESSION = "SET_USER_SESSION";


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