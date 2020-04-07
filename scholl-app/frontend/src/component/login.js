import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    };
    const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
    };

const LoginView = (props) => {
    const onFinish = values => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form
        // {...layout}
        // name="basic"
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
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
    
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>
    
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={() => { props.onsubmit() }}>
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
};

export default LoginView;