import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import DescriptionView from '../../../ui-container/description';
import { get_tersangka_list, get_proses } from '../../../reduxActions/dashboard';
import { get_token } from '../../../helper/requestHelper';
import TableView from '../../../component/table/tableFilterable'

const { Content } = Layout;
const tableFieldStatus = [
  {
    title: 'Status Penahanan',
    dataIndex: 'status_penahanan',
    sorter: true,
    search: true,
  },
  {
    title: 'Rekam Jejak',
    dataIndex: 'rekam_jejak',
    sorter: true,
    search: true,
  },
  {
    title: 'Keterangan',
    dataIndex: 'keterangan',
    sorter: true,
    search: true,
  },
  {
    title: 'Tanggal',
    dataIndex: 'tanggal',
    sorter: true,
    search: true,
  },
  {
    title: 'Waktu',
    dataIndex: 'waktu',
    sorter: true,
    search: true,
  }
]

const tableFieldProses = [
  {
    title: 'No Proses',
    dataIndex: 'no_proses',
    sorter: true,
    search: true,
  },
  {
    title: 'Jenis Proses',
    dataIndex: 'jenis_proses',
    sorter: true,
    search: true,
  },
  {
    title: 'Keterangan',
    dataIndex: 'keterangan',
    sorter: true,
    search: true,
  }
]

class TersangkaView extends Component {
    state = {
      isLoading: false,
      needChange:true
    }
    async componentDidMount(){
      this.setState({ isLoading: true })
      let noTsk= this.props.match.params.id;
      await this.props.dispatch(get_proses(get_token()))
      await this.props.dispatch(get_tersangka_list(get_token(), noTsk))
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
        </Breadcrumb>
      )
    }

    render() {
      const { tersangkaData, prosesIndex } = this.props;
      let dataTersangka = [];
      if (tersangkaData.id) {
        dataTersangka = [
          {label: 'Nama', value: tersangkaData.nama_tersangka},
          {label: 'Jenis Kelamin', value: tersangkaData.jenis_kelamin},
          {label: 'Umur', value: tersangkaData.umur},
          {label: 'Foto', value: tersangkaData.foto},
        ];
      }
      let dataStatus = tersangkaData.statustersangka
        let dataProses = tersangkaData.prosestersangka;
        if(prosesIndex.length > 0 && tersangkaData.id){
          dataProses = dataProses.map((data) => {
            return {
              ...data,
              jenis_proses: prosesIndex.find(item => item.id === data.jenis_proses).nama_proses
            }
          })
        }

        return (
          <SideMenu selected="3">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <DescriptionView
                    title="Data Tersangka"
                    data={dataTersangka}
                  />
                  <TableView
                    path="status tersangka"
                    isNotAllowTo={['view','edit','delete']}
                    tableField={tableFieldStatus}
                    tableData={dataStatus}
                    isLoading={this.state.isLoading}
                  />
                  <TableView
                    path="proses tersangka"
                    isNotAllowTo={['view','edit','delete']}
                    tableField={tableFieldProses}
                    tableData={dataProses}
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
  return { tersangkaData: dashboard.tersangkaData, prosesIndex: dashboard.prosesIndex }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(TersangkaView)
