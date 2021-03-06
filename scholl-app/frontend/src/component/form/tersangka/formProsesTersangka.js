import React from 'react'
import ModalWithTablePreview from '../../modal/modalWithTablePreview';
import { createprosestersangka, getprosestersangka, get_proses, editprosestersangka, deleteprosestersangka } from '../../../reduxActions/dashboard'
import MainForm from '../../../ui-container/mainFormContainer';
import { get_token } from '../../../helper/requestHelper';
import { connect } from 'react-redux';

const tableFieldStatusTersangka = [
  {
    title: 'Jenis Proses',
    dataIndex: 'jenis_proses',
    sorter: true,
    search: true,
  },
  {
    title: 'SP_HAN',
    dataIndex: 'sp_han',
    sorter: true,
    search: true,
  },
  {
    title: 'Keterangan',
    dataIndex: 'keterangan',
    sorter: true,
    search: true,
  },
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
    this.setState({ isLoading: true })
    await this.props.dispatch(get_proses(get_token()))
    if(this.props.edit){
      await this.props.dispatch(getprosestersangka(get_token(), null, this.props.id))
    } else {
      await this.props.dispatch(getprosestersangka(get_token(), this.props.tersangkaId))
    }
    this.setState({ isLoading: false })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.prosesTersangkaData !== prevProps.prosesTersangkaData){
      this.getDefaultForm()
    }
    if(!this.props.edit && (this.state.form.jenis_proses!==prevState.form.jenis_proses)){
       this.setState((prevState) => ({
        form: {
          jenis_proses: prevState.form.jenis_proses
        }
       }));
    }
  }

  getDefaultForm = async () => {
    await this.setState({form: this.props.prosesTersangkaData}, () => this.setState({ isDataChange: true}))
  }

  onFormChange = (fieldName, e) => {
    const form = {...this.state.form};
    if(e!==null && e!==undefined){
      if(e.file){
        form[fieldName]=e
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
  }

  onSubmit = async () => {
      const { form } = this.state;
      if(this.props.edit){
      this.setState({isLoading:true})
      const formData = new FormData();
      const keys = Object.keys(form);
      keys.forEach((key) => {
        if(key === 'sp_han_doc' || key === 'tap_han_doc' || key === 'surat_perpanjangan_han_doc'){
          if(form[key] && form[key].uid){
            formData.append(key, form[key]);
          }
        } else {
          formData.append(key, form[key]);
        }
      })
      const result = await this.props.dispatch(editprosestersangka(get_token(), formData, this.props.id))
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
      const formData = new FormData();
      const keys = Object.keys(form);
      keys.forEach((key) => {
        formData.append(key, form[key]);
      })
      formData.append('proses_tersangka', this.props.tersangkaId)
      await this.props.dispatch(createprosestersangka(get_token(), formData))
      await this.props.dispatch(getprosestersangka(get_token(), this.props.tersangkaId))
      this.setState({isLoading:false})
    }
  }

  hideModal = () => {
    this.setState({
      form: {}
    })
  }

  onDelete = async (id) => {
    await this.props.dispatch(deleteprosestersangka(get_token(), id))
    this.setState({ isLoading: true })
    await this.props.dispatch(getprosestersangka(get_token(), this.props.tersangkaId))
    this.setState({ isLoading: false })
  }

  render(){
      const { jenis_proses } = this.state.form;
      const { prosesIndex } = this.props;
      const jenis_proses_drop = []
      if (prosesIndex.length > 0){
        jenis_proses_drop.length = 0;
        prosesIndex.forEach((data) => {
          let dropdownData = {
            value: data.id,
            name: data.nama_proses
          }
          jenis_proses_drop.push(dropdownData)
        })
      }
      let formData = [
        {label: 'Jenis Proses', name: 'Jenis Proses', fieldName: 'jenis_proses', dropdown: jenis_proses_drop, type: 'select', disabled: this.props.edit ? true : false},
      ]
      if(jenis_proses === 2 || jenis_proses === 3){
        formData.push({label: 'TAP HAN', name: 'TAP HAN', fieldName: 'tap_han'})
        formData.push({label: 'DOKUMEN TAP HAN', name: 'DOKUMEN TAP HAN', fieldName: 'tap_han_doc', type: 'upload'})
      }

      if(jenis_proses === 4){
        formData.push({label: 'SURAT PERPANJANGAN HAN', name: 'SURAT PERPANJANGAN HAN', fieldName: 'surat_perpanjangan_han'})
        formData.push({label: 'DOKUMEN SURAT PERPANJANGAN HAN', name: 'DOKUMEN SURAT PERPANJANGAN HAN', fieldName: 'surat_perpanjangan_han_doc', type: 'upload'})
      }

      if(jenis_proses === 1){
        formData.push({label: 'SP.HAN', name: 'SP.HAN', fieldName: 'sp_han'})
        formData.push({label: 'DOKUMEN SP.HAN', name: 'DOKUMEN SP.HAN', fieldName: 'sp_han_doc', type: 'upload'})
      }
      formData.push({label: 'Tanggal Mulai Penahanan', name: 'Tanggal Mulai Penahanan', fieldName: 'tanggal_mulai_proses', type: 'date'})
      formData.push({label: 'Tanggal Akhir Penahanan', name: 'Tanggal Akhir Penahanan', fieldName: 'tanggal_akhir_proses', type: 'date'})
      formData.push({label: 'Keterangan', name: 'Keterangan', fieldName: 'keterangan', type: 'area'})
      
      let prosesTersangka = []
      if(this.props.prosesTersangka.length > 0){
        prosesTersangka = this.props.prosesTersangka.map(data => {
          return {
            ...data,
            jenis_proses: jenis_proses_drop.find(item => data.jenis_proses === Number(item.value)).name
          }
        })
      }

      if(this.props.edit){
        console.log('this state isLoading', this.state.isLoading)
        return (
          <MainForm
            title={'Edit Form Proses Tersangka'}
            messageTitle='Proses Tersangka'
            isError={this.state.isError}
            isDataChange={this.state.isDataChange}
            defaultValue={this.state.form}
            form={this.state.form}
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
          path='proses_tersangka'
          hideModal={this.hideModal}
          form={this.state.form}
          formTitle='FORM PROSES PENAHANAN'
          tableData={prosesTersangka || []}
          isLoading={this.state.isLoading}
          title='PROSES TERSANGKA'
          tableField={tableFieldStatusTersangka || []}
          onSubmit={this.onSubmit}
          onFormChange={this.onFormChange}
          formData={formData}
          onDelete={this.onDelete}
        />
      );
  }
};

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    prosesTersangka: dashboard.prosesTersangka,
    prosesIndex: dashboard.prosesIndex,
    prosesTersangkaData: dashboard.prosesTersangkaData,
  }
}

export default connect(mapStateToProps)(FormProsesTersangka)