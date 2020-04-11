import React from 'react';
import LknFormView from '../component/lknform'
import { request } from '../helper/requestHelper'

class LkmFormPage extends React.Component {
    state = {
        form: {

        },
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
        let token = localStorage.getItem("token")
        console.log(token)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${{token}}`
        }
        const result = await request('/api/users/', {
            method: 'GET',
            headers: headers,
           });
        if(result){
            console.log(result)
            // localStorage.setItem('token', result.data.token)
        }       
    }
    render() {
        return <LknFormView userform='test' onFormChange={this.onFormChange} onsubmit={this.onsubmit} />
    }
}

export default LkmFormPage
