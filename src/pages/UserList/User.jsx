import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import {
  Inbox as InboxIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import dayjs from 'dayjs';

import TableToolbar from './TableToolbar';
import CustomTableHead from './CustomTableHead';
import Spin from 'components/Spin';
import { UserContext } from './context';
import { userList } from 'services/user';

const User = () => {
  const classes = useStyles();
  
  const {state: {
    order,
    orderBy,
    selected,
    search,
    page,
    rowsPerPage,
    totalCount,
    list,
    isLoading
  }, dispatch} = useContext(UserContext);

  useEffect(() => {
    dispatch({type: 'getData'})
    userList(
      page,
      rowsPerPage,
      order.toUpperCase(),
      orderBy,
      search
    ).then(res => {
      dispatch({
        type: 'success',
        payload: res
      });
    }).catch(() => {
      dispatch({type: 'error'});
    })
  }, [page, rowsPerPage, order, orderBy, search, dispatch])

  function handleClick(event, id) {
    dispatch({
      type: 'rowCheck',
      payload: { id }
    });
  }

  function handleChangePage(event, page) {
    dispatch({
      type: 'goPage',
      payload: { page: ++page }
    });
  }

  function handleChangeRowsPerPage(event) {
    dispatch({
      type: 'perPage',
      payload: { rowsPerPage: +event.target.value }
    });
  }

  function handleEdit(event, row) {
    event.stopPropagation();
  }

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium' // small
          >
            <CustomTableHead />
            <TableBody>
              {list
                .map((item, index) => {
                  const isItemSelected = isSelected(item.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="item" padding="none">
                        {item.id}
                      </TableCell>
                      <TableCell align="left">{item.username}</TableCell>
                      <TableCell align="left">{item.email}</TableCell>
                      <TableCell align="left">{item.roles || '会员'}</TableCell>
                      <TableCell align="left">{dayjs(item.created).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                      <TableCell align="center">
                        <IconButton className='padding0' onClick={(e) => {handleEdit(e, item)}}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {totalCount === 0 && (!isLoading) && (
            <React.Fragment>
              <IconButton disabled className={classes.embtyIconBtn}>
                <InboxIcon className={classes.embtyIcon} />
              </IconButton>
              <Typography className={classes.emptyText} variant="body1">
                暂无数据
              </Typography>
            </React.Fragment>
          )}
          {isLoading
            ? (<div className={classes.spinMask}><Spin /></div>)
            : null
          }
        </div>
        {totalCount !== 0
          ? (<TablePagination
              rowsPerPageOptions={[5, 10, 20, 50]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />)
          : null
        }
      </Paper>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    position: 'relative',
    overflowX: 'auto',
  },
  embtyIconBtn: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(5)
  },
  embtyIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  emptyText: {
    textAlign: 'center',
    color: theme.palette.common.muted,
    marginBottom: theme.spacing(5)
  },
  spinMask: {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    backgroundColor: '#ffffff',
    opacity: '0.4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default User;