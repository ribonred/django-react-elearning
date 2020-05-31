import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import { get_token } from '../../../helper/requestHelper';
import { getstatusbbapprove, editstatusbbapprove } from '../../../reduxActions/dashboard';
import TableExpand from '../../../component/table/tableExpandable'

const { Content } = Layout;
const tableField1 = [
    {
      title: 'No.LKN',
      dataIndex: 'LKN',
      sorter: true,
      search: true,
    },
    {
      title: 'Nama Tersangka',
      dataIndex: 'tersangka',
      sorter: true,
      search: true,
    },
    {
      title: 'Nama BB',
      dataIndex: 'barang_bukti',
      sorter: true,
      search: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
      search: true,
    },
    {
      title: 'Approve Status',
      dataIndex: 'approve_status',
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
      await this.props.dispatch(getstatusbbapprove(get_token()))
      this.setState({ isLoading: false })
    }

    async onApprove(id){
      await this.props.dispatch(editstatusbbapprove(get_token(), {status_mod: 'APPROVE'}, id))
      this.setState({ isLoading: true })
      await this.props.dispatch(getstatusbbapprove(get_token()))
      this.setState({ isLoading: false })
    }

    async onReject(id){
      await this.props.dispatch(editstatusbbapprove(get_token(), {status_mod: 'REJECT'}, id))
      this.setState({ isLoading: true })
      await this.props.dispatch(getstatusbbapprove(get_token()))
      this.setState({ isLoading: false })
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Approval</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
      const { bbStatusApprove } = this.props;
      var isNotAllow = ['view','edit','delete'];
      var moderator = localStorage.getItem('moderator')
      if (moderator==='null'||null||''||undefined) {
        isNotAllow.push('approve')
        isNotAllow.push('reject')
      }
        return (
          <SideMenu selected="6">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <TableExpand
                    useId
                    path="status barangbukti approval"
                    isNotAllowTo={isNotAllow}
                    tableField={tableField1}
                    tableData={bbStatusApprove}
                    isLoading={this.state.isLoading}
                    onDelete={(id) => { this.onDelete(id); }}
                    onApprove={(id) => { this.onApprove(id); }}
                    onReject={(id) => { this.onReject(id); }}
                    isExpandable={true}
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
  return { bbStatusApprove: dashboard.bbStatusApprove }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(BarangBuktiTable)
