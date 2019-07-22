import React, { useContext } from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@material-ui/core';
import { UserContext } from './context';

const headRows = [
  { id: 'id', numeric: false, disablePadding: true, sortAble: false, label: 'ID' },
  { id: 'username', numeric: false, disablePadding: false, sortAble: false, label: '用户名' },
  { id: 'email', numeric: false, disablePadding: false, sortAble: false, label: '邮箱' },
  { id: 'roles', numeric: false, disablePadding: false, sortAble: false, label: '角色' },
  { id: 'created', numeric: false, disablePadding: false, sortAble: true, label: '注册时间' },
  { id: 'actions', numeric: false, disablePadding: false, sortAble: false, label: '操作' },
];

const CustomTableHead = (props) => {
  const {state: {
    order,
    orderBy,
    selected,
    list
  }, dispatch} = useContext(UserContext);
  const numSelected = selected.length;
  const rowCount = list.length;

  const createSortHandler = property => {
    dispatch({
      type: 'order',
      payload: { property }
    })
  };

  function handleSelectAllClick(event) {
    dispatch({
      type: 'allCheck',
      payload: { checked: event.target.checked }
    })
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount && numSelected !== 0}
            disabled={rowCount === 0}
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'Select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={(row.sortAble && orderBy === row.id) ? order : false}
          >
            {(row.sortAble && rowCount !== 0)
              ? (<TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={() => createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>)
              : row.label
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
