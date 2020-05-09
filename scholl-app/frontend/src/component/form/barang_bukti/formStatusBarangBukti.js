import React from 'react'
import ModalWithTablePreview from '../../modal/modalWithTablePreview';
import MainForm from '../../../ui-container/mainFormContainer';
import { createstatusbb, getstatusbb, editstatusbb } from '../../../reduxActions/dashboard'
import { get_token } from '../../../helper/requestHelper';
import { connect } from 'react-redux';

const tableFieldStatusBarangBukti = [
  {
    title: 'Jumlah',
    dataIndex: 'jumlah',
  },
  {
    title: 'Satuan',
    dataIndex: 'satuan',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: true,
    search: true,
  },
  {
    title: 'Tanggal Status',
    dataIndex: 'tanggal_status',
    sorter: true,
    search: true,
  },
  {
    title: 'Waktu Status',
    dataIndex: 'waktu_status',
    sorter: true,
    search: true,
  }
]


class FormProsesTersangka extends React.Component {
  state = {
    form:{},
    isLoading: false,
    isCreated: false,
    isDataChange: false,
    isError: false,
  }

  async componentDidMount(){
    this.setState({isLoading: true})
    if(this.props.edit){
      await this.props.dispatch(getstatusbb(get_token(), null, this.props.id))
    } else {
      await this.props.dispatch(getstatusbb(get_token(), this.props.barangBuktiId))
    }
    this.setState({isLoading: false})
  }

  componentDidUpdate(prevProps){
    if(this.props.statusBBData !== prevProps.statusBBData){
      this.getDefaultForm()
    }
  }

  getDefaultForm = async () => {
    await this.setState({form: this.props.statusBBData}, () => this.setState({ isDataChange: true}))
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

  onSubmit = async() => {
    if(this.props.edit){
      this.setState({isLoading:true})
      const { form } = this.state;
      const result= await this.props.dispatch(editstatusbb(get_token(), form, this.props.id))
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
      const { form } = this.state;
      form['barang_bukti_id'] = this.props.barangBuktiId
      this.setState({isLoading:true})
      await this.props.dispatch(createstatusbb(get_token(), form))
      await this.props.dispatch(getstatusbb(get_token(), this.props.barangBuktiId))
      this.setState({isLoading:false})
    }
  }

  render(){
      const satuan_drop = [{value:"gram", name:'gram'}, {value:"Kg", name:'Kg'}, {value:"PCS", name:'Pcs'}]
      const status_drop = [{value:"Masuk", name:'Masuk'}, {value:"Keluar", name:'Keluar'}]

      const formData = [
        {label: 'Tanggal Status', name: 'Tanggal Status', fieldName: 'tanggal_status', type: 'date'},
        {label: 'Waktu Status', name: 'Waktu Status', fieldName: 'waktu_status', type: 'time'},
        {label: 'Jumlah', name: 'Jumlah', fieldName: 'jumlah', type: 'number'},
        {label: 'Satuan', name: 'Satuan', fieldName: 'satuan', type: 'select', dropdown: satuan_drop},
        {label: 'Keterangan', name: 'Keterangan', fieldName: 'keterangan', type: 'area'},
        {label: 'Status', name: 'Status', fieldName: 'status', dropdown: status_drop, type: 'select'},
      ]

      if(this.props.edit){
        return (
          <MainForm
            title={'Edit Form Status Barang Bukti'}
            messageTitle='Status Barang Bukti'
            isError={this.state.isError}
            isDataChange={this.state.isDataChange}
            defaultValue={this.state.form}
            isCreated={this.state.isCreated}
            isLoading={this.state.isLoading}
            onFormChange={this.onFormChange}
            formData={formData}
            onsubmit={this.onSubmit}
          />
        )
      }

      return (
        <ModalWithTablePreview 
          path='status_bb'
          viewModal
          formTitle='FORM STATUS BARANG BUKTI'
          tableData={this.props.bbStatus}
          isLoading={this.state.isLoading}
          title='PROSES BARANG BUKTI'
          tableField={tableFieldStatusBarangBukti}
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
    bbStatus: dashboard.bbStatus,
    statusBBData: dashboard.statusBBData,
  }
}

export default connect(mapStateToProps)(FormProsesTersangka)