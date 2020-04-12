import React from 'react';
import SignupView from '../component/signup'
import { get_token } from '../helper/requestHelper'
import { registeruser } from '../reduxActions/dashboard'
import { connect } from 'react-redux'

class SignupPage extends React.Component {
    state = {
        form: {
            role: 3,
            jenis_kelamin: "laki-laki"
        },
    }

    onFormChange = (fieldName, e) => {
        const formObj = { ...this.state.form };
        if (!e.target) {
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

    onsubmit = async () => {
        this.props.dispatch(registeruser(get_token(), this.state.form))
    }
    render() {
        return <SignupView userform='test' onFormChange={this.onFormChange} onsubmit={this.onsubmit} />
    }
}


export default connect()(SignupPage)
