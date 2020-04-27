import React from 'react';
import AuthContainerNew from '../ui-container/authContainerNew';
import { message } from 'antd';
import { request } from '../helper/requestHelper'
import history from '../route/history';

const key = 'error';

class LoginPage extends React.Component {
    state = {
        form: {},
    }

    onFormChange = (fieldName, e) => {
        const formObj = {...this.state.form};
        formObj[fieldName] = e.target.value
        this.setState({
           form: formObj,
        })
    }

    openMessage = (text) => {
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.error({ content: text, key, duration: 4 });
      }, 1000);
    };

    onsubmit = async() => {
      if(this.state.form.username === undefined){
        this.openMessage('maaf username harus diisi')
        return
      }
      if(this.state.form.password === undefined){
        this.openMessage('maaf password harus diisi')
        return
      }

      try {
        const result = await request('/get-token/token-auth/', {
          method: 'POST',
         }, this.state.form);
         localStorage.setItem('user', result.data.user.username)
         localStorage.setItem('token', result.data.token)
         history.push('/dashboard')
      } catch(e){
        this.openMessage('maaf username dan email tidak match')
      }
    }

    render() {
        return <AuthContainerNew onFormChange={this.onFormChange} onsubmit={this.onsubmit}/>
    }
}

export default LoginPage
