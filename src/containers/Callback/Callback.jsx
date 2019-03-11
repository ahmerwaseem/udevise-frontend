import React, { Component } from 'react';
import loading from './loading.svg';
import history from '../../history';
import { auth0_config } from '../../Auth/Auth';
import Auth from '../../Auth/Auth';


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

    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;
