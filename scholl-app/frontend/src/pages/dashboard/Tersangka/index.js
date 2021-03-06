import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import { get_token } from '../../../helper/requestHelper';
import { get_tersangka_list, deletetersangka } from '../../../reduxActions/dashboard';
import TableView from '../../../component/table/tableFilterable'

const { Content } = Layout;
const tableField = [
  {
    title: 'Nama Tersangka',
    dataIndex: 'nama_tersangka',
    sorter: true,
    search: true,
  },
  {
    title: 'SP KAP',
    dataIndex: 'no_penangkapan',
    sorter: true,
    search: true,
  },
]

class TersangkaTable extends Component {
    state = {
      isLoading: false,
    }
    async componentDidMount(){
      this.setState({ isLoading: true })
      await this.props.dispatch(get_tersangka_list(get_token()))
      this.setState({ isLoading: false })
    }

    async onDelete(id){
      await this.props.dispatch(deletetersangka(get_token(), id))
      this.setState({ isLoading: true })
      await this.props.dispatch(get_tersangka_list(get_token()))
      this.setState({ isLoading: false })
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Tersangka</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
      const { tersangkaTableData } = this.props;
      const dataTersangka = tersangkaTableData.map((data) => {
        return {
          ...data,
          no_penangkapan: data.no_penangkapan_id.no_penangkapan,
          "LKN": data.no_penangkapan_id.no_lkn.LKN,
        }
      })
        return (
          <SideMenu selected="3">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <TableView
                    useId="true"
                    path="tersangka"
                    tableField={tableField}
                    tableData={dataTersangka}
                    isLoading={this.state.isLoading}
                    onDelete={(id) => { this.onDelete(id); }}
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
  return { tersangkaTableData: dashboard.tersangkaTableData }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(TersangkaTable)
