import React from 'react'
import { Button, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import FormGroup from '../../../ui-container/formGroup';
import PageContainer from '../../../ui-container/pageContainer';

const { Panel } = Collapse;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formData = [
  {label: 'No penangkapan id', name: 'Status Penahanan', fieldName: 'status_penahanan'},
  {label: 'rekam_jejak', name: 'Rekam Jejak', fieldName: 'rekam_jejak'},
  {label: 'Tanggal', name: 'Tanggal', fieldName: 'tanggal', type:'date'},
  {label: 'waktu', name: 'waktu', fieldName: 'waktu'},
  {label: 'keterangan', name: 'keterangan', fieldName: 'keterangan'}
]

export default class FormStatusTersangka extends React.Component {
  state = {
    form:[{}]
  }

  addStatus = () => {
    const forms = this.state.form
    forms.push({})
    this.setState({form: forms})
  }

  removeStatus = (removedIndex) => {
    const forms = this.state.form.filter((data, index) => index!==removedIndex)
    this.setState({form: forms})
  }

  render(){
      return (
        <Collapse >
          <Panel header="STATUS TERSANGKA" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Status Tersangka
            </Button>
            {this.state.form.map((data, index) => (
              <Collapse style={{margin:'10px'}}>
                <Panel header="Form Status Tersangka" key={index}>
                  <Button type="danger" style={{margin:'10px'}} onClick={() => this.removeStatus(index)} icon={<CloseOutlined />}>
                    Hapus Form
                  </Button>
                  <FormGroup
                    formData={formData}
                    defaultValue={this.props.defaultValue}
                    onFormChange={this.props.onFormChange}
                  >
                  </FormGroup>
                </Panel>
              </Collapse>
            ))}
          </Panel>
        </Collapse>
      );
  }
};
