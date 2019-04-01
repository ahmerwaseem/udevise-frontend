import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './CreateQuestionnaireForm.scss';
import { createQuestionnaire, CLEAR_QUESTIONNAIRES } from '../../actions/questionnaires';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import InputField from "../../components/InputField/InputField";
import TextArea from "../../components/TextArea/TextArea";
import Select from "../../components/Select/Select";
import { required } from '../../utils/validators';
import { CLEAR_CREATE_STATUS } from "../../actions/questionnaires";


import { Container, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getHost } from '../../utils/pathUtils';

const selector = formValueSelector('CreateQuestionnaireForm')
const defaultQuestion = { "question": "", "type": "TEXT"}

const sampleUpload = {
  "questions": [
    {
      "question": "text sample question",
      "type": "TEXT"
    },
    {
      "answersAllowed": [
        "answer1",
        "answer2",
        "answer3"
      ],
      "question": "select question sample",
      "type": "SELECT"
    }
  ],
  "title": "Upload Mock",
  "description": "Description upload mock"
}

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
  {"option" : "TEXT","value" : "Short Answer"},
  {"option" : "TEXTAREA","value" : "Long Answer"},
  {"option" : "RADIO","value" : "Radio - Select One"},
  {"option" : "SELECT","value" : "Select - Select One "},
];

let test = {
  "title": "string"
}


let Question = ({ question, index, fields, questionType, answersAllowed }) => (
  <div className="CreateQuestionnaireForm__question">
  <li key={index}>
  {index!=0 && (
    <button
      type="button"
      onClick={() => fields.remove(index)}
    >
    Remove Question
    </button>
    )}
    <Field
      name={`${question}.question`}
      type="text"
      component={InputField}
      label={`Question #${index+1}`}
      validate={required}
    />

    <Field name={`${question}.type`} component={Select} label="Question Type" selectValues={questionTypeValues}/> 

    {(questionType=="RADIO" || questionType=="SELECT") && (
      <div>text
      <FieldArray name={`${question}.answersAllowed`} component={renderAnswers} />
      </div>
    )}

    
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
          onClick={() => fields.remove(index)}
        >
        Remove Answer
        </button>
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
        <Button color="secondary" onClick={() => fields.push(defaultQuestion)}>Add Question</Button>
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

  componentWillMount(){
    this.state = {
      initial: { "title" : "Ass"}
    }
  }

  toggle = () => {
    this.props.clear();
  }



  render(){
    console.log(this.props)
    const { handleSubmit, pristine, reset, submitting, questionnaire, modal } = this.props;
    return (
      <Container>
        {(()=>{
          if (questionnaire && questionnaire.createSuccess){
            return(
              <Modal isOpen={questionnaire && questionnaire.createSuccess} toggle={this.toggle} className={this.props.className}>
              <ModalHeader>Create Success</ModalHeader>
              <ModalBody>
                Here's where everyone can respond: {`${getHost()}/answer/${questionnaire.id}`}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            )
          }

        })()}

        <button onClick={()=>{
          this.props.initialize(sampleUpload)
        }}>
          Upload Questionnaire
          </button>

        <button onClick={()=>{
          this.props.initialize({})
        }}>
          Reset
          </button>

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

          {/* <div className = "CreateQuestionnaireForm__beginTime">
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
          </div> */}

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
    initialValues : state.customInitialValues,
    questionnaire : state.questionnaire,
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
    return({
      submit: (question) => {dispatch(createQuestionnaire(question))},
      clear: () => {dispatch({type: CLEAR_QUESTIONNAIRES})}

  })
}

export default reduxForm({
  form: 'CreateQuestionnaireForm',
  enableReinitialize: true, 
  initialValues: {}
})(connect(mapStateToProps,mapDispatchToProps)(CreateQuestionnaire));