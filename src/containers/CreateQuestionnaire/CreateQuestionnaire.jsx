import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CreateQuestionnaire.scss';

const propTypes = {

};

const defaultProps = {

};

class CreateQuestionnaire extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "CreateQuestionnaire"> 
        CreateQuestionnaire 
      </div>
    )
  }

}

CreateQuestionnaire.propTypes = propTypes;
CreateQuestionnaire.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps)(CreateQuestionnaire);