import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles, withWidth } from '@material-ui/core';
import { Drawer } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';
import styles from './styles';

// pages
import Users from 'pages/UserList';
import Account from 'pages/Account';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const isMobile = ['xs', 'sm', 'md'].includes(props.width);

    this.state = {
      isOpen: !isMobile
    };
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleToggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { classes, width, title, children } = this.props;
    const { isOpen } = this.state;

    const isMobile = ['xs', 'sm', 'md'].includes(width);
    const shiftTopbar = isOpen && !isMobile;
    const shiftContent = isOpen && !isMobile;

    return (
      <Router>
        <Fragment>
          <Topbar
            className={classNames(classes.topbar, {
              [classes.topbarShift]: shiftTopbar
            })}
            isSidebarOpen={isOpen}
            onToggleSidebar={this.handleToggleOpen}
            title={title}
          />
          <Drawer
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
            onClose={this.handleClose}
            open={isOpen}
            variant={isMobile ? 'temporary' : 'persistent'}
          >
            <Sidebar className={classes.sidebar} />
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: shiftContent
            })}
          >
            <Switch>
              <Route path="/app/users" component={Users} />
              <Route path="/app/account" component={Account} />
            </Switch>
            <Footer />
          </main>
        </Fragment>
      </Router>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  width: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withWidth()
)(Dashboard);
