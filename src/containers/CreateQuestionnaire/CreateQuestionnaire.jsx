import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './CreateQuestionnaireForm.scss';
import { createQuestionnaire } from '../../actions/questionnaires';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import InputField from "../../components/InputField/InputField";
import TextArea from "../../components/TextArea/TextArea";
import Select from "../../components/Select/Select";
import { required } from '../../utils/validators';
import { CLEAR_CREATE_STATUS } from "../../actions/questionnaires";


import { Container, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const selector = formValueSelector('CreateQuestionnaireForm')
const defaultQuestion = { "question": "", "type": "TEXT_BOX"}

// const question = {
//   "anonymous": true,
//   "beginDateTime": "2019-02-23T04:42:53.832Z",
//   "description": "string",
//   "endDateTime": "2019-02-23T04:42:53.832Z",
//   "id": "string",
//   "questions": [
//     {
//       "answersAllowed": [
//         "string"
//       ],
//       "id": "string",
//       "question": "string",
//       "questionnaireId": "string",
//       "type": "MULTIPLE_CHOICE"
//     }
//   ],
//   "title": "string",
//   "usersAllowedByEmail": [
//     "string"
//   ]
// }

const questionTypeValues = [
  {"option" : "TEXT_BOX","value" : "Text box"},
  {"option" : "MULTIPLE_CHOICE","value" : "Multiple Choice"},
  {"option" : "CHECK_BOX","value" : "Checkbox"},
  {"option" : "TRUE_FALSE","value" : "True or False"},  
];

let Question = ({ question, index, fields, questionType, answersAllowed }) => (
  <div className="CreateQuestionnaireForm__question">
  <li key={index}>
    <button
      type="button"
      title="Remove Question"
      onClick={() => fields.remove(index)}
    />
    <Field
      name={`${question}.question`}
      type="text"
      component={InputField}
      label={`Question #${index+1}`}
      validate={required}
    />

    <Field name={`${question}.type`} component={Select} label="Question Type" selectValues={questionTypeValues}/> 

    {questionType=="MULTIPLE_CHOICE" && (
      <div>text
      <FieldArray name={`${question}.answersAllowed`} component={renderAnswers} />
      </div>
    )}

    {questionType=="CHECK_BOX" && (
      <div>text
      <FieldArray name={`${question}.answersAllowed`} component={renderAnswers} />
      </div>
    )}

    {(()=>{
      answersAllowed = null;
    })()}
    
  </li>
  </div>
)

let renderAnswers = ({ fields }) => {
  if (!fields.length) fields.push("");
  return(
  <ul>
    {fields.map((answer,index) =>
      <li key={index}>
        <div className="CreateQuestionnaireForm__answer">
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={answer}
          type="text"
          component={InputField}
          label={`Answer #${index+1}`}
          validate={required}
        />
      </div>
      </li>
    )}
    <li>
      <Button color="secondary"  onClick={() => fields.push()}>Add Answer</Button>
    </li>
  </ul>
  )
}

let renderQuestions = ({ fields }) => {
  if (!fields.length)fields.push(defaultQuestion);
  return (
    <ul>
      {fields.map((question, index) =>
        <Question question={question} fields={fields} index={index} key={index}/>
      )}

      <li>
        <Button color="secondary" onClick={() => fields.push({})}>Add Question</Button>
      </li>
    </ul>
  )
}

Question = connect(
  (state, props) => {
    const questionType = selector(state, `${props.question}.type`)
    const answersAllowed = selector(state, `${props.question}.answersAllowed`)
    return {
      questionType,
      answersAllowed
    }
  }
)(Question)


class CreateQuestionnaire extends Component{
  constructor(props) {
    super(props);
  }

  toggle = () => {
    console.log("toggle called")
    this.props.clear();
  }




  render(){
    const { handleSubmit, pristine, reset, submitting, questionnaire, modal } = this.props;
    console.log(questionnaire);
    return (
      <Container>
            <Modal isOpen={questionnaire && questionnaire.createSuccess} toggle={this.toggle} className={this.props.className}>
    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
        <Form className = "CreateQuestionnaireForm" onSubmit={handleSubmit(this.props.submit)}> 
          <div className = "CreateQuestionnaireForm__title">
            <Field
              name="title"
              type="text"
              component={InputField} 
              label="Title"
              validate={required}
            /> 
          </div>

          <div className = "CreateQuestionnaireForm__beginTime">
            <Field
              name="beginDateTime"
              type="datetime-local"
              component={InputField} 
              label="Start Date &amp; Time"
            /> 
          </div>

          <div className = "CreateQuestionnaireForm__endTime">
            <Field
              name="endDateTime"
              type="datetime-local"
              value={new Date()}
              component={InputField} 
              label="End Date &amp; Time"
            /> 
          </div>

          <div className = "CreateQuestionnaireForm__description">
            <Field
              name="description"
              type="textArea"
              component={TextArea}
              label="Description"
            /> 
          </div>

          <FieldArray name="questions" component={renderQuestions} />

          <div className ="CreateQuestionnaireForm__submit">
            <Button color="primary" type="submit">Submit</Button>
          </div>

        </Form>
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    questionnaire : state.questionnaire,
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
    return({
      submit: (question) => {dispatch(createQuestionnaire(question))},
      clear: () => {dispatch({type: CLEAR_CREATE_STATUS})}

  })
}

export default reduxForm({
  form: 'CreateQuestionnaireForm',
  initialValues: {
  }
})(connect(mapStateToProps,mapDispatchToProps)(CreateQuestionnaire));