import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import { get_token } from '../../../helper/requestHelper';
import { get_tersangka_list } from '../../../reduxActions/dashboard';
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
    title: 'Nama',
    dataIndex: 'nama_tersangka',
    sorter: true,
    search: true,
  }
]

class TersangkaTable extends Component {
    state = {
      isLoading: false,
      dataTable: []
    }
    async componentDidMount(){
      this.setState({ isLoading: true })
      await this.props.dispatch(get_tersangka_list(get_token()))
      var data = []
      this.props.tersangkaTableData.forEach(tersangka => {
        let dataTersangka = {
          LKN: tersangka.no_penangkapan_id.no_lkn.LKN,
          no_penangkapan: tersangka.no_penangkapan_id.no_penangkapan,
          nama_tersangka: tersangka.nama_tersangka
        }
        data.push(dataTersangka);
      });
      this.setState({ dataTable: data })
      this.setState({ isLoading: false })
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Tersangka</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        return (
          <SideMenu selected="3">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <TableView
                    path="tersangka"
                    tableField={tableField}
                    tableData={this.state.dataTable}
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
  return { tersangkaTableData: dashboard.tersangkaTableData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(TersangkaTable)
