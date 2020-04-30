import React from 'react'
import { get_tersangka_list, edittersangka } from '../../../reduxActions/dashboard';
import { connect } from 'react-redux';
import FormStatusTersangka from './formStatusTersangka';
import FormProsesTersangka from './formProsesTersangka';
import MainForm from '../../../ui-container/mainFormContainer';
import { get_token } from '../../../helper/requestHelper';

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

  updateStatusTersangka = (statusForm) => {
    const form = {...this.state.form};
    form.statustersangka = statusForm.filter(data => data!==null && data!==undefined);
    this.setState({form: form})
  }

  updateProsesTersangka = (prosesForm) => {
    const form = {...this.state.form};
    form.prosestersangka = prosesForm.filter(data => data!==null && data!==undefined);
    this.setState({form: form})
  }

  onFormChange = (fieldName, e) => {
    // console.log(fieldName, e.file.originFileObj)
     const form = {...this.state.form};
     if(e!==null && e!==undefined && e!==''){
      if (e.file){
        this.setState({imageChange: true})
        form[fieldName] = e.file.originFileObj
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
    console.log(this.state.form)
    
    const data = new FormData();
    if(this.state.form.foto && this.state.imageChange){
      data.append("foto", this.state.form.foto);
    }
    data.set("id", this.state.form.id);
    data.set("jenis_kelamin", this.state.form.jenis_kelamin);
    data.set("nama_tersangka", this.state.form.nama_tersangka);
    data.set("umur", this.state.form.umur);
    data.set("no_penangkapan_id", this.state.form.no_penangkapan_id);
    data.set("prosestersangka", this.state.form.prosestersangka);
    data.set("statustersangka", this.state.form.statustersangka);
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    const result= await this.props.dispatch(edittersangka(data, get_token(), this.props.tersangkaId));
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
    let tersangkaIdDefaultStatus = []
    let  tersangkaIdDefaultProses = []

    if (this.state.form.id){
      tersangkaIdDefaultStatus = this.state.form.statustersangka.map( data => {
        return {
          ...data,
          tersangka_id:Number(this.props.tersangkaId)
        }
      } )
      tersangkaIdDefaultProses = this.state.form.prosestersangka.map( data => {
        return {
          ...data,
          tersangka_id:Number(this.props.tersangkaId)
        }
      } )
    }



      return (
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
        >
          <FormStatusTersangka tersangkaId={this.props.tersangkaId} defaultValue={tersangkaIdDefaultStatus || []} updateStatusTersangka={(statusForm) => this.updateStatusTersangka(statusForm)}/>
          <FormProsesTersangka tersangkaId={this.props.tersangkaId} defaultValue={tersangkaIdDefaultProses || []} updateProsesTersangka={(prosesForm) => this.updateProsesTersangka(prosesForm)}/>
        </MainForm>
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
