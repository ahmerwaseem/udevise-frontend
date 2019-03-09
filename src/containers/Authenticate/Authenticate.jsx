import { connect } from 'react-redux';

import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Authenticate.scss'
import Auth from '../../Auth/Auth';
import Callback from '../../Callback/Callback';
import { storePageHistory } from '../../actions/user';

class Authenticate extends Component{
  constructor(props) {
    super(props)

  }
  

  componentDidMount() {
    const auth = new Auth();

    if (!auth.isAuthenticated()){
     this.props.storePage(this.props.match.url);
     auth.login();
    }
  }

    render(){
      const auth = new Auth();
      const { composedComponent } = this.props;
      return (
        <div>
          {auth.isAuthenticated() ? <composedComponent {...this.props} /> : <Callback/> }
        </div>
      )
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      ...state
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return({
     storePage : (pageUrl) => dispatch(storePageHistory(pageUrl))
    })
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Authenticate);  

