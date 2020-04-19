import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Collapse } from 'antd';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import FormGroup from '../../../ui-container/formGroup';
import FormStatusTersangka from './formStatusTersangka';
import PageContainer from '../../../ui-container/pageContainer';

const { Panel } = Collapse;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formData = [
  {label: 'No penangkapan id', name: 'No penangkapan id', fieldName: 'no_penangkapan_id'},
  {label: 'nama_tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin'},
  {label: 'Foto', name: 'foto', fieldName: 'foto'}
]

export default class FormTersangka extends React.Component {
  state = {
    form:[{}]
  }

  addStatus = () => {
    const forms = this.state.form
    forms.push({})
    this.setState({form: forms})
  }

  removeStatus = (removedIndex) => {
    const forms = this.state.form;
    delete forms[removedIndex]
    this.setState({form: forms});
  }

  render(){
      return (
        <Collapse >
          <Panel header="FORM DATA TERSANGKA" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Status Tersangka
            </Button>
            {this.state.form.map((data, index) => (
              data!==null && (
                <Collapse style={{margin:'10px'}} key={index}>
                  <Panel header={`Form Data Tersangka`} key={index}>
                    <Button type="danger" style={{margin:'10px'}} onClick={() => this.removeStatus(index)} icon={<CloseOutlined />}>
                      Hapus Form
                    </Button>
                    <FormGroup
                      formData={formData}
                      defaultValue={this.props.defaultValue}
                      onFormChange={this.props.onFormChange}
                    >
                      <FormStatusTersangka />
                    </FormGroup>
                  </Panel>
                </Collapse>
              )
            ))}
          </Panel>
        </Collapse>
      );
  }
};
