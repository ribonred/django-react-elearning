import React from 'react'

import { Form, Button, Space, Spin } from 'antd';

import { Link } from 'react-router-dom';
import FormGroup from '../ui-container/formGroup';
import PageContainer from '../ui-container/pageContainer';
import history from '../route/history';

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  const formData = [
    {label: 'Nama', name: 'nama_tersangka', fieldName: 'nama_tersangka'},
    {label: 'Umur', name: 'umur', fieldName: 'umur'},
    {label: 'Jenis Kelamin', name: 'jenis_kelamin', fieldName: 'jenis_kelamin'},
    {label: 'Foto', name: 'foto', fieldName: 'foto'},
  ]

  export default class TskFormView extends React.Component {
      render(){
        return (
            <PageContainer header='FORM DATA TERSANGKA'>
                <div align="right" style={{ margin: '20px' }}>
                    <Space>
                    {this.props.isLoading && <Spin size="medium" />}
                    <Button style={{ fontWeight: 'bold', backgroundColor: 'green', borderColor: 'green' }} type="primary" htmlType="submit" onClick={() => { this.props.onsubmit() }}>Simpan</Button>
                    <Button style={{ fontWeight: 'bold' }} type="danger" htmlType="submit">
                        <Link to="/dashboard/tersangka">Kembali</Link>
                    </Button>
                    </Space>
                </div>
                
                <FormGroup
                    formData={formData}
                    defaultValue={this.props.defaultValue}
                    onFormChange={this.props.onFormChange}
                >
                </FormGroup>
            </PageContainer>

          )
      }
  }