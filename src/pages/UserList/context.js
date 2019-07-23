import React from 'react';

const initState = {
  order: 'asc',
  orderBy: '',
  selected: [],
  query: '',
  search: '',
  page: 1,
  rowsPerPage: 10,
  totalCount: 0,
  list: [],
  isLoading: true,
  isEditDialogShow: false
}

function UserReducer(state, action) {
  switch(action.type) {
    case 'getData':
      return {
        ...state,
        isLoading: true,
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        list: action.payload.data,
        totalCount: action.payload.pagination.total
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
      }
    case 'search':
      return {
        ...state,
        page: 1,
        search: action.payload.search
      }
    case 'order':
      const { payload: { property } } = action;
      const { order, orderBy } = state;
      const res = {};
      if (property === orderBy) {
        if (order === 'asc') {
          res.order = 'desc';
        } else {
          res.order = 'asc';
          res.orderBy = '';
        }
      } else {
        res.orderBy = property;
        res.order = 'asc';
      }
      return {
        ...state,
        ...res,
        page: 1,
      }
    case 'allCheck':
      const { list } = state;
      return {
        ...state,
        selected: action.payload.checked ? list.map(n => n.id) : []
      }
    case 'rowCheck':
      const { selected } = state;
      const { payload: { id } } = action;
      const indexof = selected.indexOf(id);
      if (indexof === -1) {
        return {
          ...state,
          selected: [].concat(selected, id)
        }
      } else {
        return {
          ...state,
          selected: selected.filter(item => item !== id)
        }
      }
    case 'goPage':
      return {
        ...state,
        page: action.payload.page
      }
    case 'perPage':
      return {
        ...state,
        rowsPerPage: action.payload.rowsPerPage,
        page: 1
      }
    case 'openEditDialog':
      return {
        ...state,
        isEditDialogShow: !state.isEditDialogShow
      }
  default: 
    return state;
  }
}

const UserContext = React.createContext();

const UserProvider = (props) => {
  const [state, dispatch] = React.useReducer(UserReducer, initState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider};
