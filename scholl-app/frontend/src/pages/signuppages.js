import React from 'react';
import SignupView from '../component/signup'
import axios from 'axios'
// import { useHistory } from "react-router-dom";
// import { Route } from "react-router-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";


class SignupPage extends React.Component {
    state = {
        username: '',
        password: '',
        email:'',
        nama_depan:'',
        nama_belakang:'',
        tanggal_lahir:'',
        jenis_kelamin:'laki-laki',
        phone:'',
        address:'',
        role:3
    }

    onusernameformchange = (e) => {
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
    onemailformchange = (e) => {
        this.setState({
            email: e.target.value
        })
        console.log(e.target.value)
    }
    onphoneformchange = (e) => {
        this.setState({
            phone: e.target.value
        })
        console.log(e.target.value)
    }
    onaddressformchange = (e) => {
        this.setState({
            address: e.target.value
        })
        console.log(e.target.value)
    }
    onnamadepanformchange = (e) => {
        this.setState({
            nama_depan: e.target.value
        })
        console.log(e.target.value)
    }
    onnamabelakangformchange = (e) => {

        this.setState({
            nama_belakang: e.target.value
        })
        console.log(e.target.value)
    }
    ontanggallahirformchange = (date, dateString) => {
        this.setState({
            tanggal_lahir: dateString
        })
        console.log(dateString)
    }
    onjeniskelaminformchange = (e) => {
        this.setState({
            jenis_kelamin: e
        })
        console.log(e)
    }
    onsubmit = () => {
        // let history = useHistory();
        // console.log(history);
        axios.post('http://127.0.0.1:8000/api/users/', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            nama_depan: this.state.nama_depan,
            nama_belakang: this.state.nama_belakang,
            tanggal_lahir: this.state.tanggal_lahir,
            jenis_kelamin: this.state.jenis_kelamin,
            address: this.state.address,
            phone: this.state.phone,
            role: this.state.role
        })
            .then(function (response) {
                console.log(response);

                // localStorage.setItem('token', response.data.token)
                // history.push('/dashboard')
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return <SignupView userform='test' onusernameformchange={this.onusernameformchange} onpasswordformchange={this.onpasswordformchange} onemailformchange={this.onemailformchange} 
        onnamadepanformchange={this.onnamadepanformchange} onnamabelakangformchange={this.onnamabelakangformchange} ontanggallahirformchange={this.ontanggallahirformchange} 
        onjeniskelaminformchange={this.onjeniskelaminformchange} onaddressformchange={this.onaddressformchange} onphoneformchange={this.onphoneformchange} onsubmit={this.onsubmit} />
    }
}

export default SignupPage