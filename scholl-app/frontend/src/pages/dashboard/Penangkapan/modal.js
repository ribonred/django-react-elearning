import React from 'react'
import { Modal, Button } from 'antd';
import FormGroup from '../../../ui-container/formGroup'

export default class ModalTersangka extends React.Component {
      state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
      };
      
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        this.props.onsubmit()
        if (!this.props.error){
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }
        // setTimeout(() => {
        //   this.setState({
        //     visible: false,
        //     confirmLoading: false,
        //   });
        // }, 2000);
      };
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };
    
      render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
          <div>
            <Button type="primary" onClick={this.showModal}>
              {this.props.title}
            </Button>
            <Modal
              title={this.props.title}
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            >
                <FormGroup
                    formData={this.props.formData}
                    defaultValue={[]}
                    onFormChange={this.props.onFormChange}
                />
            </Modal>
          </div>
        );
      }
}