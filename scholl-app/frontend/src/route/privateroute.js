import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { verify_token } from '../reduxActions/dashboard';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

class PrivateRoute extends React.Component{
  state = {
    status: false
  }

  async componentDidMount(){
    const status = await this.props.dispatch(verify_token(localStorage.getItem("token")))
    this.setState({status})
  }

  async componentDidUpdate(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      const status = await this.props.dispatch(verify_token(localStorage.getItem("token")))
      this.setState({status})
    }
  }

    render(){
      const { component, defaultPath, isReverse,...rest } = this.props
      const pathTo = defaultPath === null || defaultPath === undefined ? '/' : defaultPath
      const condition = isReverse === null || isReverse === undefined
        ? this.state.status == 200 : this.state.status !== 200
      const Component = component
      if(this.state.status){
        return (
          <Route
            {...rest}
            render={
              props =>
                condition ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                          pathname: defaultPath,
                          state: { from: props.location }
                        }}
                    />
                )
              }
          />
        )
      } else {
        return (
          <div></div>
        )
      }
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    error: dashboard.error,
    lknCreated: dashboard.lknCreated,
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
