import React from 'react'
import { Modal, Button } from 'antd';
import FormGroup from '../../ui-container/formGroup'
import TableView from '../table/tableFilterable';

export default class modalWithTablePreview extends React.Component {
    state = {
      visible: false,
    }

    render() {
      return (
        <div style={{'padding': '15px'}}>
          <Button type="primary" onClick={() => this.setState({visible: true})}>
            {`ADD ${this.props.formTitle}`}
          </Button>
          <TableView
            useId
            viewModal
            path={this.props.path}
            isNotAllowTo={this.props.isNotAllowTo}
            isLoading={this.props.isLoading}
            tableField={this.props.tableField || []}
            tableData={this.props.tableData || []}
            onDelete={(id) => { this.props.onDelete(id); }}
          />
          <Modal
            title={this.props.formTitle}
            onCancel={
              () => {
                this.setState({visible: false})
                this.props.hideModal()
              }
            }
            visible={this.state.visible}
            footer={[]}
          >
              <FormGroup
                formData={this.props.formData || []}
                defaultValue={this.props.form}
                onSubmit={async() => {
                  await this.props.onSubmit(this.props.title)
                  this.props.hideModal()
                  this.setState({visible: false})
                }}
                onFormChange={this.props.onFormChange}
              />
          </Modal>
        </div>
      );
    }
}
