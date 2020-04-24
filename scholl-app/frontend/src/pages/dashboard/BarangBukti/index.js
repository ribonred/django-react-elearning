import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import { get_token } from '../../../helper/requestHelper';
import { get_bb_list } from '../../../reduxActions/dashboard';
import TableView from '../../../component/table/tableFilterable'

const { Content } = Layout;
const tableField = [
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

class BarangBuktiTable extends Component {
    state = {
      isLoading: false,
    }

    async componentDidMount(){
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
        return {
          ...data,
          no_penangkapan: data.milik_tersangka_id.no_penangkapan_id.no_penangkapan,
          LKN: data.milik_tersangka_id.no_penangkapan_id.no_lkn.LKN,
          nama_tersangka: data.milik_tersangka_id.nama_tersangka,
        }
      })
        return (
          <SideMenu selected="4">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <TableView
                    useId="true"
                    path="barangbukti"
                    tableField={tableField}
                    tableData={dataBB}
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
  // console.log(dashboard.bbTableData)
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
