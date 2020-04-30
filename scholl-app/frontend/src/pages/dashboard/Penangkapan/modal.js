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

      render() {
        const { visible, confirmLoading } = this.state;
        return (
          <div>
            <Button type="primary" onClick={this.showModal}>
              {this.props.title}
            </Button>
            <Modal
              title={this.props.title}
              onCancel={() => this.setState({visible: false})}
              visible={visible}
              footer={[]}
              confirmLoading={confirmLoading}
            >
                <FormGroup
                    formData={this.props.formData}
                    onSubmit={() => {
                      const result = this.props.onSubmit(this.props.title)
                      if(result === 'success'){
                        this.setState({visible: false})
                      }
                    }}
                    onFormChange={this.props.onFormChange}
                />
            </Modal>
          </div>
        );
      }
}
