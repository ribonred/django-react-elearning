import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { get_token } from '../../../helper/requestHelper';
import SideMenu from '../../../component/sider';
import { get_lkn_by_no_lkn, getpenangkapan } from '../../../reduxActions/dashboard';

const { Content } = Layout;

class EditLkn extends Component {
    async componentDidMount(){
      let noLkn = this.props.match.params.id;
      await this.props.dispatch(get_lkn_by_no_lkn(get_token(), noLkn))
      await this.props.dispatch(getpenangkapan(get_token(), null, noLkn))
    }
    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">LKN</a>
            </Breadcrumb.Item>
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
          <SideMenu>
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
  return {
    penangkapanData: dashboard.penangkapanData,
    lknData: dashboard.lknData,
  }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(EditLkn)
