import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import FormStatusTersangka from '../../../component/form/tersangka/formStatusTersangka';
import SideMenu from '../../../component/sider';
const { Content } = Layout;

class EditTersangka extends Component {
    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Status Tersangka</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">{this.props.match.params.id}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Edit</a>
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
                  <FormStatusTersangka id={this.props.match.params.id} edit/>
                 </div>
               </Content>
             </Layout>
          </SideMenu>
        )
    }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default EditTersangka
