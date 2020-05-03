import React from 'react'
import ModalWithTablePreview from '../../modal/modalWithTablePreview';
import { createprosestersangka, getprosestersangka } from '../../../reduxActions/dashboard'
import { get_token } from '../../../helper/requestHelper';
import { connect } from 'react-redux';

class FormProsesTersangka extends React.Component {
  state = {
    form:{},
    isLoading: false,
  }

  async componentDidMount(){
    this.setState({isLoading:true})
    await this.props.dispatch(getprosestersangka(get_token(), this.props.tersangkaId))
    this.setState({isLoading:false})
  }

  onFormChange = (fieldName, e) => {
    const form = {...this.state.form};
    if(e!==null && e!==undefined){
      if(e.file){
        form[fieldName]=e.file.originFileObj
        this.setState({
            form: form,
        })
      } else if(!e.target){
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
    console.log('form', form)
  }

  onSubmit = async (action) => {
    const { form } = this.state;
    this.setState({isLoading:true})
    const formData = new FormData();
    const keys = Object.keys(form);
    keys.map((key) => {
      formData.append(key, form[key]);
    })
    formData.append('proses_tersangka', this.props.tersangkaId)
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    await this.props.dispatch(createprosestersangka(get_token(), formData))
    await this.props.dispatch(getprosestersangka(get_token(), this.props.tersangkaId))
    this.setState({isLoading:false})
  }

  render(){
      const { jenis_proses } = this.state.form;
      const jenis_proses_drop = [{value:"1", name:'Pengadilan Satu'}, {value:"2", name:'Pengadilan Dua'}, {value:"3", name:'Kejati'}]
      let formData = [
        {label: 'Jenis Proses', name: 'Jenis Proses', fieldName: 'jenis_proses', dropdown: jenis_proses_drop, type: 'select'},
        {label: 'SP.HAN', name: 'SP.HAN', fieldName: 'sp_han'},
        {label: 'DOKUMEN SP.HAN', name: 'DOKUMEN SP.HAN', fieldName: 'sp_han_doc', type: 'upload'},
      ]

      if(jenis_proses === '1' || jenis_proses === '2'){
        formData.push({label: 'TAP HAN', name: 'TAP HAN', fieldName: 'tap_han'})
        formData.push({label: 'DOKUMEN TAP HAN', name: 'DOKUMEN TAP HAN', fieldName: 'tap_han_doc', type: 'upload'})
      }

      if(jenis_proses === '3'){
        formData.push({label: 'SURAT PERPANJANGAN HAN', name: 'SURAT PERPANJANGAN HAN', fieldName: 'surat_perpanjangan_han'})
        formData.push({label: 'DOKUMEN SURAT PERPANJANGAN HAN', name: 'DOKUMEN SURAT PERPANJANGAN HAN', fieldName: 'surat_perpanjangan_han_doc', type: 'upload'})
      }

      formData.push({label: 'Keterangan', name: 'Keterangan', fieldName: 'keterangan', type: 'area'})
      return (
        <ModalWithTablePreview 
          formTitle='FORM PROSES TERSANGKA'
          isNotAllowTo={['view']}
          tableData={this.props.prosesTersangka}
          isLoading={this.state.isLoading}
          title='PROSES TERSANGKA'
          tableField={[]}
          onSubmit={this.onSubmit}
          onFormChange={this.onFormChange}
          formData={formData}
        />
      );
  }
};

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    prosesTersangka: dashboard.prosesTersangka
  }
}

export default connect(mapStateToProps)(FormProsesTersangka)