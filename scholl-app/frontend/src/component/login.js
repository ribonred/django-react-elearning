import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import FormGroup from '../ui-container/formGroup';
import AuthContainer from '../ui-container/authContainer'
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formData = [
  {label: 'Username', name: 'username', fieldName: 'username'},
  {label: 'Password', name: 'password', fieldName: 'password'}
]
const LoginView = (props) => {
    return (
      <AuthContainer header='Login Page'>
        <FormGroup
          formData={formData}
          onFormChange={props.onFormChange}
        >
          <div style={{flexDirection:'column'}}>
              <Checkbox>Remember me</Checkbox>
              <Link to="/register">register now</Link>
          </div>
          <Form.Item {...tailLayout}>
            <Button style={{ width:'200px', fontWeight: 'bold' }} type="primary" htmlType="submit" onClick={() => { props.onsubmit() }}>
              Login
            </Button>
          </Form.Item> 
        </FormGroup>
      </AuthContainer>
    );
};

export default LoginView;
