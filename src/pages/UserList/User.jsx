import React, { useEffect } from 'react';
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
} from '@material-ui/icons';
import dayjs from 'dayjs';

import TableToolbar from './TableToolbar';
import CustomTableHead from './CustomTableHead';
import Spin from 'components/Spin';
import { userList } from 'services/user';

const headRows = [
  { id: 'id', numeric: false, disablePadding: true, sortAble: false, label: 'ID' },
  { id: 'username', numeric: false, disablePadding: false, sortAble: false, label: '用户名' },
  { id: 'email', numeric: false, disablePadding: false, sortAble: false, label: '邮箱' },
  { id: 'roles', numeric: false, disablePadding: false, sortAble: false, label: '角色' },
  { id: 'created', numeric: false, disablePadding: false, sortAble: true, label: '注册时间' },
];

const User = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalCount, setTotalCount] = React.useState(0);
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    userList(page, rowsPerPage, order.toUpperCase(), orderBy).then(res => {
      setLoading(false);
      setList(res.data);
      setTotalCount(res.pagination.total);
    }).catch(err => {
      setLoading(false);
      console.log({err});
    })
  }, [page, rowsPerPage, order, orderBy])

  function handleRequestSort(property) {
    if (orderBy === property) {
      if (order === 'asc') {
        setOrder('desc');
      } else if (order === 'desc') {
        setOrder('asc');
        setOrderBy('');
      }
    } else {
      setOrderBy(property);
    }
    setPage(1);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = list.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <CustomTableHead
              headRows={headRows}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={list.length}
            />
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
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {totalCount === 0 && (!loading) && (
            <React.Fragment>
              <IconButton disabled className={classes.embtyIconBtn}>
                <InboxIcon className={classes.embtyIcon} />
              </IconButton>
              <Typography className={classes.emptyText} variant="body1">
                暂无数据
              </Typography>
            </React.Fragment>
          )}
          {loading
            ? (<div className={classes.spinMask}><Spin /></div>)
            : null
          }
        </div>
        {totalCount !== 0
          ? (<TablePagination
              rowsPerPageOptions={[5, 10, 25]}
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