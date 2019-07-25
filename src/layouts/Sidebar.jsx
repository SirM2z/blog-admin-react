import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PeopleOutlined as PeopleIcon,
  AccountBoxOutlined as AccountBoxIcon,
  Note as NoteIcon,
  SettingsOutlined as SettingsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  StarBorder as StarBorderIcon,
} from '@material-ui/icons';

import { getLS } from 'utils';
import { USER_INFO } from 'constant';

const ListItemLink = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const Sidebar = ({ className, isSidebarOpen }) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);
  const [systemOpen, setSystemOpen] = useState(true);

  let username = '你做了什么';
  const userInfo = getLS(USER_INFO);
  if (userInfo && userInfo.username) {
    username = userInfo.username;
  }

  return (
    <nav className={rootClassName}>
      <div className={classes.toolbar}>
        <Link
          className={classes.logoLink}
          to="/app"
        >
          <Typography variant="h3">Ryan's Blog Admin</Typography>
        </Link>
      </div>
      {isSidebarOpen ? (
        <React.Fragment>
          <Divider className={classes.logoDivider} />
          <div className={classes.profile}>
            <Link to="/app/account">
              <Avatar
                alt="Roman Kutepov"
                className={classes.avatar}
                src="/images/avatars/avatar_6.png"
              />
            </Link>
            <Typography
              className={classes.nameText}
              variant="h6"
            >
              {username}
            </Typography>
            <Typography
              className={classes.bioText}
              variant="caption"
            >
              没有什么要说的。。。
            </Typography>
          </div>
        </React.Fragment>) : null}
      <Divider className={classes.profileDivider} />
      <List className={classes.menuList} component="div" disablePadding>
        <ListItem
          activeClassName={classNames(classes.activeListItem, {
            [classes.activeListItemOpen]: isSidebarOpen
          })}
          className={classNames(classes.listItem, {
            [classes.listItemOpen]: isSidebarOpen
          })}
          component={ListItemLink}
          to="/app/users"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="用户管理"
          />
        </ListItem>
        <ListItem
          activeClassName={classNames(classes.activeListItem, {
            [classes.activeListItemOpen]: isSidebarOpen
          })}
          className={classNames(classes.listItem, {
            [classes.listItemOpen]: isSidebarOpen
          })}
          component={ListItemLink}
          to="/app/articles"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="文章管理"
          />
        </ListItem>
        <ListItem
          activeClassName={classNames(classes.activeListItem, {
            [classes.activeListItemOpen]: isSidebarOpen
          })}
          className={classNames(classes.listItem, {
            [classes.listItemOpen]: isSidebarOpen
          })}
          component={ListItemLink}
          to="/app/account"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="账号信息"
          />
        </ListItem>
        <ListItem
          className={classNames(classes.listItem, {
            [classes.listItemOpen]: isSidebarOpen
          })}
          component='div'
          onClick={() => {setSystemOpen(prevOpen => !prevOpen)}}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="系统管理"
          />
          {systemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={systemOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              activeClassName={classNames(classes.activeListItem, {
                [classes.activeListItemOpen]: isSidebarOpen
              })}
              className={classNames(classes.listItem, {
                [classes.listItemOpen]: isSidebarOpen,
                [classes.nested]: isSidebarOpen
              })}
              component={ListItemLink}
              to="/app/auth"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="权限管理"
              />
            </ListItem>
            <ListItem
              activeClassName={classNames(classes.activeListItem, {
                [classes.activeListItemOpen]: isSidebarOpen
              })}
              className={classNames(classes.listItem, {
                [classes.listItemOpen]: isSidebarOpen,
                [classes.nested]: isSidebarOpen
              })}
              component={ListItemLink}
              to="/app/star"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="满天星星"
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </nav>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string
};

const useStyles = makeStyles(theme => ({
  root: {
    // width: theme.layout.drawerWidth,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.mixins.toolbar,
  },
  logoLink: {
    fontSize: 0
  },
  logoDivider: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  nameText: {
    marginTop: theme.spacing(2)
  },
  bioText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  profileDivider: {
    marginBottom: theme.spacing(2),
  },
  menuList: {
    userSelect: 'none'
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: theme.palette.primary.main,
      }
    },
    // '& + &': {
    //   marginTop: theme.spacing(1)
    // }
  },
  listItemOpen: {
    '&:hover': {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      '& $listItemIcon': {
        marginLeft: '-4px'
      }
    },
  },
  activeListItem: {
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
    '& $listItemText': {
      color: theme.palette.text.primary
    },
    '& $listItemIcon': {
      color: theme.palette.primary.main,
    }
  },
  activeListItemOpen: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    '& $listItemIcon': {
      marginLeft: '-4px'
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  listDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

export default Sidebar;
