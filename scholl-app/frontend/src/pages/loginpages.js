import React from 'react';
import LoginView from '../component/login'
import axios from 'axios'
import { useHistory } from "react-router-dom";


class LoginPage extends React.Component {
    state = {
        username: '',
        password: ''
    }

    onloginformchange = (e) => {
        this.setState({
            username: e.target.value
        })
        console.log(e.target.value)
    }
    onpasswordformchange = (e) => {

        this.setState({
            password: e.target.value
        })
        console.log(e.target.value)
    }
    onsubmit = () => {
        let history = useHistory();
        axios.post('http://127.0.0.1:8000/get-token/token-auth/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(function (response) {
                localStorage.setItem('token', response.data.token)
                history.push('/dashboard')
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return <LoginView userform='test' onloginformchange={this.onloginformchange} onpasswordformchange={this.onpasswordformchange} onsubmit={this.onsubmit} />
    }
}

export default LoginPage