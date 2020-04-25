import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import FormPenangkapan from '../../../component/form/penangkapan/penangkapan'
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
const { Content } = Layout;

class CreatePenangkapan extends Component {
    state = {
      form: {},
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

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">LKN</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">Penangkapan</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/#">buat</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        return (
          <SideMenu selected="1">
            <Content style={{padding:'20px'}}>
              <div style={styles.siteLayout}>
                {this.renderBreadCrumb()}
                <FormPenangkapan noLkn={this.props.match.params.id}/>
               </div>
             </Content>
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

export default connect(mapStateToProps)(CreatePenangkapan)
