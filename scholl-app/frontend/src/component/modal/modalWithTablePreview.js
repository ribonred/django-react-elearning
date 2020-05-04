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
            path={this.props.title}
            isNotAllowTo={this.props.isNotAllowTo}
            isLoading={this.props.isLoading}
            tableField={this.props.tableField || []}
            tableData={this.props.tableData || []}
            isLoading={this.props.isLoading}
          />
          <Modal
            title={this.props.formTitle}
            onCancel={() => this.setState({visible: false})}
            visible={this.state.visible}
            footer={[]}
          >
              <FormGroup
                formData={this.props.formData || []}
                onSubmit={async() => {
                  await this.props.onSubmit(this.props.title)
                  this.setState({visible: false})
                }}
                onFormChange={this.props.onFormChange}
              />
          </Modal>
        </div>
      );
    }
}
