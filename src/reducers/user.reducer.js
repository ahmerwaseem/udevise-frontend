import {
  STORE_PREAUTH_PAGE, 
  SET_USER_SESSION,
  GET_USER_SUBMITTED_FAILURE,
  GET_USER_SUBMITTED_PENDING,
  GET_USER_SUBMITTED_SUCCESS,
  CLEAR_USER_SESSION

} from '../actions/user';

export default function (state = null, action) {
  switch(action.type){
    case STORE_PREAUTH_PAGE: {
      return Object.assign({},state,{
        preAuthPage: action.payload 
      })
    }
    case SET_USER_SESSION: {
      return Object.assign({},state,action.payload )
    }
    case GET_USER_SUBMITTED_PENDING: {
      return Object.assign({},state, {
        fetchSubmissionPending: true,
        fetchSubmissionSuccess: false,
        fetchSubmissionFailure: false,
      })
    }
    case GET_USER_SUBMITTED_SUCCESS: {
      return Object.assign({},state,{
        fetchSubmissionPending: false,
        fetchSubmissionSuccess: true,
        fetchSubmissionFailure: false,
        submissions : action.payload
      })
    }
    case GET_USER_SUBMITTED_FAILURE: {
      return Object.assign({},state,{
        fetchSubmissionPending: false,
        fetchSubmissionSuccess: false,
        fetchSubmissionFailure: true,
      })
    }
     case CLEAR_USER_SESSION: {
       return null;
     }

    default: return state;
  } 

  
}