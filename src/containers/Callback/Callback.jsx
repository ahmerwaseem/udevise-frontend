import React, { Component } from 'react';
import loading from './loading.svg';
import history from '../../history';
import { auth0_config } from '../../Auth/Auth';
import Auth from '../../Auth/Auth';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import { setUserSession } from '../../actions/user';

class Callback extends Component {

  constructor (props) {
    super(props);
  }

  handleAuthentication() {
    auth0_config.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem("token",authResult.accessToken);
    localStorage.setItem("expiresAt", expiresAt);
    localStorage.setItem("idToken", JSON.stringify(authResult.idTokenPayload));
    let userInfo = {
      token: authResult.accessToken,
      expires: expiresAt,
      idToken: authResult.idTokenPayload
    }
    this.props.setUser(userInfo);
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
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Callback);
