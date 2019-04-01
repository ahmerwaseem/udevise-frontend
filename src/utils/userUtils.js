export const config = (token) => { 
  return {
    headers: {'Authorization': "bearer " + token}
  }
};


export const getToken = (state) => {
  if (state && state.user && state.user.userSession){
    return state.user.userSession.token;
  } 
  return null;
}