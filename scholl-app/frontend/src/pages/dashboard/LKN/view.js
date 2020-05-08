import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import LknView from '../../../component/lknview';
import { get_lkn_detail, get_proses } from '../../../reduxActions/dashboard';
import { get_token } from '../../../helper/requestHelper';

const { Content } = Layout;


class LKNView extends Component {
    state = {
      lkn: {
        LKN: '',
        tanggal_dibuat: '',
        coba: '',
      },
      lknDataSend: {}
    }

    async componentDidMount(){
      if(this.props.match.params.id!=='buat'){
        let lknId = this.props.match.params.id;
        await this.props.dispatch(get_proses(get_token()))
        await this.props.dispatch(get_lkn_detail(get_token(), lknId))
        this.setState({lknDataSend: this.props.lknData})
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
      const { prosesIndex } = this.props;
      var lknDataSend = this.state.lknDataSend
      if(this.props.match.params.id!=='buat'){
        if (lknDataSend.penangkapan && lknDataSend.penangkapan.length > 0 ) {
          lknDataSend.penangkapan.map((pnkp) => {
            if(pnkp.penangkapan_tersangka && pnkp.penangkapan_tersangka.length > 0) {
              pnkp.penangkapan_tersangka.map((tsk) => {
                if(tsk.prosestersangka && tsk.prosestersangka.length > 0) {
                  tsk.prosestersangka.map((proses) => {
                    proses.jenis_proses = prosesIndex.find(item => item.id === proses.jenis_proses).nama_proses
                  })
                }
              })
            }
          })
        }
        return (
          <SideMenu>
            <Content style={{padding:'20px'}}>
              <div style={styles.siteLayout}>
                {this.renderBreadCrumb()}
                <LknView lkn={lknDataSend}/>
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
  return { lknData: dashboard.lknData, prosesIndex: dashboard.prosesIndex, }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(LKNView)
