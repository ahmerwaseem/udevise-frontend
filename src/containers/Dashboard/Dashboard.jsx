import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { getAllQuestionnaires } from '../../actions/questionnaires';
import { getUserSubmitted } from '../../actions/user';
import Spinner from '../../components/Spinner/Spinner';
import { Container, Row, Col, Badge} from 'reactstrap';
import { getHost } from '../../utils/pathUtils';
// import Button from "reactstrap/es/Button";
import { AddCircle } from "@material-ui/icons"
import {Divider, Button, Typography} from "@material-ui/core";
import {Switch, Route, Link} from "react-router-dom";
import QuestionnaireDetails from '../../components/QuestionnaireDetails/QuestionnaireDetails';
import CreateQuestionnaire from '../CreateQuestionnaire/CreateQuestionnaire';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import uuid from 'uuid';
import QuestionnaireTable from '../../components/QuestionnaireTable/QuestionnaireTable';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#0F8CE0',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Dashboard extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getQuestionnaireForUser();
    this.props.getUserSubmissions();
  }

  render(){

    if (this.props.questionnaires && this.props.questionnaires.allQuestionnaires ){

      const {allQuestionnaires,} = this.props.questionnaires;
      return(
      <div className = "Dashboard"> 
        <h4>Your Creations</h4>
        <QuestionnaireTable data={allQuestionnaires} type="SURVEY"/>
        <QuestionnaireTable data={allQuestionnaires} type="QUIZ"/>

        <h4>Quizzes Taken</h4>
        {this.props.user && 
          getUserSubmissions(this.props.user.submissions)
        }


      </div>
      )
    } else{
      return (
          <div className = "Dashboard">
            <Spinner/>
          </div>
      )
    }
  }

}

const getUserSubmissions = (data) =>{
  if (data){
      return(
        <div>
        <Paper>
      <Table>
        <TableHead color="primary">
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Date Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((value)=>{
            return (
                <TableRow>
                <TableCell component="th" scope="row">
                <Link to={`response/${value.questionnaireId}`}>
                {value.questionnaireTitle}
                </Link>
                </TableCell>
                <TableCell align="right">{value.timeCompleted}</TableCell>
              </TableRow>

            )
          })
        }
        </TableBody>
      </Table>
    </Paper>
    </div>
      )
  }
}

const createTableForQuestionnaires = (data, type) => (
  <Paper className="paper">
    <div className="tableHeader">
    <Typography  className="tableTitle" variant="h2" color="secondary">
          {type}
    </Typography>
    < Link to={`create/${type.toLowerCase()}`}>
      <Fab className="tableButton" variant="extended" color="primary" aria-label="Add">
        <AddCircle/> New
      </Fab>
    </Link>
  </div>       
  <Paper>
  <Table>
  <TableHead>
    <TableRow>
      <CustomTableCell style={{width: '50%'}}>Title</CustomTableCell>
      <CustomTableCell align="right">Created (UTC)</CustomTableCell>
      <CustomTableCell align="right"># Responses</CustomTableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {mapQuestionnaires(data,type)}
  </TableBody>
  </Table>
  </Paper>
  </Paper>
)

const mapQuestionnaires = (data, type) => {
  data = data.filter(x=>x.type == type);
  if (data == undefined || data == null ||  typeof data !== "object" || data.length <= 0 ){
    return (
      <TableRow key={uuid.v4()}>
        <CustomTableCell  style={{width: '50%'}} component="th" scope="row">
          {`CLICK NEW TO CREATE YOUR FIRST ${type}!`}
        </CustomTableCell>
      </TableRow>
    )
  }

  return data.map((value)=>{
    return (
        <TableRow key={uuid.v4()}>
        <CustomTableCell  style={{width: '50%'}} component="th" scope="row">
        <Link to={`/detail/${value.id}`}>
          {value.title}
        </Link>
        </CustomTableCell>
        <CustomTableCell align="right">{value.createTime}</CustomTableCell>
        <CustomTableCell align="right">{value.responses ? value.responses.length : 0}</CustomTableCell>
      </TableRow>
    )
  })
}
const mapStateToProps = (state) => {
  return {
    ...state,
    questionnaires: state.questionnaire

  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getQuestionnaireForUser: () => dispatch(getAllQuestionnaires()),
    getUserSubmissions : () => dispatch(getUserSubmitted())
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);