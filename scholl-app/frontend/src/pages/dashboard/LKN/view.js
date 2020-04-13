import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import LknView from '../../../component/lknview';
import { get_lkn_by_no_lkn } from '../../../reduxActions/dashboard';
import { get_token } from '../../../helper/requestHelper';

const { Content } = Layout;


class LKNView extends Component {
    state = {
      lkn: {
        LKN: '',
        tanggal_dibuat: ''
      },
    }

    async componentDidMount(){
      await this.props.dispatch(get_lkn_by_no_lkn(get_token(), 1))
      if(!this.props.error){
        this.setState({
          lkn: {
            noLkn: this.props.lknData.LKN,
            tglDibuat: this.props.lknData.tanggal_dibuat
          }
        })
      } else {
        this.openMessage()
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
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <LknView lkn={this.props.lknData}/>
                 </div>
               </Content>
             </Layout>
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
