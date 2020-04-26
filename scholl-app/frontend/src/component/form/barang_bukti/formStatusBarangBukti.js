import React from 'react'
import { Button, Collapse } from 'antd';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import FormGroup from '../../../ui-container/formGroup';

const { Panel } = Collapse;

export default class FormProsesBarangBukti extends React.Component {
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
     this.props.updateStatusBarangBukti(form)
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
    this.props.updateStatusBarangBukti(forms)
  }

  render(){
      const status = [{value:'Masuk', name:'Masuk'}, {value:'Keluar', name:'Keluar'}]
      const formData = [
        {label: 'Jumlah', name: 'Jumlah', fieldName: 'jumlah'},
        {label: 'Status', name: 'Status', dropdown: status, fieldName: 'status', type: 'select'},
        {label: 'Tanggal Status', name: 'Tanggal Status', fieldName: 'tanggal_status', type:'date'},
        {label: 'Waktu', name: 'Waktu Status', fieldName: 'waktu_status', type: 'time'},
        {label: 'Keterangan', name: 'keterangan', fieldName: 'keterangan', type: 'area'}
      ]

      return (
        <Collapse style={{margin:'7px'}}>
          <Panel header="STATUS BARANG BUKTI" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Status Barang Bukti
            </Button>
            {this.state.form.map((data, index) => (
              data!==null && data!==undefined && (
                <Collapse key={index} style={{margin:'10px'}}>
                <Panel header="Form Status Barang Bukti" key={index}>
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
