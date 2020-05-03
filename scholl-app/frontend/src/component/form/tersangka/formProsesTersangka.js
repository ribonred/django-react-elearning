import React from 'react'
import ModalWithTablePreview from '../../modal/modalWithTablePreview';

export default class FormProsesTersangka extends React.Component {
  state = {
    form:{}
  }

  onFormChange = (fieldName, e) => {
    const form = {...this.state.form};
    if(e!==null && e!==undefined){
      if(!e.target){
        form[fieldName]=e
        this.setState({
            form: form,
        })
      } else {
        form[fieldName]=e.target.value
        this.setState({
            form: form,
        })
      }
    } else {
      form[fieldName]=null
      this.setState({
        form: form,
      })
    }
  }

  onSubmit = () => {
    console.log('this state', this.state.form)
  }

  render(){
      const { jenis_proses } = this.state.form;
      const jenis_proses_drop = [{value:"pengadilan satu", name:'Pengadilan Satu'}, {value:"pengadilan dua", name:'Pengadilan Dua'}, {value:"kejati", name:'Kejati'}]
      let formData = [
        {label: 'Jenis Proses', name: 'Jenis Proses', fieldName: 'jenis_proses', dropdown: jenis_proses_drop, type: 'select'},
        {label: 'SP.HAN', name: 'SP.HAN', fieldName: 'sp_han'},
        {label: 'DOKUMEN SP.HAN', name: 'DOKUMEN SP.HAN', fieldName: 'sp_han_doc', type: 'upload'},
      ]

      if(jenis_proses === 'pengadilan satu' || jenis_proses === 'pengadilan dua'){
        formData.push({label: 'TAP HAN', name: 'TAP HAN', fieldName: 'tap_han'})
        formData.push({label: 'DOKUMEN TAP HAN', name: 'DOKUMEN TAP HAN', fieldName: 'tap_han_doc', type: 'upload'})
      }

      if(jenis_proses === 'kejati'){
        formData.push({label: 'SURAT PERPANJANGAN HAN', name: 'SURAT PERPANJANGAN HAN', fieldName: 'surat_perpanjangan_han'})
        formData.push({label: 'DOKUMEN SURAT PERPANJANGAN HAN', name: 'DOKUMEN SURAT PERPANJANGAN HAN', fieldName: 'surat_perpanjangan_han_doc', type: 'upload'})
      }

      formData.push({label: 'Keterangan', name: 'Keterangan', fieldName: 'keterangan', type: 'area'})
      return (
        <ModalWithTablePreview 
          formTitle='FORM PROSES TERSANGKA'
          title='PROSES TERSANGKA'
          onSubmit={this.onSubmit}
          onFormChange={this.onFormChange}
          formData={formData}
        />
      );
  }
};
