import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import history from '../../../route/history';
import FormPenyidik from '../../../component/form/penyidik/penyidik';
import SideMenu from '../../../component/sider';

const { Content } = Layout;

class CreatePenyidik extends Component {
    componentWillMount(){
      const isAdmin = localStorage.getItem('role') === '2'
      if(!isAdmin){
        history.push('/dashboard')
      }
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Penyidik</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">buat</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        return (
          <SideMenu selected="2">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <FormPenyidik type='create'/>
                 </div>
               </Content>
             </Layout>
          </SideMenu>
        )
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return { route: dashboard.route }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(CreatePenyidik)
