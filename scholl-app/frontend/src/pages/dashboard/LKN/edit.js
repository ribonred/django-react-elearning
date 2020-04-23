import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, message, Skeleton } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import history from '../../../route/history';
import { editLKN } from '../../../reduxActions/dashboard';
import TableView from '../../../component/table/tableFilterable'
import { get_token } from '../../../helper/requestHelper';
import SideMenu from '../../../component/sider';
import LknFormView from '../../../component/lknform';
import { get_lkn_by_no_lkn, getpenangkapan } from '../../../reduxActions/dashboard';

const { Content } = Layout;

const tableField = [
  {
    title: 'No.LKN',
    dataIndex: 'no_lkn',
    sorter: true,
    search: true,
  },
  {
    title: 'No Penangkapan',
    dataIndex: 'no_penangkapan',
    sorter: true,
    search: true,
  },
  {
    title: 'Tanggal Penangkapan',
    dataIndex: 'tanggal_penangkapan',
    sorter: true,
    dropdown: ['Tanggal Baik', 'Tanggal Buruk'],
  }
]

class EditLkn extends Component {
      state = {
        form: {},
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
      await this.props.dispatch(editLKN(get_token(), this.state.form, this.props.lknData[0].id))
      if(!this.props.error){
        history.push('/dashboard/LKN')
      } else {
        this.openMessage()
      }
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
<<<<<<< HEAD
=======
        // console.log('data table', this.props.penangkapanData)
>>>>>>> d8fa828f6c384d0a2c96cdf144175a00c2145d54
        return (
          <SideMenu>
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  {isDataChange && this.renderLKNForm()}
                  {isDataChange && (
                    <Button style={{ fontWeight: 'bold', margin: '20px' }} type="primary" htmlType="submit">
                      <Link to="/dashboard/lkn/penangkapan/buat">Tambah Penangkapan</Link>
                    </Button>
                  )}
                  {isDataChange && (
                    <TableView
                      path="penangkapan"
                      tableField={tableField}
                      tableData={this.props.penangkapanData || []}
                      isLoading={this.state.isLoading}
                    />
                  )}
                  {!isDataChange && <Skeleton active />}
                 </div>
               </Content>
             </Layout>
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
