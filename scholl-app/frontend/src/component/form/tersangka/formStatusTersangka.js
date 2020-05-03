import React from 'react'
import ModalWithTablePreview from '../../modal/modalWithTablePreview';

export default class FormStatusTersangka extends React.Component {
  state = {
    form:this.props.defaultValue
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
      const rekam_jejak = [{value:'Masuk', name:'Masuk'}, {value:'Keluar', name:'Keluar'}]
      const status_penahanan = [{value:'Di Amankan', name:'Diamankan'}, {value:'Di tahan', name:'Ditahan'}, {value:'TAT', name:'TAT'}, {value:'Selesai', name:'Selesai'}]
      const formData = [
        {label: 'Status Penahanan', name: 'Status Penahanan', fieldName: 'status_penahanan', dropdown: status_penahanan, type: 'select'},
        {label: 'Rekam Jejak', name: 'Rekam Jejak', fieldName: 'rekam_jejak', dropdown: rekam_jejak, type: 'select'},
        {label: 'Tanggal', name: 'Tanggal', fieldName: 'tanggal', type: 'date'},
        {label: 'Waktu', name: 'Waktu', fieldName: 'waktu', type: 'time'},
        {label: 'Keterangan', name: 'Keterangan', fieldName: 'keterangan', type: 'area'},
      ]

      return (
        <ModalWithTablePreview 
          formTitle='FORM STATUS TERSANGKA'
          title='STATUS TERSANGKA'
          onSubmit={this.onSubmit}
          onFormChange={this.onFormChange}
          formData={formData}
        />
      );
  }
};
