import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, message, Skeleton, Space, Spin } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import history from '../../../route/history';
import SideMenu from '../../../component/sider';
import { get_token } from '../../../helper/requestHelper';
import { get_tersangka_list ,edit_tersangka } from '../../../reduxActions/dashboard';
import PageContainer from '../../../ui-container/pageContainer';
import FormGroup from '../../../ui-container/formGroup';


const { Content } = Layout;
const options1 = [
  {
    field: 'Di Tahan',
    value: 'Di tahan',
  },
  {
    field: 'Di Amankan',
    value: 'Di Amankan',
  }
]
const options2 = [
  {
    field: 'Keluar',
    value: 'Keluar',
  },
  {
    field: 'Masuk',
    value: 'Masuk',
  }
]
const formData = [
  {label: 'Status Penahanan', name: 'status_penahanan', fieldName: 'status_penahanan', options: options1, type: 'options'},
  {label: 'Rekam Jejak', name: 'rekam_jejak', fieldName: 'rekam_jejak', options: options2, type: 'options'},
  {label: 'Tanggal', name: 'tanggal', fieldName: 'tanggal', type: 'date'},
  {label: 'Waktu', name: 'waktu', fieldName: 'waktu', type: 'time'},
  {label: 'Keterangan', name: 'keterangan', fieldName: 'keterangan', type: 'textArea'},
]

  class StatusTersangka extends Component {
    state = {
        isLoading: false,
        form: {},
        isDataChange: false,
        formStatus: {}
    }

    async componentDidMount(){
      let tersangkaId = this.props.match.params.id;
      await this.props.dispatch(get_tersangka_list(get_token(), tersangkaId))
    }

    onFormChange = (fieldName, e) => {
        const formObj = {...this.state.formStatus};
        if(!e.target){
            formObj[fieldName] = e
            this.setState({
              formStatus: formObj,
            })
        } else {
            formObj[fieldName] = e.target.value
            this.setState({
              formStatus: formObj,
            })
        }
      }
  
      onsubmit = async() => {
        let formStat = this.state.formStatus
        let formToSend = this.props.tersangkaTableData;
        // formStatus['tersangka_id'] = this.props.match.params.id;
        formStat['tersangka_id'] = this.props.match.params.id
        this.setState({
          formStatus: formStat
        })
        formToSend.statustersangka.push(this.state.formStatus);
        this.setState({ isLoading: true })
        console.log(formToSend)
        await this.props.dispatch(edit_tersangka(formToSend, get_token(), this.props.match.params.id))
        if(!this.props.error){
          history.push(`/dashboard/tersangka/${this.props.match.params.id}/edit/`)
        } else {
          this.openMessage()
        }
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
              <Breadcrumb.Item>
                <a href="/#">Status</a>
              </Breadcrumb.Item>
          </Breadcrumb>
        )
      }

    render() {
        const { isDataChange } = this.state;
        // this.setState({
        //   form: this.props.tersangkaTableData
        // })
        return (
          <SideMenu selected="3">
            <Layout>
            <Content style={{padding:'20px'}}>
            <div style={styles.siteLayout}>
            <PageContainer header='FORM STATUS TERSANGKA'>
                <div align="right" style={{ margin: '20px' }}>
                    <Space>
                    {this.props.isLoading && <Spin size="medium" />}
                    <Button style={{ fontWeight: 'bold', backgroundColor: 'green', borderColor: 'green' }} type="primary" htmlType="submit" onClick={() => { this.onsubmit() }}>Simpan</Button>
                    <Button style={{ fontWeight: 'bold' }} type="danger" htmlType="submit">
                        <Link to={`/dashboard/tersangka/${this.props.match.params.id}`}>Kembali</Link>
                    </Button>
                    </Space>
                </div>
                
                <FormGroup
                    formData={formData}
                    defaultValue={this.props.penangkapanData || []}
                    onFormChange={this.onFormChange}
                >
                </FormGroup>
            </PageContainer>
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
  
  export default connect(mapStateToProps)(StatusTersangka)