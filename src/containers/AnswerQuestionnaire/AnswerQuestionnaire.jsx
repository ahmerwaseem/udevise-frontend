import  React, { Component } from 'react';
import { connect } from 'react-redux';
import './AnswerQuestionnaire.scss';
import { reduxForm } from 'redux-form';
import { getQuestionnaire, submitResponse, CLEAR_SUBMIT_RESPONSE } from '../../actions/questionnaires';
import Spinner from '../../components/Spinner/Spinner';
import { Field, change, registerField } from 'redux-form';
import SelectField from '../../components/SelectField/SelectField';
import RadioButton from '../../components/RadioButton/RadioButton';
import CheckBox from '../../components/CheckBox/CheckBox';
import { required } from '../../utils/validators';
import InputField from "../../components/InputField/InputField";
import TextArea from '../../components/TextArea/TextArea';
import uuid from "uuid";
import { Container, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormLabel, Button, Typography, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom'




const stringToComponentMapper = {
  RADIO: RadioButton,
  CHECKBOX: CheckBox,
  TEXT: InputField,
  SELECT: SelectField,
  TEXTAREA: TextArea
}


let hiddenFieldsInitialized = false;
const formName = "ResponseForm";

class AnswerQuestionnaire extends Component{

  componentWillMount(){
    this.props.getQuestionnaireById(this.props.match.params.id, this.props.type);
  }

  componentWillUpdate(){
    //hacky way of initializing hidden fields, only doing it here because its unclear when I would get
    //results back from api call in componentWillMount, which i need to register these fields.
    if (!hiddenFieldsInitialized && this.props.questionnaire && this.props.questionnaire.questionnaire){
      const { questions, id } = this.props.questionnaire.questionnaire;

      this.props.dispatch(registerField(formName,"questionnaireId",Field)) ;
      this.props.dispatch(change(formName,"questionnaireId",id)) ;

      questions.map((item, index)=>{
        let fieldName = `answers.[${index}].questionId`;
          this.props.dispatch(registerField(formName,fieldName,Field)) ;
          this.props.dispatch(change(formName,fieldName,item.id)) ;
        })
        hiddenFieldsInitialized = true;
      }
  }
  

  render(){
    if (this.props.questionnaire && this.props.questionnaire.submitResponseSuccess){
      if (this.props.questionnaire.questionnaire.type == "QUIZ"){
        return <Redirect to={`/response/${this.props.questionnaire.questionnaire.id}`} />
      } else{
      return (
        <Typography>
          Thank you for your response!
          </Typography>
      )
      }
    }
    else if (this.props.questionnaire && this.props.questionnaire.getQuestionnaireSuccess && this.props.questionnaire.questionnaire.questions){
      const { title, description, questions } = this.props.questionnaire.questionnaire;
      return (

        <Paper className="AnswerQuestionnaire paper">
          <form onSubmit={this.props.handleSubmit(this.props.submitResponse)}>
          <div>
          <Typography variant="h2" color="secondary">{title}</Typography>
          <Typography variant="h5">{description}</Typography>
          {questions.map((item, index)=>{
            let fieldType = item.type.toLowerCase();
            let fieldName = `answers.[${index}].answer`;
            // special case to render radio buttons in reduxForm
            if (fieldType=="radio"){
              return(
                <RadioButton selectvalues={item.answersAllowed} name={`${fieldName}-temp`} label={item.question} converttoarray={true} customDispatch={ (e)=> this.props.dispatch(change(formName,fieldName,e)) } /> 
              )    
            } else{
              return(<div>
              <Field key={index} validate={required} name={fieldName} converttoarray={true} component={stringToComponentMapper[item.type]} label={item.question} selectvalues={item.answersAllowed}/> 
              </div>)
            }
          })}
        </div>          
          <Button variant="contained" color="primary" type="submit">Submit</Button>
          </form>
          </Paper>
          )
      } else if ( this.props.questionnaire && this.props.questionnaire.getQuestionnaireFailed ){
        return(<div>
          {this.props.questionnaire.getQuestionnaireFailed ?
           <div> {this.props.questionnaire.getQuestionnaireFailed} </div> :
            <div>
              Error finding questionnaire
            </div>
          }
          </div>)
      } else {
        return (
          <Spinner/>
        )
      }
  }

}

const mapStateToProps = (state) => {
  return {
    ...state,
    questionnaire : state.questionnaire
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestionnaireById: (id,type) => { dispatch(getQuestionnaire(id,type)) },
  submitResponse: (formValues) => { dispatch(submitResponse(formValues))},
  clear: () => { dispatch({type: CLEAR_SUBMIT_RESPONSE})}
})

export default reduxForm({
  form: formName,
})(connect(mapStateToProps,mapDispatchToProps)(AnswerQuestionnaire));