import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import DescriptionView from '../../../ui-container/description';
import { fetchalluser } from '../../../reduxActions/dashboard';
import { get_token } from '../../../helper/requestHelper';

const { Content } = Layout;

class PenyidikView extends Component {
    state = {
      isLoading: false,
    }
    async componentDidMount(){
      this.setState({ isLoading: true })
      let noUser = this.props.match.params.id;
      await this.props.dispatch(fetchalluser(get_token(), noUser))
      this.setState({ isLoading: false })
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Penyidik</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">{this.props.match.params.id}</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
      const { userData } = this.props;
      let dataPenyidik = []
      if (userData.id) {
        dataPenyidik = [
          {label: 'Username', value: userData.username},
          {label: 'Email', value: userData.email},
          {label: 'No. Telepon', value: userData.phone},
          {label: 'Nama Depan', value: userData.nama_depan},
          {label: 'Nama Belakang', value: userData.nama_belakang},
          {label: 'Jenis Kelamin', value: userData.jenis_kelamin},
          {label: 'Tanggal Lahir', value: userData.Tanggal_lahir},
          {label: 'Alamat', value: userData.address},
        ];
      }
      if(this.props.match.params.id!=='buat'){
        return (
          <SideMenu selected="2">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <DescriptionView
                    title="Data Penyidik"
                    data={dataPenyidik}
                  />
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
  console.log(dashboard.userData)
  return { userData: dashboard.userData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(PenyidikView)
