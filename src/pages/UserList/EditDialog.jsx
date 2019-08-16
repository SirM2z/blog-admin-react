import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  CircularProgress,
  Grow
} from '@material-ui/core';
import { toast } from 'react-toastify';

import { UserContext } from './context';
import { userUpdate } from 'services/user';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default function EditDialog() {
  const {state: {
    isEditDialogShow,
    editData
  }, dispatch} = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    setUsername(editData.username || '');
  }, [editData]);

  function handleToggleShow() {
    dispatch({type: 'openEditDialog'});
  }

  function handleSubmit() {
    if (!username.trim() && !password.trim()) {
      toast.info(`🦄 必须输入一项`);
      return;
    }
    setIsLoading(true);
    userUpdate(editData.id, username, password).then(() => {
      setIsLoading(false);
      dispatch({type: 'getList'});
      dispatch({type: 'openEditDialog'});
    }).catch(() => {
      setIsLoading(false);
    });
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            label="用户名"
            type="text"
            fullWidth
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {isLoading ? (
            <CircularProgress size={26} />
          ) : (
            <Button onClick={handleSubmit} color="primary">
              确认
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
