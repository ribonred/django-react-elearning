import React from 'react'
import { Form, Input, Button, Checkbox, Select } from 'antd'
import moment from 'moment';
import AuthContainer from '../ui-container/authContainer';

const SignupView = (props) => {
    const dateFormat = 'YYYY-MM-DD';
    const { Option } = Select;
    return (
        <AuthContainer header='Register Page'>
            <Form>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input onInput={(e) => { props.onFormChange('nama_depan', e) }}/>
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input onInput={(e) => { props.onFormChange('phone', e) }}/>
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input onInput={(e) => { props.onFormChange('tanggal_lahir', e) }}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onInput={(e) => { props.onFormChange('password', e)}}/>
                </Form.Item>

                <Form.Item
                    label="Nama Depan"
                    name="nama_depan"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input onInput={(e) => { props.onFormChange('nama_depan', e)}}/>
                </Form.Item>

                <Form.Item
                    label="Nama Belakang"
                    name="nama_belakang"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input onInput={(e) => { props.onFormChange('nama_belakang', e)}}/>
                </Form.Item>
                <Form.Item
                    label="address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input onInput={(e) => { props.onFormChange('address', e)}}/>
                </Form.Item>

                <Form.Item
                    label="Jenis Kelamin"
                    name="jenis_kelamin"
                    rules={[{ message: 'Please input your gender!' }]}
                >
                    <Select defaultValue="laki-laki" style={{ width: 120 }} onChange={(e) => { props.onFormChange('jenis_kelamin', e)}}>
                        <Option value="laki-laki">laki-laki</Option>
                        <Option value="perempuan">perempuan</Option>
                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit" onClick={() => { props.onsubmit() }}>
                    Submit
                </Button>
            </Form>
        </AuthContainer>
    );
};

export default SignupView;
