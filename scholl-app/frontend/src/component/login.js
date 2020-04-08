import React from 'react'
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import AuthContainer from '../ui-container/authContainer'
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginView = (props) => {
    return (
      <AuthContainer header='Login Page'>
        <Layout style={{borderRadius:'5px', padding:'15px'}}>
              <Form>
              <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
              >
                  <Input onInput={(e) => { props.onFormChange('username', e) }}/>
              </Form.Item>

              <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
              >
                  <Input.Password onInput={(e) => { props.onFormChange('password', e)}}/>
              </Form.Item>

              <div style={{flexDirection:'row'}}>
                <Checkbox>Remember me</Checkbox>
                <Link to="/register">register now</Link>
              </div>

              <Form.Item {...tailLayout}>
                  <Button style={{ width:'200px', fontWeight: 'bold' }} type="primary" htmlType="submit" onClick={() => { props.onsubmit() }}>
                    Login
                  </Button>
              </Form.Item>
              </Form>
            </Layout>
      </AuthContainer>
    );
};

export default LoginView;
