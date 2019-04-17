import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ResponseDetail.scss';
import { getResponseDetails } from '../../actions/questionnaires';
import { CheckCircle } from '@material-ui/icons'
import classNames from 'classnames'
import Spinner from '../../components/Spinner/Spinner'


class ResponseDetail extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    console.log(this.props.match.params);
    this.props.getDetails(this.props.match.params.id,this.props.match.params.responseId)
  }

  render(){
    const { responseDetail, pending, success, failure } = this.props;

    return(
    <div className = "ResponseDetail"> 
      {responseDetail && pending &&
        <Spinner/>
      }
      {responseDetail && success &&
        <div>
          <h2>{responseDetail.title}</h2> 
          <h3>{responseDetail.description}</h3>
          {responseDetail.questions &&
            getQuestionDetails(responseDetail.questions,responseDetail.type)
          }
        </div>
      }
      {failure &&
        <div>
          There was an error processing your request. Please try again later.
        </div>
      }
    </div>
    )
  }

}

const getQuestionDetails = (questions,type) => {
  if (questions){
    return questions.map((value,index)=>{
      return(
        <div>
        <h5>{value.question}</h5>
        {value.answersGiven &&
          getUserAnswer(value.answersGiven, value.correctAnswer,type)
        }
        </div>

      )
    })
  }
}

const getUserAnswer = (answerList, correctAnswer,type) => {
  if (answerList){
    return answerList.map((value,index)=>{
      return(
        <div>
          {console.log(value.correct)}
          <div className={classNames({
              'answer--incorrect': value.correct !== undefined && !value.correct,
              'answer--correct': value.correct
          })}>
              Answer Given: {value.answer}
          {value.correct !== undefined && value.correct &&
            <CheckCircle/>
          }
          </div>
          {!value.correct && correctAnswer &&
            <div>
              Correct Answer: {correctAnswer}
            </div>
          }
          {value.correct == undefined && type.toUpperCase() !== "SURVEY" &&
            <div>
              Please check back later. This has not been graded.
            </div>
          }
        </div>
      )
    })
  }
}


const mapStateToProps = (state) => {
  return {
    responseDetail : state.questionnaire ? state.questionnaire.responseDetail : null,
    success : state.questionnaire ? state.questionnaire.responseDetailSuccess : null,
    pending : state.questionnaire ? state.questionnaire.responseDetailPending: null,
    failure : state.questionnaire ? state.questionnaire.responseDetailFailure: null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    getDetails: (id,responseId) => {dispatch(getResponseDetails(id,responseId))}
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseDetail);