export const config = (token) => { 
  return {
    headers: {'Authorization': "bearer " + token}
  }
};


export const getToken = (state) => {
  if (state && state.user && state.user.session){
    return state.user.session.token;
  } 
  return null;
}