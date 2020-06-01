import React from 'react'
import { get_tersangka_list, edittersangka } from '../../../reduxActions/dashboard';
import { connect } from 'react-redux';
import MainForm from '../../../ui-container/mainFormContainer';
import { get_token } from '../../../helper/requestHelper';
import FormStatusTersangka from './formStatusTersangka';
import FormProsesTersangka from './formProsesTersangka';

const dropdown = [{value:'laki-laki', name:'laki-laki'}, {value:'perempuan', name:'perempuan'}];
const formData = [
  {label: 'Nama Tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', dropdown: dropdown, type: 'select'},
  {label: 'Foto', name: 'foto', fieldName: 'foto', type: 'upload'}
]

class FormTersangka extends React.Component {
  state = {
    form:{},
    isLoading: false,
    isCreated: false,
    isDataChange: false,
    isError: false,
    imageChange: false,
  }

  async componentDidMount(){
    this.setState({ isLoading: true })
    await this.props.dispatch(get_tersangka_list(get_token(), this.props.tersangkaId))
    this.setState({ isLoading: false })
  }

  componentDidUpdate(prevProps){
    if(this.props.tersangkaData !== prevProps.tersangkaData){
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
     }
  }

  onsubmit = async() => {
    this.setState({isLoading:true})
    const { form } = this.state;
    const formData = new FormData();
    const keys = Object.keys(form);
    keys.forEach((key) => {
      formData.append(key, form[key]);
    })
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    const result= await this.props.dispatch(edittersangka(formData, get_token(), this.props.tersangkaId));
    return
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
     this.setState({form: this.props.tersangkaData}, () => this.setState({ isDataChange: true}))
  }

  render(){
      return (
        <React.Fragment>
          <MainForm
            title={'Edit Form Tersangka'}
            messageTitle='Tersangka'
            isError={this.state.isError}
            isDataChange={this.state.isDataChange}
            defaultValue={this.state.form}
            isCreated={this.state.isCreated}
            isLoading={this.state.isLoading}
            onFormChange={this.onFormChange}
            formData={formData}
            onsubmit={this.onsubmit}
          />
          <FormProsesTersangka tersangkaId={this.props.tersangkaId}/>
          <FormStatusTersangka tersangkaId={this.props.tersangkaId}/>         
        </React.Fragment>
      );
  }
};

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    tersangkaData: dashboard.tersangkaData,
  }
}

export default connect(mapStateToProps)(FormTersangka)
