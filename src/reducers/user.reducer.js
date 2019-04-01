import {STORE_PREAUTH_PAGE, SET_USER_SESSION} from '../actions/user';

export default function (state = null, action) {
  switch(action.type){
    case STORE_PREAUTH_PAGE: {
      return Object.assign({},state,{
        preAuthPage: action.payload 
      })
    }
    case SET_USER_SESSION: {
      return Object.assign({},state,{
        userSession: action.payload 
      })
    }
    default: return state;
  } 

  
}