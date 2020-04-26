import React from 'react'
import { fetchalluser } from '../../../reduxActions/dashboard'
import { connect } from 'react-redux';
import MainForm from '../../../ui-container/mainFormContainer';
import { get_token } from '../../../helper/requestHelper';

const jenis_kelamin = [{value:'laki-laki', name:'laki-laki'},{value:'perempuan', name:'perempuan'}];
const formData = [
  {label: 'Username', name: 'Username', fieldName: 'username'},
  {label: 'Nama Depan', name: 'Nama Depan', fieldName: 'nama_depan'},
  {label: 'Nama Belakang', name: 'Nama Belakang', fieldName: 'nama_belakang'},
  {label: 'Profile Pic', name: 'Profile Pic', fieldName: 'profile_pic', type:'upload'},
  {label: 'Email', name: 'Email', fieldName: 'email'},
  {label: 'Password', name: 'Password', fieldName: 'password'},
  {label: 'Phone', name: 'Phone', fieldName: 'phone'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', type: 'select', dropdown: jenis_kelamin},
  {label: 'Tanggal Lahir', name: 'Tanggal Lahir', fieldName: 'tanggal_lahir', type: 'date'},
  {label: 'Address', name: 'Address', fieldName: 'address', type: 'area'},
  {label: 'Role', name: 'Role', fieldName: 'role', type: 'disabled', value:'penyidik'},
]

class FormPenyidik extends React.Component {
  state = {
    form:{},
    isLoading: false,
    isCreated: false,
    isDataChange: false,
    isError: false,
  }

  async componentDidMount(){
    if(this.props.penyidikID){
      await this.props.dispatch(fetchalluser(get_token(), this.props.penyidikID))
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.userData !== prevProps.userData){
      this.getDefaultForm()
    }
  }

  getDefaultForm = () => {
     this.setState({form: this.props.userData}, () => this.setState({ isDataChange: true}))
  }

  onsubmit = () => {

  }

  onFormChange = (fieldName, e) => {
     const formObj = {...this.state.form};
     if(e!==null && e!==undefined && e!==''){
       if(!e.target){
           formObj[fieldName] = e
           this.setState({
               form: formObj,
           })
       } else {
           formObj[fieldName] = e.target.value
           this.setState({
              form: formObj,
           })
       }
     }
  }

  render(){
      return (
        <MainForm
          title={this.props.penyidikID ? 'Edit Form Penyidik' : 'Add Form Penyidik'}
          messageTitle='Penyidik'
          isError={this.state.isError}
          isDataChange={this.props.type === 'create' ? true : this.state.isDataChange}
          defaultValue={this.state.form}
          isCreated={this.state.isCreated}
          isLoading={this.state.isLoading}
          onFormChange={this.onFormChange}
          formData={formData}
          onsubmit={this.onsubmit}
        />
      );
  }
};

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    userData: dashboard.userData,
  }
}

export default connect(mapStateToProps)(FormPenyidik)
