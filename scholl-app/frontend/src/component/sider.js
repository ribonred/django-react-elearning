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

    renderHeaderLogo = () => {
      return(
        <Header style={{height: '80px', backgroundColor:'#1890ff'}} className="header">
          <div style={{marginTop:'10px', display:'flex',flexDirection:'row', alignItems:'center'}}>
            <img
              alt='BNN'
              src={require("../assets/bnn_bintang_fix_max.png")}
              style={{height:'60px', width:'60px'}}
            />
            <div style={{fontFamily: 'GlueGun', paddingLeft:'15px', fontSize:'35px'}}>e-SITATI BNNP KEPRI</div>
          </div>
        </Header>
      )
    }
    renderHeader = () => {
      const isAdmin = localStorage.getItem('role') === '2'
      return (
        <Header style={{backgroundColor:'#020E6F'}} className="header">
         <Menu theme='dark' style={{backgroundColor:'#020E6F'}} mode="horizontal" defaultSelectedKeys={this.props.selected || '1'}>
           <Menu.Item key="1" onClick={() => history.push("/dashboard/lkn")}>
            {this.props.selected === "1" || this.props.selected === undefined 
              ? (
                <React.Fragment>
                   <FolderOpenOutlined />
                   <span className="nav-text"><b>LKN</b></span>
                </React.Fragment>
              )  : (
                <React.Fragment>
                   <FolderOpenOutlined style={{color:'#F1C000'}} />
                   <span className="nav-text" style={{color:'#F1C000'}}><b>LKN</b></span>
                </React.Fragment>
              )}
           </Menu.Item>
           {isAdmin && (
             <Menu.Item key="2" onClick={() => history.push("/dashboard/penyidik")}>
                {this.props.selected === "2" 
                  ? (
                    <React.Fragment>
                      <TeamOutlined />
                      <span className="nav-text"><b>ADMIN</b></span>
                    </React.Fragment>
                  )  : (
                    <React.Fragment>
                      <TeamOutlined style={{color:'#F1C000'}} />
                      <span className="nav-text" style={{color:'#F1C000'}}><b>ADMIN</b></span>
                    </React.Fragment>
                  )}
              </Menu.Item>
           )}
           <Menu.Item key="3" onClick={() => history.push("/dashboard/tersangka")}>
            {this.props.selected === "3" 
              ? (
                <React.Fragment>
                   <UserOutlined />
                   <span className="nav-text"><b>TERSANGKA</b></span>
                </React.Fragment>
              )  : (
                <React.Fragment>
                   <UserOutlined style={{color:'#F1C000'}} />
                   <span className="nav-text" style={{color:'#F1C000'}}><b>TERSANGKA</b></span>
                </React.Fragment>
              )}
           </Menu.Item>
           <Menu.Item key="4" onClick={() => history.push("/dashboard/barangbukti")}>
             {this.props.selected === "4" 
              ? (
                <React.Fragment>
                   <SolutionOutlined />
                   <span className="nav-text"><b>BARANG BUKTI</b></span>
                </React.Fragment>
              )  : (
                <React.Fragment>
                   <SolutionOutlined style={{color:'#F1C000'}} />
                   <span className="nav-text" style={{color:'#F1C000'}}><b>BARANG BUKTI</b></span>
                </React.Fragment>
              )}
           </Menu.Item>
           <Menu.Item key="5" onClick={() => history.push("/dashboard/approval")}>
             {this.props.selected === "5" 
              ? (
                <React.Fragment>
                   <SolutionOutlined />
                   <span className="nav-text"><b>APPROVAL</b></span>
                </React.Fragment>
              )  : (
                <React.Fragment>
                   <SolutionOutlined style={{color:'#F1C000'}} />
                   <span className="nav-text" style={{color:'#F1C000'}}><b>APPROVAL</b></span>
                </React.Fragment>
              )}
           </Menu.Item>
         </Menu>
        </Header>
      )
    }

    render() {
        return (
          <Layout>
            {this.renderHeaderLogo()}
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
