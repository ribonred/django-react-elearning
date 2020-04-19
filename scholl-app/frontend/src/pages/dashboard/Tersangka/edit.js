import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import StatusForm from '../../../component/statusform'
import { get_token } from '../../../helper/requestHelper';
import { get_tersangka_list } from '../../../reduxActions/dashboard';

const { Content } = Layout;

class EditTersangka extends Component {
    state = {
      isLoading: false,
    }

    async componentDidMount(){
      let tersangkaId = this.props.match.params.id;
      this.setState({ isLoading: true })
      await this.props.dispatch(get_tersangka_list(get_token(), tersangkaId))
      this.setState({ isLoading: false })
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Tersangka</a>
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
       const { tersangkaTableData } = this.props;

        return (
          <SideMenu selected="3">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <StatusForm
                    tableData={tersangkaTableData || []}
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
  console.log(dashboard.tersangkaTableData)
  return { tersangkaTableData: dashboard.tersangkaTableData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(EditTersangka)
