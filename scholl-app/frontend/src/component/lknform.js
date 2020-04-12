import React from 'react'
import { Form, Button, DatePicker, Space } from 'antd';
import { Link } from 'react-router-dom';
import FormGroup from '../ui-container/formGroup';
import PageContainer from '../ui-container/pageContainer';
import history from '../route/history';
import moment from 'moment';

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
        
        <div align="right" style={{ margin: '20px' }}>
          <Space>
            <Button style={{ fontWeight: 'bold', backgroundColor: 'green', borderColor: 'green' }} type="primary" htmlType="submit" onClick={() => { props.onsubmit() }}>Simpan</Button>
            <Button style={{ fontWeight: 'bold' }} type="danger" htmlType="submit">
              <Link to="/dashboard/lkn">Kembali</Link>
            </Button>
          </Space>
        </div>
        
        <FormGroup
          formData={formData}
          onFormChange={props.onFormChange}
        >
        <Form.Item
          label="Tanggal Dibuat"
          rules={[{ message: 'Masukkan tanggal dibuat form!' }]}
        >
          <DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} onChange={(i, e) => props.onFormChange('tgl_dibuat', e)}/>
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
