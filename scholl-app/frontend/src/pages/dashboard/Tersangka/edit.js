import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';

const { Content } = Layout;

class EditTersangka extends Component {
    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>Tersangka</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>{this.props.match.params.id}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>Edit</a>
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

export default connect(mapStateToProps)(EditTersangka)
