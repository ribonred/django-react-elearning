import React from 'react'
import ModalWithTablePreview from '../../modal/modalWithTablePreview';
import { createstatustersangka, getstatustersangka } from '../../../reduxActions/dashboard'
import MainForm from '../../../ui-container/mainFormContainer';
import { get_token } from '../../../helper/requestHelper';
import { connect } from 'react-redux';

const tableFieldStatusTersangka = [
  {
    title: 'Status Penahanan',
    dataIndex: 'status_penahanan',
    sorter: true,
    search: true,
  },
  {
    title: 'Rekam Jejak',
    dataIndex: 'rekam_jejak',
    sorter: true,
    search: true,
  },
  {
    title: 'Tanggal',
    dataIndex: 'tanggal',
    sorter: true,
    search: true,
  },
  {
    title: 'Waktu Status',
    dataIndex: 'waktu',
    sorter: true,
  }
]

class FormStatusTersangka extends React.Component {
  //TODO CHANGE isDATACHANGE to false AFTER IT CAN GET CORRECT GET API CALL
  state = {
    form:this.props.defaultValue,
    isLoading: false,
    isCreated: false,
    isDataChange: true,
    isError: false,
  }

  async componentDidMount(){
    this.setState({isLoading:true})
    if(this.props.edit){
      //TODO GET CORRECT STATUS DATA HERE
    } else {
      await this.props.dispatch(getstatustersangka(get_token(), this.props.tersangkaId))
    }
    this.setState({isLoading:false})
  }

  componentDidUpdate(prevProps){
    //TODO IF SUCCESS GET DATA , GIVE STATE statusTersangkaData in reducer Value from API CALL
    if(this.props.statusTersangkaData !== prevProps.statusTersangkaData){
      this.getDefaultForm()
    }
  }

  getDefaultForm = () => {
    this.setState({form: this.props.statusTersangkaData}, () => this.setState({ isDataChange: true}))
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

  onSubmit = async () => {
    if(this.props.edit){
      this.setState({isLoading:true})
      // const { form } = this.state;
      // const formData = new FormData();
      // TODO GIVE CORRECT API CALL HERE
      // const keys = Object.keys(form);
      // keys.map((key) => {
      //   formData.append(key, form[key]);
      // })
      const result= 'GIVE API CALL HERE'
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
    } else {
      this.setState({isLoading:true})
      const { form } = this.state;
      form['tersangka_id'] = this.props.tersangkaId;
      await this.props.dispatch(createstatustersangka(get_token(), form))
      await this.props.dispatch(getstatustersangka(get_token(), this.props.tersangkaId))
      this.setState({isLoading:false})
    }
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

      if(this.props.edit){
        return (
          <MainForm
            title={'Edit Form Status Tersangka'}
            messageTitle='Status Tersangka'
            isError={this.state.isError}
            isDataChange={this.state.isDataChange}
            defaultValue={this.state.form}
            isCreated={this.state.isCreated}
            isLoading={this.state.isLoading}
            onFormChange={this.onFormChange}
            formData={formData}
            onsubmit={this.onsubmit}
          />
        )
      }

      return (
        <ModalWithTablePreview 
          path='status_tersangka'
          formTitle='FORM STATUS TERSANGKA'
          isNotAllowTo={['view']}
          tableData={this.props.statusTersangkaDataByPnkp}
          isLoading={this.state.isLoading}
          title='STATUS TERSANGKA'
          tableField={tableFieldStatusTersangka}
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
    statusTersangkaDataByPnkp: dashboard.statusTersangkaDataByPnkp,
    statusTersangkaData: dashboard.statusTersangkaData,
  }
}

export default connect(mapStateToProps)(FormStatusTersangka)