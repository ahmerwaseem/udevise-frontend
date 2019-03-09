export const STORE_PREAUTH_PAGE = "STORE_PREAUTH_PAGE";

export const storePageHistory = (pageUrl) => {
  return {
    type: STORE_PREAUTH_PAGE,
    payload: pageUrl
  }
}