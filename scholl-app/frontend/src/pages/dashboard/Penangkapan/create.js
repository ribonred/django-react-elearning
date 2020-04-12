import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../../component/sider';
import PenangkapanFormView from '../../../component/penangkapanform';
import { request } from '../../../helper/requestHelper';

const { Content } = Layout;

class CreatePenangkapan extends Component {
    state = {
      form: {},
      formTersangka: {
        BB: []
      },
      isSaved: false,
      isAddTersangka: false,    
      isAddBB: false,
      allTersangka: []    
    }

    componentDidMount(){
      this.state.form.no_lkn=localStorage.getItem('lknId');
      if(localStorage.getItem('penangkapanId')){
        this.setState({
          isSaved: true,
      })
      
      // let tersangkaId = localStorage.getItem('tersangkaId');
      // if(Array.isArray(tersangkaId) && tersangkaId.length){
      //   this.setState({
      //     tersangka: tersangkaId,
      // })
      // }
      }
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
      let penangkapanId = localStorage.getItem('penangkapanId');
      console.log(this.state.form)
      if(!penangkapanId){
        const result = await request('/api/pnkp/', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }, this.state.form);
        if(result){
          console.log('POST')
          this.setState({isSaved:true})
          console.log(result)
          localStorage.setItem('penangkapanId', result.data.id)
        }
      } else {
        const result = await request(`/api/pnkp/${penangkapanId}`, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }, this.state.form);
        if(result){
          console.log('PUT')
          console.log(result)
          this.setState({isSaved:true})
        }
      }
             
    }

    onFormTersangkaChange = (fieldName, e) => {
      console.log(fieldName, e)
      const formObj = {...this.state.formTersangka};
      formObj.no_penangkapan = localStorage.getItem('penangkapanId')
        if(!e.target){
          formObj[fieldName] = e
          this.setState({
            formTersangka: formObj,
          })
        } else {
          formObj[fieldName] = e.target.value
          this.setState({
            formTersangka: formObj,
          })
        }  
    }

    onFormBBChange = (fieldName, e) => {
      console.log(fieldName, e)
      const formObj = {...this.state.formTersangka};
      let obj = {}
        if(!e.target){
          formObj.BB[0].fieldName = e
          this.setState({
            formTersangka: formObj,
          })
        } else {
          formObj.BB[0].fieldName = e.target.value
          this.setState({
            formTersangka: formObj,
          })
        }  
    }

    onsubmitTersangka = async() => {
      console.log(this.state.formTersangka)
      return
      const result = await request('/api/pnkp/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }, this.state.form);
      if(result){
        this.setState({isSaved:true})
        localStorage.setItem('penangkapanId', result.data.id)
      }       
    }

    onClickTambahBB = () => {
      this.setState({isAddBB:true})
      let newBB = new Array();
      this.state.formTersangka.BB.push(newBB);
      console.log(this.state.formTersangka.BB)
    }

    onClickTambahTersangka = () => {
      this.setState({isAddTersangka:true})
      let newTersangka = new Array();
      this.state.allTersangka.push(newTersangka);
      console.log(this.state.formTersangka.BB)
    }

    renderBreadCrumb = () => {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>LKN</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>Penangkapan</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>buat</a>
            </Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    render() {
        return (
          <SideMenu selected="1">
            <Layout>
              <Content style={{padding:'20px'}}>
                <div style={styles.siteLayout}>
                  {this.renderBreadCrumb()}
                  <PenangkapanFormView isAddBB={this.state.isAddBB} isAddTersangka={this.state.isAddTersangka} isSaved={this.state.isSaved} onFormChange={this.onFormChange} onFormTersangkaChange={this.onFormTersangkaChange} onFormBBChange={this.onFormBBChange} onsubmit={this.onsubmit} onsubmitTersangka={this.onsubmitTersangka} onClickTambahBB={this.onClickTambahBB} onClickTambahTersangka={this.onClickTambahTersangka}></PenangkapanFormView>
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

export default connect(mapStateToProps)(CreatePenangkapan)
