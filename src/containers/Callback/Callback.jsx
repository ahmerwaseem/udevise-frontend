import React, { Component } from 'react';
import loading from './loading.svg';
import history from '../../history';
import { auth0_config } from '../../Auth/Auth';
import Auth from '../../Auth/Auth';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import { setUserSession } from '../../actions/user';
import { ERROR_OCCURRED } from '../../actions/questionnaires'; 

class Callback extends Component {

  constructor (props) {
    super(props);
  }

  handleAuthentication() {
    auth0_config.parseHash((err, authResult) => {
      console.log(err);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.props.setError(err.errorDescription)
      }
    });
  }

  setSession(authResult) {
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    console.log(authResult.idTokenPayload);
    let userInfo = {
      session: {
        token: authResult.accessToken,
        expires: expiresAt,
        idToken: authResult.idTokenPayload
      }
    }
    if (authResult.idTokenPayload){
      if(!authResult.idTokenPayload.email_verified){
        this.props.setError("Please verify your email before logging in.")
        return;
      }
    }
    this.props.setUser(userInfo);
    userInfo = {user : userInfo};
    localStorage.setItem("user",JSON.stringify(userInfo));
    this.handleRedirect();
  }

  handleRedirect() {
    let preAuthPage = localStorage.getItem("preAuthPage");
    localStorage.removeItem("preAuthPage");
    let auth = new Auth();
    auth.redirect(preAuthPage);
  }

  componentWillMount(){
    this.handleAuthentication();
  }

  render() {
    return (
      <Spinner/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user,
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
    return({
      setUser: (userInfo) => {dispatch(setUserSession(userInfo))},
      setError: (error) => {dispatch({type: ERROR_OCCURRED, payload: error})}
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Callback);
