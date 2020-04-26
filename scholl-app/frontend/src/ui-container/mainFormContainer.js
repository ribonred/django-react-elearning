import React from 'react'
import FormGroup from './formGroup';
import { Button, Space, Skeleton } from 'antd';
import history from '../route/history';
import { message } from 'antd';
import PageContainer from './pageContainer';

const key='error'
class MainForm extends React.Component {
  componentDidUpdate(prevProps){
    if(this.props.isError!==prevProps.isError && this.props.isError){
      this.openErrorMessage()
    }
    if(this.props.isCreated!==prevProps.isCreated && this.props.isCreated){
      this.openSuccessMessage()
    }
  }

  openErrorMessage = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.error({ content: `Tolong Lengkapi Required Field , dan Pastikan No ${this.props.messageTitle} Unik`, key, duration: 4 });
    }, 1000);
  };

  openSuccessMessage = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: `${this.props.messageTitle} berhasil dibuat`, key, duration: 4 });
      history.goBack()
    }, 1000);
  }

  submit = () => {
    setTimeout(() => {
      message.error({ content: 'sorry unexpected error happen', key, duration: 4 });
    }, 1000);
    message.loading({ content: 'Loading...', key });
    this.props.onsubmit()
  }

  render(){
      const { isDataChange } = this.props
      return (
        <React.Fragment>
        {isDataChange && (
          <PageContainer header={this.props.title}>
            <div align="right" style={{ margin: '20px' }}>
              <Space>
                <Button style={{ fontWeight: 'bold', backgroundColor: 'green', borderColor: 'green' }} type="primary" htmlType="submit" onClick={() => { this.props.onsubmit() }}>Simpan</Button>
                <Button onClick={() => history.goBack()} style={{ fontWeight: 'bold' }} type="danger" htmlType="submit">
                  Kembali
                </Button>
              </Space>
            </div>
            <FormGroup
              formData={this.props.formData}
              defaultValue={this.props.defaultValue}
              onFormChange={this.props.onFormChange}
            />
            {this.props.children}
          </PageContainer>
        )}
        {!isDataChange && <Skeleton active />}
       </React.Fragment>
      );
  }
};

export default MainForm
