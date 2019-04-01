import  React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.scss'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import Auth from '../../Auth/Auth';


class Header extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


    render() {
      const auth = new Auth();
      return (
        <div>
          <Navbar color="faded" light expand="md">
            <NavbarBrand href="/">udevise</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                {(()=>{if (this.props.user){
                  const {name} = this.props.user.userSession.idToken;
                  return(
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink>Hi {name}</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                          Menu
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem href="/dashboard">
                          Dashboard
                        </DropdownItem>
                        <DropdownItem href="/create">
                          Create
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={()=>auth.logout()}>
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                  )

                } else {
                  return(
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink onClick=''>Login</NavLink>
                    </NavItem>
                    </Nav>
                  )
                } })()}
            </Collapse>
          </Navbar>
        </div>
      );
    }

}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Header);
