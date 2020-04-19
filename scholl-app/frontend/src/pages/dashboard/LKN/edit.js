import React, { Component } from 'react';
import { Layout, Breadcrumb, message, Skeleton } from 'antd';
import { connect } from 'react-redux';
import history from '../../../route/history';
import { createLKN } from '../../../reduxActions/dashboard';
import { get_token } from '../../../helper/requestHelper';
import SideMenu from '../../../component/sider';
import LknFormView from '../../../component/lknform';
import { get_lkn_by_no_lkn, getpenangkapan } from '../../../reduxActions/dashboard';

const { Content } = Layout;

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
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  {isDataChange && this.renderLKNForm()}
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
