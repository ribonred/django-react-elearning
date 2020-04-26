import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import LknView from '../../../component/lknview';
import { get_lkn_detail } from '../../../reduxActions/dashboard';
import { get_token } from '../../../helper/requestHelper';

const { Content } = Layout;


class LKNView extends Component {
    state = {
      lkn: {
        LKN: '',
        tanggal_dibuat: '',
        coba: '',
      },
    }

    async componentDidMount(){
      if(this.props.match.params.id!=='buat'){
        let lknId = this.props.match.params.id;
        await this.props.dispatch(get_lkn_detail(get_token(), lknId))
      }
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">LKN</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">{this.props.match.params.id}</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
      if(this.props.match.params.id!=='buat'){
        return (
          <SideMenu>
            <Content style={{padding:'20px'}}>
              <div style={styles.siteLayout}>
                {this.renderBreadCrumb()}
                <LknView lkn={this.props.lknData}/>
               </div>
             </Content>
          </SideMenu>
        )
      }
      return <div/>
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return { lknData: dashboard.lknData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(LKNView)
