import React, { Component } from 'react';
import { Layout, Menu, Skeleton } from 'antd';
import { FolderOpenOutlined, SolutionOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import history from '../route/history';
const { Sider, Content } = Layout;

export default class SideMenu extends Component {
    state = {
      collapsed: false,
      isCollapsed: false,
    };

    onCollapse = collapsed => {
      this.setState({ collapsed });
      setTimeout(() => { this.setState({ isCollapsed: collapsed}) }, 200);
    };

    renderSkeleton = () => {
      return (
        <Content style={{padding:'20px'}}>
          <Skeleton active/>
          <Skeleton active/>
          <Skeleton active/>
          <Skeleton active/>
        </Content>
      )
    }

    renderSideMenu = () => {
      return (
        <Sider style={styles.linearGradientBackground} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
         <Menu style={styles.linearGradientBackground} mode="inline" defaultSelectedKeys={this.props.selected || '1'}>
           <Menu.Item key="1" onClick={() => history.push("/dashboard/lkn")}>
             <FolderOpenOutlined />
             <span className="nav-text">LKN</span>
           </Menu.Item>
           <Menu.Item key="2" onClick={() => history.push("/dashboard/penyidik")}>
             <TeamOutlined />
             <span className="nav-text">Penyidik</span>
           </Menu.Item>
           <Menu.Item key="3" onClick={() => history.push("/dashboard/tersangka")}>
             <UserOutlined />
             <span className="nav-text">Tersangka</span>
           </Menu.Item>
           <Menu.Item key="4" onClick={() => history.push("/dashboard/barangbukti")}>
             <SolutionOutlined />
             <span className="nav-text">Barang Bukti</span>
           </Menu.Item>
           <Menu.Item key="5" onClick={() => history.push("/dashboard/lkn")}>
             <UserOutlined />
             <span className="nav-text">Statistik</span>
           </Menu.Item>
         </Menu>
       </Sider>
      )
    }

    render() {
        const siderCollapseSize = this.state.isCollapsed ? '80px' : '200px'
        return (
          <Layout>
            {this.renderSideMenu()}
            <Layout style={{overflow: 'visible', marginLeft: this.state.collapsed ? siderCollapseSize :'200px'}}>
              {this.props.children}
            </Layout>
          </Layout>
        )
    }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
  linearGradientBackground: {
    backgroundImage: 'linear-gradient(#4F6575, #0CA2E7)',
    overflow: 'auto',
    height: '100vh',
    maxWidth: '200px',
    position: 'fixed',
    left: 0,
  }
}
