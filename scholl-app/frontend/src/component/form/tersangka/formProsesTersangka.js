import React from 'react'
import { Button, Collapse } from 'antd';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import FormGroup from '../../../ui-container/formGroup';

const { Panel } = Collapse;

export default class FormProsesTersangka extends React.Component {
  state = {
    form:this.props.defaultValue
  }

  onFormChange = (fieldName, e, index) => {
     const formObj = {...this.state.form[index]};
     const form = [...this.state.form];
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
     this.props.updateProsesTersangka(form)
  }

  addStatus = () => {
    const forms = [...this.state.form]
    forms.push({})
    this.setState({form: forms})
  }

  removeStatus = (removedIndex) => {
    const forms = [...this.state.form];
    delete forms[removedIndex]
    this.setState({form: forms});
    this.props.updateProsesTersangka(forms)
  }

  render(){
      const rekam_jejak = [{value:'Masuk', name:'Masuk'}, {value:'Keluar', name:'Keluar'}]
      const jenis_proses = [{value:1, name:'pengadilan satu'}, {value:2, name:'pengadilan dua'}]
      const formData = [
        {label: 'Jenis Proses', name: 'Jenis Proses', dropdown: jenis_proses, fieldName: 'jenis_proses', type: 'select'},
        {label: 'No Proses', name: 'No Proses', fieldName: 'no_proses'},
        {label: 'keterangan', name: 'keterangan', fieldName: 'keterangan', type: 'area'}
      ]
      return (
        <Collapse style={{margin:'7px'}}>
          <Panel header="PROSES TERSANGKA" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Status Tersangka
            </Button>
            {this.state.form.map((data, index) => (
              data!==null && data!==undefined && (
                <Collapse key={index} style={{margin:'10px'}}>
                <Panel header="Form Proses Tersangka" key={index}>
                  <Button type="danger" style={{margin:'10px'}} onClick={() => this.removeStatus(index)} icon={<CloseOutlined />}>
                    Hapus Form
                  </Button>
                  <FormGroup
                    formData={formData}
                    key={index}
                    onFormChange={(fieldName, e) => this.onFormChange(fieldName, e, index)}
                    defaultValue={this.state.form[index]}
                  />
                </Panel>
              </Collapse>
            )
            ))}
          </Panel>
        </Collapse>
      );
  }
};
