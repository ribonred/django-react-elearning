import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import { get_token } from '../../../helper/requestHelper';
import { get_tersangka_list } from '../../../reduxActions/dashboard';
import TableView from '../../../component/table/tableFilterable'

const { Content } = Layout;

class BarangBuktiTable extends Component {
    state = {
      data: '',
    }

    async componentDidMount(){
      // await this.props.dispatch(get_penangkapan(get_token()))
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Barang Bukti</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        return (
          <SideMenu selected="4">
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
  return { penangkapanData: dashboard.penangkapanData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(BarangBuktiTable)
