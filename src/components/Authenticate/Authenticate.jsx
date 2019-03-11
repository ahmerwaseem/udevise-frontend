import  React, { Component } from 'react';
import './Authenticate.scss'
import Auth from '../../Auth/Auth';
import Spinner from '../Spinner/Spinner';

const requireAuth = (ComposedComponent) => {
  const auth = new Auth();
  return class Authenticate extends Component{
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!auth.isAuthenticated()){
      localStorage.setItem("preAuthPage",this.props.match.url)
     auth.login();
    }
  }

    render(){
      return (
        <div>
          {auth.isAuthenticated() ? <ComposedComponent {...this.props} /> : <Spinner/> }
        </div>
      )
    }
  }
}
export default requireAuth;