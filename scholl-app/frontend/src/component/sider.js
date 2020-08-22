import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { collapsedSider } from '../reduxActions/dashboard';
import { FolderOpenOutlined, SolutionOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import history from '../route/history';
const { Header } = Layout;

class SideMenu extends Component {
    state = {
      isCollapsed: false,
    };

    onCollapse = collapsed => {
      this.props.dispatch(collapsedSider(collapsed))
      setTimeout(() => { this.setState({ isCollapsed: collapsed}) }, 200);
    };

    renderHeader = () => {
      const isAdmin = localStorage.getItem('role') === '2'
      return (
        <Header className="header">
         <Menu theme='dark' mode="horizontal" defaultSelectedKeys={this.props.selected || '1'}>
           <Menu.Item key="1" onClick={() => history.push("/dashboard/lkn")}>
             <FolderOpenOutlined />
             <span className="nav-text"><b>LKN</b></span>
           </Menu.Item>
           {isAdmin && (
             <Menu.Item key="2" onClick={() => history.push("/dashboard/penyidik")}>
                <TeamOutlined />
                <span className="nav-text"><b>ADMIN</b></span>
              </Menu.Item>
           )}
           <Menu.Item key="3" onClick={() => history.push("/dashboard/tersangka")}>
             <UserOutlined />
             <span className="nav-text"><b>TERSANGKA</b></span>
           </Menu.Item>
           <Menu.Item key="4" onClick={() => history.push("/dashboard/barangbukti")}>
             <SolutionOutlined />
             <span className="nav-text"><b>BARANG BUKTI</b></span>
           </Menu.Item>
           <Menu.Item key="5" onClick={() => history.push("/dashboard/lkn")}>
             <UserOutlined />
             <span className="nav-text"><b>STATISTIK</b></span>
           </Menu.Item>
           <Menu.Item key="6" onClick={() => history.push("/dashboard/approval")}>
             <SolutionOutlined />
             <span className="nav-text"><b>APPROVAL</b></span>
           </Menu.Item>
         </Menu>
        </Header>
      )
    }

    render() {
        return (
          <Layout>
            {this.renderHeader()}
            <Layout>
              {this.props.children}
            </Layout>
          </Layout>
        )
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return { isSiderCollapse: dashboard.isSiderCollapse }
}

export default connect(mapStateToProps)(SideMenu)
