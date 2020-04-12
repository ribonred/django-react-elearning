import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import { request } from '../../../helper/requestHelper';
import LknFormView from '../../../component/lknform';
const { Content } = Layout;

class CreateLKN extends Component {
      state = {
        form: {},
        lknId: ''
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
      console.log(this.state.form)
      const result = await request('/api/lkn/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
       }, this.state.form);
       if(result){
        localStorage.setItem('lknId', result.data.id)
         console.log('result',result)
       }       
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>LKN</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>buat</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        return (
          <SideMenu>
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <LknFormView onFormChange={this.onFormChange} onsubmit={this.onsubmit}></LknFormView>
                 </div>
               </Content>
             </Layout>
          </SideMenu>
        )
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return { route: dashboard.route }
}

const styles = {
  siteLayout:{
    background: "#fff",
    padding: 24,
    height: 1000
  },
}

export default connect(mapStateToProps)(CreateLKN)
