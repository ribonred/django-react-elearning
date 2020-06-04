import React, { Component } from 'react';
import { Layout, Breadcrumb, message } from 'antd';
import { connect } from 'react-redux';
import history from '../../../route/history';
import { createLKN } from '../../../reduxActions/dashboard';
import SideMenu from '../../../component/sider';
import LknFormView from '../../../component/lknform';
const { Content } = Layout;
const key = 'error';

class CreateLKN extends Component {
      state = {
        form: {},
        lknId: '',
        isLoading: false
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

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">LKN</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">buat</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    openMessage = () => {
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.error({ content: 'Lengkapi Required Field dan No LKN Harus Unik', key, duration: 4 });
      }, 1000);
    };

    render() {
        return (
          <SideMenu>
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <LknFormView isLoading={this.state.isLoading} onFormChange={this.onFormChange} defaultValue={this.state.form} onsubmit={this.onsubmit}></LknFormView>
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
    error: dashboard.error,
    lknCreated: dashboard.lknCreated,
  }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(CreateLKN)
