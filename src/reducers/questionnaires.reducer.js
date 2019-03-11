import { 
  CREATE_PENDING, 
  CREATE_FAILURE, 
  CREATE_SUCCESSFUL, 
  CLEAR_CREATE_STATUS } from "../actions/questionnaires";

export default function (state = null, action){
  switch(action.type){
    case CREATE_PENDING: {
      return Object.assign({}, state, {
        createPending: true,
      })
    }
    case CREATE_FAILURE: {
      return Object.assign({}, state, {
        createFailed: true
      })
    }
    case CREATE_SUCCESSFUL: {
      return Object.assign({}, state, {
        createSuccess: true,
        id: action.payload
      })
    }
    case CLEAR_CREATE_STATUS: {
      return null;
  }
  default: return null;
  }
}