import React from 'react'
import { Form, Button, Select, DatePicker } from 'antd'
import AuthContainer from '../ui-container/authContainer';
import FormGroup from '../ui-container/formGroup';

const dateFormat = 'YYYY-MM-DD';
const formData = [
  {label: 'Email Address', name: 'email', fieldName: 'email'},
  {label: 'Phone', name: 'phone', fieldName: 'phone'},
  {label: 'Username', name: 'username', fieldName: 'username'},
  {label: 'Password', name: 'password', fieldName: 'password'},
  {label: 'Nama Depan', name: 'nama_depan', fieldName: 'nama_depan'},
  {label: 'Nama Belakang', name: 'nama_belakang', fieldName: 'nama_belakang'},
  {label: 'Address', name: 'address', fieldName: 'address'},
]
const SignupView = (props) => {
    const { Option } = Select;
    return (
        <AuthContainer header='Register Page'>
            <FormGroup
              formData={formData}
              onFormChange={props.onFormChange}
            >
                <Form.Item
                    label="Tanggal Lahir"
                    name="tanggal_lahir"
                    rules={[{ message: 'Please input your birth date!' }]}
                >
                    <DatePicker format={dateFormat} onChange={(i, e) => props.onFormChange('tanggal_lahir', e)}/>
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
            </FormGroup>
        </AuthContainer>
    );
};

export default SignupView;
