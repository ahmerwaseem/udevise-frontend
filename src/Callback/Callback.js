import React, { Component } from 'react';
import loading from './loading.svg';
import { connect } from 'react-redux';
import history from '../history';
import { auth0 } from '../Auth/Auth';

class Callback extends Component {

  // accessToken;
  // idToken;
  // expiresAt;

  // handleAuthentication() {
  //   console.log("handle auth");

  //   auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.setSession(authResult);
  //     } else if (err) {
  //       history.replace('/');
  //       console.log(err);
  //       alert(`Error: ${err.error}. Check the console for further details.`);
  //     }
  //   });
  // }

  // getAccessToken() {
  //   return this.accessToken;
  // }

  // getIdToken() {
  //   return this.idToken;
  // }

  // setSession(authResult) {
  //   // Set isLoggedIn flag in localStorage
  //   localStorage.setItem('isLoggedIn', 'true');

  //   // Set the time that the access token will expire at
  //   let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
  //   this.accessToken = authResult.accessToken;
  //   this.idToken = authResult.idToken;
  //   localStorage.setItem("token",authResult.accessToken);
  //   localStorage.setItem("expiresAt", expiresAt);
  //   console.log("try to route after session set")
  //   console.log(authResult);
  //   // navigate to the home route
  //   history.replace('/create');
  // }

  // renewSession() {
  //   this.auth0.checkSession({}, (err, authResult) => {
  //      if (authResult && authResult.accessToken && authResult.idToken) {
  //        this.setSession(authResult);
  //      } else if (err) {
  //        this.logout();
  //        console.log(err);
  //        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
  //      }
  //   });
  // }

  // logout() {
  //   // Remove tokens and expiry time
  //   this.accessToken = null;
  //   this.idToken = null;
  //   this.expiresAt = 0;

  //   // Remove isLoggedIn flag from localStorage
  //   localStorage.removeItem('isLoggedIn');

  //   // navigate to the home route
  //   history.replace('/');
  // }

  // isAuthenticated() {
  //   console.log("in is Auth..");
  //   // Check whether the current time is past the
  //   // access token's expiry time
  //   let expiresAt = localStorage.getItem("expiresAt");
  //   let isAuth = new Date().getTime() < expiresAt;
  //   console.log(expiresAt)
  //   console.log(new Date().getTime())
  //   console.log(isAuth)
  //   return isAuth;
  // }

  constructor(props){
    super(props);
  }

  // componentDidMount(){
  //   this.handleAuthentication();
  // }

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

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Callback);
