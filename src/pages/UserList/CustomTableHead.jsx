import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@material-ui/core';

const CustomTableHead = (props) => {
  const { headRows, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount && numSelected !== 0}
            disabled={rowCount === 0}
            onChange={onSelectAllClick}
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

CustomTableHead.propTypes = {
  headRows: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default CustomTableHead;
