import React from 'react';
import LoginView from '../component/login'
import { request } from '../helper/requestHelper'
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
      const result = await request('/get-token/token-auth/', {
        method: 'POST',
       }, this.state.form);
       if(result){
        localStorage.setItem('token', result.data.token)
        history.push('/dashboard')
       }       
    }
    render() {
        return <LoginView userform='test' onFormChange={this.onFormChange} onsubmit={this.onsubmit}/>
    }
}

export default LoginPage
