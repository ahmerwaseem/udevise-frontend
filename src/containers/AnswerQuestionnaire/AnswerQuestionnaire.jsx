import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AnswerQuestionnaire.scss';

const propTypes = {

};

const defaultProps = {

};

class AnswerQuestionnaire extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "AnswerQuestionnaire"> 
        AnswerQuestionnaire {this.props.match.url}
      </div>
    )
  }

}

AnswerQuestionnaire.propTypes = propTypes;
AnswerQuestionnaire.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps)(AnswerQuestionnaire);