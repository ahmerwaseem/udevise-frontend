import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ErrorBoundary.scss';
import { withRouter } from 'react-router-dom'
import { CLEAR_ERROR } from '../../actions/questionnaires'

const propTypes = {

};

const defaultProps = {

};

let errorMsg = "An error has occurred. Please try again later."


class ErrorBoundary extends Component{
  constructor(props) {
    super(props);
    const { history } = this.props;

    history.listen(() => {
      if (this.props.questionnaire && this.props.questionnaire.hasError) {
        this.props.clearError();
      }
    });
  }

  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      top: '40%',
      bottom: 0,
      left: 0,
      right: 0,
    }

    if (this.props.questionnaire && this.props.questionnaire.hasError) {
      if(this.props.questionnaire.errorMessage){
        errorMsg = this.props.questionnaire.errorMessage;
      }
      return (
        <div style ={style}>         
        <h1>{errorMsg}</h1>
        </div>
      )
    }
  
    return this.props.children;
  }

}

ErrorBoundary.propTypes = propTypes;
ErrorBoundary.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    clearError: ()=> {dispatch({type: CLEAR_ERROR})}
  }
}
ErrorBoundary = withRouter(ErrorBoundary);
export default connect(mapStateToProps,mapDispatchToProps)(ErrorBoundary);