import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { get_token } from '../../../helper/requestHelper';
import { get_lkn_by_penyidik } from '../../../reduxActions/dashboard';
import TableView from '../../../component/table/tableFilterable'
import SideMenu from '../../../component/sider';

const { Content } = Layout;
const tableField = [
  {
    title: 'No.LKN',
    dataIndex: 'LKN',
    sorter: true,
    search: true,
  },
  {
    title: 'Nama Penyidik',
    dataIndex: 'penyidik',
    sorter: true,
    search: true,
  },
  {
    title: 'Dibuat Pada',
    dataIndex: 'tgl_dibuat',
    sorter: true,
    dropdown: ['Tanggal Baik', 'Tanggal Buruk'],
  }
]

class LKNTable extends Component {
    state = {
      isLoading: false,
    }
    async componentDidMount(){
      this.setState({ isLoading: true })
      await this.props.dispatch(get_lkn_by_penyidik(get_token()))
      console.log(this.props.lknTableData)
      this.setState({ isLoading: false })
    }
    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">LKN</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        return (
          <SideMenu>
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <TableView
                    path="LKN"
                    tableField={tableField}
                    tableData={this.props.lknTableData}
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
  return { lknTableData: dashboard.lknTableData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(LKNTable)
