import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PaginateWrapper.scss'
import ReactPaginate from 'react-paginate';
import { Paper } from '@material-ui/core';
import {Typography} from "@material-ui/core";



const propTypes = {

};

const defaultProps = {
  itemsPerPage: 5
};

class PaginateWrapper extends Component{
  constructor(props) {
    super(props);
    let initialData = this.props.data.slice(0,this.props.itemsPerPage);

    this.state = {
      itemsPerPage: this.props.itemsPerPage,
      rawData: this.props.data,
      data: initialData,
      pageCount: Math.ceil(this.props.data.length/this.props.itemsPerPage),
    }
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemsPerPage);
    this.setState({
      data: this.state.rawData.slice(offset,offset+this.state.itemsPerPage)
    });
  };


  render(){
    const { Component } = this.props;
    return (
      <div className = "PaginateWrapper">
        <Paper raised>

          <Component {...this.props} data={this.state.data} />

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

PaginateWrapper.propTypes = propTypes;
PaginateWrapper.defaultProps = defaultProps;

export default PaginateWrapper;