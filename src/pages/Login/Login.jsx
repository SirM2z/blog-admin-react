import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.login}>
      <h1>Ryan Blog Admin</h1>
      <p>学无止境</p>
      <div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;
