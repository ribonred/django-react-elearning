import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import AuthContainer from '../ui-container/authContainer';
import FormGroup from '../ui-container/formGroup';

const formData = [
  {label: 'Nama Depan', name: 'nama_depan', fieldName: 'nama_depan'},
  {label: 'Phone', name: 'phone', fieldName: 'phone'},
  {label: 'Username', name: 'username', fieldName: 'user_name'},
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
