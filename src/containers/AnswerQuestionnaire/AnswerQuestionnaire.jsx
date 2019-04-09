import  React, { Component } from 'react';
import { connect } from 'react-redux';
import './AnswerQuestionnaire.scss';
import { reduxForm } from 'redux-form';
import { getQuestionnaire, submitResponse, CLEAR_SUBMIT_RESPONSE } from '../../actions/questionnaires';
import Spinner from '../../components/Spinner/Spinner';
import { Field, change, registerField } from 'redux-form';
import Select from '../../components/Select/Select';
import RadioButton from '../../components/RadioButton/RadioButton';
import CheckBox from '../../components/CheckBox/CheckBox';
import { required } from '../../utils/validators';
import InputField from "../../components/InputField/InputField";
import TextArea from '../../components/TextArea/TextArea';
import uuid from "uuid";
import { Container, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




const stringToComponentMapper = {
  RADIO: RadioButton,
  CHECKBOX: CheckBox,
  TEXT: InputField,
  SELECT: Select,
  TEXTAREA: TextArea
}


let hiddenFieldsInitialized = false;
const formName = "ResponseForm";

class AnswerQuestionnaire extends Component{

  componentWillMount(){
    this.props.getQuestionnaireById(this.props.match.params.id);
  }

  componentWillUpdate(){
    if (this.props.questionnaire && this.props.questionnaire.questionnaire && !hiddenFieldsInitialized){
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
    console.log(this.props)
    if (this.props.questionnaire && this.props.questionnaire.getQuestionnaireSuccess && this.props.questionnaire.questionnaire.questions){
      const { title, description, questions } = this.props.questionnaire.questionnaire;
      return (

        <Container>
            <Modal isOpen={this.props.questionnaire && this.props.questionnaire.submitResponseSuccess} toggle={()=>{this.props.clear()} } className={this.props.className}>
              <ModalHeader>Submit Success</ModalHeader>
              <ModalBody>
                You've successful submitted your response. Please close this window or click OK to redirect to homepage.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={()=>{ this.props.clear(); this.props.history.push("/"); } }>OK</Button>{' '}
              </ModalFooter>
            </Modal>
          <form onSubmit={this.props.handleSubmit(this.props.submitResponse)}>
          <div>
          <h2>{title}</h2>
          <h5>{description}</h5>
          {questions.map((item, index)=>{
            let fieldType = item.type.toLowerCase();
            let fieldName = `answers.[${index}].answer`;
            // special case to render radio buttons in reduxForm
            if (fieldType=="radio"){
              return(
                <div>
                <label>{`${index+1}.${item.question}`} 
                {item.answersAllowed.map((values, index)=>{
                  return(
                    <Field component={stringToComponentMapper[item.type]} type="radio" name={fieldName} value={values.option ? values.option : values}>{values.value ? values.value : values}</Field>
                  )
                })}
                </label>
                </div>
              )
            } else{
              return(<div>
              <Field key={index} validate={required} name={fieldName} component={stringToComponentMapper[item.type]} label={`${index+1}. ${item.question}`} selectValues={item.answersAllowed}/> 
              </div>)
            }
          })}
        </div>          
          <Button color="primary" type="submit">Submit</Button>
          </form>
          </Container>
          )
      } else if ( this.props.questionnaire && ( this.props.questionnaire.getQuestionnaireFailed  ||  !this.props.questionnaire.questions ) ){
        return(<div>Error finding questionnaire</div>)
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
  getQuestionnaireById: (id) => { dispatch(getQuestionnaire(id)) },
  submitResponse: (formValues) => { dispatch(submitResponse(formValues))},
  clear: () => { dispatch({type: CLEAR_SUBMIT_RESPONSE})}
})

export default reduxForm({
  form: formName,
})(connect(mapStateToProps,mapDispatchToProps)(AnswerQuestionnaire));