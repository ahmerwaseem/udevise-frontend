import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AnswerQuestionnaire.scss';
import { getQuestionnaireToTake } from '../../actions/questionnaires';

const propTypes = {

};

const defaultProps = {

};

class AnswerQuestionnaire extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getQuestionnaire(this.props.match.params.id)
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

const mapDispatchToProps = (dispatch) => ({
  getQuestionnaire: (id) => { dispatch(getQuestionnaireToTake(id))}
})

export default connect(mapStateToProps,mapDispatchToProps)(AnswerQuestionnaire);