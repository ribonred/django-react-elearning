import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import FormPenangkapan from '../../../component/form/penangkapan/penangkapan';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import ModalTersangka from './modal'
import { getpenangkapan, editpenangkapan, get_tersangka_list, get_bb_list, createtersangka } from '../../../reduxActions/dashboard'
import { get_token } from '../../../helper/requestHelper';
import TableView from '../../../component/table/tableFilterable'

const { Content } = Layout;
const dropdownTsk = [{value:'laki-laki', name:'laki-laki'}, {value:'perempuan', name:'perempuan'}];
const dropdownBB = [{value:'narkotika', name:'narkotika'}, {value:'non_narkotika', name:'non_narkotika'}];
const formDataTsk = [
  {label: 'Nama Tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur', type: 'number'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', dropdown: dropdownTsk, type: 'select'},
  {label: 'Foto', name: 'foto', fieldName: 'foto', type: 'upload'}
]
const formDataBB = [
  {label: 'nama_barang', name: 'Nama Barang', fieldName: 'nama_barang'},
  {label: 'sp_sita', name: 'SP Sita', fieldName: 'sp_sita'},
  {label: 'tap_status', name: 'Tap Status', fieldName: 'tap_status'},
  {label: 'jenis_barang', name: 'Jenis Barang', fieldName: 'jenis_barang', type: 'select', dropdown: dropdownBB},
  {label: 'jenis_barang', name: 'Jenis Barang', fieldName: 'jenis_barang', type: 'select', dropdown: dropdownBB},
]

const tableFieldTsk = [
  {
    title: 'No.LKN',
    dataIndex: 'LKN',
    sorter: true,
    search: true,
  },
  {
    title: 'No. Penangkapan',
    dataIndex: 'no_penangkapan',
    sorter: true,
    search: true,
  },
  {
    title: 'Nama',
    dataIndex: 'nama_tersangka',
    sorter: true,
    search: true,
  }
]
const tableFieldBB = [
  {
    title: 'No.LKN',
    dataIndex: 'LKN',
    sorter: true,
    search: true,
  },
  {
    title: 'No. Penangkapan',
    dataIndex: 'no_penangkapan',
    sorter: true,
    search: true,
  },
  {
    title: 'Nama Tersangka',
    dataIndex: 'nama_tersangka',
    sorter: true,
    search: true,
  },
  {
    title: 'Nama BB',
    dataIndex: 'nama_barang',
    sorter: true,
    search: true,
  },
  {
    title: 'Jenis BB',
    dataIndex: 'jenis_barang',
    sorter: true,
    search: true,
  }
]

class EditPenangkapan extends Component {
    state = {
      formBB:{},
      formTsk:{},
      isLoading: false,
    }

    componentDidMount(){
      this.setState({ isLoading: true })
      let pnkpId = this.props.match.params.id
      this.props.dispatch(getpenangkapan(get_token(), pnkpId))
      this.props.dispatch(get_tersangka_list(get_token(), null, pnkpId))
      this.props.dispatch(get_bb_list(get_token(), null, pnkpId))
      this.setState({ isLoading: false })
    }

    // componentDidUpdate(prevProps){
    //   if(prevProps.tersangkaTableDataByLkn !== this.props.tersangkaTableDataByLkn) {
    //     let pnkpId = this.props.match.params.id
    //     this.props.dispatch(get_tersangka_list(get_token(), null, pnkpId))
    //   }
    // }

    onFormChange = (fieldName, e) => {
      const form = {...this.state.formTsk};
      if(e!==null && e!==undefined && e!==''){
        if(!e.target){
          form[fieldName] = e
          this.setState({
              formTsk: form,
          })
        } else {
          form[fieldName] = e.target.value
          this.setState({
            formTsk: form,
          })
        }
        console.log(this.state.formTsk[fieldName])
      }
    }

    onsubmit = () => {
      const { formTsk } = this.state
      if (!formTsk['nama_tersangka'] || !formTsk['jenis_kelamin'] || !formTsk['umur']) {
        alert('lengkapi form')
      } else {
        formTsk['no_penangkapan_id'] = this.props.match.params.id
        // formTsk['barangbuktitersangka'] = []
        // form['statustersangka'] = []
        let pnkpId = this.props.match.params.id
        let formPnkp = this.props.penangkapanSelectedData
        // let lknIdObj = {no_penangkapan_id: this.props.match.params.id}
        // this.setState({form: {lknIdObj}})
        // formPnkp.penangkapan_tersangka.push(form)
        this.props.dispatch(createtersangka(get_token(), formTsk))
      }
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Penangkapan</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">{this.props.match.params.id}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Penangkapan</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">edit</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        const { tersangkaTableDataByLkn, bbDataByPnkp } = this.props;
        const dataTersangka = tersangkaTableDataByLkn.map((data) => {
          return {
            ...data,
            no_penangkapan: data.no_penangkapan_id.no_penangkapan,
            "LKN": data.no_penangkapan_id.no_lkn.LKN,
          }
        })
        const dataBB = bbDataByPnkp.map((data) => {
          const tersangka = data.milik_tersangka_id ? data.milik_tersangka_id : null;
          const no_penangkapan = tersangka ? tersangka.no_penangkapan_id.no_penangkapan : 'no_data';
          const LKN = tersangka ? tersangka.no_penangkapan_id.no_lkn.LKN : 'no_data';
          const nama_tersangka = tersangka ? tersangka.nama_tersangka : 'no_data';
          return {
            ...data,
            no_penangkapan: no_penangkapan,
            LKN: LKN,
            nama_tersangka: nama_tersangka,
          }
        })
        
        return (
          <SideMenu selected="1">
            <Content style={{padding:'20px'}}>
              <div style={styles.siteLayout}>
                {this.renderBreadCrumb()}
                <FormPenangkapan penangkapanID={this.props.match.params.id}/>
                <ModalTersangka
                  title={'Tambah Tersangka'}
                  formData={formDataTsk}
                  onFormChange={this.onFormChange}
                  onsubmit={this.onsubmit}
                />
                <TableView
                  useId="true"
                  path="tersangka"
                  tableField={tableFieldTsk}
                  tableData={dataTersangka}
                  isLoading={this.state.isLoading}
                />
                <ModalTersangka
                  title={'Tambah Barang - Bukti'}
                  formData={formDataBB}
                  onFormChange={this.onFormChange}
                  onsubmit={this.onsubmit}
                />
                <TableView
                    useId
                    path="barangbukti"
                    tableField={tableFieldBB}
                    tableData={dataBB}
                    isLoading={this.state.isLoading}
                  />
               </div>
             </Content>
          </SideMenu>
        )
    }

}

function mapStateToProps(state) {
  const { dashboard } = state
  console.log('BB', dashboard.bbDataByPnkp)
  console.log('penangkapan', dashboard.penangkapanSelectedData)
  return { 
    penangkapanSelectedData: dashboard.penangkapanSelectedData,
    tersangkaTableDataByLkn: dashboard.tersangkaTableDataByLkn,
    bbDataByPnkp: dashboard.bbDataByPnkp
  }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(EditPenangkapan)
