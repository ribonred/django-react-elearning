import React, { Component } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import Profile from '../../../component/profile'
import { Link } from 'react-router-dom'
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
  }
]

class LKNTable extends Component {
    state = {
      isLoading: false,
    }
    async componentDidMount(){
      this.setState({ isLoading: true })
      await this.props.dispatch(get_lkn_by_penyidik(get_token()))
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

    renderAddButton = () => {
      return (
        <Button type="primary">
          <Link to='/dashboard/LKN/buat'>Buat LKN Baru</Link>
        </Button>
      )
    }

    async applyDateFilter (e) {
      this.setState({ isLoading: true })
      await this.props.dispatch(get_lkn_by_penyidik(get_token(), null, e))
      this.setState({ isLoading: false })
    }

    render() {
        return (
          <SideMenu>
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <Profile />
                  {this.renderAddButton()}
                  <TableView
                    path="lkn"
                    useId
                    isNotAllowTo={['delete']}
                    onDelete={(id) => this.props.dispatch()}
                    tableField={tableField}
                    tableData={this.props.lknTableData}
                    isLoading={this.state.isLoading}
                    applyDateFilter={(e) => { this.applyDateFilter(e); }}
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
