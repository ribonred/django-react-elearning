import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import history from '../../../route/history';
import { editLKN } from '../../../reduxActions/dashboard';
import TableView from '../../../component/table/tableFilterable'
import { get_token } from '../../../helper/requestHelper';
import SideMenu from '../../../component/sider';
import LknFormView from '../../../component/lknform';
import { get_lkn_by_no_lkn, getpenangkapan, deletepenangkapan } from '../../../reduxActions/dashboard';

const { Content } = Layout;

const tableField = [
  {
    title: 'SP KAP',
    dataIndex: 'no_penangkapan',
    sorter: true,
    search: true,
  },
  {
    title: 'TANGGAL PENANGKAPAN',
    dataIndex: 'tanggal_penangkapan',
    sorter: true,
  },
  {
    title: 'MASA BERAKHIR PENANGKAPAN',
    dataIndex: 'masa_berakhir_penangkapan',
    sorter: true,
  }
]

class EditLkn extends Component {
      state = {
        form: {
          'LKN': 'Ok'
        },
        isDataChange: false,
        isLoading: false
      }

      async componentDidMount(){
        let noLkn = this.props.match.params.id;
        await this.props.dispatch(get_lkn_by_no_lkn(get_token(), noLkn))
        await this.props.dispatch(getpenangkapan(get_token(), null, noLkn))
      }

      componentDidUpdate(prevProps){
        if(this.props.lknData !== prevProps.lknData){
          this.getDefaultForm()
        }
      }

      getDefaultForm = () => {
         this.setState({form: this.props.lknData}, () => this.setState({ isDataChange: true}))
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
      await this.props.dispatch(editLKN(get_token(), this.state.form, this.props.lknData.id))
      if(!this.props.error){
        history.push('/dashboard/LKN')
      } else {
        this.openMessage()
      }
      this.setState({ isLoading: false })
    }

    async onDelete(id){
      await this.props.dispatch(deletepenangkapan(get_token(), id))
      this.setState({ isLoading: true })
      let noLkn = this.props.match.params.id;
      await this.props.dispatch(getpenangkapan(get_token(), null, noLkn))
      this.setState({ isLoading: false })
    }

    renderLKNForm = () => {
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
            <Breadcrumb.Item>
              <a href="/#">LKN</a>
            </Breadcrumb.Item>
              <a href="/#">{this.props.match.params.id}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Edit</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        const { isDataChange } = this.state;
        return (
          <SideMenu>
            <Content style={{padding:'20px'}}>
              <div style={styles.siteLayout}>
                {this.renderBreadCrumb()}
                {isDataChange && this.renderLKNForm()}
                {isDataChange && (
                  <Button style={{ fontWeight: 'bold', margin: '20px' }} type="primary" htmlType="submit">
                    <Link to={`/dashboard/lkn/${this.props.match.params.id}/penangkapan/buat`}>Tambah Penangkapan</Link>
                  </Button>
                )}
                {isDataChange && (
                  <TableView
                    path="penangkapan"
                    useId
                    isNotAllowTo={['view']}
                    tableField={tableField}
                    tableData={this.props.penangkapanData || []}
                    isLoading={this.state.isLoading}
                    onDelete={(id) => { this.onDelete(id); }}
                  />
                )}
                {!isDataChange && <Skeleton active />}
               </div>
             </Content>
          </SideMenu>
        )
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    penangkapanData: dashboard.penangkapanData,
    lknData: dashboard.lknData,
  }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(EditLkn)
