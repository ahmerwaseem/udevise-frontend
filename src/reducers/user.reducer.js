import {STORE_PREAUTH_PAGE} from '../actions/user';

export default function (state = null, action) {
  switch(action.type){
    case STORE_PREAUTH_PAGE: {
      return Object.assign({},state,{
        preAuthPage: action.payload 
      })
    }
    default: return null;
  } 
}