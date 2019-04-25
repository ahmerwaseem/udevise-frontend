import  React, { Component } from 'react';
import { connect } from 'react-redux';
import './QuestionnaireDetails.scss';
import { Alert} from 'reactstrap';
import DetailCard from '../../components/DetailCard/DetailCard';
import { getDetailsById, CLEAR_QUESTIONNAIRES } from '../../actions/questionnaires';
import AccordianItem from '../../components/AccordianItem/AccordianItem';
import { Typography,Button, Card, CardContent, CardMedia} from '@material-ui/core';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { getHost } from '../../utils/pathUtils';


class QuestionnaireDetails extends Component{
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.getDetail(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clear();
  }

  
  render(){
    console.log(this.props.questionnaire);
    const { questionnaire } = this.props;
    return(
    <div className="QuestionnaireDetails">
      <div className="QuestionnaireDetailsWrapper">
        {(questionnaire && questionnaire.detail)
        &&
        <div>
        <DetailCard
          title={questionnaire.detail.title}
          description={questionnaire.detail.description}
          createTime={questionnaire.detail.createTime}
          responses={questionnaire.detail.responses}
          id={questionnaire.detail.id}
          {...this.props}
        >
        {questionnaire.detail.questions && 
        <div>
          <Typography color="textSecondary"> Direct Link: {`${getHost()}/${questionnaire.detail.type.toLowerCase()}/${questionnaire.detail.id}`} </Typography>

          <Typography color="textSecondary"> Quick Results </Typography>
        {questionnaire.detail.questions.map((item) => {
            return (
              <AccordianItem heading={item.question}>
                {item.answersGiven ? processAnswers(item) : "No responses have been submitted." }
              </AccordianItem>
            )
          })}
          </div>}

        </DetailCard>
        {questionnaire.detail.responses && questionnaire.detail.responses.map((item)=>{
          return (

            <Card>
            <div>
              <CardContent>
                <Typography component="h5" variant="h5">

                {(item.user) ? 
              <div>
                {item.user.emailAddress}
                {item.user.firstName}
                {item.user.lastName}
              </div> :
              <div>
                Anonymous User
              </div>
              }
              
              {item.submitTime}
              <Link to={`/response/${this.props.match.params.id}/${item.responseId}`}>
                See Details
              </Link>
                </Typography>
              </CardContent>
            </div>
            {(item.user) &&
            <CardMedia
              image={item.user.imageUrl}
            />}
          </Card>
          )
        })}
          </div>
        }
      </div>
    </div>
    )
  }

}


const processAnswers= (data) => {
  if (data){
    if (data.type !== "TEXTAREA" && data.type !== "TEXT") {
      return countAnswers(data.answersGiven);
    } else {
      return(
        <Alert color="info">
          Free form answers, please review these individually
        </Alert>
      )
    }
  }
}

const countAnswers = (data) => {
  let obj = {};
  if (data){
    data.map((value)=>{
      if (value){
        if (obj[value.answer]){
          obj[value.answer] = ++obj[value.answer];
        } else {
          obj[value.answer] = 1;
        }
      }
    })
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Answer Given</TableCell>
            <TableCell align="right"># of Occurrences</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(obj).map((key)=> {
            return (
              <TableRow>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="right">{obj[key]}</TableCell>
              </TableRow>
            )
          })
        }
        </TableBody>
      </Table>
    </Paper>
  )
}

const mapStateToProps = (state) => {
  return {
    questionnaire: state.questionnaire,
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    getDetail: (id) => {dispatch(getDetailsById(id))},
    clear: (id) => {dispatch({type: CLEAR_QUESTIONNAIRES})}

  })
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionnaireDetails);