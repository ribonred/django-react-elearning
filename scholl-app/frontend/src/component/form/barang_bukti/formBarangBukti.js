import React from 'react'
import { get_bb_list, editbb } from '../../../reduxActions/dashboard';
import { connect } from 'react-redux';
import MainForm from '../../../ui-container/mainFormContainer';
import FormStatusBarangBukti from './formStatusBarangBukti';
import { get_token } from '../../../helper/requestHelper';

class FormBarangBukti extends React.Component {
  state = {
    form:{},
    isLoading: false,
    isCreated: false,
    isDataChange: false,
    isError: false,
  }

  async componentDidMount(){
    this.setState({ isLoading: true })
    await this.props.dispatch(get_bb_list(get_token(), this.props.barangBuktiId))
    this.setState({ isLoading: false })
  }

  componentDidUpdate(prevProps){
    if(this.props.bbData !== prevProps.bbData){
      this.getDefaultForm()
    }
  }

  onFormChange = (fieldName, e) => {
     const form = {...this.state.form};
     if(e!==null && e!==undefined && e!==''){
      if(e.file){
        form[fieldName]=e.file.originFileObj
        this.setState({
            form: form,
        })
       } else if(!e.target){
         form[fieldName] = e
         this.setState({
             form: form,
         })
       } else {
         form[fieldName] = e.target.value
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

  onsubmit = async() => {
    this.setState({isLoading:true})
    const { form } = this.state;
    if(!form.nomor_lab_doc || form.nomor_lab_doc.constructor!==File){
      delete form.nomor_lab_doc;
    }
    if(!form.sp_sita_doc || form.sp_sita_doc.constructor!==File){
      delete form.sp_sita_doc;
    }
    if(!form.tap_sita_doc || form.tap_sita_doc.constructor!==File){
      delete form.tap_sita_doc;
    }
    if(!form.tap_status_doc || form.tap_status_doc.constructor!==File){
      delete form.tap_status_doc;
    }
    const formData = new FormData();
    const keys = Object.keys(form);
    keys.forEach((key) => {
      formData.append(key, form[key]);
    })
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    const result= await this.props.dispatch(editbb(formData, get_token(), this.props.barangBuktiId));
    if(result === 'error'){
      this.setState({ isError: true })
      setTimeout(() => {
        this.setState({ isError: false })
      }, 200);
    } else {
      this.setState({ isCreated: true})
      setTimeout(() => {
        this.setState({ isCreated: false })
      }, 200);
    }
    this.setState({isLoading:false})
  }

  getDefaultForm = () => {
     this.setState({form: this.props.bbData}, () => this.setState({ isDataChange: true}))
  }

  render(){
    const dropdown = [{value:'narkotika', name:'narkotika'}, {value:'non narkotika', name:'non narkotika'}];

    let formData = [
      {label: 'BB', name: 'BB', fieldName: 'nama_barang'},
      {label: 'SP Sita', name: 'SP Sita', fieldName: 'sp_sita'},
      {label: 'SP Sita Dokumen', name: 'SP Sita Dokumen', fieldName: 'sp_sita_doc', type: 'upload'},
      {label: 'Tap Sita', name: 'Tap Sita', fieldName: 'tap_sita'},
      {label: 'Tap Sita Dokumen', name: 'Tap Sita Dokumen', fieldName: 'tap_sita_doc', type: 'upload'},
    ]

    if(this.state.form.jenis_barang === 'narkotika'){
      formData.push({label: 'Tap Status', name: 'Tap Status', fieldName: 'tap_status'})
      formData.push({label: 'Tap Status Dokumen', name: 'Tap Status Dokumen', fieldName: 'tap_status_doc', type: 'upload'})
      formData.push({label: 'Lab', name: 'Lab', fieldName: 'nomor_lab'})
      formData.push({label: 'Lab Dokumen', name: 'Lab Dokumen', fieldName: 'nomor_lab_doc', type: 'upload'})
    }
    formData.push({label: 'Jenis Barang', name: 'Jenis Barang', fieldName: 'jenis_barang', type: 'select', dropdown: dropdown})
      return (
        <React.Fragment>
          <MainForm
            title={'Edit Form Barang Bukti'}
            messageTitle='Barang Bukti'
            isError={this.state.isError}
            isDataChange={this.state.isDataChange}
            defaultValue={this.state.form}
            isCreated={this.state.isCreated}
            isLoading={this.state.isLoading}
            onFormChange={this.onFormChange}
            formData={formData}
            onsubmit={this.onsubmit}
          />
          <FormStatusBarangBukti barangBuktiId={this.props.barangBuktiId}/>
        </React.Fragment>
      );
  }
};

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    bbData: dashboard.bbData,
  }
}

export default connect(mapStateToProps)(FormBarangBukti)
