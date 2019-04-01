import  React, { Component } from 'react';
import { connect } from 'react-redux';
import './AnswerQuestionnaire.scss';
import { reduxForm } from 'redux-form';
import { getQuestionnaire, submitResponse } from '../../actions/questionnaires';
import Spinner from '../../components/Spinner/Spinner';
import { Field, change, registerField } from 'redux-form';
import Select from '../../components/Select/Select';
import RadioButton from '../../components/RadioButton/RadioButton';
import CheckBox from '../../components/CheckBox/CheckBox';
import { required } from '../../utils/validators';
import InputField from "../../components/InputField/InputField";
import TextArea from '../../components/TextArea/TextArea';


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
        let key = `answers.[${index}].questionId`;
          this.props.dispatch(registerField(formName,key,Field)) ;
          this.props.dispatch(change(formName,key,item.id)) ;
        })
        hiddenFieldsInitialized = true;
      }
  }
  

  render(){
    console.log(this.props)
    if (this.props.questionnaire && this.props.questionnaire.getQuestionnaireSuccess){
      const { title, description, questions } = this.props.questionnaire.questionnaire;

      return (
        <div>
          <form onSubmit={this.props.handleSubmit(this.props.submitResponse)}>
          <div>
          <h3>{title}</h3>
          <h2>{description}</h2>
          {questions.map((item, index)=>{
            let fieldName = `answers.[${index}].answer`;
              return(<div>
              <Field key={index} validate={required} name={fieldName} component={stringToComponentMapper[item.type]} label={`${index+1}. ${item.question}`} selectValues={item.answersAllowed}/> 
              </div>)
            }
          )}
        </div>          
          <button type="submit">Submit</button>
          </form>
        </div>
        )
      } else if (this.props.questionnaire && this.props.questionnaire.getQuestionnaireFailed){
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
  submitResponse: (formValues) => { dispatch(submitResponse(formValues))}
})

export default reduxForm({
  form: formName,
})(connect(mapStateToProps,mapDispatchToProps)(AnswerQuestionnaire));