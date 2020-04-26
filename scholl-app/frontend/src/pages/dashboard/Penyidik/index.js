import React, { Component } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import { get_token } from '../../../helper/requestHelper';
import { connect } from 'react-redux';
import TableView from '../../../component/table/tableFilterable';
import { fetchalluser } from '../../../reduxActions/dashboard';
import SideMenu from '../../../component/sider';

const { Content } = Layout;
const tableField = [
  {
    title: 'Username',
    dataIndex: 'username',
    sorter: true,
    search: true,
  },
  {
    title: 'Nama Penyidik',
    dataIndex: 'nama',
    sorter: true,
    search: true,
  },
]

class PenyidikTable extends Component {
    state = {
      isLoading: false,
    }

    async componentDidMount(){
      this.setState({ isLoading: true })
      await this.props.dispatch(fetchalluser(get_token()))
      this.setState({ isLoading: false })
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Penyidik</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    renderAddButton = () => {
      return (
        <Button type="primary">
          <Link to='/dashboard/penyidik/buat'>Buat Penyidik Baru</Link>
        </Button>
      )
    }

    capitalizeFirstLetter = (letter) => {
      return letter.charAt(0).toUpperCase() + letter.slice(1);
    }
    render() {
      let userData = []
      if(this.props.userTableData !== undefined){
        userData = this.props.userTableData.map((data)=> {
          const { nama_depan, nama_belakang } = data
          const nama = data.nama_depan == null ? 'no name' : this.capitalizeFirstLetter(nama_depan)+' '+this.capitalizeFirstLetter(nama_belakang)
          return {
            ...data,
            nama: nama
          }
        })
      }
        return (
          <SideMenu selected="2">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  {this.renderAddButton()}
                  <TableView
                    useId="true"
                    path="Penyidik"
                    tableField={tableField}
                    tableData={userData}
                    isLoading={this.state.isLoading}
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
  return { userTableData: dashboard.userTableData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(PenyidikTable)
