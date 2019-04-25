import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ResponseDetail.scss';
import { getResponseDetails, gradeQuiz, CLEAR_GRADE_QUIZ, CLEAR_RESPONSE_DETAILS } from '../../actions/questionnaires';
import { CheckCircle } from '@material-ui/icons'
import classNames from 'classnames'
import Spinner from '../../components/Spinner/Spinner'
import { reduxForm } from 'redux-form';
import { Field, change, registerField } from 'redux-form';
import InputField from '../../components/InputField/InputField';
import TextArea from '../../components/TextArea/TextArea';
import { required, positiveNumber } from '../../utils/validators';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


let init = false;

class ResponseDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      popup: true
    }
  }

  
  initializeScoreFeedback = (responseDetails) =>{
    console.log(responseDetails)
    if (this.props.match.params.responseId && responseDetails && responseDetails.responses > 0){
      this.props.initialize({ 
        "score": responseDetails.responses[0].score,
        "feedback": responseDetails.responses[0].feedback
      })
    }
  }

  userResult = (responseDetails) => {
    let score = null;
    let feedback = null;
    if (responseDetails){
      console.log(responseDetails.responses.length);

    }
    if (responseDetails && responseDetails.responses.length > 0){
        score = responseDetails.responses[0].score
        feedback = responseDetails.responses[0].feedback
    }
    return (
      <div>
        <div>
          Your Score: {score ? score : "Not Graded Yet"}
        </div>
        <div>
          Feedback: {feedback ? feedback : "No Feedback Given"}
        </div>
      </div>
    )

  }

  handleClose = () =>{
    this.setState({
      popup: false
    })
    this.props.clear();
  }

  componentWillMount(){
    console.log(this.props.match.params);
    this.props.getDetails(this.props.match.params.id,this.props.match.params.responseId)
  }

  componentWillUnmount(){
    this.props.clear();
    this.props.clearResponseDetails();
  }

  componentDidMount(){
    if (this.props.match.params.responseId && this.props.responseDetails && this.props.responseDetails.responses > 0){
      this.props.initialize({ 
        "score": this.props.responseDetails.responses[0].score,
        "feedback": this.props.responseDetails.responses[0].feedback
      })
    }
  }

  render(){
    const { responseDetail, pending, success, failure, gradeQuizSuccess } = this.props;
    return(
    <div className = "ResponseDetail">
      {gradeQuizSuccess && 
        <div>
              <div>
                <Dialog
                  open={this.state.popup}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">Submit Success</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You've successfully submitted score and feedback.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
        </div>
      }

      {responseDetail && pending &&
        <Spinner/>
      }
      {responseDetail && success &&
        <div>
          <h2>{responseDetail.title}</h2> 
          {responseDetail.description && <h3>{responseDetail.description}</h3>}
          {responseDetail.questions &&
            getQuestionDetails(responseDetail.questions,responseDetail.type)
          }
          {responseDetail.type == "QUIZ" && 
          <div>
            {this.props.match.params.responseId ? 
              <div className="ResponseDetailForm">
                <form onSubmit={this.props.handleSubmit(this.props.gradeResponse)}>
                  <Field component={InputField} name="score" parse={value => Number(value)} type="number" label={"Score Earned"} validate={[positiveNumber]}/>
                  <Field component={TextArea} name="feedback" label="Feedback" validate={required}/>
                  <Button variant="contained" color="primary" type="submit">Submit</Button>          
                </form>
                {this.initializeScoreFeedback(responseDetail)}
              </div>
            : <div>{this.userResult(responseDetail)}</div>
            }
          </div>
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
              Answer Given: {value.answer.toString()}
          {value.correct !== undefined && value.correct &&
            <CheckCircle/>
          }
          </div>
          {!value.correct && correctAnswer &&
            <div>
              Correct Answer: {correctAnswer.toString()}
            </div>
          }
          {value.correct == undefined && type.toUpperCase() !== "SURVEY" &&
            <div>
              Please check back later.
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
    gradeQuizPending : state.questionnaire ? state.questionnaire.gradeQuizPending: null,
    gradeQuizSuccess : state.questionnaire ? state.questionnaire.gradeQuizSuccess: null,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return({
    getDetails: (id,responseId) => {dispatch(getResponseDetails(id,responseId))},
    gradeResponse: (formValues) => {dispatch(gradeQuiz(formValues,ownProps.match.params.id,ownProps.match.params.responseId))},
    clear: () => {dispatch({type: CLEAR_GRADE_QUIZ})},
    clearResponseDetails: () => {dispatch({type: CLEAR_RESPONSE_DETAILS})}
  })
}

export default reduxForm({
  form: "ResponseDetailForm",
  enableReinitialize: true
})(connect(mapStateToProps, mapDispatchToProps)(ResponseDetail));