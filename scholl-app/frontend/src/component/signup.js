import React from 'react'
import { Form, Input, Button, Checkbox, DatePicker, Select, Row, Col, Layout } from 'antd'
import moment from 'moment';

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const SignupView = (props) => {
    const dateFormat = 'YYYY-MM-DD';
    const { Option } = Select;
    const onFinish = values => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Col span={12} offset={6}>
            <Form
            // {...layout}
            // name="basic"
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onF
            // inishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input onInput={(e) => { props.onemailformchange(e) }}/>
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input onInput={(e) => { props.onphoneformchange(e) }}/>
                </Form.Item>
            
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input onInput={(e) => { props.onusernameformchange(e) }}/>
                </Form.Item>
            
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onInput={(e) => { props.onpasswordformchange(e)}}/>
                </Form.Item>

                <Form.Item
                    label="Nama Depan"
                    name="nama_depan"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input onInput={(e) => { props.onnamadepanformchange(e)}}/>
                </Form.Item>

                <Form.Item
                    label="Nama Belakang"
                    name="nama_belakang"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input onInput={(e) => { props.onnamabelakangformchange(e)}}/>
                </Form.Item>

                <Form.Item
                    label="Tanggal Lahir"
                    name="tanggal_lahir"
                    rules={[{ required: true, message: 'Please input your birth date!' }]}
                >
                <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={(date, dateString) => props.ontanggallahirformchange(date, dateString, 1)}/>
                </Form.Item>

                <Form.Item
                    label="address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input onInput={(e) => { props.onaddressformchange(e)}}/>
                </Form.Item>

                <Form.Item
                    label="Jenis Kelamin"
                    name="jenis_kelamin"
                    rules={[{ message: 'Please input your gender!' }]}
                >
                    <Select defaultValue="laki-laki" style={{ width: 120 }} onChange={(e) => { props.onjeniskelaminformchange(e)}}>
                        <Option value="laki-laki">laki-laki</Option>
                        <Option value="perempuan">perempuan</Option>
                    </Select>
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
        </Col>
        
    );
};

export default SignupView;