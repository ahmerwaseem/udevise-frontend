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
import { Button, InputAdornment, Paper, Typography } from "@material-ui/core"
import { getHost } from '../../utils/pathUtils';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckBox from '../../components/CheckBox/CheckBox';
import ArrowBack from '@material-ui/icons/ArrowBack'
import FileCopy from '@material-ui/icons/FileCopyTwoTone'



import {CopyToClipboard} from 'react-copy-to-clipboard';




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
  {"option" : "RADIO","value" : "Pick One"},
  {"option" : "SELECT","value" : "Select One (Dropdown)"},
  {"option" : "CHECKBOX","value" : "Multiple Answer"}
];

let test = {
  "title": "string"
}



class CreateQuestionnaire extends Component{
  constructor(props) {
    super(props);
    this.toggle=this.toggle.bind(this);
    this.state = {
      value: 0,
      copied: false
    };

  }

  
Question = ({ question, index, fields, questionType, answersAllowed, type }) => (
  <div className="CreateQuestionnaireForm__question">
  <li key={index}>
    <Field
      name={`${question}.question`}
      type="text"
      component={InputField}
      label={`Question #${index+1}`}
      validate={required}
      InputProps={{
        endAdornment: <InputAdornment position="end">  {index!=0 && (
          <span className="RemoveButton">
            <DeleteIcon color="secondary"      
            onClick={() => fields.remove(index) }/>
          </span>
          )}</InputAdornment>
      }}
    />

    <Field name={`${question}.type`} component={SelectField} label="Select Answer Type" selectvalues={questionTypeValues} validate={required} onClick={()=>this.props.change(`${question}.correctAnswer`,null)} />

    {(questionType=="RADIO" || questionType=="SELECT" || questionType=="CHECKBOX") && (
      <div>
      <FieldArray name={`${question}.answersAllowed`} component={this.renderAnswers} question={question} />
      {this.selectCorrectAnswer(type,questionType,answersAllowed, question)}
      </div>
    )} 
  
  </li>
  </div>
)

selectCorrectAnswer = (questionnaireType, questionType, answersAllowed, question) => {
  if (answersAllowed){
    if (questionnaireType == "QUIZ"){
      if (questionType == "CHECKBOX"){
        return <Field name={`${question}.correctAnswer`} component={CheckBox} label="Confirm Correct Answers" selectvalues={answersAllowed} validate={required} />
      } else {
        return <Field name={`${question}.correctAnswer`} component={SelectField} converttoarray={true} label="Confirm Correct Answer" selectvalues={answersAllowed} validate={required} />
      }
    }
  }
}


Answer = ({ answer, index, fields, question }) => (
  <li key={index}>
  <div className="CreateQuestionnaireForm__answer">
 
  <Field
    name={answer}
    type="text"
    component={InputField}
    label={`Answer #${index+1}`}
    validate={required}
    InputProps={{
      endAdornment:  <InputAdornment position="end">  {index!=0 && (
        <span className="RemoveButton">
          <DeleteIcon color="secondary"      
          onClick={() => { fields.remove(index); this.props.change(`${question}.correctAnswer`,null); } }
          ></DeleteIcon>
          </span>
        )}</InputAdornment>
    }}
  />
</div>
</li>
)


renderAnswers = ({ fields, question }) => {
  if (!fields.length) fields.push("");
  return(
  <ul>
    {fields.map((answer,index) =>
     <this.Answer answer={answer} fields={fields} index={index} key={index} question={question}/>
    )}
    <li>
      <Button variant="outlined" color="primary"  onClick={() => fields.push()}><AddIcon/> Answer</Button>
    </li>
  </ul>
  )
}

renderQuestions = ({ fields }) => {
  if (!fields.length)fields.push({});
  return (
    <ul>
      {fields.map((question, index) =>
        <this.Question question={question} fields={fields} index={index} key={index}/>
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
)(this.Question)

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
    const { handleSubmit, pristine, reset, submitting, questionnaire, modal } = this.props;
    return (
      <div className="CreateQuestionnaire">

      <Paper className="paper" raised={true}>
        {questionnaire && questionnaire.createSuccess &&
            <Modal isOpen={questionnaire && questionnaire.createSuccess} toggle={this.toggle} className={this.props.className}>
              <ModalHeader>Create Success</ModalHeader>
              <ModalBody className="text-wrap">
                Here's a link to your {this.props.type.toLowerCase()}: {`${getHost()}/${this.props.type ? this.props.type.toLowerCase() : "survey"}/${questionnaire.id}`}
                <CopyToClipboard text={`${getHost()}/${this.props.type ? this.props.type.toLowerCase() : "survey"}/${questionnaire.id}`}
          onCopy={() => this.setState({copied: true})}>
                      <FileCopy color="primary" /> 
            </CopyToClipboard>
            {this.state.copied ? "Copied" : null}
                <div>Click OK to be redirected to your Dashboard</div>
                <div>Click Cancel to create another {this.props.type.toLowerCase()}</div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={()=>{ this.props.clear(); this.props.history.push("/dashboard"); } }>OK</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
        }

        <Typography color="secondary" variant="h2" className="createHeader">CREATE {this.props.type}</Typography>

        {/* <Button variant="contained" color="primary" onClick={()=>{
          this.props.initialize(sampleUpload)
        }}>
          Upload Via JSON
          </Button> */}

        <Button variant="outlined" color="secondary" onClick={()=>{
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

          <FieldArray name="questions" component={this.renderQuestions} />

          <div className ="CreateQuestionnaireForm__submit buttonContainer">
            <Button className="button" fullWidth variant="contained" color="secondary" onClick={()=>this.props.history.push("/dashboard")}>Back</Button>   
            <Button className="button" fullWidth type="submit" variant="contained" color="primary">Submit</Button>
          </div>

        </Form>
      </Paper>
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

