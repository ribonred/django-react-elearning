import React from 'react'
import { get_bb_list, editbb } from '../../../reduxActions/dashboard';
import { connect } from 'react-redux';
import MainForm from '../../../ui-container/mainFormContainer';
import FormStatusBarangBukti from './formStatusBarangBukti';
import { get_token } from '../../../helper/requestHelper';

const dropdown = [{value:'narkotika', name:'narkotika'}, {value:'non_narkotika', name:'non_narkotika'}];

const formData = [
  {label: 'nama_barang', name: 'Nama Barang', fieldName: 'nama_barang'},
  {label: 'sp_sita', name: 'SP Sita', fieldName: 'sp_sita'},
  {label: 'tap_status', name: 'Tap Status', fieldName: 'tap_status'},
  {label: 'jenis_barang', name: 'Jenis Barang', fieldName: 'jenis_barang', type: 'select', dropdown: dropdown},
]

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

  updateStatusBarangBukti = (statusForm) => {
    const form = {...this.state.form};
    form.statusbarangbukti = statusForm.filter(data => data!==null && data!==undefined);
    this.setState({form: form})
  }

  onFormChange = (fieldName, e) => {
     const form = {...this.state.form};
     if(e!==null && e!==undefined && e!==''){
       if(!e.target){
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
     }
  }

  onsubmit = async() => {
    this.setState({isLoading:true})
    const result= await this.props.dispatch(editbb(this.state.form, get_token(), this.props.tersangkaId));
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
      return (
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
        >
          <FormStatusBarangBukti defaultValue={this.state.form.statusbarangbukti} updateStatusBarangBukti={(statusForm) => this.updateStatusBarangBukti(statusForm)}/>
        </MainForm>
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
