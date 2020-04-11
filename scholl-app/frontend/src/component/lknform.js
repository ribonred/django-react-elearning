import React from 'react'
import { Form, Button, Select, DatePicker, Space } from 'antd'
import AuthContainer from '../ui-container/authContainer';
import FormGroup from '../ui-container/formGroup';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const formData = [
  {label: 'No. LKN', name: 'LKN', fieldName: 'LKN'},
]
const LknFormView = (props) => {
    const { Option } = Select;
    return (
        <AuthContainer header='FORM DATA LKN'>
            <div align="right" style={{margin: 20}}>
                <Space>
                    <Button type="primary" htmlType="submit" onClick={() => { props.onsubmit() }}>
                        Simpan
                    </Button>
                    <Button type="danger" onClick={() => { alert('kembali') }}>
                        Kembali
                    </Button>
                </Space>
            </div>
            
            <FormGroup
              formData={formData}
              onFormChange={props.onFormChange}
            >
                <Form.Item
                    label="Tanggal LKN"
                    name="tgl_dibuat"
                    rules={[{ message: 'Please input your birth date!' }]}
                >
                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={(i, e) => props.onFormChange(i, e)}/>
                </Form.Item>
                <Button type="primary" style={{ background: "green", borderColor: "green" }} onClick={() => { alert('kehalaman form penangkapan') }}>
                    + Penangkapan
                </Button>
            </FormGroup>
        </AuthContainer>
    );
};

export default LknFormView;
