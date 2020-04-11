import React from 'react';
import LoginView from '../component/login'
import { request } from '../helper/requestHelper'
import networkIssueModal from '../component/networkError'
import history from '../route/history';

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

    onsubmit = async() => {
      try {
        const result = await request('/get-token/token-auth/', {
          method: 'POST',
         }, this.state.form);
         localStorage.setItem('token', result.data.token)
         history.push('/dashboard')
      } catch(e){
        networkIssueModal()
      }
    }
    render() {
        return <LoginView userform='test' onFormChange={this.onFormChange} onsubmit={this.onsubmit}/>
    }
}

export default LoginPage
