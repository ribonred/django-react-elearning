import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import DescriptionView from '../../../ui-container/description';
import { get_bb_list, getstatusbb } from '../../../reduxActions/dashboard';
import { get_token } from '../../../helper/requestHelper';
import TableView from '../../../component/table/tableFilterable'

const { Content } = Layout;
const tableField = [
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: true,
    search: true,
  },
  {
    title: 'Jumlah',
    dataIndex: 'jumlah',
    sorter: true,
    search: true,
  },
  {
    title: 'Keterangan',
    dataIndex: 'keterangan',
    sorter: true,
    search: true,
  },
  {
    title: 'Tanggal',
    dataIndex: 'tanggal_status',
    sorter: true,
    search: true,
  },
  {
    title: 'Waktu',
    dataIndex: 'waktu_status',
    sorter: true,
    search: true,
  }
]

class BarangBuktiView extends Component {
    state = {
      isLoading: false,
    }
    async componentDidMount(){
      this.setState({ isLoading: true })
      let noBB = this.props.match.params.id;
      await this.props.dispatch(get_bb_list(get_token(), noBB))
      await this.props.dispatch(getstatusbb(get_token(), noBB))
      this.setState({ isLoading: false })
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Barang Bukti</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">{this.props.match.params.id}</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
      const { bbData, bbStatus } = this.props;
      let dataTersangka = []
      let dataBB = []
      if (bbData.milik_tersangka_id) {
        dataTersangka = [
          {label: 'Nama', value: bbData.milik_tersangka_id.nama_tersangka},
          {label: 'Jenis Kelamin', value: bbData.milik_tersangka_id.jenis_kelamin},
          {label: 'Umur', value: bbData.milik_tersangka_id.umur},
          {label: 'Foto', value: bbData.milik_tersangka_id.foto},
        ];
        dataBB = [
          {label: 'Nama', value: bbData.nama_barang},
          {label: 'Jenis Barang', value: bbData.jenis_barang},
          {label: 'SP Sita', value: bbData.sp_sita},
          {label: 'Tap Status', value: bbData.tap_status},
        ];
      }
      let dataStatus = bbStatus;

        return (
          <SideMenu selected="4">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <DescriptionView
                    title="Data Barang Bukti"
                    hidePhoto
                    data={dataBB}
                  />
                  <DescriptionView
                    title="Data Tersangka"
                    data={dataTersangka}
                  />
                  <TableView
                    path="status barang bukti"
                    viewModal
                    isNotAllowTo={['edit','delete']}
                    tableField={tableField}
                    tableData={dataStatus}
                    isLoading={this.state.isLoading}
                  />
                 </div>
               </Content>
             </Layout>
          </SideMenu>
        )
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return { bbData: dashboard.bbData, bbStatus: dashboard.bbStatus }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(BarangBuktiView)
