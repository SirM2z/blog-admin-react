import React from 'react'
import Button from '@material-ui/core/Button';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.login}>
      <h1>Ryan Blog Admin</h1>
      <p>学无止境</p>
      <div>
        <h1>Login</h1>
        <Button variant="contained" color="primary">
          你好，世界
        </Button>
      </div>
    </div>
  )
}

export default Login;
