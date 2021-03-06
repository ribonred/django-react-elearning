import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import { get_token } from '../../../helper/requestHelper';
import { get_bb_list, deletebb } from '../../../reduxActions/dashboard';
import TableView from '../../../component/table/tableFilterable'

const { Content } = Layout;
const tableField = [
  {
    title: 'Nama Barang Bukti',
    dataIndex: 'nama_barang',
    sorter: true,
    search: true,
  },
  {
    title: 'Jenis Barang Bukti',
    dataIndex: 'jenis_barang',
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
    title: 'SP KAP',
    dataIndex: 'no_penangkapan',
    sorter: true,
    search: true,
  },
]

class BarangBuktiTable extends Component {
    state = {
      isLoading: false,
    }

    async componentDidMount(){
      this.setState({ isLoading: true })
      await this.props.dispatch(get_bb_list(get_token()))
      this.setState({ isLoading: false })
    }

    async onDelete(id){
      await this.props.dispatch(deletebb(get_token(), id))
      this.setState({ isLoading: true })
      await this.props.dispatch(get_bb_list(get_token()))
      this.setState({ isLoading: false })
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Barang Bukti</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
      const { bbTableData } = this.props;
      const dataBB = bbTableData.map((data) => {
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
          <SideMenu selected="4">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <TableView
                    useId
                    title="BARANG BUKTI"
                    path="barangbukti"
                    tableField={tableField}
                    tableData={dataBB}
                    isLoading={this.state.isLoading}
                    onDelete={(id) => { this.onDelete(id); }}
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
  return { bbTableData: dashboard.bbTableData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(BarangBuktiTable)
