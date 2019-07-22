import React from 'react';
import classNames from 'classnames';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Input,
  InputAdornment
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@material-ui/icons';
import { UserContext } from './context';

const TableToolbar = () => {
  const classes = useToolbarStyles();
  const {state: {
    selected
  }, dispatch} = React.useContext(UserContext);
  const [query, setQuery] = React.useState('');
  const numSelected = selected.length;

  function handleSearchEnter(event) {
    if (event.key === 'Enter') {
      dispatch({
        type: 'search',
        payload: { search: query}
      })
    }
  }

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            用户列表
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Toolbar>
            <Input
              placeholder="搜索用户名"
              className={classes.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchEnter}
              startAdornment={<InputAdornment position="start">
                <Tooltip title="Search">
                  <SearchIcon  aria-label="Search" />
                </Tooltip>
              </InputAdornment>}
              endAdornment={<InputAdornment position="end">
                <Tooltip title="Clear value">
                  <IconButton
                    className='padding0'
                    aria-label="Clear value"
                    onClick={() => {setQuery('')}}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>}
            />
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
      </div>
    </Toolbar>
  );
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.info.main,
          backgroundColor: lighten(theme.palette.info.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.info.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.info,
  },
  searchInput: {
    width: '246px'
  },
  title: {
    flex: '0 0 auto',
  },
}));

export default TableToolbar;
