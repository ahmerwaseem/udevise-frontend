import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './QuestionnaireTable.scss'

import { AddCircle } from "@material-ui/icons"
import {Divider, Button, Typography} from "@material-ui/core";
import {Switch, Route, Link} from "react-router-dom";

import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactPaginate from 'react-paginate';
import uuid from 'uuid';

const propTypes = {

};

const defaultProps = {
  itemsPerPage: 5
};

class QuestionnaireTable extends Component{
  constructor(props) {
    super(props);
    let filteredData = this.props.data.filter(x=>x.type == this.props.type);
    let initialData = filteredData.slice(0,this.props.itemsPerPage);

    this.state = {
      itemsPerPage: this.props.itemsPerPage,
      rawData: filteredData,
      data: initialData,
      pageCount: Math.ceil(filteredData.length/this.props.itemsPerPage),
    }
  }


  mapQuestionnaires = (data, type) => {
    if (data == undefined || data == null ||  typeof data !== "object" || data.length <= 0 ){
      return (
        <TableRow key={uuid.v4()}>
          <TableCell  style={{width: '50%'}} component="th" scope="row">
            {`CLICK NEW TO CREATE YOUR FIRST ${type}!`}
          </TableCell>
        </TableRow>
      )
    }
    
    return data.map((value)=>{
      return (
          <TableRow key={uuid.v4()}>
          <TableCell  style={{width: '50%'}} component="th" scope="row">
          <Link to={`/detail/${value.id}`}>
            {value.title}
          </Link>
          </TableCell>
          <TableCell align="right">{value.createTime}</TableCell>
          <TableCell align="right">{value.responses ? value.responses.length : 0}</TableCell>
        </TableRow>
      )
    })
    }

    handlePageClick = data => {
      let selected = data.selected;
      let offset = Math.ceil(selected * this.state.itemsPerPage);
      console.log(data, selected, offset, offset+this.state.itemsPerPage)
  
      this.setState({
        data: this.state.rawData.slice(offset,offset+this.state.itemsPerPage)
      });
      console.log(this.state);
    };
  

  render(){
    console.log(this.state);
    const { type } = this.props;
    return(
    <div className="QuestionnaireTable">
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
        <TableCell style={{width: '50%'}}>Title</TableCell>
        <TableCell align="right">Created (UTC)</TableCell>
        <TableCell align="right"># Responses</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {this.mapQuestionnaires(this.state.data,type)}
    </TableBody>
    </Table>
    </Paper>
    <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
    </Paper>
  </div>
  )
  }

}

QuestionnaireTable.propTypes = propTypes;
QuestionnaireTable.defaultProps = defaultProps;

export default QuestionnaireTable;