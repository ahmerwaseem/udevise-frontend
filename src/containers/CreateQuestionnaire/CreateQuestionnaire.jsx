import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './CreateQuestionnaire.scss';
import { createQuestionnaire, CLEAR_QUESTIONNAIRES } from '../../actions/questionnaires';
import { Field, FieldArray, reduxForm, formValueSelector,change, registerField } from 'redux-form';

import InputField from "../../components/InputField/InputField";
import TextArea from "../../components/TextArea/TextArea";
import SelectField from "../../components/SelectField/SelectField";
import { required } from '../../utils/validators';
import { CLEAR_CREATE_STATUS } from "../../actions/questionnaires";

import { Container, Form, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { Button } from "@material-ui/core"
import { getHost } from '../../utils/pathUtils';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBoxSharp';
import CheckBox from '../../components/CheckBox/CheckBox';



const formName="CreateQuestionnaireForm";

const defaultProps = {
  type: "survey",
  initialValues: {}
};

const selector = formValueSelector('CreateQuestionnaireForm')

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
  {"option" : "RADIO","value" : "Radio - Pick One"},
  {"option" : "SELECT","value" : "Dropdown - Select One"},
  {"option" : "CHECKBOX","value" : "Multiple Answers"}
];

let test = {
  "title": "string"
}


let Question = ({ question, index, fields, questionType, answersAllowed, type }) => (
  <div className="CreateQuestionnaireForm__question">
  <li key={index}>
  {index!=0 && (
    <span className="RemoveButton">
    <Button
      variant="outlined"
      color="secondary"      
      onClick={() => fields.remove(index)}
    >
    <DeleteIcon/> Remove
    </Button>
    </span>
    )}
    <Field
      name={`${question}.question`}
      type="text"
      component={InputField}
      label={`Question #${index+1}`}
      validate={required}
    />

    <Field name={`${question}.type`} component={SelectField} label="Type" selectvalues={questionTypeValues} validate={required} />

    {(questionType=="RADIO" || questionType=="SELECT" || questionType=="CHECKBOX") && (
      <div>
      <FieldArray name={`${question}.answersAllowed`} component={renderAnswers} />
      </div>
    )} 

    {answersAllowed  && type == "QUIZ" &&
      <Field name={`${question}.correctAnswer`} component={SelectField} label="Confirm Correct Answer" selectvalues={answersAllowed} validate={required} />
    }
  
  </li>
  </div>
)

let Answer = ({ answer, index, fields }) => (
  <li key={index}>
  <div className="CreateQuestionnaireForm__answer">
  {index!=0 && (
  <span className="RemoveButton">
    <Button
    variant="outlined"
    color="secondary"             
    onClick={() => fields.remove(index)}
    >
    <DeleteIcon/> Remove
    </Button>
  </span>
  )}
  <Field
    name={answer}
    type="text"
    component={InputField}
    label={`Answer #${index+1}`}
    validate={required}
  />
</div>
</li>
)


let renderAnswers = ({ fields }) => {
  if (!fields.length) fields.push("");
  return(
  <ul>
    {fields.map((answer,index) =>
     <Answer answer={answer} fields={fields} index={index} key={index}/>
    )}
    <li>
      <Button variant="outlined" color="primary"  onClick={() => fields.push()}><AddIcon/> Answer</Button>
    </li>
  </ul>
  )
}

let renderQuestions = ({ fields }) => {
  if (!fields.length)fields.push({});
  return (
    <ul>
      {fields.map((question, index) =>
        <Question question={question} fields={fields} index={index} key={index}/>
      )}

      <li>
        <Button variant="outlined" color="primary" onClick={() => fields.push({})}><AddIcon/> Question</Button>
      </li>
    </ul>
  )
}

Question = connect(
  (state, props) => {
    const questionType = selector(state, `${props.question}.type`)
    const type = selector(state,  `type`)
    const answersAllowed = selector(state, `${props.question}.answersAllowed`)

    return {
      questionType,
      type,
      answersAllowed
    }
  }
)(Question)

class CreateQuestionnaire extends Component{
  constructor(props) {
    super(props);
    this.toggle=this.toggle.bind(this);

  }

  toggle = () => {
    this.props.clear();
   // this.props.destroy();
    this.props.initialize({type: this.props.type});
  }

//   componentWillMount(){
//     console.log(this.props);
//     if (this.props.initialValues){
//       this.props.initialize(this.props.initialValues);
//     }
//     // this.props.dispatch(registerField(formName,"questionnaireType",Field)) ;
// //    this.props.dispatch(change(formName,"questionnaireType",this.props.type.toUpperCase())) ;
//   }



  render(){
    console.log(this.props)
    const { handleSubmit, pristine, reset, submitting, questionnaire, modal } = this.props;
    return (
      <div className="CreateQuestionnaire">
        {questionnaire && questionnaire.createSuccess &&
            <Modal isOpen={questionnaire && questionnaire.createSuccess} toggle={this.toggle} className={this.props.className}>
              <ModalHeader>Create Success</ModalHeader>
              <ModalBody>
                Here's where everyone can respond: {`${getHost()}/${this.props.type ? this.props.type.toLowerCase() : "survey"}/${questionnaire.id}`}
                <div>Click OK to be redirected to your Dashboard</div>
                <div>Click Cancel to create another {this.props.type}</div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={()=>{ this.props.clear(); this.props.history.push("/dashboard"); } }>OK</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
        }

        <h3 className="Header">CREATE {this.props.type}</h3>

        <Button variant="contained" color="primary" onClick={()=>{
          this.props.initialize(sampleUpload)
        }}>
          Upload Via JSON
          </Button>

        <Button variant="contained" color="secondary" onClick={()=>{
          this.toggle();
        }}>
          Reset
          </Button>

        <Form autocomplete="off" className = "CreateQuestionnaireForm" onSubmit={handleSubmit(this.props.submit)}> 
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
            <Button fullWidth type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>

        </Form>
      </div>
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
      clear: () => {dispatch({type: CLEAR_CREATE_STATUS})}

  })
}

CreateQuestionnaire.defaultProps = defaultProps;

export default reduxForm({
  form: formName,
  enableReinitialize: true, 
})(connect(mapStateToProps,mapDispatchToProps)(CreateQuestionnaire));

