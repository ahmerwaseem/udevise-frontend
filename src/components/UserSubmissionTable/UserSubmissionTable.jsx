import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UserSubmissionTable.scss'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";



const propTypes = {

};

const defaultProps = {

};

class UserSubmissionTable extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    const { data } = this.props;
    if (data){
    return (
      <div className = "UserSubmissionTable"> 
        <Paper>
                    
        <Typography variant="h3" color="secondary">
          SUBMISSIONS
        </Typography>  
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
  } else return null;
  }

}

UserSubmissionTable.propTypes = propTypes;
UserSubmissionTable.defaultProps = defaultProps;

export default UserSubmissionTable;