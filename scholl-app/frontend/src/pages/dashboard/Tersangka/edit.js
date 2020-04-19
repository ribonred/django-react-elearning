import React, { Component } from 'react';
import { Layout, Breadcrumb, message, Skeleton } from 'antd';
import { connect } from 'react-redux';
import history from '../../../route/history';
import SideMenu from '../../../component/sider';
import TersangkaForm from '../../../component/tersangkaform'
import { get_token } from '../../../helper/requestHelper';
import { get_tersangka_list } from '../../../reduxActions/dashboard';

const { Content } = Layout;

class EditTersangka extends Component {
    state = {
      isLoading: false,
      render: '',
      form: {},
      isDataChange: false,
    }

    async componentDidMount(){
      let tersangkaId = this.props.match.params.id;
      // this.setState({ isLoading: true })
      await this.props.dispatch(get_tersangka_list(get_token(), tersangkaId))
      // this.setState({ isLoading: false })
      this.setState({ render: 'selesai' })
    }

    componentDidUpdate(prevProps){
      if(this.props.lknData !== prevProps.lknData){
        this.getDefaultForm()
      }
    }

    getDefaultForm = () => {
        this.setState({form: this.props.lknData[0]}, () => this.setState({ isDataChange: true}))
    }

    onFormChange = (fieldName, e) => {
      const formObj = {...this.state.form};
      if(!e.target){
          formObj[fieldName] = e
          this.setState({
              form: formObj,
          })
      } else {
          formObj[fieldName] = e.target.value
          this.setState({
              form: formObj,
          })
      }
    }

    onsubmit = async() => {
      this.setState({ isLoading: true })
      await this.props.dispatch(createLKN(localStorage.getItem('token'), this.state.form))
      if(!this.props.error){
        history.push('/dashboard/LKN')
      } else {
        this.openMessage()
      }
      this.setState({ isLoading: false })
    }

    renderTersangkaForm = () => {
      const { form, isLoading } = this.state;
      return (
        <LknFormView defaultValue={form} isLoading={isLoading} onFormChange={this.onFormChange} onsubmit={this.onsubmit}></LknFormView>
      )
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
        let dataShow = []
        let dataTersangka = []
        if(this.state.render === 'selesai'){
          dataShow = [
            {
              label: 'No. LKN',
              value: tersangkaTableData.no_penangkapan_id.no_lkn.LKN
            },
            {
              label: 'Tanggal LKN Dibuat',
              value: tersangkaTableData.no_penangkapan_id.no_lkn.tgl_dibuat
            },
            {
              label: 'No. Penangkapan',
              value: tersangkaTableData.no_penangkapan_id.no_penangkapan
            },
            {
              label: 'Tanggal Penangkapan',
              value: tersangkaTableData.no_penangkapan_id.tgl_penangkapan
            },
            {
              label: 'Jam Penangkapan',
              value: tersangkaTableData.no_penangkapan_id.jam_penangkapan
            }
          ]
          
          dataTersangka = [
            {
              label: 'nama',
              value: tersangkaTableData.nama_tersangka
            },
            {
              label: 'umur',
              value: tersangkaTableData.umur
            },
            {
              label: 'jenis_kelamin',
              value: tersangkaTableData.jenis_kelamin
            },
            {
              label: 'foto',
              value: tersangkaTableData.foto
            }
          ]
        }
        const { isDataChange } = this.state;
        return (
          <SideMenu selected="3">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <TersangkaForm
                    dataShow={dataShow}
                    dataTersangka={dataTersangka}
                    tersangkaTableData={tersangkaTableData}
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

export default connect(mapStateToProps)(EditTersangka)
