import React from 'react'
import ModalWithTablePreview from '../../modal/modalWithTablePreview';
import { createstatustersangka, getstatustersangka } from '../../../reduxActions/dashboard'
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
  state = {
    form:this.props.defaultValue,
    isLoading: false,
  }

  async componentDidMount(){
    this.setState({isLoading:true})
    await this.props.dispatch(getstatustersangka(get_token(), this.props.tersangkaId))
    this.setState({isLoading:false})
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
    this.setState({isLoading:true})
    const { form } = this.state;
    form['tersangka_id'] = this.props.tersangkaId;
    await this.props.dispatch(createstatustersangka(get_token(), form))
    await this.props.dispatch(getstatustersangka(get_token(), this.props.tersangkaId))
    this.setState({isLoading:false})
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
      console.log('status', this.props.statusTersangkaDataByPnkp)
      return (
        <ModalWithTablePreview 
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
    statusTersangkaDataByPnkp: dashboard.statusTersangkaDataByPnkp
  }
}

export default connect(mapStateToProps)(FormStatusTersangka)