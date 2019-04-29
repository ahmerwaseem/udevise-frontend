import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './MenuAppBar.scss'; 
import Auth from '../../Auth/Auth';
import { CLEAR_USER_SESSION } from '../../actions/user';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (path) => {
    this.setState({ anchorEl: null });
    this.props.history.push(path)
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const auth = new Auth();

    return (
      <div className="MenuAppBar">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                UDEVISE
              </Typography>
              {(this.props.user && this.props.user.session)
                 ? (
                <div>
                  Hi {this.props.user.session.idToken.name}
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={(e)=>this.handleMenu(e)}
                    color="inherit"
                  > 
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={()=>this.handleClose()}
                  >
                    <MenuItem onClick={()=>this.handleClose("/dashboard")}>
                        Dashboard
                    </MenuItem>

                    <MenuItem onClick={()=>this.handleClose("/create/quiz")}>
                        Create Quiz
                    </MenuItem>
                    
                    <MenuItem onClick={()=>this.handleClose("/create/survey")}>
                        Create Survey
                    </MenuItem>
                    <MenuItem onClick={()=>{ auth.logout(); this.props.clearUser();} }>Log Out</MenuItem>
                  </Menu>
                </div>
              ): <div className="text-link" onClick={()=>{auth.login()}}>
                Login
              </div>}
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

MenuAppBar = withStyles(styles)(MenuAppBar);


const mapStateToProps = (state) => {
  return {
    user: state.user,
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    clearUser: () => {dispatch({type: CLEAR_USER_SESSION})}

  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuAppBar));