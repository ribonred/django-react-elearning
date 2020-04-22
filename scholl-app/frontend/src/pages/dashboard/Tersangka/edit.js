import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, message, Skeleton } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import history from '../../../route/history';
import TableView from '../../../component/table/tableFilterable'
import SideMenu from '../../../component/sider';
import TskFormView from '../../../component/tskform'
import { get_token } from '../../../helper/requestHelper';
import { get_tersangka_list, edit_tersangka } from '../../../reduxActions/dashboard';

const { Content } = Layout;

const tableField = [
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
    dropdown: ['Tanggal Baik', 'Tanggal Buruk'],
  },
  {
    title: 'Waktu',
    dataIndex: 'waktu',
    sorter: true,
    dropdown: ['Tanggal Baik', 'Tanggal Buruk'],
  },
  {
    title: 'Keterangan',
    dataIndex: 'keterangan',
    sorter: true,
    search: true,
  },
]

const tableFieldProses = [
  {
    title: 'No. Proses',
    dataIndex: 'no_proses',
    sorter: true,
    search: true,
  },
  {
    title: 'Jenis Proses',
    dataIndex: 'jenis_proses',
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

class EditTersangka extends Component {
    state = {
      isLoading: false,
      // render: '',
      form: {},
      isDataChange: false,
    }

    async componentDidMount(){
      let tersangkaId = this.props.match.params.id;
      // this.setState({ isLoading: true })
      await this.props.dispatch(get_tersangka_list(get_token(), tersangkaId))
      // this.setState({ isLoading: false })
      // this.setState({ render: 'selesai' })
    }

    componentDidUpdate(prevProps){
      if(this.props.tersangkaTableData !== prevProps.tersangkaTableData){
        this.getDefaultForm()
      }
    }

    getDefaultForm = () => {
        this.setState({form: this.props.tersangkaTableData}, () => this.setState({ isDataChange: true}))
    }

    onFormChange = (fieldName, e) => {
      const formObj = {...this.state.form};
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

    onsubmit = async() => {
      this.setState({ isLoading: true })
      await this.props.dispatch(edit_tersangka(this.state.form, get_token(), this.props.tersangkaTableData.id))
      if(!this.props.error){
        history.push('/dashboard/tersangka')
      } else {
        this.openMessage()
      }
      this.setState({ isLoading: false })
    }

    renderTersangkaForm = () => {
      const { form, isLoading } = this.state;
      return (
        <TskFormView defaultValue={form} isLoading={isLoading} onFormChange={this.onFormChange} onsubmit={this.onsubmit}></TskFormView>
      )
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Tersangka</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">{this.props.match.params.id}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Edit</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        // const { tersangkaTableData } = this.props;
        // let dataShow = []
        // let dataTersangka = []
        // if(this.state.render === 'selesai'){
        //   dataShow = [
        //     {
        //       label: 'No. LKN',
        //       value: tersangkaTableData.no_penangkapan_id.no_lkn.LKN
        //     },
        //     {
        //       label: 'Tanggal LKN Dibuat',
        //       value: tersangkaTableData.no_penangkapan_id.no_lkn.tgl_dibuat
        //     },
        //     {
        //       label: 'No. Penangkapan',
        //       value: tersangkaTableData.no_penangkapan_id.no_penangkapan
        //     },
        //     {
        //       label: 'Tanggal Penangkapan',
        //       value: tersangkaTableData.no_penangkapan_id.tgl_penangkapan
        //     },
        //     {
        //       label: 'Jam Penangkapan',
        //       value: tersangkaTableData.no_penangkapan_id.jam_penangkapan
        //     }
        //   ]
          
        //   dataTersangka = [
        //     {
        //       label: 'nama',
        //       value: tersangkaTableData.nama_tersangka
        //     },
        //     {
        //       label: 'umur',
        //       value: tersangkaTableData.umur
        //     },
        //     {
        //       label: 'jenis_kelamin',
        //       value: tersangkaTableData.jenis_kelamin
        //     },
        //     {
        //       label: 'foto',
        //       value: tersangkaTableData.foto
        //     }
        //   ]
        // }
        // const { isDataChange } = this.state;
        const { isDataChange } = this.state;
        return (
          <SideMenu selected="3">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  {isDataChange && this.renderTersangkaForm()}
                  {isDataChange && (
                    <Button style={{ fontWeight: 'bold', margin: '20px' }} type="primary" htmlType="submit">
                      <Link to="/dashboard/lkn/penangkapan/buat">Tambah Proses</Link>
                    </Button>
                  )}
                  {isDataChange && (
                    <TableView
                      path="tersangka/proses"
                      tableField={tableFieldProses}
                      tableData={this.props.tersangkaTableData.prosestersangka || []}
                      isLoading={this.state.isLoading}
                    />
                  )}
                  {isDataChange && (
                    <Button style={{ fontWeight: 'bold', margin: '20px' }} type="primary" htmlType="submit">
                      <Link to={`/dashboard/tersangka/${this.props.match.params.id}/edit/status`}>Tambah Status</Link>
                    </Button>
                  )}
                  {isDataChange && (
                    <TableView
                      path="tersangka/status"
                      tableField={tableField}
                      tableData={this.props.tersangkaTableData.statustersangka || []}
                      isLoading={this.state.isLoading}
                    />
                  )}
                  {!isDataChange && <Skeleton active />}
                  {/* <TersangkaForm
                    dataShow={dataShow}
                    dataTersangka={dataTersangka}
                    tersangkaTableData={tersangkaTableData}
                  /> */}
                 </div>
               </Content>
             </Layout>
          </SideMenu>
        )
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return { tersangkaTableData: dashboard.tersangkaTableData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(EditTersangka)
