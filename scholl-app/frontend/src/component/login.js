import React from 'react'
import { Row, Layout, Divider,Col, Form, Input, Button, Checkbox } from 'antd'

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginView = (props) => {
    return (
    <React.Fragment>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      Login Page
    </Divider>
    <Row justify="center" align="middle">
      <Col xs={{ span: 14, offset: 1 }} lg={{ span: 14, offset: 1 }}>
        <Layout>
          <Layout.Header
            style={{borderRadius:'5px',fontWeight:'bold',fontSize:'20px',color:'white', backgroundColor:'#1892EA'}}>
            Halo User, Mari Login
          </Layout.Header>
          <Layout style={{borderRadius:'5px', padding:'15px'}}>
            <Form>
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onInput={(e) => { props.onloginformchange(e) }}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password onInput={(e) => { props.onpasswordformchange(e)}}/>
            </Form.Item>

            <div style={{flexDirection:'row'}}>
              <Checkbox>Remember me</Checkbox>
              <p style={{paddingTop: '10px', fontSize: '15px', color: '#1892EA'}}>Register Now</p>
            </div>

            <Form.Item {...tailLayout}>
                <Button style={{ width:'200px', fontWeight: 'bold' }} type="primary" htmlType="submit" onClick={() => { props.onsubmit() }}>
                  Login
                </Button>
            </Form.Item>
            </Form>
          </Layout>
        </Layout>
      </Col>
    </Row>
    </React.Fragment>
    );
};

export default LoginView;
