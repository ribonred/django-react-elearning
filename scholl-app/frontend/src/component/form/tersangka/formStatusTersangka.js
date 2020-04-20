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
  {label: 'status_penahanan', name: 'Status Penahanan', fieldName: 'status_penahanan'},
  {label: 'rekam_jejak', name: 'Rekam Jejak', fieldName: 'rekam_jejak'},
  {label: 'Tanggal', name: 'Tanggal', fieldName: 'tanggal', type:'date'},
  {label: 'waktu', name: 'waktu', fieldName: 'waktu'},
  {label: 'keterangan', name: 'keterangan', fieldName: 'keterangan'}
]

export default class FormStatusTersangka extends React.Component {
  state = {
    form:[{}]
  }

  onFormChange = (fieldName, e, index) => {
     const formObj = {...this.state.form[index]};
     const form = this.state.form;
     if(!e.target){
         formObj[fieldName] = e
         form[index] = formObj
         this.setState({
             form: form,
         })
     } else {
         formObj[fieldName] = e.target.value
         form[index] = formObj
         this.setState({
            form: form,
         })
     }
     this.props.updateStatusTersangka(form)
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
        <Collapse style={{margin:'7px'}}>
          <Panel header="STATUS TERSANGKA" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Status Tersangka
            </Button>
            {this.state.form.map((data, index) => (
              data!==null && (
                <Collapse style={{margin:'10px'}}>
                <Panel header="Form Status Tersangka" key={index}>
                  <Button type="danger" style={{margin:'10px'}} onClick={() => this.removeStatus(index)} icon={<CloseOutlined />}>
                    Hapus Form
                  </Button>
                  <FormGroup
                    formData={formData}
                    onFormChange={(fieldName, e) => this.onFormChange(fieldName, e, index)}
                  >
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
