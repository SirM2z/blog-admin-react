import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  ArrowForwardIos as ArrowForwardIosIcon,
  Payment as PaymentIcon,
  PeopleOutlined as PeopleIcon,
  Code as CodeIcon,
  Store as StoreIcon
} from '@material-ui/icons';

const icons = {
  order: {
    icon: <PaymentIcon />,
    color: 'blue'
  },
  user: {
    icon: <PeopleIcon />,
    color: 'red'
  },
  product: {
    icon: <StoreIcon />,
    color: 'green'
  },
  feature: {
    icon: <CodeIcon />,
    color: 'purple'
  }
};

const NotificationList = ({
  className,
  notifications,
  onSelect
}) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);
  return (
    <div className={rootClassName}>
      {notifications.length > 0 ? (
        <React.Fragment>
          <div className={classes.header}>
            <Typography variant="h6">User Notifications</Typography>
            <Typography
              className={classes.subtitle}
              variant="body2"
            >
              {notifications.length} new notifications
            </Typography>
          </div>
          <div className={classes.content}>
            <List component="div">
              {notifications.map(notification => (
                <Link
                  key={notification.id}
                  to="#"
                >
                  <ListItem
                    className={classes.listItem}
                    component="div"
                    onClick={onSelect}
                  >
                    <ListItemIcon
                      className={classes.listItemIcon}
                      style={{ color: icons[notification.type].color }}
                    >
                      {icons[notification.type].icon}
                    </ListItemIcon>
                    <ListItemText
                      classes={{ secondary: classes.listItemTextSecondary }}
                      primary={notification.title}
                      secondary={notification.when}
                    />
                    <ArrowForwardIosIcon className={classes.arrowForward} />
                  </ListItem>
                  <Divider />
                </Link>
              ))}
            </List>
            <div className={classes.footer}>
              <Button
                color="primary"
                component={Link}
                size="small"
                to="#"
                variant="contained"
              >
                See all
              </Button>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className={classes.empty}>
          <div className={classes.emptyImageWrapper}>
            <img
              alt="Empty list"
              className={classes.emptyImage}
              src="/images/empty.png"
            />
          </div>
          <Typography variant="h4">什么也没有...</Typography>
        </div>
      )}
    </div>
  );
}

NotificationList.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

NotificationList.defaultProps = {
  notifications: [],
  onSelect: () => {}
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '350px',
    maxWidth: '100%'
  },
  header: {
    backgroundColor: theme.palette.background.default,
    backgroundImage: 'url("/images/connected_world.svg")',
    backgroundPositionX: 'right',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    paddingBottom: '34px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '34px'
  },
  subtitle: {
    color: theme.palette.text.secondary
  },
  content: {},
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
  },
  listItemIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: '10px',
    borderRadius: '50%',
    marginRight: theme.spacing(2)
  },
  listItemTextSecondary: {
    marignTop: '4px',
    color: theme.palette.text.secondary
  },
  arrowForward: {
    color: theme.palette.text.secondary,
    height: '16px',
    width: '16px'
  },
  footer: {
    paddingBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center'
  },
  empty: {
    textAlign: 'center',
    padding: theme.spacing(3)
  },
  emptyImageWrapper: {
    marginBottom: theme.spacing(3)
  },
  emptyImage: {
    width: '240px',
    maxWidth: '100%',
    height: 'auto'
  }
}));

export default NotificationList;
