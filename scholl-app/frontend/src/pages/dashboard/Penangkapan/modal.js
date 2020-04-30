import React from 'react'
import { Modal, Button } from 'antd';
import FormGroup from '../../../ui-container/formGroup'

export default class ModalTersangka extends React.Component {
      state = {
        ModalText: 'Content of the modal',
      };
    
      render() {
        return (
          <div>
            <Button type="primary" onClick={this.props.showModal}>
              {this.props.title}
            </Button>
            <Modal
              title={this.props.title}
              onCancel={() => this.props.hideModal}
              visible={this.props.visible}
              footer={[]}
            >
                <FormGroup
                    formData={this.props.formData}
                    onSubmit={async() => {
                      this.props.onSubmit(this.props.title)
                    }}
                    onFormChange={this.props.onFormChange}
                />
            </Modal>
          </div>
        );
      }
}
