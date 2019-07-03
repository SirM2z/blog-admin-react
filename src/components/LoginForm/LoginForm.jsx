import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './LoginForm.module.css'
import request from '../../utils/request'
import { getLS, setLS } from '../../utils/util';

const LoginForm = (props) => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        request.post('/login', {
          username: values.username,
          password: values.password,
        }).then(res => {
          setLS('loginForm', {
            username: values.remember ? values.username : '',
            password: values.remember ? values.password : '',
          });
          setLS('isLogin', {
            token: res.result.token,
          });
          console.log(res);
          console.log('登陆成功');
        });
      }
    });
  };

  const { getFieldDecorator } = props.form;
  const loginInitForm = getLS('loginForm') || {
    username: '',
    password: '',
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名！' }],
          initialValue: loginInitForm.username,
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
            size="large"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码！' }],
          initialValue: loginInitForm.password,
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
            size="large"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>牢牢记住我</Checkbox>)}
        {/* <a className={styles.forgot} href="#">
          Forgot password
        </a> */}
        <Button type="primary" htmlType="submit" size="large" className={styles.submit}>登录</Button>
        {/* Or <a href="#">register now!</a> */}
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'login' })(LoginForm);
