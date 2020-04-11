import React from 'react';
import PenangkapanFormView from '../component/penangkapanform'
import { request } from '../helper/requestHelper'

class PenangkapanFormPage extends React.Component {
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
        console.log(this.state.form)
        const result = await request('/api/lkn/', {
            method: 'GET',
           });
        if(result){
            console.log(result.header)
            // localStorage.setItem('token', result.data.token)
        }       
    }
    render() {
        return <PenangkapanFormView userform='test' onFormChange={this.onFormChange} onsubmit={this.onsubmit} />
    }
}

export default PenangkapanFormPage
