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
     this.props.updateStatusTersangka(form)
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
    this.props.updateStatusTersangka(forms)
  }

  render(){
      const rekam_jejak = [{value:'Masuk', name:'Masuk'}, {value:'Keluar', name:'Keluar'}]
      const status_penahanan = [{value:'Diamankan', name:'Diamankan'}, {value:'Ditahan', name:'Ditahan'}]
      const formData = [
        {label: 'Status Penahanan', name: 'Status Penahanan', dropdown: status_penahanan, fieldName: 'status_penahanan', type: 'select'},
        {label: 'Rekam Jejak', name: 'Rekam Jejak', dropdown: rekam_jejak, fieldName: 'rekam_jejak', type: 'select'},
        {label: 'Tanggal', name: 'Tanggal', fieldName: 'tanggal', type:'date'},
        {label: 'waktu', name: 'waktu', fieldName: 'waktu', type: 'time'},
        {label: 'keterangan', name: 'keterangan', fieldName: 'keterangan', type: 'area'}
      ]

      return (
        <Collapse style={{margin:'7px'}}>
          <Panel header="STATUS TERSANGKA" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Status Tersangka
            </Button>
            {this.state.form.map((data, index) => (
              data!==null && data!==undefined && (
                <Collapse key={index} style={{margin:'10px'}}>
                <Panel header="Form Status Tersangka" key={index}>
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
