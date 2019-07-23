import React, { useContext } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Grow
} from '@material-ui/core';

import { UserContext } from './context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default function EditDialog() {
  const {state: {
    isEditDialogShow
  }, dispatch} = useContext(UserContext);

  function handleToggleShow() {
    dispatch({type: 'openEditDialog'});
  }

  return (
    <div>
      <Dialog
        maxWidth='xs'
        fullWidth
        open={isEditDialogShow}
        onClose={handleToggleShow}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
        <DialogContent>
          <DialogContentText>
            修改密码需要重新登录
          </DialogContentText>
          <TextField
            autoFocus
            id="username"
            label="用户名"
            type="text"
            fullWidth
          />
          <TextField
            id="password"
            label="密码"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleShow} color="primary">
            取消
          </Button>
          <Button onClick={handleToggleShow} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
