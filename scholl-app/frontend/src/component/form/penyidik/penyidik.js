import React from 'react'
import { fetchalluser, registeruser, edituser } from '../../../reduxActions/dashboard'
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
    let ExcludePassVal = this.props.userData
    if (this.props.penyidikID){
      ExcludePassVal = {
        ...this.props.userData,
        password:''
      }
    }
     this.setState({form:  ExcludePassVal }, () => this.setState({ isDataChange: true}))
  }

  onsubmit = async() => {
    const data={
      ...this.state.form,
      role:1
    }
    this.setState({isLoading:true})
    let result;
    if(this.props.penyidikID){
      result = await this.props.dispatch(edituser(get_token(), data, this.props.penyidikID))
    } else {
      result = await this.props.dispatch(registeruser(get_token(), data))
    }
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
          messageTitle='Username'
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
