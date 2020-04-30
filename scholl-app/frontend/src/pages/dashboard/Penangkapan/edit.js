import React, { Component } from 'react';
import { Layout, Breadcrumb, message } from 'antd';
import FormPenangkapan from '../../../component/form/penangkapan/penangkapan';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import ModalTersangka from './modal'
import { getpenangkapan, get_tersangka_list, get_bb_list, createtersangka, create_bb_by_tersangka, deletetersangka, deletebb } from '../../../reduxActions/dashboard'
import { get_token } from '../../../helper/requestHelper';
import TableView from '../../../component/table/tableFilterable'

const { Content } = Layout;
const dropdownTsk = [{value:'laki-laki', name:'Laki-laki'}, {value:'perempuan', name:'Perempuan'}];
const dropdownBB = [{value:'narkotika', name:'Narkotika'}, {value:'non narkotika', name:'Non Narkotika'}];
const formDataTsk = [
  {label: 'Nama Tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur', type: 'number'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', dropdown: dropdownTsk, type: 'select'},
  {label: 'Foto', name: 'foto', fieldName: 'foto', type: 'upload'}
]
const formDataBB = [
  {label: 'Nama Barang', name: 'Nama Barang', fieldName: 'nama_barang'},
  {label: 'SP Sita', name: 'SP Sita', fieldName: 'sp_sita'},
  {label: 'Tap Status', name: 'Tap Status', fieldName: 'tap_status'},
  {label: 'Jenis Barang', name: 'Jenis Barang', fieldName: 'jenis_barang', type: 'select', dropdown: dropdownBB},
  {label: 'Pilih Tersangka', name: 'Pilih Tersangka', fieldName: 'milik_tersangka_id', type: 'select', dropdown: []},
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

const key='error';
class EditPenangkapan extends Component {
    state = {
      form:{},
      isLoading: false,
      showBBModal: false,
      showTskModal: false,
    }

    async componentDidMount(){
      this.setState({ isLoading: true })
      let pnkpId = this.props.match.params.id
      await this.props.dispatch(getpenangkapan(get_token(), pnkpId))
      await this.props.dispatch(get_tersangka_list(get_token(), null, pnkpId))
      await this.props.dispatch(get_bb_list(get_token(), null, pnkpId))
      this.setState({ isLoading: false })
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
        console.log(this.state.form[fieldName])
      }
    }

    openErrorMessage = () => {
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.error({ content: `Submit Gagal, Tolong Lengkapi Required Field`, key, duration: 4 });
      }, 1000);
    };

    openSuccessMessage = () => {
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.success({ content: `berkas berhasil dibuat`, key, duration: 4 });
      }, 1000);
    }

    showModal = (action) => {
      if(action === 'tersangka'){
        this.setState({
          showTskModal: true,
        });
      }
      if(action === 'barangbukti'){
        this.setState({
          showBBModal: true,
        });
      }
    };

    hideModal = (action) => {
      if(action === 'tersangka'){
        this.setState({
          showTskModal: false,
        });
      }
      if(action === 'barangbukti'){
        this.setState({
          showBBModal: false,
        });
      }
    };

    async onSubmit(action){
      const { form } = this.state
      let pnkpId = this.props.match.params.id
      if(action === 'Tambah Tersangka') {
        if (!form['nama_tersangka'] || !form['jenis_kelamin'] || !form['umur']) {
          this.setState({form:{}})
          this.openErrorMessage()
          return 'false'
        } else {
          form['no_penangkapan_id'] = this.props.match.params.id
          await this.props.dispatch(createtersangka(get_token(), form))
          this.setState({ isLoading: true })
          await this.props.dispatch(get_tersangka_list(get_token(), null, pnkpId))
          this.setState({ isLoading: false})
          this.openSuccessMessage();
          this.hideModal('tersangka')
          this.setState({form:{}})
        }
      } else {
        if (!this.state.form['nama_barang'] || !this.state.form['jenis_barang'] || !this.state.form['milik_tersangka_id']) {
          this.openErrorMessage()
          this.setState({form:{}})
          return 'false'
        } else {
          await this.props.dispatch(create_bb_by_tersangka(get_token(), form))
          this.setState({ isLoading: true })
          await this.props.dispatch(get_bb_list(get_token(), null, pnkpId))
          this.openSuccessMessage();
          this.hideModal('barangbukti')
          this.setState({ isLoading: false})
          this.setState({form:{}})
          return 'success'
        }
      }
    }

    async onDelete(id, path){
      let pnkpId = this.props.match.params.id
      if(path === 'tersangka'){
        await this.props.dispatch(deletetersangka(get_token(), id))
        this.setState({ isLoading: true })
        await this.props.dispatch(get_tersangka_list(get_token(), null, pnkpId))
        this.setState({ isLoading: false })
      } else if (path === 'barangbukti'){
        await this.props.dispatch(deletebb(get_token(), id))
        this.setState({ isLoading: true })
        await this.props.dispatch(get_bb_list(get_token(), null, pnkpId))
        this.setState({ isLoading: false })
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
        if(tersangkaTableDataByLkn.length > 0) {
          formDataBB[4]['dropdown'] = []
          tersangkaTableDataByLkn.map((data) => {
            let dropdownData = {
              value: data.id,
              name: data.nama_tersangka
            }
            formDataBB[4]['dropdown'].push(dropdownData)
            return dropdownData
          })
        }
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
                  isSuccess={this.state.isSuccess}
                  showModal={() => this.showModal('tersangka')}
                  hideModal={() => this.hideModal('tersangka')}
                  visible={this.state.showTskModal}
                  onFormChange={this.onFormChange}
                  onSubmit={(action) => { this.onSubmit(action); }}
                />
                <TableView
                  useId="true"
                  path="tersangka"
                  tableField={tableFieldTsk}
                  tableData={dataTersangka}
                  isLoading={this.state.isLoading}
                  onDelete={(id, path) => { this.onDelete(id, path); }}
                  />
                <ModalTersangka
                  title={'Tambah Barang - Bukti'}
                  formData={formDataBB}
                  showModal={() => this.showModal('barangbukti')}
                  hideModal={() => this.hideModal('barangbukti')}
                  visible={this.state.showBBModal}
                  isSuccess={this.state.isSuccess}
                  onFormChange={this.onFormChange}
                  onSubmit={(action) => { this.onSubmit(action); }}
                />
                <TableView
                    useId
                    path="barangbukti"
                    tableField={tableFieldBB}
                    tableData={dataBB}
                    isLoading={this.state.isLoading}
                    onDelete={(id, path) => { this.onDelete(id, path); }}
                  />
               </div>
             </Content>
          </SideMenu>
        )
    }

}

function mapStateToProps(state) {
  const { dashboard } = state
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
