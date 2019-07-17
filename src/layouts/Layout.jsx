import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  useMediaQuery,
  Drawer,
  CssBaseline
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Routes from '../Routes';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ title, ...props }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  function handleToggleOpen() {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
        // title={title}
        title='Layout'
      />
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          }),
        }}
        open={isOpen}
      >
        <Sidebar isSidebarOpen={isOpen} />
      </Drawer>
      <main className={classes.contentWrapper}>
        <div className={classes.toolbar} />
        <div className={classes.content}>
          <Routes {...props} />
        </div>
        <Footer />
      </main>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: theme.layout.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: theme.layout.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  contentWrapper: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2)
  }
}));

export default Layout;
