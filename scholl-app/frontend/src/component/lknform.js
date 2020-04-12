import React from 'react'
import { Form, Button, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import FormGroup from '../ui-container/formGroup';
import PageContainer from '../ui-container/pageContainer';
import history from '../route/history';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formData = [
  {label: 'No. LKN', name: 'LKN', fieldName: 'LKN'},
]
const dateFormat = 'YYYY-MM-DD';

const LknFormView = (props) => {
    return (
      <PageContainer header='FORM DATA LKN'>
        <FormGroup
          formData={formData}
          onFormChange={props.onFormChange}
        >
        <Form.Item
          label="Tanggal Dibuat"
          name="tgl_dibuat"
          rules={[{ message: 'Masukkan tanggal dibuat form!' }]}
        >
          <DatePicker format={dateFormat} onChange={(i, e) => props.onFormChange('tgl_dibuat', e)}/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button style={{ fontWeight: 'bold' }} type="primary" htmlType="submit">
            <Link to="/dashboard/lkn/penangkapan/buat">Penangkapan</Link>
          </Button>
        </Form.Item>
        </FormGroup>
      </PageContainer>
    );
};

export default LknFormView;
