import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const LoginView = (props) => (
    <Form>
        <Form.Field>
            <label>{props.userform}</label>
            <input placeholder='enter your username' onInput={(e) => { props.onloginformchange(e) }} />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input placeholder='enter your password' type="password" onInput={(e) => { props.onpasswordformchange(e) }} />
        </Form.Field>
        <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button onClick={() => { props.onsubmit() }} type='submit'>Submit</Button>
    </Form>
)

export default LoginView